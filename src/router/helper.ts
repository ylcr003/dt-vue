import type { RouteRecordRaw } from 'vue-router'

/**
 * 递归展平嵌套路由
 * @param routes 路由配置数组
 * @returns 展平后的路由数组
 */
export function flattenRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []

  function flatten(routeList: RouteRecordRaw[]) {
    routeList.forEach((route) => {
      result.push(route)
      if (route.children?.length) {
        flatten(route.children)
      }
    })
  }

  flatten(routes)
  return result
}
