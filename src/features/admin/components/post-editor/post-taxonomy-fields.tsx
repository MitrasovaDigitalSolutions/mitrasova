import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FormCombobox, FormInput } from '@/components/shared';
import { INITIAL_CATEGORIES } from '@/lib/data';
import { PostFormValues } from '../../schemas/post-schema';

export const PostTaxonomyFields: React.FC<{ form: UseFormReturn<PostFormValues> }> = ({
  form,
}) => {
  const { control, register, watch, formState: { errors } } = form;
  const currentCategorySlug = watch('categorySlug');

  const categoryOptions = INITIAL_CATEGORIES.map((cat) => ({
    label: cat.name,
    value: cat.slug,
  }));

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="categorySlug"
        render={({ field }) => (
          <FormCombobox
            label="Kategori Publikasi *"
            placeholder="Pilih kategori..."
            searchPlaceholder="Cari kategori..."
            options={categoryOptions}
            value={field.value}
            onValueChange={field.onChange}
            error={errors.categorySlug?.message}
          />
        )}
      />

      {/* Conditional Event Date & Location fields */}
      {currentCategorySlug === 'event-agenda' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-purple-950/20 border border-purple-800/30">
          <FormInput
            label="Tanggal Pelaksanaan Event (Opsional)"
            placeholder="Contoh: 2026-09-18T09:00"
            type="datetime-local"
            {...register('eventDate')}
          />
          <FormInput
            label="Lokasi Acara (Offline / Online)"
            placeholder="Contoh: Solo Technopark / Hybrid Zoom"
            {...register('eventLocation')}
          />
        </div>
      )}

      <FormInput
        label="Tags / Topik (Pisahkan dengan koma)"
        placeholder="Contoh: POS Kasir, Offline Mode, Retail, Solo Raya"
        {...register('tags')}
      />
    </div>
  );
};
