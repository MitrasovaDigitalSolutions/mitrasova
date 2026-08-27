'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SectionHeading } from '@/components/shared';
import { INITIAL_SERVICES } from '@/lib/data';
import { ProductCard } from './product-card';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const ProductSuiteGrid: React.FC = () => {
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
        {INITIAL_SERVICES.map((service) => (
          <ProductCard key={service.id} service={service} />
        ))}
      </motion.div>
    </section>
  );
};
