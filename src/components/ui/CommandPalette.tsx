'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { caseStudies } from '@/data/case-studies'

type Command = {
  id: string
  label: string
  group: 'Navigate' | 'Case Studies'
  action: () => void
}

const navCommands: Omit<Command, 'action'>[] = [
  { id: 'nav-work', label: 'Work', group: 'Navigate' },
  { id: 'nav-about', label: 'About', group: 'Navigate' },
  { id: 'nav-experience', label: 'Experience', group: 'Navigate' },
  { id: 'nav-projects', label: 'Projects', group: 'Navigate' },
  { id: 'nav-contact', label: 'Contact', group: 'Navigate' },
]

const navHrefs: Record<string, string> = {
  'nav-work': '/#works',
  'nav-about': '/#about',
  'nav-experience': '/#experience',
  'nav-projects': '/projects',
  'nav-contact': '/#contact',
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [rawActiveIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navCommands.map((c) => ({
      ...c,
      action: () => router.push(navHrefs[c.id]),
    }))
    const studies: Command[] = caseStudies.map((cs) => ({
      id: `case-${cs.slug}`,
      label: cs.title,
      group: 'Case Studies',
      action: () => router.push(`/case-study/${cs.slug}`),
    }))
    return [...nav, ...studies]
  }, [router])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [commands, query])

  // Rather than resetting activeIndex via an effect keyed on `query`, derive
  // the displayed active index at render time — clamped to the current
  // filtered list. This naturally "resets" to a valid item whenever the
  // query changes and the list shrinks, with no extra render/effect needed.
  const activeIndex = filtered.length === 0 ? 0 : Math.min(rawActiveIndex, filtered.length - 1)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (isToggle) {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
      }
    }
  }, [open])

  const runCommand = useCallback(
    (cmd: Command) => {
      cmd.action()
      close()
    },
    [close]
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const cmd = filtered[activeIndex]
        if (cmd) runCommand(cmd)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, filtered, activeIndex, runCommand])

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close()
  }

  let runningIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-bg/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={onBackdropClick}
        >
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-text-muted shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or case study..."
                className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
              />
              <kbd className="hidden sm:inline text-[10px] text-text-muted border border-border rounded px-1.5 py-0.5 shrink-0">Esc</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm text-text-muted text-center">No matching commands.</p>
              )}

              {(['Navigate', 'Case Studies'] as const).map((group) => {
                const groupItems = filtered.filter((c) => c.group === group)
                if (groupItems.length === 0) return null
                return (
                  <div key={group} className="mb-2 last:mb-0">
                    <p className="px-4 pb-1 pt-2 text-[10px] uppercase tracking-widest text-accent">{group}</p>
                    {groupItems.map((cmd) => {
                      runningIndex += 1
                      const isActive = runningIndex === activeIndex
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          onClick={() => runCommand(cmd)}
                          onMouseEnter={() => setActiveIndex(runningIndex)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            isActive ? 'bg-accent/10 text-text' : 'text-text-muted hover:bg-surface-2'
                          }`}
                        >
                          {cmd.label}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
