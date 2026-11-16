<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import { useFolio } from '@/composables/useFolio'
import type { IconName } from '@/types'

const { stages, done, busy, runningIndex, run } = useFolio()

function iconFor(index: number): IconName {
  if (runningIndex.value === index) return 'loader'
  if (index < done.value) return 'check'
  if (index > done.value) return 'lock'
  return stages[index]?.icon ?? 'lock'
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
      <span class="ic" :class="{ spin: runningIndex === index }">
        <AppIcon :name="iconFor(index)" :size="16" />
      </span>
      <b>{{ stage.name }}</b>
      <small>{{ stage.description }}</small>
    </button>
  </div>
</template>
