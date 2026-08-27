'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, RefreshCw } from 'lucide-react';
import { AppButton } from '@/components/shared';
import { DemoTabSimulatorProps } from '../../types';

export const DemoTabLabs: React.FC<DemoTabSimulatorProps> = ({ onSimulate, isSimulating }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Code className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-base sm:text-lg">Simulator Microservices Mitrasova Labs</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/30 flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Gateway API v2.4 (Active)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Modern Tech Stack</p>
          <p className="font-semibold text-white">Next.js 16 + React 19 + TypeScript</p>
          <p className="text-slate-400">Tailwind CSS + Prisma ORM + Bun</p>
          <p className="text-emerald-400 font-mono font-bold pt-2 border-t border-slate-800 text-sm">
            Zero Legacy Dependencies
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Kualitas Code & Kecepatan</p>
          <p className="text-slate-300">Lighthouse Score: <span className="text-emerald-400 font-semibold">100/100</span></p>
          <p className="text-slate-300">Bundle Size: <span className="text-emerald-400 font-semibold">&lt; 90 kB Initial Gzip</span></p>
          <p className="text-slate-300">Database Query: <span className="text-cyan-400 font-semibold">&lt; 3.2ms p95</span></p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 font-mono text-[11px]">API Benchmark</p>
            <p className="font-semibold text-white mt-1">Uji Beban 10,000 Concurrent Requests</p>
          </div>
          <AppButton
            variant="secondary"
            size="sm"
            className="w-full mt-3 font-mono justify-center"
            isLoading={isSimulating}
            onClick={() => onSimulate('✅ Benchmark Selesai! 10.000 request diproses dengan latency rata-rata 18ms & 0% error.')}
            rightIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Jalankan API Load Test
          </AppButton>
        </div>
      </div>
    </motion.div>
  );
};
