import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AdSenseScript from '@/components/AdSenseScript'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Meureno Travel Guide — Panduan Wisata Aceh',
    template: '%s | Meureno Travel Guide',
  },
  description:
    'Temukan destinasi wisata, kuliner, penginapan, dan aktivitas terbaik di seluruh pelosok Aceh. Panduan perjalanan lokal terlengkap untuk Tanah Rencong.',
  keywords: ['wisata aceh', 'travel aceh', 'destinasi aceh', 'kuliner aceh', 'pantai aceh', 'kopi gayo'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://meureno.com',
    siteName: 'Meureno Travel Guide',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <AdSenseScript />
      </head>
      <body className="bg-aceh-cream font-body text-gray-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
