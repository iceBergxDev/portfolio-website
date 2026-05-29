export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-widest text-accent mb-4">About</p>
        <h2 className="text-3xl font-bold tracking-tight mb-12">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-text-muted leading-relaxed mb-4">
              Web Developer with 5+ years building fast, SEO-optimised websites for clients in Thailand, Australia, and the UK. I specialise in WordPress and frontend development — from design to e-commerce and analytics setup.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              I came to code from aircraft maintenance — a field where a missed detail isn&apos;t an option. That precision is how I approach every build: tested, documented, and made to last.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              Currently expanding into full-stack development with React and Next.js.
            </p>
            <a href="/Resume-Pirun-Kongsaeng.pdf" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-2 border border-border text-text hover:border-accent/50 rounded-lg transition-colors text-sm font-medium">
              ↓ Download Resume
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8">
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
                <li>HTML, CSS, JavaScript</li>
                <li>React & Next.js</li>
                <li>Tailwind & Bootstrap</li>
                <li>SEO & Google Analytics</li>
                <li>REST API Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
