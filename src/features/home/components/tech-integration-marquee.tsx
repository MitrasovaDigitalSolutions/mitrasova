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
    { name: 'QRIS Standar BI', category: t('home.marquee.paymentIntegration'), icon: <CreditCard className="w-4 h-4 text-rose-400" /> },
    { name: 'Bank Transfer (BCA, Mandiri, BRI)', category: t('home.marquee.gatewayDirect'), icon: <Zap className="w-4 h-4 text-blue-400" /> },
    { name: 'E-Wallet (GoPay, OVO, Dana)', category: t('home.marquee.instantCheckout'), icon: <CreditCard className="w-4 h-4 text-emerald-400" /> },
    { name: 'PostgreSQL High-Availability', category: t('home.marquee.relationalDb'), icon: <Database className="w-4 h-4 text-cyan-400" /> },
    { name: 'Redis In-Memory Caching', category: t('home.marquee.lowLatencyCache'), icon: <Server className="w-4 h-4 text-red-400" /> },
    { name: 'Docker & Microservices', category: t('home.marquee.containerizedInfra'), icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
    { name: 'Next.js & React 19', category: t('home.marquee.fullstackFramework'), icon: <Layers className="w-4 h-4 text-white" /> },
    { name: 'Cloudflare Edge CDN', category: t('home.marquee.ddosGlobalEdge'), icon: <Globe className="w-4 h-4 text-amber-400" /> },
    { name: '256-Bit TLS / SSL Encryption', category: t('home.marquee.enterpriseSecurity'), icon: <Lock className="w-4 h-4 text-teal-400" /> },
  ];

  // Duplicate list to create a seamless infinite loop
  const marqueeItems = [...techItems, ...techItems];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 overflow-hidden">
      <div className="text-center mb-6">
        <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-500">
          {t('home.marquee.caption')}
        </p>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden mask-fade">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#060911] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#060911] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex items-center gap-4 w-max"
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-sm"
            >
              <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200 tracking-tight whitespace-nowrap">{item.name}</p>
                <p className="text-[10px] font-mono text-slate-500">{item.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
