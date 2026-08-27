'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getLocalizedServices } from '@/lib/data';
import { AppButton } from '@/components/shared';
import { APP_VERSION } from '@/lib/version';
import { useTranslation } from '@/lib/i18n';
import {
  ShoppingBag,
  Users,
  Server,
  Code,
  Zap,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const ServicesOverviewContainer: React.FC = () => {
  const { t, locale } = useTranslation();
  const services = getLocalizedServices(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headerParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Custom capability metrics / technical blueprint for each service
  const getServiceSpecs = (slug: string) => {
    switch (slug) {
      case 'mitrasova-pos':
        return [
          { label: 'Mode Operasional', value: 'Full Offline-First (0ms Delay)' },
          { label: 'Manajemen Konsinyasi', value: 'Bagi Hasil & Retur Supplier' },
          { label: 'Modul Akuntansi', value: 'Neraca, General Ledger, Laba Rugi' },
          { label: 'Dukungan Hardware', value: 'Thermal ESC/POS Bluetooth & LAN' },
        ];
      case 'mitrasova-daya':
        return [
          { label: 'Aturan Pajak Gaji', value: 'Pajak PPh 21 TER 2026 Otomatis' },
          { label: 'Verifikasi Presensi', value: 'Geolocation & Anti-Fake GPS' },
          { label: 'Integrasi Jaminan', value: 'BPJS Kesehatan & Ketenagakerjaan' },
          { label: 'Distribusi Slip Gaji', value: 'PDF Instan WhatsApp & Email' },
        ];
      case 'mitrasova-nexus':
        return [
          { label: 'Jaminan Ketersediaan', value: '99.99% Uptime SLA Guarantee' },
          { label: 'Waktu Respon Query', value: '< 15ms NVMe PCIe 4.0 Storage' },
          { label: 'Keamanan Perimeter', value: 'DDoS Edge Filter & TLS 1.3' },
          { label: 'Skema Pencadangan', value: 'Automated Daily Multi-Region' },
        ];
      default:
        return [
          { label: 'Teknologi Utama', value: 'Next.js 16, React 19, TypeScript' },
          { label: 'Protokol Integrasi', value: 'RESTful API & GraphQL Gateway' },
          { label: 'Multi-Platform', value: 'Native Web, iOS, & Android' },
          { label: 'Standar Arsitektur', value: 'Clean Code, SOLID, Modular' },
        ];
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden pb-32">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-cyan-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header Section */}
      <section className="pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ y: headerParallaxY }} className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('services.overview.badge')} v{APP_VERSION}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t('services.overview.title')}{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
              {t('services.overview.titleGradient')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t('services.overview.description')}
          </p>

          {/* Quick Pillar Anchors */}
          <div className="pt-4 flex flex-wrap gap-2 sm:gap-3 text-xs text-slate-400">
            {services.map((srv, idx) => (
              <a
                key={srv.id}
                href={`#${srv.slug}`}
                className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-cyan-400 font-bold">0{idx + 1}.</span>
                <span>{srv.title}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Alternating Editorial Showcase Rows (No Generic Heavy Card Boxes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon] || Zap;
          const isEven = index % 2 === 1;
          const specs = getServiceSpecs(service.slug);

          return (
            <div
              key={service.id}
              id={service.slug}
              className="pt-16 border-t border-slate-800/80 scroll-mt-28"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Left Column: Solution Story & Features */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-slate-700">
                      0{index + 1}
                    </span>
                    <div className="h-4 w-px bg-slate-800" />
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-cyan-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-cyan-300 font-semibold mt-1">
                      {service.heroTagline}
                    </p>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-4 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* 4 Feature Checklist Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {service.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-100">{feat.title}</p>
                          <p className="text-[11px] text-slate-400 leading-snug mt-0.5 font-normal">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <Link href={`/layanan/${service.slug}`}>
                      <AppButton
                        variant="primary"
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        {t('common.learnMore')}
                      </AppButton>
                    </Link>
                    <Link
                      href={`/docs/${service.slug}`}
                      className="text-xs text-slate-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group/link py-2 transition-colors"
                    >
                      <span>{t('navbar.docs')} {service.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-cyan-400" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Architectural Specifications & Capabilities */}
                <div
                  className={`lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/90 space-y-5 backdrop-blur-xl ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-400">
                      Spesifikasi & Kapabilitas
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      PROD READY
                    </span>
                  </div>

                  <div className="space-y-3">
                    {specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                      >
                        <span className="text-slate-400 font-medium">{spec.label}</span>
                        <span className="text-slate-100 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Dukungan SLA 99.9% & Setup Implementasi Terpadu</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
