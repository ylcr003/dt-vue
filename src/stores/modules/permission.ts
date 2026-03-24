import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { dynamicRoutes } from '@/router/routes/modules/dashboard'
import { systemRoutes } from '@/router/routes/modules/system'

// 所有动态路由模块
const allDynamicRoutes: RouteRecordRaw[] = [...dynamicRoutes, ...systemRoutes]

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    dynamicRoutes: [] as RouteRecordRaw[],
    isRoutesGenerated: false,
  }),

  getters: {
    /** 所有菜单路由（包含子路由） */
    allMenus: (state): RouteRecordRaw[] => state.dynamicRoutes,
  },

  actions: {
    /** 根据角色生成路由 */
    generateRoutes(roles: string[]) {
      const filteredRoutes = this.filterRoutesByRoles(allDynamicRoutes, roles)
      this.dynamicRoutes = filteredRoutes
      this.isRoutesGenerated = true
      return filteredRoutes
    },

    /** 按角色过滤路由 */
    filterRoutesByRoles(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
      return routes.filter((route) => {
        const requiredRoles = route.meta?.roles
        // 无角色限制则所有人可访问
        if (!requiredRoles || requiredRoles.length === 0) {
          if (route.children) {
            route.children = this.filterRoutesByRoles(route.children, roles)
          }
          return true
        }
        // 判断是否有访问权限
        const hasRole = requiredRoles.some((role) => roles.includes(role))
        if (hasRole && route.children) {
          route.children = this.filterRoutesByRoles(route.children, roles)
        }
        return hasRole
      })
    },

    /** 重置路由状态 */
    resetRoutes() {
      this.dynamicRoutes = []
      this.isRoutesGenerated = false
    },
  },
})
