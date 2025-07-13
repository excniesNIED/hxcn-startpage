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
          <div class="liquidGlass-shine"></div>
          <div class="liquidGlass-text">
            <component 
              :is="getIconComponent(link.icon)" 
              :size="32" 
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
  },  methods: {
    getIconComponent(iconName) {
      return iconManager.getIcon(iconName)
    }
  }
}
</script>

<style scoped>
/* 卡片基础样式 - 参考 reference 中的 dock 样式 */
.category-card {
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 24px;
  animation: cardFloat 8s ease-in-out infinite;
}

.category-card:nth-child(even) {
  animation-delay: -4s;
}

.category-card:hover {
  padding: 28px;
  border-radius: 24px;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  align-items: center;
  justify-content: center;
}

/* 链接按钮样式 - 参考 reference 中的 button 样式 */
.link-button {
  padding: 16px 12px;
  border-radius: 16px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-height: 80px;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.link-button:hover {
  padding: 18px 14px;
  border-radius: 20px;
  transform: scale(0.98);
}

.link-icon {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.link-button:hover .link-icon {
  transform: scale(0.95);
}

.link-text {
  font-size: 12px;
  font-weight: 500;
  color: white;
  text-align: center;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  max-width: 100%;
  word-wrap: break-word;
}

/* 卡片浮动动画 */
@keyframes cardFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-5px) rotate(0.5deg); 
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .category-card {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 20px;
  }
  
  .category-card:hover {
    padding: 22px;
    border-radius: 18px;
  }
  
  .category-title {
    font-size: 1.3rem;
    margin-bottom: 16px;
  }
  
  .links-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 12px;
  }
  
  .link-button {
    padding: 12px 8px;
    min-height: 70px;
  }
  
  .link-button:hover {
    padding: 14px 10px;
  }
  
  .link-text {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .links-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .link-button {
    min-height: 60px;
    padding: 10px 6px;
  }
  
  .link-text {
    font-size: 10px;
  }
}
</style>
