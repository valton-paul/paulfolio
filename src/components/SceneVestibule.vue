<script setup lang="ts">
const emit = defineEmits<{
  (e: 'enter-hub'): void
}>()

let pressTimer: number | null = null
const pressDuration = 900

const handlePointerDown = () => {
  if (pressTimer !== null) return
  pressTimer = window.setTimeout(() => {
    emit('enter-hub')
  }, pressDuration)
}

const clearTimer = () => {
  if (pressTimer !== null) {
    clearTimeout(pressTimer)
    pressTimer = null
  }
}
</script>

<template>
  <section
    class="relative flex flex-1 items-center justify-center py-10 md:py-16"
    @pointerup="clearTimer"
    @pointerleave="clearTimer"
  >
    <div
      class="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light bg-[radial-gradient(circle_at_top,#1f2937_0,#020617_55%,#000_100%)]"
      aria-hidden="true"
    />

    <div class="relative z-10 w-full max-w-3xl px-2 sm:px-4">
      <p class="text-[0.68rem] tracking-[0.32em] uppercase text-slate-400 mb-5 sm:mb-6">
        canal d’accès non répertorié
      </p>

      <h1 class="font-semibold leading-tight text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] mb-4">
        Ce n’est pas un portfolio.<br class="hidden sm:block" />
        <span class="text-sky-300/90 drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]">
          C’est une fuite de données.
        </span>
      </h1>

      <p class="max-w-xl text-sm md:text-base text-slate-300/80 mb-8">
        Approche lentement. Survole. Maintiens. Chaque interaction laisse une trace et révèle un
        fragment de la personne dissimulée derrière cette interface.
      </p>

      <button
        class="inline-flex items-center gap-3 rounded-full border border-sky-400/50 bg-linear-to-r from-sky-500/20 via-sky-400/10 to-transparent px-3.5 pr-4 py-2 text-[0.7rem] tracking-[0.22em] uppercase text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.4)] hover:border-sky-300/90 hover:shadow-[0_0_32px_rgba(56,189,248,0.8)] active:translate-y-px transition"
        type="button"
        @pointerdown="handlePointerDown"
      >
        <span
          class="relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-white via-sky-300 to-sky-500 shadow-[0_0_18px_rgba(56,189,248,0.95)]"
          aria-hidden="true"
        >
          <span class="absolute inset-0 rounded-full border border-white/40 opacity-60" />
        </span>
        <span class="whitespace-nowrap">maintenir pour forcer l’accès</span>
      </button>

      <p class="mt-4 text-[0.7rem] text-slate-400/80">
        astuce&nbsp;: la plupart des éléments ici préfèrent être effleurés plutôt que cliqués.
      </p>
    </div>
  </section>
</template>


