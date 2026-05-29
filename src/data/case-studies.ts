import { CaseStudy } from '@/types/project'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'gatac', title: 'GATAC Aviation', client: 'GATAC', year: '2024', role: 'Frontend Developer', country: 'Australia',
    shortDescription: 'Shopify theme & B2B distributor portal with custom booking system.',
    challenge: 'GATAC needed a Shopify storefront that also served as a B2B portal for aviation distributors, with a custom booking system for maintenance services.',
    solution: 'Built a custom Shopify theme with Liquid + JavaScript, integrated a third-party booking API, and created a password-protected B2B section for wholesale pricing.',
    tags: ['Shopify', 'JavaScript', 'API', 'Liquid'], coverImage: '/image/projects/gatac-hero.jpg', hasCaseStudy: true,
    features: [
      { title: 'Custom Shopify Theme', description: 'Built from scratch with Liquid templating, matching brand guidelines.', image: '/image/projects/gatac-features.jpg' },
      { title: 'B2B Distributor Portal', description: 'Password-protected section with wholesale pricing and bulk ordering.' },
      { title: 'Booking System Integration', description: 'Custom API integration for aviation maintenance scheduling.' },
    ],
    stats: [{ label: 'Load time', value: '<2s' }, { label: 'Mobile score', value: '94' }],
    liveUrl: 'https://gatac.com', url: 'https://gatac.com',
  },
  {
    slug: 'foley', title: 'Foley & Associates', client: 'Foley & Associates', year: '2023', role: 'Web Developer', country: 'Australia',
    shortDescription: 'WordPress law firm site with custom PHP forms and SEO optimisation.',
    challenge: 'A law firm needed a professional website with custom enquiry forms, document downloads, and strong local SEO.',
    solution: 'Built on WordPress with Elementor Pro, custom PHP for form handling, ACF for practice area pages, and full on-page SEO setup.',
    tags: ['WordPress', 'PHP', 'SEO', 'Elementor'], coverImage: '/image/projects/foley-hero.jpg', hasCaseStudy: true,
    features: [
      { title: 'Custom PHP Forms', description: 'Secure enquiry forms with file upload and email routing.', image: '/image/projects/foley-features.jpg' },
      { title: 'Practice Area Pages', description: 'Dynamic pages using Advanced Custom Fields for easy updates.' },
      { title: 'Local SEO Setup', description: 'Schema markup, Google Business Profile integration, and page speed optimisation.' },
    ],
  },
  {
    slug: 'aj-flooring', title: 'AJ Flooring', client: 'AJ Flooring', year: '2023', role: 'Web Developer & SEO', country: 'Australia',
    shortDescription: 'WooCommerce store with GA4 e-commerce tracking and local SEO.',
    challenge: 'A flooring company wanted an online store with analytics to track which products drove the most revenue.',
    solution: 'Built WooCommerce store on WordPress, implemented GA4 with e-commerce events, and ran local SEO campaign.',
    tags: ['WordPress', 'WooCommerce', 'GA4', 'SEO'], coverImage: '/image/projects/ajflooring-hero.jpg', hasCaseStudy: true,
    features: [
      { title: 'WooCommerce Store', description: 'Full product catalogue with category filtering and secure checkout.', image: '/image/projects/ajflooring-features.jpg' },
      { title: 'GA4 E-commerce Tracking', description: 'Full funnel tracking — view item, add to cart, purchase events.' },
      { title: 'Local SEO Campaign', description: 'Optimised for "flooring [suburb]" keywords, Google Business Profile.' },
    ],
  },
  {
    slug: 'asl', title: 'ASL', client: 'ASL', year: '2023', role: 'Web Developer', country: 'Thailand',
    shortDescription: 'B2B WooCommerce store with bulk ordering and distributor pricing.',
    challenge: 'A Thai distributor needed a B2B e-commerce site with different price tiers for wholesale customers.',
    solution: 'WordPress + WooCommerce with custom PHP for role-based pricing and minimum order quantities.',
    tags: ['WordPress', 'WooCommerce', 'PHP'], coverImage: '/image/projects/asl-hero.jpg', hasCaseStudy: true,
    features: [
      { title: 'Role-based Pricing', description: 'Wholesale vs retail pricing controlled by user role.', image: '/image/projects/asl-features.jpg' },
      { title: 'Bulk Order Form', description: 'Custom order form for placing large orders with quantity tiers.' },
      { title: 'Distributor Registration', description: 'Application flow for wholesale account approval.' },
    ],
  },
  {
    slug: 'grind', title: 'Grind', client: 'Grind Coffee', year: '2022', role: 'Web Developer', country: 'UK',
    shortDescription: 'Coffee brand WordPress site with table booking integration.',
    challenge: 'A UK coffee brand needed a site reflecting their urban aesthetic with table booking integration.',
    solution: 'Custom WordPress theme with JavaScript animations and third-party booking widget integration.',
    tags: ['WordPress', 'JavaScript', 'CSS'], coverImage: '/image/projects/grind-hero.jpg', hasCaseStudy: true,
    features: [
      { title: 'Custom WordPress Theme', description: 'Dark urban aesthetic matching brand guidelines.', image: '/image/projects/grind-features.jpg' },
      { title: 'Booking Integration', description: 'Embedded table booking widget with custom styling.' },
      { title: 'Menu Management', description: 'Custom post types for drinks menu, easy for staff to update.' },
    ],
  },
  {
    slug: 'birdhouse', title: 'Birdhouse', client: 'Birdhouse Property', year: '2022', role: 'Web Developer', country: 'UK',
    shortDescription: 'Property management WordPress site with listings and contact system.',
    challenge: 'A property management company needed a clean site to showcase rental listings.',
    solution: 'WordPress with custom post types for property listings and Google Maps integration.',
    tags: ['WordPress', 'CSS', 'Google Maps API'], coverImage: '/image/projects/birdhouse-hero.jpg', hasCaseStudy: true,
    features: [
      { title: 'Property Listings', description: 'Custom post type with location, price, features fields.', image: '/image/projects/birdhouse-features.jpg' },
      { title: 'Google Maps Integration', description: 'Interactive map showing all available properties.' },
      { title: 'Enquiry System', description: 'Per-listing contact forms routed to the responsible agent.' },
    ],
  },
  {
    slug: 'newstart', title: 'Newstart', client: 'Newstart Property', year: '2022', role: 'Web Developer & SEO', country: 'Thailand',
    shortDescription: 'Real estate WordPress site with local SEO and lead capture.',
    challenge: 'A Thai real estate agency needed a site that ranked locally for property searches and captured buyer leads.',
    solution: 'WordPress with schema markup for real estate and lead capture flow integrated with CRM via Zapier.',
    tags: ['WordPress', 'SEO', 'GA4', 'Zapier'], coverImage: '/image/projects/newstart-hero.jpg', hasCaseStudy: true,
    features: [
      { title: 'Real Estate Schema', description: 'Structured data markup for property listings in search results.', image: '/image/projects/newstart-features.jpg' },
      { title: 'Lead Capture Flow', description: 'Multi-step enquiry form connected to CRM via Zapier.' },
      { title: 'Local SEO', description: 'Targeted keywords for Bangkok property searches, optimised GMB profile.' },
    ],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
