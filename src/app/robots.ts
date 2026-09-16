import type { MetadataRoute } from 'next'
import { careerProfile } from '@/data/career-profile'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = careerProfile.contact.portfolio.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
