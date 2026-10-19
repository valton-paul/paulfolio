<script setup lang="ts">
import { useFolio } from '@/composables/useFolio'
import { PROFILE } from '@/data/content'

const { hire, hired } = useFolio()
</script>

<template>
  <div>
    <h2>🚀 deploy - parlons-nous !</h2>
    <p>
      Le pipeline est vert. Il ne reste plus qu’à <b>pousser en prod</b> :
    </p>
    <button class="btn" type="button" @click="hire()">
      {{ hired ? 'déjà en prod ✓' : 'git push origin main' }}
    </button>
    <a class="btn o" :href="`mailto:${PROFILE.email}`">✉️ Email</a>
    <a class="btn o" target="_blank" rel="noopener noreferrer" :href="PROFILE.linkedin">LinkedIn</a>
    <a class="btn o" target="_blank" rel="noopener noreferrer" :href="PROFILE.github">GitHub</a>
    <a class="btn o" target="_blank" rel="noopener noreferrer" :href="PROFILE.site">wemio.fr</a>
  </div>
</template>
