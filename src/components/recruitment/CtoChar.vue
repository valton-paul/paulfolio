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
    class="char cto"
    :class="[
      `mood-${mood}`,
      `pose-${pose ?? 'standing'}`,
      `facing-${facing ?? 'left'}`,
    ]"
    aria-hidden="true"
  >
    <svg viewBox="0 0 160 210" class="char-svg">
      <ellipse class="shadow" cx="80" cy="198" rx="44" ry="8" fill="#00000022" />

      <g class="legs">
        <rect class="leg-l" x="56" y="168" width="16" height="28" rx="7" fill="#243247" />
        <rect class="leg-r" x="88" y="168" width="16" height="28" rx="7" fill="#243247" />
        <rect class="foot-l" x="52" y="192" width="22" height="8" rx="3" fill="#1a2233" />
        <rect class="foot-r" x="86" y="192" width="22" height="8" rx="3" fill="#1a2233" />
      </g>

      <g class="body">
        <path d="M48 110 Q80 98 112 110 L108 172 H52 Z" fill="#2f3b52" />
        <path d="M72 118 L80 150 L88 118 Z" fill="#ff6b6b" />
        <rect class="arm-l" x="34" y="116" width="14" height="44" rx="7" fill="#243247" />
        <rect class="arm-r" x="112" y="116" width="14" height="44" rx="7" fill="#243247" />
      </g>

      <g class="head">
        <circle cx="80" cy="70" r="38" fill="#ffd7b5" />
        <path d="M48 58 Q80 20 112 58 Q100 42 80 40 Q60 42 48 58 Z" fill="#1d2a44" />
        <g class="face">
          <circle class="eye eye-l" cx="66" cy="72" r="5" fill="#1d2a44" />
          <circle class="eye eye-r" cx="94" cy="72" r="5" fill="#1d2a44" />
          <path
            class="brow brow-l"
            d="M58 58 L74 62"
            stroke="#1d2a44"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            class="brow brow-r"
            d="M102 58 L86 62"
            stroke="#1d2a44"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            class="mouth"
            d="M68 92 Q80 88 92 92"
            fill="none"
            stroke="#1d2a44"
            stroke-width="3"
            stroke-linecap="round"
          />
        </g>
        <circle cx="48" cy="78" r="7" fill="#ffb894" />
        <circle cx="112" cy="78" r="7" fill="#ffb894" />
      </g>
    </svg>
  </div>
</template>
