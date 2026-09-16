import Link from 'next/link'
import ProjectCard from '@/components/ui/ProjectCard'
import { featuredWork } from '@/data/featured-work'

export default function FeaturedWorkSection() {
  return (
    <section id="works" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Selected work</h2>
            <p className="mt-3 max-w-2xl text-text-muted">
              A few recent projects across ecommerce, WordPress and custom web applications.
              Open a project to see what I worked on and how I checked it.
            </p>
          </div>
          <Link href="/projects" className="text-sm text-text-muted hover:text-accent transition-colors hidden md:block">
            See all projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredWork.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              variant="featured"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
        <Link href="/projects" className="text-sm text-text-muted hover:text-accent transition-colors md:hidden">
          See all projects →
        </Link>
      </div>
    </section>
  )
}
