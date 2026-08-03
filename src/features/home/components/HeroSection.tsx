import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { AppButton } from '@/components/common/AppButton';
import { MetricsBar } from './MetricsBar';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Mitrasova Digital Solutions Ecosystem v4.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Arsitektur Perangkat Lunak{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200 bg-clip-text text-transparent glow-text-indigo">
              Enterprise & High-Performance Cloud
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Empowering business scalability with our unified SaaS suite: Kasir Pintar (<strong>Mitrasova POS</strong>), HRIS & Payroll (<strong>Mitrasova Daya</strong>), Managed Cloud (<strong>Mitrasova Nexus</strong>), & Custom Software (<strong>Mitrasova Labs</strong>).
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>

          <MetricsBar />
        </div>
      </div>
    </section>
  );
};
