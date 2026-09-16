import { allProjects } from './all-projects'

const FEATURED_SLUGS = ['gatac', 'storyfilms', 'mdf', 'foley']

export const featuredWork = FEATURED_SLUGS.flatMap((slug) => allProjects.filter((project) => project.slug === slug))
