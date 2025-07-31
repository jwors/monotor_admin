<template>
  <div class="auth-container">
    <transition name="slide-fade" mode="out-in">
      <Login 
        v-if="currentView === 'login'" 
        @switch-to-register="switchToRegister"
        key="login"
      />
      <Register 
        v-else 
        @switch-to-login="switchToLogin"
        key="register"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from './Login.vue'
import Register from './Register.vue'

// 当前视图状态
const currentView = ref('login')

// 切换到注册界面
const switchToRegister = () => {
  currentView.value = 'register'
}

// 切换到登录界面
const switchToLogin = () => {
  currentView.value = 'login'
}
</script>

<style scoped>
.auth-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>