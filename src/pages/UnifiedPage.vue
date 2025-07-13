<template>
  <div class="unified-page">
    <!-- 页面头部 -->
    <header v-if="showHeader" class="page-header liquidGlass-wrapper">
      <div class="liquidGlass-effect"></div>
      <div class="liquidGlass-tint"></div>
      <div class="liquidGlass-shine"></div>
      <div class="liquidGlass-text">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <p v-if="pageSubtitle" class="page-subtitle">{{ pageSubtitle }}</p>
      </div>
    </header>

    <!-- 快速链接（仅首页显示） -->
    <div v-if="isHomePage && fastLink" class="fast-link-section">
      <a :href="fastLink" class="fast-link liquidGlass-wrapper">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text">
          <component :is="getIconComponent('rocket')" :size="20" />
          <span>快速访问</span>
        </div>
      </a>
    </div>

    <!-- 主要内容区域 -->
    <main class="page-content">
      <div class="content-grid">
        <CategoryCard 
          v-for="category in categories"
          :key="category.name"
          :category="category"
        />
      </div>
    </main>

    <!-- 空状态 -->
    <div v-if="!categories.length" class="empty-state">
      <div class="liquidGlass-wrapper empty-card">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text">
          <component :is="getIconComponent('box')" :size="48" style="opacity: 0.5;" />
          <p>暂无内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue'
import configManager from '../config/configManager.js'
import iconManager from '../utils/iconManager.js'

export default {
  name: 'UnifiedPage',
  components: {
    CategoryCard
  },
  data() {
    return {
      currentTime: '',
      timeInterval: null
    }
  },
  computed: {
    /**
     * 获取当前路由对应的标签页key
     */
    currentTabKey() {
      const path = this.$route.path
      if (path === '/') return 'hxcn'
      return path.substring(1) // 移除开头的 '/'
    },

    /**
     * 是否为首页
     */
    isHomePage() {
      return this.currentTabKey === 'hxcn'
    },

    /**
     * 获取当前标签页数据
     */
    currentTab() {
      return configManager.getTabByKey(this.currentTabKey) || { categories: [] }
    },

    /**
     * 获取分类数据
     */
    categories() {
      return this.currentTab.categories || []
    },

    /**
     * 页面标题
     */
    pageTitle() {
      if (this.isHomePage) {
        const appConfig = configManager.getAppConfig()
        return appConfig.title || '萑澈起始页'
      }
      return this.currentTab.name || '页面'
    },

    /**
     * 页面副标题（仅首页显示时间）
     */
    pageSubtitle() {
      return this.isHomePage ? this.currentTime : ''
    },

    /**
     * 是否显示头部
     */
    showHeader() {
      return true // 总是显示头部
    },

    /**
     * 快速链接（仅首页）
     */
    fastLink() {
      if (!this.isHomePage) return null
      const appConfig = configManager.getAppConfig()
      return appConfig.fastlink
    }
  },
  mounted() {
    // 如果是首页，启动时钟
    if (this.isHomePage) {
      this.updateTime()
      this.timeInterval = setInterval(this.updateTime, 1000)
    }
  },
  beforeUnmount() {
    // 清理定时器
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  watch: {
    // 监听路由变化
    '$route'() {
      // 清理旧的定时器
      if (this.timeInterval) {
        clearInterval(this.timeInterval)
        this.timeInterval = null
      }
      
      // 如果是首页，重新启动时钟
      if (this.isHomePage) {
        this.updateTime()
        this.timeInterval = setInterval(this.updateTime, 1000)
      }
    }
  },
  methods: {
    /**
     * 更新时间显示
     */
    updateTime() {
      const now = new Date()
      const clockConfig = configManager.getClockConfig()
      const format = clockConfig.format || 'h:i:s - Y/b/m'
      
      // 简单的时间格式化
      this.currentTime = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },

    /**
     * 获取图标组件
     */
    getIconComponent(iconName) {
      return iconManager.getIcon(iconName)
    }
  }
}
</script>

<style scoped>
.unified-page {
  min-height: 100vh;
  padding: 2rem 1rem;
  padding-bottom: 6rem; /* 为底部导航留空间 */
}

.page-header {
  position: relative;
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 20px;
  overflow: hidden;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: var(--text-primary);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.page-subtitle {
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  color: var(--text-secondary);
  opacity: 0.8;
}

.fast-link-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.fast-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 15px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.fast-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.page-content {
  margin-bottom: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.empty-card {
  text-align: center;
  padding: 2rem;
  border-radius: 15px;
  color: var(--text-secondary);
}

.empty-card p {
  margin: 1rem 0 0 0;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .unified-page {
    padding: 1rem 0.5rem;
    padding-bottom: 5rem;
  }

  .page-header {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
}
</style>
