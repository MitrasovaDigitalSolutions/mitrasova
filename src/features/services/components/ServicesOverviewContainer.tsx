import React from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { INITIAL_SERVICES } from '@/lib/data';

export const ServicesOverviewContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <SectionHeading
        badge="Portofolio Layanan Enterprise"
        title="Jelajahi Seluruh Ekosistem"
        gradientText="Perangkat Lunak Mitrasova"
        description="Pilih salah satu layanan di bawah ini untuk melihat detail arsitektur, spesifikasi fitur lengkap, dan paket yang sesuai dengan skala bisnis Anda."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
