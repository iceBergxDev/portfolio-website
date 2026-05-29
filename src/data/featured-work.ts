import { Project } from '@/types/project'

export const featuredWork: Project[] = [
  {
    slug: 'gatac',
    title: 'GATAC — Shopify & B2B Portal',
    shortDescription: 'Next.js app embedded in Shopify Admin with draft order engine and App Bridge SSO.',
    tags: ['Shopify', 'Next.js', 'App Bridge'],
    coverImage: '/image/projects/gatac-logo.png',
    hasCaseStudy: true,
  },
  {
    slug: 'foley',
    title: 'Foley Pre-Start',
    shortDescription: 'Digital fleet inspection system — custom WordPress plugin in PHP 8 with real-time fault routing.',
    tags: ['WordPress', 'PHP 8', 'MySQL'],
    coverImage: '/image/projects/foley-prod-hero.jpg',
    hasCaseStudy: true,
  },
  {
    slug: 'aj-flooring',
    title: 'AJ Flooring',
    shortDescription: '2025 Business Award-finalist website with custom Elementor build and Core Web Vitals optimisation.',
    tags: ['WordPress', 'Elementor', 'SEO'],
    coverImage: '/image/projects/ajflooring-prod-hero.jpg',
    hasCaseStudy: true,
  },
]
