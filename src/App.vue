<script setup lang="ts">
import { onMounted } from 'vue'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import ConfettiLayer from '@/components/ConfettiLayer.vue'
import HeroSection from '@/components/HeroSection.vue'
import LogPanel from '@/components/LogPanel.vue'
import OutputPanel from '@/components/OutputPanel.vue'
import PipelineBoard from '@/components/PipelineBoard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import TerminalPanel from '@/components/TerminalPanel.vue'
import TrophyBar from '@/components/TrophyBar.vue'
import { useFolio } from '@/composables/useFolio'
import { useKonami } from '@/composables/useKonami'
import { useTheme } from '@/composables/useTheme'

const { pipelineYear } = useFolio()

useTheme()
useKonami()

onMounted(() => {
  document.title = `myPaulFolio — Pipeline #${pipelineYear}`
})
</script>

<template>
  <main class="folio">
    <AppHeader />
    <HeroSection />
    <PipelineBoard />
    <ProgressBar />
    <TrophyBar />
    <LogPanel />
    <OutputPanel />
    <TerminalPanel />
    <AppFooter />
  </main>
  <ConfettiLayer />
</template>
