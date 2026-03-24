<script setup lang="ts">
defineProps<{
  data: any[]
  loading?: boolean
  columns?: Array<{
    prop?: string
    label?: string
    width?: string | number
    [key: string]: any
  }>
}>()
</script>

<template>
  <el-table
    v-bind="$attrs"
    :data="data"
    v-loading="loading"
    border
    stripe
    style="width: 100%"
  >
    <!-- 使用默认 slot 允许自定义列 -->
    <slot />
  </el-table>
</template>
