import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed photo — right half on desktop */}
      <div className="absolute inset-0 lg:left-[50%]">
        <Image
          src="/image/IMG_4277.webp"
          alt="Pirun Kongsaeng"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Gradient fade: left edge blends into dark bg on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent lg:block hidden" />
        {/* Gradient fade: top + bottom on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-transparent to-bg/90 lg:hidden" />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-32 pt-36">
        <div className="max-w-lg">
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
      </div>
    </section>
  )
}
