
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
        iconName: 'Receipt',
      },
      {
        title: 'Multi-Outlet Stock Sync & Cetak Struk',
        description: 'Pantau persediaan di puluhan cabang, transfer stok gudang, cetak printer thermal Bluetooth/LAN ESC/POS, dan manajemen shift kasir.',
        iconName: 'Layers',
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
    gradient: 'from-blue-600 to-indigo-600',
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
    description: 'Mitrasova Nexus adalah layanan infrastruktur cloud server terkelola (Managed Cloud Services) yang dirancang untuk aplikasi mission-critical. Didukung oleh jaringan server Tier-4 lokal di Jakarta & Singapura dengan latency ultra-rendah dan proteksi lapisan keamanan bertingkat.',
    icon: 'Server',
    category: 'Cloud Infrastructure',
    badge: 'Tier-4 Managed Cloud',
    gradient: 'from-cyan-500 to-blue-600',
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
  { id: 'cat-insights', name: 'Wawasan & Blog', slug: 'wawasan-blog', description: 'Artikel mendalam seputar strategi bisnis ritel, HRIS & perpajakan, arsitektur cloud, dan rekayasa perangkat lunak enterprise.' },
  { id: 'cat-news', name: 'Berita & Media', slug: 'berita-media', description: 'Kabar resmi, siaran pers, kemitraan strategis, dan pengumuman korporasi Mitrasova Digital Solutions.' },
  { id: 'cat-events', name: 'Events & Agenda', slug: 'event-agenda', description: 'Jadwal workshop, seminar teknologi, dan temu komunitas industri digital.' },
  { id: 'cat-updates', name: 'Rilis Produk', slug: 'rilis-produk', description: 'Catatan pembaruan fitur, changelog, dan kapabilitas sistem baru produk Mitrasova.' },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'post-1',
    title: 'Optimalisasi Bisnis Retail Modern: Manajemen Konsinyasi, Offline POS, & Otomatisasi Jurnal Akuntansi',
    slug: 'optimalisasi-bisnis-retail-konsinyasi-offline-pos-akuntansi',
    summary: 'Kajian mendalam strategi pengelolaan ratusan supplier konsinyasi, pencegahan antrean dengan arsitektur kasir offline-first, dan pencatatan neraca keuangan real-time.',
    contentHtml: `
      <p class="lead">Dalam lanskap industri ritel yang semakin kompetitif, mengelola efisiensi kasir, arus kas persediaan barang, serta ribuan transaksi harian bukan sekadar urusan mencetak struk belanja. Bagi bisnis modern dengan model kemitraan konsinyasi (titip jual) dan jaringan toko multi-cabang, integrasi teknologi kasir yang tangguh dan modul akuntansi otomatis adalah fondasi utama keberlanjutan profitabilitas.</p>

      <h2>1. Kompleksitas Model Konsinyasi di Ritel Indonesia</h2>
      <p>Skema konsinyasi atau titip jual merupakan tulang punggung variasi produk pada toko ritel modern di Indonesia, mulai dari supermarket makanan olahan, toko busana dan apparel, hingga toko buku dan oleh-oleh. Model ini memungkinkan pemilik toko (konsinyi) memajang ribuan SKU tanpa harus mengeluarkan modal kerja (working capital) besar di muka untuk pembelian putus.</p>
      <p>Namun, tantangan terbesar konsinyasi terletak pada <strong>administrasi pencatatan yang sangat rentan selisih</strong>:</p>
      <ul>
        <li><strong>Pemisahan Stok Kepemilikan:</strong> Barang titipan secara hukum tetap merupakan aset milik konsinyor (supplier). Mencampurkan nilai aset konsinyasi ke dalam neraca persediaan toko sendiri dapat menggelembungkan nilai aset secara semu.</li>
        <li><strong>Formula Bagi Hasil Dinamis:</strong> Setiap supplier memiliki persentase bagi hasil komisi berbeda (misalnya 70/30, 80/20, atau margin nominal tetap). Menghitung komisi ini secara manual menggunakan spreadsheet pada puluhan ribu baris penjualan adalah mimpi buruk operasional yang memicu kesalahan bayar.</li>
        <li><strong>Proses Retur & Pelunasan Faktur:</strong> Barang yang tidak laku atau mendekati masa kadaluarsa harus direkonsiliasi dengan nota retur resmi sebelum pembayaran periodik dicairkan kepada supplier.</li>
      </ul>

      <h2>2. Mengapa Arsitektur Offline-First Menjadi Kebutuhan Mutlak</h2>
      <p>Salah satu momok terbesar operasional kasir adalah internet downtime atau latensi jaringan. Dalam kondisi jam sibuk, penundaan respon kasir sebesar 2-3 detik saja dapat menyebabkan antrean mengular, ketidakpuasan pelanggan, hingga potensi transaksi yang batal.</p>
      <p>Mitrasova POS menerapkan arsitektur <strong>Offline-First berkinerja tinggi</strong>. Seluruh proses scanning barcode, perhitungan diskon bertingkat, penambahan item, dan pencetakan struk thermal ESC/POS dieksekusi secara lokal pada memori perangkat kasir dengan latensi 0ms. Ketika koneksi internet terputus:</p>
      <ol>
        <li>Kasir tetap dapat melayani penjualan tunai maupun verifikasi kode bayar offline tanpa kendala.</li>
        <li>Setiap mutasi transaksi dienkripsi dan disimpan pada basis data lokal perangkat.</li>
        <li>Saat jaringan internet pulih, algoritma sinkronisasi cerdas secara otomatis mengunggah transaksi ke cloud database terpusat dan memperbarui sisa stok di seluruh cabang tanpa menimbulkan duplikasi data.</li>
      </ol>

      <h2>3. Otomatisasi General Ledger & Laporan Keuangan Real-Time</h2>
      <p>Dalam sistem ritel konvensional, staf akuntansi harus menghabiskan waktu berjam-jam setiap akhir bulan untuk merekap struk penjualan fisik, mencocokkan mutasi rekening, dan membuat jurnal penyesuaian. Hal ini menyebabkan laporan keuangan tertunda, sehingga pimpinan bisnis kehilangan momentum strategis.</p>
      <p>Dengan sistem yang terintegrasi penuh seperti Mitrasova POS, setiap kali tombol pembayaran kasir ditekan:</p>
      <ul>
        <li><strong>Jurnal Penjualan Otomatis:</strong> Sistem mendebit akun Kas/Bank dan mengkredit akun Pendapatan Penjualan serta Hutang Konsinyasi secara instan.</li>
        <li><strong>Pencatatan HPP & Beban Komisi:</strong> Harga Pokok Penjualan (HPP) barang jual-putus dan margin komisi konsinyasi langsung teralokasi ke akun buku besar masing-masing.</li>
        <li><strong>Neraca Saldo & Laba Rugi Real-Time:</strong> Pemilik bisnis dapat memantau Neraca Keuangan, Laporan Laba Rugi (P&L), dan Arus Kas harian langsung dari smartphone kapan saja.</li>
      </ul>

      <h2>4. Rekomendasi Langkah Transformasi Operasional</h2>
      <p>Bagi pelaku usaha ritel yang berencana meningkatkan skalabilitas operasinya, berikut tiga tahapan kunci yang direkomendasikan:</p>
      <ol>
        <li><strong>Rapikan Master Data & Klasifikasi SKU:</strong> Tandai produk jual-putus vs produk titipan konsinyasi sejak proses input master katalog.</li>
        <li><strong>Standarisasi Hardware Kasir:</strong> Gunakan barcode scanner berpresisi tinggi dan printer thermal dengan koneksi stabil (Bluetooth/LAN) untuk memangkas waktu layanan per konsumen.</li>
        <li><strong>Terapkan Audit Stok (Stock Opname) Berkala:</strong> Lakukan pencocokan stok fisik per kategori menggunakan sistem mobile scanner minimal satu kali dalam sebulan.</li>
      </ol>
      <p>Dengan memadukan arsitektur software kasir yang tangguh dan manajemen konsinyasi yang transparan, bisnis ritel Anda siap berkembang dari satu outlet menjadi puluhan cabang dengan kendali penuh.</p>
    `,
    type: 'ARTICLE',
    categorySlug: 'wawasan-blog',
    categoryName: 'Wawasan & Blog',
    authorName: 'Raihan Marwanda',
    authorRole: 'Solution Architect',
    readTime: '8 min baca',
    featured: true,
    tags: ['Retail', 'POS Kasir', 'Konsinyasi', 'Akuntansi', 'Offline-First', 'Manajemen Stok'],
    updatedAt: '2026-08-20',
    createdAt: '2026-08-20',
  },
  {
    id: 'post-2',
    title: 'Panduan Lengkap Implementasi Pajak PPh 21 TER 2026 & Efisiensi Payroll Tanpa Spreadsheet',
    slug: 'panduan-lengkap-pph21-ter-2026-otomatisasi-payroll',
    summary: 'Membedah formula TER Kategori A, B, C, integrasi iuran BPJS Ketenagakerjaan & Kesehatan, serta otomatisasi slip gaji digital terenkripsi.',
    contentHtml: `
      <p class="lead">Perubahan skema pemotongan Pajak Penghasilan Pasal 21 menggunakan metode Tarif Efektif Rata-Rata (TER) yang diatur dalam Peraturan Pemerintah (PP) No. 58/2023 dan PMK No. 168/2023 mengubah secara mendasar bagaimana departemen Human Resource dan Finance di seluruh Indonesia menghitung gaji bulanan karyawan.</p>

      <h2>1. Memahami Logika Dasar Skema Pajak PPh 21 TER</h2>
      <p>Sebelum adanya TER, perhitungan PPh 21 bulanan mewajibkan perusahaan melakukan setahunisasi penghasilan netto, menghitung Penghasilan Kena Pajak (PKP), dan menerapkan tarif progresif Pasal 17 setiap bulannya. Proses ini sangat rumit dan sering kali membingungkan karyawan karena nominal potongan yang fluktuatif.</p>
      <p>Skema TER menyederhanakan perhitungan masa pajak Januari hingga November dengan formula langsung: <strong>PPh 21 Masa Bulanan = Penghasilan Bruto Sebulan × Tarif Efektif Bulanan (TER)</strong>.</p>
      <ul>
        <li><strong>TER Kategori A:</strong> Untuk status PTKP TK/0 (54 juta), TK/1 (58,5 juta), dan K/0 (58,5 juta). Tarif berkisar antara 0% hingga 34%.</li>
        <li><strong>TER Kategori B:</strong> Untuk status PTKP TK/2, TK/3, K/1, dan K/2. Tarif berkisar antara 0% hingga 34%.</li>
        <li><strong>TER Kategori C:</strong> Khusus untuk status PTKP K/3 (kawin dengan 3 tanggungan = 72 juta). Tarif berkisar antara 0% hingga 34%.</li>
      </ul>

      <h2>2. Bahaya Ketergantungan pada Spreadsheet Manual</h2>
      <p>Banyak perusahaan dengan puluhan hingga ratusan karyawan masih mengandalkan formula Excel yang rumit. Praktik ini mengandung risiko operasional yang fatal:</p>
      <ol>
        <li><strong>Risiko Kesalahan Rumus (Human Error):</strong> Karyawan baru yang salah memasukkan status PTKP atau lupa memperbarui batas iuran BPJS dapat mengakibatkan kurang bayar atau lebih bayar pajak yang berujung denda sanksi perpajakan.</li>
        <li><strong>Kebocoran Data Gaji (Data Breach):</strong> File Excel yang dikirimkan via email atau disimpan di komputer lokal tidak memiliki enkripsi granular, sehingga rawan diakses oleh pihak yang tidak berwenang.</li>
        <li><strong>Rekonsiliasi Masa Pajak Desember yang Melelahkan:</strong> Pada masa pajak Desember, perusahaan wajib menghitung ulang PPh 21 setahun penuh menggunakan tarif Pasal 17 ayat (1) huruf a UU PPh dan mengurangkannya dengan akumulasi PPh 21 yang telah dipotong pada masa Januari-November.</li>
      </ol>

      <h2>3. Keunggulan Sistem Payroll Terpadu Mitrasova Daya</h2>
      <p>Melalui platform Mitrasova Daya, seluruh proses penggajian telah diotomatisasi secara end-to-end:</p>
      <ul>
        <li><strong>Kalkulasi Instan Multi-Komponen:</strong> Gaji pokok, tunjangan jabatan, uang lembur otomatis, insentif kehadiran, potongan BPJS Kesehatan dan BPJS Ketenagakerjaan dihitung dalam hitungan detik.</li>
        <li><strong>Export Format Bank Siap Transfer:</strong> Menghasilkan file CSV kliring massal yang kompatibel dengan bank-bank terkemuka untuk pembayaran payroll 1-klik.</li>
        <li><strong>Slip Gaji Digital Terenkripsi:</strong> Karyawan menerima slip gaji berformat PDF dengan proteksi password terenkripsi langsung ke akun WhatsApp dan aplikasi smartphone mereka.</li>
      </ul>

      <h2>4. Pengawasan Kehadiran dengan Geofencing & Face Liveness Detection</h2>
      <p>Akurasi penggajian bermula dari validitas data absensi. Mitrasova Daya dilengkapi perimeter geofencing GPS anti-fake GPS dan deteksi biometrik wajah (liveness check) yang memastikan karyawan benar-benar berada di lokasi kerja saat mencatat jam masuk dan pulang.</p>
    `,
    type: 'ARTICLE',
    categorySlug: 'wawasan-blog',
    categoryName: 'Wawasan & Blog',
    authorName: 'Solution Architect Mitrasova',
    authorRole: 'HR Tech Lead',
    readTime: '7 min baca',
    featured: false,
    tags: ['HRIS', 'Payroll', 'PPh 21 TER', 'BPJS', 'Manajemen SDM', 'Otomatisasi Gaji'],
    updatedAt: '2026-08-22',
    createdAt: '2026-08-22',
  },
  {
    id: 'post-3',
    title: 'Membangun Arsitektur Cloud High-Availability: Mitigasi DDoS Layer 7 & Jaminan Uptime 99.99%',
    slug: 'membangun-arsitektur-cloud-high-availability-ddos-sla',
    summary: 'Kajian arsitektur multi-region data center di Jakarta dan Singapura, strategi auto-scaling cluster K8s, serta mekanisme failover tanpa downtime.',
    contentHtml: `
      <p class="lead">Bagi platform e-commerce, sistem perbankan finansial, maupun aplikasi enterprise dengan ribuan pengguna simultan, downtime server adalah kerugian finansial langsung. Dalam ekonomi digital yang beroperasi 24/7, menjamin keandalan infrastruktur server dengan Service Level Agreement (SLA) 99.99% menuntut perancangan arsitektur cloud yang tangguh dan berlapis.</p>

      <h2>1. Apa Arti Jaminan Uptime 99.99% (Four Nines)?</h2>
      <p>Dalam konteks reliabilitas sistem, tingkat ketersediaan 99.99% berarti total toleransi downtime kumulatif maksimal hanyalah <strong>4,32 menit dalam satu bulan</strong> atau kurang dari <strong>52,6 menit dalam satu tahun penuh</strong>. Standar ini mustahil dicapai menggunakan server fisik tunggal.</p>

      <h2>2. Topologi Multi-Region & Redundansi Ganda Mitrasova Nexus</h2>
      <p>Infrastruktur Mitrasova Nexus dibangun di atas fasilitas Data Center Tier-4 berstandar global:</p>
      <ul>
        <li><strong>Node Primer Jakarta (Indonesia):</strong> Peering langsung ke Indonesia Internet Exchange (IIX) dan OpenIXP dengan latensi domestik ultra-rendah (&lt;10ms) untuk melayani pengguna lokal.</li>
        <li><strong>Node Sekunder Equinix SG1 (Singapura):</strong> Menghubungkan gateway internasional dan berfungsi sebagai klaster cadangan siaga (hot standby) dengan replikasi data asinkron berkecepatan tinggi.</li>
        <li><strong>Anycast DNS & Smart Traffic Steering:</strong> Jika salah satu data center mengalami kendala pasokan daya atau gangguan, lalu lintas trafik dialihkan secara otomatis ke node sekunder tanpa disadari oleh pengguna akhir.</li>
      </ul>

      <h2>3. Anatomi Pertahanan Menghadapi Serangan DDoS</h2>
      <p>Serangan Distributed Denial of Service (DDoS) kini berevolusi dari sekadar membanjiri kapasitas bandwidth (Layer 3 & Layer 4) menjadi serangan canggih pada lapisan aplikasi (Layer 7):</p>
      <ol>
        <li><strong>Volumetric Attacks:</strong> Dimediasi oleh jaringan pembersih trafik (Scrubbing Center) berkapasitas 2 Tbps yang menyaring paket berbahaya sebelum menyentuh server aplikasi.</li>
        <li><strong>Application Layer Attacks:</strong> Dihadapi menggunakan Web Application Firewall (WAF) berbasis AI yang menganalisis pola perilaku trafik dan memberlakukan rate-limiting cerdas per IP address.</li>
      </ol>

      <h2>4. Strategi Pencadangan & RPO / RTO dalam Hitungan Menit</h2>
      <p>Bencana hilangnya data dapat melumpuhkan kredibilitas institusi. Mitrasova Nexus menerapkan continuous database WAL archiving sehingga Recovery Point Objective (RPO) dapat ditekan hingga di bawah 1 menit, serta backup snapshot terenkripsi AES-256 harian ke off-site storage.</p>
    `,
    type: 'ARTICLE',
    categorySlug: 'wawasan-blog',
    categoryName: 'Wawasan & Blog',
    authorName: 'Solution Architect Mitrasova',
    authorRole: 'Cloud Infrastructure Lead',
    readTime: '9 min baca',
    featured: false,
    tags: ['Cloud Infrastructure', 'DDoS Protection', 'High Availability', 'DevOps', 'Kubernetes', 'Tier-4'],
    updatedAt: '2026-08-24',
    createdAt: '2026-08-24',
  },
  {
    id: 'post-4',
    title: 'Modernisasi Sistem Monolitik: Arsitektur Microservices & API Gateway untuk Korporasi',
    slug: 'modernisasi-sistem-monolitik-microservices-api-gateway',
    summary: 'Strategi migrasi sistem warisan (legacy ERP) menggunakan Next.js fullstack, GraphQL/REST gateway terpadu, dan standar audit OWASP Top 10.',
    contentHtml: `
      <p class="lead">Banyak korporasi besar terjebak dalam dilema arsitektur: sistem perangkat lunak lama (legacy system) yang telah digunakan selama lebih dari satu dekade masih menyimpan proses bisnis inti, namun struktur monolitiknya yang kaku membuat pengembangan fitur baru dan integrasi aplikasi mobile menjadi sangat lambat dan berisiko tinggi.</p>

      <h2>1. Dilema Monolith: Mengapa Perlu Modernisasi?</h2>
      <p>Aplikasi monolitik warisan umumnya memiliki basis kode raksasa yang saling terikat erat. Ketika salah satu modul kasir atau pelaporan mengalami bug, seluruh server aplikasi berisiko lumpuh. Selain itu, proses deployment membutuhkan waktu henti yang mengganggu jam kerja normal.</p>

      <h2>2. Pola Strangler Fig: Migrasi Bertahap Tanpa Risiko</h2>
      <p>Melalui divisi Mitrasova Labs, kami menerapkan pendekatan <strong>Strangler Fig Pattern</strong>:</p>
      <ol>
        <li><strong>Pasang API Gateway di Depan Sistem Lama:</strong> Gateway bertindak sebagai proksi pintar yang meneruskan permintaan pengguna ke sistem lama atau ke modul mikroservis baru.</li>
        <li><strong>Ekstrak Modul Satu per Satu:</strong> Modul yang membutuhkan kecepatan inovasi tinggi dibangun secara mandiri menggunakan teknologi modern Next.js dan Node.js/Go.</li>
        <li><strong>Sinkronisasi Basis Data Dua Arah:</strong> Menjaga konsistensi data antara database relasional baru PostgreSQL dan database warisan melalui event-driven message queue.</li>
      </ol>

      <h2>3. Standar Rekayasa Clean Code & SOLID Principles</h2>
      <p>Kualitas kode adalah investasi jangka panjang. Setiap aplikasi kustom yang dibangun mematuhi aturan baku Single Responsibility, Open/Closed Principle, Explicit Typing dengan TypeScript, serta audit keamanan OWASP Top 10 sebelum masa go-live.</p>
    `,
    type: 'ARTICLE',
    categorySlug: 'wawasan-blog',
    categoryName: 'Wawasan & Blog',
    authorName: 'Raihan Marwanda',
    authorRole: 'Solution Architect',
    readTime: '8 min baca',
    featured: false,
    tags: ['Software Engineering', 'Next.js', 'API Gateway', 'Microservices', 'Clean Architecture', 'OWASP'],
    updatedAt: '2026-08-25',
    createdAt: '2026-08-25',
  },
  {
    id: 'post-5',
    title: 'Mitrasova Digital Solutions Resmikan Pusat Layanan & Onboarding Bisnis Terpadu di Solo Raya',
    slug: 'mitrasova-resmikan-pusat-layanan-solo-raya',
    summary: 'Ekspansi strategis memperkuat pendampingan teknis langsung, pelatihan staf kasir on-site, dan dukungan arsitektur IT untuk pelaku usaha Jawa Tengah.',
    contentHtml: `
      <p class="lead"><strong>SURAKARTA, JAWA TENGAH</strong> — Mitrasova Digital Solutions resmi mengumumkan pembukaan Pusat Layanan Teknis & Onboarding Terpadu yang berlokasi strategis di kawasan Solo Raya. Inisiatif ini dirancang khusus untuk memberikan pendampingan langsung bagi pelaku usaha ritel, manufaktur, dan korporasi di wilayah Solo Raya, Karanganyar, Boyolali, Sukoharjo, dan sekitarnya.</p>

      <h2>Mendekatkan Layanan Engineering ke Pelaku Usaha</h2>
      <p>Selama ini, banyak pelaku usaha di daerah menghadapi kendala saat mengadopsi software enterprise karena minimnya dukungan teknis langsung di lapangan. Sebagian besar penyedia aplikasi hanya menyediakan bantuan melalui email atau chat bot yang lambat.</p>
      <p><em>"Kami percaya bahwa keberhasilan digitalisasi bukan hanya soal software yang canggih, melainkan tentang bagaimana tim di lapangan dilatih, didampingi saat terjadi kendala hardware printer kasir, dan bagaimana sistem dikonfigurasi sesuai alur bisnis nyata,"</em> ujar Raihan Marwanda, Founder & Chief Architect Mitrasova.</p>

      <h2>Fasilitas & Layanan Unggulan</h2>
      <ul>
        <li><strong>Lab Pengujian Hardware Kasir:</strong> Pengujian kompatibilitas printer thermal Bluetooth/LAN, barcode scanner nirkabel, dan laci kasir otomatis.</li>
        <li><strong>Sesi Pelatihan Staf & Kasir Gratis:</strong> Simulasi transaksi kasir offline, pengelolaan nota retur konsinyasi, dan pelatihan admin payroll.</li>
        <li><strong>Dedicated Priority Hotline:</strong> Saluran komunikasi darurat 24 jam dengan waktu respon SLA kurang dari 15 menit.</li>
      </ul>
    `,
    type: 'NEWS',
    categorySlug: 'berita-media',
    categoryName: 'Berita & Media',
    authorName: 'Tim Editorial Mitrasova',
    authorRole: 'Corporate Communications',
    readTime: '4 min baca',
    featured: false,
    tags: ['Berita Perusahaan', 'Mitrasova', 'Ekspansi Bisnis', 'Solo Raya', 'Digitalisasi UMKM'],
    updatedAt: '2026-08-26',
    createdAt: '2026-08-26',
  },
  {
    id: 'post-6',
    title: 'Solo Tech Summit 2026: Workshop Akselerasi Digitalisasi Ritel & Transformasi HR Korporasi',
    slug: 'solo-tech-summit-2026-workshop-ritel-hr',
    summary: 'Sesi temu teknologi interaktif bersama Solution Architect Mitrasova membahas simulasi live sistem POS offline dan payroll otomatis.',
    contentHtml: `
      <p class="lead">Ikuti agenda temu teknologi tahunan <strong>Solo Tech Summit 2026</strong> yang diselenggarakan oleh Mitrasova Digital Solutions. Mengusung tema <em>"Scalable Architecture for Modern Business"</em>, seminar dan workshop interaktif ini menghadirkan para praktisi teknologi dan bisnis terkemuka untuk mengupas tuntas strategi digitalisasi operasional.</p>

      <h2>Agenda & Sesi Utama</h2>
      <div style="background-color: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #1e293b; margin: 20px 0;">
        <h3 style="color: #38bdf8; margin-top: 0;">Sesi 1: Mengelola Ratusan Supplier Konsinyasi Tanpa Selisih Stok (09.00 - 11.30 WIB)</h3>
        <p>Bedah studi kasus optimasi toko ritel, simulasi kasir offline mode saat internet padam, dan pembagian komisi supplier otomatis.</p>

        <h3 style="color: #818cf8; margin-top: 16px;">Sesi 2: Implementasi Cepat Pajak PPh 21 TER 2026 & BPJS (13.00 - 15.30 WIB)</h3>
        <p>Workshop praktis setting formula penggajian, integrasi presensi geofencing anti-fake GPS, dan distribusi slip gaji digital terenkripsi.</p>
      </div>

      <h2>Benefit Partisipasi</h2>
      <ul>
        <li>Akses hands-on pengujian sistem POS dan HRIS interaktif.</li>
        <li>E-Certificate resmi dan modul blueprint arsitektur sistem ritel.</li>
        <li>Sesi 1-on-1 Consultation gratis bersama Solution Architect Mitrasova.</li>
        <li>Paket uji coba sistem eksklusif bagi peserta yang hadir.</li>
      </ul>
    `,
    type: 'EVENT',
    categorySlug: 'event-agenda',
    categoryName: 'Events & Agenda',
    authorName: 'Tim Editorial Mitrasova',
    authorRole: 'Community Lead',
    readTime: '5 min baca',
    eventDate: '2026-09-20T09:00:00.000Z',
    eventLocation: 'Auditorium Solo Technopark & Live Interactive Hybrid Webinar',
    featured: false,
    tags: ['Event', 'Workshop', 'Seminar', 'Tech Meetup', 'Solo Technopark', 'Digitalisasi'],
    updatedAt: '2026-08-26',
    createdAt: '2026-08-26',
  },
  {
    id: 'post-7',
    title: 'Catatan Rilis Mitrasova POS v2.6: Modul Rekonsiliasi Otomatis & Multi-Barcode Scanner',
    slug: 'catatan-rilis-mitrasova-pos-v26',
    summary: 'Peningkatan performa pemrosesan kasir 0ms latency, integrasi printer thermal Bluetooth berkecepatan tinggi, dan settlement faktur konsinyasi instan.',
    contentHtml: `
      <p class="lead">Kami sangat antusias merilis pembaruan besar <strong>Mitrasova POS versi 2.6 (Production Release)</strong>. Versi ini membawa berbagai penyempurnaan fitur penting yang dirancang untuk mempercepat transaksi kasir hingga 40% dan menyederhanakan rekonsiliasi konsinyasi.</p>

      <h2>Sorotan Pembaruan Fitur Utama</h2>

      <h3>1. Modul Settlement Faktur Konsinyasi 1-Klik</h3>
      <p>Kini Anda dapat menerbitkan rekap tagihan supplier konsinyasi secara instan berdasarkan periode penjualan tertentu, memotong komisi toko secara otomatis, dan mencetak lembar verifikasi retur fisik.</p>

      <h3>2. Dukungan Multi-Barcode & Batch Scanner</h3>
      <p>Memungkinkan kasir memindai barcode produk dalam mode serial berkelanjutan (continuous batch scanning) tanpa perlu menunggu jeda layar, sangat ideal untuk minimarket dan grosir berkecepatan tinggi.</p>

      <h3>3. Peningkatan Sinkronisasi Offline-First Engine</h3>
      <ul>
        <li>Optimasi local cache IndexedDB dengan kompresi data transaksi.</li>
        <li>Mekanisme auto-retry pintar saat jaringan seluler tidak stabil.</li>
        <li>Indikator status sync visual di pojok kanan atas layar kasir.</li>
      </ul>
    `,
    type: 'RELEASE',
    categorySlug: 'rilis-produk',
    categoryName: 'Rilis Produk',
    authorName: 'Raihan Marwanda',
    authorRole: 'Solution Architect',
    readTime: '5 min baca',
    featured: false,
    tags: ['Release Notes', 'Mitrasova POS', 'Pembaruan Fitur', 'Changelog', 'Performa Kasir'],
    updatedAt: '2026-08-27',
    createdAt: '2026-08-27',
  },
];
