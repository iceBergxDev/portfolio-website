import Image from 'next/image'
import ContactForm from '@/components/sections/ContactForm'

const SVG_BASE = 'https://thesvg.org/icons'

const contacts = [
  {
    label: 'Email',
    value: 'pirun.ks@gmail.com',
    href: 'mailto:pirun.ks@gmail.com',
    slug: 'gmail',
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'Pirun Kongsaeng',
    href: 'https://www.linkedin.com/in/icebergx/',
    slug: 'linkedin',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/iceBergxDev',
    href: 'https://github.com/iceBergxDev',
    slug: 'github',
    external: true,
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch</h2>
        <p className="text-text-muted mb-12 max-w-md">
          Available for freelance projects and full-time roles. Based in Bangkok — working remotely worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Direct contact channels */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-6">Direct Contact</h3>
            <div className="space-y-5">
              {contacts.map(({ label, value, href, slug, external }) => (
                <a
                  key={slug}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-0.5 w-5 h-5 shrink-0 flex items-center justify-center">
                    <Image
                      src={`${SVG_BASE}/${slug}/default.svg`}
                      alt={label}
                      width={20}
                      height={20}
                      className="opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-muted mb-1">{label}</p>
                    <p className="text-text group-hover:text-accent transition-colors text-sm">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-6">Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
