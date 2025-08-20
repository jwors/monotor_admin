<template>
  <div class="monitor-container">
    <div class="monitor-header">
      <h1>监控中心</h1>
      <div class="header-actions">
        <a-button @click="goBack">返回仪表板</a-button>
        <a-button type="primary" @click="refreshData">刷新数据</a-button>
      </div>
    </div>
    
    <div class="monitor-content">
      <div class="monitor-grid">
        <!-- 系统监控 -->
        <div class="monitor-card">
          <div class="card-header">
            <h3>系统监控</h3>
            <span class="status-indicator online"></span>
          </div>
          <div class="card-content">
            <div class="metric">
              <span class="metric-label">CPU使用率</span>
              <span class="metric-value">{{ systemMetrics.cpu }}%</span>
            </div>
            <div class="metric">
              <span class="metric-label">内存使用率</span>
              <span class="metric-value">{{ systemMetrics.memory }}%</span>
            </div>
            <div class="metric">
              <span class="metric-label">磁盘使用率</span>
              <span class="metric-value">{{ systemMetrics.disk }}%</span>
            </div>
          </div>
        </div>
        
        <!-- 网络监控 -->
        <div class="monitor-card">
          <div class="card-header">
            <h3>网络监控</h3>
            <span class="status-indicator online"></span>
          </div>
          <div class="card-content">
            <div class="metric">
              <span class="metric-label">入站流量</span>
              <span class="metric-value">{{ networkMetrics.inbound }} MB/s</span>
            </div>
            <div class="metric">
              <span class="metric-label">出站流量</span>
              <span class="metric-value">{{ networkMetrics.outbound }} MB/s</span>
            </div>
            <div class="metric">
              <span class="metric-label">连接数</span>
              <span class="metric-value">{{ networkMetrics.connections }}</span>
            </div>
          </div>
        </div>
        
        <!-- 服务监控 -->
        <div class="monitor-card">
          <div class="card-header">
            <h3>服务监控</h3>
            <span class="status-indicator warning"></span>
          </div>
          <div class="card-content">
            <div class="service-list">
              <div v-for="service in services" :key="service.name" class="service-item">
                <span class="service-name">{{ service.name }}</span>
                <span :class="['service-status', service.status]">{{ service.status }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 告警信息 -->
        <div class="monitor-card">
          <div class="card-header">
            <h3>告警信息</h3>
            <span class="status-indicator error"></span>
          </div>
          <div class="card-content">
            <div class="alert-list">
              <div v-for="alert in alerts" :key="alert.id" class="alert-item">
                <div class="alert-content">
                  <span class="alert-title">{{ alert.title }}</span>
                  <span class="alert-time">{{ alert.time }}</span>
                </div>
                <span :class="['alert-level', alert.level]">{{ alert.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

// 系统指标
const systemMetrics = ref({
  cpu: 65,
  memory: 78,
  disk: 45
})

// 网络指标
const networkMetrics = ref({
  inbound: 12.5,
  outbound: 8.3,
  connections: 1247
})

// 服务列表
const services = ref([
  { name: 'Web服务器', status: 'online' },
  { name: '数据库', status: 'online' },
  { name: '缓存服务', status: 'warning' },
  { name: '消息队列', status: 'online' }
])

// 告警列表
const alerts = ref([
  { id: 1, title: 'CPU使用率过高', time: '2分钟前', level: 'warning' },
  { id: 2, title: '磁盘空间不足', time: '5分钟前', level: 'error' },
  { id: 3, title: '网络延迟异常', time: '10分钟前', level: 'warning' }
])

// 返回仪表板
const goBack = () => {
  router.push('/dashboard')
}

// 刷新数据
const refreshData = () => {
  message.success('数据已刷新')
  // 这里可以添加实际的数据刷新逻辑
}

// 组件挂载时的初始化
onMounted(() => {
  // 可以在这里添加数据获取逻辑
})
</script>

<style scoped>
.monitor-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24px;
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 8px;
}

.monitor-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.monitor-content {
  max-width: 1400px;
  margin: 0 auto;
}

.monitor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.monitor-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8eaed;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-indicator.online {
  background: #52c41a;
}

.status-indicator.warning {
  background: #faad14;
}

.status-indicator.error {
  background: #ff4d4f;
}

.card-content {
  color: #666;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.metric:last-child {
  border-bottom: none;
}

.metric-label {
  font-size: 14px;
  color: #666;
}

.metric-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.service-list {
  space-y: 12px;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.service-item:last-child {
  border-bottom: none;
}

.service-name {
  font-size: 14px;
  color: #333;
}

.service-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.service-status.online {
  background: #f6ffed;
  color: #52c41a;
}

.service-status.warning {
  background: #fffbe6;
  color: #faad14;
}

.service-status.error {
  background: #fff2f0;
  color: #ff4d4f;
}

.alert-list {
  space-y: 12px;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.alert-item:last-child {
  border-bottom: none;
}

.alert-content {
  flex: 1;
}

.alert-title {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.alert-time {
  font-size: 12px;
  color: #999;
}

.alert-level {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.alert-level.warning {
  background: #fffbe6;
  color: #faad14;
}

.alert-level.error {
  background: #fff2f0;
  color: #ff4d4f;
}

/* 针对1920x1080分辨率优化 */
@media (min-width: 1920px) {
  .monitor-container {
    padding: 40px;
  }
  
  .monitor-header {
    margin-bottom: 48px;
  }
  
  .monitor-header h1 {
    font-size: 40px;
  }
  
  .monitor-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  .monitor-card {
    padding: 32px;
  }
  
  .card-header h3 {
    font-size: 20px;
  }
  
  .metric-value {
    font-size: 18px;
  }
}
</style>