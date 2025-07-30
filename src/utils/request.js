import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 设置默认的API基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送前做一些处理，例如添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 请求错误处理
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 根据自定义状态码判断请求是否成功
    // 这里假设后端返回的数据结构为 { code: number, data: any, message: string }
    if (res.code && res.code !== 200) {
      // 处理业务错误
      console.error('Business error:', res.message || 'Error')
      
      // 处理特定错误码，例如401未授权
      if (res.code === 401) {
        // 清除token并重定向到登录页
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 直接返回数据或者res.data，取决于后端的数据结构
      return res.data || res
    }
  },
  error => {
    // HTTP错误处理
    console.error('Response error:', error)
    
    // 处理HTTP状态码
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，重定向到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          // 禁止访问
          console.error('没有权限访问该资源')
          break
        case 404:
          // 资源不存在
          console.error('请求的资源不存在')
          break
        case 500:
          // 服务器错误
          console.error('服务器错误')
          break
        default:
          console.error(`未知错误: ${error.response.status}`)
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，请检查您的网络连接')
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// 封装GET请求
export function get(url, params) {
  return service({
    url,
    method: 'get',
    params
  })
}

// 封装POST请求
export function post(url, data) {
  return service({
    url,
    method: 'post',
    data
  })
}

// 封装PUT请求
export function put(url, data) {
  return service({
    url,
    method: 'put',
    data
  })
}

// 封装DELETE请求
export function del(url, params) {
  return service({
    url,
    method: 'delete',
    params
  })
}

// 导出axios实例
export default service