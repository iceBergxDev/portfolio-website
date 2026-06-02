'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? 'bg-bg/95 backdrop-blur border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" onClick={close} className="flex items-center gap-2">
            <div className="px-1.5 py-0.5 rounded border border-accent bg-accent/10 font-mono text-xs font-bold text-accent tracking-tight">{'</>'}</div>
            <span className="text-lg font-bold tracking-tight text-text">Pirun</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#works" className="text-sm text-text-muted hover:text-text transition-colors">Work</Link>
            <Link href="/#about" className="text-sm text-text-muted hover:text-text transition-colors">About</Link>
            <Link href="/projects" className="text-sm text-text-muted hover:text-text transition-colors">Projects</Link>
            <Link href="/#contact" className="text-sm text-text-muted hover:text-text transition-colors">Contact</Link>
          </nav>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          >
            <span className={`block w-5 h-0.5 bg-text transition-transform duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text transition-transform duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-bg/60 backdrop-blur-sm" onClick={close} />
        {/* Panel */}
        <nav className={`absolute top-[61px] left-0 right-0 bg-bg border-b border-border px-6 py-8 flex flex-col gap-6 transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-4'}`}>
          <Link href="/#works" onClick={close} className="text-xl font-medium text-text-muted hover:text-text transition-colors">Work</Link>
          <Link href="/#about" onClick={close} className="text-xl font-medium text-text-muted hover:text-text transition-colors">About</Link>
          <Link href="/projects" onClick={close} className="text-xl font-medium text-text-muted hover:text-text transition-colors">Projects</Link>
          <Link href="/#contact" onClick={close} className="text-xl font-medium text-text-muted hover:text-text transition-colors">Contact</Link>
        </nav>
      </div>
    </>
  )
}
