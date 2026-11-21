<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

import { useRecruitment } from '@/composables/useRecruitment'

import CandidateCard from './CandidateCard.vue'
import CoffeeMachine from './CoffeeMachine.vue'
import CtoChar from './CtoChar.vue'
import RhBot from './RhBot.vue'
import SpeechBubble from './SpeechBubble.vue'

const {
  open,
  closing,
  phase,
  showDossier,
  dossierMode,
  stamped,
  bootProgress,
  autoPlaying,
  speedScale,
  cameraBeat,
  bubbleText,
  bubbleSpeaker,
  progress,
  rh,
  cto,
  close,
  toggleSpeed,
  continueStory,
} = useRecruitment()

const coffeeActive = computed(() => cto.state.spot === 'coffee' || cameraBeat.value === 'coffee')

const dossierStyle = computed(() => {
  if (dossierMode.value === 'carried') {
    return {
      left: `${rh.state.x + 10}%`,
      bottom: `${rh.state.y + 26}%`,
      top: 'auto',
      transform: 'translateX(-50%) scale(0.72)',
    }
  }
  if (dossierMode.value === 'passing' || dossierMode.value === 'desk') {
    return {
      left: '50%',
      top: '14%',
      bottom: 'auto',
      transform: 'translateX(-50%) scale(1)',
    }
  }
  return undefined
})

const rhBubble = computed(
  () => bubbleSpeaker.value === 'rh' && bubbleText.value.trim() && phase.value === 'story',
)
const ctoBubble = computed(
  () => bubbleSpeaker.value === 'cto' && bubbleText.value.trim() && phase.value === 'story',
)
const narratorBubble = computed(
  () => bubbleSpeaker.value === 'narrator' && bubbleText.value.trim() && phase.value === 'story',
)

function onKeydown(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    void close()
    return
  }
  if (event.key === 'Enter' || event.key === ' ') {
    const tag = (event.target as HTMLElement | null)?.tagName
    if (tag === 'BUTTON' || tag === 'A') return
    event.preventDefault()
    if (phase.value === 'approved') {
      void close()
      return
    }
    continueStory()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  delete document.documentElement.dataset.cinema
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="recruit-overlay"
      :class="{ closing }"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruit-title"
    >
      <div class="recruit-backdrop" @click="close" />

      <div class="recruit-stage recruit-stage--xl">
        <header class="recruit-toolbar">
          <div>
            <p class="recruit-eyebrow">Easter egg</p>
            <h2 id="recruit-title">THE PAUL RECRUITMENT</h2>
          </div>
          <div class="recruit-toolbar-actions">
            <button
              v-if="phase !== 'boot' && phase !== 'approved'"
              class="recruit-btn ghost"
              type="button"
              :aria-pressed="speedScale > 1"
              @click="toggleSpeed"
            >
              Accélérer{{ speedScale > 1 ? ' ×2' : '' }}
            </button>
            <button
              v-if="phase === 'story'"
              class="recruit-btn ghost"
              type="button"
              @click="continueStory"
            >
              Passer
            </button>
            <button class="recruit-btn ghost" type="button" aria-label="Fermer" @click="close">
              Fermer
            </button>
          </div>
        </header>

        <div
          v-if="phase === 'story' || phase === 'approved'"
          class="recruit-progress"
          aria-hidden="true"
        >
          <div class="recruit-progress-bar" :style="{ width: `${progress * 100}%` }" />
        </div>

        <div v-if="phase === 'boot'" class="recruit-boot">
          <p class="boot-sub">An extremely serious recruitment process.</p>
          <p class="boot-load">Preparing interview room…</p>
          <div class="boot-bar" aria-hidden="true">
            <div :style="{ width: `${bootProgress}%` }" />
          </div>
        </div>

        <template v-else>
          <div
            class="office office--stage"
            :class="{ celebrate: phase === 'approved', 'coffee-focus': coffeeActive }"
          >
            <div class="office-cam" :class="`cam-${cameraBeat}`">
              <div class="office-vista" aria-hidden="true">
                <div class="vista-sky">
                  <div class="cloud cloud-a" />
                  <div class="cloud cloud-b" />
                  <div class="cloud cloud-c" />
                  <div class="sun-glow" />
                </div>
                <div class="vista-city">
                  <span class="bldg b1" /><span class="bldg b2" /><span class="bldg b3" />
                  <span class="bldg b4" /><span class="bldg b5" /><span class="bldg b6" />
                  <span class="bldg b7" /><span class="bldg b8" /><span class="bldg b9" />
                  <span class="bldg b10" /><span class="bldg b11" /><span class="bldg b12" />
                  <div class="city-park" />
                </div>
                <div class="bay-wall">
                  <div class="bay-pane" /><div class="bay-pane" /><div class="bay-pane" />
                  <div class="bay-pane" /><div class="bay-pane" />
                  <div class="bay-sill" />
                  <div class="bay-shine" />
                </div>
              </div>

              <div class="office-bg" aria-hidden="true">
                <div class="ceiling" />
                <div class="light-shaft light-shaft-a" />
                <div class="light-shaft light-shaft-b" />
                <div class="floor">
                  <div class="floor-shadow" />
                </div>
                <div class="plant plant-back">
                  <div class="plant-pot" />
                  <div class="plant-leaf plant-leaf-a" />
                  <div class="plant-leaf plant-leaf-b" />
                  <div class="plant-leaf plant-leaf-c" />
                </div>
                <div class="desk">
                  <div class="desk-top" />
                  <div class="desk-leg desk-leg-l" />
                  <div class="desk-leg desk-leg-r" />
                  <div class="desk-monitor" />
                  <div class="desk-mug" />
                </div>
                <div class="plant plant-front">
                  <div class="plant-pot" />
                  <div class="plant-leaf plant-leaf-a" />
                  <div class="plant-leaf plant-leaf-b" />
                </div>
              </div>

              <CoffeeMachine :active="coffeeActive" />

              <div
                class="actor actor-rh"
                :style="{
                  left: `${rh.state.x}%`,
                  bottom: `${rh.state.y}%`,
                  zIndex: rh.state.z,
                }"
              >
                <SpeechBubble
                  v-if="rhBubble"
                  :text="bubbleText"
                  side="left"
                  speaker="rh"
                  :speed-scale="speedScale"
                />
                <RhBot :mood="rh.state.mood" :facing="rh.state.facing" :pose="rh.state.pose" />
              </div>

              <Transition name="dossier-fade">
                <CandidateCard
                  v-if="showDossier"
                  class="actor-dossier"
                  :class="`dossier-${dossierMode}`"
                  :style="dossierStyle"
                  :stamped="stamped"
                />
              </Transition>

              <div
                class="actor actor-cto"
                :style="{
                  left: `${cto.state.x}%`,
                  bottom: `${cto.state.y}%`,
                  zIndex: cto.state.z,
                }"
              >
                <SpeechBubble
                  v-if="ctoBubble"
                  :text="bubbleText"
                  side="right"
                  speaker="cto"
                  :speed-scale="speedScale"
                />
                <CtoChar :mood="cto.state.mood" :facing="cto.state.facing" :pose="cto.state.pose" />
              </div>

              <SpeechBubble
                v-if="narratorBubble"
                class="narrator-bubble"
                :text="bubbleText"
                side="center"
                speaker="narrator"
                :speed-scale="speedScale"
              />

              <p v-if="autoPlaying && phase === 'story'" class="auto-hint">
                lecture auto{{ speedScale > 1 ? ' · ×2' : '' }}
              </p>

              <div v-if="phase === 'approved'" class="approved-banner">
                <p class="approved-title">PAUL HAS BEEN HIRED!</p>
                <p class="approved-sub">
                  Your company just made a questionable but excellent decision.
                </p>
                <button class="recruit-btn primary" type="button" @click="close">
                  Retour au portfolio
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>
