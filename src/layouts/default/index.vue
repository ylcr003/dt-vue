<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppTabs from '@/components/layout/AppTabs.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside
      :width="appStore.sidebarCollapsed ? '64px' : '210px'"
      class="layout-aside"
    >
      <AppSidebar />
    </el-aside>

    <!-- 主内容区 -->
    <el-container class="layout-main">
      <!-- 顶部栏 -->
      <el-header class="layout-header" height="60px">
        <AppHeader />
      </el-header>

      <!-- 标签页 -->
      <AppTabs />

      <!-- 页面内容 -->
      <el-main class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>

      <!-- 页脚 -->
      <AppFooter />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.layout-aside {
  background-color: var(--dt-sidebar-bg);
  transition: width 0.3s;
  overflow: hidden;
}

.layout-main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.layout-header {
  padding: 0;
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: var(--dt-box-shadow-base);
}

.layout-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--dt-bg-color);
  padding: 16px;
}
</style>
