'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { FormInput } from '@/components/common/FormInput';
import { FormCombobox } from '@/components/common/FormCombobox';
import { FormTextarea } from '@/components/common/FormTextarea';
import { TiptapRichEditor } from '@/components/common/TiptapRichEditor';
import { INITIAL_SERVICES, INITIAL_CATEGORIES } from '@/lib/data';
import { ArrowLeft, Save, CheckCircle2, Link2 } from 'lucide-react';

// Helper to turn any string into a clean, valid URL slug
const sanitizeSlug = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Hapus karakter khusus selain huruf, angka, spasi, dash
    .replace(/[\s_]+/g, '-')    // Ubah spasi atau underscore menjadi dash
    .replace(/-+/g, '-');       // Gabungkan dash ganda menjadi dash tunggal
};

const postSchema = z.object({
  title: z.string().min(3, 'Judul artikel minimal 3 karakter'),
  slug: z
    .string()
    .min(3, 'Slug URL minimal 3 karakter')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug URL hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)'
    ),
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
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      serviceSlug: 'mitrasova-pos',
      categorySlug: 'tutorial',
      contentHtml: '<h2>Pengenalan Dokumentasi</h2><p>Tuliskan panduan teknis, langkah-langkah penggunaan, atau pengumuman di sini dengan mudah...</p>',
    },
  });

  const currentSlug = watch('slug') || 'judul-artikel-anda';
  const currentService = watch('serviceSlug') || 'mitrasova-pos';

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = sanitizeSlug(val);

    setValue('title', val, { shouldValidate: true });
    setValue('slug', generatedSlug, { shouldValidate: true });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Auto sanitize user input live (spaces to hyphens, lowercase only, strip illegal symbols)
    const cleanSlug = sanitizeSlug(rawVal);
    setValue('slug', cleanSlug, { shouldValidate: true });
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
        <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
          Service-Scoped Docs Editor
        </span>
      </div>

      <GlassCard className="p-8 border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-black text-white glow-text-cyan">Buat Artikel / Dokumentasi Baru</h1>
          <p className="text-xs text-slate-400">Pilih layanan target dan tulis panduan teknis menggunakan Rich Text Editor modern.</p>
        </div>

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3 text-emerald-400 text-xs font-semibold font-mono">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Artikel berhasil diterbitkan ke Service-Scoped Docs Hub! Mengalihkan...</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="serviceSlug"
              control={control}
              render={({ field }) => (
                <FormCombobox
                  label="Layanan Target (Service Scope) *"
                  placeholder="Cari & pilih layanan..."
                  searchPlaceholder="Cari layanan (POS, HRIS, Cloud...)"
                  emptyText="Layanan tidak ditemukan."
                  options={serviceOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.serviceSlug?.message}
                />
              )}
            />

            <Controller
              name="categorySlug"
              control={control}
              render={({ field }) => (
                <FormCombobox
                  label="Kategori Dokumen *"
                  placeholder="Cari & pilih kategori..."
                  searchPlaceholder="Cari kategori (Tutorial, Guide...)"
                  emptyText="Kategori tidak ditemukan."
                  options={categoryOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.categorySlug?.message}
                />
              )}
            />
          </div>

          <FormInput
            label="Judul Artikel Dokumentasi *"
            placeholder="Contoh: Cara Konfigurasi Webhook Notifikasi Transaksi"
            {...register('title')}
            onChange={handleTitleChange}
            error={errors.title?.message}
          />

          <div className="space-y-1.5">
            <FormInput
              label="URL Slug Otomatis (Sanitized & Validated) *"
              placeholder="cara-konfigurasi-webhook-notifikasi"
              {...register('slug')}
              onChange={handleSlugChange}
              error={errors.slug?.message}
            />
            {/* Live URL Preview Badge */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2 overflow-x-auto">
              <Link2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Preview URL:</span>
              <span className="text-cyan-300 font-semibold truncate">
                https://mitrasova.com/docs/{currentService}/<span className="text-emerald-400">{currentSlug}</span>
              </span>
            </div>
          </div>

          <FormTextarea
            label="Ringkasan Singkat (Summary)"
            placeholder="Ringkasan 1-2 kalimat mengenai isi artikel..."
            rows={2}
            {...register('summary')}
            error={errors.summary?.message}
          />

          {/* Modern MS Word Style Tiptap Rich Editor */}
          <Controller
            name="contentHtml"
            control={control}
            render={({ field }) => (
              <TiptapRichEditor
                label="Konten Artikel*"
                value={field.value}
                onChange={field.onChange}
                error={errors.contentHtml?.message}
              />
            )}
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
