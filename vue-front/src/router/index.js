import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.getUser()

  if (authStore.user && to.meta.guest) {
    return { name: 'home' }
  }

  if (!authStore.user && to.meta.auth) {
    return { name: 'login' }
  }
})

export default router
