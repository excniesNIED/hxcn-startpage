<template>
  <header class="top-menu-bar">
    <!-- 左侧：Favicon + 网站标题 -->
    <div class="left-section">
      <!-- Favicon -->
      <div class="liquidGlass-wrapper menu-item favicon-item">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text">
          <img src="/favicon.png" alt="Favicon" class="favicon" />
        </div>
      </div>
      
      <!-- Site Title -->
      <div class="liquidGlass-wrapper menu-item title-item">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text">
          <span class="site-title">{{ siteTitle }}</span>
        </div>
      </div>
      
      <!-- Separator -->
      <span class="page-separator">-</span>
      
      <!-- Page Title -->
      <div class="liquidGlass-wrapper menu-item title-item">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text">
          <span class="page-title">{{ currentPageName }}</span>
        </div>
      </div>
    </div>
    
    <!-- 右侧：时间显示 -->
    <div class="right-section">
      <div class="liquidGlass-wrapper menu-item time-item">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text">
          <span class="current-time">{{ currentTime }}</span>
        </div>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.right-section {
  display: flex;
  align-items: center;
}

/* Liquid Glass Menu Item Effects */
.liquidGlass-wrapper.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.liquidGlass-effect {
  position: absolute;
  z-index: 0;
  inset: 0;
  backdrop-filter: blur(3px);
  filter: url(#glass-distortion);
  overflow: hidden;
  isolation: isolate;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.liquidGlass-tint {
  z-index: 1;
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.25);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.liquidGlass-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
    inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.liquidGlass-text {
  z-index: 3;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Favicon Item */
.favicon-item {
  padding: 0.2rem;
  border-radius: 0.5rem;
}

.favicon-item:hover {
  padding: 0.3rem;
  border-radius: 0.6rem;
}

.favicon-item:hover .liquidGlass-effect,
.favicon-item:hover .liquidGlass-tint,
.favicon-item:hover .liquidGlass-shine {
  opacity: 1;
}

.favicon {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

/* Title Items */
.title-item {
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
}

.title-item:hover {
  padding: 0.25rem 0.5rem;
  border-radius: 0.6rem;
}

.title-item:hover .liquidGlass-effect,
.title-item:hover .liquidGlass-tint,
.title-item:hover .liquidGlass-shine {
  opacity: 1;
}

.title-item:hover .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.4);
}

.site-title {
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.page-title {
  font-size: 14px;
  font-weight: 400;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.page-separator {
  font-size: 14px;
  opacity: 0.6;
  font-weight: 300;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  margin: 0 4px;
}

/* Time Item */
.time-item {
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}

.time-item:hover {
  padding: 0.25rem 0.6rem;
  border-radius: 0.6rem;
}

.time-item:hover .liquidGlass-effect,
.time-item:hover .liquidGlass-tint,
.time-item:hover .liquidGlass-shine {
  opacity: 1;
}

.time-item:hover .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.35);
}

.current-time {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Mono', 'Monaco', 'Consolas', 'Menlo', monospace;
  font-size: 13px;
  font-weight: 400;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-menu-bar {
    padding: 0.3rem 0.8rem;
  }
  
  .left-section {
    gap: 6px;
  }
  
  .favicon {
    width: 16px;
    height: 16px;
  }
  
  .site-title,
  .page-title,
  .page-separator {
    font-size: 13px;
  }
  
  .current-time {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .page-separator,
  .title-item:last-of-type {
    display: none;
  }
  
  .current-time {
    font-size: 11px;
  }
}
</style>
