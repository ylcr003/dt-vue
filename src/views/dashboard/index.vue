<script setup lang="ts">
// 仪表盘页面 - 展示统计数据
const stats = [
  { title: '用户总数', value: 10240, icon: 'User', color: '#409eff' },
  { title: '订单总数', value: 3560, icon: 'ShoppingCart', color: '#67c23a' },
  { title: '销售额', value: 128600, icon: 'Money', color: '#e6a23c', prefix: '¥' },
  { title: '今日访问', value: 2480, icon: 'View', color: '#f56c6c' },
]
</script>

<template>
  <div class="dashboard-page">
    <el-row :gutter="16">
      <el-col
        v-for="stat in stats"
        :key="stat.title"
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" :style="{ backgroundColor: stat.color + '20', color: stat.color }">
              <el-icon size="28">
                <component :is="stat.icon" />
              </el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-title">{{ stat.title }}</div>
              <el-statistic :value="stat.value" :prefix="stat.prefix" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 欢迎信息 -->
    <el-card class="welcome-card" style="margin-top: 16px;">
      <template #header>
        <span>快速开始</span>
      </template>
      <el-space wrap>
        <el-tag type="success">Vue 3</el-tag>
        <el-tag type="warning">Element Plus</el-tag>
        <el-tag type="info">TypeScript</el-tag>
        <el-tag>Vite</el-tag>
        <el-tag type="danger">Pinia</el-tag>
        <el-tag type="success">UnoCSS</el-tag>
        <el-tag>vue-i18n</el-tag>
        <el-tag type="warning">Vue Router 4</el-tag>
      </el-space>
      <el-divider />
      <p style="color: var(--el-text-color-secondary); line-height: 1.8;">
        欢迎使用 <strong>DT-Vue Admin</strong>，这是一个基于 Vue 3 + Element Plus + TypeScript
        构建的中后台管理系统模板。内置权限管理、路由守卫、国际化、主题切换等功能，开箱即用。
      </p>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard-page {
  .stat-card {
    margin-bottom: 0;
  }

  .stat-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .stat-info {
    flex: 1;

    .stat-title {
      font-size: 14px;
      color: var(--el-text-color-secondary);
      margin-bottom: 4px;
    }
  }
}
</style>
