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
          :class="{ active: $route.path === tab.path }"
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
    0 10px 40px rgba(0, 0, 0, 0.5),
    0 6px 20px rgba(0, 0, 0, 0.3),
    0 3px 10px rgba(0, 0, 0, 0.2);
}

.bottom-navigation:hover {
  padding: 15px 25px;
  border-radius: 55px;
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.6),
    0 8px 25px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 液体玻璃效果 - 参考 reference 中的 menu 样式 */
.liquidGlass-wrapper {
  position: relative;
  display: flex;
  font-weight: 600;
  overflow: hidden;
  color: white;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2);
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
  gap: 12px;
}

.nav-item {
  padding: 10px 14px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  position: relative;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden; /* 确保子元素不会超出圆角边界 */
}

.nav-item:hover {
  padding: 12px 16px;
  border-radius: 18px;
  transform: translateY(-2px);
  color: white;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 确保子元素不会超出圆角边界 */
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.3);
}

.nav-item .liquidGlass-text {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

/* 确保导航项目的液体玻璃效果有正确的圆角 */
.nav-item .liquidGlass-effect,
.nav-item .liquidGlass-tint,
.nav-item .liquidGlass-shine {
  border-radius: 16px;
}

.nav-item:hover .liquidGlass-effect,
.nav-item:hover .liquidGlass-tint,
.nav-item:hover .liquidGlass-shine {
  border-radius: 18px;
}

/* 选中状态的图标颜色 */
.nav-item.active .liquidGlass-text > * {
  color: rgba(0, 0, 0, 0.8) !important;
}

/* 导航栏图标阴影效果 */
.nav-item .liquidGlass-text > * {
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
}

/* 选中状态的图标和文字阴影 */
.nav-item.active .liquidGlass-text > * {
  filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.3));
}

.nav-item span {
  font-size: 12px;
  font-weight: 900;
  text-align: center;
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.6),
    0 1px 1px rgba(0, 0, 0, 0.4);
}

/* 选中状态的文字阴影 */
.nav-item.active span {
  color: rgba(0, 0, 0, 0.8) !important;
  text-shadow: 
    0 1px 3px rgba(71, 71, 71, 0.3),
    0 1px 1px rgba(95, 95, 95, 0.2);
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
