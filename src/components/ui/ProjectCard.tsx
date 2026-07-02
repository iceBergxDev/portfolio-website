'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Project } from '@/types/project'
import { getTagLogo } from '@/lib/tech-logos'

interface ProjectCardProps {
  project: Project
  sizes?: string
  headingLevel?: 'h2' | 'h3'
}

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 33vw', headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-surface-2 rounded-xl overflow-hidden border border-border group hover:border-accent/30 transition-colors duration-300"
    >
      {!prefersReducedMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), color-mix(in srgb, var(--color-accent) 15%, transparent), transparent 80%)',
          }}
        />
      )}
      <div className={`relative h-48 overflow-hidden flex items-center justify-center ${project.coverStyle === 'logo' ? 'bg-white p-8' : 'bg-surface'}`} style={{ viewTransitionName: `project-cover-${project.slug}` }}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className={project.coverStyle === 'logo' ? 'object-contain p-8' : 'object-cover group-hover:scale-105 transition-transform duration-500'}
          sizes={sizes}
        />
      </div>
      <div className="relative p-5">
        <Heading className="font-bold text-text mb-2 group-hover:text-accent transition-colors">{project.title}</Heading>
        <p className="text-sm text-text-muted mb-4 leading-relaxed">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => {
            const logo = getTagLogo(tag)
            return (
              <motion.span
                key={tag}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
              >
                {logo && <Image src={logo} alt={tag} width={12} height={12} className="shrink-0" unoptimized />}
                {tag}
              </motion.span>
            )
          })}
        </div>
        {project.hasCaseStudy && (
          <Link
            href={`/case-study/${project.slug}`}
            className="inline-block text-sm text-accent hover:text-accent-hover font-medium transition-transform duration-200 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            View Case Study →
          </Link>
        )}
      </div>
    </div>
  )
}
