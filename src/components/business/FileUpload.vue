<script setup lang="ts">
import type { UploadFile } from 'element-plus'

const props = defineProps<{
  action?: string
  limit?: number
  accept?: string
  modelValue?: UploadFile[]
}>()

const emit = defineEmits<{
  'update:modelValue': [files: UploadFile[]]
  success: [file: UploadFile]
  error: [error: Error]
}>()

function handleSuccess(_response: any, file: UploadFile, fileList: UploadFile[]) {
  emit('update:modelValue', fileList)
  emit('success', file)
}

function handleError(error: Error) {
  emit('error', error)
}

function handleRemove(_file: UploadFile, fileList: UploadFile[]) {
  emit('update:modelValue', fileList)
}
</script>

<template>
  <el-upload
    :action="action || '#'"
    :file-list="modelValue"
    :limit="limit || 5"
    :accept="accept"
    list-type="text"
    @success="handleSuccess"
    @error="handleError"
    @remove="handleRemove"
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        <slot name="tip" />
      </div>
    </template>
  </el-upload>
</template>
