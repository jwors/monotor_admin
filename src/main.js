import { createApp } from 'vue'
import './assets/main.css'
// 正确导入方式
import ErrorMonitor  from '/src/utils/monotor/error-monitor.js';
import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'

new ErrorMonitor({
	dsn: import.meta.env.VITE_API_BASE_URL + '/errors/log',
	appId: 'vue-admin-template',
	enablePerformance: true,
	enableConsole: true
})

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
