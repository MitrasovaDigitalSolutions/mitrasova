'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { ServiceItem } from '@/types';
import { ProductCard } from './product-card';
import { AppButton } from '@/components/shared';
import { useTranslation } from '@/lib/i18n';
import {
  Search,
  Sparkles,
  Layers,
  ShoppingBag,
  Users,
  Server,
  Code,
  ArrowRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProductHubContainer: React.FC<{ initialProducts?: ServiceItem[] }> = ({
  initialProducts = INITIAL_PRODUCTS,
}) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'ALL', label: t('product.hub.categories.all'), icon: Layers },
    { id: 'SaaS POS & Accounting', label: t('product.hub.categories.pos'), icon: ShoppingBag },
    { id: 'HRIS & Workforce', label: t('product.hub.categories.hris'), icon: Users },
    { id: 'Cloud Infrastructure', label: t('product.hub.categories.cloud'), icon: Server },
    { id: 'Custom Engineering', label: t('product.hub.categories.custom'), icon: Code },
  ];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (activeCategory !== 'ALL' && product.category !== activeCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchTagline = product.heroTagline.toLowerCase().includes(q);
        const matchSummary = product.summary.toLowerCase().includes(q);
        const matchBadge = product.badge?.toLowerCase().includes(q) || false;
        const matchFeatures = product.features.some(
          (f) => f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
        );
        return matchTitle || matchTagline || matchSummary || matchBadge || matchFeatures;
      }
      return true;
    });
  }, [initialProducts, activeCategory, searchQuery]);

  return (
    <div className="relative overflow-hidden pb-32">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-indigo-600/15 via-cyan-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header Section */}
      <section className="pt-16 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('product.hub.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            {t('product.hub.title')}{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              {t('product.hub.titleGradient')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t('product.hub.description')}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none shrink-0 min-h-[38px]',
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t('product.hub.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/40">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">{t('product.hub.emptyTitle')}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {t('product.hub.emptyDesc')}
            </p>
          </div>
        )}
      </section>

      {/* Bottom Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
            <Sparkles className="w-4 h-4" />
            <span>{t('product.hub.consultBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t('product.hub.consultTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t('product.hub.consultDesc')}
          </p>
          <div className="pt-2">
            <Link href="/konsultasi">
              <AppButton variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('product.hub.consultBtn')}
              </AppButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
