<script setup lang="ts">
import { PROFILE } from '@/data/content'
</script>

<template>
  <div>
    <h2>🛡️ security-scan - sécurité &amp; certifs</h2>
    <p>
      🎓 <b>ITIL® 4 Foundation</b> - alignement IT / métier
      <span class="wa">(en cours)</span>
    </p>
    <p>🕵️ Je m’entraîne sur <b>TryHackMe</b> et je suis un parcours DevSecOps.</p>
    <p>Méthodes : Agile (Scrum/Kanban), Clean Code, tests unitaires, pipelines CI/CD.</p>
    <a class="btn o" target="_blank" rel="noopener noreferrer" :href="PROFILE.tryhackme">
      Voir mon profil TryHackMe
    </a>
  </div>
</template>
