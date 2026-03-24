import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string
    /** 菜单图标 */
    icon?: string
    /** 是否隐藏菜单 */
    hidden?: boolean
    /** 允许访问的角色列表 */
    roles?: string[]
    /** 是否开启页面缓存 */
    keepAlive?: boolean
    /** 是否固定在标签页 */
    affix?: boolean
    /** 是否需要认证 */
    requiresAuth?: boolean
  }
}
