<script setup lang="ts">
import { useTerminal } from '@/composables/useTerminal'

const { lines, input, scroller, onKeydown } = useTerminal()
</script>

<template>
  <div class="panel">
    <div class="ph">
      <span>terminal interactif</span>
      <span>essaie : help</span>
    </div>
    <div ref="scroller" class="term" aria-live="polite">
      <template v-for="line in lines" :key="line.id">
        <div v-if="line.kind === 'hint'" class="mu">{{ line.text }}</div>
        <div v-else-if="line.kind === 'in'"><span class="ok">$</span> {{ line.text }}</div>
        <div v-else>{{ line.text }}</div>
      </template>
    </div>
    <div class="row">
      <span class="ok">paul@folio:~$</span>
      <input
        v-model="input"
        autocomplete="off"
        spellcheck="false"
        aria-label="commande"
        placeholder="help"
        @keydown="onKeydown"
      />
    </div>
  </div>
</template>
