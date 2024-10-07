<script setup lang="ts">
import { useQuizState } from '@/state/quizState'
import PrimaryKeyInput from './components/PrimaryKeyInput.vue'
import Answer from './components/Answer.vue'
const state = useQuizState()
</script>

<template>
  <PrimaryKeyInput v-if="state.currentElement == undefined" />
  <Answer v-else />
</template>

<style>
.inputCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.text {
  margin: 5px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background-color: yellowgreen;
  font-size: x-large;
}
</style>
