import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { usePermissionStore } from '@/stores/modules/permission'

/** 权限守卫：负责动态路由的生成与注入 */
export function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    // 已生成路由，直接放行
    if (permissionStore.isRoutesGenerated) {
      next()
      return
    }

    try {
      // 获取用户信息（包含角色）
      await userStore.getUserInfo()

      // 根据角色生成动态路由
      const dynamicRoutes = permissionStore.generateRoutes(userStore.roles)

      // 动态添加路由
      dynamicRoutes.forEach((route) => {
        router.addRoute(route)
      })

      // 重新跳转到目标路由（确保动态路由生效）
      next({ ...to, replace: true })
    } catch {
      // 获取用户信息失败（token 无效），清空 token 并跳转登录页
      next({ path: '/login' })
    }
  })
}
