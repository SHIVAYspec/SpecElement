<script setup lang="ts">
import { useQuizState, QuizConfigPrimaryKey } from '@/state/quizState'
import { ref, type Ref, watchEffect } from 'vue'
const state = useQuizState()
const primaryKey: Ref<string> = ref('')
watchEffect(() => {
  if (state.config.primaryKey == QuizConfigPrimaryKey.periodAndGroup) {
    state.setCurrentElement(state.selectedElement ?? '')
  } else {
    state.setCurrentElement(primaryKey.value)
  }
})
</script>

<template>
  <div v-if="state.currentElement == undefined" class="inputCenter">
    <p v-if="state.config.primaryKey == QuizConfigPrimaryKey.periodAndGroup" class="text">
      Select an element from above
    </p>
    <input
      v-if="state.config.primaryKey == QuizConfigPrimaryKey.atomicNo"
      class="text"
      type="number"
      placeholder="Atomic Number"
      autofocus="true"
      @input="(event) => (primaryKey = (event.target as HTMLInputElement).value)"
    />
    <input
      v-if="state.config.primaryKey == QuizConfigPrimaryKey.symbol"
      class="text"
      type="text"
      placeholder="Symbol"
      autofocus="true"
      v-model="primaryKey"
    />
    <input
      v-if="state.config.primaryKey == QuizConfigPrimaryKey.name"
      class="text"
      type="text"
      placeholder="Name"
      autofocus="true"
      v-model="primaryKey"
    />
  </div>
</template>
