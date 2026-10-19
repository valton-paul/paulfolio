import { onMounted, onUnmounted } from 'vue'

import { KONAMI_SEQUENCE } from '@/data/content'

import { useFolio } from './useFolio'
import { useTheme } from './useTheme'

export function useKonami() {
  const { apply } = useTheme()
  const { confetti, trophy, log } = useFolio()
  let index = 0

  const onKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null
    if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return

    const expected = KONAMI_SEQUENCE[index]
    const matched = event.key === expected || event.key.toLowerCase() === expected
    index = matched ? index + 1 : 0

    if (index === KONAMI_SEQUENCE.length) {
      index = 0
      apply('matrix')
      confetti()
      trophy(3)
      trophy(5)
      log('🕹️ Konami code activé : mode Matrix', 'ok')
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
}
