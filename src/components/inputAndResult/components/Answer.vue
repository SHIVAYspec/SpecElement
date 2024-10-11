<script setup lang="ts">
import {
  useQuizState,
  type Answer,
  QuizConfigOption,
  QuizConfigPrimaryKey
} from '@/state/quizState'
import { ref, type Ref, watchEffect, type ComputedRef, watch } from 'vue'
const state = useQuizState()
const primaryKey: Ref<string> = ref('')
const answer: Ref<Answer> = ref({})
watchEffect(() => {
  if (
    state.config.periodAndGroup == QuizConfigOption.AskWithHint ||
    state.config.periodAndGroup == QuizConfigOption.Ask
  ) {
    answer.value.periodAndGroup = state.selectedElement
  }
})
watchEffect(() => {
  if (state.tryAnswer(answer.value)) {
    primaryKey.value = ''
    answer.value = {}
  }
})
// Autofocus
import { useFocus } from '@vueuse/core'
import { computed } from 'vue'
import { onMounted } from 'vue'
const target = ref()
const { focused } = useFocus(target)
onMounted(() => {
  focused.value = true
})
const autoFocusPK: ComputedRef<QuizConfigPrimaryKey> = computed(() => {
  function isAsked(sub: QuizConfigOption) {
    return sub == QuizConfigOption.Ask || sub == QuizConfigOption.AskWithHint
  }
  if (isAsked(state.config.periodAndGroup)) return QuizConfigPrimaryKey.periodAndGroup
  if (isAsked(state.config.atomicNo)) return QuizConfigPrimaryKey.atomicNo
  if (isAsked(state.config.symbol)) return QuizConfigPrimaryKey.symbol
  if (isAsked(state.config.name)) return QuizConfigPrimaryKey.name
  return QuizConfigPrimaryKey.periodAndGroup
})
function isTarget(sub: QuizConfigPrimaryKey): undefined | Ref<any, any> {
  return sub == autoFocusPK.value ? target : undefined
}
function shouldAutoFocus(sub: QuizConfigPrimaryKey): boolean {
  return sub == autoFocusPK.value
}
</script>

<template>
  <div v-if="state.currentElement != undefined" class="inputFlex">
    <p v-if="state.config.periodAndGroup == QuizConfigOption.Show" class="text">
      {{ state.currentElement.xpos + ':' + state.currentElement.ypos }}
    </p>
    <p
      v-else-if="
        (state.config.periodAndGroup == QuizConfigOption.AskWithHint ||
          state.config.periodAndGroup == QuizConfigOption.Ask) &&
        answer.periodAndGroup == null
      "
      class="text"
    >
      Select An element (Period and group) from above
    </p>
    <p
      v-else-if="
        (state.config.periodAndGroup == QuizConfigOption.AskWithHint ||
          state.config.periodAndGroup == QuizConfigOption.Ask) &&
        answer.periodAndGroup != null
      "
      class="text"
    >
      Peroiod & Group: {{ answer.periodAndGroup }}
    </p>
    <p v-if="state.config.atomicNo == QuizConfigOption.Show" class="text">
      Atomic Number : {{ state.currentElement.number }}
    </p>
    <input
      v-else-if="
        state.config.atomicNo == QuizConfigOption.AskWithHint ||
        state.config.atomicNo == QuizConfigOption.Ask
      "
      v-bind:ref="isTarget(QuizConfigPrimaryKey.atomicNo)"
      v-bind:autofocus="shouldAutoFocus(QuizConfigPrimaryKey.atomicNo)"
      class="text"
      style="width: 136px"
      type="number"
      placeholder="Atomic No."
      @input="(event) => (answer.atomicNo = (event.target as HTMLInputElement).value)"
    />
    <p v-if="state.config.symbol == QuizConfigOption.Show" class="text">
      Symbol: {{ state.currentElement.symbol }}
    </p>
    <input
      v-else-if="
        state.config.symbol == QuizConfigOption.AskWithHint ||
        state.config.symbol == QuizConfigOption.Ask
      "
      v-bind:ref="isTarget(QuizConfigPrimaryKey.symbol)"
      v-bind:autofocus="shouldAutoFocus(QuizConfigPrimaryKey.symbol)"
      class="text"
      style="width: 84px"
      type="text"
      placeholder="Symbol"
      v-model="answer.symbol"
    />
    <p v-if="state.config.name == QuizConfigOption.Show" class="text">
      Name: {{ state.currentElement.name }}
    </p>
    <input
      v-else-if="
        state.config.name == QuizConfigOption.AskWithHint ||
        state.config.name == QuizConfigOption.Ask
      "
      v-bind:ref="isTarget(QuizConfigPrimaryKey.name)"
      v-bind:autofocus="shouldAutoFocus(QuizConfigPrimaryKey.name)"
      class="text"
      type="text"
      placeholder="Name"
      v-model="answer.name"
    />
    <button
      @click="(state.currentElement = undefined), (state.selectedElement = undefined)"
      class="text"
      style="background-color: red"
    >
      Cancel
    </button>
  </div>
</template>
