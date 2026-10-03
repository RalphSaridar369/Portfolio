import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-bricolage' });
const instrument = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-instrument' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Ralph Saridar · Freelance full-stack developer',
  description: 'Web and mobile products, built end to end. Freelance full-stack developer working remotely from Awkar, Lebanon.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
