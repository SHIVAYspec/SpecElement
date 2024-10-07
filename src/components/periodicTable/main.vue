<script setup lang="ts">
import ElementCard from '@/components/periodicTable/components/ElementCard.vue'
import { QuizConfigOption, useQuizState } from '@/state/quizState'
import { computed } from 'vue'
const state = useQuizState()
const showPeriodsAndGroup = computed(() => {
  return state.config.periodAndGroup != QuizConfigOption.Off
})
</script>

<template>
  <div v-if="showPeriodsAndGroup">
    <div v-for="i in 10" class="period">
      <div v-for="j in 18" class="group">
        <ElementCard :period="i" :group="j" />
      </div>
    </div>
  </div>
</template>

<style>
.period {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
