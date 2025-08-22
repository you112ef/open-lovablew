import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Lovable - AI Code Generator",
  description: "AI-powered code generation platform with sandbox environments and web scraping capabilities. Create, edit, and deploy applications with advanced AI assistance.",
  keywords: ["AI", "code generation", "sandbox", "web scraping", "PWA", "development", "automation"],
  authors: [{ name: "Open Lovable Team" }],
  creator: "Open Lovable",
  publisher: "Open Lovable",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://open-lovable.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Open Lovable - AI Code Generator",
    description: "AI-powered code generation platform with sandbox environments and web scraping capabilities",
    url: 'https://open-lovable.vercel.app',
    siteName: 'Open Lovable',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Open Lovable Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Open Lovable - AI Code Generator",
    description: "AI-powered code generation platform with sandbox environments and web scraping capabilities",
    images: ['/icons/icon-512x512.png'],
  },
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons/icon-152x152.png',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Open Lovable',
    startupImage: [
      {
        url: '/icons/icon-512x512.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Open Lovable',
    'application-name': 'Open Lovable',
    'msapplication-TileColor': '#36322F',
    'msapplication-TileImage': '/icons/icon-144x144.png',
    'theme-color': '#36322F',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#36322F" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
