import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { INITIAL_SERVICES } from '@/lib/data';
import { ShoppingBag, Users, Server, Code, Zap, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';

export const ProductSuiteGrid: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Users,
    Server,
    Code,
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Ekosistem Produk"
        title="Empat Pilar Solusi Teknologi"
        gradientText="Pilihan Bisnis Modern"
        description="Setiap produk didesain secara khusus untuk mempercepat pertumbuhan bisnis, mengotomatisasi operasional, dan menjaga keamanan data enterprise."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_SERVICES.map((service) => {
          const IconComponent = iconMap[service.icon] || Zap;
          return (
            <GlassCard key={service.id} className="flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400 mt-1">{service.heroTagline}</p>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">{service.summary}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{feat.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href={`/docs/${service.slug}`}
                  className="text-xs text-slate-400 hover:text-slate-200 font-medium flex items-center gap-1"
                >
                  <span>Baca Docs</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
                <Link href={`/layanan/${service.slug}`}>
                  <AppButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Pelajari {service.title}
                  </AppButton>
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
