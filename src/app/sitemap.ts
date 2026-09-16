import type { MetadataRoute } from 'next'
import { careerProfile } from '@/data/career-profile'
import { projectDetails } from '@/data/case-studies'

const lastModified = new Date('2026-09-15')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = careerProfile.contact.portfolio.replace(/\/$/, '')

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...projectDetails.map((project) => ({
      url: `${baseUrl}/case-study/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: project.hasCaseStudy ? 0.8 : 0.6,
    })),
  ]
}
