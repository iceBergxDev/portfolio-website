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
