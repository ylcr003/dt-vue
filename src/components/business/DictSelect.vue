<script setup lang="ts">
import { useDict } from '@/composables/useDict'

const props = defineProps<{
  dictType: string
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
  change: [value: string | number | undefined]
}>()

const { dictOptions, loading } = useDict(props.dictType)

function handleChange(value: string | number | undefined) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <el-select
    :model-value="modelValue"
    :placeholder="placeholder || '请选择'"
    :disabled="disabled"
    :clearable="clearable !== false"
    :loading="loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in dictOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>
