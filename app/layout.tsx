import type { Metadata, Viewport } from 'next';
import { I18nProvider } from '@/lib/i18n';
import { BRAND_SLOGAN_PRIMARY } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

/* 根布局默认 Meta（英文，可被子页面覆盖） */
export const metadata: Metadata = {
  title: {
    default: 'Arxhe Associates | Alternative Land Assets · Composite Real Estate Investment Platform',
    template: '%s | Arxhe Associates',
  },
  description:
    'Arxhe Associates, a division of P&E Family Office, specializes in alternative Victorian land asset operations.',
  keywords: [
    'Australian alternative land investment', 'Victorian land banking',
    'Arxhe Associates', 'P&E Family Office',
  ],
  openGraph: {
    title: 'Arxhe Associates',
    description: BRAND_SLOGAN_PRIMARY,
    type: 'website',
    locale: 'en_US',
    siteName: 'Arxhe Associates',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * 根布局 — I18nProvider 包裹全局导航 + 页脚
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
