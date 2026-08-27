import React from 'react';
import { GlassCard } from '@/components/shared';
import { CheckCircle2 } from 'lucide-react';
import { FeatureItem } from '@/types';

export const ServiceFeatureCard: React.FC<{ feature: FeatureItem }> = ({ feature }) => {
  return (
    <GlassCard className="p-8 border-slate-800 flex items-start gap-5 bg-slate-950/70">
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
      </div>
    </GlassCard>
  );
};
