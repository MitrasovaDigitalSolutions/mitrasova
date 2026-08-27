'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { BookOpen, ChevronRight } from 'lucide-react';

export const ServiceDocsBanner: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-10 rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {t('docs.hub.badge')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t('services.detail.docsBannerTitle')} ({service.title})
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
              {t('services.detail.docsBannerDesc')}
            </p>
          </div>

          <Link href={`/docs/${service.slug}`} className="shrink-0 w-full sm:w-auto">
            <AppButton
              variant="secondary"
              size="md"
              className="w-full sm:w-auto justify-center"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{t('services.detail.openDocsBtn')}</span>
            </AppButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
