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
     */
    currentTabKey() {
      const path = this.$route.path
      if (path === '/') return 'hxcn'
      return path.substring(1) // 移除开头的 '/'
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
  min-height: 100vh;
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
  border-radius: 2rem;
  color: var(--text-secondary);
}

.empty-card p {
  margin: 1rem 0 0 0;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
