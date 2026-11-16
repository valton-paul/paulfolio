<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import { PROFILE } from '@/data/content'
</script>

<template>
  <div>
    <h2 class="stage-title">
      <AppIcon name="shield" :size="18" />
      security-scan - sécurité &amp; certifs
    </h2>
    <p>
      <b>ITIL® 4 Foundation</b> - alignement IT / métier
      <span class="wa">(à venir)</span>
    </p>
    <p>Je m’entraîne sur <b>TryHackMe</b> et je suis un parcours DevSecOps.</p>
    <p>Méthodes : Agile (Scrum/Kanban), Clean Code, tests unitaires, pipelines CI/CD.</p>
    <a class="btn o" target="_blank" rel="noopener noreferrer" :href="PROFILE.tryhackme">
      Voir mon profil TryHackMe
    </a>
  </div>
</template>
