<script setup lang="ts">
import profile from '../data/profile.json'

const emit = defineEmits<{
  (e: 'enter-hub'): void
}>()
</script>

<template>
  <section class="relative flex flex-1 w-full max-w-5xl flex-col gap-4 md:gap-6">
    <div class="flex items-center justify-between gap-3">
      <p class="text-[0.7rem] tracking-[0.32em] uppercase text-slate-400">
        profil
      </p>
      <button
        class="inline-flex items-center gap-1.5 rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[0.68rem] tracking-[0.2em] uppercase text-slate-300 hover:border-sky-300 hover:text-sky-100 transition"
        type="button"
        @click="emit('enter-hub')"
      >
        <span class="text-xs leading-none">←</span>
        <span>retour au labyrinthe</span>
      </button>
    </div>
    <!-- Carte identité principale -->
    <div
      class="md:w-[42%] rounded-3xl border border-slate-700/70 bg-linear-to-b from-slate-900/90 via-slate-950 to-black/95 p-4 sm:p-5 shadow-[0_18px_60px_rgba(0,0,0,0.9)] flex flex-col gap-3"
    >
      <p class="text-[0.7rem] tracking-[0.32em] uppercase text-slate-400">
        profil fragmenté
      </p>
      <h1 class="text-xl sm:text-2xl font-semibold text-sky-50">
        {{ profile.name }}<br />
        <span class="text-sky-300/90 text-sm font-normal">
          {{ profile.title }} — {{ profile.location }}
        </span>
      </h1>
      <p class="text-sm md:text-[0.95rem] text-slate-200">
        {{ profile.about }}
      </p>
      <p class="text-[0.8rem] text-slate-400">
        {{ profile.aboutSecondary }}
      </p>

      <div class="mt-2 text-[0.78rem] text-slate-300 space-y-1.5">
        <p class="uppercase tracking-[0.24em] text-[0.7rem] text-slate-500">
          coordonnées
        </p>
        <p>{{ profile.coordinates }}</p>
      </div>
    </div>

    <!-- Colonnes détails (compétences, parcours, expériences) -->
    <div class="flex-1 space-y-6 text-sm md:text-[0.95rem] text-slate-200">
      <section class="space-y-2">
        <h2 class="text-[0.75rem] uppercase tracking-[0.26em] text-slate-400">
          Compétences
        </h2>
        <div class="flex flex-wrap gap-1.5 mt-1.5 text-[0.75rem] text-slate-100">
          <span
            v-for="skill in profile.skills"
            :key="skill"
            class="px-2 py-0.5 rounded-full border border-slate-600/80 bg-slate-900/80"
          >
            {{ skill }}
          </span>
        </div>
      </section>

      <section class="space-y-2">
        <h2 class="text-[0.75rem] uppercase tracking-[0.26em] text-slate-400">
          parcours académique
        </h2>
        <div class="space-y-1.5 text-[0.9rem]">
          <div
            v-for="edu in profile.education"
            :key="edu.title"
            class="pt-1.5 first:pt-0"
          >
            <p class="font-semibold text-sky-50">
              {{ edu.title }}
            </p>
            <p class="text-slate-300">
              {{ edu.period }}<span v-if="edu.place"> · {{ edu.place }}</span>
            </p>
            <p
              v-if="edu.details"
              class="text-slate-400 text-[0.8rem]"
            >
              {{ edu.details }}
            </p>
          </div>
        </div>
      </section>

      <section class="space-y-2">
        <h2 class="text-[0.75rem] uppercase tracking-[0.26em] text-slate-400">
          expériences
        </h2>
        <div class="space-y-2 text-[0.9rem]">
          <div
            v-for="exp in profile.experiences"
            :key="exp.title"
            class="pt-1.5 first:pt-0"
          >
            <p class="font-semibold text-sky-50">
              {{ exp.title }}
            </p>
            <p class="text-slate-300">
              {{ exp.period }}<span v-if="exp.place"> · {{ exp.place }}</span>
            </p>
            <p class="text-slate-400 text-[0.8rem]">
              {{ exp.details }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>


