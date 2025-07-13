import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

// 导入统一页面组件
import UnifiedPage from './pages/UnifiedPage.vue'

// 创建路由
const routes = [
  { path: '/', name: 'Home', component: UnifiedPage },
  { path: '/services', name: 'Services', component: UnifiedPage },
  { path: '/chaworld', name: 'ChaWorld', component: UnifiedPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
