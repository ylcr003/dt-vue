<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()

const formRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  username: 'admin',
  password: '123456',
})

// 表单验证规则
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
}

/** 提交登录 */
async function handleLogin() {
  const valid = await formRef.value?.validate()
  if (!valid) return

  loading.value = true
  try {
    await login({
      username: formData.username,
      password: formData.password,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-position="top"
    class="login-form"
    @keyup.enter="handleLogin"
  >
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="formData.username"
        placeholder="请输入用户名"
        :prefix-icon="User"
        clearable
      />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        :prefix-icon="Lock"
        show-password
        clearable
      />
    </el-form-item>

    <el-form-item>
      <div class="form-options">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        size="large"
        :loading="loading"
        class="login-btn"
        @click="handleLogin"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.login-form {
  .form-options {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
