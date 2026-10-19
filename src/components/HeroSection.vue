<script setup lang="ts">
import { useTypewriter } from '@/composables/useTypewriter'
import { PROFILE } from '@/data/content'

const { text } = useTypewriter()
</script>

<template>
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">
      Salut, je suis <span>{{ PROFILE.fullName }}</span>.<br />
      <span class="hero-role">{{ PROFILE.role }}</span>
    </h1>
    <p class="mu hero-lead">Lance le pipeline pour me découvrir — {{ PROFILE.location }} · {{ PROFILE.company }}.</p>
    <div class="sub">
      <span>{{ text }}</span>
      <span class="cur"></span>
    </div>
    <p class="hint">▶ Clique sur chaque stage dans l’ordre.</p>
  </section>
</template>
