import { onMounted, onUnmounted, ref } from 'vue'

import { TYPEWRITER_PHRASES } from '@/data/content'

const TYPE_MS = 55
const DELETE_MS = 28
const HOLD_MS = 1600

export function useTypewriter() {
  const text = ref('')
  let timer = 0

  onMounted(() => {
    let phraseIndex = 0
    let cursor = 0
    let deleting = false

    const tick = () => {
      const phrase = TYPEWRITER_PHRASES[phraseIndex] ?? ''

      if (!deleting && cursor < phrase.length) {
        cursor += 1
        text.value = phrase.slice(0, cursor)
        timer = window.setTimeout(tick, TYPE_MS)
        return
      }

      if (!deleting && cursor === phrase.length) {
        deleting = true
        timer = window.setTimeout(tick, HOLD_MS)
        return
      }

      if (deleting && cursor > 0) {
        cursor -= 1
        text.value = phrase.slice(0, cursor)
        timer = window.setTimeout(tick, DELETE_MS)
        return
      }

      deleting = false
      phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length
      timer = window.setTimeout(tick, TYPE_MS)
    }

    tick()
  })

  onUnmounted(() => window.clearTimeout(timer))

  return { text }
}
