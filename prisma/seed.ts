import { PrismaClient, Role, PostStatus, ConsultationStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create or Update Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mitrasova.com' },
    update: {
      name: 'Admin Mitrasova',
      role: Role.ADMIN,
      passwordHash: 'admin123',
    },
    create: {
      email: 'admin@mitrasova.com',
      name: 'Admin Mitrasova',
      passwordHash: 'admin123',
      role: Role.ADMIN,
    },
  });

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@mitrasova.com' },
    update: {
      name: 'Editor Content',
      role: Role.EDITOR,
      passwordHash: 'editor123',
    },
    create: {
      email: 'editor@mitrasova.com',
      name: 'Editor Content',
      passwordHash: 'editor123',
      role: Role.EDITOR,
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@mitrasova.com' },
    update: {
      name: 'Demo User',
      role: Role.EDITOR,
      passwordHash: 'demo123',
    },
    create: {
      email: 'demo@mitrasova.com',
      name: 'Demo User',
      passwordHash: 'demo123',
      role: Role.EDITOR,
    },
  });

  console.log('✅ Users seeded:');
  console.log('   - Admin :', adminUser.email);
  console.log('   - Editor:', editorUser.email);
  console.log('   - Demo  :', demoUser.email);

  // 2. Create Master Categories
  const categoriesData = [
    {
      name: 'Tutorial',
      slug: 'tutorial',
      description: 'Panduan langkah demi langkah penggunaan produk Mitrasova.',
      order: 1,
    },
    {
      name: 'Dokumentasi',
      slug: 'dokumentasi',
      description: 'Dokumentasi teknis dan integrasi API.',
      order: 2,
    },
    {
      name: 'Release Notes',
      slug: 'release-notes',
      description: 'Pembaruan sistem, fitur baru, dan perbaikan bug.',
      order: 3,
    },
    {
      name: 'Guide',
      slug: 'guide',
      description: 'Panduan praktis dan best practices pengembangan bisnis.',
      order: 4,
    },
    {
      name: 'Pengumuman',
      slug: 'pengumuman',
      description: 'Informasi dan pengumuman resmi dari Mitrasova Digital Solutions.',
      order: 5,
    },
  ];

  const categoriesMap = new Map();
  for (const catData of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: catData,
      create: catData,
    });
    categoriesMap.set(category.slug, category);
  }
  console.log('✅ Master categories seeded');

  // 3. Create Services
  const servicesData = [
    {
      title: 'Mitrasova POS',
      slug: 'mitrasova-pos',
      heroTagline: 'Sistem Kasir & Operasional Ritel Modern',
      summary: 'Solusi Point of Sale terlengkap untuk manajemen toko ritel, minimarket, dan franchise.',
      description:
        'Mitrasova POS membantu Anda mengelola transaksi penjualan, stok inventaris multi-gudang, laporan keuangan otomatis, dan integrasi pembayaran QRIS secara real-time.',
      icon: 'ShoppingCart',
      category: 'SaaS',
      features: [
        'Manajemen Stok & Inventaris Multi-Gudang',
        'Laporan Keuangan & Laba Rugi Otomatis',
        'Integrasi Pembayaran QRIS & E-Wallet Instant',
        'Manajemen Kasir & Multi-Shift Terintegrasi',
        'Program Loyalitas & Diskon Pelanggan',
      ],
      faqs: [
        {
          q: 'Apakah Mitrasova POS mendukung offline mode?',
          a: 'Ya, transaksi tetap dapat dilakukan saat koneksi internet terputus dan otomatis disinkronkan kembali ketika koneksi pulih.',
        },
        {
          q: 'Berapa banyak cabang yang dapat dikelola?',
          a: 'Tidak ada batasan jumlah cabang. Anda dapat mengontrol seluruh cabang toko dari satu dashboard pusat.',
        },
      ],
      isActive: true,
      order: 1,
    },
    {
      title: 'Mitrasova Daya',
      slug: 'mitrasova-daya',
      heroTagline: 'Platform HRIS & Manajemen SDM Perusahaan',
      summary: 'Sistem terpadu untuk penggajian (payroll), absensi GPS, klaim, dan performa karyawan.',
      description:
        'Optimalisasi produktivitas tim Anda dengan sistem HRIS pintar berbasis cloud. Kelola absensi selfie GPS, kalkulasi PPh 21 TER, dan klaim medis secara transparan.',
      icon: 'Users',
      category: 'SaaS',
      features: [
        'Absensi Selfie & GPS Geofencing Mobile',
        'Kalkulasi Payroll & PPh 21 TER Otomatis',
        'Manajemen Cuti, Izin, & Reimbursement',
        'Key Performance Indicator (KPI) Tracking',
      ],
      faqs: [
        {
          q: 'Apakah PPh 21 dan BPJS dihitung otomatis?',
          a: 'Ya, kalkulasi PPh 21 aturan TER terbaru dan BPJS Kesehatan/Ketenagakerjaan dihitung otomatis dalam sistem payroll.',
        },
      ],
      isActive: true,
      order: 2,
    },
    {
      title: 'Mitrasova Nexus',
      slug: 'mitrasova-nexus',
      heroTagline: 'Infrastruktur Cloud & API Gateway Terintegrasi',
      summary: 'Hub konektivitas antar sistem bisnis Anda dengan performa & keandalan tinggi.',
      description:
        'Hubungkan berbagai aplikasi internal, sistem pembayaran bank, dan marketplace e-commerce dalam satu arsitektur terpusat yang aman dan terukur.',
      icon: 'Server',
      category: 'Infrastructure',
      features: [
        'API Gateway & Webhook Router High Performance',
        'High-Availability Load Balancing & Auto-scaling',
        'Realtime Data Sync Across Systems',
        'Automated Database Backup & Failover',
      ],
      isActive: true,
      order: 3,
    },
    {
      title: 'Mitrasova Labs',
      slug: 'mitrasova-labs',
      heroTagline: 'Layanan Custom Software & AI Engineering',
      summary: 'Pengembangan solusi perangkat lunak khusus dan otomatisasi AI untuk skala Enterprise.',
      description:
        'Kami merancang dan merakit sistem perangkat lunak kustom yang disesuaikan dengan kebutuhan unik proses bisnis Anda, dipadukan dengan solusi kecerdasan buatan (AI).',
      icon: 'Cpu',
      category: 'Custom Engineering',
      features: [
        'Custom Web & Mobile Application Development',
        'Enterprise AI & Large Language Model (LLM) Integration',
        'System Architecture Consulting & Security Audit',
        'Dedicated Tech Support & Service Level Agreement (SLA)',
      ],
      isActive: true,
      order: 4,
    },
  ];

  const servicesMap = new Map();
  for (const srvData of servicesData) {
    const service = await prisma.service.upsert({
      where: { slug: srvData.slug },
      update: srvData,
      create: srvData,
    });
    servicesMap.set(service.slug, service);
  }
  console.log('✅ Services seeded');

  // 4. Create Sample Posts
  const postsData = [
    {
      title: 'Panduan Memulai Mitrasova POS untuk Toko Ritel',
      slug: 'panduan-memulai-mitrasova-pos',
      summary: 'Langkah awal mengatur produk, kategori, stok awal, dan melakukan transaksi kasir pertama Anda.',
      contentHtml: `
        <h2>1. Pengaturan Produk & Stok Awal</h2>
        <p>Sebelum memulai transaksi, masuk ke menu <strong>Produk > Tambah Produk</strong>. Masukkan nama barang, SKU, harga beli, harga jual, dan jumlah stok awal.</p>
        <h2>2. Membuka Shift Kasir</h2>
        <p>Buka halaman Kasir dan klik <strong>Buka Shift</strong>. Masukkan jumlah modal kas awal di laci kasir Anda.</p>
        <h2>3. Melakukan Transaksi Pertama</h2>
        <p>Pilih produk dengan mengklik atau memindai barcode. Pilih metode pembayaran (Tunai, QRIS, atau Kartu) dan selesaikan transaksi untuk mencetak struk.</p>
      `,
      status: PostStatus.PUBLISHED,
      serviceId: servicesMap.get('mitrasova-pos')?.id,
      categoryId: categoriesMap.get('tutorial')?.id!,
      authorId: adminUser.id,
    },
    {
      title: 'Update Sistem v2.4: Fitur Integrasi Pembayaran QRIS Instant',
      slug: 'update-v24-qris-instant',
      summary: 'Rilis fitur baru integrasi pembayaran QRIS dinamis dengan verifikasi otomatis dalam kurun waktu kurang dari 2 detik.',
      contentHtml: `
        <h2>Pembaruan Fitur Terbaru (v2.4)</h2>
        <p>Kami bangga mengumumkan rilis versi 2.4 untuk Mitrasova POS. Pembaruan ini mencakup:</p>
        <ul>
          <li><strong>QRIS Dinamis:</strong> QRIS otomatis tercetak dengan nominal persis sesuai total belanjaan.</li>
          <li><strong>Notifikasi Sukses Realtime:</strong> Layar kasir akan otomatis terverifikasi tanpa perlu konfirmasi manual.</li>
          <li><strong>Laporan Rekonsiliasi Otomatis:</strong> Dana masuk tercatat otomatis di laporan harian.</li>
        </ul>
      `,
      status: PostStatus.PUBLISHED,
      serviceId: servicesMap.get('mitrasova-pos')?.id,
      categoryId: categoriesMap.get('release-notes')?.id!,
      authorId: adminUser.id,
    },
    {
      title: 'Cara Menghitung Payroll & PPh 21 Otomatis di Mitrasova Daya',
      slug: 'cara-menghitung-payroll-pph21-mitrasova-daya',
      summary: 'Panduan setting skema kalkulasi PPh 21 TER 2024 dan pemotongan BPJS Kesehatan & Ketenagakerjaan.',
      contentHtml: `
        <h2>Panduan Pengaturan Payroll</h2>
        <p>Mitrasova Daya mendukung kalkulasi PPh 21 sesuai aturan Tarif Efektif Rata-Rata (TER) terbaru yang berlaku.</p>
        <h2>Langkah-langkah:</h2>
        <ol>
          <li>Masuk ke menu <strong>Pengaturan > Komponen Gaji</strong>.</li>
          <li>Atur gaji pokok, tunjangan tetap, dan status PTKP masing-masing karyawan.</li>
          <li>Klik <strong>Hitung Gaji Bulanan</strong> untuk membuat slip gaji otomatis.</li>
        </ol>
      `,
      status: PostStatus.PUBLISHED,
      serviceId: servicesMap.get('mitrasova-daya')?.id,
      categoryId: categoriesMap.get('tutorial')?.id!,
      authorId: adminUser.id,
    },
    {
      title: 'Strategi Meningkatkan Efisiensi Operasional Toko Ritel 2026',
      slug: 'strategi-efisiensi-operasional-toko-ritel',
      summary: 'Kiat praktis mengoptimalkan turnover inventaris dan mengurangi risiko kehilangan stok.',
      contentHtml: `
        <h2>Mengapa Efisiensi Operasional Penting?</h2>
        <p>Dalam bisnis ritel modern, pengelolaan persediaan barang (inventory turnover) merupakan kunci utama kestabilan arus kas (cash flow).</p>
        <h2>Tips Utama:</h2>
        <ul>
          <li>Gunakan sistem POS terintegrasi real-time.</li>
          <li>Lakukan Stock Opname berkala menggunakan barcode scanner.</li>
          <li>Analisis produk Fast-Moving vs Slow-Moving secara rutin.</li>
        </ul>
      `,
      status: PostStatus.PUBLISHED,
      serviceId: servicesMap.get('mitrasova-pos')?.id,
      categoryId: categoriesMap.get('guide')?.id!,
      authorId: adminUser.id,
    },
  ];

  for (const postData of postsData) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: postData,
      create: postData,
    });
  }
  console.log('✅ Sample posts seeded');

  // 5. Create Sample Consultation Inquiries
  const sampleConsultations = [
    {
      name: 'Budi Santoso',
      company: 'PT Ritel Jaya Utama',
      email: 'budi@riteljaya.co.id',
      phone: '081234567890',
      selectedServices: ['Mitrasova POS', 'Mitrasova Daya'],
      message:
        'Halo tim Mitrasova, kami memiliki 15 cabang toko ritel dan ingin berkonsultasi mengenai migrasi sistem POS serta integrasi payroll karyawan.',
      status: ConsultationStatus.NEW,
    },
    {
      name: 'Siti Rahmawati',
      company: 'CV Daya Nusantara',
      email: 'siti@dayanusa.com',
      phone: '081987654321',
      selectedServices: ['Mitrasova Labs'],
      message:
        'Saya tertarik dengan layanan Custom AI Engineering untuk otomatisasi pemrosesan dokumen invoice perusahaan kami.',
      status: ConsultationStatus.CONTACTED,
    },
  ];

  for (const cons of sampleConsultations) {
    const existing = await prisma.consultation.findFirst({
      where: { email: cons.email, name: cons.name },
    });

    if (!existing) {
      await prisma.consultation.create({ data: cons });
    }
  }
  console.log('✅ Sample consultations seeded');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
