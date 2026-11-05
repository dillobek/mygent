import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import { SITE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  applicationName: 'Mygent',
  keywords: [
    'AI agent',
    'AI agent O‘zbekiston',
    'sun’iy intellekt yordamchi',
    'shifokorlar uchun AI',
    'buxgalter uchun AI',
    'targetolog uchun AI',
    'marketing agentligi AI',
    'Telegram bot AI',
    'Instagram avtomatlashtirish',
    'MedAgent',
    'Mygent',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Mygent',
    title: SITE.title,
    description: SITE.description,
    locale: 'uz_UZ',
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F8FF' },
    { media: '(prefers-color-scheme: dark)', color: '#040D22' },
  ],
};

// Sahifa chizilishidan oldin mavzuni qo'yadi (oq/qora "miltillash" bo'lmasligi uchun)
const themeScript = `(function(){try{var t=localStorage.getItem('mg_theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
