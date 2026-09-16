import { careerProfile } from '@/data/career-profile'

const technologies: Record<string, readonly string[]> = {
  'WordPress websites': ['WordPress', 'PHP', 'Elementor', 'ACF'],
  'Online stores': ['WooCommerce', 'Shopify', 'Shopify Admin API'],
  'Custom web applications': ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
  'SEO and performance': ['Technical SEO', 'Web performance', 'Google Analytics 4'],
  'Live-site support': ['Git', 'Testing', 'Deployment checks', 'Rollback planning'],
}

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 id="capabilities-heading" className="text-3xl font-bold tracking-tight mb-12">
          What I work on
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerProfile.capabilities.map((capability) => (
            <article key={capability.title} className="rounded-xl border border-border bg-bg p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-text mb-3">{capability.title}</h3>
              <p className="text-text-muted leading-relaxed mb-6">{capability.description}</p>
              <ul aria-label={`Tools and practices for ${capability.title}`} className="flex flex-wrap gap-2">
                {technologies[capability.title]?.map((technology) => (
                  <li key={technology} className="rounded border border-border bg-surface-2 px-2.5 py-1 text-xs text-text-muted">
                    {technology}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
