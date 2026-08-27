import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { GlassCard, AppButton } from '@/components/shared';
import { ShoppingBag, Users, Server, Code, Zap, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Zap;

  return (
    <GlassCard className="p-8 border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-colors bg-slate-950/70">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {service.badge}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs font-mono font-semibold text-cyan-400 mt-1">{service.heroTagline}</p>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">{service.summary}</p>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          {service.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{feat.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 mt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link
          href={`/docs/${service.slug}`}
          className="text-xs text-slate-400 hover:text-cyan-400 font-medium flex items-center gap-1"
        >
          <span>Docs Hub</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <Link href={`/layanan/${service.slug}`}>
          <AppButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Detail Layanan
          </AppButton>
        </Link>
      </div>
    </GlassCard>
  );
};
