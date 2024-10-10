<script setup lang="ts">
import QuizLayout from '@/QuizLayout.vue'
import Config from '@/Config.vue'
// Reactive adjustment of main div dimension based on viewport dimension
import { ref } from 'vue'
import { onUnmounted } from 'vue'
const height = ref<string>('')
const width = ref<string>('')
function watchViewportResize() {
  const htemp = visualViewport?.height
  height.value = htemp == undefined ? '100vh' : `${htemp}px`
  const wtemp = visualViewport?.width
  width.value = wtemp == undefined ? '100vw' : `${wtemp}px`
}
watchViewportResize()
visualViewport?.addEventListener('resize', watchViewportResize)
onUnmounted(() => {
  visualViewport?.removeEventListener('resize', watchViewportResize)
})
// State
import { useQuizState } from '@/state/quizState'
const state = useQuizState()
</script>

<template>
  <div
    class="page"
    :style="{
      height: height,
      width: width
    }"
  >
    <QuizLayout v-if="state.config.isSet" />
    <Config v-else />
  </div>
</template>

<style>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5dade2;
}
</style>
