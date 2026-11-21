export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Animation delay - capped under prefers-reduced-motion. */
export function sleep(ms: number): Promise<void> {
  const duration = prefersReducedMotion() ? Math.min(ms, 40) : ms
  return new Promise((resolve) => setTimeout(resolve, duration))
}

/** Narrative delay (dialogue, reading time) - never clamped by reduced-motion. */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)))
}
