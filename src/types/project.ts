export type ProjectStatus = 'Production' | 'Live' | 'Staging' | 'Local' | 'Selected work'

export interface Project {
  slug: string
  title: string
  shortDescription: string
  tags: string[]
  coverImage: string
  coverAlt: string
  coverFit?: 'cover' | 'contain'
  coverPosition?: string
  heroImage?: string
  heroAlt?: string
  heroPosition?: string
  heroAspect?: 'standard' | 'wide'
  url?: string
  hasCaseStudy: boolean
  status: ProjectStatus
  year?: string
}

export interface CaseStudyFeature {
  title: string
  description: string
  image?: string
}

export interface CaseStudy extends Project {
  client: string
  role: string
  challenge: string
  responsibility: string
  solution: string
  verification: string
  result: string
  boundary?: string
  features: CaseStudyFeature[]
  stats?: { label: string; value: string }[]
  liveUrl?: string
}
