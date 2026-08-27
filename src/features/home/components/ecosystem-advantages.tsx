'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, GlassCard } from '@/components/shared';
import { RefreshCw, ShieldCheck, Server, Headphones, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface AdvantageItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  points: string[];
}

const ADVANTAGES: AdvantageItem[] = [
  {
    id: 'sync',
    badge: 'Real-Time Sync',
    title: 'Sinkronisasi Multi-Cabang Instan',
    description:
      'Seluruh transaksi penjualan kasir, transfer persediaan gudang, dan rekonsiliasi keuangan antar cabang terhubung dalam satu basis data terpadu tanpa delay.',
    icon: <RefreshCw className="w-6 h-6 text-cyan-400" />,
    gradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
    points: ['Stok inventaris terpusat', 'Mendukung mode offline & online', 'Rekonsiliasi transaksi otomatis'],
  },
  {
    id: 'security',
    badge: 'Enterprise Security',
    title: 'Keamanan Data & Role Permission',
    description:
      'Perlindungan data transaksi dan privasi karyawan dengan Role-Based Access Control (RBAC), enkripsi end-to-end 256-bit, dan pencatatan audit log komprehensif.',
    icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
    gradient: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30',
    points: ['Hak akses bertingkat per jabatan', 'Audit trail aktivitas pengguna', 'Backup harian otomatis & terenkripsi'],
  },
  {
    id: 'uptime',
    badge: 'Cloud Reliability',
    title: 'Infrastruktur Cloud High-Availability',
    description:
      'Arsitektur cloud modern dengan load balancing adaptif, auto-scaling saat jam sibuk, dan jaminan uptime 99.9% untuk kelancaran operasional bisnis tanpa henti.',
    icon: <Server className="w-6 h-6 text-emerald-400" />,
    gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    points: ['SLA Uptime 99.9% bergaransi', 'Proteksi DDoS & firewall pintar', 'Node server redundansi ganda'],
  },
  {
    id: 'support',
    badge: 'Local Engineering',
    title: 'Dukungan Teknis Lokal Solo Raya',
    description:
      'Dukungan langsung dari tim engineer Mitrasova di Karanganyar & Solo Raya. Kami siap mendampingi proses audit, implementasi, pelatihan tim, hingga kustomisasi.',
    icon: <Headphones className="w-6 h-6 text-amber-400" />,
    gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    points: ['Pendampingan setup & onboarding staf', 'Respon cepat melalui hotline khusus', 'Dukungan on-site & remote'],
  },
];

export const EcosystemAdvantages: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge="Keunggulan Arsitektur"
        title="Mengapa Memilih Ekosistem"
        gradientText="Teknologi Mitrasova?"
        description="Dirancang secara presisi untuk menunjang skalabilitas bisnis Anda dari puluhan hingga ribuan transaksi setiap harinya."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {ADVANTAGES.map((item, index) => (
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
                  <span>Konsultasi Implementasi</span>
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
