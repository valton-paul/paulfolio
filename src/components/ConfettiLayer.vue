<script setup lang="ts">
import { useFolio } from '@/composables/useFolio'

const { confettiPieces } = useFolio()
</script>

<template>
  <i
    v-for="piece in confettiPieces"
    :key="piece.id"
    class="cf"
    :style="{
      left: `${piece.left}vw`,
      background: `hsl(${piece.hue}, 85%, 60%)`,
      animationDelay: `${piece.delay}s`,
    }"
  ></i>
</template>
