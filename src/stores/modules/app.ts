import { defineStore } from 'pinia'

export type ThemeType = 'light' | 'dark'
export type LocaleType = 'zh-CN' | 'en-US'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as ThemeType,
    locale: 'zh-CN' as LocaleType,
    sidebarCollapsed: false,
  }),

  actions: {
    /** 切换主题 */
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      // 同步到 html class
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
    },

    /** 切换侧边栏收缩状态 */
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    /** 设置语言 */
    setLocale(locale: LocaleType) {
      this.locale = locale
    },
  },

  persist: {
    paths: ['theme', 'locale'],
  },
})
