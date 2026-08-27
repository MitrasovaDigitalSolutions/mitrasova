import type { Metadata } from 'next';
import { DocsHubPage } from '@/features/docs';
import { buildCanonicalUrl } from '@/lib/seo';

const PAGE_TITLE = 'Pusat Dokumentasi & Tutorial';
const PAGE_DESCRIPTION =
  'Dokumentasi terstruktur, panduan setup, rilis update, dan tutorial per layanan Mitrasova. Temukan jawaban dan panduan teknis yang Anda butuhkan.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonicalUrl('/docs'),
  },
  openGraph: {
    title: `${PAGE_TITLE} | Mitrasova Digital Solutions`,
    description: PAGE_DESCRIPTION,
    url: buildCanonicalUrl('/docs'),
    type: 'website',
  },
};

export default function DocsRoutePage() {
  return <DocsHubPage />;
}
