import type { App } from 'vue'
import { setupElementPlus } from './element-plus'

export function setupPlugins(app: App) {
  // 注册 Element Plus 图标
  setupElementPlus(app)
}
