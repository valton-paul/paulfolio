export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function sleep(ms: number): Promise<void> {
  const duration = prefersReducedMotion() ? Math.min(ms, 40) : ms
  return new Promise((resolve) => setTimeout(resolve, duration))
}
