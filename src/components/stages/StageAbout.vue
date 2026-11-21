<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import { EDUCATION, EXPERIENCES, PROFILE } from '@/data/content'
</script>

<template>
  <div>
    <h2 class="stage-title">
      <AppIcon name="download" :size="18" />
      checkout · qui suis-je ?
    </h2>
    <p>
      Développeur logiciel &amp; <b>apprenti DevSecOps</b> chez
      <b>{{ PROFILE.company }}</b> ({{ PROFILE.companyLong }}).
    </p>
    <p>
      Étudiant en <b>{{ PROFILE.degree }}</b> à {{ PROFILE.school }} ({{ PROFILE.degreePeriod }}).
    </p>
    <p>{{ PROFILE.pitch }}</p>
    <p class="mu">Langues : {{ PROFILE.languages }}</p>

    <div class="grp">parcours</div>
    <ol class="timeline">
      <li v-for="item in EDUCATION" :key="item.title" class="timeline-item">
        <b>{{ item.title }}</b>
        <span>{{ item.period }} · {{ item.place }}</span>
        <span>{{ item.details }}</span>
      </li>
    </ol>

    <div class="grp">expériences</div>
    <ol class="timeline">
      <li v-for="item in EXPERIENCES" :key="item.title" class="timeline-item">
        <b>{{ item.title }}</b>
        <span>{{ item.period }} · {{ item.place }}</span>
        <span>{{ item.details }}</span>
      </li>
    </ol>
  </div>
</template>
