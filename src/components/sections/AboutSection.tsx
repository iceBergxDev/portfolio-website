import Link from 'next/link'

export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-12">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-text-muted leading-relaxed mb-4">
              4+ years across WordPress, React, and Next.js — from Elementor builds and custom PHP plugins to full-stack apps with Shopify API integration. I work directly with agencies and clients in Australia, Thailand, and the UK.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              I came to code from aircraft maintenance — a field where a missed detail isn&apos;t an option. That precision is how I approach every build: tested, documented, and made to last.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              I use AI tools (Claude, Cursor) for faster research, code reviews, and iteration — they handle the repetitive parts so I can spend more time on the parts that need actual judgement.
            </p>
            <Link href="/#experience" className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-2 border border-border text-text hover:border-accent/50 rounded-lg transition-colors text-sm font-medium">
              View Experience →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-text mb-3">Experience</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>Web Developer</li>
                <li>UX / UI Designer</li>
                <li>Web Master / IT Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text mb-3">Skills</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>WordPress & WooCommerce</li>
                <li>Shopify & PHP</li>
                <li>HTML, CSS, JavaScript, TypeScript</li>
                <li>React & Next.js</li>
                <li>Tailwind CSS</li>
                <li>SEO & Google Analytics</li>
                <li>REST API Integration</li>
                <li>Git & Version Control</li>
                <li>Claude & AI Dev Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
