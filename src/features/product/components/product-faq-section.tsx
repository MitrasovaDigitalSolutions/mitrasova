'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '@/types';
import { SectionHeading, GlassCard } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProductFaqSection: React.FC<{ product: ServiceItem }> = ({ product }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!product.faqs || product.faqs.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeading
        badge={t('product.faq.badge')}
        title={t('product.faq.title')}
        gradientText={t('product.faq.titleGradient', { title: product.title })}
        description={t('product.faq.description')}
      />

      <div className="mt-10 space-y-3">
        {product.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <GlassCard
              key={idx}
              className="border-slate-800/90 overflow-hidden bg-slate-950/70 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180 text-cyan-400'
                  )}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
