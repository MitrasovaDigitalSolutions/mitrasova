'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, PostFormValues } from '../schemas/post-schema';
import { useCreatePostMutation, useUpdatePostMutation } from '../api/posts-api';
import { PostItem } from '@/types';

export const sanitizeSlug = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
};

export interface UsePostEditorOptions {
  initialData?: PostItem;
  mode?: 'create' | 'edit';
}

export const usePostEditor = (options?: UsePostEditorOptions) => {
  const { initialData, mode = 'create' } = options || {};
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createMutation = useCreatePostMutation();
  const updateMutation = useUpdatePostMutation();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      summary: initialData?.summary || '',
      categorySlug: initialData?.categorySlug || 'wawasan-blog',
      contentHtml:
        initialData?.contentHtml ||
        '<h2>Pengenalan Artikel</h2><p>Tuliskan wawasan teknis, berita perusahaan, atau pengumuman event di sini dengan mudah...</p>',
      eventDate: initialData?.eventDate || '',
      eventLocation: initialData?.eventLocation || '',
      tags: initialData?.tags ? initialData.tags.join(', ') : '',
    },
  });

  // Re-sync if initialData changes or loads asynchronously
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        slug: initialData.slug,
        summary: initialData.summary || '',
        categorySlug: initialData.categorySlug,
        contentHtml: initialData.contentHtml,
        eventDate: initialData.eventDate || '',
        eventLocation: initialData.eventLocation || '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
      });
    }
  }, [initialData, form]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue('title', val, { shouldValidate: true });
    // Only auto-generate slug on create mode or if slug is empty
    if (mode === 'create' || !form.getValues('slug')) {
      const generatedSlug = sanitizeSlug(val);
      form.setValue('slug', generatedSlug, { shouldValidate: true });
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanSlug = sanitizeSlug(e.target.value);
    form.setValue('slug', cleanSlug, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: PostFormValues) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (mode === 'edit' && initialData) {
        await updateMutation.mutateAsync({
          idOrSlug: initialData.id,
          data,
        });
        setSuccessMsg('Postingan berhasil diperbarui!');
      } else {
        await createMutation.mutateAsync(data);
        setSuccessMsg('Postingan berhasil dibuat dan dipublikasikan!');
      }

      setTimeout(() => {
        router.push('/console');
      }, 1000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan postingan.';
      setErrorMsg(msg);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return {
    form,
    mode,
    successMsg,
    errorMsg,
    isPending,
    handleTitleChange,
    handleSlugChange,
    handleSubmit: form.handleSubmit(handleFormSubmit),
  };
};

