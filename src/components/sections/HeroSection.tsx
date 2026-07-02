'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number]
const TAGLINE = 'I build fast, SEO-strong websites for clients in Thailand, Australia, and the UK.'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

function TypewriterTagline() {
  const shouldReduceMotion = useReducedMotion()
  const [typedChars, setTypedChars] = useState(0)

  // Reduced motion: skip the interval entirely and derive the final state
  // directly during render instead of forcing it via setState in an effect.
  const visibleChars = shouldReduceMotion ? TAGLINE.length : typedChars
  const done = shouldReduceMotion ? true : typedChars >= TAGLINE.length

  useEffect(() => {
    if (shouldReduceMotion) return

    let i = 0
    const interval = setInterval(() => {
      i += 1
      setTypedChars(i)
      if (i >= TAGLINE.length) clearInterval(interval)
    }, 25)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <span className="font-mono">
      {TAGLINE.slice(0, visibleChars)}
      {!shouldReduceMotion && (
        <span
          className={`inline-block w-[0.5em] h-[1em] -mb-[0.15em] ml-0.5 bg-accent ${done ? 'animate-caret-blink' : ''}`}
          aria-hidden="true"
        />
      )}
    </span>
  )
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
          <motion.div variants={item} className="w-8 h-0.5 bg-accent mb-6" />
          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-tight mb-6"
          >
            Pirun<br />Kongsaeng
          </motion.h1>
          <motion.p
            variants={item}
            className="text-text-muted text-lg mb-8 max-w-md leading-relaxed"
          >
            <TypewriterTagline />
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Link
              href="/#works"
              className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              View Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
