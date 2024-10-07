<script setup lang="ts">
import { useQuizState, type Answer, QuizConfigOption } from '@/state/quizState'
import { ref, type Ref, watchEffect } from 'vue'
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
</script>

<template>
  <div v-if="state.currentElement != undefined" class="inputCenter">
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
      class="text"
      style="width: 136px"
      type="number"
      placeholder="Atomic No."
      autofocus="true"
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
      class="text"
      style="width: 84px"
      type="text"
      placeholder="Symbol"
      autofocus="true"
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
      class="text"
      type="text"
      placeholder="Name"
      autofocus="true"
      v-model="answer.name"
    />
  </div>
</template>
