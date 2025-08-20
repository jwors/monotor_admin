<template>
  <div class="auth-container">
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script setup>
// 认证页面布局容器，使用路由系统
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