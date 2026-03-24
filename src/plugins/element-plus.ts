import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/** 注册所有 Element Plus 图标为全局组件 */
export function setupElementPlus(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
