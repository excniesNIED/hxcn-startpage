<template>
  <div class="app-container">
    <!-- 背景视频 -->    <video 
      class="background-video" 
      autoplay 
      loop 
      muted 
      playsinline
    >
      <source src="/background.webm" type="video/webm">
    </video>
    
    <!-- 顶部菜单栏 -->
    <TopMenuBar />
    
    <!-- 全局搜索框 -->
    <div class="global-search">
      <SearchBox />
    </div>
    
    <!-- 主要内容区域 -->
    <main class="main-content" :class="{ 'content-pushed': isSearchActive }">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 搜索遮罩 -->
    <div class="search-overlay" :class="{ 'overlay-active': isSearchActive }" @click="closeSearch"></div>
    
    <!-- 底部导航栏 -->
    <BottomNavigation />
    
    <!-- SVG 滤镜定义 -->
    <svg class="glass-filter">
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.008 0.008"
          numOctaves="1"
          seed="5"
          result="turbulence"
        />
        
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="0.8" exponent="8" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>

        <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />        <feSpecularLighting
          in="softMap"
          surfaceScale="3"
          specularConstant="0.8"
          specularExponent="80"
          lighting-color="white"
          result="specLight"
        >
          <fePointLight x="-150" y="-150" z="250" />
        </feSpecularLighting>

        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="60"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  </div>
</template>

<script>
import BottomNavigation from './components/BottomNavigation.vue'
import TopMenuBar from './components/TopMenuBar.vue'
import SearchBox from './components/SearchBox.vue'

export default {
  name: 'App',
  components: {
    BottomNavigation,
    TopMenuBar,
    SearchBox
  },
  data() {
    return {
      isSearchActive: false
    }
  },
  mounted() {
    // 监听搜索框状态变化
    window.addEventListener('search:toggle', this.handleSearchToggle)
    window.addEventListener('search:close', this.handleSearchClose)
  },
  beforeUnmount() {
    // 清除监听
    window.removeEventListener('search:toggle', this.handleSearchToggle)
    window.removeEventListener('search:close', this.handleSearchClose)
  },
  methods: {
    // 处理搜索框状态变化
    handleSearchToggle(event) {
      this.isSearchActive = event.detail.isActive
    },
    // 处理搜索框关闭
    handleSearchClose() {
      this.isSearchActive = false
    },
    // 点击遮罩关闭搜索
    closeSearch() {
      window.dispatchEvent(new CustomEvent('search:toggle', { detail: { isActive: false } }))
      this.isSearchActive = false
    }
  }
}
</script>

<style scoped>
/* App组件特定样式 */
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  opacity: 0.8;
}

/* 全局搜索框 */
.global-search {
  position: fixed;
  top: 80px; /* 调整搜索框位置，向下移动 */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  pointer-events: none; /* 允许点击穿透 */
}

.global-search :deep(.search-container) {
  pointer-events: auto; /* 恢复搜索框的可点击性 */
  position: absolute;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.global-search :deep(.search-inactive) {
  opacity: 0;
  transform: translateY(-40px) scale(0.8);
  pointer-events: none; /* 不活跃时禁用点击 */
}

.global-search :deep(.search-active) {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 搜索遮罩 */
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
  transform: translateZ(0);
}

.search-overlay.overlay-active {
  opacity: 1;
  pointer-events: auto;
  animation: overlay-appear 0.4s ease forwards;
}

@keyframes overlay-appear {
  0% {
    backdrop-filter: blur(0);
  }
  100% {
    backdrop-filter: blur(8px);
  }
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 2rem;
  padding-top: 64px;
  padding-bottom: 120px;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

/* 当搜索框激活时，内容向下推移 */
.content-pushed {
  transform: translateY(80px);
  animation: content-push 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2) forwards;
}

@keyframes content-push {
  0% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(90px);
  }
  85% {
    transform: translateY(75px);
  }
  100% {
    transform: translateY(80px);
  }
}

.glass-filter {
  position: absolute;
  width: 0;
  height: 0;
  visibility: hidden;
}

/* 页面切换动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
    padding-top: 56px;
    padding-bottom: 100px;
  }
  
  .global-search :deep(.search-container) {
    max-width: 90%;
  }
  
  /* 调整移动设备上的推移距离 */
  .content-pushed {
    transform: translateY(70px);
  }
}
</style>