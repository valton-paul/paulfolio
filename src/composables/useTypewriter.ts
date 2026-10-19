import { onMounted, onUnmounted, ref } from 'vue'

import { TYPEWRITER_PHRASES } from '@/data/content'

import { prefersReducedMotion } from './useMotion'

export function useTypewriter() {
  const text = ref(TYPEWRITER_PHRASES[0] ?? '')
  let timer = 0

  onMounted(() => {
    if (prefersReducedMotion()) {
      let index = 0
      const rotate = () => {
        index = (index + 1) % TYPEWRITER_PHRASES.length
        text.value = TYPEWRITER_PHRASES[index] ?? TYPEWRITER_PHRASES[0] ?? ''
        timer = window.setTimeout(rotate, 2800)
      }
      timer = window.setTimeout(rotate, 2800)
      return
    }

    let phraseIndex = 0
    let cursor = 0
    let deleting = false

    const tick = () => {
      const phrase = TYPEWRITER_PHRASES[phraseIndex] ?? ''
      text.value = phrase.slice(0, cursor)
      if (!deleting && cursor === phrase.length) {
        deleting = true
        timer = window.setTimeout(tick, 1400)
        return
      }
      if (deleting && cursor === 0) {
        deleting = false
        phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length
      }
      cursor += deleting ? -1 : 1
      timer = window.setTimeout(tick, deleting ? 25 : 55)
    }

    text.value = ''
    tick()
  })

  onUnmounted(() => window.clearTimeout(timer))

  return { text }
}
