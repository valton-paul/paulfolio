<script setup lang="ts">
import { EDUCATION, EXPERIENCES, PROFILE } from '@/data/content'
</script>

<template>
  <div>
    <h2>📥 checkout - qui suis-je ?</h2>
    <p>
      Développeur logiciel &amp; <b>apprenti DevOps</b> chez
      <b>{{ PROFILE.company }}</b> ({{ PROFILE.companyLong }}).
    </p>
    <p>
      Étudiant en <b>{{ PROFILE.degree }}</b> à {{ PROFILE.school }} ({{ PROFILE.degreePeriod }}).
    </p>
    <p>{{ PROFILE.pitch }}</p>
    <p class="mu">Langues : {{ PROFILE.languages }}</p>

    <div class="grp">parcours</div>
    <div class="cards">
      <article v-for="item in EDUCATION" :key="item.title" class="card">
        <b>{{ item.title }}</b>
        <span>{{ item.period }} · {{ item.place }}</span>
        <span>{{ item.details }}</span>
      </article>
    </div>

    <div class="grp">expériences</div>
    <div class="cards">
      <article v-for="item in EXPERIENCES" :key="item.title" class="card">
        <b>{{ item.title }}</b>
        <span>{{ item.period }} · {{ item.place }}</span>
        <span>{{ item.details }}</span>
      </article>
    </div>
  </div>
</template>
