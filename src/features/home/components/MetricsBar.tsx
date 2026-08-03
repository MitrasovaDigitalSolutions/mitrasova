import React from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { METRIC_STATS } from '../constants';

export const MetricsBar: React.FC = () => {
  return (
    <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {METRIC_STATS.map((stat, idx) => (
        <GlassCard key={idx} className="p-4 text-center">
          <span className={`text-2xl font-bold ${stat.highlightColor || 'text-indigo-400'}`}>
            {stat.value}
          </span>
          <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
        </GlassCard>
      ))}
    </div>
  );
};
