import { AdminMetricItem } from '../types';

export const ADMIN_METRICS: AdminMetricItem[] = [
  {
    label: 'Total Artikel & Kabar',
    value: '4',
    sub: 'Blog, News & Events',
    trend: '+1 rilis baru',
    iconName: 'FileText',
    accent: 'cyan',
  },
  {
    label: 'Produk Enterprise',
    value: '4',
    sub: 'POS, HRIS, Cloud, Labs',
    trend: '100% Active',
    iconName: 'Layers',
    accent: 'indigo',
  },
  {
    label: 'Kategori Publikasi',
    value: '4',
    sub: 'Wawasan, Berita, Events, Rilis',
    trend: 'Terorganisir',
    iconName: 'FolderTree',
    accent: 'purple',
  },
  {
    label: 'Status Gateway CMS',
    value: '99.99%',
    sub: 'PostgreSQL Cloud DB',
    trend: 'Online',
    iconName: 'ShieldCheck',
    accent: 'emerald',
  },
];
