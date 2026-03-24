<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <div class="login-page">
    <!-- 左侧品牌区 -->
    <div class="login-banner">
      <div class="banner-content">
        <div class="brand-logo">
          <el-icon size="64" color="#fff"><Monitor /></el-icon>
        </div>
        <h1 class="brand-title">DT-Vue Admin</h1>
        <p class="brand-desc">基于 Vue 3 + Element Plus 的中后台管理系统模板</p>
      </div>
    </div>

    <!-- 右侧登录表单 -->
    <div class="login-form-area">
      <div class="login-card">
        <div class="login-header">
          <h2>欢迎回来</h2>
          <p>请登录您的账号</p>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.login-banner {
  flex: 1;
  background: linear-gradient(135deg, #409eff 0%, #005bde 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .banner-content {
    text-align: center;
    color: #fff;
  }

  .brand-title {
    font-size: 36px;
    font-weight: bold;
    margin: 16px 0 8px;
  }

  .brand-desc {
    font-size: 16px;
    opacity: 0.8;
  }
}

.login-form-area {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}

.login-card {
  width: 380px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.1);

  .login-header {
    text-align: center;
    margin-bottom: 32px;

    h2 {
      font-size: 24px;
      color: #303133;
    }

    p {
      color: #909399;
      margin-top: 8px;
    }
  }
}

@media (max-width: 768px) {
  .login-banner {
    display: none;
  }

  .login-form-area {
    width: 100%;
  }
}
</style>
