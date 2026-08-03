'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { AppButton } from '@/components/common/AppButton';
import { MetricsBar } from './MetricsBar';
import { RogHeroVisual } from './RogHeroVisual';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-28 overflow-hidden bg-cyber-dots">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Cyber Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-indigo-500/10 text-cyan-300 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>MITRASOVA ENTERPRISE CLOUD ECOSYSTEM v4.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
          >
            Arsitektur Perangkat Lunak{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 via-emerald-300 to-indigo-300 bg-clip-text text-transparent glow-text-cyan">
              Enterprise & High-Performance Cloud
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Akselerasi skala bisnis Anda dengan ekosistem terpadu: Kasir Ritel (<strong className="text-white">Mitrasova POS</strong>), HRIS & Payroll (<strong className="text-white">Mitrasova Daya</strong>), Managed Cloud (<strong className="text-white">Mitrasova Nexus</strong>), & Custom Software (<strong className="text-white">Mitrasova Labs</strong>).
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/layanan">
              <AppButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Jelajahi Ekosistem Layanan
              </AppButton>
            </Link>
            <Link href="/docs">
              <AppButton variant="outline" size="lg" leftIcon={<ShieldCheck className="w-4 h-4 text-cyan-400" />}>
                Pusat Dokumentasi (Docs Hub)
              </AppButton>
            </Link>
          </motion.div>

          {/* Metrics Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <MetricsBar />
          </motion.div>
        </div>

        {/* 3D ASUS ROG Scroll Visual Card */}
        <RogHeroVisual />
      </div>
    </section>
  );
};
