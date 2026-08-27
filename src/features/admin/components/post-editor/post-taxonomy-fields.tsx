import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FormCombobox } from '@/components/shared';
import { INITIAL_SERVICES, INITIAL_CATEGORIES } from '@/lib/data';
import { PostFormValues } from '../../schemas/post-schema';

export const PostTaxonomyFields: React.FC<{ form: UseFormReturn<PostFormValues> }> = ({
  form,
}) => {
  const { control, formState: { errors } } = form;

  const serviceOptions = INITIAL_SERVICES.map((srv) => ({
    label: `${srv.title} (${srv.badge})`,
    value: srv.slug,
  }));

  const categoryOptions = INITIAL_CATEGORIES.map((cat) => ({
    label: cat.name,
    value: cat.slug,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Controller
        control={control}
        name="serviceSlug"
        render={({ field }) => (
          <FormCombobox
            label="Target Ekosistem Layanan *"
            placeholder="Pilih layanan target..."
            searchPlaceholder="Cari layanan..."
            options={serviceOptions}
            value={field.value}
            onValueChange={field.onChange}
            error={errors.serviceSlug?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="categorySlug"
        render={({ field }) => (
          <FormCombobox
            label="Kategori Dokumentasi *"
            placeholder="Pilih kategori..."
            searchPlaceholder="Cari kategori..."
            options={categoryOptions}
            value={field.value}
            onValueChange={field.onChange}
            error={errors.categorySlug?.message}
          />
        )}
      />
    </div>
  );
};
