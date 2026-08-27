'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import {
  CreditCard,
  Database,
  Server,
  Cpu,
  Layers,
  Zap,
  Globe,
  Lock,
} from 'lucide-react';

export const TechIntegrationMarquee: React.FC = () => {
  const { t } = useTranslation();

  const techItems = [
    { name: 'QRIS Standar BI', category: t('home.marquee.paymentIntegration'), icon: <CreditCard className="w-3.5 h-3.5 text-rose-400" /> },
    { name: 'Bank Transfer Direct', category: t('home.marquee.gatewayDirect'), icon: <Zap className="w-3.5 h-3.5 text-blue-400" /> },
    { name: 'E-Wallet Settlement', category: t('home.marquee.instantCheckout'), icon: <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> },
    { name: 'PostgreSQL High-Availability', category: t('home.marquee.relationalDb'), icon: <Database className="w-3.5 h-3.5 text-cyan-400" /> },
    { name: 'Redis In-Memory Caching', category: t('home.marquee.lowLatencyCache'), icon: <Server className="w-3.5 h-3.5 text-red-400" /> },
    { name: 'Docker & Microservices', category: t('home.marquee.containerizedInfra'), icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" /> },
    { name: 'Next.js & React 19', category: t('home.marquee.fullstackFramework'), icon: <Layers className="w-3.5 h-3.5 text-white" /> },
    { name: 'Cloudflare Edge CDN', category: t('home.marquee.ddosGlobalEdge'), icon: <Globe className="w-3.5 h-3.5 text-amber-400" /> },
    { name: '256-Bit TLS / SSL Encryption', category: t('home.marquee.enterpriseSecurity'), icon: <Lock className="w-3.5 h-3.5 text-teal-400" /> },
  ];

  const marqueeItems = [...techItems, ...techItems];

  return (
    <section className="w-full border-y border-slate-800/60 py-6 relative z-10 overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 text-center sm:text-left">
          {t('home.marquee.caption')}
        </p>
      </div>

      {/* Infinite Smooth Ribbon */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060911] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060911] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 32,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex items-center gap-6 w-max"
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300 select-none hover:border-slate-700 transition-colors"
            >
              {item.icon}
              <span className="font-semibold text-slate-200 whitespace-nowrap">{item.name}</span>
              <span className="text-[10px] text-slate-500 font-medium">/ {item.category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
