import { createRouter, createWebHistory } from 'vue-router'
import Quiz from '@/Quiz.vue'

const router = createRouter({
  history: createWebHistory('/SpecElement/'),
  routes: [{ path: '/', component: Quiz }]
})
export default router
