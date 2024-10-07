<script setup lang="ts">
import PeriodicTable from '@/components/periodicTable/main.vue'
import InputAndResult from '@/components/inputAndResult/main.vue'
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
</script>

<template>
  <div
    class="page"
    :style="{
      height: height,
      width: width
    }"
  >
    <div class="box periodicTable">
      <PeriodicTable />
    </div>
    <div class="box inputAndResult">
      <InputAndResult />
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
.box {
  border: 1px solid black;
  padding: 3px;
  width: 1008px;
  max-width: 100%;
  overflow: auto;
}
.periodicTable {
  height: 560px;
  max-height: 100%;
  background-color: #a9cce3;
}
.inputAndResult {
  height: 50px;
  min-height: 50px;
  background-color: #f4d03f;
}
</style>
