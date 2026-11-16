<script setup lang="ts">
import {
  Bug,
  Check,
  CircleCheck,
  Download,
  Egg,
  Eye,
  FlaskConical,
  Glasses,
  LoaderCircle,
  Lock,
  Mail,
  PartyPopper,
  Rocket,
  Shield,
  Trophy,
  Wrench,
  type LucideIcon,
} from '@lucide/vue'
import { computed } from 'vue'

import type { IconName } from '@/types'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number
    strokeWidth?: number
  }>(),
  {
    size: 16,
    strokeWidth: 2,
  },
)

const icons: Record<IconName, LucideIcon> = {
  download: Download,
  wrench: Wrench,
  flask: FlaskConical,
  shield: Shield,
  rocket: Rocket,
  loader: LoaderCircle,
  check: Check,
  lock: Lock,
  'circle-check': CircleCheck,
  glasses: Glasses,
  party: PartyPopper,
  bug: Bug,
  egg: Egg,
  trophy: Trophy,
  mail: Mail,
  eye: Eye,
}

const icon = computed(() => icons[props.name])
</script>

<template>
  <component
    :is="icon"
    class="app-icon"
    :class="`app-icon--${name}`"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
  />
</template>
