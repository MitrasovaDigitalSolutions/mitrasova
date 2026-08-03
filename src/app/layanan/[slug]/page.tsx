import { notFound } from 'next/navigation';
import { INITIAL_SERVICES } from '@/lib/data';
import { ServiceDetailPage } from '@/features/services';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Layanan Tidak Ditemukan | Mitrasova' };

  return {
    title: `${service.title} - ${service.heroTagline} | Mitrasova`,
    description: service.summary,
  };
}

export default async function ServiceRoutePage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
