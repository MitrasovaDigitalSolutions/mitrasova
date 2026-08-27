import type { Metadata } from 'next';
import { HomePage } from '@/features/home';
import { buildCanonicalUrl, SEO_DEFAULTS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Mitrasova Digital Solutions | Software House & IT Solution Indonesia',
  description: SEO_DEFAULTS.description,
  alternates: {
    canonical: buildCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Mitrasova Digital Solutions | Software House & IT Solution Indonesia',
    description: SEO_DEFAULTS.description,
    url: buildCanonicalUrl('/'),
    type: 'website',
  },
};

export default function RootPage() {
  return <HomePage />;
}
