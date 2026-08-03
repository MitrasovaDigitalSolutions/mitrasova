'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { INITIAL_SERVICES } from '@/lib/data';
import { ShoppingBag, Users, Server, Code } from 'lucide-react';

export const InteractiveDemoTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mitrasova-pos');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <GlassCard className="p-8 lg:p-12 border-indigo-500/30">
        <SectionHeading
          badge="Live Interactive Simulator"
          title="Lihat Cara Kerja Produk"
          gradientText="Mitrasova Secara Real-Time"
          description="Pilih salah satu produk di bawah ini untuk melihat fitur utama dan gambaran antarmuka secara interaktif."
        />

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
          {INITIAL_SERVICES.map((srv) => (
            <button
              key={srv.slug}
              onClick={() => setActiveTab(srv.slug)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === srv.slug
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {srv.title}
            </button>
          ))}
        </div>

        {/* Interactive Preview Content */}
        <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 md:p-8 min-h-[320px] flex items-center justify-center">
          {activeTab === 'mitrasova-pos' && (
            <div className="w-full space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold text-white text-lg">Simulator Kasir Mitrasova POS</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  Status: Ready for Checkout
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-slate-400">Keranjang Belanja</p>
                  <p className="font-semibold text-white">3x Nasi Goreng Spesial</p>
                  <p className="font-semibold text-white">3x Es Teh Manis</p>
                  <p className="text-indigo-400 font-bold pt-2 border-t border-slate-800 text-sm">Total: Rp 105.000</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-slate-400">Metode Pembayaran</p>
                  <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded text-indigo-300 font-medium">
                    ✓ QRIS Statis / Dinamis
                  </div>
                  <div className="p-2 bg-slate-800 rounded text-slate-300">EDC Bank BCA / Mandiri</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-400">Cetak Struk Thermal</p>
                    <p className="text-slate-300 mt-1">Epson TM-T82 (Bluetooth Connected)</p>
                  </div>
                  <AppButton variant="secondary" size="sm" className="w-full">
                    Cetak Struk Uji Coba
                  </AppButton>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mitrasova-daya' && (
            <div className="w-full space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-white text-lg">Kalkulator Payroll Mitrasova Daya</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                  Regulasi: PPh 21 TER 2024+
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <p className="text-slate-400">Gaji Pokok & Tunjangan</p>
                  <p className="text-base font-bold text-white">Rp 12.500.000</p>
                  <p className="text-emerald-400">BPJS Ketenagakerjaan: Rp 500.000</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <p className="text-slate-400">Potongan PPh 21 TER</p>
                  <p className="text-base font-bold text-rose-400">- Rp 412.500</p>
                  <p className="text-slate-400">Kategori TER A (TK/0)</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5 bg-gradient-to-br from-indigo-900/30 to-slate-900">
                  <p className="text-slate-400">Take Home Pay Bersih</p>
                  <p className="text-xl font-extrabold text-cyan-300">Rp 12.587.500</p>
                  <span className="text-[10px] text-slate-400">Slip Gaji PDF Terenkripsi</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mitrasova-nexus' && (
            <div className="w-full space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-white text-lg">Monitor Server Node Mitrasova Nexus</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold animate-pulse">
                  ● Live Cluster Online
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-slate-400">Node Jakarta (Tier-4)</p>
                  <p className="text-sm font-bold text-emerald-400">Uptime: 99.999%</p>
                  <p className="text-slate-400">Latency: 4 ms</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-slate-400">DDoS Scrubbing Capacity</p>
                  <p className="text-sm font-bold text-cyan-400">2.4 Tbps Clean Pipe</p>
                  <p className="text-slate-400">Shield Status: Active</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-slate-400">Daily Automated Backup</p>
                  <p className="text-sm font-bold text-indigo-400">AES-256 Encrypted</p>
                  <p className="text-slate-400">Last Snapshot: 12 Min Ago</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mitrasova-labs' && (
            <div className="w-full space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold text-white text-lg">Software Sprint Roadmap Mitrasova Labs</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
                  Agile Scrum Delivery
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-indigo-400 font-bold">Sprint 1: Architecture</p>
                  <p className="text-slate-300">Database Schema & API Swagger Documentation</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-cyan-400 font-bold">Sprint 2: Core Engineering</p>
                  <p className="text-slate-300">Next.js App Router & Microservices Integration</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-purple-400 font-bold">Sprint 3: Audit & Launch</p>
                  <p className="text-slate-300">OWASP Penetration Test & Deployment</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </section>
  );
};
