<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { stringifyQuery, useRoute } from 'vue-router'
import {
  QuizConfigPrimaryKey,
  QuizConfigOption,
  useQuizState,
  type QuizConfig
} from './state/quizState'
import router from './router'
const route = useRoute()
function getParameter(q: string): string | undefined {
  const result = route.query[q]
  if (typeof result == 'string') {
    return result
  } else {
    return undefined
  }
}
const propertiesOptionsMap = new Map<string, { label: string; enum: QuizConfigOption }>()
propertiesOptionsMap.set('off', { label: 'Off', enum: QuizConfigOption.Off })
propertiesOptionsMap.set('show', { label: 'Show', enum: QuizConfigOption.Show })
propertiesOptionsMap.set('askhint', {
  label: 'Ask (with hint)',
  enum: QuizConfigOption.AskWithHint
})
propertiesOptionsMap.set('ask', { label: 'Ask', enum: QuizConfigOption.Ask })
const propertiesOptionsElement: Array<{
  parmValue: string
  label: string
  enum: QuizConfigOption
}> = Array.from(propertiesOptionsMap.entries()).map(([key, value]) => {
  return {
    parmValue: key,
    label: value.label,
    enum: value.enum
  }
})
function getEnumFromParameter(q: string): QuizConfigOption {
  const p = getParameter(q)
  if (p != undefined) {
    const r = propertiesOptionsMap.get(p)
    return r == undefined ? QuizConfigOption.Show : r.enum
  }
  return QuizConfigOption.Show
}
const primaryKeyMap = new Map<string, { label: string; enum: QuizConfigPrimaryKey }>()
primaryKeyMap.set('p', { label: 'Period And Group', enum: QuizConfigPrimaryKey.periodAndGroup })
primaryKeyMap.set('a', { label: 'Atomic Number', enum: QuizConfigPrimaryKey.atomicNo })
primaryKeyMap.set('s', { label: 'Symbol', enum: QuizConfigPrimaryKey.symbol })
primaryKeyMap.set('n', { label: 'Name', enum: QuizConfigPrimaryKey.name })
const primaryKeyElements: Array<{ parmKey: string; label: string; enum: QuizConfigPrimaryKey }> =
  Array.from(primaryKeyMap.entries()).map(([key, value]) => {
    return {
      parmKey: key,
      label: value.label,
      enum: value.enum
    }
  })
function getPrimaryKeyFromURL(): QuizConfigPrimaryKey {
  const p = getParameter('pk')
  if (p != undefined) {
    const r = primaryKeyMap.get(p)
    return r == undefined ? QuizConfigPrimaryKey.name : r.enum
  }
  return QuizConfigPrimaryKey.name
}
const config: ComputedRef<QuizConfig> = computed(() => {
  return {
    isSet: true,
    primaryKey: getPrimaryKeyFromURL(),
    periodAndGroup: getEnumFromParameter('p'),
    atomicNo: getEnumFromParameter('a'),
    symbol: getEnumFromParameter('s'),
    name: getEnumFromParameter('n'),
    category: QuizConfigOption.Off
  }
})
const state = useQuizState()
function start() {
  state.setConfig(config.value)
}
function setPrimaryKeyParameter(p: string): void {
  router.push({ path: '/', query: { ...route.query, pk: p } })
}
function setOptionKeyParameter(option: string, value: string): void {
  const query = { ...route.query }
  query[option] = value
  router.push({ path: '/', query })
}
</script>

<template>
  <div class="configmenu">
    <table class="border">
      <tr>
        <td class="border cell maincell" colspan="2">
          <h1 class="label" style="font-size: xx-large">Periodic Table Quiz</h1>
        </td>
      </tr>
      <tr class="border">
        <td class="border cell maincell">
          <p class="label">Primary Key</p>
        </td>
        <td class="border cell subcell">
          <button
            v-for="e in primaryKeyElements"
            class="selector"
            :class="{ selected: e.enum == config.primaryKey }"
            @click="setPrimaryKeyParameter(e.parmKey)"
          >
            {{ e.label }}
          </button>
        </td>
      </tr>
      <tr v-for="property in primaryKeyElements" class="border">
        <td class="border cell maincell">
          <p class="label">{{ property.label }}</p>
        </td>
        <td class="border cell subcell">
          <button
            v-for="option in propertiesOptionsElement"
            class="selector"
            :class="{ selected: option.enum == getEnumFromParameter(property.parmKey) }"
            @click="setOptionKeyParameter(property.parmKey, option.parmValue)"
          >
            {{ option.label }}
          </button>
        </td>
      </tr>
      <tr>
        <td class="border cell subcell" colspan="2">
          <button @click="start" class="selector" style="font-size: x-large">Start</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style>
.configmenu {
  box-shadow: 3px 3px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 9px;
  background-color: rgba(95, 158, 160, 0.5);
}
.border {
  border: 1px solid black;
  border-collapse: collapse;
}
.maincell {
  background-color: lightblue;
}
.subcell {
  background-color: cadetblue;
}
.cell {
  text-align: center;
}
.selector {
  margin: 5px;
  border-radius: 5px;
  padding: 5px;
  font-weight: bold;
}
.label {
  margin: 5px;
  font-weight: bold;
  font-size: larger;
}
.selected {
  background-color: lightskyblue;
}
</style>
