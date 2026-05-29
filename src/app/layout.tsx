import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Pirun Kongsaeng | Web Developer',
  description: 'Web Developer with 5+ years building fast, SEO-optimised WordPress and frontend sites for clients in Thailand, Australia, and the UK.',
  openGraph: {
    title: 'Pirun Kongsaeng | Web Developer',
    description: 'Web Developer — WordPress, WooCommerce, React, Next.js. Based in Bangkok.',
    images: ['/image/IMG_4277.webp'],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>
      <body className="bg-bg text-text">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
