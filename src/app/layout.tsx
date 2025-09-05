import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Neon Architect — Full‑Stack Developer & AI Enthusiast',
  description: 'A world‑class personal portfolio built with Next.js that mirrors Linear.app’s crisp, minimal, high‑contrast aesthetic while showcasing AI‑powered projects.',
  openGraph: {
    title: 'Neon Architect — Full‑Stack Developer & AI Enthusiast',
    description: 'A world‑class personal portfolio built with Next.js that mirrors Linear.app’s crisp, minimal, high‑contrast aesthetic while showcasing AI‑powered projects.',
    url: 'https://your-domain.com',
    siteName: 'Neon Architect',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neon Architect — Full‑Stack Developer & AI Enthusiast',
    description: 'A world‑class personal portfolio built with Next.js that mirrors Linear.app’s crisp, minimal, high‑contrast aesthetic while showcasing AI‑powered projects.',
    creator: '@your_twitter_handle',
    images: ['https://your-domain.com/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased bg-background')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
