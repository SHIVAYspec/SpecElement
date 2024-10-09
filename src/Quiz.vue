<script setup lang="ts">
import Layout from '@/QuizLayout.vue'
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
    <div v-if="state.config.isSet">
      <Layout />
    </div>
    <div v-else>
      <Config />
    </div>
  </div>
</template>

<style>
.page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #5dade2;
}
</style>
