<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>

    <!-- 居中登录内容 -->
    <div class="login-content">
      <div class="login-box">
        <div class="login-header">
          <img src="/logo.svg" alt="Logo" class="logo" />
          <h1>监控管理系统</h1>
          <p>智能化监控，全方位管理</p>
        </div>
        
        <a-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          class="login-form"
          layout="vertical"
          @finish="handleLogin"
        >
          <a-form-item label="用户名" name="username">
            <a-input
              v-model:value="formData.username"
              placeholder="请输入用户名"
              size="large"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="密码" name="password">
            <a-input-password
              v-model:value="formData.password"
              placeholder="请输入密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <a-checkbox v-model:checked="formData.rememberMe">
                记住我
              </a-checkbox>
              <a href="#" @click.prevent>忘记密码？</a>
            </div>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-button"
              :loading="loading"
              size="large"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>

        <div class="login-footer">
          <p>
            还没有账户？
            <router-link to="/auth/register">立即注册</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { login } from '../api/auth'

// 定义emit事件

// 定义router
const router = useRouter()

// 响应式数据
const loading = ref(false)
const formData = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 登录处理
const handleLogin = async (values) => {
  loading.value = true
  try {
    // 调用登录API
    const {data} = await login(values)
    // 保存token
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    
    // 保存用户信息
    if (data.user) {
      localStorage.setItem('userInfo', JSON.stringify(data.user))
    }
    
    message.success('登录成功！')
    
    // 这里可以跳转到主页面
    router.push({
      path: '/dashboard'
    })
    
  } catch (error) {
    console.error('登录失败:', error.re)
    message.error(error.message || '登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 登录内容区域 */
.login-content {
  position: relative;
  z-index: 1;
}

.login-box {
  width: 480px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  padding: 60px;
  position: relative;
  overflow: hidden;
}

.login-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.login-header {
  text-align: center;
  margin-bottom: 50px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.login-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  letter-spacing: 1px;
}

.login-header p {
  color: #6b7280;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
}

.login-form {
  margin-bottom: 40px;
}

.login-form :deep(.ant-form-item-label) {
  font-weight: 600;
  color: #374151;
  font-size: 15px;
}

.login-form :deep(.ant-input-affix-wrapper) {
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  height: 56px;
  font-size: 15px;
}

.login-form :deep(.ant-input) {
  font-size: 15px;
}

.login-form :deep(.ant-input-affix-wrapper:hover) {
  border-color: #667eea;
}

.login-form :deep(.ant-input-affix-wrapper-focused) {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.login-form :deep(.ant-form-item) {
  margin-bottom: 28px;
}

.login-form :deep(.ant-checkbox-wrapper) {
  color: #374151;
  font-size: 15px;
  font-weight: 500;
}

.login-form :deep(.ant-checkbox-wrapper a) {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
}

.login-form :deep(.ant-checkbox-wrapper a:hover) {
  color: #5a67d8;
}

.login-button {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  font-size: 17px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.login-footer {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #e5e7eb;
}

.login-footer p {
  margin: 0;
  color: #6b7280;
  font-size: 15px;
}

.login-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-footer a:hover {
  color: #5a67d8;
}

/* 1920x1080优化 */
@media (min-width: 1920px) {
  .login-box {
    width: 560px;
    padding: 80px;
  }
  
  .login-header h1 {
    font-size: 36px;
  }
  
  .login-header p {
    font-size: 18px;
  }
  
  .logo {
    width: 100px;
    height: 100px;
  }
  
  .login-form :deep(.ant-input-affix-wrapper) {
    height: 60px;
    font-size: 16px;
  }
  
  .login-button {
    height: 60px;
    font-size: 18px;
  }
}
</style>