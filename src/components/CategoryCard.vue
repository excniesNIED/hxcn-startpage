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
/* 卡片基础样式 - 参考 reference 中的 button 样式 */
.category-card {
  padding: 1.2rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  animation: cardFloat 8s ease-in-out infinite;
}

.category-card:nth-child(even) {
  animation-delay: -4s;
}

.category-card:hover {
  padding: 1.5rem;
  border-radius: 2.5rem;
}

.category-card:hover .liquidGlass-shine {
  border-radius: 2.5rem;
}

.category-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: white;
  text-shadow: 
    0 3px 6px rgba(0, 0, 0, 0.7),
    0 1px 3px rgba(0, 0, 0, 0.5);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.category-card:hover .category-title {
  transform: scale(0.95);
}

.links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

/* 链接按钮样式 - 减小尺寸 */
.link-button {
  padding: 0.8rem;
  border-radius: 1.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  min-width: 80px;
  flex: 0 0 auto;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.25), 
    0 2px 6px rgba(0, 0, 0, 0.15);
}

.link-button:hover {
  padding: 1rem;
  border-radius: 1.8rem;
  transform: translateY(-2px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.35), 
    0 4px 12px rgba(0, 0, 0, 0.25),
    0 2px 6px rgba(0, 0, 0, 0.15);
}

.link-button:hover .liquidGlass-shine {
  border-radius: 1.8rem;
}

.link-icon {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

.link-button:hover .link-icon {
  transform: scale(0.95);
}

.link-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.6),
    0 1px 2px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.link-button:hover .link-text {
  transform: scale(0.95);
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
    padding: 1rem;
    border-radius: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  .category-card:hover {
    padding: 1.2rem;
    border-radius: 2rem;
  }
  
  .category-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .links-grid {
    gap: 0.6rem;
  }
  
  .link-button {
    padding: 0.7rem;
    min-width: 70px;
    border-radius: 1.3rem;
  }
  
  .link-button:hover {
    padding: 0.85rem;
    border-radius: 1.5rem;
  }
    .link-text {
    font-size: 0.7rem;
    max-width: 70px;
  }
}

@media (max-width: 480px) {
  .links-grid {
    gap: 0.5rem;
  }
  
  .link-button {
    padding: 0.6rem;
    min-width: 60px;
    border-radius: 1.2rem;
  }
  
  .link-button:hover {
    padding: 0.75rem;
    border-radius: 1.4rem;
  }
  
  .link-text {
    max-width: 60px;
    font-size: 0.65rem;
  }
  
  .category-title {
    font-size: 1.1rem;
  }
}
</style>