'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { ShoppingBag, Users, Server, Code, Zap, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Zap;
  const { t } = useTranslation();

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-slate-950/40 hover:bg-slate-900/30 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {service.badge}
          </span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs font-semibold text-cyan-400 mt-1">{service.heroTagline}</p>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed font-normal">{service.summary}</p>
        </div>

        <div className="pt-4 border-t border-slate-800/60 space-y-2.5">
          {service.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{feat.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between">
        <Link
          href={`/docs/${service.slug}`}
          className="text-xs text-slate-400 hover:text-cyan-400 font-medium flex items-center gap-1 group/link"
        >
          <span>{t('navbar.docs')}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
        <Link href={`/layanan/${service.slug}`}>
          <AppButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            {t('common.learnMore')}
          </AppButton>
        </Link>
      </div>
    </div>
  );
};
