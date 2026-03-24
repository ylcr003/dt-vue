import { ref } from 'vue'

/** 加载状态管理 composable */
export function useLoading() {
  const loading = ref(false)

  /** 包装异步函数，自动管理 loading 状态 */
  async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
    loading.value = true
    try {
      return await fn()
    } finally {
      loading.value = false
    }
  }

  return { loading, withLoading }
}
