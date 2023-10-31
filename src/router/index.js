import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component:  () => import('../views/WelcomeView.vue'),
      meta: { oneWay: true }
    },
    {
      path: '/consent',
      name: 'consent',
      component:  () => import('../views/ConsentView.vue'),
      meta: { oneWay: true }
    },
    {
      path: '/micTest',
      name: 'micTest',
      component:  () => import('../views/MicTest.vue'),
      meta: { oneWay: true }
    },    
    {
      path: '/audioTest',
      name: 'audioTest',
      component:  () => import('../views/AudioTest.vue'),
      meta: { oneWay: true }
    },
    {
      path: '/instructions',
      name: 'instructions',
      component:  () => import('../views/InstructionsView.vue'),
      meta: { oneWay: true }
    },    
    {
      path: '/experiment',
      name: 'experiment',
      component: () => import('../views/ExperimentView.vue'),
      meta: { oneWay: true }
    },
    {
      path: '/end',
      name: 'end',
      component: () => import('../views/EndView.vue'),
      meta: { oneWay: true }
    }    
  ]
})

//"oneWay" routes are only allowed to move forward, back button is efffectively disabled
router.beforeEach(async (to, from, next) => {
  if (from.meta.oneWay == true) {
    let routes = router.getRoutes();
    let currentRoutePos;
    for (let r = 0; r < routes.length; r++) {
      if (routes[r].path == from.path) {
        currentRoutePos = r;
        break;
      }
    }
    if (routes[currentRoutePos + 1] != null && routes[currentRoutePos + 1].path == to.path) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
})

export default router
