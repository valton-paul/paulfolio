<script setup lang="ts">
import { PROFILE } from '@/data/content'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="folio-footer">
    <p>© {{ year }} {{ PROFILE.fullName }} · construit avec amour, café et quelques YAML</p>
    <nav class="footer-links" aria-label="Profils publics">
      <a :href="`mailto:${PROFILE.email}`">Email</a>
      <a :href="PROFILE.github" target="_blank" rel="noopener noreferrer me">GitHub</a>
      <a :href="PROFILE.linkedin" target="_blank" rel="noopener noreferrer me">LinkedIn</a>
      <a :href="PROFILE.tryhackme" target="_blank" rel="noopener noreferrer me">TryHackMe</a>
      <a :href="PROFILE.site" target="_blank" rel="noopener noreferrer me">wemio.fr</a>
      <a href="/llms.txt" rel="alternate">llms.txt</a>
    </nav>
  </footer>
</template>
