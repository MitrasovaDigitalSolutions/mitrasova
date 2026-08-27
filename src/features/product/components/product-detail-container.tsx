'use client';

import React from 'react';
import Link from 'next/link';
import { ProductDetailProps } from '../types';
import { ProductHero } from './product-hero';
import { ProductFeatureSuite } from './product-feature-suite';
import { ProductUseCases } from './product-use-cases';
import { AppButton } from '@/components/shared';
import { getLocalizedService } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export const ProductDetailContainer: React.FC<ProductDetailProps> = ({ product }) => {
  const { locale, t } = useTranslation();
  const activeProduct = getLocalizedService(product.slug, locale) || product;

  return (
    <div className="space-y-20 pb-28">
      {/* Product Hero */}
      <ProductHero product={activeProduct} />

      {/* Feature Modules Suite */}
      <ProductFeatureSuite product={activeProduct} />

      {/* Business Use Cases Fit */}
      <ProductUseCases product={activeProduct} />

      {/* Bottom Conversion CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activeProduct.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t('product.detail.moreInfoTitle', { title: activeProduct.title })}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {t('product.detail.moreInfoDesc')}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {activeProduct.externalUrl && (
                <a
                  href={activeProduct.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <AppButton
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto justify-center bg-gradient-to-r from-indigo-600 to-cyan-600"
                    rightIcon={<ExternalLink className="w-4 h-4" />}
                  >
                    {t('product.detail.openOfficialWeb', { title: activeProduct.title })}
                  </AppButton>
                </a>
              )}

              <Link href="/konsultasi" className="w-full sm:w-auto">
                <AppButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('product.ctaBtn')}
                </AppButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
