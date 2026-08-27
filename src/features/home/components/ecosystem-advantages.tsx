'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, GlassCard } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { RefreshCw, ShieldCheck, Server, Headphones, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const EcosystemAdvantages: React.FC = () => {
  const { t, dict } = useTranslation();
  const advData = dict.home.advantages.items;

  const advantageCards = [
    {
      id: 'sync',
      badge: advData.sync.badge,
      title: advData.sync.title,
      description: advData.sync.description,
      icon: <RefreshCw className="w-6 h-6 text-cyan-400" />,
      gradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
      points: advData.sync.points,
    },
    {
      id: 'security',
      badge: advData.security.badge,
      title: advData.security.title,
      description: advData.security.description,
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      gradient: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30',
      points: advData.security.points,
    },
    {
      id: 'uptime',
      badge: advData.uptime.badge,
      title: advData.uptime.title,
      description: advData.uptime.description,
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
      points: advData.uptime.points,
    },
    {
      id: 'support',
      badge: advData.support.badge,
      title: advData.support.title,
      description: advData.support.description,
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
      points: advData.support.points,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('home.advantages.badge')}
        title={t('home.advantages.title')}
        gradientText={t('home.advantages.titleGradient')}
        description={t('home.advantages.description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {advantageCards.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard
              className={`p-6 sm:p-8 h-full flex flex-col justify-between border bg-slate-950/80 ${item.gradient}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
                    {item.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono font-semibold text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{item.description}</p>
                </div>

                <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                <Link
                  href="/konsultasi"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>{t('home.advantages.consultCta')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
