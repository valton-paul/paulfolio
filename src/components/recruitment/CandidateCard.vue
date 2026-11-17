<script setup lang="ts">
import PaulPortrait from './PaulPortrait.vue'
import { RECRUITMENT_CANDIDATE } from '@/data/recruitment'

defineProps<{ stamped: boolean }>()
</script>

<template>
  <aside class="dossier" :class="{ stamped }" aria-label="Dossier candidat">
    <div class="dossier-head">
      <PaulPortrait />
      <div>
        <p class="dossier-kicker">Candidat</p>
        <h3>{{ RECRUITMENT_CANDIDATE.name }}</h3>
        <p>{{ RECRUITMENT_CANDIDATE.role }}</p>
      </div>
    </div>
    <ul>
      <li v-for="bullet in RECRUITMENT_CANDIDATE.bullets" :key="bullet">{{ bullet }}</li>
    </ul>
    <div v-if="stamped" class="stamp" aria-hidden="true">APPROVED</div>
  </aside>
</template>
