import type { Metadata } from 'next';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { buildCanonicalUrl, buildOgImageUrl } from '@/lib/seo';
import { ProductHubPage } from '@/features/product';
import { BreadcrumbJsonLd } from '@/components/shared/json-ld';

export const metadata: Metadata = {
  title: 'Katalog Produk & Solusi Digital',
  description:
    'Eksplorasi seluruh rangkaian produk software Mitrasova: Mitrasova POS (Kasir Offline), Mitrasova Daya (HRIS & Payroll), Mitrasova Nexus (Cloud), dan Mitrasova Labs.',
  alternates: {
    canonical: buildCanonicalUrl('/product'),
  },
  openGraph: {
    title: 'Katalog Produk & Solusi | Mitrasova Digital Solutions',
    description:
      'Solusi perangkat lunak terintegrasi untuk bisnis modern: POS Kasir Offline, HRIS Payroll TER, Cloud Hosting Tier-4, dan Rekayasa Kustom.',
    url: buildCanonicalUrl('/product'),
    type: 'website',
    images: [
      {
        url: buildOgImageUrl(),
        width: 1200,
        height: 630,
        alt: 'Katalog Produk Mitrasova Digital Solutions',
      },
    ],
  },
};

export default function ProductCatalogRoutePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: buildCanonicalUrl('/') },
          { name: 'Produk & Solusi', url: buildCanonicalUrl('/product') },
        ]}
      />
      <ProductHubPage initialProducts={INITIAL_PRODUCTS} />
    </>
  );
}
