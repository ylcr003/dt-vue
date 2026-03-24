import type { App } from 'vue'
import { permissionDirective } from './permission'

export function setupDirectives(app: App) {
  // 注册权限指令
  app.directive('permission', permissionDirective)
}
