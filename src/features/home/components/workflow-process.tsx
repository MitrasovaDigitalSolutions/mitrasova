'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, GlassCard } from '@/components/shared';
import { Search, Sliders, Users, Rocket } from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Audit & Konsultasi Kebutuhan',
    subtitle: 'Discovery & Requirement Analysis',
    description:
      'Kami membedah alur operasional kasir, sistem penggajian karyawan, atau kebutuhan arsitektur custom software yang sesuai skala bisnis Anda.',
    icon: <Search className="w-5 h-5 text-cyan-400" />,
  },
  {
    number: '02',
    title: 'Konfigurasi & Penyesuaian Sistem',
    subtitle: 'Setup, Customizing & Integration',
    description:
      'Penyusunan database terpusat, pengujian integrasi hardware (printer kasir/barcode), pengaturan shift, serta konfigurasi akses role pengguna.',
    icon: <Sliders className="w-5 h-5 text-indigo-400" />,
  },
  {
    number: '03',
    title: 'Migrasi Data & Pelatihan Staf',
    subtitle: 'Seamless Onboarding & Staff Training',
    description:
      'Pemindahan master data barang, harga, dan profil staf ke dalam ekosistem Mitrasova, disertai sesi pelatihan interaktif hingga tim Anda mahir.',
    icon: <Users className="w-5 h-5 text-purple-400" />,
  },
  {
    number: '04',
    title: 'Go-Live & Pendampingan 24/7',
    subtitle: 'Production Launch & SLA Monitoring',
    description:
      'Sistem resmi beroperasi melayani transaksi Anda. Didukung pemantauan uptime server berkala, backup otomatis, dan bantuan teknis cepat tanggap.',
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
  },
];

export const WorkflowProcess: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge="Proses Implementasi Terstruktur"
        title="Bagaimana Kami Mentransformasi"
        gradientText="Operasional Bisnis Anda"
        description="Empat tahapan transparan dan terukur untuk memastikan transisi sistem berjalan mulus tanpa mengganggu aktivitas bisnis harian."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 relative">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <GlassCard className="p-6 h-full flex flex-col justify-between border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                    {step.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700 select-none">
                    {step.number}
                  </span>
                </div>

                <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
                  {step.subtitle}
                </p>
                <h3 className="text-base font-bold text-white tracking-tight mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-900 flex items-center gap-1.5 text-[11px] font-mono text-slate-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Tahap {step.number} Terstandarisasi</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
