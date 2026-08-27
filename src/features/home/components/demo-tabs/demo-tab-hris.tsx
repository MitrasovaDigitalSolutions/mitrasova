'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, RefreshCw } from 'lucide-react';
import { AppButton } from '@/components/shared';
import { DemoTabSimulatorProps } from '../../types';

export const DemoTabHris: React.FC<DemoTabSimulatorProps> = ({ onSimulate, isSimulating }) => {
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
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Users className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-base sm:text-lg">Simulator Payroll Mitrasova Daya</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-semibold border border-cyan-500/30 flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          PPh 21 TER Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Karyawan Target</p>
          <p className="font-semibold text-white">Raihan Pratama (Sr. Architect)</p>
          <p className="text-slate-400">Status Pajak: K/1 (TER Kategori A)</p>
          <p className="text-indigo-400 font-mono font-bold pt-2 border-t border-slate-800 text-sm">
            Gaji Pokok: Rp 28.500.000
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Presensi & Geolocation</p>
          <p className="text-slate-300">Total Hari Kerja: <span className="text-white font-semibold">22 Hari</span></p>
          <p className="text-slate-300">Kehadiran Tepat Waktu: <span className="text-emerald-400 font-semibold">100%</span></p>
          <p className="text-slate-300">Cuti Tahunan Digunakan: <span className="text-cyan-400 font-semibold">0 Hari</span></p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 font-mono text-[11px]">Kalkulasi Otomatis</p>
            <p className="font-semibold text-white mt-1">Potongan BPJS & PPh 21 TER Terhitung Instan</p>
          </div>
          <AppButton
            variant="primary"
            size="sm"
            className="w-full mt-3 font-mono justify-center"
            isLoading={isSimulating}
            onClick={() => onSimulate('✅ Slip Gaji Terbit! Notifikasi WhatsApp & Email otomatis dikirimkan ke karyawan.')}
            rightIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Generate Slip Gaji Instan
          </AppButton>
        </div>
      </div>
    </motion.div>
  );
};
