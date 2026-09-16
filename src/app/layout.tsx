import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CommandPalette from '@/components/ui/CommandPalette'
import { careerProfile } from '@/data/career-profile'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const siteUrl = 'https://pirun-portfolio.vercel.app'
const siteTitle = `Senior Web Developer in Bangkok | ${careerProfile.contact.name}`
const siteDescription = 'Portfolio of Pirun Kongsaeng, a Senior Web Developer in Bangkok working with WordPress, WooCommerce, Shopify, Next.js, API integrations, SEO, and performance.'

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${siteUrl}/`,
  mainEntity: {
    '@type': 'Person',
    name: careerProfile.contact.name,
    url: `${siteUrl}/`,
    jobTitle: 'Senior Web Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangkok',
      addressCountry: 'Thailand',
    },
    sameAs: [careerProfile.contact.linkedin, careerProfile.contact.github],
    knowsAbout: [
      'WordPress',
      'WooCommerce',
      'Shopify',
      'Next.js',
      'PHP',
      'JavaScript',
      'TypeScript',
      'API integration',
      'Technical SEO',
      'Web performance',
    ],
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: careerProfile.contact.name,
    images: [
      {
        url: '/images/hero/profile.webp',
        width: 3024,
        height: 4032,
        alt: 'Pirun Kongsaeng, Senior Web Developer in Bangkok',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/hero/profile.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <MotionConfig reducedMotion="user">
          <Header />
          <main>{children}</main>
          <Footer />
          <CommandPalette />
        </MotionConfig>
      </body>
    </html>
  )
}
