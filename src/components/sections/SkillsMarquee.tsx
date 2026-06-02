import Image from 'next/image'

const SVG_BASE = 'https://thesvg.org/icons'

const skills = [
  { name: 'WordPress',   slug: 'wordpress' },
  { name: 'WooCommerce', slug: 'woocommerce',  invert: true },
  { name: 'Shopify',     slug: 'shopify' },
  { name: 'PHP',         slug: 'php' },
  { name: 'React',       slug: 'react' },
  { name: 'Next.js',     slug: 'nextdotjs' },
  { name: 'TypeScript',  slug: 'typescript' },
  { name: 'JavaScript',  slug: 'javascript' },
  { name: 'HTML5',       slug: 'html5' },
  { name: 'CSS3',        slug: 'css3' },
  { name: 'Tailwind',    slug: 'tailwind-css' },
  { name: 'MySQL',       slug: 'mysql' },
  { name: 'Git',         slug: 'git' },
  { name: 'GitHub',      slug: 'github',       invert: true },
  { name: 'Figma',       slug: 'figma' },
  { name: 'Elementor',   slug: 'elementor' },
  { name: 'Claude',      slug: 'claude' },
  { name: 'Cursor',      slug: 'cursor' },
]

const doubled = [...skills, ...skills]

export default function SkillsMarquee() {
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-accent">Skills & Technologies</p>
      </div>
      <div className="marquee-container">
        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((skill, i) => (
            <div key={`${skill.slug}-${i}`} className="flex flex-col items-center gap-2 min-w-[72px]">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src={`${SVG_BASE}/${skill.slug}/default.svg`}
                  alt={skill.name}
                  width={40}
                  height={40}
                  style={{ width: 40, height: 40, objectFit: 'contain' }}
                  className={skill.invert ? 'invert' : ''}
                  unoptimized
                />
              </div>
              <span className="text-xs text-text-muted whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
