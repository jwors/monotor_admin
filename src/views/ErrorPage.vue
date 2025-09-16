<template>
  <div class="error-page-container">
    <div class="error-page-header">
      <h1>错误测试页面</h1>
      <p>用于测试各种错误情况，方便监控系统捕捉</p>
      <a-button @click="goBack">返回仪表板</a-button>
    </div>
    
    <div class="error-page-content">
      <div class="error-categories">
        <!-- JavaScript 错误 -->
        <div class="error-category">
          <h2>JavaScript 错误</h2>
          <div class="error-buttons">
            <a-button type="primary" danger @click="triggerReferenceError">
              引用错误 (ReferenceError)
            </a-button>
            <a-button type="primary" danger @click="triggerTypeError">
              类型错误 (TypeError)
            </a-button>
            <a-button type="primary" danger @click="triggerSyntaxError">
              语法错误 (SyntaxError)
            </a-button>
            <a-button type="primary" danger @click="triggerRangeError">
              范围错误 (RangeError)
            </a-button>
            <a-button type="primary" danger @click="triggerCustomError">
              自定义错误
            </a-button>
            <a-button type="primary" danger @click="triggerUnhandledPromise">
              未处理的Promise拒绝
            </a-button>
          </div>
        </div>

        <!-- 网络/API 错误 -->
        <div class="error-category">
          <h2>网络/API 错误</h2>
          <div class="error-buttons">
            <a-button type="primary" danger @click="trigger404Error">
              404 错误
            </a-button>
            <a-button type="primary" danger @click="trigger500Error">
              500 服务器错误
            </a-button>
            <a-button type="primary" danger @click="triggerTimeoutError">
              请求超时
            </a-button>
            <a-button type="primary" danger @click="triggerNetworkError">
              网络连接错误
            </a-button>
            <a-button type="primary" danger @click="triggerCorsError">
              CORS 错误
            </a-button>
            <a-button type="primary" danger @click="triggerAuthError">
              认证错误 (401)
            </a-button>
          </div>
        </div>

        <!-- 资源加载错误 -->
        <div class="error-category">
          <h2>资源加载错误</h2>
          <div class="error-buttons">
            <a-button type="primary" danger @click="triggerImageError">
              图片加载错误
            </a-button>
            <a-button type="primary" danger @click="triggerScriptError">
              脚本加载错误
            </a-button>
            <a-button type="primary" danger @click="triggerStyleError">
              样式加载错误
            </a-button>
          </div>
        </div>

        <!-- 内存/性能错误 -->
        <div class="error-category">
          <h2>内存/性能错误</h2>
          <div class="error-buttons">
            <a-button type="primary" danger @click="triggerMemoryLeak">
              内存泄漏
            </a-button>
            <a-button type="primary" danger @click="triggerInfiniteLoop">
              无限循环 (谨慎使用)
            </a-button>
            <a-button type="primary" danger @click="triggerStackOverflow">
              栈溢出
            </a-button>
          </div>
        </div>

        <!-- Vue 特定错误 -->
        <div class="error-category">
          <h2>Vue 特定错误</h2>
          <div class="error-buttons">
            <a-button type="primary" danger @click="triggerVueError">
              Vue 组件错误
            </a-button>
            <a-button type="primary" danger @click="triggerReactivityError">
              响应式数据错误
            </a-button>
            <a-button type="primary" danger @click="triggerLifecycleError">
              生命周期错误
            </a-button>
          </div>
        </div>
      </div>

      <!-- 错误日志显示 -->
      <div class="error-log">
        <h3>错误日志</h3>
        <div class="log-container">
          <div v-for="(log, index) in errorLogs" :key="index" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-type">{{ log.type }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
        <a-button @click="clearLogs" style="margin-top: 16px;">清空日志</a-button>
      </div>
    </div>

    <!-- 隐藏的错误触发元素 -->
    <img ref="errorImage" style="display: none;" @error="onImageError" />
    <div ref="errorContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, readonly } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { test } from '@/api/auth'

const router = useRouter()
const errorLogs = ref([])
const errorImage = ref(null)
const errorContainer = ref(null)

// 添加错误日志
const addErrorLog = (type, message) => {
  errorLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    type,
    message
  })
  
  // 限制日志数量
  if (errorLogs.value.length > 50) {
    errorLogs.value = errorLogs.value.slice(0, 50)
  }
}

// 全局错误处理
const handleGlobalError = (event) => {
  addErrorLog('Global Error', event.error?.message || event.message || '未知错误')
}

const handleUnhandledRejection = (event) => {
  addErrorLog('Unhandled Promise', event.reason?.message || event.reason || '未处理的Promise拒绝')
}

// JavaScript 错误触发方法
const triggerReferenceError = () => {
  try {
    // 访问未定义的变量
    console.log(undefinedVariable)
  } catch (error) {
    addErrorLog('ReferenceError', error.message)
    throw error
  }
}

const triggerTypeError = () => {
  try {
    // 对null调用方法
    const nullValue = null
    nullValue.someMethod()
  } catch (error) {
    addErrorLog('TypeError', error.message)
    throw error
  }
}

const triggerSyntaxError = () => {
  try {
    // 使用eval执行错误的语法
    eval('const a = {')
  } catch (error) {
    addErrorLog('SyntaxError', error.message)
    throw error
  }
}

const triggerRangeError = () => {
  try {
    // 创建超出范围的数组
    const arr = new Array(-1)
  } catch (error) {
    addErrorLog('RangeError', error.message)
    throw error
  }
}

const triggerCustomError = () => {
  const error = new Error('这是一个自定义错误，用于测试监控系统')
  addErrorLog('Custom Error', error.message)
  throw error
}

const triggerUnhandledPromise = () => {
  // 创建一个被拒绝的Promise但不处理
  Promise.reject(new Error('未处理的Promise拒绝错误'))
  addErrorLog('Promise Rejection', '触发了未处理的Promise拒绝')
}

// 网络/API 错误触发方法
const trigger404Error = async () => {
  try {
    const response = await test()
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
  } catch (error) {
    addErrorLog('404 Error', error.message)
    message.error('404错误已触发')
  }
}

const trigger500Error = async () => {
  try {
    // 模拟服务器错误
    const response = await fetch('/api/server-error', {
      method: 'POST',
      body: JSON.stringify({ trigger: 'server_error' })
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: 服务器内部错误`)
    }
  } catch (error) {
    addErrorLog('500 Error', error.message)
    message.error('500错误已触发')
  }
}

const triggerTimeoutError = async () => {
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 100) // 100ms超时
    
    await fetch('https://httpbin.org/delay/5', {
      signal: controller.signal
    })
  } catch (error) {
    addErrorLog('Timeout Error', error.message)
    message.error('请求超时错误已触发')
  }
}

const triggerNetworkError = async () => {
  try {
    // 尝试访问不存在的域名
    await fetch('https://nonexistent-domain-12345.com/api/test')
  } catch (error) {
    addErrorLog('Network Error', error.message)
    message.error('网络连接错误已触发')
  }
}

const triggerCorsError = async () => {
  try {
    // 尝试跨域请求
    await fetch('https://www.google.com/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    addErrorLog('CORS Error', error.message)
    message.error('CORS错误已触发')
  }
}

const triggerAuthError = async () => {
  try {
    const response = await fetch('/api/protected-resource', {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    })
    if (response.status === 401) {
      throw new Error('认证失败：无效的访问令牌')
    }
  } catch (error) {
    addErrorLog('Auth Error', error.message)
    message.error('认证错误已触发')
  }
}

// 资源加载错误触发方法
const triggerImageError = () => {
  if (errorImage.value) {
    errorImage.value.src = 'https://nonexistent-domain.com/nonexistent-image.jpg'
  }
}

const onImageError = () => {
  addErrorLog('Image Load Error', '图片加载失败')
  message.error('图片加载错误已触发')
}

const triggerScriptError = () => {
  const script = document.createElement('script')
  script.src = 'https://nonexistent-domain.com/nonexistent-script.js'
  script.onerror = () => {
    addErrorLog('Script Load Error', '脚本加载失败')
    message.error('脚本加载错误已触发')
  }
  document.head.appendChild(script)
}

const triggerStyleError = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://nonexistent-domain.com/nonexistent-style.css'
  link.onerror = () => {
    addErrorLog('Style Load Error', '样式表加载失败')
    message.error('样式加载错误已触发')
  }
  document.head.appendChild(link)
}

// 内存/性能错误触发方法
const triggerMemoryLeak = () => {
  // 创建内存泄漏
  const leakArray = []
  const interval = setInterval(() => {
    leakArray.push(new Array(1000000).fill('memory leak'))
  }, 100)
  
  addErrorLog('Memory Leak', '内存泄漏已触发')
  message.warning('内存泄漏已触发，请注意监控内存使用情况')
  
  // 5秒后停止，避免真正的内存问题
  setTimeout(() => {
    clearInterval(interval)
  }, 5000)
}

const triggerInfiniteLoop = () => {
  if (confirm('警告：这将触发无限循环，可能导致页面卡死。确定要继续吗？')) {
    addErrorLog('Infinite Loop', '无限循环已触发')
    let i = 0
    while (true) {
      i++
      if (i > 1000000) break // 安全退出
    }
  }
}

const triggerStackOverflow = () => {
  const recursiveFunction = (depth = 0) => {
    if (depth > 10000) return // 安全退出
    return recursiveFunction(depth + 1)
  }
  
  try {
    recursiveFunction()
  } catch (error) {
    addErrorLog('Stack Overflow', error.message)
    message.error('栈溢出错误已触发')
  }
}

// Vue 特定错误触发方法
const triggerVueError = () => {
  try {
    // 尝试访问不存在的组件方法
    this.$nonexistentMethod()
  } catch (error) {
    addErrorLog('Vue Error', error.message)
    throw error
  }
}

const triggerReactivityError = () => {
  try {
    // 尝试修改只读的响应式数据
    const readonlyData = readonly({ value: 1 })
    readonlyData.value = 2
  } catch (error) {
    addErrorLog('Reactivity Error', error.message)
    throw error
  }
}

const triggerLifecycleError = () => {
  try {
    // 在错误的生命周期阶段执行操作
    throw new Error('生命周期错误：在错误的时机执行了操作')
  } catch (error) {
    addErrorLog('Lifecycle Error', error.message)
    throw error
  }
}

// 其他方法
const goBack = () => {
  router.push('/dashboard')
}

const clearLogs = () => {
  errorLogs.value = []
  message.success('错误日志已清空')
}

// 生命周期
onMounted(() => {
  window.addEventListener('error', handleGlobalError)
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
  addErrorLog('Info', '错误测试页面已加载，开始监控错误')
})

onUnmounted(() => {
  window.removeEventListener('error', handleGlobalError)
  window.removeEventListener('unhandledrejection', handleUnhandledRejection)
})
</script>

<style scoped>
.error-page-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24px;
}

.error-page-header {
  text-align: center;
  margin-bottom: 32px;
}

.error-page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.error-page-header p {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.error-page-content {
  max-width: 1400px;
  margin: 0 auto;
}

.error-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.error-category {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.error-category h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  border-bottom: 2px solid #ff4d4f;
  padding-bottom: 8px;
}

.error-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.error-buttons .ant-btn {
  flex: 1;
  min-width: 140px;
  height: 40px;
  font-size: 14px;
}

.error-log {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.error-log h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.log-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  padding: 12px;
  background: #fafafa;
}

.log-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #e8eaed;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #666;
  min-width: 80px;
}

.log-type {
  color: #ff4d4f;
  font-weight: 600;
  min-width: 120px;
}

.log-message {
  color: #333;
  flex: 1;
  word-break: break-all;
}

/* 针对1920x1080分辨率优化 */
@media (min-width: 1920px) {
  .error-page-container {
    padding: 40px;
  }
  
  .error-page-header h1 {
    font-size: 40px;
  }
  
  .error-categories {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  .error-category {
    padding: 32px;
  }
  
  .error-buttons .ant-btn {
    height: 48px;
    font-size: 16px;
  }
}
</style>