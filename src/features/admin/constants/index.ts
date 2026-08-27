import { AdminMetricItem } from '../types';

export const ADMIN_METRICS: AdminMetricItem[] = [
  {
    label: 'Total Artikel Docs',
    value: '4',
    sub: 'Semua Layanan',
    trend: '+1 minggu ini',
    iconName: 'FileText',
    accent: 'cyan',
  },
  {
    label: 'Layanan Terdaftar',
    value: '4',
    sub: 'Ecosystem Suite',
    trend: '100% Active',
    iconName: 'Layers',
    accent: 'indigo',
  },
  {
    label: 'Total Kategori',
    value: '4',
    sub: 'Tutorial, Config, etc.',
    trend: 'Structured',
    iconName: 'FolderTree',
    accent: 'purple',
  },
  {
    label: 'Status Gateway CMS',
    value: '99.99%',
    sub: 'PostgreSQL Cloud',
    trend: 'Online',
    iconName: 'ShieldCheck',
    accent: 'emerald',
  },
];
