import React from 'react';
import { ServiceItem } from '@/types';
import { SectionHeading } from '@/components/shared';
import { ServiceFeatureCard } from './service-feature-card';

export interface ServiceFeaturesGridProps {
  service: ServiceItem;
}

export const ServiceFeaturesGrid: React.FC<ServiceFeaturesGridProps> = ({ service }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Fitur & Kapabilitas"
        title="Keunggulan Utama"
        gradientText={service.title}
        description="Arsitektur fitur yang dirancang khusus untuk performa maksimal dan stabilitas operasional harian."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {service.features.map((feature, idx) => (
          <ServiceFeatureCard key={idx} feature={feature} />
        ))}
      </div>
    </section>
  );
};
