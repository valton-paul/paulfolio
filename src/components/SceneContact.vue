<script setup lang="ts">
const emit = defineEmits<{
  (e: 'exit-contact'): void
}>()
</script>

<template>
  <section
    class="relative flex flex-1 items-center justify-center px-3 py-6 sm:px-4 md:px-8 md:py-8"
  >
    <div
      class="w-full max-w-xl rounded-3xl bg-linear-to-b from-slate-900/95 via-slate-950 to-black/95 px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 shadow-[0_22px_80px_rgba(0,0,0,0.9)]"
    >
      <header class="space-y-2 mb-5">
        <p class="text-[0.7rem] tracking-[0.32em] uppercase text-slate-400">
          canal de contact déverrouillé
        </p>
        <h1 class="text-xl md:text-[1.4rem] font-semibold text-sky-50">
          Tu as trouvé la porte.
        </h1>
        <p class="text-sm md:text-[0.95rem] text-slate-200 max-w-prose">
          Si tu veux parler d’un projet, d’une expérience interactive ou d’une idée un peu trop
          ambitieuse, laisse une trace ici. Je réponds dès que le signal est stable.
        </p>
      </header>

      <form class="space-y-4" @submit.prevent>
        <label class="block space-y-2 text-[0.85rem]">
          <span class="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">
            message
          </span>
          <textarea
            class="w-full min-h-[120px] rounded-2xl border border-slate-600/90 bg-slate-950/90 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 focus:border-sky-400/90 focus:ring-1 focus:ring-sky-400/70 transition resize-y"
            rows="4"
            placeholder="Raconte-moi ce que tu veux créer, ou ce qui t’a intrigué ici…"
          />
        </label>

        <p class="text-[0.8rem] text-slate-300">
          ou écris directement à
          <a
            class="text-sky-300 hover:text-sky-200 underline underline-offset-2"
            href="mailto:contact@example.com"
          >
            contact@example.com
          </a>
        </p>

        <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button
            class="text-[0.75rem] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-200 transition"
            type="button"
            @click="emit('exit-contact')"
          >
            retourner au labyrinthe
          </button>

          <button
            class="inline-flex items-center gap-2 rounded-full border border-sky-400/85 bg-linear-to-r from-sky-500/30 via-sky-500/20 to-transparent px-4 py-1.5 text-[0.78rem] uppercase tracking-[0.22em] text-sky-50 shadow-[0_0_28px_rgba(56,189,248,0.75)] hover:border-sky-200 hover:shadow-[0_0_38px_rgba(56,189,248,0.9)] active:translate-y-px transition"
            type="submit"
          >
            <span
              class="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
              aria-hidden="true"
            />
            <span>simuler l’envoi</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>


