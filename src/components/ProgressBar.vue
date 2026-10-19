<script setup lang="ts">
import { useFolio } from '@/composables/useFolio'

const { progress } = useFolio()
</script>

<template>
  <div class="bar" aria-hidden="true">
    <div :style="{ width: `${progress}%` }"></div>
  </div>
</template>
