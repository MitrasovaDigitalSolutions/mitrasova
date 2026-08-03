'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15,
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge="Ekosistem Produk"
        title="Empat Pilar Solusi Teknologi"
        gradientText="Pilihan Bisnis Modern"
        description="Setiap produk didesain secara khusus untuk mempercepat pertumbuhan bisnis, mengotomatisasi operasional, dan menjaga keamanan data enterprise."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
      >
        {INITIAL_SERVICES.map((service) => {
          const IconComponent = iconMap[service.icon] || Zap;
          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="flex flex-col justify-between group h-full border-slate-800/90 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] transition-all">
                {/* Cyber Notch Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none rounded-tr-2xl" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 group-hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
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
        })}
      </motion.div>
    </section>
  );
};
