<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <div class="coffee-set" :class="{ active }" aria-hidden="true">
    <div class="coffee-cabinet">
      <div class="coffee-machine">
        <div class="cm-top" />
        <div class="cm-body">
          <div class="cm-display" />
          <div class="cm-buttons">
            <span /><span /><span />
          </div>
          <div class="cm-spout" />
          <div class="cm-cup" />
          <div v-if="active" class="cm-steam">
            <span /><span /><span />
          </div>
        </div>
        <div class="cm-base" />
      </div>
      <p class="coffee-tag">Café++</p>
    </div>
  </div>
</template>
