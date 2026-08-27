'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SectionHeading, AppButton } from '@/components/shared';
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
  ShieldCheck,
} from 'lucide-react';

export const WorkflowProcess: React.FC = () => {
  const { t, dict } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const wf = dict.home.workflow.steps;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['2%', '-2%']);

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
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      activeBorder: 'border-cyan-400',
      activeText: 'text-cyan-400',
      highlights: wf.step1.highlights,
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
      tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      activeBorder: 'border-indigo-400',
      activeText: 'text-indigo-400',
      highlights: wf.step2.highlights,
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
      tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      activeBorder: 'border-purple-400',
      activeText: 'text-purple-400',
      highlights: wf.step3.highlights,
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
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      activeBorder: 'border-emerald-400',
      activeText: 'text-emerald-400',
      highlights: wf.step4.highlights,
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

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('home.workflow.badge')}
        title={t('home.workflow.title')}
        gradientText={t('home.workflow.titleGradient')}
        description={t('home.workflow.description')}
      />

      <motion.div style={{ y: parallaxY }} className="mt-10 space-y-8">
        {/* Minimalist Horizontal Step Timeline Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
          {steps.map((s, idx) => {
            const isSelected = activeIndex === idx;
            const isPast = activeIndex > idx;
            const StepIcon = s.icon;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative px-3 sm:px-4 py-3 rounded-xl transition-all cursor-pointer select-none text-left flex items-center gap-3 ${
                  isSelected
                    ? 'bg-slate-900/90 shadow-md border border-slate-700/80 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 border border-transparent'
                }`}
              >
                {/* Active Indicator Underline */}
                {isSelected && (
                  <motion.div
                    layoutId="workflowActiveUnderline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}

                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/40'
                      : isPast
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500">
                      STEP {s.step}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold truncate leading-tight mt-0.5">
                    {s.phase.split(':')[1]?.trim() || s.phase}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Editorial Content Stage (Clean Canvas with Generous Whitespace - No Bulky Card Containers) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2"
          >
            {/* Left Column: Narrative & Deliverable Scope */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner text-cyan-400">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${current.tagColor}`}>
                    {current.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {current.phase}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3 max-w-2xl font-normal">
                  {current.description}
                </p>
              </div>

              {/* Deliverable Scope Strip */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="text-slate-400 font-semibold">{t('home.workflow.resultLabel')}</span>
                  <span className="text-slate-100 font-bold ml-1">{current.deliverable}</span>
                </div>
              </div>

              {/* Actions & Next Step Controls */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/konsultasi">
                  <AppButton
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {t('home.workflow.consultNow')}
                  </AppButton>
                </Link>

                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label={t('home.workflow.prevStep')}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="px-2.5 py-1 text-xs font-mono font-bold text-slate-400">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label={t('home.workflow.nextStep')}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Milestone Checklist */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 pb-2 border-b border-slate-800/80 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('home.workflow.keyActivitiesTitle')} {current.step}</span>
              </div>

              <div className="space-y-3 pt-1">
                {current.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400 font-bold text-[10px]">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('home.workflow.executionAssurance')}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
