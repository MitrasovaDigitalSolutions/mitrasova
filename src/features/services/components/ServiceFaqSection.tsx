import React from 'react';
import { ServiceItem } from '@/types';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/common/GlassCard';
import { HelpCircle } from 'lucide-react';

interface ServiceFaqSectionProps {
  service: ServiceItem;
}

export const ServiceFaqSection: React.FC<ServiceFaqSectionProps> = ({ service }) => {
  if (!service.faqs || service.faqs.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Pertanyaan Umum (FAQ)"
        title="Hal yang Sering Ditanyakan Mengenai"
        gradientText={service.title}
      />

      <div className="space-y-4">
        {service.faqs.map((faq, index) => (
          <GlassCard key={index} className="p-6 border-slate-800">
            <div className="flex items-start gap-3">
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
