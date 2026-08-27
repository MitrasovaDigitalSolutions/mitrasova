'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ServiceItem } from '@/types';
import { AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { ShoppingBag, Users, Server, Code, Zap, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

export interface ServiceHeroProps {
  service: ServiceItem;
}

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  const ServiceIcon = iconMap[service.icon] || Zap;
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={heroRef} className="relative pt-14 pb-20 border-b border-slate-800/80 overflow-hidden">
      {/* Ambient Backdrop Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-indigo-600/20 via-cyan-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto pb-1">
          <Link href="/" className="hover:text-white transition-colors">
            {t('navbar.home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <Link href="/layanan" className="hover:text-white transition-colors">
            {t('navbar.services')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-cyan-400 font-semibold">{service.title}</span>
        </div>

        <motion.div style={{ y: heroParallaxY }} className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-md">
            <ServiceIcon className="w-4 h-4 text-cyan-400" />
            <span>{service.category} — {service.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            {service.title}{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
              Enterprise
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-cyan-300 font-semibold leading-snug">
            {service.heroTagline}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            {service.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link href="/konsultasi">
              <AppButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('common.consultation')}
              </AppButton>
            </Link>
            <Link href={`/docs/${service.slug}`}>
              <AppButton variant="outline" size="lg" leftIcon={<BookOpen className="w-4 h-4 text-cyan-400" />}>
                {t('common.docsHub')}
              </AppButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
