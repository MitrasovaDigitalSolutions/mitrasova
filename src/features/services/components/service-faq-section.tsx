import React from 'react';
import { ServiceItem } from '@/types';
import { SectionHeading, GlassCard } from '@/components/shared';
import { HelpCircle } from 'lucide-react';

export interface ServiceFaqSectionProps {
  service: ServiceItem;
}

export const ServiceFaqSection: React.FC<ServiceFaqSectionProps> = ({ service }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="FAQ & Panduan"
        title="Pertanyaan Umum"
        gradientText={service.title}
        description="Jawaban seputar implementasi, integrasi teknis, dan dukungan operasional."
      />

      <div className="space-y-4">
        {service.faqs.map((faq, idx) => (
          <GlassCard key={idx} className="p-6 border-slate-800 bg-slate-950/70">
            <div className="flex items-start gap-4">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
