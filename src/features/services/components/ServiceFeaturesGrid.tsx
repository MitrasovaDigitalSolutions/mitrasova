import React from 'react';
import { ServiceItem } from '@/types';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/common/GlassCard';
import { CheckCircle2 } from 'lucide-react';

interface ServiceFeaturesGridProps {
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
          <GlassCard key={idx} className="p-8 border-slate-800 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
