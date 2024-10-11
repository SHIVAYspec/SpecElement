<script setup lang="ts">
import { useQuizState } from '@/state/quizState'
import Score from './components/Score.vue'
import PrimaryKeyInput from './components/PrimaryKeyInput.vue'
import Answer from './components/Answer.vue'
const state = useQuizState()
</script>

<template>
  <Score v-if="state.isOver" />
  <PrimaryKeyInput v-else-if="state.currentElement == undefined" />
  <Answer v-else />
</template>

<style>
.inputFlex {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: auto;
}
.text {
  margin: 5px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background-color: yellowgreen;
  white-space: nowrap;
}
</style>
