<script setup lang="ts">
import { PROFILE, PROJECTS } from '@/data/content'
</script>

<template>
  <div>
    <h2>🧪 test - projets</h2>
    <p class="mu">Ceux que j’ai épinglés sur GitHub.</p>
    <div class="cards">
      <a
        v-for="project in PROJECTS"
        :key="project.slug"
        class="card"
        target="_blank"
        rel="noopener noreferrer"
        :href="`${PROFILE.github}/${project.slug}`"
      >
        <b>{{ project.slug }}</b>
        <span>{{ project.description }}</span>
      </a>
    </div>
  </div>
</template>
