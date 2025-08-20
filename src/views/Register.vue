<template>
  <div class="register-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>

    <!-- 注册内容 -->
    <div class="register-content">
      <div class="register-box">
        <div class="register-header">
          <img src="/logo.svg" alt="Logo" class="logo" />
          <h1>创建账户</h1>
          <p>加入我们的监控平台，开始您的数据管理之旅</p>
        </div>

        <a-form
          :model="formData"
          :rules="rules"
          ref="formRef"
          @finish="handleRegister"
          layout="vertical"
          class="register-form"
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

          <a-form-item label="邮箱" name="email">
            <a-input
              v-model:value="formData.email"
              placeholder="请输入邮箱地址"
              size="large"
            >
              <template #prefix>
                <MailOutlined />
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

          <a-form-item label="确认密码" name="confirmPassword">
            <a-input-password
              v-model:value="formData.confirmPassword"
              placeholder="请再次输入密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="agreement">
            <a-checkbox v-model:checked="formData.agreement">
              我已阅读并同意 <a href="#" @click.prevent>用户协议</a> 和 <a href="#" @click.prevent>隐私政策</a>
            </a-checkbox>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              class="register-button"
            >
              立即注册
            </a-button>
          </a-form-item>
        </a-form>

        <div class="register-footer">
          <p>已有账户？ <router-link to="/auth/login">立即登录</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { register } from '@/api/auth'

// 定义emit事件
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单引用
const formRef = ref()

// 响应式数据
const loading = ref(false)
const formData = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' },
    { 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/, 
      message: '密码必须包含大小写字母和数字', 
      trigger: 'blur' 
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value) => {
        if (value !== formData.password) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      },
      trigger: 'blur'
    }
  ],
  agreement: [
    {
      validator: (rule, value) => {
        if (!value) {
          return Promise.reject('请阅读并同意用户协议和隐私政策')
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ]
}

// 注册处理
const handleRegister = async () => {
  try {
    loading.value = true
    
    const registerData = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    }
    
    const response = await register(registerData)
    console.log(response)
    if (response.code === 200) {
      message.success('注册成功！请登录')
      console.log(formRef.value)
      // 清空表单
      formRef.value.resetFields()
      Object.assign(formData, {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreement: false
      })
      // 切换到登录界面
        router.push('/auth/login')
    } else {
      message.error(response.message || '注册失败，请重试')
    }
  } catch (error) {
    console.error('注册错误:', error)
    if (error.response?.data?.message) {
      message.error(error.response.data.message)
    } else {
      message.error('注册失败，请检查网络连接')
    }
  } finally {
    loading.value = false
  }
}

// 切换到登录
const handleLogin = () => {
  router.push('/auth/login')
}
</script>

<style scoped>
.register-container {
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

/* 注册内容区域 */
.register-content {
  position: relative;
  z-index: 1;
}

.register-box {
  width: 520px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  padding: 60px;
  position: relative;
  overflow: hidden;
}

.register-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.register-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.register-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  letter-spacing: 1px;
}

.register-header p {
  color: #6b7280;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
}

.register-form {
  margin-bottom: 30px;
}

.register-form :deep(.ant-form-item-label) {
  font-weight: 600;
  color: #374151;
  font-size: 15px;
}

.register-form :deep(.ant-input-affix-wrapper) {
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  height: 56px;
  font-size: 15px;
}

.register-form :deep(.ant-input) {
  font-size: 15px;
}

.register-form :deep(.ant-input-affix-wrapper:hover) {
  border-color: #667eea;
}

.register-form :deep(.ant-input-affix-wrapper-focused) {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.register-form :deep(.ant-form-item) {
  margin-bottom: 24px;
}

.register-form :deep(.ant-checkbox-wrapper) {
  color: #374151;
  font-size: 15px;
  font-weight: 500;
}

.register-form :deep(.ant-checkbox-wrapper a) {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
}

.register-form :deep(.ant-checkbox-wrapper a:hover) {
  color: #5a67d8;
}

.register-button {
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

.register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.register-footer {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #e5e7eb;
}

.register-footer p {
  margin: 0;
  color: #6b7280;
  font-size: 15px;
}

.register-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-footer a:hover {
  color: #5a67d8;
}

/* 1920x1080优化 */
@media (min-width: 1920px) {
  .register-box {
    width: 600px;
    padding: 80px;
  }
  
  .register-header h1 {
    font-size: 36px;
  }
  
  .register-header p {
    font-size: 18px;
  }
  
  .logo {
    width: 100px;
    height: 100px;
  }
  
  .register-form :deep(.ant-input-affix-wrapper) {
    height: 60px;
    font-size: 16px;
  }
  
  .register-button {
    height: 60px;
    font-size: 18px;
  }
}
</style>