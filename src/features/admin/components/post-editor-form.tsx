'use client';

import React from 'react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { GlassCard, AppButton, RichEditor } from '@/components/shared';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { usePostEditor } from '../hooks/use-post-editor';
import { PostMetaFields } from './post-editor/post-meta-fields';
import { PostTaxonomyFields } from './post-editor/post-taxonomy-fields';

export const PostEditorForm: React.FC = () => {
  const { form, successMsg, handleTitleChange, handleSlugChange, handleSubmit } = usePostEditor();
  const { control, formState: { errors, isSubmitting } } = form;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-28">
      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <Link
            href="/console"
            className="text-xs text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 font-mono mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Console</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Buat Postingan / Berita Baru
          </h1>
          <p className="text-xs text-slate-400">
            Publikasikan artikel wawasan teknologi, rilis produk, siaran pers, atau agenda acara.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Postingan berhasil disimpan! Mengarahkan kembali ke console...</span>
        </div>
      )}

      {/* Editor Form Shell */}
      <GlassCard className="p-6 md:p-8 border-slate-800 space-y-6 bg-slate-950/80">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PostMetaFields
            form={form}
            onTitleChange={handleTitleChange}
            onSlugChange={handleSlugChange}
          />

          <PostTaxonomyFields form={form} />

          {/* Tiptap Rich WYSIWYG Editor */}
          <Controller
            control={control}
            name="contentHtml"
            render={({ field }) => (
              <RichEditor
                label="Isi Konten Artikel (Visual Rich Editor) *"
                value={field.value}
                onChange={field.onChange}
                error={errors.contentHtml?.message}
                helperText="Mendukung headings, lists, inline code, syntax blocks, dan formatting visual."
              />
            )}
          />

          {/* Action Submission Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Link href="/console" className="w-full sm:w-auto">
              <AppButton variant="outline" size="md" className="w-full sm:w-auto justify-center">
                Batal
              </AppButton>
            </Link>
            <AppButton
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto justify-center"
              isLoading={isSubmitting}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Simpan & Publikasikan
            </AppButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
