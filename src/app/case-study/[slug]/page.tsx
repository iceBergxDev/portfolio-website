import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ViewTransition } from 'react'
import PageTransition from '@/components/layout/PageTransition'
import { getProjectDetailBySlug, projectDetails } from '@/data/case-studies'
import { getTagLogo } from '@/lib/tech-logos'
import StatCounter from '@/components/ui/StatCounter'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projectDetails.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getProjectDetailBySlug(slug)
  if (!cs) return {}
  return {
    title: `${cs.title} | Pirun Kongsaeng`,
    description: cs.shortDescription,
    alternates: {
      canonical: `/case-study/${cs.slug}`,
    },
    openGraph: {
      title: `${cs.title} | Pirun Kongsaeng`,
      description: cs.shortDescription,
      url: `/case-study/${cs.slug}`,
      images: [
        {
          url: cs.heroImage ?? cs.coverImage,
          alt: cs.heroAlt ?? cs.coverAlt,
        },
      ],
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = getProjectDetailBySlug(slug)
  if (!cs) notFound()

  const currentIndex = projectDetails.findIndex((project) => project.slug === slug)
  const nextProject = projectDetails[(currentIndex + 1) % projectDetails.length]
  const hasSharedCover = !cs.heroImage || cs.heroImage === cs.coverImage
  const hero = (
    <div
      className={`relative overflow-hidden rounded-2xl bg-surface mb-16 ${cs.heroAspect === 'wide' ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}
    >
      <Image
        src={cs.heroImage ?? cs.coverImage}
        alt={cs.heroAlt ?? cs.coverAlt}
        fill
        className="object-cover"
        style={{ objectPosition: cs.heroPosition ?? cs.coverPosition ?? 'center center' }}
        sizes="(max-width: 1024px) 100vw, 896px"
        priority
        unoptimized
      />
    </div>
  )

  return (
    <PageTransition>
      <ScrollProgressBar />
      <div className="pt-20 pb-20 md:pt-28 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/projects" className="text-sm text-text-muted hover:text-accent transition-colors mb-8 inline-block">
            ← All projects
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{cs.title}</h1>
            <p className="text-text-muted text-lg mb-6">{cs.shortDescription}</p>
            <div className="flex flex-wrap gap-6 text-sm text-text-muted mb-6">
              <span><span className="text-text font-medium">Client:</span> {cs.client}</span>
              <span><span className="text-text font-medium">Status:</span> {cs.status}</span>
              {cs.year && <span><span className="text-text font-medium">Year:</span> {cs.year}</span>}
              <span><span className="text-text font-medium">Role:</span> {cs.role}</span>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Technologies used">
              {cs.tags.map((tag) => {
                const logo = getTagLogo(tag)
                return (
                  <span key={tag} className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {logo && <Image src={logo} alt="" aria-hidden="true" width={12} height={12} className="shrink-0" unoptimized />}
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>

          {hasSharedCover ? (
            <ViewTransition
              name={`project-cover-${cs.slug}`}
              share="project-cover-morph"
              default="none"
            >
              {hero}
            </ViewTransition>
          ) : hero}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">What was needed</h2>
              <p className="text-text-muted leading-relaxed">{cs.challenge}</p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">What I worked on</h2>
              <p className="text-text-muted leading-relaxed">{cs.responsibility}</p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">What I changed</h2>
              <p className="text-text-muted leading-relaxed">{cs.solution}</p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">How I checked it</h2>
              <p className="text-text-muted leading-relaxed">{cs.verification}</p>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">Where it stands</h2>
              <p className="text-text-muted leading-relaxed">{cs.result}</p>
            </div>
            {cs.boundary && (
              <div className="md:col-span-2 rounded-xl border border-accent/30 bg-accent/5 p-5">
                <h2 className="text-sm uppercase tracking-widest text-accent mb-3">Limits</h2>
                <p className="text-text-muted leading-relaxed">{cs.boundary}</p>
              </div>
            )}
          </div>

          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-widest text-accent mb-8">How it works</h2>
            <div className="space-y-12">
              {cs.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {feature.image && (
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 448px"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className={feature.image ? '' : 'md:col-span-2'}>
                    <h3 className="font-bold text-text mb-3">{feature.title}</h3>
                    <p className="text-text-muted leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {cs.stats && cs.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {cs.stats.map((stat) => (
                <div key={stat.label} className="bg-surface-2 rounded-xl p-5 border border-border text-center">
                  <div className="text-2xl font-bold text-accent mb-1">
                    <StatCounter value={stat.value} />
                  </div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {cs.liveUrl && (
            <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors">
              Visit live site →
            </a>
          )}

          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href={`/case-study/${nextProject.slug}`}
              className="group flex items-center justify-between gap-4 bg-surface-2 rounded-xl p-6 border border-border hover:border-accent transition-colors"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-2">Next project</div>
                <div className="font-bold text-text group-hover:text-accent transition-colors">{nextProject.title}</div>
              </div>
              <span className="text-accent text-xl shrink-0 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
