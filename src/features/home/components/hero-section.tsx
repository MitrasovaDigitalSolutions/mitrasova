'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AppButton } from '@/components/shared';
import { RogHeroVisual } from './rog-hero-visual';
import { APP_VERSION } from '@/lib/version';
import { useTranslation } from '@/lib/i18n';
import { Sparkles, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const visualParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.85]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Dynamic Ambient Background Glows with Subtle Scroll Parallax */}
      <motion.div
        style={{ y: bgParallaxY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ y: bgParallaxY }}
        className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <motion.div
            style={{ opacity: textOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            {/* Live Version Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('home.hero.liveBadge')} v{APP_VERSION}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {t('home.hero.title')}{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {t('home.hero.titleGradient')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t('home.hero.description')}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/konsultasi" className="w-full sm:w-auto">
                <AppButton
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('home.hero.ctaPrimary')}
                </AppButton>
              </Link>

              <Link href="/docs" className="w-full sm:w-auto">
                <AppButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                  leftIcon={<BookOpen className="w-4 h-4 text-cyan-400" />}
                >
                  {t('home.hero.ctaSecondary')}
                </AppButton>
              </Link>
            </div>

            {/* Quality Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('home.hero.uptimeBadge')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{t('home.hero.dbBadge')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-indigo-400 font-bold">256-Bit</span>
                <span>{t('home.hero.encryptionBadge')}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D ROG Visual Telemetry Frame with Parallax Floating */}
          <motion.div style={{ y: visualParallaxY }} className="lg:col-span-6">
            <RogHeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
