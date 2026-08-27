'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, PostFormValues } from '../schemas/post-schema';

export const sanitizeSlug = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
};

export const usePostEditor = () => {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      type: 'ARTICLE',
      categorySlug: 'wawasan',
      contentHtml: '<h2>Pengenalan Artikel</h2><p>Tuliskan wawasan teknis, berita perusahaan, atau pengumuman event di sini dengan mudah...</p>',
      eventDate: '',
      eventLocation: '',
      tags: '',
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = sanitizeSlug(val);
    form.setValue('title', val, { shouldValidate: true });
    form.setValue('slug', generatedSlug, { shouldValidate: true });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanSlug = sanitizeSlug(e.target.value);
    form.setValue('slug', cleanSlug, { shouldValidate: true });
  };

  const handleFormSubmit = (_data: PostFormValues) => {
    setSuccessMsg(true);
    setTimeout(() => {
      router.push('/console');
    }, 1200);
  };

  return {
    form,
    successMsg,
    handleTitleChange,
    handleSlugChange,
    handleSubmit: form.handleSubmit(handleFormSubmit),
  };
};
