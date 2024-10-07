<script setup lang="ts">
import { useQuizState, QuizConfigOption } from '@/state/quizState'
import { computed, type ComputedRef } from 'vue'
const prop = defineProps<{
  period: number
  group: number
}>()
const coordinate = `${prop.group}-${prop.period}`
const state = useQuizState()
const element = state.elementsMap.get(coordinate)
const isSelected: ComputedRef<boolean> = computed(() => {
  return state.selectedElement == coordinate
})
const answered: ComputedRef<boolean> = computed(() => {
  return element == undefined ? false : state.getQuestionAnsweredCoordinateMap.has(coordinate)
})
const selectable: ComputedRef<boolean> = computed(() => {
  if (answered.value) {
    return false
  } else
    switch (state.config.periodAndGroup) {
      case QuizConfigOption.Show:
      case QuizConfigOption.AskWithHint:
        return element == undefined ? false : true
      case QuizConfigOption.Ask:
        return true
      case QuizConfigOption.Off:
        throw 'Panic'
    }
})
function select() {
  if (selectable.value) {
    state.setSelectedElement(coordinate)
  }
}
</script>

<template>
  <div
    @click="select"
    class="emptyBox"
    :class="{
      selectable: selectable,
      answered: answered,
      isSelected: isSelected
    }"
  >
    <div v-if="element != undefined && answered">
      <p class="contents">{{ element.symbol }}</p>
    </div>
  </div>
</template>

<style>
.emptyBox {
  margin: 3px;
  border: 1px solid black;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selectable {
  background-color: yellowgreen;
}
.answered {
  box-shadow: 1px 1px;
  background-color: yellow;
}
.isSelected {
  background-color: red;
}
.contents {
  margin: 0;
  font-weight: bold;
  font-size: 25px;
}
</style>
