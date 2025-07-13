import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

// 导入页面组件
import Home from './pages/Home.vue'

// 创建路由
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/services', name: 'Services', component: () => import('./pages/Services.vue') },
  { path: '/chaworld', name: 'ChaWorld', component: () => import('./pages/ChaWorld.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
