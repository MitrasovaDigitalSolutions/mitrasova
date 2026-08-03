import React from 'react';
import { ServiceItem } from '@/types';
import { ServiceHero } from './ServiceHero';
import { ServiceFeaturesGrid } from './ServiceFeaturesGrid';
import { ServiceFaqSection } from './ServiceFaqSection';
import { ServiceDocsBanner } from './ServiceDocsBanner';

interface ServiceDetailContainerProps {
  service: ServiceItem;
}

export const ServiceDetailContainer: React.FC<ServiceDetailContainerProps> = ({ service }) => {
  return (
    <div className="space-y-20 pb-20">
      <ServiceHero service={service} />
      <ServiceFeaturesGrid service={service} />
      <ServiceFaqSection service={service} />
      <ServiceDocsBanner service={service} />
    </div>
  );
};
