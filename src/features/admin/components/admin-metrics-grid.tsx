import React from 'react';
import { ADMIN_METRICS } from '../constants';
import { AdminMetricCard } from './admin-metric-card';

export const AdminMetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ADMIN_METRICS.map((metric, idx) => (
        <AdminMetricCard key={idx} metric={metric} />
      ))}
    </div>
  );
};
