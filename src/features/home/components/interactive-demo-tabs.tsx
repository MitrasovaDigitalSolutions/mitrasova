'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading, GlassCard } from '@/components/shared';
import { INITIAL_SERVICES } from '@/lib/data';
import { DemoTabPos } from './demo-tabs/demo-tab-pos';
import { DemoTabHris } from './demo-tabs/demo-tab-hris';
import { DemoTabCloud } from './demo-tabs/demo-tab-cloud';
import { DemoTabLabs } from './demo-tabs/demo-tab-labs';
import { CheckCircle2 } from 'lucide-react';

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
    }, 700);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-6 md:p-10 lg:p-12 border-indigo-500/30 relative overflow-hidden bg-slate-950/80">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <SectionHeading
            badge="Live Interactive Simulator"
            title="Lihat Cara Kerja Produk"
            gradientText="Mitrasova Secara Real-Time"
            description="Pilih salah satu produk di bawah ini untuk melihat simulasi fitur utama dan gambaran antarmuka secara interaktif."
          />

          {/* Tab Selection */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/90 w-fit mx-auto">
            {INITIAL_SERVICES.map((srv) => {
              const isActive = activeTab === srv.slug;
              return (
                <button
                  key={srv.slug}
                  type="button"
                  onClick={() => setActiveTab(srv.slug)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer z-10 ${
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
          <div className="bg-[#090d16] rounded-2xl border border-slate-800 p-5 md:p-8 min-h-[320px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'mitrasova-pos' && (
                <DemoTabPos onSimulate={handleSimulate} isSimulating={isSimulating} />
              )}
              {activeTab === 'mitrasova-daya' && (
                <DemoTabHris onSimulate={handleSimulate} isSimulating={isSimulating} />
              )}
              {activeTab === 'mitrasova-nexus' && (
                <DemoTabCloud onSimulate={handleSimulate} isSimulating={isSimulating} />
              )}
              {activeTab === 'mitrasova-labs' && (
                <DemoTabLabs onSimulate={handleSimulate} isSimulating={isSimulating} />
              )}
            </AnimatePresence>

            {/* Simulation Feedback Alert */}
            {simMessage && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-6 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{simMessage}</span>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};
