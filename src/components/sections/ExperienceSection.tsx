'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { careerProfile } from '@/data/career-profile'
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion'

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

function ExperienceCard({ job }: { job: (typeof careerProfile.experience)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = usePrefersReducedMotion()

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
            {careerProfile.experience.map((job) => (
              <ExperienceCard key={`${job.company}-${job.period}`} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
