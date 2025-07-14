import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

// 导入统一页面组件
import UnifiedPage from './pages/UnifiedPage.vue'
// 导入配置管理器
import configManager from './config/configManager.js'

/**
 * 动态生成路由配置
 * 根据 TOML 配置文件中的 tabs 自动生成路由
 */
function generateRoutes() {
  const config = configManager.getConfig()
  
  if (!config || !config.tabs || config.tabs.length === 0) {
    // 如果配置未加载或无标签页，返回默认路由
    console.warn('⚠️ 配置文件未加载或无标签页配置，使用默认路由')
    return [
      { path: '/', name: 'Home', component: UnifiedPage }
    ]
  }

  const routes = []
  
  config.tabs.forEach((tab, index) => {
    const route = {
      name: tab.name,
      component: UnifiedPage,
      meta: {
        tabKey: tab.key,
        tabName: tab.name,
        icon: tab.icon
      }
    }

    // 第一个标签页作为首页
    if (index === 0) {
      route.path = '/'
    } else {
      route.path = `/${tab.key}`
    }

    routes.push(route)
  })

  console.log('✅ 动态生成路由:', routes)
  return routes
}

// 动态生成路由
const routes = generateRoutes()

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
