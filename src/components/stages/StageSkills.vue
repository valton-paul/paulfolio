<script setup lang="ts">
import { useFolio } from '@/composables/useFolio'
import { SKILL_GROUPS } from '@/data/content'

const { passedSkills, markSkill } = useFolio()
</script>

<template>
  <div>
    <h2>🔧 build - la stack</h2>
    <p class="mu">Clique sur une compétence pour lui lancer un test unitaire.</p>
    <template v-for="group in SKILL_GROUPS" :key="group.label">
      <div class="grp">{{ group.label }}</div>
      <button
        v-for="skill in group.items"
        :key="skill"
        class="chip"
        :class="{ p: passedSkills.includes(skill) }"
        type="button"
        :data-sk="skill"
        @click="markSkill(skill)"
      >
        {{ skill }}
      </button>
    </template>
  </div>
</template>
