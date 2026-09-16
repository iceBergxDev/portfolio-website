'use client'

import { useSyncExternalStore } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribe(onPreferenceChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery)
  mediaQuery.addEventListener('change', onPreferenceChange)

  return () => mediaQuery.removeEventListener('change', onPreferenceChange)
}

function getSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches
}

function getServerSnapshot() {
  return false
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
