import Image from 'next/image'
import Link from 'next/link'

const SVG_BASE = 'https://thesvg.org/icons'

const socials = [
  { label: 'GitHub',   slug: 'github',   href: 'https://github.com/iceBergxDev',                        external: true },
  { label: 'LinkedIn', slug: 'linkedin', href: 'https://www.linkedin.com/in/icebergx/', external: true },
  { label: 'Gmail',    slug: 'gmail',    href: 'mailto:pirun.ks@gmail.com',                              external: false },
]

const navLinks = [
  { label: 'Work',     href: '/#works' },
  { label: 'Projects', href: '/projects' },
  { label: 'About',    href: '/#about' },
  { label: 'Contact',  href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand + nav */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="px-1.5 py-0.5 rounded border border-accent bg-accent/10 font-mono text-xs font-bold text-accent tracking-tight">{'</>'}</div>
              <span className="text-base font-bold tracking-tight text-text">Pirun</span>
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <Link key={label} href={href} className="text-sm text-text-muted hover:text-accent transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials + copyright */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-5">
              {socials.map(({ label, slug, href, external }) => (
                <a
                  key={slug}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors group"
                >
                  <Image
                    src={`${SVG_BASE}/${slug}/default.svg`}
                    alt={label}
                    width={16}
                    height={16}
                    className="opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200"
                    unoptimized
                  />
                  {label}
                </a>
              ))}
            </div>
            <p className="text-sm text-text-muted">© {new Date().getFullYear()} Pirun Kongsaeng</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
