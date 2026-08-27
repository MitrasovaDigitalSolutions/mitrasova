'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server, RefreshCw } from 'lucide-react';
import { AppButton } from '@/components/shared';
import { DemoTabSimulatorProps } from '../../types';

export const DemoTabCloud: React.FC<DemoTabSimulatorProps> = ({ onSimulate, isSimulating }) => {
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
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Server className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-base sm:text-lg">Simulator Server Mitrasova Nexus</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono font-semibold border border-purple-500/30 flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Cluster Status: Healthy
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Metrik Beban Server</p>
          <p className="text-slate-300">CPU Usage: <span className="text-emerald-400 font-semibold">14.2%</span></p>
          <p className="text-slate-300">RAM Allocated: <span className="text-emerald-400 font-semibold">4.2 / 32 GB</span></p>
          <p className="text-purple-400 font-mono font-bold pt-2 border-t border-slate-800 text-sm">
            Bandwidth: 10 Gbps Unmetered
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Mitigasi Serangan & Keamanan</p>
          <p className="text-slate-300">DDoS Protection: <span className="text-emerald-400 font-semibold">Active Layer 7</span></p>
          <p className="text-slate-300">Auto Backup: <span className="text-cyan-400 font-semibold">Tiap 6 Jam (S3 Encrypted)</span></p>
          <p className="text-slate-300">Failover Cluster: <span className="text-emerald-400 font-semibold">Sync Standby</span></p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 font-mono text-[11px]">Pengujian Failover</p>
            <p className="font-semibold text-white mt-1">Uji Redundansi High-Availability Node</p>
          </div>
          <AppButton
            variant="outline"
            size="sm"
            className="w-full mt-3 font-mono justify-center"
            isLoading={isSimulating}
            onClick={() => onSimulate('✅ Traffic Switched! Failover otomatis aktif dalam 0.04 detik tanpa downtime!')}
            rightIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Uji Auto-Failover Server
          </AppButton>
        </div>
      </div>
    </motion.div>
  );
};
