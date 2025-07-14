<template>
  <div class="search-container">
    <div class="liquidGlass-wrapper search-box">
      <div class="liquidGlass-effect"></div>
      <div class="liquidGlass-tint"></div>
      <div class="liquidGlass-shine"></div>
      
      <div class="search-content">
        <!-- 搜索引擎选择器 -->
        <div class="engine-selector" @click="toggleEngineDropdown">
          <component 
            :is="getIconComponent(currentEngine.icon)" 
            :size="20" 
            class="engine-icon"
          />
          <component 
            :is="getIconComponent('chevron-down')" 
            :size="16" 
            class="dropdown-icon"
            :class="{ 'rotated': showEngineDropdown }"
          />
          
          <!-- 搜索引擎下拉列表 -->
          <transition name="dropdown">
            <div v-if="showEngineDropdown" class="engine-dropdown">
              <div class="liquidGlass-wrapper dropdown-content">
                <div class="liquidGlass-effect"></div>
                <div class="liquidGlass-tint"></div>
                <div class="liquidGlass-shine"></div>
                
                <div 
                  v-for="engine in engines" 
                  :key="engine.key"
                  class="engine-option"
                  :class="{ 'active': engine.key === currentEngine.key }"
                  @click="selectEngine(engine, $event)"
                >
                  <component 
                    :is="getIconComponent(engine.icon)" 
                    :size="18" 
                    class="option-icon"
                  />
                  <span class="option-name">{{ engine.name }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 搜索输入框 -->
        <input 
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="search-input"
          :placeholder="`使用 ${currentEngine.name} 搜索...`"
          @keydown.enter="handleSearch"
          @input="handleInput"
        />

        <!-- 搜索按钮 -->
        <div class="liquidGlass-wrapper search-button-wrapper" @click="handleSearch">
          <div class="liquidGlass-effect"></div>
          <div class="liquidGlass-tint"></div>
          <div class="liquidGlass-shine"></div>
          <button 
            class="search-button"
            :disabled="!searchQuery.trim()"
          >
            <component 
              :is="getIconComponent('arrow-right')" 
              :size="18"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchManager from '../config/searchManager.js'
import iconManager from '../utils/iconManager.js'

export default {
  name: 'SearchBox',
  data() {
    return {
      searchQuery: '',
      showEngineDropdown: false
    }
  },
  computed: {
    engines() {
      return searchManager.getEngines()
    },
    currentEngine() {
      return searchManager.getCurrentEngine() || this.engines[0] || { 
        name: 'Bing', 
        icon: 'brand-bing', 
        key: 'bing' 
      }
    }
  },
  mounted() {
    // 恢复首选搜索引擎
    searchManager.restorePreferredEngine()
    
    // 点击外部关闭下拉菜单
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    /**
     * 获取图标组件
     */
    getIconComponent(iconName) {
      return iconManager.getIcon(iconName)
    },

    /**
     * 切换搜索引擎下拉菜单
     */
    toggleEngineDropdown(event) {
      event.stopPropagation()
      this.showEngineDropdown = !this.showEngineDropdown
    },

    /**
     * 选择搜索引擎
     */
    selectEngine(engine, event) {
      event.stopPropagation()
      searchManager.setCurrentEngine(engine.key)
      this.showEngineDropdown = false
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },

    /**
     * 处理搜索
     */
    handleSearch() {
      if (this.searchQuery.trim()) {
        searchManager.search(this.searchQuery.trim())
        this.searchQuery = ''
      }
    },

    /**
     * 处理输入
     */
    handleInput() {
      // 这里可以添加搜索建议功能
    },

    /**
     * 处理点击外部
     */
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showEngineDropdown = false
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  position: relative;
  z-index: 10;
}

.search-box {
  border-radius: 1.5rem;
  overflow: visible;
  position: relative;
}

.search-content {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  width: 100%;
}

/* 搜索引擎选择器 */
.engine-selector {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.7rem 0.9rem;
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  background: rgba(var(--surface0-rgb), 0.3);
  position: relative;
  flex-shrink: 0;
  min-width: fit-content;
}

.engine-selector:hover {
  padding: 0.8rem 1rem;
  border-radius: 1.4rem;
  background: rgba(var(--surface0-rgb), 0.5);
  transform: translateY(-1px);
}

.engine-icon {
  color: var(--text);
  flex-shrink: 0;
}

.dropdown-icon {
  color: var(--text-secondary);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

/* 搜索引擎下拉菜单 */
.engine-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  min-width: 200px;
  z-index: 1000;
}

.dropdown-content {
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(var(--surface1-rgb), 0.5);
  padding: 0.4rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.dropdown-content:hover {
  padding: 0.6rem;
  border-radius: 1.8rem;
}

.engine-option {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  position: relative;
  z-index: 2;
  border-radius: 1rem;
  color: var(--text);
}

.engine-option:hover {
  background: rgba(var(--surface1-rgb), 0.5);
  backdrop-filter: blur(2px);
  border-radius: 1.2rem;
  padding: 0.8rem 1.1rem;
}

.engine-option.active {
  background: rgba(var(--accent-rgb), 0.2);
  color: var(--accent);
}

.option-icon {
  flex-shrink: 0;
}

.option-name {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 搜索输入框 */
.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  color: var(--text);
  border-radius: 1.2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  min-width: 0;
}

.search-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.search-input:focus {
  background: rgba(var(--surface0-rgb), 0.2);
  padding: 0.9rem 1.3rem;
  border-radius: 1.4rem;
}

/* 搜索按钮容器 */
.search-button-wrapper {
  border-radius: 50%;
  padding: 0.3rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  width: fit-content;
  flex-shrink: 0;
}

.search-button-wrapper:hover {
  padding: 0.5rem;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.3);
}

/* 搜索按钮 */
.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border: none;
  border-radius: 50%;
  background: var(--accent);
  color: var(--base);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.search-button:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: scale(0.95);
}

.search-button:active:not(:disabled) {
  transform: scale(0.9);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.search-button-wrapper .search-button:disabled {
  pointer-events: none;
}

/* 下拉菜单动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.9);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-container {
    max-width: 100%;
    margin: 0 1rem 2.5rem 1rem;
  }
  
  .search-content {
    padding: 0.4rem;
    gap: 0.4rem;
  }
  
  .search-input {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }
  
  .search-input:focus {
    padding: 0.8rem 1.1rem;
  }
  
  .search-button {
    width: 2.5rem;
    height: 2.5rem;
  }

  .search-button-wrapper {
    padding: 0.25rem;
  }

  .search-button-wrapper:hover {
    padding: 0.4rem;
  }
  
  .engine-dropdown {
    min-width: 180px;
  }

  .engine-selector {
    padding: 0.6rem 0.8rem;
  }

  .engine-selector:hover {
    padding: 0.7rem 0.9rem;
  }
}

@media (max-width: 480px) {
  .search-container {
    margin: 0 0.5rem 2rem 0.5rem;
  }

  .search-content {
    gap: 0.3rem;
  }
  
  .search-input::placeholder {
    font-size: 0.85rem;
  }
  
  .engine-dropdown {
    min-width: 160px;
  }
  
  .engine-option {
    padding: 0.6rem 0.8rem;
  }

  .engine-option:hover {
    padding: 0.7rem 0.9rem;
  }
  
  .option-name {
    font-size: 0.85rem;
  }

  .search-button {
    width: 2.3rem;
    height: 2.3rem;
  }

  .search-button-wrapper {
    padding: 0.2rem;
  }

  .search-button-wrapper:hover {
    padding: 0.35rem;
  }
}
</style>
