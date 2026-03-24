import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/index.scss'
import { setupStore } from './stores'
import { setupI18n } from './locales'
import { setupRouter } from './router'
import { setupPlugins } from './plugins'
import { setupDirectives } from './directives'

// 异步启动函数
async function bootstrap() {
  const app = createApp(App)

  // 初始化状态管理
  setupStore(app)

  // 初始化国际化
  setupI18n(app)

  // 初始化路由
  setupRouter(app)

  // 初始化插件
  setupPlugins(app)

  // 初始化指令
  setupDirectives(app)

  // 挂载应用
  app.mount('#app')
}

bootstrap()
