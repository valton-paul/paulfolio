<script setup lang="ts">
import { useTypewriter } from '@/composables/useTypewriter'
import { PROFILE } from '@/data/content'

const { text } = useTypewriter()
</script>

<template>
  <section>
    <h1>
      Salut, je suis <span>{{ PROFILE.fullName }}</span>.<br />
      Lance le pipeline pour me découvrir.
    </h1>
    <div class="sub">
      <span>{{ text }}</span>
      <span class="cur"></span>
    </div>
    <p class="hint">▶ Clique sur chaque stage dans l’ordre.</p>
  </section>
</template>
