<script setup lang="ts">
import nodes from '../data/hubNodes.json'

const emit = defineEmits<{
  (e: 'open-project', id: string): void
  (e: 'open-projects-page'): void
  (e: 'open-profile-page'): void
  (e: 'open-contact'): void
}>()

type Node = (typeof nodes)[number]

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
      <span
        class="inline-flex items-center rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[0.66rem] tracking-[0.26em] uppercase text-slate-300"
      >
        mode exploration
      </span>
      <span class="text-[0.66rem] tracking-[0.22em] uppercase text-slate-400">
        fragments en suspens
      </span>
    </header>

    <div
      class="relative flex-1 mx-2 sm:mx-4 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-black/95 shadow-[0_22px_80px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[size:52px_52px] opacity-50 mix-blend-soft-light"
        aria-hidden="true"
      />

      <div class="relative h-full w-full">
        <!-- Orbites concentriques très légères -->
        <div
          class="pointer-events-none absolute inset-16 rounded-full border border-sky-500/10"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute inset-28 rounded-full border border-sky-400/5"
          aria-hidden="true"
        />

        <button
          v-for="node in nodes"
          :key="node.id"
          class="group absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
          type="button"
          :style="{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }"
          @click="handleNodeClick(node)"
        >
          <span
            class="pointer-events-none absolute -inset-7 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.4),transparent_60%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span
            class="relative inline-flex h-2.5 w-2.5 rounded-full bg-linear-to-tr from-white via-sky-300 to-sky-500 shadow-[0_0_22px_rgba(56,189,248,0.85),0_0_40px_rgba(15,23,42,0.95)]"
          />
          <span
            class="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-200 mt-0.5"
          >
            {{ node.label }}
          </span>
          <span
            class="relative max-w-[11rem] text-[0.68rem] text-slate-300/85 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200"
          >
            {{ node.hint }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>


