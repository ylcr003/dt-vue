import { useToggle } from '@vueuse/core'
import { useAppStore } from '@/stores/modules/app'
import type { LocaleType } from '@/stores/modules/app'

/** 偏好设置 composable（主题/语言切换） */
export function usePreferences() {
  const appStore = useAppStore()
  const [isDark, toggleDark] = useToggle(appStore.theme === 'dark')

  /** 切换主题 */
  function toggleTheme() {
    toggleDark()
    appStore.toggleTheme()
  }

  /** 切换语言 */
  function setLocale(locale: LocaleType) {
    appStore.setLocale(locale)
  }

  return {
    isDark,
    toggleTheme,
    setLocale,
    locale: appStore.locale,
  }
}
