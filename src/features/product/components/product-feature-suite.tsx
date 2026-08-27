'use client';

import React from 'react';
import { ServiceItem } from '@/types';
import { GlassCard, SectionHeading } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import {
  CheckCircle2,
  Zap,
  Share2,
  Layers,
  Receipt,
  Calculator,
  MapPin,
  Smartphone,
  Award,
  ShieldCheck,
  Lock,
  CloudRain,
  Cpu,
  Terminal,
  GitBranch,
} from 'lucide-react';

const featureIconMap: Record<string, React.ElementType> = {
  Zap,
  Share2,
  Layers,
  Receipt,
  Calculator,
  MapPin,
  Smartphone,
  Award,
  ShieldCheck,
  Lock,
  CloudRain,
  Cpu,
  Terminal,
  CheckCircle2,
  GitBranch,
};

export const ProductFeatureSuite: React.FC<{ product: ServiceItem }> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('product.features.badge')}
        title={t('product.features.title')}
        gradientText={t('product.features.titleGradient')}
        description={t('product.features.description')}
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.features.map((feat, idx) => {
          const FeatIcon = featureIconMap[feat.iconName] || CheckCircle2;

          return (
            <GlassCard
              key={idx}
              className="p-6 sm:p-8 border-slate-800/90 hover:border-indigo-500/40 bg-slate-950/70 transition-all group space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <FeatIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">0{idx + 1}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{t('product.features.provenBadge')}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
