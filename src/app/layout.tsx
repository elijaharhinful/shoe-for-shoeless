import type { Metadata, Viewport } from 'next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import { site } from '@/content/site';
import { motionBootScript } from '@/lib/motion';
import './globals.css';

// Montserrat matches the heavy geometric wordmark in the logo.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Durable shoes for every child in Ghana`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    images: [{ url: '/images/hero-poster.jpg', width: 1920, height: 1080, alt: 'Children celebrating their new shoes in class' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/brand/mark-maroon.png', apple: '/brand/mark-maroon.png' },
};

export const viewport: Viewport = {
  themeColor: '#7a1332',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The boot script sets data-motion on <html> before hydration, hence suppressHydrationWarning.
    <html lang="en" className={`${montserrat.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
