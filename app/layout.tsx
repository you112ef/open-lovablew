import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lovable - بناء التطبيقات بالذكاء الاصطناعي',
  description: 'أنشئ تطبيقات ويب وتطبيقات جوال باستخدام الذكاء الاصطناعي. تحدث مع AI وابن تطبيقك خطوة بخطوة.',
  keywords: 'AI, تطبيقات, برمجة, React, Next.js, تطوير الويب',
  authors: [{ name: 'Lovable Team' }],
  creator: 'Lovable',
  publisher: 'Lovable',
  robots: 'index, follow',
  openGraph: {
    title: 'Lovable - بناء التطبيقات بالذكاء الاصطناعي',
    description: 'أنشئ تطبيقات ويب وتطبيقات جوال باستخدام الذكاء الاصطناعي',
    type: 'website',
    locale: 'ar_AR',
    siteName: 'Lovable',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lovable - بناء التطبيقات بالذكاء الاصطناعي',
    description: 'أنشئ تطبيقات ويب وتطبيقات جوال باستخدام الذكاء الاصطناعي',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2C2C40',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#2C2C40" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
