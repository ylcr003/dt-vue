import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/modules/auth'
import { useUserStore } from '@/stores/modules/user'
import { usePermissionStore } from '@/stores/modules/permission'
import type { LoginParams } from '@/api/modules/auth'

/** 认证相关 composable */
export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  /** 登录 */
  async function login(params: LoginParams) {
    await authStore.login(params)
    ElMessage.success('登录成功')
    await router.push('/')
  }

  /** 退出登录 */
  async function logout() {
    await authStore.logout()
    userStore.resetUser()
    permissionStore.resetRoutes()
    ElMessage.success('退出登录成功')
    await router.push('/login')
  }

  return { login, logout }
}
