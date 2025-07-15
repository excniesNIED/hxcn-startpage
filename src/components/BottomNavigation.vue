<template>
  <nav class="liquidGlass-wrapper bottom-navigation">
    <div class="liquidGlass-effect"></div>
    <div class="liquidGlass-tint"></div>
    <div class="liquidGlass-shine"></div>
    <div class="liquidGlass-text">
      <div class="nav-items">        <router-link 
          v-for="tab in tabs" 
          :key="tab.name"
          :to="tab.path"
          class="liquidGlass-wrapper nav-item"
          exact-active-class="active"
        >
          <div class="liquidGlass-effect"></div>
          <div class="liquidGlass-tint"></div>
          <div class="liquidGlass-shine"></div>          <div class="liquidGlass-text">
            <component :is="getIconComponent(tab.icon)" :size="28" />
            <span>{{ tab.name }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import configManager from '../config/configManager.js'
import iconManager from '../utils/iconManager.js'

export default {
  name: 'BottomNavigation',
  data() {
    return {
      tabs: []
    }
  },  async mounted() {
    // 获取导航标签页
    this.tabs = configManager.getNavigationTabs()
  },
  methods: {
    getIconComponent(iconName) {
      return iconManager.getIcon(iconName)
    }
  }
}
</script>

<style scoped>
/* 底部导航栏基础样式 */
.bottom-navigation {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 50px;
  z-index: 1000;
  width: max-content;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.3),
    0 8px 25px rgba(0, 0, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 2px 5px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  background: rgba(25, 25, 25, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.bottom-navigation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.5) 50%, 
    rgba(255, 255, 255, 0) 100%);
  opacity: 0.5;
}

.bottom-navigation:hover {
  padding: 15px 25px;
  border-radius: 55px;
  box-shadow: 
    0 18px 50px rgba(0, 0, 0, 0.4),
    0 12px 30px rgba(0, 0, 0, 0.3),
    0 6px 15px rgba(0, 0, 0, 0.2),
    inset 0 3px 8px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: translateX(-50%) translateY(-3px);
  backdrop-filter: blur(16px);
  background: rgba(30, 30, 30, 0.6);
}

.bottom-navigation:hover::before {
  opacity: 0.8;
}

/* 液体玻璃效果 - 参考 reference 中的 menu 样式 */
.liquidGlass-wrapper {
  position: relative;
  display: flex;
  font-weight: 600;
  overflow: hidden;
  color: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.liquidGlass-effect {
  position: absolute;
  z-index: 0;
  inset: 0;
  backdrop-filter: blur(10px);
  filter: url(#glass-distortion);
  overflow: hidden;
  isolation: isolate;
  border-radius: inherit;
}

.liquidGlass-tint {
  z-index: 1;
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.25);
  border-radius: inherit;
}

.liquidGlass-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  border-radius: inherit;
  box-shadow: 
    inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
    inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
}

.liquidGlass-text {
  z-index: 3;
  color: white;
  position: relative;
  width: 100%;
}

/* 导航项目样式 */
.nav-items {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.nav-item {
  padding: 12px 16px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  position: relative;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.15);
  overflow: hidden; /* 确保子元素不会超出圆角边界 */
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.2),
    0 2px 6px rgba(0, 0, 0, 0.1),
    inset 0 1px 3px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);
}

/* 导航项目点击波纹动画 */
.nav-item::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.2);
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
  z-index: -1;
}

.nav-item:active::after {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 设置导航链接的router-link-active状态 */
.nav-item.router-link-exact-active,
.nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 6px 15px rgba(0, 0, 0, 0.2),
    0 3px 8px rgba(0, 0, 0, 0.1),
    inset 0 -1px 3px rgba(0, 0, 0, 0.1),
    inset 0 2px 5px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: nav-item-activate 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.2) 100%);
}

@keyframes nav-item-activate {
  0% {
    transform: scale(0.9);
    box-shadow: 
      0 2px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.05);
    filter: blur(2px);
  }
  50% {
    transform: scale(1.1) translateY(-5px);
  }
  100% {
    transform: scale(1) translateY(0);
    box-shadow: 
      0 6px 15px rgba(0, 0, 0, 0.2),
      0 3px 8px rgba(0, 0, 0, 0.1),
      inset 0 -1px 3px rgba(0, 0, 0, 0.1),
      inset 0 2px 5px rgba(255, 255, 255, 0.4);
    filter: blur(0);
  }
}

.nav-item:hover {
  padding: 14px 18px;
  border-radius: 20px;
  transform: translateY(-4px);
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 1px 5px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.5) 50%, 
    rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}

.nav-item:hover::before {
  opacity: 0.8;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 6px 15px rgba(0, 0, 0, 0.2),
    0 3px 8px rgba(0, 0, 0, 0.1),
    inset 0 -1px 3px rgba(0, 0, 0, 0.1),
    inset 0 2px 5px rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.nav-item .liquidGlass-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.nav-item:hover .liquidGlass-text {
  transform: scale(1.05);
}

.nav-item.active .liquidGlass-text {
  transform: scale(1.08);
}

/* 确保导航项目的液体玻璃效果有正确的圆角 */
.nav-item .liquidGlass-effect,
.nav-item .liquidGlass-tint,
.nav-item .liquidGlass-shine {
  border-radius: 18px;
}

.nav-item:hover .liquidGlass-effect,
.nav-item:hover .liquidGlass-tint,
.nav-item:hover .liquidGlass-shine {
  border-radius: 20px;
  opacity: 0.95;
}

.nav-item:hover .liquidGlass-tint {
  background: rgba(255, 255, 255, 0.3);
}

/* 选中状态的图标颜色 */
.nav-item.active .liquidGlass-text > * {
  color: rgba(0, 0, 0, 0.8) !important;
}

/* 导航栏图标阴影效果 */
.nav-item .liquidGlass-text > * {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transition: all 0.3s ease;
}

.nav-item:hover .liquidGlass-text > *:first-child {
  transform: scale(1.15) translateY(-2px);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
}

/* 选中状态的图标和文字阴影 */
.nav-item.active .liquidGlass-text > * {
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
}

.nav-item span {
  font-size: 12px;
  font-weight: 800;
  text-align: center;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.6),
    0 1px 2px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.5px;
  position: relative;
}

.nav-item:hover span {
  letter-spacing: 0.8px;
  text-shadow: 
    0 3px 5px rgba(0, 0, 0, 0.7),
    0 2px 3px rgba(0, 0, 0, 0.5);
}

/* 选中状态的文字阴影 */
.nav-item.active span {
  color: rgba(0, 0, 0, 0.8) !important;
  text-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 1px 1px rgba(0, 0, 0, 0.1);
  font-weight: 900;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .bottom-navigation {
    bottom: 15px;
    padding: 10px 16px;
  }
  
  .bottom-navigation:hover {
    padding: 12px 20px;
  }
  
  .nav-items {
    gap: 10px;
  }
  
  .nav-item {
    padding: 8px 12px;
    overflow: hidden; /* 确保子元素不会超出圆角边界 */
  }
  
  .nav-item:hover {
    padding: 10px 14px;
    overflow: hidden; /* 确保子元素不会超出圆角边界 */
  }
    .nav-item span {
    font-size: 11px;
    font-weight: 700;
  }
}
</style>
