'use client';

import React from 'react';
import Link from 'next/link';
import { usePostDetailQuery } from '../api/posts-api';
import { PostEditorForm } from './post-editor-form';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { AppButton } from '@/components/shared';

export interface PostEditContainerProps {
  postId: string;
}

export const PostEditContainer: React.FC<PostEditContainerProps> = ({ postId }) => {
  const { data: post, isLoading, error } = usePostDetailQuery(postId);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-cyan-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Memuat Data Postingan...</h3>
          <p className="text-xs text-slate-400 font-mono mt-1">Mengambil payload konten dari server</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Postingan Tidak Ditemukan</h3>
          <p className="text-xs text-slate-400">
            Postingan dengan ID atau slug &quot;{postId}&quot; tidak ditemukan di basis data publikasi.
          </p>
        </div>
        <Link href="/console" className="inline-block pt-2">
          <AppButton variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Kembali ke Dashboard Console
          </AppButton>
        </Link>
      </div>
    );
  }

  return <PostEditorForm initialData={post} mode="edit" />;
};
