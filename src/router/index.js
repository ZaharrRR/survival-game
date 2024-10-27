import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import TownsView from '@/views/TownsView.vue'
import TownView from '@/views/TownView.vue'
import BuildingView from '@/views/BuildingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/towns', name: 'towns', component: TownsView },
    { path: '/towns/:townId', name: 'town', props: true, component: TownView },
    {
      path: '/towns/:townId/:buildingId',
      name: 'building',
      props: true,
      component: BuildingView,
    },
  ],
})

export default router
