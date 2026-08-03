'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { INITIAL_SERVICES } from '@/lib/data';
import { ShoppingBag, Users, Server, Code, CheckCircle, RefreshCw } from 'lucide-react';

export const InteractiveDemoTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mitrasova-pos');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simMessage, setSimMessage] = useState<string | null>(null);

  const handleSimulate = (msg: string) => {
    setIsSimulating(true);
    setSimMessage('Memproses transaksi simulator...');
    setTimeout(() => {
      setIsSimulating(false);
      setSimMessage(msg);
      setTimeout(() => setSimMessage(null), 4000);
    }, 800);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-6 md:p-10 lg:p-12 border-indigo-500/30 relative overflow-hidden bg-slate-950/80">
          {/* Cyber Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <SectionHeading
            badge="Live Interactive Simulator"
            title="Lihat Cara Kerja Produk"
            gradientText="Mitrasova Secara Real-Time"
            description="Pilih salah satu produk di bawah ini untuk melihat simulasi fitur utama dan gambaran antarmuka secara interaktif."
          />

          {/* Tab Selection */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-900/90 p-2 rounded-2xl border border-slate-800/90">
            {INITIAL_SERVICES.map((srv) => {
              const isActive = activeTab === srv.slug;
              return (
                <button
                  key={srv.slug}
                  onClick={() => setActiveTab(srv.slug)}
                  className={`relative px-5 py-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer z-10 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {srv.title}
                </button>
              );
            })}
          </div>

          {/* Interactive Simulation Display */}
          <div className="bg-[#090d16] rounded-2xl border border-slate-800 p-6 md:p-8 min-h-[340px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'mitrasova-pos' && (
                <motion.div
                  key="mitrasova-pos"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white text-lg">Simulator Kasir Mitrasova POS</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Ready for Checkout
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-slate-400 font-mono">Keranjang Belanja</p>
                      <p className="font-semibold text-white">3x Nasi Goreng Spesial</p>
                      <p className="font-semibold text-white">3x Es Teh Manis</p>
                      <p className="text-cyan-400 font-mono font-bold pt-2 border-t border-slate-800 text-sm">
                        Total: Rp 105.000
                      </p>
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-slate-400 font-mono">Metode Pembayaran</p>
                      <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 font-medium">
                        ✓ QRIS Statis / Dinamis
                      </div>
                      <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">EDC Bank BCA / Mandiri</div>
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                      <div>
                        <p className="text-slate-400 font-mono">Cetak Struk Thermal</p>
                        <p className="text-slate-300 mt-1">Epson TM-T82 (Bluetooth Connected)</p>
                      </div>
                      <AppButton
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={() => handleSimulate('✓ Struk thermal #INV-88231 berhasil dicetak!')}
                        disabled={isSimulating}
                      >
                        {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Cetak Struk Uji Coba'}
                      </AppButton>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'mitrasova-daya' && (
                <motion.div
                  key="mitrasova-daya"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white text-lg">Kalkulator Payroll Mitrasova Daya</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-semibold border border-indigo-500/30">
                      Regulasi: PPh 21 TER 2024+
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
                      <p className="text-slate-400 font-mono">Gaji Pokok & Tunjangan</p>
                      <p className="text-base font-black text-white font-mono">Rp 12.500.000</p>
                      <p className="text-emerald-400">BPJS Ketenagakerjaan: Rp 500.000</p>
                    </div>
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
                      <p className="text-slate-400 font-mono">Potongan PPh 21 TER</p>
                      <p className="text-base font-black text-rose-400 font-mono">- Rp 412.500</p>
                      <p className="text-slate-400">Kategori TER A (TK/0)</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-1.5">
                      <p className="text-slate-400 font-mono">Take Home Pay Bersih</p>
                      <p className="text-2xl font-black text-cyan-300 font-mono glow-text-cyan">Rp 12.587.500</p>
                      <span className="text-[10px] text-slate-400 block mt-1">Slip Gaji PDF Terenkripsi AES-256</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'mitrasova-nexus' && (
                <motion.div
                  key="mitrasova-nexus"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <Server className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white text-lg">Monitor Cluster Server Mitrasova Nexus</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Node Online
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-slate-400 font-mono">Node Jakarta (Tier-4)</p>
                      <p className="text-sm font-bold text-emerald-400 font-mono">Uptime: 99.999%</p>
                      <p className="text-slate-400">Latency: 4 ms</p>
                    </div>
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-slate-400 font-mono">DDoS Scrubbing Capacity</p>
                      <p className="text-sm font-bold text-cyan-400 font-mono">2.4 Tbps Clean Pipe</p>
                      <p className="text-slate-400">Shield Status: Active</p>
                    </div>
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-slate-400 font-mono">Automated Daily Snapshot</p>
                      <p className="text-sm font-bold text-indigo-400 font-mono">AES-256 Encrypted</p>
                      <p className="text-slate-400">Last Snapshot: 12 Min Ago</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'mitrasova-labs' && (
                <motion.div
                  key="mitrasova-labs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <Code className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white text-lg">Software Sprint Roadmap Mitrasova Labs</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-semibold border border-cyan-500/30">
                      Agile Scrum Delivery
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-indigo-400 font-mono font-bold">Sprint 1: Architecture</p>
                      <p className="text-slate-300">Database Schema & API OpenAPI Swagger Documentation</p>
                    </div>
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-cyan-400 font-mono font-bold">Sprint 2: Core Engineering</p>
                      <p className="text-slate-300">Next.js App Router & Microservices Integration</p>
                    </div>
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-purple-400 font-mono font-bold">Sprint 3: Audit & Launch</p>
                      <p className="text-slate-300">OWASP Penetration Test & Production Deployment</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulation Feedback Alert */}
            {simMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{simMessage}</span>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};
