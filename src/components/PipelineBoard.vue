<script setup lang="ts">
import { useFolio } from '@/composables/useFolio'

const { stages, done, busy, runningIndex, run } = useFolio()

function iconFor(index: number): string {
  if (runningIndex.value === index) return '⚙️'
  if (index < done.value) return '✅'
  if (index > done.value) return '🔒'
  return stages[index]?.icon ?? '🔒'
}
</script>

<template>
  <div class="pipe">
    <button
      v-for="(stage, index) in stages"
      :key="stage.id"
      class="st"
      :class="{
        done: index < done,
        next: index === done,
        run: runningIndex === index,
      }"
      :disabled="index > done || busy"
      type="button"
      @click="run(index)"
    >
      <span class="ic">{{ iconFor(index) }}</span>
      <b>{{ stage.name }}</b>
      <small>{{ stage.description }}</small>
    </button>
  </div>
</template>
