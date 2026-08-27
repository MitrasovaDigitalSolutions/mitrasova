'use client';

import { AppButton, SectionHeading } from '@/components/shared';
import { getLocalizedServices } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Layers,
  Server,
  ShoppingBag,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const ProductSuiteGrid: React.FC = () => {
  const { t, locale, dict } = useTranslation();
  const services = getLocalizedServices(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const previewParallaxY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  const activeService = services[activeIndex] || services[0];
  const IconComponent = iconMap[activeService.icon] || Layers;

  const getProductPreview = (slug: string) => {
    const itemDict = dict.services.items[slug as keyof typeof dict.services.items];
    const bp = itemDict?.blueprint;
    if (!bp) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="text-slate-400 font-medium">{bp.title}</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[11px] border border-emerald-500/20">
            ● {bp.badge}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">{bp.m1Label}</span>
            <span className="text-sm font-bold text-white mt-1 block">{bp.m1Val}</span>
            <span className="text-[11px] text-cyan-400 mt-0.5 block">{bp.m1Sub}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">{bp.m2Label}</span>
            <span className="text-sm font-bold text-white mt-1 block">{bp.m2Val}</span>
            <span className="text-[11px] text-indigo-400 mt-0.5 block">{bp.m2Sub}</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-400">
            <span>{bp.f1Label}</span>
            <span className="text-emerald-400 font-semibold">{bp.f1Val}</span>
          </div>
          {bp.f2Label && bp.f2Val && (
            <div className="flex justify-between text-slate-400">
              <span>{bp.f2Label}</span>
              <span className="text-slate-200">{bp.f2Val}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('home.products.badge')}
        title={t('home.products.title')}
        gradientText={t('home.products.titleGradient')}
        description={t('home.products.description')}
      />

      {/* Product Selector Navigation Tabs */}
      <div className="mt-10 flex items-center justify-start sm:justify-center overflow-x-auto gap-2 p-1.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {services.map((srv, idx) => {
          const isSelected = activeIndex === idx;
          const SrvIcon = iconMap[srv.icon] || Layers;

          return (
            <button
              key={srv.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none flex items-center gap-2.5 shrink-0 min-h-[42px] ${isSelected
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="productActiveTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-md shadow-indigo-500/20"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <SrvIcon className="w-4 h-4 relative z-10 shrink-0" />
              <span className="relative z-10 font-bold">{srv.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Active Product Canvas with Parallax Preview */}
      <div className="mt-8 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column: Product Story, Tagline, & Capabilities */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-cyan-400">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {activeService.badge}
                  </span>
                  <span className="text-xs text-slate-400 ml-2 font-medium">
                    {activeService.category}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-sm sm:text-base text-cyan-300 font-semibold mt-1">
                  {activeService.heroTagline}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mt-3 font-normal">
                  {activeService.description}
                </p>
              </div>

              {/* 4 Feature Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-100">{feat.title}</p>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{feat.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href={`/product/${activeService.slug}`}>
                  <AppButton
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {t('common.viewProduct')}
                  </AppButton>
                </Link>
                <Link href="/konsultasi">
                  <AppButton variant="outline" size="md">
                    {t('common.requestDemo')}
                  </AppButton>
                </Link>
              </div>
            </div>

            {/* Right Column: Live Parallax Capability Simulation Blueprint */}
            <motion.div
              style={{ y: previewParallaxY }}
              className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              {getProductPreview(activeService.slug)}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
