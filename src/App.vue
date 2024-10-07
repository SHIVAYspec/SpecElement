<script setup lang="ts">
import Layout from '@/Layout.vue'
import { QuizConfigPrimaryKey, QuizConfigOption, useQuizState } from './state/quizState'
const state = useQuizState()
state.setConfig({
  primaryKey: QuizConfigPrimaryKey.name,
  periodAndGroup: QuizConfigOption.Show,
  atomicNo: QuizConfigOption.Off,
  symbol: QuizConfigOption.Off,
  name: QuizConfigOption.Off,
  category: QuizConfigOption.Off
})
</script>

<template>
  <Layout />
</template>
