import React from 'react';
import { INITIAL_SERVICES } from '@/lib/data';
import { SectionHeading } from '@/components/shared';
import { ServiceCard } from './service-card';
import { APP_VERSION } from '@/lib/version';

export const ServicesOverviewContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 pb-28">
      <SectionHeading
        badge={`Enterprise Ecosystem v${APP_VERSION}`}
        title="Ekosistem Produk & Layanan"
        gradientText="Mitrasova Digital"
        description="Solusi perangkat lunak lengkap dan terintegrasi untuk mendigitalkan seluruh lini operasi bisnis Anda."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
