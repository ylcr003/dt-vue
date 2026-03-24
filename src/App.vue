<script setup lang="ts">
import { computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

// 根据 locale 切换 Element Plus 语言包
const elementLocale = computed(() => {
  return appStore.locale === 'zh-CN' ? zhCn : en
})
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <router-view />
  </ElConfigProvider>
</template>
