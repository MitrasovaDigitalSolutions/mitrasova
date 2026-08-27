export const HOME_METRICS = [
  { value: '12,500+', label: 'Merchant POS & Kasir Aktif', growth: '+28% Y-o-Y', iconName: 'ShoppingBag' },
  { value: '99.99%', label: 'Cloud Server SLA Uptime', growth: 'High Availability', iconName: 'Server' },
  { value: '140,000+', label: 'Karyawan Dikelola di HRIS', growth: 'Multi-Perusahaan', iconName: 'Users' },
  { value: '250+', label: 'Enterprise Web & API Labs', growth: 'Custom Architecture', iconName: 'Code' },
] as const;

export const HOME_TELEMETRY = {
  posRevenue: 'Rp 482.90M',
  posGrowth: '+24.8% M-o-M',
  hrisTeams: '3,420 Tim',
  hrisSync: 'PPh 21 TER Sync',
  cloudUptime: '99.995%',
  cloudLatency: '8.4ms Latency',
  labsRequests: '14.2M req/m',
  labsLatency: '42ms Global Edge',
} as const;
