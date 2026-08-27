import { z } from 'zod';

export const consultationSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email perusahaan tidak valid'),
  company: z.string().optional(),
  phone: z.string().min(8, 'Nomor telepon/WhatsApp minimal 8 digit'),
  selectedServices: z.array(z.string()).min(1, 'Pilih setidaknya 1 layanan'),
  message: z.string().optional(),
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;
