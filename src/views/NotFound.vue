<template>
  <div class="notfound-container">
    <div class="notfound-content">
      <div class="error-code">404</div>
      <div class="error-message">
        <h1>页面未找到</h1>
        <p>抱歉，您访问的页面不存在或已被移除。</p>
      </div>
      <div class="error-actions">
        <a-button type="primary" @click="goHome" size="large">
          返回首页
        </a-button>
        <a-button @click="goBack" size="large">
          返回上页
        </a-button>
      </div>
    </div>
    
    <!-- 装饰性背景 -->
    <div class="bg-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.notfound-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.notfound-content {
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
}

.error-code {
  font-size: 200px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-message h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-message p {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-actions .ant-btn {
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 500;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 针对1920x1080分辨率优化 */
@media (min-width: 1920px) {
  .error-code {
    font-size: 280px;
  }
  
  .error-message h1 {
    font-size: 64px;
  }
  
  .error-message p {
    font-size: 24px;
  }
  
  .shape-1 {
    width: 300px;
    height: 300px;
  }
  
  .shape-2 {
    width: 250px;
    height: 250px;
  }
  
  .shape-3 {
    width: 150px;
    height: 150px;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .error-code {
    font-size: 120px;
  }
  
  .error-message h1 {
    font-size: 32px;
  }
  
  .error-message p {
    font-size: 16px;
    padding: 0 20px;
  }
  
  .error-actions {
    padding: 0 20px;
  }
  
  .error-actions .ant-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>