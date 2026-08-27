'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostItem } from '@/types';
import { PostFormValues } from '../schemas/post-schema';

export interface PostFilters {
  search?: string;
  categorySlug?: string;
  page?: number;
  pageSize?: number;
}

export const postsApi = {
  async fetchPosts(filters?: PostFilters): Promise<PostItem[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.categorySlug && filters.categorySlug !== 'all' && filters.categorySlug !== 'ALL') {
      params.append('categorySlug', filters.categorySlug);
    }
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    const res = await fetch(`/api/posts?${params.toString()}`);
    if (!res.ok) {
      throw new Error('Gagal memuat data postingan dari server');
    }
    const json = await res.json();
    return json.data || [];
  },

  async fetchPostDetail(idOrSlug: string): Promise<PostItem> {
    const res = await fetch(`/api/posts/${encodeURIComponent(idOrSlug)}`);
    if (!res.ok) {
      throw new Error('Gagal memuat detail postingan');
    }
    const json = await res.json();
    return json.data;
  },

  async createPost(data: PostFormValues): Promise<PostItem> {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Gagal menyimpan postingan');
    }
    return json.data;
  },

  async updatePost(idOrSlug: string, data: PostFormValues): Promise<PostItem> {
    const res = await fetch(`/api/posts/${encodeURIComponent(idOrSlug)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Gagal memperbarui postingan');
    }
    return json.data;
  },

  async deletePost(idOrSlug: string): Promise<void> {
    const res = await fetch(`/api/posts/${encodeURIComponent(idOrSlug)}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Gagal menghapus postingan');
    }
  },
};

export const usePostsQuery = (filters?: PostFilters) => {
  return useQuery({
    queryKey: ['admin-posts', filters],
    queryFn: () => postsApi.fetchPosts(filters),
    staleTime: 1000 * 30, // 30 seconds
  });
};

export const usePostDetailQuery = (idOrSlug?: string) => {
  return useQuery({
    queryKey: ['admin-post-detail', idOrSlug],
    queryFn: () => (idOrSlug ? postsApi.fetchPostDetail(idOrSlug) : Promise.reject('No ID')),
    enabled: Boolean(idOrSlug),
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostFormValues) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idOrSlug, data }: { idOrSlug: string; data: PostFormValues }) =>
      postsApi.updatePost(idOrSlug, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      queryClient.invalidateQueries({ queryKey: ['admin-post-detail', variables.idOrSlug] });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idOrSlug: string) => postsApi.deletePost(idOrSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
    },
  });
};
