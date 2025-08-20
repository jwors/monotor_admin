<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>仪表板</h1>
      <p>欢迎来到监控管理系统</p>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="icon-server"></i>
          </div>
          <div class="stat-info">
            <h3>服务器状态</h3>
            <p class="stat-value">正常</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="icon-users"></i>
          </div>
          <div class="stat-info">
            <h3>在线用户</h3>
            <p class="stat-value">1,234</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="icon-activity"></i>
          </div>
          <div class="stat-info">
            <h3>系统负载</h3>
            <p class="stat-value">65%</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="icon-alert"></i>
          </div>
          <div class="stat-info">
            <h3>告警数量</h3>
            <p class="stat-value">3</p>
          </div>
        </div>
      </div>
      
      <div class="action-buttons">
        <a-button type="primary" @click="goToMonitor">进入监控中心</a-button>
        <a-button @click="goToSystem">系统管理</a-button>
        <a-button @click="logout">退出登录</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

// 跳转到监控中心
const goToMonitor = () => {
  router.push('/monitor')
}

// 跳转到系统管理
const goToSystem = () => {
  router.push('/system')
}

// 退出登录
const logout = () => {
  localStorage.removeItem('token')
  message.success('已退出登录')
  router.push('/auth/login')
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.dashboard-header h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dashboard-header p {
  font-size: 20px;
  opacity: 0.9;
}

.dashboard-content {
  max-width: 1200px;
  width: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  color: white;
}

.stat-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #667eea;
  margin: 0;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.action-buttons .ant-btn {
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 500;
}

/* 针对1920x1080分辨率优化 */
@media (min-width: 1920px) {
  .dashboard-container {
    padding: 60px;
  }
  
  .dashboard-header h1 {
    font-size: 64px;
  }
  
  .dashboard-header p {
    font-size: 24px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
  
  .stat-card {
    padding: 40px;
  }
  
  .stat-icon {
    width: 80px;
    height: 80px;
    font-size: 32px;
  }
  
  .stat-info h3 {
    font-size: 20px;
  }
  
  .stat-value {
    font-size: 40px;
  }
}
</style>