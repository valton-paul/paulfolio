<script setup lang="ts">
import { ref, computed } from 'vue'
import nodes from '../data/hubNodes.json'

const emit = defineEmits<{
  (e: 'open-project', id: string): void
  (e: 'open-projects-page'): void
  (e: 'open-profile-page'): void
  (e: 'open-contact'): void
}>()

type Node = (typeof nodes)[number]

type ExplorationMode = 'exploration' | 'analyse' | 'meditation' | 'minimal'

const currentMode = ref<ExplorationMode>('exploration')

const modeConfig = {
  exploration: {
    label: 'mode exploration',
    description: 'fragments en suspens',
    gridOpacity: 0.6,
    particlesCount: 12,
    orbitSpeed: 'normal',
    nodeGlow: 'normal',
    ambiance: 'mysterious'
  },
  analyse: {
    label: 'mode analyse',
    description: 'système scanné',
    gridOpacity: 1,
    particlesCount: 20,
    orbitSpeed: 'fast',
    nodeGlow: 'bright',
    ambiance: 'technical'
  },
  meditation: {
    label: 'mode méditation',
    description: 'harmonie numérique',
    gridOpacity: 0.3,
    particlesCount: 8,
    orbitSpeed: 'slow',
    nodeGlow: 'soft',
    ambiance: 'calm'
  },
  minimal: {
    label: 'mode minimal',
    description: 'essence pure',
    gridOpacity: 0.2,
    particlesCount: 3,
    orbitSpeed: 'static',
    nodeGlow: 'subtle',
    ambiance: 'pure'
  }
}

const currentConfig = computed(() => modeConfig[currentMode.value])

const cycleMode = () => {
  const modes: ExplorationMode[] = ['exploration', 'analyse', 'meditation', 'minimal']
  const currentIndex = modes.indexOf(currentMode.value)
  const nextIndex = (currentIndex + 1) % modes.length
  currentMode.value = modes[nextIndex] as ExplorationMode
}

const handleNodeClick = (node: Node) => {
  if (node.kind === 'project') {
    emit('open-project', node.id)
  } else if (node.kind === 'projectsPage') {
    emit('open-projects-page')
  } else if (node.kind === 'profilePage') {
    emit('open-profile-page')
  } else if (node.kind === 'gateway') {
    emit('open-contact')
  }
}
</script>

<template>
  <section class="relative flex flex-1 flex-col gap-5 py-4 md:py-6 w-full">
    <header class="flex items-center justify-between gap-3 px-2 sm:px-4">
      <button
        class="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[0.66rem] tracking-[0.26em] uppercase text-slate-300 hover:border-sky-400/60 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
        type="button"
        @click="cycleMode"
      >
        <span>{{ currentConfig.label }}</span>
        <span class="text-[0.5rem] opacity-60">⟲</span>
      </button>
      <span class="text-[0.66rem] tracking-[0.22em] uppercase text-slate-400 transition-colors duration-300">
        {{ currentConfig.description }}
      </span>
    </header>

    <div
      class="relative flex-1 mx-2 sm:mx-4 rounded-3xl bg-linear-to-br from-slate-900/90 via-slate-950 to-black/95 shadow-[0_22px_80px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      <!-- Fond mystique avec particules flottantes -->
      <div class="absolute inset-0">
        <!-- Grille subtile -->
        <div
          class="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[48px_48px] transition-opacity duration-500"
          :style="{ opacity: currentConfig.gridOpacity }"
          aria-hidden="true"
        />

        <!-- Particules flottantes subtiles -->
        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            v-for="i in currentConfig.particlesCount"
            :key="i"
            class="absolute w-px h-px rounded-full animate-pulse transition-all duration-500"
            :class="{
              'bg-sky-400/40 shadow-[0_0_4px_rgba(56,189,248,0.8)]': currentMode === 'exploration',
              'bg-cyan-300/50 shadow-[0_0_6px_rgba(34,211,238,1)]': currentMode === 'analyse',
              'bg-indigo-300/35 shadow-[0_0_5px_rgba(99,102,241,0.9)]': currentMode === 'meditation',
              'bg-slate-400/25 shadow-[0_0_3px_rgba(100,116,139,0.6)]': currentMode === 'minimal'
            }"
            :style="{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }"
          />
        </div>

        <!-- Orbites concentriques mystiques -->
        <div
          class="pointer-events-none absolute inset-12 rounded-full border-2 transition-all duration-500"
          :class="{
            'border-sky-400/20 animate-spin shadow-[0_0_20px_rgba(56,189,248,0.3)]': currentMode === 'exploration',
            'border-cyan-400/30 animate-spin shadow-[0_0_25px_rgba(34,211,238,0.4)]': currentMode === 'analyse',
            'border-indigo-400/25 animate-spin shadow-[0_0_20px_rgba(99,102,241,0.3)]': currentMode === 'meditation',
            'border-slate-500/10': currentMode === 'minimal'
          }"
          :style="{
            animationDuration: currentConfig.orbitSpeed === 'fast' ? '60s' : currentConfig.orbitSpeed === 'slow' ? '300s' : currentConfig.orbitSpeed === 'static' ? '999999s' : '120s'
          }"
        />
        <div
          class="pointer-events-none absolute inset-20 rounded-full border-2 transition-all duration-500"
          :class="{
            'border-sky-300/15 animate-spin shadow-[0_0_15px_rgba(56,189,248,0.2)]': currentMode === 'exploration',
            'border-cyan-300/25 animate-spin shadow-[0_0_20px_rgba(34,211,238,0.3)]': currentMode === 'analyse',
            'border-purple-400/20 animate-spin shadow-[0_0_15px_rgba(147,51,234,0.25)]': currentMode === 'meditation',
            'border-slate-400/5': currentMode === 'minimal'
          }"
          :style="{
            animationDuration: currentConfig.orbitSpeed === 'fast' ? '90s' : currentConfig.orbitSpeed === 'slow' ? '450s' : currentConfig.orbitSpeed === 'static' ? '999999s' : '180s',
            animationDirection: 'reverse'
          }"
        />
        <div
          v-if="currentMode !== 'minimal'"
          class="pointer-events-none absolute inset-32 rounded-full border-2 transition-all duration-500"
          :class="{
            'border-blue-400/10 animate-spin shadow-[0_0_10px_rgba(96,165,250,0.15)]': currentMode === 'exploration',
            'border-emerald-400/20 animate-spin shadow-[0_0_15px_rgba(52,211,153,0.25)]': currentMode === 'analyse',
            'border-violet-400/15 animate-spin shadow-[0_0_12px_rgba(139,92,246,0.2)]': currentMode === 'meditation'
          }"
          :style="{
            animationDuration: currentConfig.orbitSpeed === 'fast' ? '120s' : currentConfig.orbitSpeed === 'slow' ? '600s' : '240s'
          }"
        />

        <!-- Lueur centrale mystique -->
        <div class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div
            class="rounded-full via-transparent blur-3xl transition-all duration-1000"
            :class="{
              'w-96 h-96 bg-radial-gradient from-sky-500/8 to-transparent shadow-[0_0_60px_rgba(56,189,248,0.3)]': currentMode === 'exploration',
              'w-md h-112 bg-radial-gradient from-cyan-400/12 to-transparent shadow-[0_0_80px_rgba(34,211,238,0.4)]': currentMode === 'analyse',
              'w-lg h-128 bg-radial-gradient from-indigo-500/10 to-transparent shadow-[0_0_70px_rgba(99,102,241,0.35)]': currentMode === 'meditation',
              'w-80 h-80 bg-radial-gradient from-slate-400/4 to-transparent shadow-[0_0_40px_rgba(100,116,139,0.2)]': currentMode === 'minimal'
            }"
          />
        </div>
      </div>

      <div class="relative h-full w-full">
        <!-- Nodes mystérieux -->
        <button
          v-for="node in nodes"
          :key="node.id"
          class="group absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none transition-all duration-300"
          type="button"
          :style="{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }"
          @click="handleNodeClick(node)"
        >
          <!-- Halos lumineux parfaits et ronds - seulement au hover -->
          <div
            class="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-opacity duration-200 blur-sm"
            :class="{
              'bg-sky-400/30 shadow-[0_0_40px_rgba(56,189,248,0.9),0_0_80px_rgba(56,189,248,0.6)]': currentMode === 'exploration',
              'bg-emerald-400/35 shadow-[0_0_45px_rgba(16,185,129,1),0_0_90px_rgba(16,185,129,0.7)]': currentMode === 'analyse',
              'bg-violet-400/30 shadow-[0_0_40px_rgba(139,92,246,0.9),0_0_80px_rgba(139,92,246,0.6)]': currentMode === 'meditation',
              'bg-amber-400/25 shadow-[0_0_35px_rgba(245,158,11,0.8),0_0_70px_rgba(245,158,11,0.5)]': currentMode === 'minimal'
            }"
            style="animation-duration: 1.5s;"
            aria-hidden="true"
          />
          <div
            class="absolute -inset-6 rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-pulse transition-opacity duration-200 blur-md"
            :class="{
              'bg-sky-300/20 shadow-[0_0_30px_rgba(56,189,248,0.7),0_0_60px_rgba(56,189,248,0.4)]': currentMode === 'exploration',
              'bg-teal-300/25 shadow-[0_0_35px_rgba(20,184,166,0.8),0_0_70px_rgba(20,184,166,0.5)]': currentMode === 'analyse',
              'bg-purple-300/20 shadow-[0_0_30px_rgba(147,51,234,0.7),0_0_60px_rgba(147,51,234,0.4)]': currentMode === 'meditation',
              'bg-yellow-300/15 shadow-[0_0_25px_rgba(234,179,8,0.6),0_0_50px_rgba(234,179,8,0.3)]': currentMode === 'minimal'
            }"
            style="animation-delay: 0.2s; animation-duration: 2s;"
            aria-hidden="true"
          />
          <div
            class="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-200 blur-lg"
            :class="{
              'bg-sky-200/15 shadow-[0_0_20px_rgba(56,189,248,0.5),0_0_40px_rgba(56,189,248,0.2)]': currentMode === 'exploration',
              'bg-cyan-200/20 shadow-[0_0_25px_rgba(6,182,212,0.6),0_0_50px_rgba(6,182,212,0.3)]': currentMode === 'analyse',
              'bg-pink-200/15 shadow-[0_0_20px_rgba(236,72,153,0.5),0_0_40px_rgba(236,72,153,0.2)]': currentMode === 'meditation',
              'bg-orange-200/10 shadow-[0_0_15px_rgba(249,115,22,0.4),0_0_30px_rgba(249,115,22,0.15)]': currentMode === 'minimal'
            }"
            style="animation-delay: 0.4s; animation-duration: 2.5s;"
            aria-hidden="true"
          />

          <!-- Noyau lumineux principal avec pulsation -->
          <span
            class="relative inline-flex h-3 w-3 rounded-full transition-all duration-500 group-hover:animate-pulse"
            :class="{
              'bg-linear-to-tr from-cyan-200 via-sky-400 to-blue-500 shadow-[0_0_28px_rgba(56,189,248,0.8),0_0_50px_rgba(15,23,42,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_45px_rgba(56,189,248,1.2),0_0_80px_rgba(15,23,42,1.1),inset_0_1px_2px_rgba(255,255,255,0.6)]':
                currentMode === 'exploration',
              'bg-linear-to-tr from-emerald-200 via-cyan-300 to-teal-400 shadow-[0_0_35px_rgba(20,184,166,1),0_0_65px_rgba(15,23,42,1),inset_0_1px_2px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_55px_rgba(20,184,166,1.5),0_0_100px_rgba(15,23,42,1.3),inset_0_1px_2px_rgba(255,255,255,0.8)]':
                currentMode === 'analyse',
              'bg-linear-to-tr from-violet-300 via-purple-400 to-pink-500 shadow-[0_0_25px_rgba(147,51,234,0.8),0_0_45px_rgba(15,23,42,0.8),inset_0_1px_2px_rgba(255,255,255,0.25)] group-hover:shadow-[0_0_40px_rgba(147,51,234,1.2),0_0_75px_rgba(15,23,42,1),inset_0_1px_2px_rgba(255,255,255,0.6)]':
                currentMode === 'meditation',
              'bg-linear-to-tr from-amber-200 via-yellow-300 to-orange-400 shadow-[0_0_15px_rgba(251,191,36,0.7),0_0_30px_rgba(15,23,42,0.7),inset_0_1px_2px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(251,191,36,1),0_0_50px_rgba(15,23,42,0.9),inset_0_1px_2px_rgba(255,255,255,0.4)]':
                currentMode === 'minimal'
            }"
          />

          <!-- Cristal intérieur qui apparaît -->
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            aria-hidden="true"
          >
            <div class="w-1 h-1 bg-white/80 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
          </div>

          <!-- Label énigmatique avec effet de distorsion -->
          <span
            class="relative font-mono text-[0.7rem] uppercase mt-1 opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:tracking-[0.28em] group-hover:font-semibold"
            :class="{
              'tracking-[0.22em] text-slate-300 group-hover:text-sky-200': currentMode === 'exploration',
              'tracking-[0.24em] text-emerald-300 group-hover:text-teal-100': currentMode === 'analyse',
              'tracking-[0.20em] text-violet-300 group-hover:text-purple-200': currentMode === 'meditation',
              'tracking-[0.18em] text-amber-300 group-hover:text-yellow-200': currentMode === 'minimal'
            }"
          >
            {{ node.label }}
          </span>

          <!-- Message d'indice qui apparaît avec un effet de révélation -->
          <span
            class="absolute top-full mt-2 max-w-48 text-[0.68rem] text-center opacity-0 translate-y-3 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-600 leading-relaxed"
            :class="{
              'text-slate-400/90': currentMode === 'exploration',
              'text-cyan-400/90': currentMode === 'analyse',
              'text-indigo-400/90': currentMode === 'meditation',
              'text-slate-500/80': currentMode === 'minimal'
            }"
          >
            {{ node.hint }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-radial-gradient {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}
</style>


