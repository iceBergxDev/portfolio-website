'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-text">
          Pirun<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/#works" className="text-sm text-text-muted hover:text-text transition-colors">Work</Link>
          <Link href="/#about" className="text-sm text-text-muted hover:text-text transition-colors">About</Link>
          <Link href="/#contact" className="text-sm text-text-muted hover:text-text transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
