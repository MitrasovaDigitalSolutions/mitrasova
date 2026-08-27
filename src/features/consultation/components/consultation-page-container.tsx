import React from 'react';
import { SectionHeading } from '@/components/shared';
import { ConsultationForm } from './consultation-form';
import { ConsultationInfoCard } from './consultation-info-card';

export const ConsultationPageContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 pb-28">
      <SectionHeading
        badge="Direct Enterprise Consultation"
        title="Diskusikan Kebutuhan Bisnis"
        gradientText="Bersama Tim Ahli Mitrasova"
        description="Hubungi tim Solution Architect kami untuk konsultasi gratis dan rencana implementasi teknologi terbaik bagi bisnis Anda."
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
