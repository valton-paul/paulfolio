<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

import { useFolio } from '@/composables/useFolio'

const { logs } = useFolio()
const scroller = ref<HTMLElement | null>(null)

watch(
  logs,
  async () => {
    await nextTick()
    if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
  },
  { deep: true },
)
</script>

<template>
  <div class="panel">
    <div class="ph">
      <span>● ● ●  ci-runner@paul</span>
      <span>logs</span>
    </div>
    <div ref="scroller" class="log" role="log" aria-live="polite">
      <div v-for="line in logs" :key="line.id" :class="line.tone">{{ line.text }}</div>
    </div>
  </div>
</template>
