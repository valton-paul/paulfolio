<script setup lang="ts">
import { useFolio } from '@/composables/useFolio'

const { trophies, unlocked } = useFolio()
</script>

<template>
  <div class="trophies" aria-label="succès">
    <span
      v-for="(trophy, index) in trophies"
      :key="trophy.label"
      class="tr"
      :class="{ on: unlocked.includes(index) }"
    >
      {{ trophy.icon }} {{ trophy.label }}
    </span>
  </div>
</template>
