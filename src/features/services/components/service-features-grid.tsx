'use client';

import React from 'react';
import { ServiceItem } from '@/types';
import { SectionHeading } from '@/components/shared';
import { ServiceFeatureCard } from './service-feature-card';
import { useTranslation } from '@/lib/i18n';

export interface ServiceFeaturesGridProps {
  service: ServiceItem;
}

export const ServiceFeaturesGrid: React.FC<ServiceFeaturesGridProps> = ({ service }) => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge={t('services.detail.keyFeatures')}
        title={t('services.detail.keyFeatures')}
        gradientText={service.title}
        description={t('services.detail.keyFeaturesDesc')}
      />

      {/* Architectural Open 2x2 Matrix with Hairline Dividers (No Heavy Cards) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border-t border-b border-slate-800/80 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
        {service.features.map((feature, idx) => (
          <ServiceFeatureCard key={idx} feature={feature} index={idx} />
        ))}
      </div>
    </section>
  );
};
