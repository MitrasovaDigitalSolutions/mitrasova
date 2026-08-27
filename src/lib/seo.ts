export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitrasova.com';

export const SEO_DEFAULTS = {
  siteName: 'Mitrasova Digital Solutions',
  siteNameShort: 'Mitrasova',
  description:
    'Penyedia perangkat lunak enterprise terdepan di Indonesia. Solusi POS Kasir Multi-Cabang, HRIS & Payroll, Cloud Server Berkinerja Tinggi, Custom Web & Mobile App Development untuk transformasi digital bisnis Anda.',
  locale: 'id_ID',
  type: 'website' as const,
  twitterHandle: '@mitrasova',
  ogImagePath: '/og-image.png',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/mitrasova',
    facebook: 'https://www.facebook.com/mitrasovads/',
    instagram: 'https://www.instagram.com/mitrasovads/',
  },
  keywords: [
    'Mitrasova',
    'Mitrasova Digital Solutions',
    'Mitrasova POS',
    'Mitrasova Daya',
    'Mitrasova Nexus',
    'Mitrasova Labs',
    'POS Kasir Pintar',
    'Software Kasir Indonesia',
    'Aplikasi Kasir Multi-Cabang',
    'HRIS Indonesia',
    'Payroll Software',
    'Aplikasi Penggajian',
    'Cloud Server Indonesia',
    'Managed Hosting',
    'VPS Indonesia',
    'Custom Web Development',
    'Custom Mobile App Development',
    'Jasa Pembuatan Aplikasi Mobile',
    'Jasa Pembuatan Website',
    'Jasa Pembuatan Aplikasi Android',
    'Jasa Pembuatan Aplikasi iOS',
    'Software House Karanganyar',
    'Software House Jawa Tengah',
    'Enterprise Software Indonesia',
    'Solusi Digital Bisnis',
    'Transformasi Digital UMKM',
    'ERP Indonesia',
    'IT Solution Karanganyar',
    'Jasa IT Solo Raya',
    'Aplikasi Custom Indonesia',
    'Pengembangan Perangkat Lunak',
  ],
  location: {
    streetAddress: 'Karanganyar',
    addressLocality: 'Karanganyar',
    addressRegion: 'Jawa Tengah',
    postalCode: '57711',
    addressCountry: 'ID',
    formattedAddress: 'Karanganyar, Jawa Tengah, Indonesia',
  },
} as const;

export const buildCanonicalUrl = (path: string = '/'): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

export const buildOgImageUrl = (path?: string): string => {
  return `${SITE_URL}${path || SEO_DEFAULTS.ogImagePath}`;
};
