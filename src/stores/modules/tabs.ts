import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

export interface TabItem {
  path: string
  title: string
  affix?: boolean
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    openedTabs: [] as TabItem[],
    activeTab: '/',
  }),

  actions: {
    /** 添加标签页 */
    addTab(route: RouteLocationNormalized) {
      const { path, meta } = route
      if (!meta?.title) return

      // 已存在则不重复添加
      const exists = this.openedTabs.some((tab) => tab.path === path)
      if (!exists) {
        this.openedTabs.push({
          path,
          title: meta.title as string,
          affix: meta.affix as boolean | undefined,
        })
      }
      this.activeTab = path
    },

    /** 移除标签页 */
    removeTab(path: string) {
      const index = this.openedTabs.findIndex((tab) => tab.path === path)
      if (index === -1) return

      // 固定标签页不允许关闭
      if (this.openedTabs[index].affix) return

      this.openedTabs.splice(index, 1)

      // 如果关闭的是当前标签页，激活上一个或下一个
      if (this.activeTab === path) {
        const newTab = this.openedTabs[index - 1] || this.openedTabs[index]
        this.activeTab = newTab?.path || '/'
      }
    },

    /** 移除其他标签页 */
    removeOtherTabs(path: string) {
      this.openedTabs = this.openedTabs.filter((tab) => tab.path === path || tab.affix)
      this.activeTab = path
    },

    /** 移除所有非固定标签页 */
    removeAllTabs() {
      this.openedTabs = this.openedTabs.filter((tab) => tab.affix)
      this.activeTab = this.openedTabs[0]?.path || '/'
    },
  },
})
