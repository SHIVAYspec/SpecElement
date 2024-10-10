<script setup lang="ts">
import { ref, type Ref, watchEffect } from 'vue'
import { useQuizState, QuizConfigPrimaryKey } from '@/state/quizState'
const state = useQuizState()
const primaryKey: Ref<string> = ref('')
watchEffect(() => {
  if (state.config.primaryKey == QuizConfigPrimaryKey.periodAndGroup) {
    state.setCurrentElement(state.selectedElement ?? '')
  } else {
    state.setCurrentElement(primaryKey.value)
  }
})
// Autofocus
import { useFocus } from '@vueuse/core'
const target = ref()
const { focused } = useFocus(target)
watchEffect(() => {
  if (state.currentElement == undefined) {
    focused.value = true
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
      ref="target"
      class="text"
      type="number"
      placeholder="Atomic Number"
      @input="(event) => (primaryKey = (event.target as HTMLInputElement).value)"
    />
    <input
      v-if="state.config.primaryKey == QuizConfigPrimaryKey.symbol"
      ref="target"
      class="text"
      type="text"
      placeholder="Symbol"
      v-model="primaryKey"
    />
    <input
      v-if="state.config.primaryKey == QuizConfigPrimaryKey.name"
      ref="target"
      class="text"
      type="text"
      placeholder="Name"
      v-model="primaryKey"
    />
  </div>
</template>
