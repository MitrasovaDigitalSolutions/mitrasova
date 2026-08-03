import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { AppButton } from '@/components/common/AppButton';
import { ShoppingBag, Users, Server, Code, Zap, ArrowRight, BookOpen } from 'lucide-react';

interface ServiceHeroProps {
  service: ServiceItem;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Users,
    Server,
    Code,
  };

  const ServiceIcon = iconMap[service.icon] || Zap;

  return (
    <section className="relative pt-16 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-[#090D16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-md">
            <ServiceIcon className="w-4 h-4 text-cyan-400" />
            <span>Dedicated Solution: {service.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {service.title}{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
              Enterprise Edition
            </span>
          </h1>

          <p className="text-xl text-cyan-300 font-semibold">{service.heroTagline}</p>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {service.description}
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/konsultasi">
              <AppButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Konsultasikan {service.title}
              </AppButton>
            </Link>
            <Link href={`/docs/${service.slug}`}>
              <AppButton variant="outline" size="lg" leftIcon={<BookOpen className="w-4 h-4 text-cyan-400" />}>
                Dokumentasi & Tutorial Hub
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
