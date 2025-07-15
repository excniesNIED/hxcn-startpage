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
          <div class="liquidGlass-shine"></div>          <div class="liquidGlass-text">            <component 
              :is="getIconComponent(link.icon)"
              :size="24"
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
/* 卡片基础样式 - 完全参考 reference 中的 button 样式 */
.category-card {
  padding: 1.5rem 2.5rem;
  border-radius: 3rem;
  margin-bottom: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  animation: cardFloat 8s ease-in-out infinite;
  /* 设置固定的基础尺寸，hover时会扩展 */
  width: 350px;
  min-height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4), 
    0 6px 20px rgba(0, 0, 0, 0.3),
    0 3px 10px rgba(0, 0, 0, 0.2),
    inset 0 2px 3px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%);
  z-index: 5;
}

.category-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.2) 50%, 
    rgba(0, 0, 0, 0) 100%);
  z-index: 5;
}

.category-card,
.category-card .liquidGlass-effect,
.category-card .liquidGlass-tint,
.category-card .liquidGlass-shine {
  border-radius: 3rem;
}

.category-card:nth-child(even) {
  animation-delay: -4s;
}

/* 卡片hover效果 - 真正的尺寸扩展 */
.category-card:hover {
  padding: 1.8rem 2.8rem;
  /* 水平和垂直方向都扩展，为按钮提供更多空间 */
  width: 380px;
  min-height: 220px;
  transform: translateY(-5px);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.5), 
    0 10px 30px rgba(0, 0, 0, 0.4),
    0 6px 20px rgba(0, 0, 0, 0.3),
    0 3px 10px rgba(0, 0, 0, 0.2),
    inset 0 2px 5px rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
}

.category-card:hover .liquidGlass-effect,
.category-card:hover .liquidGlass-tint,
.category-card:hover .liquidGlass-shine {
  border-radius: 4rem;
  opacity: 0.9;
}

.category-card:hover .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.15);
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
  position: relative;
  letter-spacing: 0.5px;
  padding-bottom: 10px;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.8) 50%, 
    rgba(255, 255, 255, 0) 100%);
  border-radius: 2px;
}

.category-card:hover .category-title {
  transform: scale(0.95);
  text-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.6);
}

.links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  /* 添加最小宽度确保有足够空间容纳按钮变化 */
  min-width: 100%;
  width: 100%;
  /* 添加最小高度确保按钮有足够垂直空间 */
  min-height: 60px;
}

/* 卡片hover时，为按钮提供更多空间 */
.category-card:hover .links-grid {
  gap: 1rem;
  min-height: 70px;
}

/* 链接按钮样式 - 图标和文字左右并排，参考dock栏样式 */
.link-button {
  padding: 0.8rem 1rem;
  border-radius: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 90px;
  /* 改进flex属性，让按钮能够更好地适应空间变化 */
  flex: 0 1 auto;
  max-width: 140px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.35), 
    0 4px 12px rgba(0, 0, 0, 0.25),
    0 2px 6px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
}

.link-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 30%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.8s ease;
  transform: translate(-30%, -30%);
  pointer-events: none;
}

.link-button:hover::before {
  opacity: 1;
  animation: shine 1.5s ease forwards;
}

@keyframes shine {
  0% {
    transform: translate(-30%, -30%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(30%, 30%);
    opacity: 0;
  }
}

.link-button:hover {
  padding: 1rem 1.2rem;
  border-radius: 1.8rem;
  transform: translateY(-4px);
  /* 减小按钮hover时的变化幅度，避免过度影响布局 */
  max-width: 150px;
  box-shadow: 
    0 12px 30px rgba(0, 0, 0, 0.45), 
    0 8px 24px rgba(0, 0, 0, 0.35),
    0 4px 12px rgba(0, 0, 0, 0.25),
    0 2px 6px rgba(0, 0, 0, 0.15),
    inset 0 1px 3px rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.link-button:hover .liquidGlass-effect,
.link-button:hover .liquidGlass-tint {
  opacity: 0.95;
}

.link-button:hover .liquidGlass-shine {
  border-radius: 1.8rem;
  opacity: 1;
}

.link-button:hover .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.1);
}

.link-button .liquidGlass-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.link-icon {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

.link-button:hover .link-icon {
  transform: scale(1.15) rotate(-5deg);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
}

.link-text {
  font-size: 0.8rem;
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
  letter-spacing: 0.3px;
}

.link-button:hover .link-text {
  transform: scale(1.05);
  text-shadow: 
    0 3px 6px rgba(0, 0, 0, 0.7),
    0 2px 3px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
}

/* 浮动动画 - 与hover效果协调 */
@keyframes cardFloat {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-5px); 
  }
}

/* hover时保持浮动动画但添加交互效果 */
.category-card:hover {
  animation: cardFloatHover 8s ease-in-out infinite;
}

@keyframes cardFloatHover {
  0%, 100% { 
    transform: scale(1.05) translateY(0px); 
  }
  50% { 
    transform: scale(1.05) translateY(-3px); 
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .category-card {
    padding: 1.2rem 2rem;
    border-radius: 2.5rem;
    margin-bottom: 1.5rem;
    min-width: 250px;
  }
  
  .category-card:hover {
    padding: 1.4rem 2.3rem;
    border-radius: 3rem;
  }
  
  .category-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .links-grid {
    gap: 0.6rem;
  }
    .link-button {
    padding: 0.7rem 0.9rem;
    min-width: 80px;
    border-radius: 1.3rem;
  }
  
  .link-button:hover {
    padding: 0.85rem 1.1rem;
    border-radius: 1.5rem;
  }
  
  .link-icon {
    width: 22px;
    height: 22px;
  }
  
  .link-text {
    font-size: 0.75rem;
    max-width: 80px;
  }
}

@media (max-width: 480px) {
  .category-card {
    padding: 1rem 1.5rem;
    border-radius: 2rem;
    min-width: 200px;
  }
  
  .category-card:hover {
    padding: 1.2rem 1.8rem;
    border-radius: 2.5rem;
  }
  
  .links-grid {
    gap: 0.5rem;
  }
    .link-button {
    padding: 0.6rem 0.8rem;
    min-width: 70px;
    border-radius: 1.2rem;
  }
  
  .link-button:hover {
    padding: 0.75rem 1rem;
    border-radius: 1.4rem;
  }
  
  .link-icon {
    width: 20px;
    height: 20px;
  }
  
  .link-text {
    max-width: 70px;
    font-size: 0.7rem;
  }
  
  .category-title {
    font-size: 1.1rem;
  }
}
</style>