import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Auth from '@/views/Auth.vue'

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: '',
        redirect: '/auth/login'
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          title: '登录',
          requiresAuth: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: {
          title: '注册',
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '仪表板',
      requiresAuth: true
    }
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import('@/views/Monitor.vue'),
    meta: {
      title: '监控中心',
      requiresAuth: true
    }
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('@/views/System.vue'),
    meta: {
      title: '系统管理',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: '设置',
      requiresAuth: true
    }
  },
  {
    path: '/error-test',
    name: 'ErrorTest',
    component: () => import('@/views/ErrorPage.vue'),
    meta: {
      title: '错误测试',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 路由切换时的滚动行为
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 监控管理系统`
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      // 未登录，重定向到登录页
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  // 如果已登录用户访问登录页，重定向到仪表板
  if (to.path === '/auth/login' || to.path === '/auth/register') {
    const token = localStorage.getItem('token')
    if (token) {
      next('/dashboard')
      return
    }
  }
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计等逻辑
  console.log(`路由跳转: ${from.path} -> ${to.path}`)
})

export default router