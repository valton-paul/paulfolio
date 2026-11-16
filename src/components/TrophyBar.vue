<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import { useFolio } from '@/composables/useFolio'

const { trophies, unlocked } = useFolio()
</script>

<template>
  <div class="trophies" aria-label="succès">
    <span
      v-for="trophy in trophies"
      :key="trophy.id"
      class="tr"
      :class="{ on: unlocked.includes(trophy.id) }"
    >
      <AppIcon :name="trophy.icon" :size="14" />
      {{ trophy.label }}
    </span>
  </div>
</template>
