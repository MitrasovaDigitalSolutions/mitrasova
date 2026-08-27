'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { consultationSchema, ConsultationFormValues } from '../schemas/consultation-schema';

export const useConsultationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ConsultationFormValues>({
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

  const selectedServices = form.watch('selectedServices') || [];

  const toggleService = (slug: string) => {
    if (selectedServices.includes(slug)) {
      if (selectedServices.length > 1) {
        form.setValue(
          'selectedServices',
          selectedServices.filter((s) => s !== slug),
          { shouldValidate: true }
        );
      }
    } else {
      form.setValue('selectedServices', [...selectedServices, slug], { shouldValidate: true });
    }
  };

  const handleFormSubmit = (_data: ConsultationFormValues) => {
    setIsSubmitted(true);
  };

  return {
    form,
    isSubmitted,
    selectedServices,
    toggleService,
    handleSubmit: form.handleSubmit(handleFormSubmit),
  };
};
