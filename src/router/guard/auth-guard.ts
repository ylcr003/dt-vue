import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'

/** 登录白名单（无需鉴权即可访问） */
const whiteList = ['/login', '/403', '/404', '/500']

/** 认证守卫 */
export function setupAuthGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    // 白名单路由直接放行
    if (whiteList.includes(to.path)) {
      next()
      return
    }

    // 无 token，跳转到登录页
    if (!authStore.isLoggedIn) {
      next({ path: '/login', query: { redirect: to.fullPath } })
      return
    }

    next()
  })
}
