import { PrismaClient, Role, PostStatus, ConsultationStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Memulai proses reset dan seeding database Mitrasova...');

  // 1. Bersihkan seluruh data existing di database
  console.log('🧹 Menghapus data lama di database...');
  await prisma.post.deleteMany({});
  await prisma.consultation.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('✨ Seluruh data lama berhasil dibersihkan.');

  // 2. Seeding Users (Admin, Editor, Tech Lead)
  console.log('👤 Membuat data Users/Authors...');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@mitrasova.com',
      name: 'Raihan Marwanda',
      role: Role.ADMIN,
      passwordHash: 'admin123',
    },
  });

  const editorUser = await prisma.user.create({
    data: {
      email: 'editorial@mitrasova.com',
      name: 'Tim Editorial Mitrasova',
      role: Role.EDITOR,
      passwordHash: 'editor123',
    },
  });

  const architectUser = await prisma.user.create({
    data: {
      email: 'architect@mitrasova.com',
      name: 'Solution Architect Mitrasova',
      role: Role.ADMIN,
      passwordHash: 'architect123',
    },
  });

  console.log('✅ Users berhasil dibuat:');
  console.log(`   - Admin / Founder: ${adminUser.email}`);
  console.log(`   - Tim Editorial  : ${editorUser.email}`);
  console.log(`   - Solution Arch  : ${architectUser.email}`);

  // 3. Seeding Categories (Master Kategori Publikasi)
  console.log('📁 Membuat Master Categories...');
  const categoriesData = [
    {
      name: 'Tips & Panduan',
      slug: 'wawasan-blog',
      description: 'Panduan praktis seputar pengelolaan kasir ritel, tips HR & payroll karyawan, teknologi cloud, dan arsitektur software.',
      order: 1,
    },
    {
      name: 'Kabar & Berita',
      slug: 'berita-media',
      description: 'Kabar resmi, cerita kemitraan, dan pengumuman terbaru dari Mitrasova Digital Solutions.',
      order: 2,
    },
    {
      name: 'Agenda Event',
      slug: 'event-agenda',
      description: 'Agenda temu komunitas bisnis, workshop operasional, seminar toko ritel, dan webinar online.',
      order: 3,
    },
    {
      name: 'Update Produk',
      slug: 'rilis-produk',
      description: 'Informasi pembaruan fitur, peningkatan performa, dan catatan rilis sistem Mitrasova.',
      order: 4,
    },
  ];

  const categoriesMap = new Map<string, { id: string; name: string; slug: string }>();
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({
      data: cat,
    });
    categoriesMap.set(createdCat.slug, createdCat);
  }
  console.log('✅ Master Categories berhasil dibuat.');

  // 4. Seeding Services / Products
  console.log('📦 Membuat Data Ekosistem Produk...');
  const servicesData = [
    {
      title: 'Mitrasova POS',
      slug: 'mitrasova-pos',
      heroTagline: 'Kasir Offline-First, Konsinyasi & Akuntansi Terpadu',
      summary: 'Sistem Kasir Offline Mode dengan Manajemen Konsinyasi & Bagi Hasil Supplier, Stok Multi-Cabang, serta Akuntansi Neraca & General Ledger.',
      description: 'Mitrasova POS adalah solusi perangkat lunak kasir pintar generasi terbaru. Didesain untuk operasional ritel & grosir dengan dukungan mode offline penuh, pencatatan barang konsinyasi & bagi komisi supplier, sinkronisasi stok multi-cabang, serta sistem akuntansi terintegrasi (neraca, laba rugi, dan general ledger).',
      icon: 'ShoppingBag',
      category: 'SaaS POS & Accounting',
      badge: 'Offline POS & Konsinyasi',
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
      isActive: true,
      order: 1,
    },
    {
      title: 'Mitrasova Daya',
      slug: 'mitrasova-daya',
      heroTagline: 'Platform HRIS, Payroll, & Presensi Geolocation Karyawan',
      summary: 'Otomatisasi Hitung Gaji/Payroll, PPh 21, BPJS, Absensi Face-Recognition, & Manajemen Cuti Karyawan Enterprise.',
      description: 'Mitrasova Daya memberdayakan departemen HR dan pimpinan perusahaan dalam mengelola aset terpenting: Sumber Daya Manusia. Kelola jadwal shift, kalkulasi slip gaji instan dengan pajak PPh 21 TER terbaru, klaim reimbursement, dan evaluasi kinerja karyawan secara objektif.',
      icon: 'Users',
      category: 'HRIS & Workforce',
      badge: 'HRIS & Payroll Enterprise',
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
      isActive: true,
      order: 2,
    },
    {
      title: 'Mitrasova Nexus',
      slug: 'mitrasova-nexus',
      heroTagline: 'High-Availability Cloud Hosting, Managed VPS & Security',
      summary: 'Infrastruktur Cloud Hosting Kinerja Tinggi dengan 99.99% Uptime SLA, DDoS Protection, & Auto-Scaling Server.',
      description: 'Mitrasova Nexus adalah layanan infrastruktur cloud server terkelola (Managed Cloud Services) yang dirancang untuk aplikasi mission-critical. Didukung oleh jaringan server Tier-4 lokal di Jakarta & Singapura dengan latency ultra-rendah dan proteksi lapisan keamanan bertingkat.',
      icon: 'Server',
      category: 'Cloud Infrastructure',
      badge: 'Tier-4 Managed Cloud',
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
      isActive: true,
      order: 3,
    },
    {
      title: 'Mitrasova Labs',
      slug: 'mitrasova-labs',
      heroTagline: 'Custom Software Engineering, Web & Mobile Development',
      summary: 'Layanan Pengembangan Aplikasi Web Enterprise, Mobile Apps Native, Microservices, & Integrasi API Sistem Custom.',
      description: 'Mitrasova Labs menghadirkan tim software architect dan senior developer untuk merealisasikan sistem kustom skala besar bagi perusahaan Anda. Dari arsitektur microservices modern, integrasi payment gateway, hingga aplikasi mobile iOS/Android khusus.',
      icon: 'Code',
      category: 'Custom Engineering',
      badge: 'Enterprise Engineering',
      features: [
        {
          title: 'Modern Fullstack Architecture',
          description: 'Pembangunan aplikasi menggunakan teknologi Next.js, Node.js/Go, React Native, PostgreSQL, & Cloud Native stack.',
          iconName: 'Terminal',
        },
        {
          title: 'API & Legacy System Integration',
          description: 'Menghubungkan sistem ERP lama (SAP, Oracle) dengan platform digital modern via RESTful/GraphQL API.',
          iconName: 'GitBranch',
        },
        {
          title: 'Code Security Audit & Penetration Testing',
          description: 'Pengujian celah keamanan aplikasi standar OWASP Top 10 sebelum masa migrasi dan komersialisasi rilis.',
          iconName: 'ShieldCheck',
        },
        {
          title: 'Agile Development Sprint & SLA Support',
          description: 'Transparansi progres mingguan dengan metode Scrum, dokumentasi API Swagger, serta garansi pemeliharaan.',
          iconName: 'CheckCircle2',
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
      isActive: true,
      order: 4,
    },
  ];

  for (const srv of servicesData) {
    await prisma.service.create({
      data: srv,
    });
  }
  console.log('✅ Ekosistem Produk berhasil dibuat.');

  // 5. Seeding Artikel Blog & Publikasi (Panjang, Edukatif, Profesional)
  console.log('📝 Membuat Konten Artikel Blog & Publikasi Edukatif...');

  const postsData = [
    {
      title: 'Optimalisasi Bisnis Retail Modern: Manajemen Konsinyasi, Offline POS, & Otomatisasi Jurnal Akuntansi',
      slug: 'optimalisasi-bisnis-retail-konsinyasi-offline-pos-akuntansi',
      summary: 'Kajian mendalam strategi pengelolaan ratusan supplier konsinyasi, pencegahan antrean dengan arsitektur kasir offline-first, dan pencatatan neraca keuangan real-time.',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1200&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      featured: true,
      readTime: '8 min baca',
      tags: ['Retail', 'POS Kasir', 'Konsinyasi', 'Akuntansi', 'Offline-First', 'Manajemen Stok'],
      categoryId: categoriesMap.get('wawasan-blog')!.id,
      authorId: adminUser.id,
      publishedAt: new Date('2026-08-20T08:30:00Z'),
      contentHtml: `
        <p class="lead">Dalam lanskap industri ritel yang semakin kompetitif, mengelola efisiensi kasir, arus kas persediaan barang, serta ribuan transaksi harian bukan sekadar urusan mencetak struk belanja. Bagi bisnis modern dengan model kemitraan konsinyasi (titip jual) dan jaringan toko multi-cabang, integrasi teknologi kasir yang tangguh dan modul akuntansi otomatis adalah fondasi utama keberlanjutan profitabilitas.</p>

        <h2>1. Kompleksitas Model Konsinyasi di Ritel Indonesia</h2>
        <p>Skema konsinyasi atau titip jual merupakan tulang punggung variasi produk pada toko ritel modern di Indonesia, mulai dari supermarket makanan olahan, toko busana dan *apparel*, hingga toko buku dan oleh-oleh. Model ini memungkinkan pemilik toko (<em>konsinyi</em>) memajang ribuan SKU tanpa harus mengeluarkan modal kerja (*working capital*) besar di muka untuk pembelian putus.</p>
        <p>Namun, tantangan terbesar konsinyasi terletak pada <strong>administrasi pencatatan yang sangat rentan selisih</strong>:</p>
        <ul>
          <li><strong>Pemisahan Stok Kepemilikan:</strong> Barang titipan secara hukum tetap merupakan aset milik konsinyor (supplier). Mencampurkan nilai aset konsinyasi ke dalam neraca persediaan toko sendiri dapat menggelembungkan nilai aset secara semu (*overstated inventory assets*).</li>
          <li><strong>Formula Bagi Hasil Dinamis:</strong> Setiap supplier memiliki persentase bagi hasil komisi berbeda (misalnya 70/30, 80/20, atau margin nominal tetap). Menghitung komisi ini secara manual menggunakan spreadsheet pada puluhan ribu baris penjualan adalah mimpi buruk operasional yang memicu kesalahan bayar.</li>
          <li><strong>Proses Retur & Pelunasan Faktur:</strong> Barang yang tidak laku atau mendekati masa kadaluarsa harus direkonsiliasi dengan nota retur resmi sebelum pembayaran periodik dicairkan kepada supplier.</li>
        </ul>

        <h2>2. Mengapa Arsitektur Offline-First Menjadi Kebutuhan Mutlak</h2>
        <p>Salah satu momok terbesar operasional kasir adalah <em>internet downtime</em> atau latensi jaringan. Dalam kondisi jam sibuk (*peak hours*), penundaan respon kasir sebesar 2-3 detik saja dapat menyebabkan antrean mengular, ketidakpuasan pelanggan, hingga potensi transaksi yang batal.</p>
        <p>Mitrasova POS menerapkan arsitektur <strong>Offline-First berkinerja tinggi</strong>. Seluruh proses scanning barcode, perhitungan diskon bertingkat, penambahan item, dan pencetakan struk thermal ESC/POS dieksekusi secara lokal pada memori perangkat kasir dengan latensi 0ms. Ketika koneksi internet terputus:</p>
        <ol>
          <li>Kasir tetap dapat melayani penjualan tunai maupun verifikasi kode bayar offline tanpa kendala.</li>
          <li>Setiap mutasi transaksi dienkripsi dan disimpan pada basis data lokal perangkat.</li>
          <li>Saat jaringan internet pulih, algoritma sinkronisasi cerdas (*bi-directional auto-sync*) secara otomatis mengunggah transaksi ke cloud database terpusat dan memperbarui sisa stok di seluruh cabang tanpa menimbulkan duplikasi data.</li>
        </ol>

        <h2>3. Otomatisasi General Ledger & Laporan Keuangan Real-Time</h2>
        <p>Dalam sistem ritel konvensional, staf akuntansi harus menghabiskan waktu berjam-jam setiap akhir bulan untuk merekap struk penjualan fisik, mencocokkan mutasi rekening, dan membuat jurnal penyesuaian (*journal entries*). Hal ini menyebabkan laporan keuangan tertunda (*financial report lag*), sehingga pimpinan bisnis kehilangan momentum strategis.</p>
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
    },
    {
      title: 'Panduan Lengkap Implementasi Pajak PPh 21 TER 2026 & Efisiensi Payroll Tanpa Spreadsheet',
      slug: 'panduan-lengkap-pph21-ter-2026-otomatisasi-payroll',
      summary: 'Membedah formula TER Kategori A, B, C, integrasi iuran BPJS Ketenagakerjaan & Kesehatan, serta otomatisasi slip gaji digital terenkripsi.',
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      featured: false,
      readTime: '7 min baca',
      tags: ['HRIS', 'Payroll', 'PPh 21 TER', 'BPJS', 'Manajemen SDM', 'Otomatisasi Gaji'],
      categoryId: categoriesMap.get('wawasan-blog')!.id,
      authorId: architectUser.id,
      publishedAt: new Date('2026-08-22T10:15:00Z'),
      contentHtml: `
        <p class="lead">Perubahan skema pemotongan Pajak Penghasilan Pasal 21 menggunakan metode Tarif Efektif Rata-Rata (TER) yang diatur dalam Peraturan Pemerintah (PP) No. 58/2023 dan PMK No. 168/2023 mengubah secara mendasar bagaimana departemen Human Resource dan Finance di seluruh Indonesia menghitung gaji bulanan karyawan.</p>

        <h2>1. Memahami Logika Dasar Skema Pajak PPh 21 TER</h2>
        <p>Sebelum adanya TER, perhitungan PPh 21 bulanan mewajibkan perusahaan melakukan setahunisasi penghasilan netto, menghitung Penghasilan Kena Pajak (PKP), dan menerapkan tarif progresif Pasal 17 setiap bulannya. Proses ini sangat rumit dan sering kali membingungkan karyawan karena nominal potongan yang fluktuatif.</p>
        <p>Skema TER menyederhanakan perhitungan masa pajak Januari hingga November dengan formula langsung:</p>
        <div style="background-color: #0f172a; padding: 16px; border-radius: 12px; border: 1px solid #1e293b; margin: 16px 0; font-family: monospace;">
          <strong>PPh 21 Masa Bulanan = Penghasilan Bruto Sebulan × Tarif Efektif Bulanan (TER)</strong>
        </div>
        <p>Kategori TER dibagi menjadi tiga kelompok berdasarkan status Penghasilan Tidak Kena Pajak (PTKP):</p>
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
        <p>Melalui platform <strong>Mitrasova Daya</strong>, seluruh proses penggajian telah diotomatisasi secara end-to-end:</p>
        <ul>
          <li><strong>Kalkulasi Instan Multi-Komponen:</strong> Gaji pokok, tunjangan jabatan, uang lembur otomatis (sesuai rumus Depnaker), insentif kehadiran, potongan BPJS Kesehatan (4% pemberi kerja + 1% pekerja), dan BPJS Ketenagakerjaan (JKK, JKM, JHT, JP) dihitung dalam hitungan detik.</li>
          <li><strong>Export Format Bank Siap Transfer:</strong> Menghasilkan file CSV kliring massal yang kompatibel dengan bank-bank terkemuka (BCA, Mandiri, BRI, BNI) untuk pembayaran payroll 1-klik.</li>
          <li><strong>Slip Gaji Digital Terenkripsi:</strong> Karyawan menerima slip gaji berformat PDF dengan proteksi password terenkripsi langsung ke akun WhatsApp dan aplikasi smartphone mereka.</li>
        </ul>

        <h2>4. Pengawasan Kehadiran dengan Geofencing & Face Liveness Detection</h2>
        <p>Akurasi penggajian bermula dari validitas data absensi. Mitrasova Daya dilengkapi perimeter geofencing GPS anti-fake GPS dan deteksi biometrik wajah (liveness check) yang memastikan karyawan benar-benar berada di lokasi kerja saat mencatat jam masuk dan pulang.</p>
        <p>Dengan beralih dari proses manual ke platform digital terpadu, perusahaan Anda dapat menghemat lebih dari 80% waktu administrasi bulanan dan menjamin kepatuhan 100% terhadap regulasi perpajakan nasional.</p>
      `,
    },
    {
      title: 'Membangun Arsitektur Cloud High-Availability: Mitigasi DDoS Layer 7 & Jaminan Uptime 99.99%',
      slug: 'membangun-arsitektur-cloud-high-availability-ddos-sla',
      summary: 'Kajian arsitektur multi-region data center di Jakarta dan Singapura, strategi auto-scaling cluster K8s, serta mekanisme failover tanpa downtime.',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      featured: false,
      readTime: '9 min baca',
      tags: ['Cloud Infrastructure', 'DDoS Protection', 'High Availability', 'DevOps', 'Kubernetes', 'Tier-4'],
      categoryId: categoriesMap.get('wawasan-blog')!.id,
      authorId: architectUser.id,
      publishedAt: new Date('2026-08-24T14:20:00Z'),
      contentHtml: `
        <p class="lead">Bagi platform e-commerce, sistem perbankan finansial, maupun aplikasi enterprise dengan ribuan pengguna simultan, downtime server adalah kerugian finansial langsung. Dalam ekonomi digital yang beroperasi 24/7, menjamin keandalan infrastruktur server dengan Service Level Agreement (SLA) 99.99% menuntut perancangan arsitektur cloud yang tangguh dan berlapis.</p>

        <h2>1. Apa Arti Jaminan Uptime 99.99% (Four Nines)?</h2>
        <p>Dalam konteks reliabilitas sistem, tingkat ketersediaan 99.99% berarti total toleransi downtime kumulatif maksimal hanyalah <strong>4,32 menit dalam satu bulan</strong> atau kurang dari <strong>52,6 menit dalam satu tahun penuh</strong>. Standar ini mustahil dicapai menggunakan server fisik tunggal (*single point of failure*).</p>

        <h2>2. Topologi Multi-Region & Redundansi Ganda Mitrasova Nexus</h2>
        <p>Infrastruktur <strong>Mitrasova Nexus</strong> dibangun di atas fasilitas Data Center Tier-4 berstandar global:</p>
        <ul>
          <li><strong>Node Primer Jakarta (Indonesia):</strong> Peering langsung ke Indonesia Internet Exchange (IIX) dan OpenIXP dengan latensi domestik ultra-rendah (&lt;10ms) untuk melayani pengguna lokal.</li>
          <li><strong>Node Sekunder Equinix SG1 (Singapura):</strong> Menghubungkan gateway internasional dan berfungsi sebagai klaster cadangan siaga (*hot standby*) dengan replikasi data asinkron berkecepatan tinggi.</li>
          <li><strong>Anycast DNS & Smart Traffic Steering:</strong> Jika salah satu data center mengalami kendala pasokan daya atau bencana alam, lalu lintas trafik dialihkan secara otomatis ke node sekunder tanpa disadari oleh pengguna akhir (*zero perceptible downtime*).</li>
        </ul>

        <h2>3. Anatomi Pertahanan Menghadapi Serangan DDoS</h2>
        <p>Serangan Distributed Denial of Service (DDoS) kini berevolusi dari sekadar membanjiri kapasitas bandwidth (Layer 3 & Layer 4) menjadi serangan canggih pada lapisan aplikasi (Layer 7):</p>
        <ol>
          <li><strong>Volumetric Attacks (SYN Flood, UDP Amplification):</strong> Dimediasi oleh jaringan pembersih trafik (*Scrubbing Center*) berkapasitas 2 Tbps yang menyaring paket berbahaya sebelum menyentuh server aplikasi.</li>
          <li><strong>Application Layer Attacks (HTTP GET/POST Flood, Slowloris):</strong> Dihadapi menggunakan Web Application Firewall (WAF) berbasis AI yang menganalisis pola perilaku trafik, melakukan tantangan JavaScript (*JS Challenge*), dan memberlakukan <em>rate-limiting</em> cerdas per IP address.</li>
        </ol>

        <h2>4. Strategi Pencadangan & RPO / RTO dalam Hitungan Menit</h2>
        <p>Bencana hilangnya data dapat melumpuhkan kredibilitas institusi. Mitrasova Nexus menerapkan kebijakan pencadangan otomatis:</p>
        <ul>
          <li><strong>Continuous Database WAL Archiving:</strong> Setiap perubahan transaksi diarsipkan secara berkelanjutan sehingga Recovery Point Objective (RPO) dapat ditekan hingga di bawah 1 menit.</li>
          <li><strong>Encrypted Off-Site Daily Snapshots:</strong> Snapshot seluruh volume server dienkripsi menggunakan AES-256 dan disimpan di lokasi penyimpanan terisolasi (*air-gapped storage*) untuk mencegah ancaman ransomware.</li>
        </ul>
        <p>Dengan mempercayakan pondasi server kepada arsitektur managed cloud berstandar enterprise, tim pengembang Anda dapat berfokus 100% pada inovasi produk dan kepuasan pelanggan.</p>
      `,
    },
    {
      title: 'Modernisasi Sistem Monolitik: Arsitektur Microservices & API Gateway untuk Korporasi',
      slug: 'modernisasi-sistem-monolitik-microservices-api-gateway',
      summary: 'Strategi migrasi sistem warisan (legacy ERP) menggunakan Next.js fullstack, GraphQL/REST gateway terpadu, dan standar audit OWASP Top 10.',
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      featured: false,
      readTime: '8 min baca',
      tags: ['Software Engineering', 'Next.js', 'API Gateway', 'Microservices', 'Clean Architecture', 'OWASP'],
      categoryId: categoriesMap.get('wawasan-blog')!.id,
      authorId: adminUser.id,
      publishedAt: new Date('2026-08-25T11:00:00Z'),
      contentHtml: `
        <p class="lead">Banyak korporasi besar terjebak dalam dilema arsitektur: sistem perangkat lunak lama (*legacy system*) yang telah digunakan selama lebih dari satu dekade masih menyimpan proses bisnis inti, namun struktur monolitiknya yang kaku membuat pengembangan fitur baru dan integrasi aplikasi mobile menjadi sangat lambat dan berisiko tinggi.</p>

        <h2>1. Dilema Monolith: Mengapa Perlu Modernisasi?</h2>
        <p>Aplikasi monolitik warisan umumnya memiliki basis kode raksasa yang saling terikat erat (*tightly coupled*). Ketika salah satu modul kasir atau pelaporan mengalami bug, seluruh server aplikasi berisiko lumpuh. Selain itu, proses deployment membutuhkan waktu henti (*maintenance window*) yang mengganggu jam kerja normal.</p>

        <h2>2. Pola Strangler Fig: Migrasi Bertahap Tanpa Risiko</h2>
        <p>Melalui divisi <strong>Mitrasova Labs</strong>, kami tidak menyarankan penulisan ulang sistem secara frontal (*Big Bang Rewrite*) karena risiko kegagalannya yang sangat tinggi. Sebaliknya, kami menerapkan pendekatan <strong>Strangler Fig Pattern</strong>:</p>
        <ol>
          <li><strong>Pasang API Gateway di Depan Sistem Lama:</strong> Gateway bertindak sebagai proksi pintar yang meneruskan permintaan pengguna ke sistem lama atau ke modul mikroservis baru.</li>
          <li><strong>Ekstrak Modul Satu per Satu:</strong> Modul yang membutuhkan kecepatan inovasi tinggi (seperti modul absensi mobile, dashboard analytics, atau payment gateway) dibangun secara mandiri menggunakan teknologi modern Next.js dan Node.js/Go.</li>
          <li><strong>Sinkronisasi Basis Data Dua Arah:</strong> Menjaga konsistensi data antara database relasional baru PostgreSQL dan database warisan melalui event-driven message queue.</li>
        </ol>

        <h2>3. Standar Rekayasa Clean Code & SOLID Principles</h2>
        <p>Kualitas kode adalah investasi jangka panjang. Setiap aplikasi kustom yang dibangun di Mitrasova Labs mematuhi aturan baku:</p>
        <ul>
          <li><strong>Single Responsibility Principle:</strong> Setiap fungsi, hook, dan komponen React memiliki satu tanggung jawab yang terisolasi.</li>
          <li><strong>Open/Closed Principle:</strong> Komponen dirancang modular dan dapat diekstensi tanpa perlu merombak kode fondasi.</li>
          <li><strong>Explicit Typing & Zero Any:</strong> Pemanfaatan TypeScript secara ketat untuk mencegah runtime type errors di lingkungan produksi.</li>
        </ul>

        <h2>4. Keamanan Sejak Desain (Security by Design)</h2>
        <p>Sebelum diserahterimakan, setiap baris kode diuji melalui audit keamanan berlapis berdasarkan standar <strong>OWASP Top 10</strong>, mencakup mitigasi SQL Injection, Cross-Site Scripting (XSS), otentikasi token JWT berbasis rotasi, serta enkripsi end-to-end pada seluruh protokol komunikasi data.</p>
        <p>Dan yang paling penting: <strong>100% Hak Milik Intelektual (Source Code & IP Rights)</strong> sepenuhnya menjadi aset milik perusahaan klien tanpa keterikatan lisensi tersembunyi.</p>
      `,
    },
    {
      title: 'Mitrasova Digital Solutions Resmikan Pusat Layanan & Onboarding Bisnis Terpadu di Solo Raya',
      slug: 'mitrasova-resmikan-pusat-layanan-solo-raya',
      summary: 'Ekspansi strategis memperkuat pendampingan teknis langsung, pelatihan staf kasir on-site, dan dukungan arsitektur IT untuk pelaku usaha Jawa Tengah.',
      coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      featured: false,
      readTime: '4 min baca',
      tags: ['Berita Perusahaan', 'Mitrasova', 'Ekspansi Bisnis', 'Solo Raya', 'Digitalisasi UMKM'],
      categoryId: categoriesMap.get('berita-media')!.id,
      authorId: editorUser.id,
      publishedAt: new Date('2026-08-26T09:00:00Z'),
      contentHtml: `
        <p class="lead"><strong>SURAKARTA, JAWA TENGAH</strong> — Mitrasova Digital Solutions resmi mengumumkan pembukaan Pusat Layanan Teknis & Onboarding Terpadu yang berlokasi strategis di kawasan Solo Raya. Inisiatif ini dirancang khusus untuk memberikan pendampingan langsung bagi pelaku usaha ritel, manufaktur, dan korporasi di wilayah Solo Raya, Karanganyar, Boyolali, Sukoharjo, dan sekitarnya.</p>

        <h2>Mendekatkan Layanan Engineering ke Pelaku Usaha</h2>
        <p>Selama ini, banyak pelaku usaha di daerah menghadapi kendala saat mengadopsi software enterprise karena minimnya dukungan teknis langsung di lapangan. Sebagian besar penyedia aplikasi hanya menyediakan bantuan melalui email atau chat bot yang lambat.</p>
        <p><em>"Kami percaya bahwa keberhasilan digitalisasi bukan hanya soal software yang canggih, melainkan tentang bagaimana tim di lapangan dilatih, didampingi saat terjadi kendala hardware printer kasir, dan bagaimana sistem dikonfigurasi sesuai alur bisnis nyata,"</em> ujar Raihan Marwanda, Founder & Chief Architect Mitrasova.</p>

        <h2>Fasilitas & Layanan Unggulan</h2>
        <p>Pusat layanan ini menyediakan fasilitas komprehensif bagi klien:</p>
        <ul>
          <li><strong>Lab Pengujian Hardware Kasir:</strong> Pengujian kompatibilitas printer thermal Bluetooth/LAN, barcode scanner nirkabel, dan laci kasir otomatis.</li>
          <li><strong>Sesi Pelatihan Staf & Kasir Gratis:</strong> Simulasi transaksi kasir offline, pengelolaan nota retur konsinyasi, dan pelatihan admin payroll.</li>
          <li><strong>Dedicated Priority Hotline:</strong> Saluran komunikasi darurat 24 jam dengan waktu respon SLA kurang dari 15 menit.</li>
        </ul>
        <p>Bagi pelaku bisnis yang ingin menjadwalkan kunjungan on-site atau konsultasi arsitektur sistem, tim Solution Architect Mitrasova siap menyambut Anda.</p>
      `,
    },
    {
      title: 'Solo Tech Summit 2026: Workshop Akselerasi Digitalisasi Ritel & Transformasi HR Korporasi',
      slug: 'solo-tech-summit-2026-workshop-ritel-hr',
      summary: 'Sesi temu teknologi interaktif bersama Solution Architect Mitrasova membahas simulasi live sistem POS offline dan payroll otomatis.',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      featured: false,
      readTime: '5 min baca',
      eventDate: new Date('2026-09-20T09:00:00.000Z'),
      eventLocation: 'Auditorium Solo Technopark & Live Interactive Hybrid Webinar',
      tags: ['Event', 'Workshop', 'Seminar', 'Tech Meetup', 'Solo Technopark', 'Digitalisasi'],
      categoryId: categoriesMap.get('event-agenda')!.id,
      authorId: editorUser.id,
      publishedAt: new Date('2026-08-26T13:00:00Z'),
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

        <p>Acara ini diselenggarakan secara <strong>Hybrid</strong> (Tatap Muka di Solo Technopark dan Live Interactive Webinar via Zoom). Tempat terbatas untuk 150 peserta luring.</p>
      `,
    },
    {
      title: 'Catatan Rilis Mitrasova POS v2.6: Modul Rekonsiliasi Otomatis & Multi-Barcode Scanner',
      slug: 'catatan-rilis-mitrasova-pos-v26',
      summary: 'Peningkatan performa pemrosesan kasir 0ms latency, integrasi printer thermal Bluetooth berkecepatan tinggi, dan settlement faktur konsinyasi instan.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      status: PostStatus.PUBLISHED,
      featured: false,
      readTime: '5 min baca',
      tags: ['Release Notes', 'Mitrasova POS', 'Pembaruan Fitur', 'Changelog', 'Performa Kasir'],
      categoryId: categoriesMap.get('rilis-produk')!.id,
      authorId: adminUser.id,
      publishedAt: new Date('2026-08-27T07:00:00Z'),
      contentHtml: `
        <p class="lead">Kami sangat antusias merilis pembaruan besar <strong>Mitrasova POS versi 2.6 (Production Release)</strong>. Versi ini membawa berbagai penyempurnaan fitur penting yang dirancang untuk mempercepat transaksi kasir hingga 40% dan menyederhanakan rekonsiliasi konsinyasi.</p>

        <h2>Sorotan Pembaruan Fitur Utama</h2>

        <h3>1. Modul Settlement Faktur Konsinyasi 1-Klik</h3>
        <p>Kini Anda dapat menerbitkan rekap tagihan supplier konsinyasi secara instan berdasarkan periode penjualan tertentu, memotong komisi toko secara otomatis, dan mencetak lembar verifikasi retur fisik.</p>

        <h3>2. Dukungan Multi-Barcode & Batch Scanner</h3>
        <p>Memungkinkan kasir memindai barcode produk dalam mode serial berkelanjutan (*continuous batch scanning*) tanpa perlu menunggu jeda layar, sangat ideal untuk minimarket dan grosir berkecepatan tinggi.</p>

        <h3>3. Peningkatan Sinkronisasi Offline-First Engine</h3>
        <ul>
          <li>Optimasi local cache IndexedDB dengan kompresi data transaksi.</li>
          <li>Mekanisme auto-retry pintar saat jaringan seluler tidak stabil.</li>
          <li>Indikator status sync visual di pojok kanan atas layar kasir.</li>
        </ul>

        <h2>Penyempurnaan & Perbaikan Bug</h2>
        <ul>
          <li>Perbaikan kompatibilitas printer thermal ESC/POS pada perangkat Android 14+.</li>
          <li>Peningkatan akurasi pembulatan nominal transaksi pada split payment tunai + QRIS.</li>
          <li>Optimalisasi kecepatan query laporan laba rugi bulanan untuk basis data lebih dari 1 juta transaksi.</li>
        </ul>

        <p>Pembaruan ini telah tersedia secara otomatis (*over-the-air update*) untuk seluruh pengguna aktif Mitrasova POS mulai hari ini.</p>
      `,
    },
  ];

  for (const post of postsData) {
    await prisma.post.create({
      data: post,
    });
  }
  console.log(`✅ ${postsData.length} Artikel Blog & Publikasi berhasil dibuat.`);

  // 6. Seeding Consultation Inquiries
  console.log('📬 Membuat Sampel Permintaan Konsultasi...');
  const consultationsData = [
    {
      name: 'Budi Santoso',
      company: 'PT Ritel Jaya Makmur',
      email: 'budi.santoso@riteljaya.co.id',
      phone: '081234567890',
      selectedServices: ['Mitrasova POS', 'Mitrasova Daya'],
      message: 'Halo tim Mitrasova, kami memiliki 18 cabang minimarket di Solo Raya dan ingin berkonsultasi mengenai migrasi sistem POS kasir offline-first serta otomatisasi payroll PPh 21 TER untuk 120 karyawan.',
      status: ConsultationStatus.NEW,
    },
    {
      name: 'Dewi Kartika',
      company: 'CV Nusa Fashion Group',
      email: 'dewi@nusafashion.com',
      phone: '081987654321',
      selectedServices: ['Mitrasova POS'],
      message: 'Kami ingin mengintegrasikan sistem konsinyasi dengan 45 supplier fashion lokal kami agar proses pembagian komisi dan nota retur berjalan otomatis.',
      status: ConsultationStatus.CONTACTED,
    },
    {
      name: 'Hendro Wijaya',
      company: 'PT Graha Logistik Indonesia',
      email: 'hendro@grahalogistik.com',
      phone: '081345678901',
      selectedServices: ['Mitrasova Nexus', 'Mitrasova Labs'],
      message: 'Tertarik mendiskusikan arsitektur cloud high-availability dan integrasi API gateway untuk sistem ERP logistik internal kami.',
      status: ConsultationStatus.RESOLVED,
    },
  ];

  for (const cons of consultationsData) {
    await prisma.consultation.create({
      data: cons,
    });
  }
  console.log('✅ Sampel Permintaan Konsultasi berhasil dibuat.');

  console.log('🎉 SELURUH PROSES DATABASE SEEDING TELAH SELESAI DENGAN SUKSES!');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
