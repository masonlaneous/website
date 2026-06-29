import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: StaticView
    // },
    {
      path: '/static',
      name: 'static',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StaticView.vue'),
    },
    {
      path: '/db',
      name: 'db',
      component: () => import('../views/DatabaseTestView.vue'),
    },
    {
      path: '/color',
      name: 'color',
      component: () => import('../views/ColorView.vue'),
    },
    {
      path: '/dvd',
      name: 'dvd',
      component: () => import('../views/DVDView.vue'),
    },
    {
      path: '/unicode',
      name: 'unicode',
      component: () => import('../views/RandomCharView.vue'),
    },
    {
      path: '/life',
      name: 'life',
      component: () => import('../views/LifeView.vue'),
    },
  ],
})

export default router
