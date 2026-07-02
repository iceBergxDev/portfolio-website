'use client'

import { motion, useScroll } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-50 origin-left"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
    />
  )
}
