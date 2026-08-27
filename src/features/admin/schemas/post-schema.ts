import { z } from 'zod';

export const postSchema = z.object({
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

export type PostFormValues = z.infer<typeof postSchema>;
