<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1>设置</h1>
      <a-button @click="goBack">返回仪表板</a-button>
    </div>
    
    <div class="settings-content">
      <div class="settings-form">
        <a-form layout="vertical">
          <a-form-item label="系统主题">
            <a-select v-model:value="settings.theme" style="width: 200px">
              <a-select-option value="light">浅色主题</a-select-option>
              <a-select-option value="dark">深色主题</a-select-option>
            </a-select>
          </a-form-item>
          
          <a-form-item label="语言设置">
            <a-select v-model:value="settings.language" style="width: 200px">
              <a-select-option value="zh-CN">简体中文</a-select-option>
              <a-select-option value="en-US">English</a-select-option>
            </a-select>
          </a-form-item>
          
          <a-form-item label="通知设置">
            <a-checkbox v-model:checked="settings.notifications">启用系统通知</a-checkbox>
          </a-form-item>
          
          <a-form-item>
            <a-button type="primary" @click="saveSettings">保存设置</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const settings = ref({
  theme: 'light',
  language: 'zh-CN',
  notifications: true
})

const goBack = () => {
  router.push('/dashboard')
}

const saveSettings = () => {
  message.success('设置已保存')
}
</script>

<style scoped>
.settings-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24px;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.settings-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.settings-content {
  max-width: 800px;
  margin: 0 auto;
}

.settings-form {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

@media (min-width: 1920px) {
  .settings-container {
    padding: 40px;
  }
  
  .settings-header h1 {
    font-size: 40px;
  }
}
</style>