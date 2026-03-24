import { defineStore } from 'pinia'
import { loginApi, logoutApi } from '@/api/modules/auth'
import type { LoginParams } from '@/api/modules/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    /** 用户登录 */
    async login(params: LoginParams) {
      const result = await loginApi(params)
      this.token = result.token
      return result
    },

    /** 用户退出登录 */
    async logout() {
      try {
        await logoutApi()
      } finally {
        this.token = ''
      }
    },

    /** 清空 token（不调用接口） */
    clearToken() {
      this.token = ''
    },
  },

  persist: {
    paths: ['token'],
  },
})
