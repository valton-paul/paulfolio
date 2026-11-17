<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

import { prefersReducedMotion } from '@/composables/useMotion'

const props = defineProps<{
  text: string
  side?: 'left' | 'right' | 'center'
  speaker?: 'rh' | 'cto' | 'narrator'
  speedScale?: number
}>()

const emit = defineEmits<{
  typed: []
}>()

const displayed = ref('')
const visible = ref(false)
let timer = 0
let generation = 0

function clear() {
  window.clearTimeout(timer)
}

function typeText(full: string, gen: number) {
  clear()
  displayed.value = ''
  visible.value = true

  if (!full.trim()) {
    emit('typed')
    return
  }

  if (prefersReducedMotion()) {
    displayed.value = full
    emit('typed')
    return
  }

  const scale = Math.max(0.5, props.speedScale ?? 1)
  const stepMs = Math.max(12, 28 / scale)
  let i = 0

  const tick = () => {
    if (gen !== generation) return
    i += 1
    displayed.value = full.slice(0, i)
    if (i >= full.length) {
      emit('typed')
      return
    }
    timer = window.setTimeout(tick, stepMs)
  }

  timer = window.setTimeout(tick, stepMs)
}

watch(
  () => [props.text, props.speedScale] as const,
  ([text]) => {
    generation += 1
    const gen = generation
    if (!text.trim()) {
      visible.value = false
      displayed.value = ''
      return
    }
    typeText(text, gen)
  },
  { immediate: true },
)

onUnmounted(() => {
  generation += 1
  clear()
})
</script>

<template>
  <Transition name="bubble">
    <div
      v-if="visible && text.trim()"
      class="speech-bubble"
      :class="[side ?? 'center', speaker ? `speaker-${speaker}` : '']"
      role="status"
      aria-live="polite"
    >
      <p>{{ displayed }}<span v-if="displayed.length < text.length" class="bubble-caret" /></p>
    </div>
  </Transition>
</template>
