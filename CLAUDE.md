# Mitrasova Digital Solutions — AI Agent Coding Guidelines

## Philosophy

> Prioritaskan **efektifitas**, **kecepatan**, **responsifitas**, dan **kenyamanan pengguna** di setiap keputusan arsitektur, desain UI, dan penulisan kode. Setiap baris code harus memberikan value — tidak ada code yang ditulis "sekedar jalan".

---

## 1. Package Manager & Runtime — Bun Only

- **WAJIB gunakan `bun`** untuk semua operasi. JANGAN pernah gunakan `npm`, `yarn`, atau `pnpm`.
  - Development: `bun dev`
  - Build: `bun run build`
  - Linting: `bun run lint`
  - Type Check: `bun x tsc --noEmit`
  - CLI Tools: `bun x <tool>`
  - Install: `bun add <package>` / `bun add -d <package>`
  - Scripts: `bun run <script>`

---

## 2. SOLID Principles

- **Single Responsibility (SRP)**: Satu file/component/hook = satu tanggung jawab. Tidak ada file yang melakukan lebih dari satu concern.
- **Open/Closed (OCP)**: Bangun component yang extensible via props composition dan wrapper pattern, bukan modifikasi langsung.
- **Liskov Substitution (LSP)**: Setiap component yang mengimplemen interface tertentu harus bisa saling menggantikan tanpa breaking behavior.
- **Interface Segregation (ISP)**: Props dan type interface harus kecil dan spesifik. Jangan buat satu interface raksasa untuk semua kebutuhan.
- **Dependency Inversion (DIP)**: Pisahkan UI dari data layer. Gunakan custom hooks untuk data fetching, Zustand/context untuk state management.

---

## 3. DRY Code — Don't Repeat Yourself

- Identifikasi pattern yang berulang dan abstraksi ke shared component/hook/utility.
- Gunakan `src/components/ui/` untuk UI primitives (Button, Input, Dialog, dll).
- Gunakan `src/components/shared/` untuk composed component yang reusable lintas feature.
- Gunakan `src/lib/utils.ts` untuk utility functions umum.
- Jika ada logic yang muncul di 2+ tempat, **wajib** di-extract ke custom hook atau utility.

---

## 4. Atomic Component Architecture

- **Atoms**: Elemen UI terkecil — Button, Input, Badge, Label (`src/components/ui/`).
- **Molecules**: Gabungan atoms — SearchInput, FormField, StatusBadge (`src/components/shared/`).
- **Organisms**: Section/block UI kompleks — DataTable, FormSection, Sidebar (`src/components/shared/` atau `src/features/<feature>/components/`).
- **Templates/Pages**: Layout dan page composition (`src/app/` routes).

**Rules**:
- Setiap component harus fokus dan kecil (max ~120 baris, idealnya <80 baris).
- DILARANG KERAS membuat God Component (component monolitik ratusan baris).
- Extract logic berat ke custom hooks (`hooks/use-*.ts`).

---

## 5. Clean Code Standards

### Naming Convention
- **Components**: `PascalCase` — `ProductCard.tsx`, `OrderSummary.tsx`
- **Hooks**: `camelCase` dengan prefix `use` — `useProducts.ts`, `useOrderForm.ts`
- **Utilities**: `camelCase` — `formatCurrency.ts`, `parseDate.ts`
- **Types**: `PascalCase` — `Product`, `OrderItem`, `ApiResponse<T>`
- **Constants**: `UPPER_SNAKE_CASE` — `MAX_RETRY_COUNT`, `API_ENDPOINTS`
- **Files**: `kebab-case` — `product-card.tsx`, `use-products.ts`

### Code Quality
- **ZERO unused variables/imports** — hapus semua yang tidak dipakai.
- **ZERO `any` type** — selalu gunakan type yang eksplisit dan spesifik.
- **ZERO magic numbers/strings** — pindahkan ke constants file.
- **ZERO console.log di production code** — gunakan proper error handling.
- **ZERO inline styles** — gunakan Tailwind classes atau CSS modules.
- Setiap function/hook harus memiliki return type yang eksplisit.
- Hindari nested ternary yang dalam — gunakan early return atau komponen terpisah.
- Gunakan optional chaining (`?.`) dan nullish coalescing (`??`) dengan tepat.

---

## 6. Folder Structure — Konsisten & Tidak Berubah

```
src/
├── app/                          # Next.js App Router pages & layouts
│   ├── (auth)/                   # Auth route group
│   ├── (dashboard)/              # Dashboard route group
│   ├── api/                      # API routes
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Atomic UI primitives (shadcn/radix based)
│   └── shared/                   # Reusable composed components
├── features/
│   └── <feature-name>/
│       ├── api/                  # API calls, server actions, React Query hooks
│       ├── components/           # Feature-specific UI components
│       ├── hooks/                # Feature-specific custom hooks
│       ├── schemas/              # Zod validation schemas
│       ├── types/                # TypeScript type definitions
│       └── constants/            # Feature-specific constants
├── lib/                          # Core utilities, configs, helpers
│   ├── utils.ts                  # General utility functions
│   ├── prisma.ts                 # Prisma client instance
│   └── constants.ts              # Global constants
├── types/                        # Global shared type definitions
└── hooks/                        # Global shared hooks (jika ada)
```

**ATURAN KETAT**:
- Struktur folder ini TIDAK BOLEH diubah atau dimodifikasi tanpa persetujuan eksplisit.
- Setiap feature baru HARUS mengikuti pattern yang sama persis.
- Jangan buat folder baru di luar struktur yang sudah ada.
- File baru harus ditempatkan di lokasi yang sesuai dengan responsibility-nya.

---

## 7. Styling & Typography — Human-Crafted, Bukan AI-Generated

### Design Philosophy
- **JANGAN** buat UI yang terlihat seperti buatan AI/template generik.
- **WAJIB** cari referensi desain dari sumber berikut sebelum membuat UI:
  - Dribbble, Behance, Awwwards untuk inspirasi visual
  - SaaS products top-tier (Linear, Vercel, Stripe, Notion, Raycast) untuk pattern UX
  - Tailwind UI, shadcn/ui untuk component best practices
- Pastikan setiap halaman memiliki visual hierarchy yang jelas dan purposeful.

### Typography
- Gunakan font system yang sudah dikonfigurasi di project (Inter/Geist/dll).
- Implementasikan type scale yang konsisten — jangan random font sizes.
- Gunakan font weight yang bervariasi untuk hierarchy (400, 500, 600, 700).
- Line-height dan letter-spacing harus nyaman dibaca — bukan default browser.
- Text harus memiliki kontras yang cukup (WCAG AA minimum).

### Visual Standards
- Color palette harus harmonious dan purposeful — bukan warna primer mentah.
- Gunakan subtle shadows, rounded corners, dan spacing yang konsisten.
- Micro-animations dan transitions untuk feedback interaksi (hover, focus, loading).
- Dark mode support jika project menggunakannya.
- Whitespace yang generous — jangan buat UI yang sesak.
- Icon harus konsisten dari satu library (Lucide Icons).

### Responsive & Performance
- Mobile-first approach — desain untuk mobile, lalu enhance ke desktop.
- Semua halaman WAJIB responsive di mobile (<640px), tablet (640-1024px), desktop (>1024px).
- Gunakan `100dvh` bukan `100vh` untuk full-height container.
- Wrap wide content dengan `overflow-x-auto`.
- Touch-friendly hit targets (minimum 36-44px).

---

## 8. Bug Prevention & Code Safety

### Pre-Commit Checklist
Sebelum menyatakan task selesai, WAJIB jalankan:
1. `bun x tsc --noEmit` — zero type errors
2. `bun run lint` — zero lint warnings/errors
3. `bun run build` — memastikan build berhasil (untuk perubahan besar)

### Defensive Coding
- Selalu handle error states — jangan biarkan error uncaught.
- Gunakan try-catch di async operations dengan error yang informatif.
- Validasi semua input menggunakan Zod schemas sebelum dikirim ke server.
- Implement proper loading states, empty states, dan error boundaries.
- Gunakan TypeScript strict mode — jangan abaikan type errors.

### Edge Cases
- Handle null/undefined values secara eksplisit.
- Pertimbangkan empty arrays, empty strings, dan boundary values.
- Test responsive behavior di berbagai viewport sizes.
- Pastikan semua interactive elements memiliki feedback visual (hover, active, focus, disabled).

### Security
- JANGAN expose sensitive data di client-side code.
- Sanitize semua user input sebelum render.
- Gunakan server actions/API routes untuk operasi sensitif.
- Validasi data di server-side, bukan hanya client-side.

---

## 9. Library Usage Policy

- **DIPERBOLEHKAN** menggunakan third-party library jika memenuhi kriteria:
  - ✅ Lebih efisien dari implementasi manual (hemat waktu development signifikan)
  - ✅ Bundle size yang ringan (prefer tree-shakeable library)
  - ✅ Well-maintained — update terakhir dalam 6 bulan, minimal 1k+ GitHub stars
  - ✅ Tidak menambah kompleksitas yang tidak perlu
  - ✅ Kompatibel dengan Next.js App Router dan React Server Components

- **DILARANG** menggunakan library jika:
  - ❌ Fungsinya bisa dicapai dengan <30 baris code manual
  - ❌ Bundle size terlalu besar untuk fungsionalitas yang dibutuhkan
  - ❌ Tidak aktif di-maintain atau memiliki banyak unresolved issues
  - ❌ Memperkenalkan pattern yang konflik dengan arsitektur project

- **Wajib informasikan** ke user sebelum menambah library baru — jelaskan alasan, alternatif, dan trade-off.

---

## 10. Research Before Execution

- **WAJIB** melakukan riset sebelum memulai implementasi fitur baru:
  - Cari best practices dan pattern yang sudah proven di production.
  - Periksa apakah ada solusi existing di codebase yang bisa di-reuse.
  - Bandingkan approach yang berbeda dan pilih yang paling efektif.
  - Pertimbangkan implikasi performance, maintainability, dan UX.
- Jangan langsung koding — pahami dulu requirements secara menyeluruh.
- Untuk UI/UX, cari referensi visual dari produk-produk terkemuka sebelum implementasi.

---

## 11. Performance & User Experience

- **First Contentful Paint** harus cepat — gunakan React Server Components dimana memungkinkan.
- Lazy load component yang berat menggunakan `dynamic()` dari Next.js.
- Optimasi gambar dengan `next/image`.
- Implement skeleton loading states yang informatif, bukan hanya spinner.
- Debounce search input dan expensive computations.
- Memoize computed values yang berat dengan `useMemo` hanya jika terbukti diperlukan.
- Form submissions harus memberikan immediate feedback (optimistic updates jika sesuai).
