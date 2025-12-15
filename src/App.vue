<script setup lang="ts">
import { computed, ref } from 'vue'

import SceneVestibule from './components/SceneVestibule.vue'
import SceneHub from './components/SceneHub.vue'
import SceneProject from './components/SceneProject.vue'
import SceneContact from './components/SceneContact.vue'
import PageProjects from './components/PageProjects.vue'
import PageProfile from './components/PageProfile.vue'

type Scene = 'vestibule' | 'hub' | 'project' | 'projects' | 'profile' | 'contact'

const currentScene = ref<Scene>('vestibule')
const activeProjectId = ref<string | null>(null)

const sceneComponent = computed(() => {
  switch (currentScene.value) {
    case 'vestibule':
      return SceneVestibule
    case 'hub':
      return SceneHub
    case 'project':
      return SceneProject
    case 'projects':
      return PageProjects
    case 'profile':
      return PageProfile
    case 'contact':
      return SceneContact
  }

})

const goToHub = () => {
  currentScene.value = 'hub'
}

const openProject = (id: string) => {
  activeProjectId.value = id
  currentScene.value = 'project'
}

const closeProject = () => {
  activeProjectId.value = null
  currentScene.value = 'hub'
}

const openContact = () => {
  currentScene.value = 'contact'
}

const exitContact = () => {
  currentScene.value = 'hub'
}

const goToProjectsPage = () => {
  currentScene.value = 'projects'
}

const goToProfilePage = () => {
  currentScene.value = 'profile'
}
</script>

<template>
  <div
    class="min-h-svh bg-gradient-to-b from-slate-950 via-slate-950 to-black text-sky-50 overflow-hidden"
  >
    <main
      class="relative min-h-svh flex items-stretch justify-center px-4 py-6 md:px-8 md:py-10 lg:px-16"
    >
      <Transition name="scene-fade" mode="out-in">
        <component
          :is="sceneComponent"
          :key="currentScene"
          :active-project-id="activeProjectId"
          @enter-hub="goToHub"
          @open-project="openProject"
          @open-projects-page="goToProjectsPage"
          @open-profile-page="goToProfilePage"
          @close-project="closeProject"
          @open-contact="openContact"
          @exit-contact="exitContact"
        />
      </Transition>
    </main>
  </div>
</template>

<style>
.scene-fade-enter-active,
.scene-fade-leave-active {
  transition: opacity 250ms ease, transform 260ms ease;
}

.scene-fade-enter-from,
.scene-fade-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(4px);
}
</style>
