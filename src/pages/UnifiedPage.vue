<template>  <div class="unified-page">
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
  computed: {
    /**
     * 获取当前路由对应的标签页key
     * 优先使用路由 meta 中的 tabKey，否则根据 path 推断
     */
    currentTabKey() {
      // 优先使用路由元信息中的 tabKey
      if (this.$route.meta && this.$route.meta.tabKey) {
        return this.$route.meta.tabKey
      }
      
      // 如果是根路径，查找第一个标签页的 key
      const path = this.$route.path
      if (path === '/') {
        const config = configManager.getConfig()
        if (config && config.tabs && config.tabs.length > 0) {
          return config.tabs[0].key
        }
        return 'hxcn' // 默认值
      }
      
      // 其他路径移除开头的 '/'
      return path.substring(1)
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
    }
  },
  methods: {
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
  min-height: calc(100vh - 120px); /* 减去顶部菜单栏和底部导航栏的高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.page-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  justify-items: center;
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
  border-radius: 2rem;
  color: var(--text-secondary);
}

.empty-card p {
  margin: 1rem 0 0 0;
  font-size: 1rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .unified-page {
    padding: 1.5rem 0;
  }
  
  .content-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
  }
}

@media (max-width: 480px) {
  .unified-page {
    padding: 1rem 0;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 300px;
  }
}
</style>
