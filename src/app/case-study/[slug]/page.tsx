import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageTransition from '@/components/layout/PageTransition'
import { caseStudies, getCaseStudyBySlug } from '@/data/case-studies'
import { getTagLogo } from '@/lib/tech-logos'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title: `${cs.title} | Pirun Kongsaeng`,
    description: cs.shortDescription,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()

  return (
    <PageTransition>
      <div className="pt-20 pb-20 md:pt-28 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/projects" className="text-sm text-text-muted hover:text-accent transition-colors mb-8 inline-block">
            ← All Projects
          </Link>

          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {cs.tags.map((tag) => {
                const logo = getTagLogo(tag)
                return (
                  <span key={tag} className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {logo && <Image src={logo} alt={tag} width={12} height={12} className="shrink-0" unoptimized />}
                    {tag}
                  </span>
                )
              })}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{cs.title}</h1>
            <p className="text-text-muted text-lg mb-6">{cs.shortDescription}</p>
            <div className="flex flex-wrap gap-6 text-sm text-text-muted">
              <span><span className="text-text font-medium">Client:</span> {cs.client}</span>
              <span><span className="text-text font-medium">Year:</span> {cs.year}</span>
              <span><span className="text-text font-medium">Role:</span> {cs.role}</span>
              <span><span className="text-text font-medium">Country:</span> {cs.country}</span>
            </div>
          </div>

          <div className={`relative h-72 md:h-96 rounded-xl overflow-hidden mb-16 flex items-center justify-center ${cs.coverStyle === 'logo' ? 'bg-white p-12' : 'bg-surface'}`}>
            <Image
              src={cs.coverImage}
              alt={cs.title}
              fill
              className={cs.coverStyle === 'logo' ? 'object-contain p-12' : 'object-cover'}
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">Challenge</h2>
              <p className="text-text-muted leading-relaxed">{cs.challenge}</p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent mb-3">Solution</h2>
              <p className="text-text-muted leading-relaxed">{cs.solution}</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-widest text-accent mb-8">What I Built</h2>
            <div className="space-y-12">
              {cs.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {feature.image && (
                    <div className="relative h-52 rounded-xl overflow-hidden bg-surface">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 448px"
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
                  <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {cs.liveUrl && (
            <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors">
              View Live Site →
            </a>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
