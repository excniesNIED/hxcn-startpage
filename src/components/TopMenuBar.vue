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
          <img src="/assets/favicon.png" alt="Favicon" class="favicon" />
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
          <transition :name="pageTransitionName" mode="out-in">
            <span :key="currentPageName" class="page-title">{{ currentPageName }}</span>
          </transition>
        </div>
      </div>
    </div>
    
    <!-- 右侧：时间显示 -->
    <div class="right-section">
      <!-- 搜索按钮 -->
      <transition>
        <div class="liquidGlass-wrapper menu-item search-btn-item" @click="toggleSearch" v-show="!isSearchActive">
          <div class="liquidGlass-effect"></div>
          <div class="liquidGlass-tint"></div>
          <div class="liquidGlass-shine"></div>
          <div class="liquidGlass-text">
            <component :is="getIconComponent('search')" :size="16" class="search-icon" />
          </div>
        </div>
      </transition>

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
import configManager from '../config/app/configManager.js'
import iconManager from '../utils/iconManager.js'
import { ref } from 'vue'

export default {
  name: 'TopMenuBar',
  data() {
    return {
      currentTime: '',
      timeInterval: null,
      previousPageIndex: 0,
      currentPageIndex: 0,
      transitionDirection: 'right',
      isSearchActive: false
    }
  },  computed: {
    siteTitle() {
      const appConfig = configManager.getAppConfig()
      return appConfig.title || '萑澈'
    },
    currentPageName() {
      // 优先使用路由 meta 中的页面名称
      if (this.$route.meta && this.$route.meta.tabName) {
        return this.$route.meta.tabName
      }
      
      // 根据当前路由获取页面名称
      const currentRoute = this.$route.path
      const tabs = configManager.getNavigationTabs()
      
      const currentTab = tabs.find(tab => {
        const tabPath = tab.key === 'hxcn' ? '/' : `/${tab.key}`
        return currentRoute === tabPath
      })
      
      return currentTab ? currentTab.name : '萑澈'
    },
    pageTransitionName() {
      return `page-title-${this.transitionDirection}`
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 1000)
    this.updatePageIndex()
    
    // 监听搜索关闭事件
    window.addEventListener('search:close', this.handleSearchClose)
    // 监听点击事件
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
    
    // 清除监听器
    window.removeEventListener('search:close', this.handleSearchClose)
    document.removeEventListener('click', this.handleOutsideClick)
  },
  watch: {
    '$route'(to, from) {
      this.updateTransitionDirection(to, from)
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
    },
    getPageIndex(route) {
      const tabs = configManager.getNavigationTabs()
      const pageKey = route.path === '/' ? 'hxcn' : route.path.slice(1)
      
      return tabs.findIndex(tab => tab.key === pageKey)
    },
    updatePageIndex() {
      this.currentPageIndex = this.getPageIndex(this.$route)
      this.previousPageIndex = this.currentPageIndex
    },
    updateTransitionDirection(to, from) {
      const fromIndex = this.getPageIndex(from)
      const toIndex = this.getPageIndex(to)
      
      this.previousPageIndex = fromIndex
      this.currentPageIndex = toIndex
      
      // 根据页面索引确定动画方向
      if (toIndex > fromIndex) {
        this.transitionDirection = 'right' // 向右切换，新页面从右侧进入
      } else if (toIndex < fromIndex) {
        this.transitionDirection = 'left'  // 向左切换，新页面从左侧进入
      } else {
        this.transitionDirection = 'right' // 默认方向
      }
    },
    
    /**
     * 获取图标组件
     */
    getIconComponent(iconName) {
      return iconManager.getIcon(iconName)
    },
    
    /**
     * 切换搜索框显示状态
     */
    toggleSearch() {
      this.isSearchActive = true
      // 触发自定义事件，通知搜索框组件显示
      window.dispatchEvent(new CustomEvent('search:toggle', { detail: { isActive: true } }))
    },
    
    /**
     * 处理搜索框关闭事件
     */
    handleSearchClose() {
      this.isSearchActive = false
    },
    
    /**
     * 处理点击外部
     */
    handleOutsideClick(event) {
      // 如果点击的不是搜索按钮，并且搜索框已经激活，则触发搜索框关闭
      if (this.isSearchActive && 
          !event.target.closest('.search-btn-item') && 
          !event.target.closest('.search-container')) {
        window.dispatchEvent(new CustomEvent('search:toggle', { detail: { isActive: false } }))
        this.isSearchActive = false
      }
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
  background: rgba(15, 15, 15, 0.5);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
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

/* 点击动画效果 */
.liquidGlass-wrapper.menu-item::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%);
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 4;
}

.liquidGlass-wrapper.menu-item:active::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition: opacity 0.2s ease, transform 0.3s ease;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.favicon-item:hover {
  padding: 0.3rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.3),
    0 2px 5px rgba(0, 0, 0, 0.2);
}

.favicon-item:active {
  transform: scale(0.95);
  transition: all 0.1s ease;
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
  transition: all 0.3s ease;
  animation: iconAppear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes iconAppear {
  from {
    opacity: 0;
    transform: scale(0.7) rotate(10deg);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0);
    filter: blur(0);
  }
}

.favicon-item:hover .favicon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
  transform: scale(1.1);
}

/* Title Items */
.title-item {
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.1);
}

.title-item:hover {
  padding: 0.25rem 0.5rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.3),
    0 2px 5px rgba(0, 0, 0, 0.2);
}

.title-item:active {
  transform: scale(0.95);
  transition: all 0.1s ease;
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
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  animation: textAppear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes textAppear {
  from {
    opacity: 0;
    transform: translateY(-5px);
    filter: blur(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.title-item:hover .site-title {
  letter-spacing: 0.5px;
  transform: scale(1.05);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.page-title {
  font-size: 14px;
  font-weight: 400;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  display: inline-block;
  letter-spacing: 0.2px;
  transition: all 0.3s ease;
}

.title-item:hover .page-title {
  letter-spacing: 0.4px;
  transform: scale(1.05);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

/* Page Title Transition Animation */
/* 向右切换动画 (新页面从右侧进入) */
.page-title-right-enter-active,
.page-title-right-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.page-title-right-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
  filter: blur(2px);
}

.page-title-right-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
  filter: blur(2px);
}

/* 向左切换动画 (新页面从左侧进入) */
.page-title-left-enter-active,
.page-title-left-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.page-title-left-enter-from {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
  filter: blur(2px);
}

.page-title-left-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
  filter: blur(2px);
}

/* 通用的进入和离开状态 */
.page-title-right-enter-to,
.page-title-right-leave-from,
.page-title-left-enter-to,
.page-title-left-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
  filter: blur(0);
}

.page-separator {
  font-size: 14px;
  opacity: 0.6;
  font-weight: 300;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  margin: 0 4px;
  position: relative;
  animation: separatorAppear 0.5s ease;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes separatorAppear {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 0.6;
    transform: scaleY(1);
  }
}

.page-separator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.page-separator:hover::before {
  opacity: 1;
}

/* Time Item */
.time-item {
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.1);
}

.time-item:hover {
  padding: 0.25rem 0.6rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: translateY(-1px) scale(1.02);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.3),
    0 2px 5px rgba(0, 0, 0, 0.2);
}

.time-item:active {
  transform: scale(0.98);
  transition: all 0.1s ease;
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
  letter-spacing: 0.2px;
  transition: all 0.3s ease;
  animation: textAppear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-delay: 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.time-item:hover .current-time {
  letter-spacing: 0.4px;
  transform: scale(1.03);
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
}

/* 搜索按钮 */
.search-btn-item {
  padding: 0.4rem;
  border-radius: 50%;
  margin-right: 10px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-btn-item:hover {
  padding: 0.5rem;
  transform: scale(1.1) translateY(-1px);
  background: rgba(var(--accent-rgb), 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.3),
    0 2px 5px rgba(0, 0, 0, 0.2),
    0 0 8px rgba(var(--accent-rgb), 0.3);
}

.search-btn-item:active {
  transform: scale(0.9);
  transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

/* 搜索按钮消失动画 */
.search-btn-item.v-leave-active {
  animation: buttonDisappear 0.3s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

@keyframes buttonDisappear {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.5) rotate(15deg);
  }
}

.search-btn-item:hover .liquidGlass-effect,
.search-btn-item:hover .liquidGlass-tint,
.search-btn-item:hover .liquidGlass-shine {
  opacity: 1;
}

.search-btn-item:hover .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.35);
}

.search-icon {
  color: var(--text);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
  animation: iconSpin 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes iconSpin {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(-45deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.search-btn-item:hover .search-icon {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
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
