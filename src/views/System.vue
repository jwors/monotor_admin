<template>
  <div class="system-container">
    <div class="system-header">
      <h1>系统管理</h1>
      <a-button @click="goBack">返回仪表板</a-button>
    </div>
    
    <div class="system-content">
      <div class="system-tabs">
        <a-tabs v-model:activeKey="activeTab" type="card">
          <a-tab-pane key="users" tab="用户管理">
            <div class="tab-content">
              <h3>用户管理</h3>
              <p>管理系统用户账户、权限和角色分配</p>
              <a-button type="primary">添加用户</a-button>
            </div>
          </a-tab-pane>
          
          <a-tab-pane key="roles" tab="角色管理">
            <div class="tab-content">
              <h3>角色管理</h3>
              <p>配置用户角色和权限设置</p>
              <a-button type="primary">创建角色</a-button>
            </div>
          </a-tab-pane>
          
          <a-tab-pane key="logs" tab="系统日志">
            <div class="tab-content">
              <h3>系统日志</h3>
              <p>查看系统操作日志和错误记录</p>
              <a-button type="primary">导出日志</a-button>
            </div>
          </a-tab-pane>
          
          <a-tab-pane key="backup" tab="备份管理">
            <div class="tab-content">
              <h3>备份管理</h3>
              <p>系统数据备份和恢复操作</p>
              <a-button type="primary">创建备份</a-button>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('users')

const goBack = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.system-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24px;
}

.system-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.system-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.system-content {
  max-width: 1200px;
  margin: 0 auto;
}

.system-tabs {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.tab-content {
  padding: 24px 0;
}

.tab-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.tab-content p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

@media (min-width: 1920px) {
  .system-container {
    padding: 40px;
  }
  
  .system-header h1 {
    font-size: 40px;
  }
  
  .system-tabs {
    padding: 32px;
  }
}
</style>