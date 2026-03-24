<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import { useAuth } from '@/composables/useAuth'
import { usePreferences } from '@/composables/usePreferences'
import AppBreadcrumb from './AppBreadcrumb.vue'
import type { LocaleType } from '@/stores/modules/app'

const appStore = useAppStore()
const userStore = useUserStore()
const { logout } = useAuth()
const { isDark, toggleTheme, setLocale } = usePreferences()

/** 语言选项 */
const localeOptions = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

/** 用户下拉菜单命令处理 */
async function handleUserCommand(command: string) {
  if (command === 'logout') {
    await logout()
  }
}

/** 切换语言 */
function handleLocaleChange(locale: string) {
  setLocale(locale as LocaleType)
}
</script>

<template>
  <div class="header-container">
    <!-- 左侧：折叠按钮 + 面包屑 -->
    <div class="header-left">
      <el-button
        class="collapse-btn"
        text
        @click="appStore.toggleSidebar"
      >
        <el-icon size="20">
          <Fold v-if="!appStore.sidebarCollapsed" />
          <Expand v-else />
        </el-icon>
      </el-button>
      <AppBreadcrumb />
    </div>

    <!-- 右侧：语言切换 + 主题 + 用户 -->
    <div class="header-right">
      <!-- 语言切换 -->
      <el-dropdown @command="handleLocaleChange">
        <el-button text>
          <el-icon><Grid /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in localeOptions"
              :key="item.value"
              :command="item.value"
              :class="{ 'is-active': appStore.locale === item.value }"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 主题切换 -->
      <el-button text @click="toggleTheme">
        <el-icon size="18">
          <Moon v-if="!isDark" />
          <Sunny v-else />
        </el-icon>
      </el-button>

      <!-- 用户头像下拉 -->
      <el-dropdown @command="handleUserCommand">
        <div class="user-info">
          <el-avatar size="small" :src="userStore.userInfo?.avatar" />
          <span class="username">{{ userStore.userInfo?.nickname || userStore.userInfo?.username || '用户' }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>
              {{ userStore.userInfo?.username }}
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.collapse-btn {
  padding: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--dt-border-radius-base);

  &:hover {
    background-color: var(--el-fill-color-light);
  }

  .username {
    font-size: 14px;
  }
}
</style>
