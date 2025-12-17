<script setup lang="ts">
import profile from '../data/profile.json'

const emit = defineEmits<{
  (e: 'enter-hub'): void
}>()
</script>

<template>
  <section class="relative flex flex-1 w-full max-w-7xl flex-col gap-8 md:gap-10 overflow-hidden">
    <div class="flex items-center justify-between gap-3">
      <p class="text-[0.7rem] tracking-[0.32em] uppercase text-slate-400">
        réseau neural
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

    <!-- Interface "Réseau Neural" -->
    <div class="relative min-h-[400px] md:min-h-0 flex flex-col md:grid md:grid-cols-3 md:grid-rows-[auto_1fr_auto] items-start justify-start gap-12 md:gap-2">
      <!-- Nœud Central (Identité) -->
      <div class="relative mx-auto md:col-start-2 md:row-start-2 md:place-self-center z-10 md:z-10">
        <div class="relative group">
          <!-- Aura énergétique pulsante -->
          <div class="absolute -inset-8 md:-inset-12 rounded-full bg-radial-gradient from-cyan-500/15 via-cyan-400/8 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
          <div class="absolute -inset-12 md:-inset-16 rounded-full bg-radial-gradient from-sky-500/8 via-sky-400/4 to-transparent blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-1200 animate-pulse" style="animation-delay: 0.5s;"></div>

          <!-- Noyau Central Cristallin -->
          <div class="relative w-24 h-24 md:w-44 md:h-44 rounded-full bg-linear-to-br from-cyan-500/25 via-sky-400/15 to-transparent border border-cyan-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_80px_rgba(34,211,238,0.4),inset_0_2px_4px_rgba(255,255,255,0.1)]">
            <!-- Géométrie cristalline animée -->
            <div class="relative w-full h-full flex items-center justify-center">
              <!-- Hexagone central -->
              <div class="absolute inset-0 flex items-center justify-center animate-spin" style="animation-duration: 30s;">
                <div class="w-20 h-20 md:w-24 md:h-24 rotate-45 border border-cyan-300/50 bg-linear-to-br from-cyan-400/20 to-transparent backdrop-blur-sm"></div>
              </div>

              <!-- Anneaux orbitaux -->
              <div class="absolute inset-1 md:inset-2 rounded-full border border-sky-400/30 animate-ping" style="animation-duration: 6s; animation-delay: 2s;"></div>
              <div class="absolute inset-3 md:inset-6 rounded-full border border-cyan-300/40 animate-ping" style="animation-duration: 6s; animation-delay: 4s;"></div>
              <div class="absolute inset-5 md:inset-10 rounded-full border border-sky-200/30 animate-ping" style="animation-duration: 6s;"></div>

              <!-- Noyau lumineux interne -->
              <div class="relative z-10 w-6 h-6 md:w-10 md:h-10 rounded-full bg-linear-to-tr from-white/80 via-cyan-200/40 to-sky-300/30 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse"></div>

              <!-- Données centrales -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                <h1 class="text-2xl md:text-3xl font-bold text-cyan-50 leading-tight drop-shadow-lg">{{ profile.name }}</h1>
                <p class="text-base md:text-lg text-cyan-200/90 mt-1 drop-shadow-md">{{ profile.title }}</p>
                <p class="text-sm md:text-base text-cyan-300/70 mt-0.5 drop-shadow-sm">{{ profile.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nœuds Périphériques Connectés -->
      <!-- À propos - Bas gauche (devient haut gauche) -->
      <div class="relative md:col-start-1 md:row-start-1 md:place-self-center group w-full md:w-auto">

        <div class="w-full max-w-sm md:w-64 mx-auto md:mx-0 rounded-lg border border-amber-500/30 bg-linear-to-br from-slate-900/95 via-slate-950 to-black/98 p-3 md:p-4 backdrop-blur-sm shadow-[0_8px_32px_rgba(251,191,36,0.2)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.4)] transition-all duration-500 md:max-h-none overflow-visible">
          <h3 class="text-sm md:text-sm uppercase tracking-[0.28em] text-amber-400/90 mb-3 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-amber-400/70 animate-pulse"></div>
            identité neuronale
          </h3>
          <div class="space-y-2 text-sm md:text-sm text-amber-100/90 leading-relaxed">
            <p>{{ profile.about }}</p>
            <div class="pt-2 border-t border-amber-500/20 mt-3">
              <p class="text-xs md:text-xs uppercase tracking-[0.24em] text-amber-400/70 mb-1">coordonnées</p>
              <p class="text-amber-200/80 text-sm md:text-sm">{{ profile.coordinates }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Parcours Académique - Haut droite -->
      <div class="relative md:col-start-3 md:row-start-1 md:place-self-center group w-full md:w-auto">

        <div class="w-full max-w-sm md:w-64 mx-auto md:mx-0 rounded-lg border border-emerald-500/30 bg-linear-to-br from-slate-900/95 via-slate-950 to-black/98 p-3 md:p-4 backdrop-blur-sm shadow-[0_8px_32px_rgba(34,197,94,0.2)] hover:shadow-[0_12px_48px_rgba(34,197,94,0.4)] transition-all duration-500 md:max-h-none overflow-visible">
          <h3 class="text-sm md:text-sm uppercase tracking-[0.28em] text-emerald-400/90 mb-3 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-400/70 animate-pulse"></div>
            dendrites académiques
          </h3>
          <div class="space-y-2">
            <div v-for="edu in profile.education" :key="edu.title" class="text-sm md:text-sm">
              <p class="font-semibold text-emerald-100">{{ edu.title }}</p>
              <p class="text-emerald-300/70">{{ edu.period }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Expériences - Bas droite -->
      <div class="relative md:col-start-3 md:row-start-3 md:place-self-center group w-full md:w-auto">

        <div class="w-full max-w-sm md:w-64 mx-auto md:mx-0 rounded-lg border border-violet-500/30 bg-linear-to-br from-slate-900/95 via-slate-950 to-black/98 p-3 md:p-4 backdrop-blur-sm shadow-[0_8px_32px_rgba(168,85,247,0.2)] hover:shadow-[0_12px_48px_rgba(168,85,247,0.4)] transition-all duration-500 md:max-h-none overflow-visible">
          <h3 class="text-sm md:text-sm uppercase tracking-[0.28em] text-violet-400/90 mb-3 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-violet-400/70 animate-pulse"></div>
            axones expériences
          </h3>
          <div class="space-y-2">
            <div v-for="exp in profile.experiences" :key="exp.title" class="text-sm md:text-sm">
              <p class="font-semibold text-violet-100">{{ exp.title }}</p>
              <p class="text-violet-300/70">{{ exp.period }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Compétences - Bas gauche -->
      <div class="relative md:col-start-1 md:row-start-3 md:place-self-center group w-full md:w-auto">

        <div class="w-full max-w-sm md:w-64 mx-auto md:mx-0 rounded-lg border border-cyan-500/30 bg-linear-to-br from-slate-900/95 via-slate-950 to-black/98 p-3 md:p-4 backdrop-blur-sm shadow-[0_8px_32px_rgba(34,211,238,0.2)] hover:shadow-[0_12px_48px_rgba(34,211,238,0.4)] transition-all duration-500 md:max-h-none overflow-visible">
          <h3 class="text-sm md:text-sm uppercase tracking-[0.28em] text-cyan-400/90 mb-3 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-cyan-400/70 animate-pulse"></div>
            synapses compétences
          </h3>
          <div class="grid grid-cols-2 gap-1.5">
            <span
              v-for="skill in profile.skills"
              :key="skill"
              class="px-2 py-1 text-xs md:text-xs text-center rounded border border-cyan-500/20 bg-cyan-950/30 hover:border-cyan-400/60 hover:bg-cyan-900/50 transition-all duration-300 backdrop-blur-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Particules neurales flottantes -->
      <div class="hidden md:block absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          v-for="i in 15"
          :key="i"
          class="absolute w-0.5 h-0.5 rounded-full animate-pulse"
          :class="{
            'bg-cyan-400/40': i % 4 === 0,
            'bg-emerald-400/40': i % 4 === 1,
            'bg-violet-400/40': i % 4 === 2,
            'bg-amber-400/40': i % 4 === 3
          }"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 4}s`
          }"
        />
      </div>
    </div>
  </section>
</template>


