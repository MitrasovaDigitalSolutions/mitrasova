'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { INITIAL_SERVICES } from '@/lib/data';
import { CheckCircle, Send } from 'lucide-react';

const consultationSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email perusahaan tidak valid'),
  company: z.string().optional(),
  phone: z.string().min(8, 'Nomor telepon/WhatsApp minimal 8 digit'),
  selectedServices: z.array(z.string()).min(1, 'Pilih setidaknya 1 layanan'),
  message: z.string().optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export const ConsultationForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      selectedServices: ['mitrasova-pos'],
      message: '',
    },
  });

  const selectedServices = watch('selectedServices') || [];

  const handleToggleService = (slug: string) => {
    if (selectedServices.includes(slug)) {
      if (selectedServices.length > 1) {
        setValue(
          'selectedServices',
          selectedServices.filter((s) => s !== slug),
          { shouldValidate: true }
        );
      }
    } else {
      setValue('selectedServices', [...selectedServices, slug], { shouldValidate: true });
    }
  };

  const onSubmit = (data: ConsultationFormValues) => {
    setSubmitted(true);
  };

  return (
    <GlassCard className="p-8 md:p-10 border-slate-800">
      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white">Formulir Terkirim!</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Terima kasih. Tim Solution Architect Mitrasova akan menghubungi Anda dalam waktu 1x24 jam.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nama Lengkap *"
              placeholder="Nama Anda"
              {...register('name')}
              error={errors.name?.message}
            />
            <FormInput
              label="Email Perusahaan *"
              type="email"
              placeholder="email@perusahaan.com"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nama Perusahaan"
              placeholder="PT Mitra Digital Jaya"
              {...register('company')}
              error={errors.company?.message}
            />
            <FormInput
              label="Nomor Telepon / WhatsApp *"
              type="tel"
              placeholder="+62 812 3456 7890"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Pilih Layanan yang Diminati (Bisa Lebih Dari 1):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INITIAL_SERVICES.map((srv) => {
                const isSelected = selectedServices.includes(srv.slug);
                return (
                  <button
                    key={srv.slug}
                    type="button"
                    onClick={() => handleToggleService(srv.slug)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{srv.title}</span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
            {errors.selectedServices && (
              <p className="text-xs text-rose-400 font-medium mt-1">
                {errors.selectedServices.message}
              </p>
            )}
          </div>

          <FormTextarea
            label="Pesan & Kebutuhan Spesifik"
            placeholder="Tuliskan gambaran singkat kebutuhan atau pertanyaan Anda..."
            rows={4}
            {...register('message')}
            error={errors.message?.message}
          />

          <AppButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Kirim Formulir Konsultasi
          </AppButton>
        </form>
      )}
    </GlassCard>
  );
};
