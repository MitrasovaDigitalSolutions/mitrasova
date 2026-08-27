'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { GlassCard, AppButton } from '@/components/shared';
import { ServiceItem } from '@/types';
import { ShoppingBag, Users, Server, Code, Zap, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const ProductCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Zap;

  return (
    <motion.div variants={cardVariants} className="h-full">
      <GlassCard className="flex flex-col justify-between group h-full border-slate-800/90 hover:border-slate-700 transition-colors bg-slate-950/70">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {service.badge}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
              {service.title}
            </h3>
            <p className="text-xs font-mono font-semibold text-cyan-400 mt-1">{service.heroTagline}</p>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">{service.summary}</p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            {service.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{feat.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
          <Link
            href={`/docs/${service.slug}`}
            className="text-xs text-slate-400 hover:text-slate-200 font-medium flex items-center gap-1 group/link"
          >
            <span>Baca Docs</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          <Link href={`/layanan/${service.slug}`}>
            <AppButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Pelajari {service.title}
            </AppButton>
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
};
