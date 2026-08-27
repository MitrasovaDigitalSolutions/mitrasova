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
  const currentSlug = watch('slug') || 'judul-postingan-anda';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Judul Postingan / Berita *"
          placeholder="Contoh: Strategi Optimasi Payroll & PPh 21 TER"
          {...register('title')}
          onChange={onTitleChange}
          error={errors.title?.message}
        />

        <div className="space-y-1.5">
          <FormInput
            label="Slug URL (Kebab-Case Otomatis) *"
            placeholder="strategi-optimasi-payroll"
            {...register('slug')}
            onChange={onSlugChange}
            error={errors.slug?.message}
          />
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 truncate">
            <Link2 className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">
              Live URL: <span className="text-cyan-300">/blog/{currentSlug}</span>
            </span>
          </div>
        </div>
      </div>

      <FormTextarea
        label="Ringkasan Singkat / Excerpt"
        placeholder="Tuliskan rangkuman 1-2 kalimat mengenai isi artikel, berita, atau event ini..."
        rows={2}
        {...register('summary')}
        error={errors.summary?.message}
      />
    </div>
  );
};
