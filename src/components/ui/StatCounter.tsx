'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface StatCounterProps {
  value: string
}

const PURE_NUMBER = /^\d+$/

export default function StatCounter({ value }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const isNumeric = PURE_NUMBER.test(value.trim())
  const target = isNumeric ? parseInt(value, 10) : 0

  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toString())

  useEffect(() => {
    if (isNumeric && isInView) {
      const controls = animate(count, target, {
        duration: 1.2,
        ease: 'easeOut',
      })
      return () => controls.stop()
    }
  }, [isInView, isNumeric, target, count])

  if (!isNumeric) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {value}
      </motion.div>
    )
  }

  return (
    <div ref={ref}>
      <motion.span>{rounded}</motion.span>
    </div>
  )
}
