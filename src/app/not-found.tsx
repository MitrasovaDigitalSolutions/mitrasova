import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan (404)',
  description: 'Halaman yang Anda cari tidak tersedia. Kembali ke beranda Mitrasova Digital Solutions.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium tracking-widest uppercase text-cyan-400 mb-4">
        Error 404
      </p>
      <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-white mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        Silakan kembali ke beranda.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        ← Kembali ke Beranda
      </Link>
    </div>
  );
}
