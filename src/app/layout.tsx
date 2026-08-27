import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { LanguageProvider } from '@/lib/i18n';
import { SEO_DEFAULTS, buildCanonicalUrl, buildOgImageUrl } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#060911',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(buildCanonicalUrl()),
  title: {
    default: 'Mitrasova Digital Solutions | Software House & IT Solution Indonesia',
    template: '%s | Mitrasova Digital Solutions',
  },
  description: SEO_DEFAULTS.description,
  keywords: [...SEO_DEFAULTS.keywords],
  authors: [{ name: 'Mitrasova Digital Solutions', url: buildCanonicalUrl() }],
  creator: 'Mitrasova Digital Solutions',
  publisher: 'Mitrasova Digital Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: buildCanonicalUrl(),
  },
  openGraph: {
    type: 'website',
    locale: SEO_DEFAULTS.locale,
    url: buildCanonicalUrl(),
    siteName: SEO_DEFAULTS.siteName,
    title: 'Mitrasova Digital Solutions | Software House & IT Solution Indonesia',
    description: SEO_DEFAULTS.description,
    images: [
      {
        url: buildOgImageUrl(),
        width: 1200,
        height: 630,
        alt: 'Mitrasova Digital Solutions — Enterprise Tech Ecosystem',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mitrasova Digital Solutions | Software House & IT Solution Indonesia',
    description: SEO_DEFAULTS.description,
    site: SEO_DEFAULTS.twitterHandle,
    creator: SEO_DEFAULTS.twitterHandle,
    images: [buildOgImageUrl()],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'technology',
  verification: {
    // Update these when you have actual Search Console verification codes
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="min-h-[100dvh] flex flex-col bg-[#060911] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <QueryProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
