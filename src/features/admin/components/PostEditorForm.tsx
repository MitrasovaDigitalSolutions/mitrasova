'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { FormInput } from '@/components/common/FormInput';
import { FormSelect } from '@/components/common/FormSelect';
import { FormTextarea } from '@/components/common/FormTextarea';
import { INITIAL_SERVICES, INITIAL_CATEGORIES } from '@/lib/data';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';

const postSchema = z.object({
  title: z.string().min(3, 'Judul artikel minimal 3 karakter'),
  slug: z.string().min(3, 'Slug minimal 3 karakter'),
  summary: z.string().optional(),
  serviceSlug: z.string().min(1, 'Pilih layanan target'),
  categorySlug: z.string().min(1, 'Pilih kategori dokumen'),
  contentHtml: z.string().min(10, 'Isi konten dokumen minimal 10 karakter'),
});

type PostFormValues = z.infer<typeof postSchema>;

export const PostEditorForm: React.FC = () => {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      serviceSlug: 'mitrasova-pos',
      categorySlug: 'tutorial',
      contentHtml: '<h2>Judul Bagian Utama</h2><p>Tuliskan penjelasan dan langkah-langkah dokumentasi di sini...</p>',
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    setValue('title', val, { shouldValidate: true });
    setValue('slug', generatedSlug, { shouldValidate: true });
  };

  const onSubmit = (data: PostFormValues) => {
    setSuccessMsg(true);
    setTimeout(() => {
      router.push('/admin');
    }, 1500);
  };

  const serviceOptions = INITIAL_SERVICES.map((srv) => ({
    label: `${srv.title} (${srv.badge})`,
    value: srv.slug,
  }));

  const categoryOptions = INITIAL_CATEGORIES.map((cat) => ({
    label: cat.name,
    value: cat.slug,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </Link>
        <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
          Service-Scoped Docs Editor
        </span>
      </div>

      <GlassCard className="p-8 border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-extrabold text-white">Buat Artikel / Dokumentasi Baru</h1>
          <p className="text-xs text-slate-400">Pilih layanan target dan tulis panduan teknis yang terisolasi.</p>
        </div>

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Artikel berhasil diterbitkan ke Service-Scoped Docs Hub! Mengalihkan...</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Layanan Target (Service Scope) *"
              options={serviceOptions}
              {...register('serviceSlug')}
              error={errors.serviceSlug?.message}
            />

            <FormSelect
              label="Kategori Dokumen *"
              options={categoryOptions}
              {...register('categorySlug')}
              error={errors.categorySlug?.message}
            />
          </div>

          <FormInput
            label="Judul Artikel Dokumentasi *"
            placeholder="Contoh: Cara Konfigurasi Webhook Notifikasi Transaksi"
            {...register('title')}
            onChange={handleTitleChange}
            error={errors.title?.message}
          />

          <FormInput
            label="URL Slug Otomatis *"
            placeholder="cara-konfigurasi-webhook"
            {...register('slug')}
            error={errors.slug?.message}
          />

          <FormTextarea
            label="Ringkasan Singkat (Summary)"
            placeholder="Ringkasan 1-2 kalimat mengenai isi artikel..."
            rows={2}
            {...register('summary')}
            error={errors.summary?.message}
          />

          <FormTextarea
            label="Konten Artikel (HTML / Tiptap WYSIWYG Editor)"
            placeholder="<h2>Judul</h2><p>Penjelasan...</p>"
            rows={10}
            className="font-mono"
            helperText="Dukungan Tag H2 & H3 untuk Table of Contents"
            {...register('contentHtml')}
            error={errors.contentHtml?.message}
          />

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <Link href="/admin">
              <AppButton variant="outline" size="md">
                Batal
              </AppButton>
            </Link>
            <AppButton
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Terbitkan Artikel Docs
            </AppButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
