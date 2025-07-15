<template>
  <div class="page-container">
    <!-- 页面标题（可选） -->
    <header v-if="showHeader" class="page-header">
      <div class="liquidGlass-wrapper header-card">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text header-content">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <p v-if="pageSubtitle" class="page-subtitle">{{ pageSubtitle }}</p>
        </div>
      </div>
    </header>

    <!-- 分类内容 -->
    <div class="content-grid">
      <CategoryCard 
        v-for="category in categories"
        :key="category.name"
        :category="category"
      />
    </div>

    <!-- 空状态 -->
    <div v-if="!categories.length" class="empty-state">
      <div class="liquidGlass-wrapper empty-card">
        <div class="liquidGlass-effect"></div>
        <div class="liquidGlass-tint"></div>
        <div class="liquidGlass-shine"></div>
        <div class="liquidGlass-text">
          <IconBox :size="48" style="opacity: 0.5;" />
          <p>暂无内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue'
import configManager from '../config/app/configManager.js'
import { IconBox } from '@tabler/icons-vue'

export default {
  name: 'GenericPage',
  components: {
    CategoryCard,
    IconBox
  },
  props: {
    tabKey: {
      type: String,
      required: true
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    customTitle: {
      type: String,
      default: ''
    },
    customSubtitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * 获取当前标签页数据
     */
    currentTab() {
      return configManager.getTabByKey(this.tabKey) || { categories: [] }
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
      return this.customTitle || this.currentTab.name || '未知页面'
    },

    /**
     * 页面副标题
     */
    pageSubtitle() {
      return this.customSubtitle || `${this.categories.length} 个分类`
    }
  },
  
  async mounted() {
    // 确保配置已加载
    if (!configManager.getConfig()) {
      await configManager.loadConfig()
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* 页面标题区域 */
.page-header {
  margin-bottom: 3rem;
  text-align: center;
}

.header-card {
  padding: 2rem;
  border-radius: 30px;
  display: inline-block;
  min-width: 400px;
}

.header-card:hover {
  padding: 2.5rem;
  border-radius: 35px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 内容网格 */
.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 空状态 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.empty-card {
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
}

.empty-card .liquidGlass-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container {
    padding: 0.5rem;
  }
  
  .header-card {
    min-width: auto;
    width: 100%;
    padding: 1.5rem;
    border-radius: 24px;
  }
  
  .header-card:hover {
    padding: 1.8rem;
    border-radius: 28px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .content-grid {
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .header-card {
    padding: 1.2rem;
    border-radius: 20px;
  }
  
  .header-card:hover {
    padding: 1.4rem;
    border-radius: 24px;
  }
}
</style>
