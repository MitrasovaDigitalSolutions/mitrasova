import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormInput, FormTextarea } from '@/components/shared';
import { PostFormValues } from '../../schemas/post-schema';
import { Link2 } from 'lucide-react';

export interface PostMetaFieldsProps {
  form: UseFormReturn<PostFormValues>;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PostMetaFields: React.FC<PostMetaFieldsProps> = ({
  form,
  onTitleChange,
  onSlugChange,
}) => {
  const { register, watch, formState: { errors } } = form;
  const currentSlug = watch('slug') || 'judul-artikel-anda';
  const currentService = watch('serviceSlug') || 'mitrasova-pos';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Judul Artikel Dokumentasi *"
          placeholder="Contoh: Panduan Setup & Konfigurasi Printer Thermal"
          {...register('title')}
          onChange={onTitleChange}
          error={errors.title?.message}
        />

        <div className="space-y-1.5">
          <FormInput
            label="Slug URL (Kebab-Case Otomatis) *"
            placeholder="panduan-setup-printer-thermal"
            {...register('slug')}
            onChange={onSlugChange}
            error={errors.slug?.message}
          />
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 truncate">
            <Link2 className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">
              Live URL: <span className="text-cyan-300">/docs/{currentService}/.../{currentSlug}</span>
            </span>
          </div>
        </div>
      </div>

      <FormTextarea
        label="Ringkasan / Summary Singkat"
        placeholder="Tuliskan rangkuman 1-2 kalimat mengenai isi dokumen atau tutorial ini..."
        rows={2}
        {...register('summary')}
        error={errors.summary?.message}
      />
    </div>
  );
};
