'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

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
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent lg:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/92 via-bg/70 to-bg/20 lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-transparent to-bg/90 lg:hidden" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-24 pt-28 md:py-32 md:pt-36">
        <motion.div
          className="max-w-lg"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={item} className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Pirun Kongsaeng
          </motion.p>
          <motion.h1
            variants={item}
            className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl"
          >Senior Web Developer in Bangkok</motion.h1>
          <motion.p
            variants={item}
            className="mb-8 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
          >
            I build new websites and fix the ones already in use. Most of my work is with WordPress, WooCommerce and Shopify. I also build Next.js applications, connect APIs and work on technical SEO and page speed.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Link
              href="/#works"
              className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              See my work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
