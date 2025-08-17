import { post } from '../utils/request'

// 用户登录
export function login(data) {
  return post('/auth/login', data)
}

// 用户注册
export function register(data) {
  return post('/api/register', data)
}

// 忘记密码
export function forgotPassword(data) {
  return post('/auth/forgot-password', data)
}

// 重置密码
export function resetPassword(data) {
  return post('/auth/reset-password', data)
}

// 获取用户信息
export function getUserInfo() {
  return post('/auth/user-info')
}

// 刷新token
export function refreshToken(data) {
  return post('/auth/refresh-token', data)
}