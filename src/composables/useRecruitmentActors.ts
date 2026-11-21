import { reactive, ref, type Reactive } from 'vue'

import type { CharacterMood, CtoSpot } from '@/data/recruitment'
import { wait } from '@/composables/useMotion'

export type ActorId = 'rh' | 'cto'
export type ActorFacing = 'left' | 'right'
export type ActorPose = 'standing' | 'walking' | 'sitting' | 'stopping'
export type ActorSpot = 'rh' | 'handoff' | CtoSpot

export interface ActorPosition {
  /** Horizontal center as % of office width */
  x: number
  /** Distance from bottom as % of office height */
  y: number
}

export interface ActorState {
  id: ActorId
  x: number
  y: number
  facing: ActorFacing
  pose: ActorPose
  mood: CharacterMood
  spot: ActorSpot
  z: number
}

const SPOTS: Record<ActorSpot, ActorPosition> = {
  rh: { x: 14, y: 7 },
  /** RH approaches the CTO to hand over the dossier */
  handoff: { x: 36, y: 7 },
  desk: { x: 50, y: 7 },
  coffee: { x: 86, y: 8 },
}

/** Mid waypoint so the CTO walks in front of the desk instead of through it. */
const WALK_DIP_Y = 4.5

const speedScaleRef = ref(1)

export function setActorSpeedScale(scale: number) {
  speedScaleRef.value = Math.max(0.5, scale)
}

function scaledMs(ms: number): number {
  // Easter egg is an explicit cinematic: always animate, even if the OS
  // prefers reduced motion (Windows "Show animations" off, etc.).
  return Math.max(40, ms / speedScaleRef.value)
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function animateNumeric(
  from: number,
  to: number,
  durationMs: number,
  onUpdate: (value: number) => void,
  isStale: () => boolean,
): Promise<void> {
  if (durationMs <= 40 || Math.abs(to - from) < 0.05) {
    onUpdate(to)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const start = performance.now()
    let timer = 0

    const finish = () => {
      window.clearTimeout(timer)
      resolve()
    }

    const tick = () => {
      if (isStale()) {
        finish()
        return
      }
      const now = performance.now()
      const t = Math.min(1, (now - start) / durationMs)
      onUpdate(from + (to - from) * easeInOutCubic(t))
      if (t < 1) {
        // setTimeout stays reliable when rAF is throttled (background tabs).
        timer = window.setTimeout(tick, 16)
      } else {
        finish()
      }
    }

    tick()
  })
}

type QueueTask = () => Promise<void>

export interface ActorController {
  state: Reactive<ActorState>
  walkTo: (spot: ActorSpot) => Promise<void>
  turn: (facing: ActorFacing) => Promise<void>
  idle: () => Promise<void>
  talk: () => Promise<void>
  react: (emotion: CharacterMood) => Promise<void>
  sit: () => Promise<void>
  standUp: () => Promise<void>
  setMood: (mood: CharacterMood) => void
  snapTo: (spot: ActorSpot) => void
  flush: () => Promise<void>
  cancel: (snapSpot?: ActorSpot) => void
  reset: (spot: ActorSpot) => void
}

function createActor(id: ActorId, initialSpot: ActorSpot): ActorController {
  const initial = SPOTS[initialSpot]
  const state = reactive<ActorState>({
    id,
    x: initial.x,
    y: initial.y,
    facing: id === 'rh' ? 'right' : 'left',
    pose: 'standing',
    mood: 'idle',
    spot: initialSpot,
    z: id === 'rh' ? 3 : 4,
  })

  let queue: QueueTask[] = []
  let running = false
  let epoch = 0

  const isStale = (taskEpoch: number) => taskEpoch !== epoch

  async function runQueue() {
    if (running) return
    running = true
    while (queue.length > 0) {
      const task = queue.shift()
      if (!task) break
      try {
        await task()
      } catch {
        /* interrupted */
      }
    }
    running = false
  }

  function enqueue(task: QueueTask): Promise<void> {
    const taskEpoch = epoch
    return new Promise((resolve) => {
      queue.push(async () => {
        if (isStale(taskEpoch)) {
          resolve()
          return
        }
        await task()
        resolve()
      })
      void runQueue()
    })
  }

  function snapTo(spot: ActorSpot) {
    const pos = SPOTS[spot]
    state.x = pos.x
    state.y = pos.y
    state.spot = spot
    state.pose = 'standing'
    if (spot === 'coffee') state.z = 5
    else if (spot === 'handoff') state.z = 6
    else state.z = id === 'rh' ? 3 : 4
  }

  async function turn(facing: ActorFacing): Promise<void> {
    const taskEpoch = epoch
    return enqueue(async () => {
      if (isStale(taskEpoch) || state.facing === facing) return
      state.facing = facing
      await wait(scaledMs(120))
    })
  }

  async function walkTo(spot: ActorSpot): Promise<void> {
    const taskEpoch = epoch
    return enqueue(async () => {
      if (isStale(taskEpoch)) return

      const target = SPOTS[spot]
      if (Math.abs(state.x - target.x) < 0.4 && Math.abs(state.y - target.y) < 0.4) {
        snapTo(spot)
        return
      }

      const dx = target.x - state.x
      const desiredFacing: ActorFacing = dx >= 0 ? 'right' : 'left'
      if (state.facing !== desiredFacing) {
        state.facing = desiredFacing
        await wait(scaledMs(140))
        if (isStale(taskEpoch)) return
      }

      state.pose = 'walking'
      state.mood = 'idle'

      const fromX = state.x
      const fromY = state.y
      const midX = (fromX + target.x) / 2
      const midY = Math.min(fromY, target.y, WALK_DIP_Y)
      const dist = Math.hypot(target.x - fromX, target.y - fromY)
      const totalMs = scaledMs(Math.max(550, dist * 32))
      const firstMs = totalMs * 0.48
      const secondMs = totalMs - firstMs

      state.z = 6
      await animateNumeric(
        0,
        1,
        firstMs,
        (t) => {
          state.x = fromX + (midX - fromX) * t
          state.y = fromY + (midY - fromY) * t
        },
        () => isStale(taskEpoch),
      )

      if (isStale(taskEpoch)) {
        state.pose = 'standing'
        return
      }

      await animateNumeric(
        0,
        1,
        secondMs,
        (t) => {
          state.x = midX + (target.x - midX) * t
          state.y = midY + (target.y - midY) * t
        },
        () => isStale(taskEpoch),
      )

      if (isStale(taskEpoch)) {
        state.pose = 'standing'
        return
      }

      state.x = target.x
      state.y = target.y
      state.spot = spot
      if (spot === 'coffee') state.z = 5
      else if (spot === 'handoff') state.z = 6
      else state.z = id === 'rh' ? 3 : 4

      state.pose = 'stopping'
      await wait(scaledMs(160))
      if (isStale(taskEpoch)) {
        state.pose = 'standing'
        return
      }
      state.pose = 'standing'

      if (spot === 'desk' || spot === 'coffee') state.facing = 'left'
      if (spot === 'rh' || spot === 'handoff') state.facing = 'right'
    })
  }

  async function idle(): Promise<void> {
    return enqueue(async () => {
      state.pose = state.pose === 'sitting' ? 'sitting' : 'standing'
      state.mood = 'idle'
      await wait(scaledMs(80))
    })
  }

  async function talk(): Promise<void> {
    return enqueue(async () => {
      if (state.pose === 'walking') return
      state.mood = 'talk'
      await wait(scaledMs(60))
    })
  }

  async function react(emotion: CharacterMood): Promise<void> {
    return enqueue(async () => {
      state.mood = emotion
      await wait(scaledMs(90))
    })
  }

  async function sit(): Promise<void> {
    return enqueue(async () => {
      if (state.pose === 'sitting') return
      state.pose = 'sitting'
      state.y = Math.max(5, state.y - 1.2)
      await wait(scaledMs(220))
    })
  }

  async function standUp(): Promise<void> {
    return enqueue(async () => {
      if (state.pose !== 'sitting') return
      const base = SPOTS[state.spot]
      state.pose = 'standing'
      state.y = base.y
      await wait(scaledMs(200))
    })
  }

  function setMood(mood: CharacterMood) {
    state.mood = mood
  }

  async function flush(): Promise<void> {
    if (!running && queue.length === 0) return
    await new Promise<void>((resolve) => {
      queue.push(async () => resolve())
      void runQueue()
    })
  }

  function nearestSpot(): ActorSpot {
    if (id === 'rh') {
      return Math.abs(state.x - SPOTS.handoff.x) < Math.abs(state.x - SPOTS.rh.x)
        ? 'handoff'
        : 'rh'
    }
    const desk = SPOTS.desk
    const coffee = SPOTS.coffee
    return Math.abs(state.x - coffee.x) < Math.abs(state.x - desk.x) ? 'coffee' : 'desk'
  }

  function cancel(snapSpot?: ActorSpot) {
    epoch += 1
    queue = []
    if (snapSpot) {
      snapTo(snapSpot)
    } else {
      // Freeze mid-path — never teleport back to an old spot.
      state.spot = nearestSpot()
      state.pose = 'standing'
      if (state.spot === 'coffee') state.z = 5
      else if (state.spot === 'handoff') state.z = 6
      else state.z = id === 'rh' ? 3 : 4
    }
  }

  function reset(spot: ActorSpot) {
    epoch += 1
    queue = []
    running = false
    snapTo(spot)
    state.mood = 'idle'
    state.facing = id === 'rh' ? 'right' : 'left'
    state.pose = 'standing'
  }

  return {
    state,
    walkTo,
    turn,
    idle,
    talk,
    react,
    sit,
    standUp,
    setMood,
    snapTo,
    flush,
    cancel,
    reset,
  }
}

const rhActor = createActor('rh', 'rh')
const ctoActor = createActor('cto', 'desk')

export function useRecruitmentActors() {
  return {
    rh: rhActor,
    cto: ctoActor,
    spots: SPOTS,
    setActorSpeedScale,
  }
}

export function resetRecruitmentActors() {
  rhActor.reset('rh')
  ctoActor.reset('desk')
  setActorSpeedScale(1)
}

export function cancelRecruitmentActors(options?: { rhSpot?: ActorSpot; ctoSpot?: ActorSpot }) {
  rhActor.cancel(options?.rhSpot)
  ctoActor.cancel(options?.ctoSpot)
}
