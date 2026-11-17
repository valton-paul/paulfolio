import { computed, ref, watch } from 'vue'

import {
  RECRUITMENT_DIALOGUE,
  type CameraBeat,
  type DialogueLine,
  type RecruitmentPhase,
} from '@/data/recruitment'
import { prefersReducedMotion, sleep } from '@/composables/useMotion'
import {
  cancelRecruitmentActors,
  resetRecruitmentActors,
  setActorSpeedScale,
  useRecruitmentActors,
} from '@/composables/useRecruitmentActors'

import { useFolio } from './useFolio'

export type DossierMode = 'hidden' | 'carried' | 'passing' | 'desk'

const open = ref(false)
const closing = ref(false)
const phase = ref<RecruitmentPhase>('boot')
const lineIndex = ref(0)
const showDossier = ref(false)
const dossierMode = ref<DossierMode>('hidden')
const stamped = ref(false)
const bootProgress = ref(0)
const autoPlaying = ref(true)
const speedScale = ref(1)
const cameraBeat = ref<CameraBeat>('neutral')
const bubbleText = ref('')
const bubbleSpeaker = ref<'rh' | 'cto' | 'narrator' | null>(null)
const typingComplete = ref(false)

let approvedTimer = 0
let dossierTimer = 0
let playToken = 0

const DOSSIER_VISIBLE_MS = 8000

const { rh, cto } = useRecruitmentActors()

const currentLine = computed(() => RECRUITMENT_DIALOGUE[lineIndex.value] ?? null)
const isLastLine = computed(() => lineIndex.value >= RECRUITMENT_DIALOGUE.length - 1)
const progress = computed(() => {
  if (phase.value === 'boot') return 0
  if (phase.value === 'approved') return 1
  return (lineIndex.value + 1) / RECRUITMENT_DIALOGUE.length
})

function clearDossierTimer() {
  window.clearTimeout(dossierTimer)
}

function scheduleDossierHide() {
  clearDossierTimer()
  dossierTimer = window.setTimeout(() => {
    if (!open.value) return
    showDossier.value = false
    dossierMode.value = 'hidden'
    if (cameraBeat.value === 'dossier') cameraBeat.value = 'neutral'
  }, scaled(DOSSIER_VISIBLE_MS))
}

function clearTimers() {
  window.clearTimeout(approvedTimer)
  clearDossierTimer()
  playToken += 1
}

function scaled(ms: number): number {
  if (prefersReducedMotion()) return Math.min(ms, 80)
  return Math.max(40, ms / speedScale.value)
}

function reset() {
  clearTimers()
  phase.value = 'boot'
  lineIndex.value = 0
  showDossier.value = false
  dossierMode.value = 'hidden'
  stamped.value = false
  bootProgress.value = 0
  autoPlaying.value = true
  speedScale.value = 1
  setActorSpeedScale(1)
  cameraBeat.value = 'neutral'
  bubbleText.value = ''
  bubbleSpeaker.value = null
  typingComplete.value = false
  closing.value = false
  resetRecruitmentActors()
}

async function playDossierHandOff(token: number): Promise<void> {
  showDossier.value = false
  dossierMode.value = 'hidden'

  await rh.walkTo('handoff')
  if (token !== playToken || !open.value || phase.value !== 'story') return

  cto.setMood('surprise')
  rh.setMood('confident')
  showDossier.value = true
  dossierMode.value = 'carried'
  await sleep(scaled(520))
  if (token !== playToken || !open.value) return

  dossierMode.value = 'passing'
  await sleep(scaled(480))
  if (token !== playToken || !open.value) return

  dossierMode.value = 'desk'
  cto.setMood('think')
  scheduleDossierHide()
  await rh.walkTo('rh')
}

function listenerMood(line: DialogueLine): void {
  if (line.speaker === 'rh') {
    const ctoMood = line.mood?.cto ?? 'idle'
    cto.setMood(ctoMood === 'talk' ? 'idle' : ctoMood)
  } else if (line.speaker === 'cto') {
    const rhMood = line.mood?.rh ?? 'idle'
    rh.setMood(rhMood === 'talk' ? 'idle' : rhMood)
  } else {
    if (line.mood?.rh) rh.setMood(line.mood.rh)
    if (line.mood?.cto) cto.setMood(line.mood.cto)
  }
}

function applySpeakerMood(line: DialogueLine): void {
  if (line.mood?.rh) rh.setMood(line.mood.rh)
  if (line.mood?.cto) cto.setMood(line.mood.cto)
  if (line.speaker === 'rh' && (!line.mood?.rh || line.mood.rh === 'idle')) {
    rh.setMood('talk')
  }
  if (line.speaker === 'cto' && (!line.mood?.cto || line.mood.cto === 'idle')) {
    cto.setMood('talk')
  }
}

function holdDuration(line: DialogueLine): number {
  if (!line.text.trim()) return scaled(line.pauseMs ?? 1200)
  const reading = 900 + line.text.length * 28
  return scaled(Math.max(line.pauseMs ?? 0, reading))
}

function typeDuration(line: DialogueLine): number {
  if (!line.text.trim() || prefersReducedMotion()) return 0
  return scaled(line.text.length * 28)
}

async function playCurrentLine(token: number): Promise<void> {
  const line = currentLine.value
  if (!line || !open.value || phase.value !== 'story') return

  bubbleText.value = ''
  bubbleSpeaker.value = null
  typingComplete.value = false

  if (line.camera) cameraBeat.value = line.camera

  listenerMood(line)

  const targetSpot = line.ctoSpot
  if (targetSpot && cto.state.spot !== targetSpot) {
    await cto.walkTo(targetSpot)
    if (token !== playToken || !open.value || phase.value !== 'story') return
  }

  if (line.handOffDossier) {
    await playDossierHandOff(token)
    if (token !== playToken || !open.value || phase.value !== 'story') return
  } else if (line.showDossier) {
    showDossier.value = true
    if (dossierMode.value === 'hidden') {
      dossierMode.value = 'desk'
      scheduleDossierHide()
    }
  }
  // Sinon : on ne force plus l'affichage — le timer de 8s gère la disparition.

  applySpeakerMood(line)

  if (line.text.trim()) {
    bubbleSpeaker.value = line.speaker
    bubbleText.value = line.text
    const typeMs = typeDuration(line)
    await sleep(typeMs)
    if (token !== playToken || !open.value) return
    typingComplete.value = true
    await sleep(holdDuration(line))
  } else {
    await sleep(holdDuration(line))
  }

  if (token !== playToken || !open.value || phase.value !== 'story') return

  if (line.speaker === 'rh') void rh.idle()
  if (line.speaker === 'cto') void cto.idle()

  bubbleText.value = ''
  bubbleSpeaker.value = null

  if (autoPlaying.value) {
    advanceStory()
  }
}

function scheduleApprovedAdvance() {
  window.clearTimeout(approvedTimer)
  if (!open.value || phase.value !== 'approved' || !autoPlaying.value) return
  approvedTimer = window.setTimeout(() => {
    if (!open.value || phase.value !== 'approved') return
    void close()
  }, scaled(2600))
}

async function runBoot() {
  bootProgress.value = 0
  const steps = prefersReducedMotion() ? 2 : 8
  for (let i = 1; i <= steps; i += 1) {
    if (!open.value || phase.value !== 'boot') return
    bootProgress.value = Math.round((i / steps) * 100)
    await sleep(prefersReducedMotion() ? 40 : 70 / speedScale.value)
  }
  if (!open.value || phase.value !== 'boot') return
  phase.value = 'story'
  const token = ++playToken
  void playCurrentLine(token)
}

function start() {
  reset()
  open.value = true
  document.body.style.overflow = 'hidden'
  void runBoot()
}

async function close() {
  if (closing.value) return
  closing.value = true
  clearTimers()
  cancelRecruitmentActors()
  await sleep(prefersReducedMotion() ? 40 : 280)
  open.value = false
  document.body.style.overflow = ''
  reset()
}

function toggleSpeed() {
  speedScale.value = speedScale.value === 1 ? 2 : 1
  setActorSpeedScale(speedScale.value)
}

function skipToEnd() {
  clearTimers()
  cancelRecruitmentActors({ rhSpot: 'rh', ctoSpot: 'desk' })
  void close()
}

function advanceStory() {
  if (phase.value === 'boot') {
    phase.value = 'story'
    const token = ++playToken
    void playCurrentLine(token)
    return
  }

  if (phase.value === 'story') {
    if (isLastLine.value) {
      clearTimers()
      bubbleText.value = ''
      bubbleSpeaker.value = null
      phase.value = 'approved'
      stamped.value = true
      cameraBeat.value = 'hire'
      rh.setMood('celebrate')
      cto.setMood('celebrate')
      useFolio().confetti()
      scheduleApprovedAdvance()
      return
    }
    lineIndex.value += 1
    const token = ++playToken
    void playCurrentLine(token)
    return
  }

  if (phase.value === 'approved') {
    clearTimers()
    void close()
  }
}

/** Passer : coupe la réplique / marche courante et avance. */
function continueStory() {
  const line = currentLine.value
  clearTimers()
  cancelRecruitmentActors()
  if (line?.handOffDossier || line?.showDossier) {
    showDossier.value = true
    dossierMode.value = 'desk'
    scheduleDossierHide()
  }
  if (rh.state.spot === 'handoff') rh.snapTo('rh')
  bubbleText.value = ''
  bubbleSpeaker.value = null
  typingComplete.value = true
  advanceStory()
}

watch(open, (isOpen) => {
  if (!isOpen) document.body.style.overflow = ''
})

export function useRecruitment() {
  return {
    open,
    closing,
    phase,
    lineIndex,
    currentLine,
    isLastLine,
    showDossier,
    dossierMode,
    stamped,
    bootProgress,
    autoPlaying,
    speedScale,
    cameraBeat,
    bubbleText,
    bubbleSpeaker,
    typingComplete,
    progress,
    rh,
    cto,
    start,
    close,
    toggleSpeed,
    skipToEnd,
    continueStory,
  }
}
