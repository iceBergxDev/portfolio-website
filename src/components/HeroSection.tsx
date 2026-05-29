import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <div>
          <div className="w-8 h-0.5 bg-accent mb-6" />
          <p className="text-xs uppercase tracking-widest text-accent mb-4">Web Developer · Bangkok</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-tight mb-6">
            Pirun<br />Kongsaeng
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-md leading-relaxed">
            I build fast, SEO-strong websites for clients in Thailand, Australia, and the UK.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link href="/#works" className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors">
              View Work
            </Link>
            <Link href="/#contact" className="px-6 py-3 border border-border text-text-muted hover:text-text hover:border-accent/50 rounded-lg transition-colors">
              Contact
            </Link>
          </div>
          <a href="/Resume-Pirun-Kongsaeng.pdf" download className="text-sm text-text-muted hover:text-accent transition-colors">
            or download my resume (PDF) →
          </a>
        </div>
        <div className="relative h-80 lg:h-[520px] rounded-2xl overflow-hidden">
          <Image
            src="/image/IMG_4277.webp"
            alt="Pirun Kongsaeng"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}
