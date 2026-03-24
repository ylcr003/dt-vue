<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { useCrud } from '@/composables/useCrud'
import {
  getUserListApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from '@/api/modules/user'
import type { UserItem } from '@/api/modules/user'
import UserForm from './components/UserForm.vue'

// 使用 useCrud 管理用户 CRUD
const {
  dataList,
  listLoading,
  searchParams,
  pagination,
  getList,
  handleSearch,
  handleReset,
  dialogVisible,
  dialogTitle,
  formData,
  submitLoading,
  handleCreate,
  handleEdit,
  handleSubmit,
  handleDelete,
} = useCrud<UserItem>({
  list: getUserListApi,
  create: createUserApi as any,
  update: updateUserApi as any,
  delete: deleteUserApi,
})

// 表单 ref
const formRef = ref()

onMounted(() => {
  getList()
})

/** 提交前验证表单 */
async function handleFormSubmit() {
  const valid = await formRef.value?.validate()
  if (!valid) return
  await handleSubmit()
}
</script>

<template>
  <div class="user-page">
    <!-- 搜索栏 -->
    <el-card class="search-card" shadow="never">
      <el-form :model="searchParams" inline>
        <el-form-item label="关键词" prop="keyword">
          <el-input
            v-model="searchParams.keyword"
            placeholder="用户名/昵称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作栏 + 表格 -->
    <el-card class="table-card" shadow="never">
      <div class="table-toolbar">
        <el-button
          v-permission="'system:user:create'"
          type="primary"
          :icon="Plus"
          @click="handleCreate"
        >
          新增用户
        </el-button>
      </div>

      <el-table :data="dataList" v-loading="listLoading" border stripe>
        <el-table-column type="index" label="#" width="60" />
        <el-table-column prop="username" label="用户名" min-width="120" />
        <el-table-column prop="nickname" label="昵称" min-width="120" />
        <el-table-column prop="email" label="邮箱" min-width="160" show-overflow-tooltip />
        <el-table-column prop="phone" label="手机号" min-width="130" />
        <el-table-column prop="status" label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="170" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button
              v-permission="'system:user:update'"
              type="primary"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-permission="'system:user:delete'"
              type="danger"
              link
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <BasePagination
        v-model:current-page="pagination.currentPage.value"
        v-model:page-size="pagination.pageSize.value"
        :total="pagination.total.value"
        @change="getList"
      />
    </el-card>

    <!-- 新增/编辑对话框 -->
    <BaseDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="540px"
      @confirm="handleFormSubmit"
    >
      <UserForm ref="formRef" v-model="formData" />
    </BaseDialog>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  .search-card {
    margin-bottom: 16px;
  }

  .table-toolbar {
    margin-bottom: 12px;
  }
}
</style>
