'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import type { PointerEvent } from 'react'
import { Project } from '@/types/project'
import { getTagLogo } from '@/lib/tech-logos'
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion'

interface ProjectCardProps {
  project: Project
  sizes?: string
  headingLevel?: 'h2' | 'h3'
  variant?: 'featured' | 'supporting'
}

export default function ProjectCard({
  project,
  sizes = '(max-width: 768px) 100vw, 33vw',
  headingLevel = 'h3',
  variant = 'supporting',
}: ProjectCardProps) {
  const Heading = headingLevel
  const isFeatured = variant === 'featured'
  const visibleTags = project.tags.slice(0, 3)
  const actionLabel = project.hasCaseStudy ? 'View case study' : 'View project details'
  const isContainedCover = project.coverFit === 'contain'
  const prefersReducedMotion = usePrefersReducedMotion()
  const hasSharedCover = !project.heroImage || project.heroImage === project.coverImage

  function updatePointerSpotlight(event: PointerEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  const cover = (
    <div
      className={`relative aspect-[16/10] overflow-hidden ${isContainedCover ? 'bg-white p-8 sm:p-10' : 'bg-surface'}`}
    >
      <Image
        src={project.coverImage}
        alt={project.coverAlt}
        fill
        className={isContainedCover ? 'object-contain' : 'object-cover'}
        style={{ objectPosition: project.coverPosition ?? 'center center' }}
        sizes={sizes}
      />
    </div>
  )

  return (
    <article data-project-card={project.slug} className="h-full">
      <Link
        href={`/case-study/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        onPointerMove={updatePointerSpotlight}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 transition-[border-color,box-shadow] duration-200 hover:border-accent/50 hover:shadow-2xl hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
      >
        {!prefersReducedMotion && (
          <span
            data-pointer-spotlight
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background: 'radial-gradient(420px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(251, 191, 36, 0.14), transparent 68%)',
            }}
          />
        )}

        {hasSharedCover ? (
          <ViewTransition
            name={`project-cover-${project.slug}`}
            share="project-cover-morph"
            default="none"
          >
            {cover}
          </ViewTransition>
        ) : cover}

        <div className={`flex flex-1 flex-col ${isFeatured ? 'p-6 md:p-7' : 'p-5'}`}>
          <p className="mb-3 flex flex-wrap items-center gap-x-2 text-xs text-text-muted">
            <span className="font-medium text-accent">{project.status}</span>
            {project.year && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </>
            )}
          </p>

          <Heading className={`${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'} mb-3 font-bold tracking-tight text-text transition-colors duration-200 group-hover:text-accent`}>
            {project.title}
          </Heading>
          <p className={`${isFeatured ? 'text-[15px]' : 'text-sm'} mb-5 leading-relaxed text-text-muted`}>
            {project.shortDescription}
          </p>

          <div data-project-tags className="mb-5 mt-auto flex flex-wrap gap-2">
            {visibleTags.map((tag) => {
              const logo = getTagLogo(tag)
              return (
                <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-1 text-xs text-accent">
                  {logo && <Image src={logo} alt="" aria-hidden="true" width={12} height={12} className="shrink-0" unoptimized />}
                  {tag}
                </span>
              )
            })}
          </div>

          <span className="text-sm font-medium text-accent transition-colors duration-200 group-hover:text-accent-hover">
            {actionLabel} <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
