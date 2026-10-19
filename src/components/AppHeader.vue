<script setup lang="ts">
import { useFolio } from '@/composables/useFolio'

const { badgeText, pipelineSuccess } = useFolio()
</script>

<template>
  <header class="folio-header">
    <div class="logo">my<b>Paul</b>Folio<span class="mu"> ~/pipeline</span></div>
    <div class="badge" :class="{ ok: pipelineSuccess }">
      <i></i>
      <span>{{ badgeText }}</span>
    </div>
  </header>
</template>
