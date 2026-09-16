import type { Metadata } from 'next'
import PageTransition from '@/components/layout/PageTransition'
import ProjectCard from '@/components/ui/ProjectCard'
import { allProjects } from '@/data/all-projects'
import { featuredWork } from '@/data/featured-work'

export const metadata: Metadata = {
  title: 'WordPress, WooCommerce, Shopify and Next.js Projects | Pirun Kongsaeng',
  description: 'Web development projects by Pirun Kongsaeng using WordPress, WooCommerce, Shopify and Next.js, with API integrations, technical SEO and testing.',
  alternates: {
    canonical: '/projects',
  },
}

export default function ProjectsPage() {
  const featuredSlugs = new Set(featuredWork.map((project) => project.slug))
  const moreProjects = allProjects.filter((project) => !featuredSlugs.has(project.slug))

  return (
    <PageTransition>
      <div className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-3xl md:mb-16">
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">Web development projects</h1>
            <p className="text-lg leading-relaxed text-text-muted">
              This is the work I can show publicly. Some projects are live; others are staging or local builds.
              I label each one so you can see what I worked on and where the project stands.
            </p>
          </div>

          <div className="space-y-20 md:space-y-24">
            <section aria-labelledby="featured-projects-heading">
              <div className="mb-7 flex items-end justify-between gap-6">
                <h2 id="featured-projects-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Selected work
                </h2>
                <p className="hidden max-w-md text-right text-sm leading-relaxed text-text-muted md:block">
                  A few projects that show the range of my work, from ecommerce and custom tools to WordPress rebuilds.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                {featuredWork.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="featured"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ))}
              </div>
            </section>

            <section aria-labelledby="more-projects-heading">
              <div className="mb-7 max-w-2xl">
                <h2 id="more-projects-heading" className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  More project work
                </h2>
                <p className="text-sm leading-relaxed text-text-muted">
                  These are smaller builds, staging work and focused fixes. Each card shows its current status.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {moreProjects.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
