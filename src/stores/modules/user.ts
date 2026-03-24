import { defineStore } from 'pinia'
import { getUserInfoApi } from '@/api/modules/auth'
import type { UserInfo } from '@/api/modules/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
    roles: [] as string[],
    permissions: [] as string[],
  }),

  getters: {
    hasRole: (state) => (role: string) => state.roles.includes(role),
    hasPermission: (state) => (permission: string) => state.permissions.includes(permission),
  },

  actions: {
    /** 获取用户信息 */
    async getUserInfo() {
      const info = await getUserInfoApi()
      this.userInfo = info
      this.roles = info.roles || []
      this.permissions = info.permissions || []
      return info
    },

    /** 重置用户信息 */
    resetUser() {
      this.userInfo = null
      this.roles = []
      this.permissions = []
    },
  },
})
