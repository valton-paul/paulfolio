<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

import { useFolio } from '@/composables/useFolio'
import type { StageId } from '@/types'

import StageAbout from './stages/StageAbout.vue'
import StageContact from './stages/StageContact.vue'
import StageProjects from './stages/StageProjects.vue'
import StageSecurity from './stages/StageSecurity.vue'
import StageSkills from './stages/StageSkills.vue'

const { viewedIndex, stages, outputTick } = useFolio()
const panel = ref<HTMLElement | null>(null)

const stageId = computed<StageId | null>(() =>
  viewedIndex.value === null ? null : (stages[viewedIndex.value]?.id ?? null),
)

watch(outputTick, async () => {
  await nextTick()
  panel.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})
</script>

<template>
  <div v-if="stageId" ref="panel" class="panel">
    <div class="out">
      <StageAbout v-if="stageId === 'checkout'" />
      <StageSkills v-else-if="stageId === 'build'" />
      <StageProjects v-else-if="stageId === 'test'" />
      <StageSecurity v-else-if="stageId === 'scan'" />
      <StageContact v-else-if="stageId === 'deploy'" />
    </div>
  </div>
</template>
