<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const { path, query } = route.params
  router.replace({
    path: `/${Array.isArray(path) ? path.join('/') : path}`,
    query: query as any,
  })
})
</script>

<template>
  <div />
</template>
