'use client';

import React from 'react';
import { ServiceDetailProps } from '../types';
import { ServiceHero } from './service-hero';
import { ServiceFeaturesGrid } from './service-features-grid';
import { ServiceFaqSection } from './service-faq-section';
import { ServiceDocsBanner } from './service-docs-banner';
import { getLocalizedService } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';

export const ServiceDetailContainer: React.FC<ServiceDetailProps> = ({ service }) => {
  const { locale } = useTranslation();
  const activeService = getLocalizedService(service.slug, locale) || service;

  return (
    <div className="space-y-20 pb-28">
      <ServiceHero service={activeService} />
      <ServiceFeaturesGrid service={activeService} />
      <ServiceDocsBanner service={activeService} />
      <ServiceFaqSection service={activeService} />
    </div>
  );
};
