import React from 'react';
import { GlassCard } from '@/components/shared';
import { AdminMetricItem } from '../types';
import { FileText, Layers, FolderTree, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Layers,
  FolderTree,
  ShieldCheck,
};

const borderStyles = {
  cyan: 'border-cyan-500/20 text-cyan-400',
  indigo: 'border-indigo-500/20 text-indigo-400',
  purple: 'border-purple-500/20 text-purple-400',
  emerald: 'border-emerald-500/20 text-emerald-400',
};

export const AdminMetricCard: React.FC<{ metric: AdminMetricItem }> = ({ metric }) => {
  const IconComponent = iconMap[metric.iconName] || FileText;

  return (
    <GlassCard className={cn('p-5 border bg-slate-950/80 transition-colors', borderStyles[metric.accent])}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-slate-400">{metric.label}</span>
        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3">
        <h4 className="text-2xl sm:text-3xl font-black text-white font-mono">{metric.value}</h4>
        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
          <span>{metric.sub}</span>
          <span className="font-mono text-cyan-400 font-semibold">{metric.trend}</span>
        </div>
      </div>
    </GlassCard>
  );
};
