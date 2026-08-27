import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(3, 'Judul postingan minimal 3 karakter'),
  slug: z
    .string()
    .min(3, 'Slug URL minimal 3 karakter')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug URL hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)'
    ),
  summary: z.string().optional(),
  type: z.enum(['ARTICLE', 'NEWS', 'EVENT', 'RELEASE']),
  categorySlug: z.string().min(1, 'Pilih kategori publikasi'),
  contentHtml: z.string().min(10, 'Isi konten postingan minimal 10 karakter'),
  eventDate: z.string().optional(),
  eventLocation: z.string().optional(),
  tags: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;
