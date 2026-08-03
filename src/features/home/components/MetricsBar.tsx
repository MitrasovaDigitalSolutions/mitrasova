'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';
import { METRIC_STATS } from '../constants';

export const MetricsBar: React.FC = () => {
  return (
    <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto items-stretch">
      {METRIC_STATS.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -4, scale: 1.03 }}
          className="h-full"
        >
          <GlassCard className="h-full p-5 text-center border-slate-800/90 hover:border-cyan-500/40 transition-colors flex flex-col justify-center items-center">
            <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight glow-text-cyan ${stat.highlightColor || 'text-cyan-400'}`}>
              {stat.value}
            </span>
            <p className="text-xs text-slate-300 mt-1.5 font-medium leading-snug">{stat.label}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};
