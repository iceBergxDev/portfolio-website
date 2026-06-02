import { allProjects } from './all-projects'

const FEATURED_SLUGS = ['gatac', 'foley', 'aj-flooring']

export const featuredWork = allProjects.filter((p) => FEATURED_SLUGS.includes(p.slug))
