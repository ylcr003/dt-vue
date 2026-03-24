<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { usePermissionStore } from '@/stores/modules/permission'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

// 所有菜单路由
const menuRoutes = computed(() => permissionStore.allMenus)

/** 处理菜单点击 */
function handleMenuSelect(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="sidebar-container">
    <!-- Logo 区域 -->
    <div class="sidebar-logo" :class="{ collapsed: appStore.sidebarCollapsed }">
      <el-icon size="24" color="#409eff">
        <Monitor />
      </el-icon>
      <span v-show="!appStore.sidebarCollapsed" class="logo-title">DT-Vue Admin</span>
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-active="route.path"
      :collapse="appStore.sidebarCollapsed"
      :collapse-transition="false"
      background-color="transparent"
      text-color="var(--dt-sidebar-text)"
      active-text-color="var(--dt-sidebar-active-text)"
      router
      class="sidebar-menu"
    >
      <template v-for="menuRoute in menuRoutes" :key="menuRoute.path">
        <!-- 有子菜单 -->
        <el-sub-menu
          v-if="menuRoute.children && menuRoute.children.filter((c) => !c.meta?.hidden).length > 1"
          :index="menuRoute.path"
        >
          <template #title>
            <el-icon v-if="menuRoute.meta?.icon">
              <component :is="menuRoute.meta.icon" />
            </el-icon>
            <span>{{ menuRoute.meta?.title }}</span>
          </template>
          <el-menu-item
            v-for="child in menuRoute.children?.filter((c) => !c.meta?.hidden)"
            :key="child.path"
            :index="`${menuRoute.path}/${child.path}`"
          >
            <el-icon v-if="child.meta?.icon">
              <component :is="child.meta.icon" />
            </el-icon>
            <template #title>{{ child.meta?.title }}</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 单层菜单或只有一个子路由 -->
        <el-menu-item
          v-else
          :index="
            menuRoute.children?.[0]
              ? `${menuRoute.path}/${menuRoute.children[0].path}`
              : menuRoute.path
          "
        >
          <el-icon v-if="menuRoute.meta?.icon || menuRoute.children?.[0]?.meta?.icon">
            <component :is="menuRoute.meta?.icon || menuRoute.children?.[0]?.meta?.icon" />
          </el-icon>
          <template #title>{{
            menuRoute.children?.[0]?.meta?.title || menuRoute.meta?.title
          }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--dt-sidebar-bg);
  overflow: hidden;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  padding: 0 16px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s;

  .logo-title {
    transition: opacity 0.3s;
  }

  &.collapsed {
    justify-content: center;
    padding: 0;
  }
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: none;

  &:not(.el-menu--collapse) {
    width: 210px;
  }
}
</style>
