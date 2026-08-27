'use client';

import React from 'react';
import { SectionHeading } from '@/components/shared';
import { ConsultationForm } from './consultation-form';
import { ConsultationInfoCard } from './consultation-info-card';
import { useTranslation } from '@/lib/i18n';

export const ConsultationPageContainer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 pb-28">
      <SectionHeading
        badge={t('consultation.header.badge')}
        title={t('consultation.header.title')}
        gradientText={t('consultation.header.titleGradient')}
        description={t('consultation.header.description')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <ConsultationForm />
        </div>
        <div className="lg:col-span-5">
          <ConsultationInfoCard />
        </div>
      </div>
    </div>
  );
};
