import type { Metadata } from 'next';
import { ConsultationPage } from '@/features/consultation';
import { buildCanonicalUrl } from '@/lib/seo';

const PAGE_TITLE = 'Jadwal Konsultasi & Demo Gratis';
const PAGE_DESCRIPTION =
  'Konsultasi gratis bersama tim Solution Architect Mitrasova di Karanganyar untuk implementasi POS, HRIS, Cloud Server, dan Custom Web App. Hubungi kami sekarang.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonicalUrl('/konsultasi'),
  },
  openGraph: {
    title: `${PAGE_TITLE} | Mitrasova Digital Solutions`,
    description: PAGE_DESCRIPTION,
    url: buildCanonicalUrl('/konsultasi'),
    type: 'website',
  },
};

export default function ConsultationRoutePage() {
  return <ConsultationPage />;
}
