<template>
  <header class="liquidGlass-wrapper top-menu-bar">
    <div class="liquidGlass-effect"></div>
    <div class="liquidGlass-tint"></div>
    <div class="liquidGlass-shine"></div>
    <div class="liquidGlass-text">      <!-- 左侧：Favicon + 网站标题 -->
      <div class="left-section">
        <img src="/favicon.png" alt="Favicon" class="favicon" />
        <span class="site-title">{{ siteTitle }}</span>
        <span class="page-separator">-</span>
        <span class="page-title">{{ currentPageName }}</span>
      </div>
      
      <!-- 右侧：时间显示 -->
      <div class="right-section">
        <span class="current-time">{{ currentTime }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import configManager from '../config/configManager.js'

export default {
  name: 'TopMenuBar',
  data() {
    return {
      currentTime: '',
      timeInterval: null
    }
  },  computed: {
    siteTitle() {
      const appConfig = configManager.getAppConfig()
      return appConfig.title || '萑澈'
    },
    currentPageName() {
      // 根据当前路由获取页面名称
      const currentRoute = this.$route.path
      const tabs = configManager.getNavigationTabs()
      
      const currentTab = tabs.find(tab => {
        const tabPath = tab.key === 'hxcn' ? '/' : `/${tab.key}`
        return currentRoute === tabPath
      })
      
      return currentTab ? currentTab.name : '萑澈'
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 1000)
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },  methods: {
    updateTime() {
      const now = new Date()
      const clockConfig = configManager.getClockConfig()
      
      // 简化的时间格式化
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      const year = now.getFullYear()
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      const day = now.getDate().toString().padStart(2, '0')
      
      this.currentTime = `${hours}:${minutes}:${seconds} - ${year}/${month}/${day}`
    }
  }
}
</script>

<style scoped>
.top-menu-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  z-index: 1001;
  padding: 0.4rem 1rem;
  border-radius: 0;
  backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 1px 10px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.top-menu-bar .liquidGlass-effect {
  backdrop-filter: blur(20px) saturate(1.8);
  filter: none;
}

.top-menu-bar .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.1);
  border: none;
}

.top-menu-bar .liquidGlass-shine {
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
}

.top-menu-bar .liquidGlass-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favicon {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.site-title {
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.page-separator {
  font-size: 14px;
  opacity: 0.6;
  font-weight: 300;
}

.page-title {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.right-section {
  display: flex;
  align-items: center;
}

.current-time {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Mono', 'Monaco', 'Consolas', 'Menlo', monospace;
  font-size: 13px;
  font-weight: 400;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

/* 悬停效果 */
.top-menu-bar:hover {
  backdrop-filter: blur(25px) saturate(2);
}

.top-menu-bar:hover .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.15);
}

.top-menu-bar:hover .liquidGlass-shine {
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-menu-bar {
    padding: 0.3rem 0.8rem;
  }
  
  .top-menu-bar .liquidGlass-text {
    font-size: 13px;
  }
  
  .favicon {
    width: 16px;
    height: 16px;
  }
  
  .current-time {
    font-size: 12px;
  }
  
  .left-section {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .page-separator,
  .page-title {
    display: none;
  }
  
  .current-time {
    font-size: 11px;
  }
}
</style>
