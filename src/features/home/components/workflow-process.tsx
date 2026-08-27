'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, GlassCard } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { Search, Sliders, Users, Rocket, CheckCircle2 } from 'lucide-react';

export const WorkflowProcess: React.FC = () => {
  const { t, dict } = useTranslation();
  const wf = dict.home.workflow.steps;

  const workflowSteps = [
    {
      step: wf.step1.step,
      phase: wf.step1.phase,
      title: wf.step1.title,
      description: wf.step1.description,
      deliverable: wf.step1.deliverable,
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      accentColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      borderAccent: 'group-hover:border-cyan-500/40',
    },
    {
      step: wf.step2.step,
      phase: wf.step2.phase,
      title: wf.step2.title,
      description: wf.step2.description,
      deliverable: wf.step2.deliverable,
      icon: <Sliders className="w-5 h-5 text-indigo-400" />,
      accentColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      borderAccent: 'group-hover:border-indigo-500/40',
    },
    {
      step: wf.step3.step,
      phase: wf.step3.phase,
      title: wf.step3.title,
      description: wf.step3.description,
      deliverable: wf.step3.deliverable,
      icon: <Users className="w-5 h-5 text-purple-400" />,
      accentColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      borderAccent: 'group-hover:border-purple-500/40',
    },
    {
      step: wf.step4.step,
      phase: wf.step4.phase,
      title: wf.step4.title,
      description: wf.step4.description,
      deliverable: wf.step4.deliverable,
      icon: <Rocket className="w-5 h-5 text-emerald-400" />,
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      borderAccent: 'group-hover:border-emerald-500/40',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('home.workflow.badge')}
        title={t('home.workflow.title')}
        gradientText={t('home.workflow.titleGradient')}
        description={t('home.workflow.description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 relative">
        {workflowSteps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col h-full"
          >
            <GlassCard
              className={`p-6 sm:p-7 h-full flex flex-col justify-between border-slate-800/90 bg-slate-950/80 transition-colors duration-300 ${item.borderAccent}`}
            >
              {/* Card Header: Icon & Step Number */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                    {item.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${item.accentColor}`}>
                    {item.step}
                  </span>
                </div>

                {/* Phase Tag & Title */}
                <div>
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    {item.phase}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Deliverable Box */}
              <div className="pt-4 mt-6 border-t border-slate-800/80">
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-tight">
                    <span className="text-slate-400 font-mono">{t('home.workflow.resultLabel')}</span>
                    <span className="text-slate-200 font-medium">{item.deliverable}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
