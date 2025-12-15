<script setup lang="ts">
import { computed } from 'vue'
import projects from '../data/projects.json'

const props = defineProps<{
  activeProjectId: string | null
}>()

const emit = defineEmits<{
  (e: 'close-project'): void
}>()

type Project = (typeof projects)[number]

const currentProject = computed<Project | null>(() => {
  if (!props.activeProjectId) return null
  return projects.find((p) => p.id === props.activeProjectId) ?? null
})

const projectTitle = computed(() => {
  if (!currentProject.value) return 'Anomalie non identifiée'
  return `${currentProject.value.code} — ${currentProject.value.title}`
})

const projectBody = computed(() => {
  if (!currentProject.value) {
    return ['Fragment hors-index. Les métadonnées complètes ne sont pas encore synchronisées.']
  }
  return currentProject.value.description
})
</script>

<template>
  <section class="relative flex flex-1 flex-col px-3 py-5 sm:px-4 md:px-6 md:py-6 lg:px-12">
    <button
      class="self-end inline-flex items-center gap-1.5 rounded-full border border-slate-600/80 bg-slate-900/80 px-3 py-1 text-[0.68rem] tracking-[0.2em] uppercase text-slate-300 hover:border-sky-300 hover:text-sky-100 transition"
      type="button"
      @click="emit('close-project')"
    >
      <span class="text-xs leading-none">×</span>
      <span>retour au labyrinthe</span>
    </button>

    <div class="mt-4 flex-1 grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
      <header class="md:col-span-2 space-y-2">
        <p class="text-[0.7rem] tracking-[0.32em] uppercase text-slate-400">
          dossier projet
        </p>
        <h1 class="text-xl sm:text-2xl md:text-[1.6rem] font-semibold text-sky-50">
          {{ projectTitle }}
        </h1>
        <p class="flex flex-wrap items-center gap-2 text-[0.78rem] text-slate-300">
          <span
            class="inline-flex items-center rounded-full border border-sky-400/70 bg-sky-500/10 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-sky-100"
          >
            actif
          </span>
          <span aria-hidden="true" class="text-slate-500">·</span>
          <span>{{ currentProject?.type ?? 'interface / expérience numérique' }}</span>
        </p>
      </header>

      <div
        class="relative rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-950 to-black/95 shadow-[0_22px_80px_rgba(0,0,0,0.9)] overflow-hidden min-h-[200px] sm:min-h-[260px]"
      >
        <div
          class="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 mix-blend-soft-light"
          aria-hidden="true"
        />
        <div
          class="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_6px,rgba(15,23,42,0.85)_7px)] opacity-80 mix-blend-soft-light"
          aria-hidden="true"
        />

        <div class="relative flex h-full items-center justify-center">
          <div
            class="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-tr from-white via-sky-300 to-sky-500 shadow-[0_0_40px_rgba(56,189,248,0.9),0_0_90px_rgba(15,23,42,0.95)]"
          />
          <div
            class="absolute h-52 w-52 rounded-full border border-sky-300/60 border-dashed shadow-[0_0_26px_rgba(59,130,246,0.7)]"
          />
        </div>
      </div>

      <div class="space-y-3 text-sm md:text-[0.95rem] text-slate-200">
        <p
          v-for="line in projectBody"
          :key="line"
        >
          {{ line }}
        </p>

        <div class="pt-2 text-[0.82rem] text-slate-300">
          <p class="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">
            techs observées
          </p>
          <div class="mt-2 flex flex-wrap gap-1.5">
            <span
              class="rounded-full border border-slate-600/90 bg-slate-900/80 px-2 py-0.5 text-[0.7rem]"
            >
              Vue 3
            </span>
            <span
              class="rounded-full border border-slate-600/90 bg-slate-900/80 px-2 py-0.5 text-[0.7rem]"
            >
              Vite
            </span>
            <span
              class="rounded-full border border-slate-600/90 bg-slate-900/80 px-2 py-0.5 text-[0.7rem]"
            >
              Animations
            </span>
            <span
              class="rounded-full border border-slate-600/90 bg-slate-900/80 px-2 py-0.5 text-[0.7rem]"
            >
              Creative dev
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


