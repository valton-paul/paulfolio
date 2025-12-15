<script setup lang="ts">
import projects from '../data/projects.json'

const emit = defineEmits<{
  (e: 'open-project', id: string): void
  (e: 'enter-hub'): void
}>()

const openProject = (id: string) => {
  emit('open-project', id)
}
</script>

<template>
  <section class="relative flex flex-1 flex-col w-full max-w-5xl">
    <header class="mb-6 md:mb-8 px-1 sm:px-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-[0.7rem] tracking-[0.32em] uppercase text-slate-400">
        chambre des projets
      </p>
      <div>
        <h1 class="mt-2 text-xl sm:text-2xl md:text-[1.6rem] font-semibold text-sky-50">
          Artefacts principaux.
        </h1>
        <p class="mt-2 text-sm md:text-[0.95rem] text-slate-300 max-w-xl">
          Chaque carte ici est un fragment stabilisé du labyrinthe. Cliquer dessus rouvre le dossier
          dans son contexte d’origine.
        </p>
      </div>
      <button
        class="mt-1 sm:mt-0 inline-flex items-center gap-1.5 self-start rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[0.68rem] tracking-[0.2em] uppercase text-slate-300 hover:border-sky-300 hover:text-sky-100 transition"
        type="button"
        @click="emit('enter-hub')"
      >
        <span class="text-xs leading-none">←</span>
        <span>retour au labyrinthe</span>
      </button>
    </header>

    <div
      class="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
      <button
        v-for="project in projects"
        :key="project.id"
        class="group relative flex flex-col items-stretch rounded-2xl border border-slate-700/70 bg-slate-950/80 px-4 py-4 text-left shadow-[0_16px_50px_rgba(0,0,0,0.85)] hover:border-sky-400/80 hover:shadow-[0_20px_70px_rgba(8,47,73,0.95)] transition"
        type="button"
        @click="openProject(project.id)"
      >
        <div
          class="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-sky-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"
        />

        <p
          class="relative text-[0.68rem] uppercase tracking-[0.26em] text-slate-400 mb-1.5 font-mono"
        >
          {{ project.code }}
        </p>
        <h2 class="relative text-sm sm:text-base font-semibold text-sky-50">
          {{ project.title }}
        </h2>
        <p class="relative mt-1.5 text-[0.8rem] text-slate-300/90">
          {{ project.role }}
        </p>

        <div class="relative mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full border border-slate-600/90 bg-slate-900/80 px-2 py-0.5 text-[0.7rem] text-slate-200"
          >
            {{ tag }}
          </span>
        </div>

        <span
          class="relative mt-3 inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300/90"
        >
          <span class="h-[1px] w-4 bg-sky-400/60" />
          ouvrir le dossier
        </span>
      </button>
    </div>
  </section>
</template>


