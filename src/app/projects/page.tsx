import type { Metadata } from 'next'
import PageTransition from '@/components/layout/PageTransition'
import ProjectCard from '@/components/ui/ProjectCard'
import { allProjects } from '@/data/all-projects'

export const metadata: Metadata = {
  title: 'All Projects | Pirun Kongsaeng',
  description: 'All web development projects by Pirun Kongsaeng — WordPress, WooCommerce, React, and more.',
}

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-accent mb-4">Work</p>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 md:mb-12">
            <h1 className="text-3xl font-bold tracking-tight">All Projects</h1>
            <span className="text-sm text-text-muted">{allProjects.length} projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
