import type { Metadata } from 'next';
import { PostEditContainer } from '@/features/admin';

interface EditPostPageRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Edit Postingan | Console Mitrasova',
  description: 'Perbarui konten artikel, berita, event, atau catatan rilis.',
};

export default async function EditPostPageRoute({ params }: EditPostPageRouteProps) {
  const { id } = await params;
  return <PostEditContainer postId={id} />;
}
