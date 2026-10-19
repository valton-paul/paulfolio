import { onMounted, ref } from 'vue'

import type { ThemeName } from '@/types'

const THEMES: ThemeName[] = ['dark', 'light', 'matrix']

const theme = ref<ThemeName>('dark')

function isTheme(value: string): value is ThemeName {
  return THEMES.includes(value as ThemeName)
}

function apply(next: ThemeName) {
  theme.value = next
  document.documentElement.dataset.theme = next
}

export function useTheme() {
  onMounted(() => {
    localStorage.removeItem('paulfolio-theme')
    apply('dark')
  })

  return {
    theme,
    themes: THEMES,
    apply,
    isTheme,
  }
}
