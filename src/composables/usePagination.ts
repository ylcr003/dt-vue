import { ref } from 'vue'

/** 分页状态管理 composable */
export function usePagination() {
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  /** 重置到第一页 */
  function reset() {
    currentPage.value = 1
  }

  return {
    currentPage,
    pageSize,
    total,
    reset,
  }
}
