<script setup lang="ts">
import { ref } from 'vue'
import memoryData from '../data/memory.json'

const emit = defineEmits<{
  (e: 'exit-memory'): void
}>()

interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  category: 'formation' | 'experience' | 'skill' | 'project' | 'reflection'
  icon: string
}

const timelineEvents: TimelineEvent[] = memoryData as TimelineEvent[]

const selectedEvent = ref<TimelineEvent | null>(null)

const categoryColors = {
  formation: 'border-emerald-500 bg-emerald-500/10',
  experience: 'border-blue-500 bg-blue-500/10',
  skill: 'border-purple-500 bg-purple-500/10',
  project: 'border-orange-500 bg-orange-500/10',
  reflection: 'border-pink-500 bg-pink-500/10'
}

const categoryLabels = {
  formation: 'Formation',
  experience: 'Expérience',
  skill: 'Compétence',
  project: 'Projet',
  reflection: 'Réflexion'
}
</script>

<template>
  <section class="relative flex flex-1 w-full max-w-7xl flex-col gap-8 overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3">
      <p class="text-[0.7rem] tracking-[0.32em] uppercase text-slate-400">
        mémoire fragmentée
      </p>
      <button
        class="inline-flex items-center gap-1.5 rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[0.68rem] tracking-[0.2em] uppercase text-slate-300 hover:border-sky-300 hover:text-sky-100 transition"
        type="button"
        @click="emit('exit-memory')"
      >
        <span class="text-xs leading-none">←</span>
        <span>retour au labyrinthe</span>
      </button>
    </div>

    <!-- Timeline Container -->
    <div class="relative flex-1 overflow-y-auto">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-12 text-cyan-50">
          Chronologie Neuronale
        </h1>

        <!-- Timeline -->
        <div class="relative">
          <!-- Ligne centrale -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-cyan-500/50 via-transparent to-cyan-500/50"></div>

          <!-- Événements -->
          <div class="space-y-8">
            <div
              v-for="(event, index) in timelineEvents"
              :key="event.id"
              :class="[
                'relative flex items-center',
                index % 2 === 0 ? 'justify-start' : 'justify-end',
                'group cursor-pointer'
              ]"
              @click="selectedEvent = selectedEvent?.id === event.id ? null : event"
            >
              <!-- Point sur la timeline -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-2 border-slate-900 z-10 group-hover:scale-125 transition-transform">
                <div class="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-30"></div>
              </div>

              <!-- Carte d'événement -->
              <div
                :class="[
                  'w-full max-w-md p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105',
                  categoryColors[event.category],
                  index % 2 === 0 ? 'mr-8' : 'ml-8'
                ]"
              >
                <div class="flex items-start gap-3">
                  <div class="text-2xl shrink-0 font-bold text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/30 flex items-center justify-center">
                    {{ event.icon }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-xs font-mono px-2 py-1 rounded bg-slate-800/50 text-cyan-300">
                        {{ event.year }}
                      </span>
                      <span class="text-xs px-2 py-1 rounded bg-slate-700/30 text-slate-300">
                        {{ categoryLabels[event.category] }}
                      </span>
                    </div>
                    <h3 class="text-lg font-semibold text-cyan-50 mb-2">{{ event.title }}</h3>
                    <p class="text-sm text-slate-300 leading-relaxed">{{ event.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal de détail (si nécessaire) -->
        <div
          v-if="selectedEvent"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click="selectedEvent = null"
        >
          <div
            class="max-w-lg w-full bg-slate-900/95 border border-slate-700 rounded-lg p-6"
            @click.stop
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl font-bold text-cyan-400 bg-cyan-950/30 px-3 py-2 rounded border border-cyan-500/30 flex items-center justify-center w-10 h-10">{{ selectedEvent.icon }}</span>
              <div>
                <h3 class="text-xl font-bold text-cyan-50">{{ selectedEvent.title }}</h3>
                <p class="text-cyan-300">{{ selectedEvent.year }}</p>
              </div>
            </div>
            <p class="text-slate-300 leading-relaxed mb-6">{{ selectedEvent.description }}</p>
            <button
              class="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors"
              @click="selectedEvent = null"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer stats -->
    <div class="text-center text-xs text-slate-500 pb-4">
      {{ timelineEvents.length }} fragments mémoriels • Évolution neuronale en cours
    </div>
  </section>
</template>
