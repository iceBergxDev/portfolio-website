# Portfolio Next.js Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate static HTML portfolio to Next.js 15 + TypeScript + Tailwind v3, dark theme with amber accent, 3-stage works architecture, contact form via Resend API.

**Architecture:** Next.js 15 App Router with SSG, all project data in TypeScript files (no DB/CMS), shared `Project` type across all pages, contact form via serverless Route Handler calling Resend SDK.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3.4, Framer Motion (enter-only), Resend API, Vercel

---

## File Map

```
(run create-next-app in current repo dir)

src/
├── types/
│   └── project.ts              ← Project + CaseStudy interfaces
├── data/
│   ├── featured-work.ts        ← 3 homepage featured cards
│   ├── all-projects.ts         ← all projects (grows over time)
│   └── case-studies.ts         ← full data for 7 case study pages
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PageTransition.tsx      ← Framer Motion enter-only
│   ├── ProjectCard.tsx         ← shared: homepage + /projects
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsMarquee.tsx       ← 1-row CSS loop, no interaction
│   ├── FeaturedWorkSection.tsx
│   └── ContactForm.tsx         ← client component
└── app/
    ├── globals.css             ← dark tokens + marquee keyframes
    ├── layout.tsx              ← RootLayout
    ├── page.tsx                ← Homepage
    ├── projects/
    │   └── page.tsx
    ├── case-study/
    │   └── [slug]/
    │       └── page.tsx
    └── api/
        └── contact/
            └── route.ts

public/
├── image/                      ← copy from existing
│   └── projects/               ← copy from existing
└── Resume-Pirun-Kongsaeng.pdf  ← copy from existing
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts` (via create-next-app)

- [ ] **Step 1: Run create-next-app in current directory**

```bash
cd "/Users/iceberg/Project/portfolio 2"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

When prompted — all defaults. Answer `Yes` if asked to proceed in non-empty directory.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion resend
```

- [ ] **Step 3: Verify Tailwind version is v3**

```bash
npm list tailwindcss
```

Expected output contains: `tailwindcss@3.x.x`

If v4 installed, downgrade:
```bash
npm install tailwindcss@3.4.17 @tailwindcss/postcss@latest
```

- [ ] **Step 4: Copy existing assets to public/**

```bash
cp -r "/Users/iceberg/Project/portfolio 2/image" "/Users/iceberg/Project/portfolio 2/public/"
cp "/Users/iceberg/Project/portfolio 2/Resume-Pirun-Kongsaeng.pdf" "/Users/iceberg/Project/portfolio 2/public/"
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: `✓ Ready on http://localhost:3000` — open browser and see default Next.js page.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 + TypeScript + Tailwind"
```

---

## Task 2: Project Types

**Files:**
- Create: `src/types/project.ts`

- [ ] **Step 1: Create the shared Project type**

Create `src/types/project.ts`:

```typescript
export interface Project {
  slug: string
  title: string
  shortDescription: string
  tags: string[]
  coverImage: string
  url?: string
  hasCaseStudy: boolean
}

export interface CaseStudyFeature {
  title: string
  description: string
  image?: string
}

export interface CaseStudy extends Project {
  client: string
  year: string
  role: string
  country: string
  challenge: string
  solution: string
  features: CaseStudyFeature[]
  stats?: { label: string; value: string }[]
  liveUrl?: string
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/project.ts
git commit -m "feat: add Project and CaseStudy TypeScript interfaces"
```

---

## Task 3: Data Files

**Files:**
- Create: `src/data/featured-work.ts`
- Create: `src/data/all-projects.ts`
- Create: `src/data/case-studies.ts`

- [ ] **Step 1: Create featured-work.ts (3 homepage cards)**

Create `src/data/featured-work.ts`:

```typescript
import { Project } from '@/types/project'

export const featuredWork: Project[] = [
  {
    slug: 'gatac',
    title: 'GATAC Aviation',
    shortDescription: 'Shopify theme & B2B distributor portal with custom booking system.',
    tags: ['Shopify', 'JavaScript', 'API'],
    coverImage: '/image/projects/gatac-hero.jpg',
    url: 'https://gatac.com',
    hasCaseStudy: true,
  },
  {
    slug: 'foley',
    title: 'Foley & Associates',
    shortDescription: 'WordPress law firm site with custom PHP forms and SEO setup.',
    tags: ['WordPress', 'PHP', 'SEO'],
    coverImage: '/image/projects/foley-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'aj-flooring',
    title: 'AJ Flooring',
    shortDescription: 'WooCommerce store with GA4 e-commerce tracking and local SEO.',
    tags: ['WordPress', 'WooCommerce', 'GA4'],
    coverImage: '/image/projects/ajflooring-hero.jpg',
    hasCaseStudy: true,
  },
]
```

- [ ] **Step 2: Create all-projects.ts (all 7 + room for more)**

Create `src/data/all-projects.ts`:

```typescript
import { Project } from '@/types/project'

export const allProjects: Project[] = [
  {
    slug: 'gatac',
    title: 'GATAC Aviation',
    shortDescription: 'Shopify theme & B2B distributor portal.',
    tags: ['Shopify', 'JavaScript', 'API'],
    coverImage: '/image/projects/gatac-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'foley',
    title: 'Foley & Associates',
    shortDescription: 'Law firm WordPress site with custom PHP.',
    tags: ['WordPress', 'PHP', 'SEO'],
    coverImage: '/image/projects/foley-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'aj-flooring',
    title: 'AJ Flooring',
    shortDescription: 'WooCommerce store with GA4 tracking.',
    tags: ['WordPress', 'WooCommerce', 'GA4'],
    coverImage: '/image/projects/ajflooring-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'asl',
    title: 'ASL',
    shortDescription: 'B2B WooCommerce store with bulk ordering.',
    tags: ['WordPress', 'WooCommerce', 'PHP'],
    coverImage: '/image/projects/asl-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'grind',
    title: 'Grind',
    shortDescription: 'Coffee brand WordPress site with booking.',
    tags: ['WordPress', 'JavaScript'],
    coverImage: '/image/projects/grind-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'birdhouse',
    title: 'Birdhouse',
    shortDescription: 'Property management WordPress site.',
    tags: ['WordPress', 'CSS'],
    coverImage: '/image/projects/birdhouse-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'newstart',
    title: 'Newstart',
    shortDescription: 'Real estate WordPress site with SEO.',
    tags: ['WordPress', 'SEO', 'GA4'],
    coverImage: '/image/projects/newstart-hero.jpg',
    hasCaseStudy: true,
  },
]
```

- [ ] **Step 3: Create case-studies.ts (full data for 7 pages)**

Create `src/data/case-studies.ts`:

```typescript
import { CaseStudy } from '@/types/project'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'gatac',
    title: 'GATAC Aviation',
    client: 'GATAC',
    year: '2024',
    role: 'Frontend Developer',
    country: 'Australia',
    shortDescription: 'Shopify theme & B2B distributor portal with custom booking system.',
    challenge: 'GATAC needed a Shopify storefront that also served as a B2B portal for aviation distributors, with a custom booking system for maintenance services.',
    solution: 'Built a custom Shopify theme with Liquid + JavaScript, integrated a third-party booking API, and created a password-protected B2B section for wholesale pricing.',
    tags: ['Shopify', 'JavaScript', 'API', 'Liquid'],
    coverImage: '/image/projects/gatac-hero.jpg',
    hasCaseStudy: true,
    features: [
      { title: 'Custom Shopify Theme', description: 'Built from scratch with Liquid templating, matching brand guidelines.', image: '/image/projects/gatac-features.jpg' },
      { title: 'B2B Distributor Portal', description: 'Password-protected section with wholesale pricing and bulk ordering.' },
      { title: 'Booking System Integration', description: 'Custom API integration for aviation maintenance scheduling.' },
    ],
    stats: [
      { label: 'Load time', value: '<2s' },
      { label: 'Mobile score', value: '94' },
    ],
    liveUrl: 'https://gatac.com',
    url: 'https://gatac.com',
  },
  {
    slug: 'foley',
    title: 'Foley & Associates',
    client: 'Foley & Associates',
    year: '2023',
    role: 'Web Developer',
    country: 'Australia',
    shortDescription: 'WordPress law firm site with custom PHP forms and SEO optimisation.',
    challenge: 'A law firm needed a professional, trustworthy website with custom enquiry forms, document downloads, and strong local SEO for their practice areas.',
    solution: 'Built on WordPress with Elementor Pro, custom PHP for form handling, ACF for practice area pages, and full on-page SEO setup targeting local search.',
    tags: ['WordPress', 'PHP', 'SEO', 'Elementor'],
    coverImage: '/image/projects/foley-hero.jpg',
    hasCaseStudy: true,
    features: [
      { title: 'Custom PHP Forms', description: 'Secure enquiry forms with file upload and email routing.', image: '/image/projects/foley-features.jpg' },
      { title: 'Practice Area Pages', description: 'Dynamic pages using Advanced Custom Fields for easy updates.' },
      { title: 'Local SEO Setup', description: 'Schema markup, Google Business Profile integration, and page speed optimisation.' },
    ],
    url: undefined,
  },
  {
    slug: 'aj-flooring',
    title: 'AJ Flooring',
    client: 'AJ Flooring',
    year: '2023',
    role: 'Web Developer & SEO',
    country: 'Australia',
    shortDescription: 'WooCommerce store with GA4 e-commerce tracking and local SEO.',
    challenge: 'An flooring company wanted an online store to sell products directly, with analytics to track which products and pages drove the most revenue.',
    solution: 'Built WooCommerce store on WordPress, implemented GA4 with e-commerce events, set up Google Ads conversion tracking, and ran local SEO campaign.',
    tags: ['WordPress', 'WooCommerce', 'GA4', 'SEO'],
    coverImage: '/image/projects/ajflooring-hero.jpg',
    hasCaseStudy: true,
    features: [
      { title: 'WooCommerce Store', description: 'Full product catalogue with category filtering and secure checkout.', image: '/image/projects/ajflooring-features.jpg' },
      { title: 'GA4 E-commerce Tracking', description: 'Full funnel tracking — view item, add to cart, purchase events.' },
      { title: 'Local SEO Campaign', description: 'Optimised for "flooring [suburb]" keywords, Google Business Profile.' },
    ],
    url: undefined,
  },
  {
    slug: 'asl',
    title: 'ASL',
    client: 'ASL',
    year: '2023',
    role: 'Web Developer',
    country: 'Thailand',
    shortDescription: 'B2B WooCommerce store with bulk ordering and distributor pricing.',
    challenge: 'A Thai distributor needed a B2B e-commerce site with different price tiers for wholesale customers and minimum order quantities.',
    solution: 'WordPress + WooCommerce with custom PHP for role-based pricing, minimum quantity rules, and a wholesale registration flow.',
    tags: ['WordPress', 'WooCommerce', 'PHP'],
    coverImage: '/image/projects/asl-hero.jpg',
    hasCaseStudy: true,
    features: [
      { title: 'Role-based Pricing', description: 'Wholesale vs retail pricing controlled by user role.', image: '/image/projects/asl-features.jpg' },
      { title: 'Bulk Order Form', description: 'Custom order form for placing large orders with quantity tiers.' },
      { title: 'Distributor Registration', description: 'Application flow for wholesale account approval.' },
    ],
    url: undefined,
  },
  {
    slug: 'grind',
    title: 'Grind',
    client: 'Grind Coffee',
    year: '2022',
    role: 'Web Developer',
    country: 'UK',
    shortDescription: 'Coffee brand WordPress site with table booking integration.',
    challenge: 'A UK coffee brand needed a site that reflected their urban aesthetic and integrated with their existing table booking system.',
    solution: 'Custom WordPress theme with JavaScript animations, third-party booking widget integration, and a menu management system using custom post types.',
    tags: ['WordPress', 'JavaScript', 'CSS'],
    coverImage: '/image/projects/grind-hero.jpg',
    hasCaseStudy: true,
    features: [
      { title: 'Custom WordPress Theme', description: 'Dark urban aesthetic matching brand guidelines.', image: '/image/projects/grind-features.jpg' },
      { title: 'Booking Integration', description: 'Embedded table booking widget with custom styling.' },
      { title: 'Menu Management', description: 'Custom post types for drinks menu, easy for staff to update.' },
    ],
    url: undefined,
  },
  {
    slug: 'birdhouse',
    title: 'Birdhouse',
    client: 'Birdhouse Property',
    year: '2022',
    role: 'Web Developer',
    country: 'UK',
    shortDescription: 'Property management WordPress site with listings and contact system.',
    challenge: 'A property management company needed a clean site to showcase rental listings and make it easy for landlords to get in touch.',
    solution: 'WordPress with custom post types for property listings, enquiry forms per listing, and a Google Maps integration for property locations.',
    tags: ['WordPress', 'CSS', 'Google Maps API'],
    coverImage: '/image/projects/birdhouse-hero.jpg',
    hasCaseStudy: true,
    features: [
      { title: 'Property Listings', description: 'Custom post type with location, price, features fields.', image: '/image/projects/birdhouse-features.jpg' },
      { title: 'Google Maps Integration', description: 'Interactive map showing all available properties.' },
      { title: 'Enquiry System', description: 'Per-listing contact forms routed to the responsible agent.' },
    ],
    url: undefined,
  },
  {
    slug: 'newstart',
    title: 'Newstart',
    client: 'Newstart Property',
    year: '2022',
    role: 'Web Developer & SEO',
    country: 'Thailand',
    shortDescription: 'Real estate WordPress site with local SEO and lead capture.',
    challenge: 'A Thai real estate agency needed a site that ranked locally for property searches and captured buyer leads effectively.',
    solution: 'WordPress with custom property post types, schema markup for real estate, and a lead capture flow integrated with their CRM via Zapier.',
    tags: ['WordPress', 'SEO', 'GA4', 'Zapier'],
    coverImage: '/image/projects/newstart-hero.jpg',
    hasCaseStudy: true,
    features: [
      { title: 'Real Estate Schema', description: 'Structured data markup for property listings in search results.', image: '/image/projects/newstart-features.jpg' },
      { title: 'Lead Capture Flow', description: 'Multi-step enquiry form connected to CRM via Zapier.' },
      { title: 'Local SEO', description: 'Targeted keywords for Bangkok property searches, optimised GMB profile.' },
    ],
    url: undefined,
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/ src/types/
git commit -m "feat: add project data files and TypeScript types"
```

---

## Task 4: Global CSS + Tailwind Config

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace globals.css**

Replace full contents of `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-accent: #fbbf24;
  --color-accent-hover: #d97706;
  --color-accent-dim: rgba(251, 191, 36, 0.1);
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-surface-2: #1a1a1a;
  --color-border: #1f2937;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Marquee animation */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.marquee-container {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

- [ ] **Step 2: Update tailwind.config.ts**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#fbbf24',
        'accent-hover': '#d97706',
        bg: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        border: '#1f2937',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat: dark theme CSS tokens + marquee animation"
```

---

## Task 5: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with Inter font and metadata"
```

---

## Task 6: Header Component

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: Create Header.tsx**

```typescript
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Pirun<span className="text-accent">.</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/#works" className="text-sm text-text-muted hover:text-text transition-colors">
            Work
          </Link>
          <Link href="/#about" className="text-sm text-text-muted hover:text-text transition-colors">
            About
          </Link>
          <Link href="/#contact" className="text-sm text-text-muted hover:text-text transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: sticky Header with scroll blur effect"
```

---

## Task 7: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```typescript
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Pirun Kongsaeng
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/pirunkongsaeng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pirun-kongsaeng-417b2a1b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:pirun.ks@gmail.com"
            className="text-sm text-text-muted hover:text-accent transition-colors"
          >
            Email
          </a>
          <a
            href="/Resume-Pirun-Kongsaeng.pdf"
            download
            className="text-sm text-accent hover:text-accent-hover transition-colors font-medium"
          >
            Resume (PDF) ↓
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add Header + Footer to layout.tsx**

Modify `src/app/layout.tsx` body:

```typescript
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// inside RootLayout return:
return (
  <html lang="en" className={inter.variable}>
    <body>
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  </html>
)
```

- [ ] **Step 3: Type-check + verify**

```bash
npx tsc --noEmit
npm run dev
```

Open http://localhost:3000 — should see header + footer on dark background.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/app/layout.tsx
git commit -m "feat: Footer with resume download + wire Header/Footer into layout"
```

---

## Task 8: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Create ProjectCard.tsx**

```typescript
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  sizes?: string
}

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 33vw' }: ProjectCardProps) {
  return (
    <div className="bg-surface-2 rounded-xl overflow-hidden border border-border group hover:border-accent/30 transition-colors duration-300">
      <div className="relative h-48 bg-surface overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={sizes}
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-text mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-muted mb-4 leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.hasCaseStudy && (
          <Link
            href={`/case-study/${project.slug}`}
            className="text-sm text-accent hover:text-accent-hover font-medium transition-colors"
          >
            View Case Study →
          </Link>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: ProjectCard component with Image + tags"
```

---

## Task 9: PageTransition Component

**Files:**
- Create: `src/components/PageTransition.tsx`

- [ ] **Step 1: Create PageTransition.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PageTransition.tsx
git commit -m "feat: PageTransition enter-only fade+slide animation"
```

---

## Task 10: HeroSection

**Files:**
- Create: `src/components/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection.tsx**

```typescript
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

        {/* Text */}
        <div>
          <div className="w-8 h-0.5 bg-accent mb-6" />
          <p className="text-xs uppercase tracking-widest text-accent mb-4">
            Web Developer · Bangkok
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-tight mb-6">
            Pirun<br />Kongsaeng
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-md leading-relaxed">
            I build fast, SEO-strong websites for clients in Thailand, Australia, and the UK.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link
              href="/#works"
              className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              View Work
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 border border-border text-text-muted hover:text-text hover:border-accent/50 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </div>
          <a
            href="/Resume-Pirun-Kongsaeng.pdf"
            download
            className="text-sm text-text-muted hover:text-accent transition-colors"
          >
            or download my resume (PDF) →
          </a>
        </div>

        {/* Photo */}
        <div className="relative h-80 lg:h-[520px] rounded-2xl overflow-hidden">
          <Image
            src="/image/IMG_4277.webp"
            alt="Pirun Kongsaeng"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: HeroSection with photo, CTAs, resume link"
```

---

## Task 11: AboutSection

**Files:**
- Create: `src/components/AboutSection.tsx`

- [ ] **Step 1: Create AboutSection.tsx**

```typescript
export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">About</p>
        <h2 className="text-3xl font-bold tracking-tight mb-12">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-text-muted leading-relaxed mb-4">
              Web Developer with 5+ years building fast, SEO-optimised websites for clients in
              Thailand, Australia, and the UK. I specialise in WordPress and frontend
              development — from design to e-commerce and analytics setup.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              I came to code from aircraft maintenance — a field where a missed detail isn't
              an option. That precision is how I approach every build: tested, documented,
              and made to last.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              Currently expanding into full-stack development with React and Next.js.
            </p>
            <a
              href="/Resume-Pirun-Kongsaeng.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-2 border border-border text-text hover:border-accent/50 rounded-lg transition-colors text-sm font-medium"
            >
              ↓ Download Resume
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-text mb-3">Experience</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>Web Developer</li>
                <li>UX / UI Designer</li>
                <li>Web Master / IT Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text mb-3">Skills</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>WordPress & WooCommerce</li>
                <li>HTML, CSS, JavaScript</li>
                <li>React & Next.js</li>
                <li>Tailwind & Bootstrap</li>
                <li>SEO & Google Analytics</li>
                <li>REST API Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AboutSection.tsx
git commit -m "feat: AboutSection with bio, skills list, resume download"
```

---

## Task 12: SkillsMarquee

**Files:**
- Create: `src/components/SkillsMarquee.tsx`

- [ ] **Step 1: Create SkillsMarquee.tsx**

```typescript
const skills = [
  { name: 'WordPress', icon: 'devicon-wordpress-plain' },
  { name: 'WooCommerce', icon: 'devicon-woocommerce-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'PHP', icon: 'devicon-php-plain' },
  { name: 'HTML5', icon: 'devicon-html5-plain' },
  { name: 'CSS3', icon: 'devicon-css3-plain' },
  { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
  { name: 'Git', icon: 'devicon-git-plain' },
  { name: 'Figma', icon: 'devicon-figma-plain' },
]

// Duplicate for seamless loop
const doubled = [...skills, ...skills]

export default function SkillsMarquee() {
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-accent">Skills & Technologies</p>
      </div>

      <div className="marquee-container">
        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              className="flex flex-col items-center gap-2 min-w-[80px]"
            >
              <i className={`${skill.icon} colored text-4xl`} />
              <span className="text-xs text-text-muted whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add devicons CDN to layout.tsx `<head>`**

In `src/app/layout.tsx`, add inside `<html>`:

```typescript
// Add to the <head> via next metadata or a <link> tag
// Add this inside the <html> block before <body>:
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
  />
</head>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillsMarquee.tsx src/app/layout.tsx
git commit -m "feat: SkillsMarquee — 1-row CSS infinite loop, no interaction"
```

---

## Task 13: FeaturedWorkSection

**Files:**
- Create: `src/components/FeaturedWorkSection.tsx`

- [ ] **Step 1: Create FeaturedWorkSection.tsx**

```typescript
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { featuredWork } from '@/data/featured-work'

export default function FeaturedWorkSection() {
  return (
    <section id="works" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Selected Work</p>
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-text-muted hover:text-accent transition-colors hidden md:block"
          >
            See All Projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredWork.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <Link
          href="/projects"
          className="text-sm text-text-muted hover:text-accent transition-colors md:hidden"
        >
          See All Projects →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturedWorkSection.tsx
git commit -m "feat: FeaturedWorkSection — 3-col grid, link to /projects"
```

---

## Task 14: ContactForm + API Route

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create the API route**

Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { name, email, message } = body

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
  }

  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'pirun.ks@gmail.com',
    subject: `Portfolio enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 2: Create ContactForm.tsx**

Create `src/components/ContactForm.tsx`:

```typescript
'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <p className="text-accent text-lg font-semibold mb-2">Message sent!</p>
        <p className="text-text-muted text-sm">I'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm text-text-muted mb-2">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-text-muted mb-2">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-text-muted mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="What are you working on?"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again or email me directly.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

- [ ] **Step 3: Create ContactSection wrapper**

Create `src/components/ContactSection.tsx`:

```typescript
import ContactForm from '@/components/ContactForm'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">Contact</p>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch</h2>
        <p className="text-text-muted mb-12 max-w-md">
          Available for freelance projects and full-time roles. Based in Bangkok — working remotely worldwide.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add RESEND_API_KEY to .env.local**

Create `.env.local` (already in .gitignore):

```
RESEND_API_KEY=your_resend_api_key_here
```

Get API key from https://resend.com — free tier allows 3,000 emails/month.

- [ ] **Step 5: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ContactForm.tsx src/components/ContactSection.tsx src/app/api/
git commit -m "feat: ContactForm + Resend API route"
```

---

## Task 15: Homepage (Assemble)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```typescript
import PageTransition from '@/components/PageTransition'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsMarquee from '@/components/SkillsMarquee'
import FeaturedWorkSection from '@/components/FeaturedWorkSection'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <SkillsMarquee />
      <FeaturedWorkSection />
      <ContactSection />
    </PageTransition>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000 — check all sections render. No console errors.

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage — assemble all sections"
```

---

## Task 16: All Projects Page

**Files:**
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create projects/page.tsx**

```typescript
import type { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'
import ProjectCard from '@/components/ProjectCard'
import { allProjects } from '@/data/all-projects'

export const metadata: Metadata = {
  title: 'All Projects | Pirun Kongsaeng',
  description: 'All web development projects by Pirun Kongsaeng — WordPress, WooCommerce, React, and more.',
}

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-accent mb-4">Work</p>
          <div className="flex items-baseline justify-between mb-12">
            <h1 className="text-3xl font-bold tracking-tight">All Projects</h1>
            <span className="text-sm text-text-muted">{allProjects.length} projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Open http://localhost:3000/projects — all 7 projects visible.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/
git commit -m "feat: /projects page — all projects grid"
```

---

## Task 17: Case Study Pages

**Files:**
- Create: `src/app/case-study/[slug]/page.tsx`

- [ ] **Step 1: Create [slug]/page.tsx**

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'
import { caseStudies, getCaseStudyBySlug } from '@/data/case-studies'

// Next.js 15: params is async — must await before use
interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title: `${cs.title} | Pirun Kongsaeng`,
    description: cs.shortDescription,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)

  if (!cs) notFound()

  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* Back link */}
          <Link href="/projects" className="text-sm text-text-muted hover:text-accent transition-colors mb-8 inline-block">
            ← All Projects
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {cs.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{cs.title}</h1>
            <p className="text-text-muted text-lg mb-6">{cs.shortDescription}</p>

            <div className="flex flex-wrap gap-6 text-sm text-text-muted">
              <span><span className="text-text font-medium">Client:</span> {cs.client}</span>
              <span><span className="text-text font-medium">Year:</span> {cs.year}</span>
              <span><span className="text-text font-medium">Role:</span> {cs.role}</span>
              <span><span className="text-text font-medium">Country:</span> {cs.country}</span>
            </div>
          </div>

          {/* Cover image */}
          <div className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-16 bg-surface">
            <Image
              src={cs.coverImage}
              alt={cs.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>

          {/* Challenge + Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">Challenge</h2>
              <p className="text-text-muted leading-relaxed">{cs.challenge}</p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">Solution</h2>
              <p className="text-text-muted leading-relaxed">{cs.solution}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-widest text-accent mb-8">What I Built</h2>
            <div className="space-y-12">
              {cs.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {feature.image && (
                    <div className="relative h-52 rounded-xl overflow-hidden bg-surface order-first md:order-none">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 448px"
                      />
                    </div>
                  )}
                  <div className={feature.image ? '' : 'md:col-span-2'}>
                    <h3 className="font-bold text-text mb-3">{feature.title}</h3>
                    <p className="text-text-muted leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          {cs.stats && cs.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {cs.stats.map((stat) => (
                <div key={stat.label} className="bg-surface-2 rounded-xl p-5 border border-border text-center">
                  <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Live link */}
          {cs.liveUrl && (
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              View Live Site →
            </a>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Build to verify static generation**

```bash
npm run build
```

Expected output includes:
```
○ /case-study/gatac
○ /case-study/foley
○ /case-study/aj-flooring
... (7 total)
```

- [ ] **Step 3: Commit**

```bash
git add src/app/case-study/
git commit -m "feat: /case-study/[slug] pages — all 7 case studies with async params"
```

---

## Task 18: Deploy to Vercel

**Files:**
- No code changes — deployment config only

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to https://vercel.com → New Project
2. Import the GitHub repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

- [ ] **Step 3: Add environment variable in Vercel**

In Vercel project settings → Environment Variables:
- Key: `RESEND_API_KEY`
- Value: your Resend API key
- Environment: Production + Preview

Redeploy after adding the env var.

- [ ] **Step 4: Verify production**

Open the Vercel URL:
- [ ] Homepage loads with dark theme
- [ ] `/projects` shows all 7 projects
- [ ] `/case-study/gatac` loads correctly
- [ ] Contact form sends email (test with your own address)
- [ ] Resume PDF downloads from all 3 locations

- [ ] **Step 5: Final commit**

```bash
git commit --allow-empty -m "chore: deploy to Vercel"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Next.js 15 App Router + TypeScript + Tailwind v3 | Task 1 |
| Dark theme + amber accent CSS tokens | Task 4 |
| Project + CaseStudy types in src/types/ | Task 2 |
| 3 data files (featured, all, case-studies) | Task 3 |
| Header sticky + Footer with resume | Tasks 6, 7 |
| Hero: text left + photo right + 3 CTAs | Task 10 |
| About: bio + skills + resume download | Task 11 |
| Skills: 1-row marquee, pure CSS, no interaction | Task 12 |
| Featured Work: 3 cards, 3-col grid | Task 13 |
| Contact form + Resend API | Task 14 |
| Homepage assembly | Task 15 |
| /projects page grows from data file | Task 16 |
| /case-study/[slug] with async params + generateStaticParams | Task 17 |
| Resume download: Hero + About + Footer | Tasks 10, 11, 7 |
| Enter-only page transitions | Task 9 |
| Vercel deploy | Task 18 |

All spec requirements covered.
