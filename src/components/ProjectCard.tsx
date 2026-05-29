import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  sizes?: string
}

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 33vw' }: ProjectCardProps) {
  return (
    <div className="bg-surface-2 rounded-xl overflow-hidden border border-border group hover:border-accent/30 transition-colors duration-300">
      <div className="relative h-48 bg-surface overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={sizes}
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-text mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-sm text-text-muted mb-4 leading-relaxed">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">{tag}</span>
          ))}
        </div>
        {project.hasCaseStudy && (
          <Link href={`/case-study/${project.slug}`} className="text-sm text-accent hover:text-accent-hover font-medium transition-colors">
            View Case Study →
          </Link>
        )}
      </div>
    </div>
  )
}
