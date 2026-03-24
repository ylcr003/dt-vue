import { ref } from 'vue'
import { getDictListApi } from '@/api/modules/system'
import type { DictItem } from '@/api/modules/system'

// 字典缓存
const dictCache = new Map<string, DictItem[]>()

/** 字典数据 composable */
export function useDict(dictType: string) {
  const dictOptions = ref<DictItem[]>([])
  const loading = ref(false)

  /** 获取字典选项 */
  async function getDictOptions() {
    if (dictCache.has(dictType)) {
      dictOptions.value = dictCache.get(dictType)!
      return
    }

    loading.value = true
    try {
      const list = await getDictListApi(dictType)
      dictOptions.value = list
      dictCache.set(dictType, list)
    } finally {
      loading.value = false
    }
  }

  getDictOptions()

  return { dictOptions, loading, getDictOptions }
}
