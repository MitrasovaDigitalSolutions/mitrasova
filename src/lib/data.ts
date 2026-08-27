import idLocale from '@/locales/id.json';
import enLocale from '@/locales/en.json';
import { ServiceItem, CategoryItem, PostItem } from '@/types';

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

export const getLocalizedProducts = getLocalizedServices;
export const getLocalizedProduct = getLocalizedService;

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-pos',
    title: 'Mitrasova POS',
    slug: 'mitrasova-pos',
    heroTagline: 'Kasir Offline-First, Konsinyasi & Akuntansi Terpadu',
    summary: 'Sistem Kasir Offline Mode dengan Manajemen Konsinyasi & Bagi Hasil Supplier, Stok Multi-Cabang, serta Akuntansi Neraca & General Ledger.',
    description: 'Mitrasova POS adalah solusi perangkat lunak kasir pintar generasi terbaru. Didesain untuk operasional ritel & grosir dengan dukungan mode offline penuh, pencatatan barang konsinyasi & bagi komisi supplier, sinkronisasi stok multi-cabang, serta sistem akuntansi terintegrasi (neraca, laba rugi, dan general ledger).',
    icon: 'ShoppingBag',
    category: 'SaaS POS & Accounting',
    badge: 'Offline POS & Konsinyasi',
    gradient: 'from-indigo-500 to-cyan-500',
    externalUrl: 'https://www.mitrasovapos.web.id/',
    features: [
      {
        title: 'Mode Kasir Offline-First & Auto-Sync',
        description: 'Kasir tetap dapat memproses transaksi penjualan tanpa hambatan saat koneksi internet terputus, dan data otomatis tersinkron saat kembali online.',
        iconName: 'Zap',
      },
      {
        title: 'Manajemen Konsinyasi & Bagi Hasil',
        description: 'Kelola penerimaan barang titipan/konsinyasi, perhitungan komisi otomatis, pemantauan retur, dan rekap pembayaran berkala ke supplier.',
        iconName: 'Share2',
      },
      {
        title: 'Modul Akuntansi & General Ledger',
        description: 'Pencatatan jurnal transaksi otomatis, neraca saldo, buku besar (General Ledger), laporan laba rugi, dan analisis margin keuntungan.',
        iconName: 'Layers',
      },
      {
        title: 'Multi-Outlet Stock Sync & Cetak Struk',
        description: 'Pantau persediaan di puluhan cabang, transfer stok gudang, cetak printer thermal Bluetooth/LAN ESC/POS, dan manajemen shift kasir.',
        iconName: 'Receipt',
      },
    ],
    faqs: [
      {
        question: 'Apakah Mitrasova POS mendukung manajemen barang konsinyasi / titipan?',
        answer: 'Ya! Mitrasova POS memiliki modul konsinyasi terpadu untuk mencatat master data supplier konsinyasi, menghitung bagi hasil komisi otomatis, sisa stok titipan, dan rekap pembayaran faktur konsinyasi.',
      },
      {
        question: 'Apakah Mitrasova POS bisa berjalan tanpa koneksi internet (Offline Mode)?',
        answer: 'Ya! Mitrasova POS dirancang dengan arsitektur Offline-First. Anda tetap bisa memproses transaksi kasir saat internet padam, dan data transaksi akan otomatis tersinkronisasi ke server pusat saat jaringan pulih.',
      },
      {
        question: 'Laporan keuangan apa saja yang disediakan oleh modul akuntansi Mitrasova POS?',
        answer: 'Mitrasova POS menyediakan laporan Neraca Keuangan, Laporan Laba Rugi (P&L), Buku Besar (General Ledger), Jurnal Otomatis Penjualan & Pembelian, serta Laporan Arus Kas.',
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
    externalUrl: 'https://daya.mitrasova.com',
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
    externalUrl: 'https://nexus.mitrasova.com',
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
    externalUrl: 'https://labs.mitrasova.com',
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
        description: 'Transparansi progres mingguan dengan metode Scrum, dokumentasi API Swagger, serta garansi pemeliharaan.',
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
        answer: 'Ya 100%. Setelah pengerjaan selesai dan serah terima, seluruh Intellectual Property (IP) dan Source Code menjadi hak milik klien.',
      },
    ],
  },
];

export const INITIAL_PRODUCTS = INITIAL_SERVICES;

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-insights', name: 'Wawasan & Artikel', slug: 'wawasan', description: 'Artikel tren teknologi, strategi bisnis, dan studi kasus digital' },
  { id: 'cat-news', name: 'Berita & Pengumuman', slug: 'berita', description: 'Kabar resmi, siaran pers, dan pembaruan perusahaan Mitrasova' },
  { id: 'cat-events', name: 'Events & Webinar', slug: 'events', description: 'Jadwal workshop, seminar teknologi, dan temu komunitas' },
  { id: 'cat-updates', name: 'Rilis Produk', slug: 'rilis-produk', description: 'Catatan pembaruan fitur, changelog, dan kapabilitas sistem baru' },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'post-1',
    title: 'Peluncuran Mitrasova POS v2.0: Dukungan Offline-First & Rekonsiliasi Otomatis Konsinyasi',
    slug: 'peluncuran-mitrasova-pos-v2',
    summary: 'Mitrasova resmi merilis pembaruan besar untuk POS Kasir, menghadirkan zero-delay transaksi offline dan kalkulasi bagi hasil supplier otomatis.',
    contentHtml: `
      <h2>Revolusi Kasir Retail Tanpa Tergantung Koneksi Internet</h2>
      <p>Masalah utama yang kerap dihadapi bisnis ritel modern adalah ketidakstabilan koneksi internet di titik penjualan. Melalui rilis Mitrasova POS v2.0, kami menghadirkan arsitektur <strong>Offline-First SQLite Cache</strong> yang memungkinkan kasir tetap bertransaksi 100% lancar walau jaringan padam seketika.</p>
      
      <h2>Modul Baru: Otomatisasi Konsinyasi & Bagi Hasil Supplier</h2>
      <p>Bagi pemilik toko serba ada atau ritel fashion, mengelola barang titipan sering kali memakan waktu rekonsiliasi manual berhari-hari. Dengan modul konsinyasi baru:</p>
      <ul>
        <li>Master data supplier konsinyasi dan persentase komisi otomatis dihitung per item terjual.</li>
        <li>Faktur rekap pembayaran supplier diterbitkan otomatis setiap akhir periode.</li>
        <li>Pemantauan sisa stok titipan dan penerbitan nota retur instan.</li>
      </ul>

      <h2>Integrasi Buku Besar Akuntansi</h2>
      <p>Seluruh penjualan langsung terhubung dengan General Ledger (buku besar), laporan laba-rugi harian, dan mutasi kas kecil tanpa perlu input ulang data ke spreadsheet.</p>
    `,
    type: 'RELEASE',
    categorySlug: 'rilis-produk',
    categoryName: 'Rilis Produk',
    authorName: 'Raihan Marwanda',
    authorRole: 'Head of Product',
    readTime: '4 min baca',
    featured: true,
    tags: ['POS Kasir', 'Offline Mode', 'Konsinyasi', 'Akuntansi'],
    updatedAt: '2026-08-15',
    createdAt: '2026-08-15',
  },
  {
    id: 'post-2',
    title: 'Strategi Optimasi Payroll & PPh 21 TER 2026 untuk Perusahaan Skala Menengah',
    slug: 'strategi-optimasi-payroll-pph-21-ter',
    summary: 'Memahami implementasi Tarif Efektif Rata-Rata (TER) PPh 21 dan otomatisasi absensi GPS untuk menekan kebocoran biaya operasional SDM.',
    contentHtml: `
      <h2>Tantangan Penghitungan Pajak Karyawan di Era Baru</h2>
      <p>Penerapan skema PPh 21 TER (Tarif Efektif Rata-Rata) menuntut departemen HR untuk lebih teliti dalam memetakan kategori PTKP karyawan setiap bulannya. Perhitungan manual berisiko tinggi terhadap kesalahan setor pajak dan denda administratif.</p>
      
      <h2>Liveness Face Verification vs Titip Absen</h2>
      <p>Mitrasova Daya menerapkan algoritma <em>3D Facial Liveness Detection</em> yang memastikan bahwa karyawan yang melakukan absensi hadir secara fisik di lokasi koordinat geofencing perusahaan.</p>
      
      <h2>Distribusi Slip Gaji Terenkripsi via WhatsApp & Email</h2>
      <p>Karyawan tidak perlu lagi mengantre slip fisik. Dokumen slip gaji berformat PDF dengan proteksi PIN tanggal lahir dikirimkan dalam hitungan detik setelah proses payroll disetujui atasan.</p>
    `,
    type: 'ARTICLE',
    categorySlug: 'wawasan',
    categoryName: 'Wawasan & Artikel',
    authorName: 'Dimas Prasetyo',
    authorRole: 'Senior HR Consultant',
    readTime: '6 min baca',
    featured: false,
    tags: ['HRIS', 'Payroll', 'PPh 21 TER', 'Manajemen SDM'],
    updatedAt: '2026-08-20',
    createdAt: '2026-08-20',
  },
  {
    id: 'post-3',
    title: 'Mitrasova Tech Summit 2026: Transformasi Ekosistem Digital Bisnis Soloraya',
    slug: 'mitrasova-tech-summit-2026',
    summary: 'Hadiri seminar teknologi dan temu industri tahunan terbesar di Solo Raya bersama para praktisi software engineering dan pimpinan bisnis lokal.',
    contentHtml: `
      <h2>Tentang Acara</h2>
      <p>Mitrasova dengan bangga menyelenggarakan <strong>Mitrasova Tech Summit 2026</strong> bertempat di Convention Hall Solo Technopark. Acara ini mempertemukan lebih dari 500 pelaku bisnis ritel, manufaktur, dan pengembang perangkat lunak.</p>
      
      <h2>Topik Diskusi Utama</h2>
      <ul>
        <li><strong>Arsitektur Cloud High-Availability:</strong> Mencegah downtime toko online saat flash sale.</li>
        <li><strong>Automasi ERP & Integrasi API:</strong> Menghubungkan platform legacy dengan aplikasi modern.</li>
        <li><strong>Cybersecurity Standards:</strong> Perlindungan data konsumen standar UU PDP di Indonesia.</li>
      </ul>

      <h2>Sesi Konsultasi 1-on-1 dengan Solution Architect</h2>
      <p>Peserta yang terdaftar berkesempatan mendapatkan audit gratis arsitektur sistem dan konsultasi langsung bersama tim engineer Mitrasova.</p>
    `,
    type: 'EVENT',
    categorySlug: 'events',
    categoryName: 'Events & Webinar',
    authorName: 'Tim Humas Mitrasova',
    authorRole: 'Community Lead',
    readTime: '3 min baca',
    eventDate: '2026-09-18T09:00:00.000Z',
    eventLocation: 'Solo Technopark Convention Center & Hybrid Zoom',
    tags: ['Event', 'Seminar', 'Tech Summit', 'Solo Raya'],
    featured: true,
    updatedAt: '2026-08-22',
    createdAt: '2026-08-22',
  },
  {
    id: 'post-4',
    title: 'Kemitraan Strategis: Mitrasova dan Asosiasi Pengusaha Retail Jawa Tengah',
    slug: 'kemitraan-strategis-pengusaha-retail-jateng',
    summary: 'Inisiatif bersama untuk mempercepat digitalisasi 1.000+ UMKM ritel melalui standardisasi kasir terintegrasi dan akuntansi modern.',
    contentHtml: `
      <h2>Mendorong Daya Saing Retail Tradisional ke Ranah Modern</h2>
      <p>Mitrasova Digital Solutions resmi menandatangani nota kesepahaman (MoU) dengan Asosiasi Pengusaha Retail Jawa Tengah. Kolaborasi ini bertujuan memberikan pendampingan implementasi software kasir cerdas dan pelatihan pembukuan keuangan bagi toko kelontong, mini market, dan jaringan grosir daerah.</p>
      
      <h2>Program Onboarding & Subsidi Perangkat</h2>
      <p>Melalui program ini, anggota asosiasi memperoleh akses paket bundling software Mitrasova POS lengkap dengan printer struk thermal dan pelatihan operasional di lokasi tanpa biaya setup awal.</p>
    `,
    type: 'NEWS',
    categorySlug: 'berita',
    categoryName: 'Berita & Pengumuman',
    authorName: 'Tim Redaksi Mitrasova',
    authorRole: 'Corporate Communications',
    readTime: '3 min baca',
    tags: ['Kemitraan', 'Retail', 'UMKM', 'Jawa Tengah'],
    featured: false,
    updatedAt: '2026-08-25',
    createdAt: '2026-08-25',
  },
];
