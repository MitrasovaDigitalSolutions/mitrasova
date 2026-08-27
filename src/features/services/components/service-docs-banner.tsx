'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { GlassCard, AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { BookOpen, ChevronRight } from 'lucide-react';

export const ServiceDocsBanner: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <GlassCard className="p-8 sm:p-12 border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-cyan-950/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              {t('docs.hub.badge')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t('services.detail.docsBannerTitle')} ({service.title})
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {t('services.detail.docsBannerDesc')}
            </p>
          </div>

          <Link href={`/docs/${service.slug}`} className="shrink-0 w-full sm:w-auto">
            <AppButton variant="secondary" size="lg" className="w-full sm:w-auto justify-center" rightIcon={<ChevronRight className="w-4 h-4" />}>
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{t('services.detail.openDocsBtn')}</span>
            </AppButton>
          </Link>
        </div>
      </GlassCard>
    </section>
  );
};
