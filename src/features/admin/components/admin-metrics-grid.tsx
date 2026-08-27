'use client';

import React from 'react';
import { ADMIN_METRICS } from '../constants';
import { AdminMetricCard } from './admin-metric-card';
import { usePostsQuery } from '../api/posts-api';
import { AdminMetricItem } from '../types';

export const AdminMetricsGrid: React.FC = () => {
  const { data: posts = [] } = usePostsQuery();

  const dynamicMetrics: AdminMetricItem[] = [
    {
      label: 'Total Artikel & Publikasi',
      value: posts.length.toString(),
      sub: 'Blog, News, Events & Rilis',
      trend: `${posts.length} Konten Aktif`,
      iconName: 'FileText',
      accent: 'cyan',
    },
    ADMIN_METRICS[1], // Produk Enterprise
    ADMIN_METRICS[2], // Kategori Publikasi
    ADMIN_METRICS[3], // Status Gateway CMS
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dynamicMetrics.map((metric, idx) => (
        <AdminMetricCard key={idx} metric={metric} />
      ))}
    </div>
  );
};
