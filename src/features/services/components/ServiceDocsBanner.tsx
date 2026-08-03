import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';
import { AppButton } from '@/components/common/AppButton';
import { ArrowRight } from 'lucide-react';

interface ServiceDocsBannerProps {
  service: ServiceItem;
}

export const ServiceDocsBanner: React.FC<ServiceDocsBannerProps> = ({ service }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <GlassCard className="p-8 md:p-12 border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">
          Butuh Panduan Penggunaan & Panduan Integrasi?
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Akses portal dokumentasi resmi <strong>Service-Scoped Docs Hub</strong> khusus untuk {service.title}.
        </p>
        <div className="pt-2">
          <Link href={`/docs/${service.slug}`}>
            <AppButton variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Buka Docs Hub {service.title}
            </AppButton>
          </Link>
        </div>
      </GlassCard>
    </section>
  );
};
