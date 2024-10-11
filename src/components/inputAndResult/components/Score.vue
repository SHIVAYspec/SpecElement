<script setup lang="ts">
import { useQuizState } from '@/state/quizState'
const state = useQuizState()
</script>
<template>
  <div class="inputFlex">
    <p class="text">
      {{ `Score : ${state.questionsAnswered.size} out of ${state.elementsMap.size}` }}
    </p>
  </div>
</template>
