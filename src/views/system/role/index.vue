<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getRoleListApi } from '@/api/modules/system'
import type { RoleItem } from '@/api/modules/system'

const loading = ref(false)
const dataList = ref<RoleItem[]>([])

async function getList() {
  loading.value = true
  try {
    dataList.value = await getRoleListApi()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="role-page">
    <el-card shadow="never">
      <div class="table-toolbar">
        <el-button
          v-permission="['system:role:create']"
          type="primary"
          :icon="Plus"
          @click="ElMessage.info('功能待开发')"
        >
          新增角色
        </el-button>
      </div>

      <el-table :data="dataList" v-loading="loading" border stripe>
        <el-table-column type="index" label="#" width="60" />
        <el-table-column prop="name" label="角色名称" min-width="120" />
        <el-table-column prop="code" label="角色标识" min-width="150" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default>
            <el-button v-permission="'system:role:update'" type="primary" link>编辑</el-button>
            <el-button v-permission="'system:role:delete'" type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.role-page {
  .table-toolbar {
    margin-bottom: 12px;
  }
}
</style>
