import { computed, ref } from 'vue'

import { STAGES, TROPHIES } from '@/data/content'
import type { ConfettiPiece, LogLine, LogTone } from '@/types'

import { prefersReducedMotion, sleep } from './useMotion'

const done = ref(0)
const busy = ref(false)
const runningIndex = ref<number | null>(null)
const viewedIndex = ref<number | null>(null)
const logs = ref<LogLine[]>([
  { id: 0, text: '$ en attente d’un déclenchement… (clique sur « checkout »)', tone: 'mu' },
])
const unlocked = ref<number[]>([])
const passedSkills = ref<string[]>([])
const confettiPieces = ref<ConfettiPiece[]>([])
const hired = ref(false)
const outputTick = ref(0)

let logId = 1
let confettiId = 0

function log(text: string, tone: LogTone = '') {
  logs.value = [...logs.value, { id: logId++, text, tone }]
}

function trophy(index: number) {
  const item = TROPHIES[index]
  if (!item || unlocked.value.includes(index)) return
  unlocked.value = [...unlocked.value, index]
  log(`🏆 Succès débloqué : ${item.label}`, 'wa')
}

function confetti() {
  if (prefersReducedMotion()) return
  const burst: ConfettiPiece[] = Array.from({ length: 70 }, () => ({
    id: confettiId++,
    left: Math.random() * 100,
    hue: Math.random() * 360,
    delay: Math.random() * 0.6,
  }))
  confettiPieces.value = [...confettiPieces.value, ...burst]
  window.setTimeout(() => {
    const ids = new Set(burst.map((piece) => piece.id))
    confettiPieces.value = confettiPieces.value.filter((piece) => !ids.has(piece.id))
  }, 3200)
}

function markSkill(skill: string) {
  if (!passedSkills.value.includes(skill)) {
    passedSkills.value = [...passedSkills.value, skill]
  }
  const ms = Math.floor(Math.random() * 90 + 10)
  const slug = skill.toLowerCase().replace(/\W/g, '_')
  log(`PASS test_${slug} (${ms} ms)`, 'ok')
}

function hire(options: { silent?: boolean } = {}) {
  hired.value = true
  confetti()
  if (!options.silent) {
    log('git push origin main → Paul rejoint votre équipe 🎉', 'ok')
  }
}

async function run(index: number) {
  if (busy.value || index > done.value) return
  busy.value = true
  runningIndex.value = index
  const stage = STAGES[index]
  if (!stage) {
    busy.value = false
    runningIndex.value = null
    return
  }
  log(`\n▶ stage « ${stage.name} »`, 'bl')

  for (const line of stage.logs) {
    await sleep(380)
    const tone: LogTone = line.startsWith('✓') || line.startsWith('PASS') ? 'ok' : ''
    log(line, tone)
  }

  if (index >= done.value) done.value = index + 1
  runningIndex.value = null
  viewedIndex.value = index
  outputTick.value += 1
  busy.value = false
  trophy(0)
  if (done.value === STAGES.length) trophy(1)
}

const pipelineYear = new Date().getFullYear()
const progress = computed(() => (done.value / STAGES.length) * 100)
const pipelineSuccess = computed(() => done.value === STAGES.length)
const badgeText = computed(() => {
  if (pipelineSuccess.value) return `pipeline #${pipelineYear} · succès ✓`
  if (runningIndex.value !== null) {
    const stage = STAGES[runningIndex.value]
    if (stage) return `stage ${runningIndex.value + 1}/${STAGES.length} · ${stage.name}`
  }
  return `pipeline #${pipelineYear} · en attente`
})

export function useFolio() {
  return {
    stages: STAGES,
    trophies: TROPHIES,
    done,
    busy,
    runningIndex,
    viewedIndex,
    logs,
    unlocked,
    passedSkills,
    confettiPieces,
    hired,
    outputTick,
    pipelineYear,
    progress,
    pipelineSuccess,
    badgeText,
    run,
    log,
    trophy,
    confetti,
    markSkill,
    hire,
  }
}
