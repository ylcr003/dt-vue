import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import { LOCALE_KEY } from '@/enums/cacheEnum'

// 读取持久化的语言设置
const savedLocale = localStorage.getItem(LOCALE_KEY)
const locale = savedLocale ? JSON.parse(savedLocale) : 'zh-CN'

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export function setupI18n(app: App) {
  app.use(i18n)
}
