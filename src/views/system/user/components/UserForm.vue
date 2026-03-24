<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserItem } from '@/api/modules/user'

const props = defineProps<{
  modelValue: Partial<UserItem>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Partial<UserItem>]
}>()

const formRef = ref<FormInstance>()

// 本地表单数据，同步 modelValue
const formData = ref<Partial<UserItem>>({ ...props.modelValue })

watch(
  () => props.modelValue,
  (val) => {
    formData.value = { ...val }
  },
  { deep: true },
)

watch(
  formData,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true },
)

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
  ],
}

/** 验证表单（供父组件调用） */
async function validate() {
  return formRef.value?.validate()
}

defineExpose({ validate })
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formData.username" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="formData.nickname" placeholder="请输入昵称" clearable />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" placeholder="请输入邮箱" clearable />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="formData.phone" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch
        v-model="formData.status"
        :active-value="1"
        :inactive-value="0"
        active-text="启用"
        inactive-text="禁用"
      />
    </el-form-item>
  </el-form>
</template>
