<template>
  <div class="liquidGlass-wrapper category-card">
    <div class="liquidGlass-effect"></div>
    <div class="liquidGlass-tint"></div>
    <div class="liquidGlass-shine"></div>
    <div class="liquidGlass-text">
      <h3 class="category-title">{{ category.name }}</h3>
      <div class="links-grid">
        <a
          v-for="link in category.links"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="liquidGlass-wrapper link-button"
        >
          <div class="liquidGlass-effect"></div>
          <div class="liquidGlass-tint"></div>
          <div class="liquidGlass-shine"></div>          <div class="liquidGlass-text">
            <component 
              :is="getIconComponent(link.icon)"
              :size="20"
              class="link-icon"
              :style="{ color: link.icon_color }"
            />
            <span class="link-text">{{ link.name }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import iconManager from '../utils/iconManager.js'

export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIconComponent(iconName) {
      return iconManager.getIcon(iconName)
    }
  }
}
</script>

<style scoped>
/* 卡片基础样式 - 参考 reference 中的 dock 样式 */
.category-card {
  padding: 1.5rem;
  border-radius: 2.5rem;
  margin-bottom: 2rem;
  animation: cardFloat 8s ease-in-out infinite;
}

.category-card:nth-child(even) {
  animation-delay: -4s;
}

.category-card:hover {
  padding: 1.8rem;
  border-radius: 3rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

/* 链接按钮样式 - 参考 reference 中的 button 样式 */
.link-button {
  padding: 1.2rem;
  border-radius: 2rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  min-width: 100px;
  flex: 0 0 auto;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.link-button:hover {
  padding: 1.4rem;
  border-radius: 2.5rem;
  transform: translateY(-2px);
}

.link-icon {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.link-button:hover .link-icon {
  transform: scale(0.95);
}

.link-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

/* 浮动动画 */
@keyframes cardFloat {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-5px); 
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .category-card {
    padding: 1.2rem;
    border-radius: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .category-card:hover {
    padding: 1.4rem;
    border-radius: 2.5rem;
  }
  
  .category-title {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }
  
  .links-grid {
    gap: 0.8rem;
  }
  
  .link-button {
    padding: 1rem;
    min-width: 80px;
  }
  
  .link-button:hover {
    padding: 1.2rem;
  }
  
  .link-text {
    font-size: 0.8rem;
    max-width: 80px;
  }
}

@media (max-width: 480px) {
  .links-grid {
    gap: 0.6rem;
  }
  
  .link-button {
    padding: 0.8rem;
    min-width: 70px;
  }
  
  .link-button:hover {
    padding: 1rem;
  }
  
  .link-text {
    max-width: 70px;
  }
}
</style>