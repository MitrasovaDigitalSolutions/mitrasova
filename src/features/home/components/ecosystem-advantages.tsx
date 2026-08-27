'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { RefreshCw, ShieldCheck, Server, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const EcosystemAdvantages: React.FC = () => {
  const { t, dict } = useTranslation();
  const advData = dict.home.advantages.items;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  const advantages = [
    {
      num: '01',
      id: 'sync',
      badge: advData.sync.badge,
      title: advData.sync.title,
      description: advData.sync.description,
      icon: <RefreshCw className="w-5 h-5 text-cyan-400" />,
      tagColor: 'text-cyan-400',
      points: advData.sync.points,
    },
    {
      num: '02',
      id: 'security',
      badge: advData.security.badge,
      title: advData.security.title,
      description: advData.security.description,
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      tagColor: 'text-indigo-400',
      points: advData.security.points,
    },
    {
      num: '03',
      id: 'uptime',
      badge: advData.uptime.badge,
      title: advData.uptime.title,
      description: advData.uptime.description,
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      tagColor: 'text-emerald-400',
      points: advData.uptime.points,
    },
    {
      num: '04',
      id: 'support',
      badge: advData.support.badge,
      title: advData.support.title,
      description: advData.support.description,
      icon: <Headphones className="w-5 h-5 text-amber-400" />,
      tagColor: 'text-amber-400',
      points: advData.support.points,
    },
  ];

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('home.advantages.badge')}
        title={t('home.advantages.title')}
        gradientText={t('home.advantages.titleGradient')}
        description={t('home.advantages.description')}
      />

      {/* Architectural Open 4-Column Pillar Grid (No Heavy Card Boxes) */}
      <motion.div
        style={{ y: parallaxY }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-slate-800/80 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 relative"
      >
        {advantages.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="p-6 sm:p-8 flex flex-col justify-between hover:bg-slate-900/30 transition-colors group relative"
          >
            <div className="space-y-4">
              {/* Header with Pillar Number & Icon */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-slate-500 transition-colors">
                  {item.num}
                </span>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  {item.icon}
                </div>
              </div>

              <div>
                <span className={`text-[11px] font-semibold tracking-wider uppercase ${item.tagColor}`}>
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-1 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 pt-3 border-t border-slate-800/60">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/60">
              <Link
                href="/product"
                className="text-xs text-slate-400 hover:text-white font-semibold flex items-center justify-between group/link"
              >
                <span>{t('common.learnMore')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
