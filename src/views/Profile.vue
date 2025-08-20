<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1>个人中心</h1>
      <a-button @click="goBack">返回仪表板</a-button>
    </div>
    
    <div class="profile-content">
      <div class="profile-card">
        <div class="profile-avatar">
          <a-avatar :size="120" src="https://via.placeholder.com/120" />
          <a-button type="link" @click="changeAvatar">更换头像</a-button>
        </div>
        
        <div class="profile-form">
          <a-form layout="vertical">
            <a-form-item label="用户名">
              <a-input v-model:value="profile.username" disabled />
            </a-form-item>
            
            <a-form-item label="邮箱">
              <a-input v-model:value="profile.email" />
            </a-form-item>
            
            <a-form-item label="手机号">
              <a-input v-model:value="profile.phone" />
            </a-form-item>
            
            <a-form-item label="部门">
              <a-input v-model:value="profile.department" />
            </a-form-item>
            
            <a-form-item label="职位">
              <a-input v-model:value="profile.position" />
            </a-form-item>
            
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="updateProfile">更新资料</a-button>
                <a-button @click="changePassword">修改密码</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const profile = ref({
  username: 'admin',
  email: 'admin@example.com',
  phone: '13800138000',
  department: '技术部',
  position: '系统管理员'
})

const goBack = () => {
  router.push('/dashboard')
}

const changeAvatar = () => {
  message.info('头像更换功能开发中')
}

const updateProfile = () => {
  message.success('资料更新成功')
}

const changePassword = () => {
  message.info('密码修改功能开发中')
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.profile-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.profile-content {
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 32px;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.profile-form {
  flex: 1;
}

@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (min-width: 1920px) {
  .profile-container {
    padding: 40px;
  }
  
  .profile-header h1 {
    font-size: 40px;
  }
}
</style>