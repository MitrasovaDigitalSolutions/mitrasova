'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { AppButton } from '@/components/shared';
import { DemoTabSimulatorProps } from '../../types';

export const DemoTabPos: React.FC<DemoTabSimulatorProps> = ({ onSimulate, isSimulating }) => {
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
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-base sm:text-lg">Simulator Kasir Mitrasova POS</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/30 flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Ready for Checkout
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Keranjang Belanja</p>
          <p className="font-semibold text-white">3x Nasi Goreng Spesial</p>
          <p className="font-semibold text-white">3x Es Teh Manis</p>
          <p className="text-cyan-400 font-mono font-bold pt-2 border-t border-slate-800 text-sm">
            Total: Rp 135.000
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <p className="text-slate-400 font-mono text-[11px]">Sinkronisasi Multi-Outlet</p>
          <p className="text-slate-300">Cabang Grand Indonesia: <span className="text-emerald-400 font-semibold">Online</span></p>
          <p className="text-slate-300">Cabang Senayan City: <span className="text-emerald-400 font-semibold">Online</span></p>
          <p className="text-slate-300">Cabang Kelapa Gading: <span className="text-emerald-400 font-semibold">Online</span></p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 font-mono text-[11px]">Metode Pembayaran</p>
            <p className="font-semibold text-white mt-1">QRIS Statis/Dinamis + Auto Struk Thermal</p>
          </div>
          <AppButton
            variant="secondary"
            size="sm"
            className="w-full mt-3 font-mono justify-center"
            isLoading={isSimulating}
            onClick={() => onSimulate('✅ Transaksi Sukses! Struk kasir terkirim ke printer thermal & stok terpotong.')}
            rightIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Simulasikan Bayar QRIS
          </AppButton>
        </div>
      </div>
    </motion.div>
  );
};
