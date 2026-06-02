export interface Project {
  slug: string
  title: string
  shortDescription: string
  tags: string[]
  coverImage: string
  coverStyle?: 'cover' | 'logo'
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
