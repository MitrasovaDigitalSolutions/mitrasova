'use client';

import React from 'react';
import { ServiceItem } from '@/types';
import { SectionHeading } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { HelpCircle } from 'lucide-react';

export interface ServiceFaqSectionProps {
  service: ServiceItem;
}

export const ServiceFaqSection: React.FC<ServiceFaqSectionProps> = ({ service }) => {
  const { t } = useTranslation();

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="FAQ"
        title={t('services.detail.faqTitle')}
        gradientText={service.title}
        description={t('services.detail.faqDesc')}
      />

      {/* Clean Minimalist FAQ List (No Heavy Card Boxes) */}
      <div className="mt-8 divide-y divide-slate-800/80 border-t border-b border-slate-800/80">
        {service.faqs.map((faq, idx) => (
          <div key={idx} className="py-6 space-y-3">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {faq.question}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8 font-normal">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
