import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useLoading } from './useLoading'
import { usePagination } from './usePagination'
import type { PageParams, PageResult } from '@/api/core/types'

export interface CrudApi<T, CreateParams = Partial<T>, UpdateParams = Partial<T> & { id: any }> {
  list: (params: PageParams) => Promise<PageResult<T>>
  create: (data: CreateParams) => Promise<T>
  update: (data: UpdateParams) => Promise<T>
  delete: (id: string | number) => Promise<void>
}

/** 通用 CRUD composable */
export function useCrud<T extends Record<string, any>, CreateParams = Partial<T>>(
  api: CrudApi<T, CreateParams>,
) {
  // 列表相关
  const dataList = ref<T[]>([])
  const { loading: listLoading, withLoading } = useLoading()
  const searchParams = reactive<PageParams>({})
  const pagination = usePagination()

  /** 获取列表 */
  async function getList() {
    await withLoading(async () => {
      const result = await api.list({
        ...searchParams,
        page: pagination.currentPage.value,
        pageSize: pagination.pageSize.value,
      })
      dataList.value = result.list
      pagination.total.value = result.total
    })
  }

  /** 搜索（重置到第一页再查询） */
  async function handleSearch() {
    pagination.reset()
    await getList()
  }

  /** 重置搜索条件 */
  async function handleReset() {
    Object.keys(searchParams).forEach((key) => {
      delete searchParams[key]
    })
    await handleSearch()
  }

  // 对话框相关
  const dialogVisible = ref(false)
  const dialogTitle = ref('')
  const formData = ref<Partial<T>>({})
  const { loading: submitLoading, withLoading: withSubmitLoading } = useLoading()
  const isEdit = ref(false)

  /** 打开新增对话框 */
  function handleCreate() {
    formData.value = {}
    dialogTitle.value = '新增'
    isEdit.value = false
    dialogVisible.value = true
  }

  /** 打开编辑对话框 */
  function handleEdit(row: T) {
    formData.value = { ...row }
    dialogTitle.value = '编辑'
    isEdit.value = true
    dialogVisible.value = true
  }

  /** 提交表单 */
  async function handleSubmit() {
    await withSubmitLoading(async () => {
      if (isEdit.value) {
        await api.update(formData.value as any)
      } else {
        await api.create(formData.value as any)
      }
      ElMessage.success('操作成功')
      dialogVisible.value = false
      await getList()
    })
  }

  /** 删除记录 */
  async function handleDelete(id: string | number) {
    await ElMessageBox.confirm('确认删除该条数据吗？', '提示', {
      type: 'warning',
    })
    await api.delete(id)
    ElMessage.success('删除成功')
    await getList()
  }

  return {
    // 列表
    dataList,
    listLoading,
    searchParams,
    pagination,
    getList,
    handleSearch,
    handleReset,
    // 对话框
    dialogVisible,
    dialogTitle,
    formData,
    submitLoading,
    isEdit,
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDelete,
  }
}
