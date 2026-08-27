'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard, AppButton } from '@/components/shared';
import { ServiceItem } from '@/types';
import { useTranslation } from '@/lib/i18n';
import {
  ShoppingBag,
  Users,
  Server,
  Code,
  Zap,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Server,
  Code,
};

export const ProductCard: React.FC<{ product: ServiceItem; index?: number }> = ({
  product,
  index = 0,
}) => {
  const IconComponent = iconMap[product.icon] || Zap;
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <GlassCard className="h-full flex flex-col justify-between p-6 sm:p-7 border-slate-800/90 hover:border-indigo-500/40 bg-slate-950/70 transition-all duration-300 relative overflow-hidden group">
        {/* Top Accent Stripe on Hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="space-y-5">
          {/* Icon & Category Badge */}
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {product.badge}
            </span>
          </div>

          {/* Title & Taglines */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
              {product.title}
            </h3>
            <p className="text-xs font-semibold text-cyan-400 mt-1">{product.heroTagline}</p>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
              {product.summary}
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{feat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Actions: Pelajari Detail & Buka Web Produk */}
        <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <Link href={`/product/${product.slug}`}>
            <AppButton
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('product.card.viewDetail')}
            </AppButton>
          </Link>

          {product.externalUrl && (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <span>{t('product.card.openWeb')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};
