'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const SVG_BASE = 'https://thesvg.org/icons'

const experiences = [
  {
    company: 'Entelech Digital',
    role: 'Senior Web Developer',
    period: 'February 2026 – Present',
    current: true,
    highlights: [
      'Build and maintain fast, mobile-responsive WordPress sites for clients in Australia, UK, and Thailand — from Elementor builds to custom PHP plugins from scratch',
      'Shipped a Shopify-embedded Next.js B2B portal for a US wholesale distributor — App Bridge SSO, draft order engine, and live Shopify Admin API integration',
      'Set up complete analytics stacks (GTM, GA4, Google Ads, Search Console) and technical SEO (schema markup, robots.txt, llms.txt) across all client sites',
      'Build custom Elementor templates and ACF field groups to match each client\'s workflow — including a from-scratch PHP 8 plugin (Foley Pre-Start fleet inspection system) for 41 drivers',
      'Deliver landing pages from Figma designs — responsive markup, image optimisation, and sub-2-second load times via NitroPack and SiteGround CDN',
    ],
    achievement: 'Shipped a full-stack Next.js + Shopify app to production for US retailers; brought key pages under 2s across AU/TH/UK client accounts',
    stack: [
      { name: 'WordPress', slug: 'wordpress' },
      { name: 'Shopify', slug: 'shopify' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'React', slug: 'react' },
      { name: 'PHP', slug: 'php' },
      { name: 'Tailwind CSS', slug: 'tailwind-css' },
      { name: 'Figma', slug: 'figma' },
      { name: 'GitHub', slug: 'github' },
    ],
  },
  {
    company: 'Geekster Digital Solution',
    role: 'WordPress Developer (WordPress & Frontend)',
    period: 'December 2024 – July 2025',
    highlights: [
      'Built WordPress sites for retail and service clients — WooCommerce stores, custom themes, and Zort API integration for automatic inventory sync',
      'Set up Google Tag Manager, Search Console, and GA4 for campaign tracking and SEO monitoring',
      'Integrated Brevo email marketing for automated lead follow-up',
      'Built multilingual sites (WPML, Polylang) for international clients',
    ],
    achievement: 'Launched 10+ WordPress websites across retail and service clients; automated order processing via WooCommerce–Zort API',
    stack: [
      { name: 'WordPress', slug: 'wordpress' },
      { name: 'WooCommerce', slug: 'woocommerce' },
      { name: 'PHP', slug: 'php' },
      { name: 'Elementor', slug: 'elementor' },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'Figma', slug: 'figma' },
      { name: 'GitHub', slug: 'github' },
    ],
  },
  {
    company: 'TMES Co., Ltd.',
    role: 'UX/UI Design / WordPress Developer',
    period: 'May 2024 – November 2024',
    highlights: [
      'Designed page layouts and user flows in Figma before building — sign-up flows, purchase paths, and contact forms',
      'Built responsive WordPress sites using Elementor Pro, handling revisions directly with clients',
      'Translated client briefs into functional builds across service, retail, and hospitality sectors',
    ],
    achievement: 'Redesigned 8+ client websites across Thailand — handled Figma to Elementor from brief to launch',
    stack: [
      { name: 'WordPress', slug: 'wordpress' },
      { name: 'Elementor', slug: 'elementor' },
      { name: 'Figma', slug: 'figma' },
    ],
  },
  {
    company: 'Thai Maritime Enforcement Command Center',
    role: 'Web Master / IT Support',
    period: 'October 2021 – May 2024',
    highlights: [
      "Maintained the organisation's WordPress website (updates, security, content management)",
      'Updated website design to meet government ITA compliance standards',
      'Managed server infrastructure for site stability and security',
      'Provided IT support: software installation, troubleshooting, system maintenance',
      'Set up and supported video conferencing systems',
    ],
    achievement: 'Maintained high website uptime and passed ITA compliance for 3 consecutive years',
    stack: [
      { name: 'WordPress', slug: 'wordpress' },
    ],
  },
  {
    company: 'Squadron 203, Wing 2, Royal Thai Naval Air Division',
    role: 'Aircraft Mechanic',
    period: 'April 2019 – October 2021',
    highlights: [
      'Performed line maintenance on engine and gearbox systems for Sikorsky S-76B and Super Lynx 200 helicopters',
      'Conducted inspections, troubleshooting, and repairs on powerplant and gearbox components',
      'Maintained and repaired all electrical and instrumentation systems related to the engines and main gearboxes',
    ],
    achievement: '',
    stack: [],
  },
]

const cardVariants = {
  hidden: { x: -16 },
  visible: { x: 0 },
}

const bulletVariants = {
  hidden: { x: -6 },
  visible: (i: number) => ({
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
}

function ExperienceCard({ job }: { job: typeof experiences[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sm:pl-10 relative"
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute left-0 top-2 -translate-x-[5px] hidden sm:flex items-center justify-center"
      >
        {job.current ? (
          <>
            <span className="w-3 h-3 rounded-full bg-accent block" />
            {!shouldReduceMotion && (
              <motion.span
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-3 h-3 rounded-full bg-accent"
              />
            )}
          </>
        ) : (
          <span className="w-2.5 h-2.5 rounded-full bg-border border-2 border-accent/40 block" />
        )}
      </motion.div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
        <h3 className="text-base font-semibold text-text leading-snug">{job.role}</h3>
        {job.current && (
          <span className="text-[10px] uppercase tracking-widest text-accent font-semibold border border-accent/30 rounded px-1.5 py-0.5 shrink-0">
            Current
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-medium text-accent">{job.company}</span>
        <span className="text-text-muted/40">·</span>
        <span className="text-xs text-text-muted">{job.period}</span>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5 mb-4">
        {job.highlights.map((point, j) => (
          <motion.li
            key={j}
            custom={j}
            variants={bulletVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-sm text-text-muted flex gap-2 leading-relaxed"
          >
            <span className="text-accent shrink-0 mt-0.5 select-none">›</span>
            {point}
          </motion.li>
        ))}
      </ul>

      {/* Tech stack logos */}
      {job.stack.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {job.stack.map((tech) => (
            <div key={tech.slug} title={tech.name} className="group relative">
              <Image
                src={`${SVG_BASE}/${tech.slug}/default.svg`}
                alt={tech.name}
                width={20}
                height={20}
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {/* Achievement */}
      {job.achievement && (
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-accent/5 border border-accent/20 rounded pl-3 py-1.5"
        >
          <p className="text-sm text-text-muted">{job.achievement}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true })

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold tracking-tight mb-16"
        >
          Work Experience
        </motion.h2>

        <div ref={lineRef} className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30 hidden sm:block" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-0 top-0 bottom-0 w-px bg-accent/40 hidden sm:block"
          />

          <div className="space-y-14">
            {experiences.map((job, i) => (
              <ExperienceCard key={i} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
