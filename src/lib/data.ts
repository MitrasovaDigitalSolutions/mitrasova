import idLocale from '@/locales/id.json';
import enLocale from '@/locales/en.json';

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  heroTagline: string;
  summary: string;
  description: string;
  icon: string;
  category: string;
  badge: string;
  gradient: string;
  features: {
    title: string;
    description: string;
    iconName: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  contentHtml: string;
  serviceSlug: string;
  categorySlug: string;
  categoryName: string;
  authorName: string;
  readTime: string;
  updatedAt: string;
}

export const getLocalizedServices = (locale: 'id' | 'en' = 'id'): ServiceItem[] => {
  const dict = locale === 'en' ? enLocale : idLocale;
  const items = dict.services.items;

  return INITIAL_SERVICES.map((srv) => {
    const loc = items[srv.slug as keyof typeof items];
    if (!loc) return srv;

    return {
      ...srv,
      title: loc.title,
      heroTagline: loc.heroTagline,
      summary: loc.summary,
      description: loc.description,
      category: loc.category,
      badge: loc.badge,
      features: srv.features.map((feat, idx) => ({
        ...feat,
        title: loc.features[idx]?.title || feat.title,
        description: loc.features[idx]?.description || feat.description,
      })),
      faqs: srv.faqs.map((faq, idx) => ({
        ...faq,
        question: loc.faqs[idx]?.question || faq.question,
        answer: loc.faqs[idx]?.answer || faq.answer,
      })),
    };
  });
};

export const getLocalizedService = (slug: string, locale: 'id' | 'en' = 'id'): ServiceItem | undefined => {
  const services = getLocalizedServices(locale);
  return services.find((s) => s.slug === slug);
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-pos',
    title: 'Mitrasova POS',
    slug: 'mitrasova-pos',
    heroTagline: 'Kasir & Omnichannel Commerce Pintar Skala Resto & Retail',
    summary: 'Sistem Kasir Digital Terintegrasi dengan Manajemen Stok Multi-Cabang, Laporan Real-Time, & Cetak Struk Thermal Cloud.',
    description: 'Mitrasova POS adalah solusi perangkat lunak kasir pintar generasi terbaru. Didesain untuk mempercepat transaksi di meja kasir hingga 3x lebih cepat, mendukung pembayaran QRIS, e-wallet, EDC, manajemen meja resto, serta sinkronisasi persediaan barang secara otomatis antar cabang.',
    icon: 'ShoppingBag',
    category: 'SaaS POS & Commerce',
    badge: 'Resto & Retail POS',
    gradient: 'from-indigo-500 to-cyan-500',
    features: [
      {
        title: 'Transaksi Kasir High-Speed',
        description: 'Proses checkout kurang dari 3 detik dengan dukungan barcode scanner dan pencetakan printer thermal Bluetooth & LAN.',
        iconName: 'Zap',
      },
      {
        title: 'Multi-Outlet Stock Sync',
        description: 'Pantau stok persediaan barang di puluhan cabang secara real-time dari satu dashboard sentral.',
        iconName: 'Layers',
      },
      {
        title: 'Integrasi QRIS & Pembayaran Digital',
        description: 'Dukungan penuh pembayaran QRIS Statis/Dinamis, Bank Transfer, Card EDC, dan e-wallet nasional.',
        iconName: 'CreditCard',
      },
      {
        title: 'Manajemen Meja & Dapur (KDS)',
        description: 'Khusus bisnis F&B: sistem reservasi meja, Kitchen Display System (KDS), dan pesanan lewat scan QR Meja.',
        iconName: 'Utensils',
      },
    ],
    faqs: [
      {
        question: 'Apakah Mitrasova POS bisa berjalan tanpa koneksi internet (Offline Mode)?',
        answer: 'Ya! Mitrasova POS dilengkapi dengan Local Hybrid Cache Sync. Anda tetap bisa memproses transaksi kasir saat internet terputus, dan data akan otomatis tersinkronisasi saat koneksi pulih.',
      },
      {
        question: 'Printer thermal merk apa saja yang didukung?',
        answer: 'Mitrasova POS mendukung seluruh printer thermal bertipe ESC/POS baik melalui Bluetooth, USB, Wi-Fi, maupun LAN (Epson, Sunmi, Xprinter, Kassen, dll).',
      },
    ],
  },
  {
    id: 'srv-daya',
    title: 'Mitrasova Daya',
    slug: 'mitrasova-daya',
    heroTagline: 'Platform HRIS, Payroll, & Presensi Geolocation Karyawan',
    summary: 'Otomatisasi Hitung Gaji/Payroll, PPh 21, BPJS, Absensi Face-Recognition, & Manajemen Cuti Karyawan Enterprise.',
    description: 'Mitrasova Daya memberdayakan departemen HR dan pimpinan perusahaan dalam mengelola aset terpenting: Sumber Daya Manusia. Kelola jadwal shift, kalkulasi slip gaji instan dengan pajak PPh 21 TER terbaru, klaim reimbursement, dan evaluasi kinerja karyawan secara objektif.',
    icon: 'Users',
    category: 'HRIS & Workforce',
    badge: 'HRIS & Payroll Enterprise',
    gradient: 'from-cyan-500 to-indigo-500',
    features: [
      {
        title: 'Kalkulasi Payroll & PPh 21 Otomatis',
        description: 'Hitung ribuan gaji karyawan lengkap dengan potongan PPh 21 TER, BPJS Kesehatan, BPJS Ketenagakerjaan hanya dengan 1 klik.',
        iconName: 'Calculator',
      },
      {
        title: 'Presensi Mobile + GPS & Liveness Face Check',
        description: 'Cegah kecurangan titip absen dengan verifikasi wajah liveness detection dan radius geofencing lokasi kantor.',
        iconName: 'MapPin',
      },
      {
        title: 'Self-Service Employee Portal (ESS)',
        description: 'Karyawan dapat mengajukan izin, cuti, lembur, dan mengunduh slip gaji terenkripsi langsung dari smartphone.',
        iconName: 'Smartphone',
      },
      {
        title: 'Shift & Performance Review Engine',
        description: 'Pengaturan jadwal shift fleksibel untuk ritel/pabrik dan matriks penilaian KPI bulanan.',
        iconName: 'Award',
      },
    ],
    faqs: [
      {
        question: 'Apakah kalkulasi PPh 21 sudah memperhitungkan skema TER 2024+?',
        answer: 'Tentu. Rumus perhitungan PPh 21 di Mitrasova Daya selalu diperbarui sesuai dengan regulasi perpajakan Kementerian Keuangan terbaru.',
      },
      {
        question: 'Berapa kapasitas maksimal karyawan yang didukung?',
        answer: 'Mitrasova Daya teruji mampu menangani hingga 50.000+ karyawan aktif dengan waktu pembuatan slip gaji massal di bawah 2 menit.',
      },
    ],
  },
  {
    id: 'srv-nexus',
    title: 'Mitrasova Nexus',
    slug: 'mitrasova-nexus',
    heroTagline: 'High-Availability Cloud Hosting, Managed VPS & Security',
    summary: 'Infrastruktur Cloud Hosting Kinerja Tinggi dengan 99.99% Uptime SLA, DDoS Protection, & Auto-Scaling Server.',
    description: 'Mitrasova Nexus adalah layanan infrastruktur cloud server terkelola (*Managed Cloud Services*) yang dirancang untuk aplikasi mission-critical. Didukung oleh jaringan server Tier-4 lokal di Jakarta & Singapura dengan latency ultra-rendah dan proteksi lapisan keamanan bertingkat.',
    icon: 'Server',
    category: 'Cloud Infrastructure',
    badge: 'Tier-4 Managed Cloud',
    gradient: 'from-indigo-600 to-purple-600',
    features: [
      {
        title: '99.99% Guaranteed Uptime SLA',
        description: 'Arsitektur redundant multi-zone dengan garansi pengembalian dana jika terjadi insiden downtime.',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Advanced Anti-DDoS Mitigation',
        description: 'Perlindungan otomatis dari serangan DDoS layer 3, 4, dan 7 dengan kapasitas scrubbing center hingga 2 Tbps.',
        iconName: 'Lock',
      },
      {
        title: 'Automated Daily Cloud Snapshot Backup',
        description: 'Backup terenkripsi setiap hari ke lokasi off-site cadangan dengan opsi Disaster Recovery Point (RPO/RTO) dalam menit.',
        iconName: 'CloudRain',
      },
      {
        title: 'Kubernetes & Auto-Scaling Ready',
        description: 'Dukungan containerization Docker/K8s untuk menangani lonjakan trafik mendadak tanpa lag.',
        iconName: 'Cpu',
      },
    ],
    faqs: [
      {
        question: 'Di mana lokasi fisik data center Mitrasova Nexus?',
        answer: 'Server kami berlokasi di Data Center Tier-4 Jakarta (Indonesia) dan Data Center Equinix SG1 (Singapura) untuk konektivitas IX teraman.',
      },
      {
        question: 'Apakah tim support teknis siaga 24 jam?',
        answer: 'Ya, tim Cloud Engineer Mitrasova siaga 24/7/365 dengan waktu respon SLA kurang dari 15 menit.',
      },
    ],
  },
  {
    id: 'srv-labs',
    title: 'Mitrasova Labs',
    slug: 'mitrasova-labs',
    heroTagline: 'Custom Software Engineering, Web & Mobile Development',
    summary: 'Layanan Pengembangan Aplikasi Web Enterprise, Mobile Apps Native, Microservices, & Integrasi API Sistem Custom.',
    description: 'Mitrasova Labs menghadirkan tim software architect dan senior developer untuk merealisasikan sistem kustom skala besar bagi perusahaan Anda. Dari arsitektur microservices modern, integrasi payment gateway, hingga aplikasi mobile iOS/Android khusus.',
    icon: 'Code',
    category: 'Custom Engineering',
    badge: 'Enterprise Engineering',
    gradient: 'from-cyan-400 to-indigo-600',
    features: [
      {
        title: 'Modern Fullstack Architecture',
        description: 'Pembangunan aplikasi menggunakan teknologi Next.js, Node.js/Go, React Native, PostgreSQL, & Cloud Native stack.',
        iconName: 'Terminal',
      },
      {
        title: 'API & Legacy System Integration',
        description: 'Menghubungkan sistem ERP lama (SAP, Oracle) dengan platform digital modern via RESTful/GraphQL API.',
        iconName: 'Share2',
      },
      {
        title: 'Code Security Audit & Penetration Testing',
        description: 'Pengujian celah keamanan aplikasi standar OWASP Top 10 sebelum masa migrasi dan komersialisasi rilis.',
        iconName: 'CheckCircle2',
      },
      {
        title: 'Agile Development Sprint & SLA Support',
        description: 'Transparansi progres mingguan dengan metode Scrum, dokumentasi API Swagger, serta garansi garansi pemeliharaan.',
        iconName: 'GitBranch',
      },
    ],
    faqs: [
      {
        question: 'Berapa lama estimasi pengerjaan proyek custom web/app di Mitrasova Labs?',
        answer: 'Tergantung pada cakupan modul. Proyek MVP menengah berkisar 4–8 minggu, sedangkan sistem enterprise skala besar membutuhkan waktu 12–24 minggu dengan sprint bertahap.',
      },
      {
        question: 'Apakah hak cipta kode sumber (Source Code) sepenuhnya menjadi milik klien?',
        answer: 'Ya 100%. Setelah pengerjaan selasai dan serah terima, seluruh Intellectual Property (IP) dan Source Code menjadi hak milik klien.',
      },
    ],
  },
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-tutorial', name: 'Tutorial & Setup', slug: 'tutorial', description: 'Panduan langkah demi langkah penggunaan produk' },
  { id: 'cat-guide', name: 'Panduan & Best Practices', slug: 'guide', description: 'Tips optimasi operasional dan modul fitur' },
  { id: 'cat-release', name: 'Release Notes & Updates', slug: 'release-notes', description: 'Rilis pembaruan versi dan fitur baru' },
  { id: 'cat-announcement', name: 'Pengumuman', slug: 'pengumuman', description: 'Kabar resmi dan pengumuman sistem' },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'post-1',
    title: 'Panduan Lengkap Setup Printer Thermal Bluetooth & LAN di Mitrasova POS',
    slug: 'setup-printer-thermal',
    summary: 'Langkah mudah mengoneksikan printer struk kasir Bluetooth & LAN ke tablet/PC Mitrasova POS.',
    serviceSlug: 'mitrasova-pos',
    categorySlug: 'tutorial',
    categoryName: 'Tutorial & Setup',
    authorName: 'Tim Support Mitrasova POS',
    readTime: '4 min baca',
    updatedAt: '2026-07-28',
    contentHtml: `
      <h2>Pendahuluan Setup Printer Struk</h2>
      <p>Mengoneksikan printer thermal dengan Mitrasova POS dapat dilakukan dalam hitungan menit. Sistem kami mendukung protokol standar ESC/POS yang kompatibel dengan berbagai brand printer kasir di pasaran.</p>
      
      <h2>Langkah 1: Mengaktifkan Bluetooth / Koneksi LAN</h2>
      <p>Pastikan printer thermal Anda telah dinyalakan dan dalam kondisi <em>ready state</em> (lampu indikator biru/hijau menyala konstan). Untuk printer LAN, sambungkan kabel RJ45 ke router lokasi kasir Anda.</p>
      
      <h2>Langkah 2: Membuka Menu Pengaturan Mitrasova POS</h2>
      <p>Masuk ke aplikasi <strong>Mitrasova POS</strong> > Pilih ikon <strong>Pengaturan (Settings)</strong> di pojok kanan atas > Klik tab <strong>Perangkat & Printer Struk</strong>.</p>

      <h2>Langkah 3: Pemindaian (Device Scan) & Test Print</h2>
      <p>Klik tombol <strong>Cari Perangkat Baru</strong>. Pilih nama printer Anda (misal: <em>POS-58Printer</em> atau IP <em>192.168.1.200</em>). Tekan tombol <strong>Uji Cetak Struk (Test Print)</strong> untuk memastikan koneksi berhasil.</p>
      
      <h2>Troubleshooting & Tips Perawatan</h2>
      <p>Jika struk tidak keluar, pastikan kertas thermal terpasang dengan arah gulungan yang benar (tidak terbalik) dan pastikan izin Bluetooth/Location pada aplikasi sudah aktif.</p>
    `,
  },
  {
    id: 'post-2',
    title: 'Cara Mengatur Manajemen Shift & Kalkulasi Lembur Otomatis di Mitrasova Daya',
    slug: 'manajemen-shift-payroll',
    summary: 'Optimalkan penjadwalan tim operasional dan dapatkan kalkulasi lembur sesuai regulasi UU Cipta Kerja.',
    serviceSlug: 'mitrasova-daya',
    categorySlug: 'guide',
    categoryName: 'Panduan & Best Practices',
    authorName: 'Spesialis HR Mitrasova',
    readTime: '6 min baca',
    updatedAt: '2026-07-25',
    contentHtml: `
      <h2>Membuat Pola Shift Kerja</h2>
      <p>Mitrasova Daya menyediakan fitur <em>Flexible Shift Pattern Generator</em> yang memungkinkan Anda membuat jadwal kerja roster (misal: 3 Hari Kerja 1 Hari Libur, atau Shift Pagi/Siang/Malam).</p>
      
      <h2>Kalkulasi Lembur Otomatis Sesuai Formula Depnaker</h2>
      <p>Sistem secara otomatis menghitung upah lembur jam pertama (1.5x upah sejam) dan jam berikutnya (2x upah sejam) berdasarkan log presensi masuk dan keluar karyawan.</p>
      
      <h2>Pengajuan & Persetujuan Lembur (Overtime Approval Flow)</h2>
      <p>Karyawan dapat membuat permohonan lembur via aplikasi mobile ESS, dan atasan langsung dapat menyetujuinya dalam sekali tap.</p>
    `,
  },
  {
    id: 'post-3',
    title: 'Update Sistem Keamanan & Peningkatan Kapasitas Backup Harian Mitrasova Nexus',
    slug: 'update-backup-security-nexus',
    summary: 'Rilis fitur baru: Backup snapshot terenkripsi AES-256 dan deteksi serangan ransomware proaktif.',
    serviceSlug: 'mitrasova-nexus',
    categorySlug: 'release-notes',
    categoryName: 'Release Notes & Updates',
    authorName: 'Cloud DevOps Team',
    readTime: '3 min baca',
    updatedAt: '2026-07-30',
    contentHtml: `
      <h2>Highlight Pembaruan Versi 4.2.0</h2>
      <p>Kami dengan bangga mengumumkan pembaruan infrastruktur keamanan pada seluruh node server Mitrasova Nexus di Data Center Jakarta & Singapura.</p>
      
      <h2>Fitur Baru: Encrypted Off-Site Backup</h2>
      <p>Seluruh snapshot database dan storage pengguna kini secara otomatis dienkripsi dengan standar AES-256 sebelum ditransfer ke lokasi secondary disaster recovery center.</p>
      
      <h2>Peningkatan Proteksi Anti-DDoS Layer 7</h2>
      <p>Penyaringan trafik HTTP/S malicious kini 40% lebih cepat dengan mitigasi otomatis tanpa mempengaruhi waktu respon aplikasi pengguna.</p>
    `,
  },
  {
    id: 'post-4',
    title: 'Panduan Integrasi Rest API Web Commerce dengan Mitrasova Labs Gateway',
    slug: 'integrasi-api-web-labs',
    summary: 'Panduan teknis pengembang untuk mengintegrasikan REST API Mitrasova dengan toko online custom Anda.',
    serviceSlug: 'mitrasova-labs',
    categorySlug: 'guide',
    categoryName: 'Panduan & Best Practices',
    authorName: 'Senior Software Architect',
    readTime: '5 min baca',
    updatedAt: '2026-07-29',
    contentHtml: `
      <h2>Otentikasi API Token</h2>
      <p>Setiap permintaan API ke Mitrasova Gateway membutuhkan Authorization Header dengan format <code>Bearer your_api_secret_key</code>.</p>
      
      <h2>Endpoint Sinkronisasi Katalog Produk</h2>
      <p>Gunakan endpoint <code>GET /api/v1/products</code> untuk mendapatkan daftar produk beserta stok dan harga terkini secara real-time.</p>
      
      <h2>Webhook Notifikasi Transaksi</h2>
      <p>Daftarkan URL webhook toko online Anda di Dashboard Admin untuk menerima event instant saat transaksi dinyatakan sukses oleh payment gateway.</p>
    `,
  },
];
