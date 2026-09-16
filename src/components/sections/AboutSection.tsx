import Link from 'next/link'

export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-12">About</h2>
        <div className="max-w-3xl">
          <p className="text-text-muted leading-relaxed mb-4">
            Most of my work starts in one of two ways: someone needs a new site, or something on a live site needs fixing. I work mostly with WordPress, WooCommerce and Shopify, and I use Next.js when a project needs a more custom application.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            Before moving into web development, I maintained aircraft engines and gearboxes. That work taught me to inspect first, trace a fault properly and check the result before signing off.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            I still work that way. I take backups, keep rollback steps ready and test the parts of a site that people actually use.
          </p>
          <Link href="/#experience" className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-2 border border-border text-text hover:border-accent/50 rounded-lg transition-colors text-sm font-medium">
            See my experience →
          </Link>
        </div>
      </div>
    </section>
  )
}
