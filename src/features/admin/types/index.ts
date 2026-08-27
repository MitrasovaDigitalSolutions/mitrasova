export * from '../schemas/post-schema';

export interface AdminMetricItem {
  label: string;
  value: string;
  sub: string;
  trend: string;
  iconName: string;
  accent: 'cyan' | 'indigo' | 'purple' | 'emerald';
}
