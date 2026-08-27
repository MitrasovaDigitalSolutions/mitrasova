'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading, GlassCard, AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import {
  Search,
  Sliders,
  Users,
  Rocket,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const WorkflowProcess: React.FC = () => {
  const { t, dict } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const wf = dict.home.workflow.steps;

  const steps = [
    {
      index: 0,
      step: wf.step1.step,
      phase: wf.step1.phase,
      title: wf.step1.title,
      description: wf.step1.description,
      deliverable: wf.step1.deliverable,
      icon: Search,
      color: 'cyan',
      accentColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      activeRing: 'ring-2 ring-cyan-400/40 border-cyan-500/50',
      bgGlow: 'from-cyan-500/15 via-blue-600/10 to-transparent',
      highlights: [
        'Audit alur transaksi kasir & shift harian',
        'Analisis skema konsinyasi & bagi hasil supplier',
        'Pemetaan arsitektur server & integrasi hardware',
      ],
    },
    {
      index: 1,
      step: wf.step2.step,
      phase: wf.step2.phase,
      title: wf.step2.title,
      description: wf.step2.description,
      deliverable: wf.step2.deliverable,
      icon: Sliders,
      color: 'indigo',
      accentColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      activeRing: 'ring-2 ring-indigo-400/40 border-indigo-500/50',
      bgGlow: 'from-indigo-500/15 via-purple-600/10 to-transparent',
      highlights: [
        'Pengujian printer thermal Bluetooth & LAN ESC/POS',
        'Konfigurasi akun general ledger & bagan akun (COA)',
        'Setup hak akses peran kasir, admin, & supervisor',
      ],
    },
    {
      index: 2,
      step: wf.step3.step,
      phase: wf.step3.phase,
      title: wf.step3.title,
      description: wf.step3.description,
      deliverable: wf.step3.deliverable,
      icon: Users,
      color: 'purple',
      accentColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      activeRing: 'ring-2 ring-purple-400/40 border-purple-500/50',
      bgGlow: 'from-purple-500/15 via-pink-600/10 to-transparent',
      highlights: [
        'Import master data produk, harga, & supplier',
        'Simulasi transaksi kasir offline & rekonsiliasi',
        'Pelatihan interaktif staf hingga operasional mandiri',
      ],
    },
    {
      index: 3,
      step: wf.step4.step,
      phase: wf.step4.phase,
      title: wf.step4.title,
      description: wf.step4.description,
      deliverable: wf.step4.deliverable,
      icon: Rocket,
      color: 'emerald',
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      activeRing: 'ring-2 ring-emerald-400/40 border-emerald-500/50',
      bgGlow: 'from-emerald-500/15 via-teal-600/10 to-transparent',
      highlights: [
        'Peluncuran sistem resmi melayani pelanggan',
        'Monitoring kesehatan server & auto-sync data',
        'Hotline teknis prioritas & garansi SLA 99.9%',
      ],
    },
  ];

  const current = steps[activeIndex];
  const IconComponent = current.icon;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const progressPercentage = ((activeIndex + 1) / steps.length) * 100;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('home.workflow.badge')}
        title={t('home.workflow.title')}
        gradientText={t('home.workflow.titleGradient')}
        description={t('home.workflow.description')}
      />

      {/* Interactive Header: Stepper Progress Track & Navigation Buttons */}
      <div className="mt-12 space-y-6">
        {/* Progress Bar Track */}
        <div className="relative w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
            initial={false}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>

        {/* Stepper Tabs & Controls Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Step Selector Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md overflow-x-auto max-w-full">
            {steps.map((s, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="workflowActiveTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 shadow-md shadow-indigo-500/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-bold">{s.step}</span>
                  <span className="relative z-10 hidden md:inline text-[11px]">
                    {s.phase.split(':')[1]?.trim() || s.phase}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls: Previous, Step Counter, Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t('home.workflow.prevStep')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono font-bold text-slate-300">
              <span className="text-cyan-400">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-slate-600 mx-1">/</span>
              <span className="text-slate-500">{String(steps.length).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label={t('home.workflow.nextStep')}
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-500 hover:to-cyan-500 border border-indigo-500/40 transition-all cursor-pointer shadow-sm shadow-indigo-500/20 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Active Step Spotlight Card (Smooth Animated Transition) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative"
          >
            <GlassCard className="p-6 sm:p-10 border-slate-800 bg-slate-950/90 relative overflow-hidden">
              {/* Ambient Radial Glow */}
              <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${current.bgGlow} blur-3xl pointer-events-none`}
              />

              {/* Watermark Step Number */}
              <span className="absolute -bottom-6 right-6 font-mono text-8xl sm:text-9xl font-black text-slate-800/20 select-none pointer-events-none">
                {current.step}
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Stage Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${current.accentColor}`}>
                        {current.step}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                        {current.phase}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {current.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mt-3">
                      {current.description}
                    </p>
                  </div>

                  {/* Deliverable Box */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="text-slate-400 font-mono">{t('home.workflow.resultLabel')}</span>
                      <span className="text-slate-100 font-semibold">{current.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Checkpoints & Action Button */}
                <div className="lg:col-span-5 space-y-5 bg-slate-900/50 p-5 sm:p-6 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Aktivitas Kunci Tahap {current.step}</span>
                  </div>

                  <ul className="space-y-2.5">
                    {current.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <Link href="/konsultasi" className="w-full">
                      <AppButton
                        variant="primary"
                        size="sm"
                        className="w-full justify-center"
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        {t('home.workflow.consultNow')}
                      </AppButton>
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* 4 Interactive Mini-Cards Grid (Click to Jump Directly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {steps.map((item, idx) => {
            const isCurrent = activeIndex === idx;
            const ItemIcon = item.icon;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex flex-col justify-between ${
                  isCurrent
                    ? `${item.activeRing} bg-slate-900/90 shadow-lg shadow-indigo-500/10 scale-[1.02]`
                    : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-xl border ${
                      isCurrent
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isCurrent ? 'text-cyan-400' : 'text-slate-600'
                    }`}
                  >
                    {item.step}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                    {item.phase}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                      isCurrent ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
