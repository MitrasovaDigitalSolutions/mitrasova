import React from 'react';
import { HOME_METRICS } from '../constants';

export const MetricsBar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-center">
      {HOME_METRICS.map((metric, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md"
        >
          <div className="text-2xl sm:text-3xl font-black text-white font-mono bg-gradient-to-r from-white to-slate-200 bg-clip-text">
            {metric.value}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">{metric.label}</p>
          <span className="inline-block text-[10px] font-mono text-cyan-400 font-semibold mt-1">
            {metric.growth}
          </span>
        </div>
      ))}
    </div>
  );
};
