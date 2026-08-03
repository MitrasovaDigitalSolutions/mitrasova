import React from 'react';
import Link from 'next/link';
import { AppButton } from '@/components/common/AppButton';
import { AdminMetricsGrid } from './AdminMetricsGrid';
import { AdminPostsTable } from './AdminPostsTable';
import { Plus } from 'lucide-react';

export const AdminDashboardContainer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Dashboard CMS Mitrasova</h1>
          <p className="text-sm text-slate-400">Pengelolaan Layanan, Kategori, & Service-Scoped Docs</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/posts/new">
            <AppButton variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
              Buat Artikel Docs Baru
            </AppButton>
          </Link>
        </div>
      </div>

      <AdminMetricsGrid />
      <AdminPostsTable />
    </div>
  );
};
