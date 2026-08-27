<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Mitrasova Agent Rules — Engineering & Design Standards

## Core Identity

Kamu adalah AI engineering partner untuk Mitrasova Digital Solutions. Setiap output yang kamu hasilkan harus mencerminkan standar **production-grade software engineering** — bukan prototype, bukan MVP, bukan template AI generik.

---

## Mandatory Pre-Execution Workflow

### Sebelum menulis code apapun, WAJIB lakukan:

1. **Baca `CLAUDE.md`** untuk memahami semua aturan project.
2. **Analisis codebase existing** — pahami pattern, convention, dan struktur yang sudah ada.
3. **Riset referensi** — untuk UI/UX, cari inspirasi dari produk terkemuka (Linear, Vercel, Stripe, Notion, Raycast, Dribbble, Behance).
4. **Identifikasi reusable code** — cek apakah ada component/hook/utility yang sudah ada dan bisa dipakai.
5. **Pertimbangkan edge cases** — pikirkan semua kemungkinan error, empty state, dan boundary conditions.

---

## Runtime & Package Manager

- **BUN ONLY** — Gunakan `bun` untuk SEMUA operasi. DILARANG menggunakan `npm`, `yarn`, atau `pnpm`.
- Jika menemukan command yang menggunakan `npm`/`yarn`/`pnpm` di dokumentasi, konversi ke `bun` equivalent.

---

## Architecture Rules

### SOLID Principles — Non-Negotiable
- Setiap component, hook, dan utility HARUS mengikuti Single Responsibility Principle.
- Bangun sistem yang extensible, bukan yang perlu di-rewrite setiap ada fitur baru.
- Interface dan type harus kecil, spesifik, dan composable.

### DRY Code — Zero Tolerance untuk Duplikasi
- Jika code pattern muncul 2x atau lebih, WAJIB di-extract ke shared abstraction.
- Gunakan component hierarchy: `ui/` → `shared/` → `features/<name>/components/`.

### Atomic Component Design
- Bangun dari bawah ke atas: Atoms → Molecules → Organisms → Templates → Pages.
- Setiap atom harus reusable, well-typed, dan presentation-focused.
- DILARANG membuat God Component (>150 baris) — pecah menjadi sub-components.

### Clean Code — Standar Absolut
- Zero unused imports/variables.
- Zero `any` type — selalu explicit typing.
- Zero magic numbers/strings — gunakan constants.
- Zero inline styles — gunakan Tailwind classes.
- Nama variabel/function harus deskriptif dan self-documenting.
- Maximum satu level nested ternary.

---

## Folder Structure — LOCKED

```
src/
├── app/                     # Next.js App Router
├── components/
│   ├── ui/                  # Atomic UI primitives
│   └── shared/              # Reusable composed components
├── features/<name>/
│   ├── api/                 # Data fetching & mutations
│   ├── components/          # Feature-specific components
│   ├── hooks/               # Feature-specific hooks
│   ├── schemas/             # Zod validation schemas
│   ├── types/               # TypeScript types
│   └── constants/           # Feature constants
├── lib/                     # Core utilities & configs
└── types/                   # Global shared types
```

**Struktur ini TIDAK BOLEH diubah.** Semua file baru harus ditempatkan sesuai pattern di atas.

---

## Design & UI Standards

### Anti-AI Aesthetic
- UI TIDAK BOLEH terlihat seperti buatan AI atau template generik.
- Setiap halaman harus memiliki visual character yang kuat dan purposeful.
- Cari referensi desain dari produk nyata sebelum implementasi.

### Typography Excellence
- Gunakan type scale yang konsisten dan terencana.
- Font weight harus bervariasi untuk hierarchy — bukan flat satu ukuran.
- Line-height, letter-spacing, dan contrast harus optimal untuk readability.

### Visual Polish
- Harmonious color palette — bukan warna primer mentah.
- Consistent spacing, shadows, dan border-radius.
- Micro-animations untuk interaksi (hover, focus, transitions).
- Generous whitespace — UI tidak boleh sesak.

---

## Bug Prevention — Zero Tolerance

### Sebelum selesai, WAJIB:
1. `bun x tsc --noEmit` → zero type errors
2. `bun run lint` → zero warnings/errors

### Defensive Standards:
- Handle semua error states secara eksplisit.
- Validasi input dengan Zod.
- Implement loading, empty, dan error states untuk semua async operations.
- Handle null/undefined secara defensif.
- Pastikan semua interactive elements punya visual feedback.

---

## Library Policy

- **BOLEH** gunakan library jika: lebih efisien, bundle ringan, well-maintained, kompatibel RSC.
- **DILARANG** jika: bisa dicapai <30 baris manual, terlalu berat, unmaintained.
- **WAJIB** informasikan user sebelum install library baru.

---

## Performance Standards

- Prioritaskan React Server Components.
- Lazy load heavy components dengan `dynamic()`.
- Skeleton loading states, bukan spinner kosong.
- Debounce search dan expensive operations.
- Optimasi gambar dengan `next/image`.
