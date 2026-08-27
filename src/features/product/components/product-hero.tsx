'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ServiceItem } from '@/types';
import { AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import {
  ShoppingBag,
  Users,
  Server,
  Code,
  Zap,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const ProductHero: React.FC<{ product: ServiceItem }> = ({ product }) => {
  const ProductIcon = iconMap[product.icon] || Zap;
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={heroRef} className="relative pt-12 pb-20 border-b border-slate-800/80 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-b from-indigo-600/20 via-cyan-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto pb-1">
          <Link href="/" className="hover:text-white transition-colors">
            {t('navbar.home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <Link href="/product" className="hover:text-white transition-colors">
            {t('navbar.products')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-cyan-400 font-semibold">{product.title}</span>
        </div>

        <motion.div style={{ y: heroParallaxY }} className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30 backdrop-blur-md">
            <ProductIcon className="w-4 h-4 text-cyan-400" />
            <span>{product.category} — {product.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            {product.title}{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Enterprise
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-cyan-300 font-semibold leading-snug">
            {product.heroTagline}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            {product.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {product.externalUrl && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <AppButton
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto justify-center bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 shadow-lg shadow-indigo-500/25"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  {t('product.hero.learnMoreExternal')}
                </AppButton>
              </a>
            )}

            <Link href="/konsultasi" className="w-full sm:w-auto">
              <AppButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t('product.hero.requestDemo')}
              </AppButton>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('product.hero.slaGuarantee')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{t('product.hero.support')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{t('product.hero.prodGrade')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
