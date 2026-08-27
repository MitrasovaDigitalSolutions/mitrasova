import type { Metadata } from 'next';
import { ServicesOverviewPage } from '@/features/services';
import { buildCanonicalUrl } from '@/lib/seo';

const PAGE_TITLE = 'Ekosistem Layanan Enterprise';
const PAGE_DESCRIPTION =
  'Portofolio lengkap layanan enterprise Mitrasova: POS Kasir Pintar Multi-Cabang, HRIS & Payroll, Managed Cloud Server, Custom Web & Mobile App Development untuk bisnis Indonesia.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonicalUrl('/layanan'),
  },
  openGraph: {
    title: `${PAGE_TITLE} | Mitrasova Digital Solutions`,
    description: PAGE_DESCRIPTION,
    url: buildCanonicalUrl('/layanan'),
    type: 'website',
  },
};

export default function ServicesRoutePage() {
  return <ServicesOverviewPage />;
}
