'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShoppingCart, Users, Server, Cpu, Activity, ShieldAlert, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';

export const RogHeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rawRotateX = useTransform(scrollYProgress, [0, 0.4], [24, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const rawY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  const rotateX = useSpring(rawRotateX, { stiffness: 80, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  return (
    <div ref={containerRef} className="relative pt-8 pb-12 perspective-1000">
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: 'preserve-3d',
        }}
        className="max-w-5xl mx-auto rounded-2xl p-1 p-[1px] bg-gradient-to-b from-cyan-500/40 via-indigo-500/30 to-purple-500/10 shadow-[0_0_80px_rgba(79,70,229,0.3)] relative group"
      >
        {/* Futuristic Cyber Corner Notches */}
        <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-cyan-400 z-30" />
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-cyan-400 z-30" />
        <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-indigo-400 z-30" />
        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-indigo-400 z-30" />

        {/* Ambient Top Glow Bar */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 shadow-[0_0_15px_#22d3ee]" />

        {/* Main Glass Dashboard Shell */}
        <div className="bg-[#090e1a]/95 backdrop-blur-2xl rounded-2xl p-5 md:p-7 border border-slate-800/90 space-y-6 relative overflow-hidden">
          {/* Animated Background Grid & Scanline */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
          <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-cyan-500/10 to-transparent animate-scanline pointer-events-none opacity-40" />

          {/* Top Window HUD Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_#f43f5e]" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_#10b981]" />
              </div>
              <span className="text-xs font-mono text-slate-400 border-l border-slate-800 pl-3 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                MITRASOVA-CORE-OS // v4.0.9 (STABLE)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SYSTEM OPERATIONAL
              </span>
            </div>
          </div>

          {/* Live Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {/* POS Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-all group/item hover:bg-slate-900">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Mitrasova POS</span>
                <ShoppingCart className="w-4 h-4 text-indigo-400 group-hover/item:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-black text-white mt-2 font-mono">Rp 482.90M</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+24.8% M-o-M</span>
              </div>
            </div>

            {/* Daya Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all group/item hover:bg-slate-900">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Mitrasova Daya</span>
                <Users className="w-4 h-4 text-cyan-400 group-hover/item:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-black text-white mt-2 font-mono">3,420 Tim</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-cyan-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PPh 21 TER Sync</span>
              </div>
            </div>

            {/* Nexus Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all group/item hover:bg-slate-900">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Mitrasova Nexus</span>
                <Server className="w-4 h-4 text-purple-400 group-hover/item:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-black text-white mt-2 font-mono">99.999%</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-purple-400 font-medium">
                <Activity className="w-3.5 h-3.5" />
                <span>0.001s Latency</span>
              </div>
            </div>

            {/* Labs Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all group/item hover:bg-slate-900">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Mitrasova Labs</span>
                <Cpu className="w-4 h-4 text-emerald-400 group-hover/item:scale-110 transition-transform" />
              </div>
              <p className="text-xl font-black text-white mt-2 font-mono">AI Models</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-medium">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Encrypted v2</span>
              </div>
            </div>
          </div>

          {/* Futuristic Interactive Simulation Preview Graph */}
          <div className="bg-slate-950/90 rounded-xl border border-slate-800/80 p-4 relative z-10 overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                REALTIME TRANSACTION TELEMETRY STREAM
              </span>
              <span className="text-slate-500 font-mono">NODE: CGK-01 (JAKARTA)</span>
            </div>

            {/* Waveform Graphic */}
            <div className="h-28 flex items-end justify-between gap-1.5 pt-4">
              {[40, 65, 30, 80, 55, 95, 70, 45, 85, 60, 100, 75, 90, 50, 80, 65, 95, 85, 40, 70, 90, 100, 60, 75].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: '10%' }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    delay: i * 0.06,
                  }}
                  className={`w-full rounded-t-sm ${
                    i % 3 === 0
                      ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_8px_#22d3ee]'
                      : i % 3 === 1
                      ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-[0_0_8px_#818cf8]'
                      : 'bg-gradient-to-t from-purple-600 to-purple-400 shadow-[0_0_8px_#c084fc]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
