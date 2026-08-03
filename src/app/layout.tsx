import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Mitrasova Digital Solutions | Enterprise Tech Ecosystem',
  description: 'Penyedia Perangkat Lunak Enterprise: Mitrasova POS, Mitrasova Daya (HRIS), Mitrasova Nexus (Cloud), & Mitrasova Labs (Web Dev).',
  keywords: ['Mitrasova', 'POS Kasir Pintar', 'HRIS Payroll', 'Cloud Server Hosting', 'Custom Web Development', 'Enterprise Tech'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <QueryProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
