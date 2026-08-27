'use client';

import React from 'react';
import { ServiceItem } from '@/types';
import { SectionHeading, GlassCard } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { Store, Building2, Factory, Laptop, Check } from 'lucide-react';

const iconSets: Record<string, [React.ElementType, React.ElementType, React.ElementType]> = {
  'mitrasova-pos': [Store, Building2, Factory],
  'mitrasova-daya': [Building2, Factory, Laptop],
  'mitrasova-nexus': [Building2, Store, Laptop],
  'mitrasova-labs': [Laptop, Building2, Factory],
};

export const ProductUseCases: React.FC<{ product: ServiceItem }> = ({ product }) => {
  const { t, dict } = useTranslation();
  const ucItems = dict.product.useCases.items[product.slug as keyof typeof dict.product.useCases.items] || [];
  const icons = iconSets[product.slug] || [Laptop, Building2, Factory];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('product.useCases.badge')}
        title={t('product.useCases.title')}
        gradientText={t('product.useCases.titleGradient')}
        description={t('product.useCases.description')}
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {ucItems.map((uc, idx) => {
          const Icon = icons[idx] || Laptop;

          return (
            <GlassCard
              key={idx}
              className="p-6 sm:p-7 border-slate-800/90 hover:border-indigo-500/40 bg-slate-950/70 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{uc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {uc.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                {uc.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
