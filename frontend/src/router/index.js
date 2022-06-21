import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/views/Main.vue';
import Search from '@/views/Search.vue';
import ActivityDetail from '@/views/ActivityDetail.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,

    },
    {
      path: '/search/:val?',
      name: 'search',
      component: Search,

    },
    {
      path: '/ActivityDetail/:val',
      name: 'ActivityDetail',
      component: ActivityDetail
    },


  ]
})

export default router
