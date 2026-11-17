<script setup lang="ts">
import type { CharacterMood } from '@/data/recruitment'
import type { ActorFacing, ActorPose } from '@/composables/useRecruitmentActors'

defineProps<{
  mood: CharacterMood
  facing?: ActorFacing
  pose?: ActorPose
}>()
</script>

<template>
  <div
    class="char rh"
    :class="[
      `mood-${mood}`,
      `pose-${pose ?? 'standing'}`,
      `facing-${facing ?? 'right'}`,
    ]"
    aria-hidden="true"
  >
    <svg viewBox="0 0 160 210" class="char-svg">
      <ellipse class="shadow" cx="80" cy="198" rx="44" ry="8" fill="#00000022" />

      <g class="legs">
        <rect class="leg-l" x="58" y="168" width="16" height="28" rx="7" fill="#3d6bc4" />
        <rect class="leg-r" x="86" y="168" width="16" height="28" rx="7" fill="#3d6bc4" />
        <rect class="foot-l" x="54" y="192" width="22" height="8" rx="3" fill="#243247" />
        <rect class="foot-r" x="84" y="192" width="22" height="8" rx="3" fill="#243247" />
      </g>

      <g class="body">
        <rect x="48" y="108" width="64" height="68" rx="16" fill="#5b8def" />
        <rect x="58" y="118" width="44" height="28" rx="8" fill="#dce9ff" />
        <circle cx="68" cy="130" r="4" fill="#3ddc97" class="led" />
        <circle cx="80" cy="130" r="4" fill="#3ddc97" class="led" />
        <circle cx="92" cy="130" r="4" fill="#3ddc97" class="led" />
        <rect class="arm-l" x="34" y="118" width="14" height="42" rx="7" fill="#4a78d4" />
        <rect class="arm-r" x="112" y="118" width="14" height="42" rx="7" fill="#4a78d4" />
      </g>

      <g class="head">
        <circle cx="80" cy="72" r="40" fill="#eef4ff" stroke="#5b8def" stroke-width="4" />
        <g class="face">
          <circle class="eye eye-l" cx="66" cy="70" r="7" fill="#1d2a44" />
          <circle class="eye eye-r" cx="94" cy="70" r="7" fill="#1d2a44" />
          <circle class="eye-shine" cx="64" cy="68" r="2.5" fill="#fff" />
          <circle class="eye-shine" cx="92" cy="68" r="2.5" fill="#fff" />
          <path
            class="brow brow-l"
            d="M56 56 L74 58"
            fill="none"
            stroke="#1d2a44"
            stroke-width="0"
            stroke-linecap="round"
          />
          <path
            class="brow brow-r"
            d="M104 56 L86 58"
            fill="none"
            stroke="#1d2a44"
            stroke-width="0"
            stroke-linecap="round"
          />
          <path
            class="mouth"
            d="M66 90 Q80 100 94 90"
            fill="none"
            stroke="#1d2a44"
            stroke-width="3"
            stroke-linecap="round"
          />
        </g>
        <rect class="antenna" x="72" y="28" width="16" height="12" rx="3" fill="#ffb454" />
        <circle class="antenna-tip" cx="80" cy="24" r="6" fill="#ff6b6b" />
      </g>
    </svg>
  </div>
</template>
