import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { ShoppingBag, Users, Server, Code, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Users,
    Server,
    Code,
  };

  const Icon = iconMap[service.icon] || Shield;

  return (
    <GlassCard className="flex flex-col justify-between p-8 border-slate-800">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
            <Icon className="w-7 h-7" />
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {service.category}
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white">{service.title}</h2>
          <p className="text-sm font-semibold text-cyan-400 mt-1">{service.heroTagline}</p>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">{service.description}</p>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fitur Unggulan Utama:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{f.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 mt-8 border-t border-slate-800 flex items-center justify-between">
        <Link href={`/docs/${service.slug}`} className="text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors">
          Dokumentasi {service.title} →
        </Link>
        <Link href={`/layanan/${service.slug}`}>
          <AppButton variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Buka Halaman Layanan
          </AppButton>
        </Link>
      </div>
    </GlassCard>
  );
};
