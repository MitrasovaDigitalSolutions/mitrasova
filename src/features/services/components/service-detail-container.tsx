import React from 'react';
import { ServiceDetailProps } from '../types';
import { ServiceHero } from './service-hero';
import { ServiceFeaturesGrid } from './service-features-grid';
import { ServiceFaqSection } from './service-faq-section';
import { ServiceDocsBanner } from './service-docs-banner';

export const ServiceDetailContainer: React.FC<ServiceDetailProps> = ({ service }) => {
  return (
    <div className="space-y-20 pb-28">
      <ServiceHero service={service} />
      <ServiceFeaturesGrid service={service} />
      <ServiceDocsBanner service={service} />
      <ServiceFaqSection service={service} />
    </div>
  );
};
