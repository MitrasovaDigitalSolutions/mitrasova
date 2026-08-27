'use client';

import React from 'react';
import { INITIAL_SERVICES } from '@/lib/data';
import { SectionHeading } from '@/components/shared';
import { ServiceCard } from './service-card';
import { APP_VERSION } from '@/lib/version';
import { useTranslation } from '@/lib/i18n';

export const ServicesOverviewContainer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 pb-28">
      <SectionHeading
        badge={`${t('services.overview.badge')} v${APP_VERSION}`}
        title={t('services.overview.title')}
        gradientText={t('services.overview.titleGradient')}
        description={t('services.overview.description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
