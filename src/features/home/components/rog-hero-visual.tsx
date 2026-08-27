'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TelemetryCard } from './telemetry-card';
import { APP_VERSION } from '@/lib/version';
import { useTranslation } from '@/lib/i18n';
import { Terminal, Cpu, Database, Network, Activity } from 'lucide-react';

export const RogHeroVisual: React.FC = () => {
  const { dict } = useTranslation();
  const tel = dict.home.hero.telemetry;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 80,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 80,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full flex justify-center py-6"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="w-full max-w-lg preserve-3d"
      >
        <div className="glass-card-rog rounded-2xl p-6 sm:p-8 border border-slate-800/90 relative overflow-hidden space-y-6">
          {/* Cyber Corner Notches */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 z-20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 z-20" />

          {/* Top Status Header */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between border-b border-slate-800/80 pb-3 sm:pb-4 gap-2 text-[10px] sm:text-xs font-mono">
            <div className="flex items-center gap-1.5 sm:gap-2 text-cyan-400">
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="font-bold truncate">
                MITRASOVA-CORE-OS // v{APP_VERSION}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold">{tel.allSystemsNominal}</span>
            </div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
            <TelemetryCard
              title={tel.querySpeed}
              value="12.4ms"
              metric={tel.latencyMetric}
              icon={<Cpu className="w-4 h-4 text-cyan-400" />}
              variant="cyan"
            />
            <TelemetryCard
              title={tel.pgSync}
              value="99.99%"
              metric={tel.realtimeNode}
              icon={<Database className="w-4 h-4 text-indigo-400" />}
              variant="indigo"
            />
            <TelemetryCard
              title={tel.throughput}
              value="48.2k/s"
              metric={tel.bandwidth}
              icon={<Network className="w-4 h-4 text-purple-400" />}
              variant="purple"
            />
            <TelemetryCard
              title={tel.clusterSec}
              value="AES-256"
              metric={tel.sslSecured}
              icon={<Activity className="w-4 h-4 text-emerald-400" />}
              variant="emerald"
            />
          </div>

          {/* Bottom Terminal Log Output */}
          <div className="rounded-xl bg-slate-950/90 border border-slate-800/80 p-3 text-[11px] font-mono space-y-1 text-slate-400">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="text-emerald-400">&gt;</span>
              <span>{(tel.logReady || '').replace('{{version}}', APP_VERSION ?? '1.0.0')}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400">&gt;</span>
              <span>{tel.logGateway}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
