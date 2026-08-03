import React from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ConsultationInfoCard } from './ConsultationInfoCard';
import { ConsultationForm } from './ConsultationForm';

export const ConsultationPageContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <SectionHeading
        badge="Jadwal Konsultasi Solution Architect"
        title="Konsultasikan Digitalisasi"
        gradientText="Bisnis Perusahaan Anda"
        description="Diskusi gratis bersama tim konsultan teknologi Mitrasova untuk analisis kebutuhan sistem, estimasi biaya, dan arsitektur penggelaran."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <ConsultationInfoCard />
        </div>
        <div className="lg:col-span-7">
          <ConsultationForm />
        </div>
      </div>
    </div>
  );
};
