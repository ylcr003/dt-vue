import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { coreRoutes } from './routes/core-routes'
import { setupAuthGuard } from './guard/auth-guard'
import { setupPermissionGuard } from './guard/permission-guard'
import { setupProgressGuard } from './guard/progress-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: coreRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 注册路由守卫 */
function setupGuards() {
  setupProgressGuard(router)
  setupAuthGuard(router)
  setupPermissionGuard(router)
}

export function setupRouter(app: App) {
  setupGuards()
  app.use(router)
}

export default router
