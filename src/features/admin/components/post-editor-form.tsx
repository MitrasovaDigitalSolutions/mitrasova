'use client';

import React from 'react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { AppButton, RichEditor, FormInput, FormTextarea, FormCombobox } from '@/components/shared';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Link2,
  Loader2,
  ExternalLink,
  Calendar,
  Globe,
} from 'lucide-react';
import { usePostEditor } from '../hooks/use-post-editor';
import { INITIAL_CATEGORIES } from '@/lib/data';
import { PostItem } from '@/types';

export interface PostEditorFormProps {
  initialData?: PostItem;
  mode?: 'create' | 'edit';
}

export const PostEditorForm: React.FC<PostEditorFormProps> = ({
  initialData,
  mode = 'create',
}) => {
  const {
    form,
    successMsg,
    errorMsg,
    isPending,
    handleTitleChange,
    handleSlugChange,
    handleSubmit,
  } = usePostEditor({ initialData, mode });

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = form;

  const isEditMode = mode === 'edit';
  const currentSlug = watch('slug') || 'judul-postingan-anda';
  const currentCategorySlug = watch('categorySlug');
  const currentContent = watch('contentHtml') || '';

  const plainText = currentContent.replace(/<[^>]+>/g, ' ');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const estimatedMin = Math.max(1, Math.ceil(wordCount / 180));

  const categoryOptions = INITIAL_CATEGORIES.map((cat) => ({
    label: cat.name,
    value: cat.slug,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-32">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link
              href="/console"
              className="hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Console</span>
            </Link>
            <span>/</span>
            <span className="text-slate-300">
              {isEditMode ? 'Edit Postingan' : 'Tulis Baru'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {isEditMode ? 'Studio Editor Publikasi' : 'Tulis Publikasi Baru'}
          </h1>
        </div>

        {/* Live URL Pill (if editing) */}
        {isEditMode && initialData && (
          <Link
            href={`/blog/${initialData.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 hover:border-cyan-500/40 transition-colors w-fit"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lihat Halaman Live</span>
            <ExternalLink className="w-3 h-3 text-slate-500 ml-0.5" />
          </Link>
        )}
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 shadow-lg shadow-emerald-950/40 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg} Mengarahkan kembali ke dashboard...</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-3 shadow-lg shadow-rose-950/40 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Studio Two-Column Grid */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Writing Canvas (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Slug Container */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-4">
              <FormInput
                label="Judul Publikasi *"
                placeholder="Masukkan judul artikel, berita, event, atau rilis..."
                className="text-base sm:text-lg font-bold"
                {...register('title')}
                onChange={handleTitleChange}
                error={errors.title?.message}
              />

              <div className="space-y-1.5">
                <FormInput
                  label="Slug URL *"
                  placeholder="slug-url-kebab-case"
                  {...register('slug')}
                  onChange={handleSlugChange}
                  error={errors.slug?.message}
                />
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Link2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    URL Publik: <span className="text-cyan-300">/blog/{currentSlug}</span>
                  </span>
                </div>
              </div>

              <FormTextarea
                label="Ringkasan / Excerpt Singkat"
                placeholder="Tuliskan intisari atau ringkasan 1-2 kalimat untuk preview pencarian dan media sosial..."
                rows={2}
                {...register('summary')}
                error={errors.summary?.message}
              />
            </div>

            {/* Rich Text Editor */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3">
              <Controller
                control={control}
                name="contentHtml"
                render={({ field }) => (
                  <RichEditor
                    label="Badan Konten Dokumen (Visual Rich Editor) *"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.contentHtml?.message}
                    helperText="Mendukung headings, daftar terstruktur, kutipan penting, dan blok sintaks kode."
                  />
                )}
              />
            </div>
          </div>

          {/* Publishing & Metadata Inspector Sidebar (Right 4 cols, sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Publishing Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Aksi Publikasi
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>Estimasi Panjang:</span>
                  <span className="text-white font-bold">{wordCount} kata</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu Baca:</span>
                  <span className="text-cyan-300 font-bold">~{estimatedMin} menit</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-bold">
                    {isEditMode ? 'Terpublikasi' : 'Siap Terbit'}
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-50 font-mono"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isEditMode ? 'Menyimpan Perubahan...' : 'Mempublikasikan...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditMode ? 'Perbarui Postingan' : 'Simpan & Publikasikan'}</span>
                    </>
                  )}
                </button>

                <Link href="/console" className="block">
                  <AppButton
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                    disabled={isPending}
                  >
                    Batal & Kembali
                  </AppButton>
                </Link>
              </div>
            </div>

            {/* Category Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-800 pb-3">
                Kategori Publikasi
              </span>

              <Controller
                control={control}
                name="categorySlug"
                render={({ field }) => (
                  <FormCombobox
                    label="Pilih Kategori *"
                    placeholder="Pilih kategori..."
                    searchPlaceholder="Cari kategori..."
                    options={categoryOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.categorySlug?.message}
                  />
                )}
              />

              {/* Conditional Event Settings */}
              {currentCategorySlug === 'event-agenda' && (
                <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/30 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Konfigurasi Event
                  </span>
                  <FormInput
                    label="Waktu Pelaksanaan"
                    type="datetime-local"
                    {...register('eventDate')}
                  />
                  <FormInput
                    label="Lokasi Acara"
                    placeholder="Solo Technopark / Hybrid"
                    {...register('eventLocation')}
                  />
                </div>
              )}

              <FormInput
                label="Tags / Topik (Pisahkan Koma)"
                placeholder="POS, Kasir, Next.js, Solo Raya"
                {...register('tags')}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
