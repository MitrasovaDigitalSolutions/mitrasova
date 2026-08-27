import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TelemetryCardProps {
  title: string;
  value: string;
  metric: string;
  icon: React.ReactNode;
  variant?: 'indigo' | 'cyan' | 'purple' | 'emerald';
}

const variantGradients = {
  indigo: 'text-indigo-400',
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  emerald: 'text-emerald-400',
};

export const TelemetryCard: React.FC<TelemetryCardProps> = ({
  title,
  value,
  metric,
  icon,
  variant = 'indigo',
}) => {
  return (
    <div
      className={cn(
        'bg-slate-900/80 p-4 rounded-xl border border-slate-800 transition-colors',
        variantGradients[variant]
      )}
    >
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{title}</span>
        <div className="shrink-0">
          {icon}
        </div>
      </div>
      <p className="text-xl font-black text-white mt-2 font-mono">{value}</p>
      <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-medium">
        <ArrowUpRight className="w-3.5 h-3.5" />
        <span>{metric}</span>
      </div>
    </div>
  );
};
