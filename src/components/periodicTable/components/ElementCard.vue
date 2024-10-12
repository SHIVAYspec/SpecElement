<script setup lang="ts">
import { useQuizState, QuizConfigOption, elementGroupColorCodeMap } from '@/state/quizState'
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
  return element == undefined ? false : state.getQuestionsAnsweredCoordinateMap.has(coordinate)
})
const isSelectable: ComputedRef<boolean> = computed(() => {
  if (state.isOver) return true
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
const boxColor: ComputedRef<string | undefined> = computed<string | undefined>(() => {
  // Is selected
  if (isSelected.value) return 'red'
  // Is answered
  if (answered.value) {
    return elementGroupColorCodeMap.get(element?.category ?? '')
  }
  // Is not answered after giving up
  if (state.gaveupStatus && element != undefined) return 'orange'
  // Is selectable
  if (isSelectable.value) return 'yellowgreen'
})
const showContents = computed(() => {
  return element != undefined && (answered.value || state.isOver)
})
function select() {
  if (isSelectable.value) {
    state.setSelectedElement(coordinate)
  }
}
</script>

<template>
  <div @click="select" v-bind:style="{}" class="emptyBox" :style="{ backgroundColor: boxColor }">
    <div
      v-if="element != undefined && showContents"
      style="
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      "
    >
      <div
        style="
          width: 100%;
          height: 75%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: flex-start;
        "
      >
        <p class="contents" style="font-size: large; font-weight: bold">{{ element.symbol }}</p>
        <p class="contents" style="font-size: x-small; font-weight: lighter">
          {{ element.number }}
        </p>
      </div>
      <p
        class="contents"
        style="font-size: small; font-weight: lighter; inline-size: 100%; word-break: break-all"
      >
        {{ element.name }}
      </p>
    </div>
  </div>
</template>

<style>
.emptyBox {
  margin: 1px;
  border: 1px solid black;
  padding: 2px;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
}
.contents {
  margin: 0;
  padding: 0;
}
</style>
