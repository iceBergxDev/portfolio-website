import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { featuredWork } from '@/data/featured-work'

export default function FeaturedWorkSection() {
  return (
    <section id="works" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Selected Work</p>
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          </div>
          <Link href="/projects" className="text-sm text-text-muted hover:text-accent transition-colors hidden md:block">
            See All Projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredWork.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link href="/projects" className="text-sm text-text-muted hover:text-accent transition-colors md:hidden">
          See All Projects →
        </Link>
      </div>
    </section>
  )
}
