import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed photo — right half on desktop */}
      <div className="absolute inset-0 lg:left-[50%]">
        <Image
          src="/images/hero/profile.webp"
          alt="Pirun Kongsaeng"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Gradient fade: left edge blends into dark bg on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent lg:block hidden" />
        {/* Gradient: mobile — left coverage for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/92 via-bg/65 to-bg/20 lg:hidden" />
        {/* Gradient: mobile — top/bottom blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg/90 lg:hidden" />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-24 pt-28 md:py-32 md:pt-36">
        <div className="max-w-lg">
          <div className="w-8 h-0.5 bg-accent mb-6" />
          <p className="text-xs uppercase tracking-widest text-accent mb-4">Web Developer · Bangkok</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-tight mb-6">
            Pirun<br />Kongsaeng
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-md leading-relaxed">
            I build fast, SEO-strong websites for clients in Thailand, Australia, and the UK.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/#works" className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                View Work
              </Link>
              <Link href="/#contact" className="px-6 py-3 border border-border text-text-muted hover:text-text hover:border-accent/50 rounded-lg transition-colors">
                Contact
              </Link>
            </div>
            <Link href="/#experience" className="text-sm text-text-muted hover:text-text underline underline-offset-4 transition-colors w-fit">
              View Experience ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
