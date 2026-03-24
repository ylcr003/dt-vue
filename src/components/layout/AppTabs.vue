<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/modules/tabs'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

const router = useRouter()
const tabsStore = useTabsStore()

/** 切换标签页 */
function handleTabClick(path: string) {
  router.push(path)
}

/** 关闭标签页 */
function handleTabRemove(path: string) {
  const newPath = tabsStore.openedTabs.find((t) => t.path !== path)?.path || '/'
  tabsStore.removeTab(path)
  if (tabsStore.activeTab !== path) return
  router.push(newPath)
}

/** 右键菜单命令 */
function handleContextMenu(command: string, path: string) {
  switch (command) {
    case 'closeOther':
      tabsStore.removeOtherTabs(path)
      router.push(path)
      break
    case 'closeAll':
      tabsStore.removeAllTabs()
      router.push(tabsStore.activeTab)
      break
  }
}
</script>

<template>
  <div class="tabs-container">
    <el-tabs
      v-model="tabsStore.activeTab"
      type="card"
      class="tabs-bar"
      @tab-click="(tab) => handleTabClick(String(tab.props.name))"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="tab in tabsStore.openedTabs"
        :key="tab.path"
        :label="tab.title"
        :name="tab.path"
        :closable="!tab.affix"
      />
    </el-tabs>

    <!-- 右侧操作按钮 -->
    <el-dropdown
      class="tabs-action"
      trigger="click"
      @command="(cmd) => handleContextMenu(cmd, tabsStore.activeTab)"
    >
      <el-button text size="small">
        <el-icon><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.tabs-container {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);

  .tabs-bar {
    flex: 1;
    overflow: hidden;

    :deep(.el-tabs__header) {
      margin: 0;
      border-bottom: none;
    }

    :deep(.el-tabs__nav-wrap) {
      margin-bottom: 0;
    }
  }

  .tabs-action {
    flex-shrink: 0;
    margin-left: 4px;
  }
}
</style>
