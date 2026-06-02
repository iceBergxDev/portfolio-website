import { Project } from '@/types/project'

export const allProjects: Project[] = [
  { slug: 'gatac', title: 'GATAC — Shopify & B2B Portal', shortDescription: 'Next.js app embedded in Shopify Admin with draft order engine and App Bridge SSO.', tags: ['Shopify', 'Next.js', 'App Bridge', 'Admin API'], coverImage: '/images/projects/gatac/logo.png', coverStyle: 'logo', hasCaseStudy: true },
  { slug: 'foley', title: 'Foley Pre-Start', shortDescription: 'Digital fleet inspection system — custom WordPress plugin in PHP 8 with real-time fault routing.', tags: ['WordPress', 'PHP 8', 'MySQL', 'Plugin Dev'], coverImage: '/images/projects/foley/hero.jpg', hasCaseStudy: true },
  { slug: 'aj-flooring', title: 'AJ Flooring', shortDescription: '2025 Business Award-finalist website with custom Elementor build and Core Web Vitals optimisation.', tags: ['WordPress', 'Elementor', 'NitroPack', 'SEO'], coverImage: '/images/projects/aj-flooring/hero.jpg', hasCaseStudy: true },
  { slug: 'asl', title: 'Australian Synthetic Lawns', shortDescription: 'E-commerce & lead gen site with segmented retail/trade journeys.', tags: ['WordPress', 'Divi', 'WooCommerce'], coverImage: '/images/projects/asl/hero.jpg', hasCaseStudy: true },
  { slug: 'grind', title: 'Grind @ The Rise', shortDescription: 'Specialty café website with pixel-perfect brand translation.', tags: ['WordPress', 'Elementor', 'CDN'], coverImage: '/images/projects/grind/hero.jpg', hasCaseStudy: true },
  { slug: 'birdhouse', title: 'Birdhouse Media', shortDescription: 'Video production agency site with CPT architecture and video team cards.', tags: ['WordPress', 'Custom Post Types', 'Elementor'], coverImage: '/images/projects/birdhouse/hero.jpg', hasCaseStudy: true },
  { slug: 'newstart', title: 'Newstart Homes', shortDescription: 'Custom home builder site with filterable house-design catalogue.', tags: ['WordPress', 'Custom Post Types', 'NitroPack'], coverImage: '/images/projects/newstart/hero.jpg', hasCaseStudy: true },
]
