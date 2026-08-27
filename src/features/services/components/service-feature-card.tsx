import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FeatureItem } from '@/types';

export const ServiceFeatureCard: React.FC<{ feature: FeatureItem; index?: number }> = ({
  feature,
  index = 0,
}) => {
  return (
    <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-slate-900/30 transition-colors group">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
          <span className="text-xl sm:text-2xl font-black font-mono text-slate-700 group-hover:text-slate-500 transition-colors">
            0{index + 1}
          </span>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {feature.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 font-normal">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};
