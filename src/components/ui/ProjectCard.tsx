import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'
import { getTagLogo } from '@/lib/tech-logos'

interface ProjectCardProps {
  project: Project
  sizes?: string
}

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 33vw' }: ProjectCardProps) {
  return (
    <div className="bg-surface-2 rounded-xl overflow-hidden border border-border group hover:border-accent/30 transition-colors duration-300">
      <div className={`relative h-48 overflow-hidden flex items-center justify-center ${project.coverStyle === 'logo' ? 'bg-white p-8' : 'bg-surface'}`}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className={project.coverStyle === 'logo' ? 'object-contain p-8' : 'object-cover group-hover:scale-105 transition-transform duration-500'}
          sizes={sizes}
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-text mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-sm text-text-muted mb-4 leading-relaxed">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => {
            const logo = getTagLogo(tag)
            return (
              <span key={tag} className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                {logo && <Image src={logo} alt={tag} width={12} height={12} className="shrink-0" unoptimized />}
                {tag}
              </span>
            )
          })}
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
