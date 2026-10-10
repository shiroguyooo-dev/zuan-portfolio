import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FX from '@/components/FX';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: `${site.owner} — Digital Tools & Store`,
  description: site.tagline,
  openGraph: {
    title: `${site.owner} — Digital Tools & Store`,
    description: site.tagline,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="bg-grain min-h-screen font-sans">
        <div className="bg-aura" />
        <FX />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
