'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SectionHeading } from '@/components/shared';
import { getLocalizedServices } from '@/lib/data';
import { ProductCard } from './product-card';
import { useTranslation } from '@/lib/i18n';

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
  const { t, locale } = useTranslation();
  const services = getLocalizedServices(locale);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('home.products.badge')}
        title={t('home.products.title')}
        gradientText={t('home.products.titleGradient')}
        description={t('home.products.description')}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
      >
        {services.map((service) => (
          <ProductCard key={service.id} service={service} />
        ))}
      </motion.div>
    </section>
  );
};
