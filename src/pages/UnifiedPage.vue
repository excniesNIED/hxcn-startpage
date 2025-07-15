<template>  
  <div class="unified-page">
    <!-- 主要内容区域 -->
    <main class="page-content">
      <div class="content-grid">
        <transition-group 
          name="category-wave"
          tag="div"
          class="categories-container"
          @before-enter="beforeEnter"
          @enter="enter"
          @before-leave="beforeLeave"
          @leave="leave"
          :css="false"
        >
          <CategoryCard 
            v-for="(category, index) in categories"
            :key="category.id || category.name"
            :category="category"
            :data-index="index"
          />
        </transition-group>
      </div>
    </main>

    <!-- 空状态 - 仅当初始加载且没有数据时显示 -->
    <transition name="fade">
      <div v-if="!categories.length && !isPageChanging" class="empty-state">
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
    </transition>
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
      categories: [],
      currentTabKey: '', // 存储当前标签页的key
      isPageChanging: false, // 标记页面是否正在切换中
      loadTimer: null, // 用于存储延迟加载的定时器
      originalPositions: {} // 记录卡片原始位置
    }
  },
  computed: {
    /**
     * 获取当前路由对应的标签页key
     * 优先使用路由 meta 中的 tabKey，否则根据 path 推断
     */
    tabKey() {
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
    }
  },
  watch: {
    // 当路由变化时，重新加载当前页面的分类数据
    $route: {
      immediate: true,
      handler() {
        // 清除之前的延迟加载定时器
        if (this.loadTimer) {
          clearTimeout(this.loadTimer)
        }
        
        // 设置页面切换标记，防止显示空状态
        this.isPageChanging = true
        
        // 记录当前所有卡片的位置
        this.saveCardPositions()
        
        // 更新当前标签页key
        this.currentTabKey = this.tabKey
        
        // 直接加载新数据
        this.loadCategoryData()
      }
    }
  },
  beforeUnmount() {
    // 确保清除定时器
    if (this.loadTimer) {
      clearTimeout(this.loadTimer)
    }
  },
  mounted() {
    // 为每个分类添加唯一标识符
    this.ensureCategoryIds()
  },
  methods: {
    /**
     * 确保每个分类都有唯一ID
     */
    ensureCategoryIds() {
      this.categories = this.categories.map((category, index) => {
        if (!category.id) {
          category.id = `${category.name}-${index}-${Date.now()}`
        }
        return category
      })
    },
    /**
     * 保存所有卡片的当前位置
     */
    saveCardPositions() {
      const cards = document.querySelectorAll('.category-card')
      this.originalPositions = {}
      
      cards.forEach(card => {
        const key = card.parentNode.key
        if (key) {
          const rect = card.getBoundingClientRect()
          this.originalPositions[key] = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
          }
        }
      })
    },
    /**
     * 加载当前标签页的分类数据
     */
    loadCategoryData() {
      const config = configManager.getConfig()
      if (!config) {
        this.categories = []
        this.isPageChanging = false
        return
      }
      
      const tab = config.tabs.find(t => t.key === this.currentTabKey)
      
      // 直接加载新数据
      if (tab && tab.categories) {
        this.categories = tab.categories.map((category, index) => ({
          ...category,
          id: `${category.name}-${index}-${this.currentTabKey}` // 确保每个分类有唯一ID
        }))
      } else {
        this.categories = []
      }
      
      // 数据加载完成，重置页面切换标记
      this.loadTimer = setTimeout(() => {
        this.isPageChanging = false
      }, 100)
    },
    /**
     * 获取图标组件
     */
    getIconComponent(iconName) {
      return iconManager.getIcon(iconName)
    },
    /**
     * 卡片进入前准备
     */
    beforeEnter(el) {
      // 获取数据索引
      const index = parseInt(el.dataset.index || 0)
      
      // 初始状态：在原位置但透明且缩小
      el.style.opacity = '0'
      el.style.transform = 'scale(0.8)'
      el.style.transformOrigin = 'center center'
    },
    /**
     * 卡片进入动画 - 原地波浪弹出效果
     */
    enter(el, done) {
      const index = parseInt(el.dataset.index || 0)
      const delay = index * 120 // 每个卡片错开120ms
      
      // 强制浏览器重绘
      void el.offsetWidth
      
      // 初始阶段：添加波浪动画类
      el.classList.add('wave-animation')
      
      // 第一阶段：淡入并稍微缩小
      setTimeout(() => {
        el.style.transition = 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        el.style.opacity = '0.8'
        el.style.transform = 'scale(0.85)'
        el.style.filter = 'blur(3px)'
        
        // 第二阶段：弹出过头
        setTimeout(() => {
          el.style.transition = 'all 500ms cubic-bezier(0.18, 0.89, 0.32, 1.48)' // 更加非线性的弹性曲线
          el.style.opacity = '1'
          el.style.transform = 'scale(1.08)' // 弹得更高一些
          el.style.filter = 'blur(0px)'
          
          // 第三阶段：回弹
          setTimeout(() => {
            el.style.transition = 'all 400ms cubic-bezier(0.34, 1.61, 0.7, 1.3)' // 更有弹性的回弹
            el.style.transform = 'scale(0.95)'
            
            // 第四阶段：小幅度回弹
            setTimeout(() => {
              el.style.transition = 'all 350ms cubic-bezier(0.34, 1.61, 0.7, 1.3)'
              el.style.transform = 'scale(1.02)'
              
              // 最终阶段：回到正常大小
              setTimeout(() => {
                el.style.transition = 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                el.style.transform = 'scale(1)'
                
                // 动画完成后移除波浪动画类
                setTimeout(() => {
                  el.classList.remove('wave-animation')
                  done()
                }, 300)
              }, 350)
            }, 400)
          }, 500)
        }, 300)
      }, delay)
    },
    /**
     * 卡片离开前准备
     */
    beforeLeave(el) {
      // 获取当前位置
      const rect = el.getBoundingClientRect()
      el.style.position = 'absolute'
      el.style.left = `${rect.left}px`
      el.style.top = `${rect.top}px`
      el.style.width = `${rect.width}px`
      el.style.height = `${rect.height}px`
      el.style.zIndex = '0'
    },
    /**
     * 卡片离开动画 - 原地淡出
     */
    leave(el, done) {
      // 添加延迟，让卡片依次消失
      const index = parseInt(el.dataset.index || 0)
      const delay = index * 50
      
      setTimeout(() => {
        // 原地淡出动画
        el.style.transition = 'all 500ms cubic-bezier(0.4, 0.0, 0.2, 1)'
        el.style.opacity = '0'
        el.style.transform = 'scale(0.85)'
        el.style.filter = 'blur(5px)'
        
        // 动画结束后执行done回调
        setTimeout(done, 500)
      }, delay)
    }
  }
}
</script>

<style scoped>
.unified-page {
  width: 100%;
  height: 100%;
  overscroll-behavior-x: none; /* 防止横向滚动 */
}

.page-content {
  width: 100%;
  overflow-x: hidden; /* 隐藏横向滚动条 */
}

.content-grid {
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  min-height: 300px; /* 确保有足够空间进行动画 */
  overscroll-behavior-x: none; /* 防止横向滚动 */
}

.categories-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  position: relative; /* 确保可以定位绝对定位元素 */
  justify-items: center; /* 水平居中 */
}

/* 卡片波浪动画 - 保留用于CSS过渡 */
.category-wave-move {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 神灯波浪效果 - 更加Q弹的非线性动画 */
.wave-animation {
  animation: card-wave-effect 1.5s cubic-bezier(0.18, 0.89, 0.32, 1.48);
}

@keyframes card-wave-effect {
  0% {
    transform: scale(0.85) translateY(10px);
  }
  40% {
    transform: scale(1.08) translateY(-15px);
  }
  60% {
    transform: scale(0.95) translateY(8px);
  }
  75% {
    transform: scale(1.03) translateY(-5px);
  }
  85% {
    transform: scale(0.98) translateY(3px);
  }
  92% {
    transform: scale(1.01) translateY(-2px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.empty-card {
  padding: 3rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-width: 300px;
  text-align: center;
}

.empty-card p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .categories-container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 0;
  }
}

@media (max-width: 480px) {
  .categories-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.2rem;
    padding: 1rem 0;
  }
}
</style>
