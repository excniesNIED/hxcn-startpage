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
        <button 
          class="search-button"
          @click="handleSearch"
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
  margin: 0 auto 2rem auto;
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
}

/* 搜索引擎选择器 */
.engine-selector {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.7rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(var(--surface0-rgb), 0.3);
  position: relative;
}

.engine-selector:hover {
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
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(var(--surface1-rgb), 0.5);
}

.engine-option {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
}

.engine-option:hover {
  background: rgba(var(--surface1-rgb), 0.3);
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
  padding: 0.7rem 1rem;
  font-size: 1rem;
  color: var(--text);
  border-radius: 1rem;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.search-input:focus {
  background: rgba(var(--surface0-rgb), 0.2);
}

/* 搜索按钮 */
.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: var(--accent);
  color: var(--base);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.search-button:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
}

.search-button:active:not(:disabled) {
  transform: translateY(0);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 下拉菜单动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
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
    margin: 0 1rem 1.5rem 1rem;
  }
  
  .search-content {
    padding: 0.4rem;
    gap: 0.4rem;
  }
  
  .search-input {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .search-button {
    width: 2.2rem;
    height: 2.2rem;
  }
  
  .engine-dropdown {
    min-width: 180px;
  }
}

@media (max-width: 480px) {
  .search-container {
    margin: 0 0.5rem 1rem 0.5rem;
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
  
  .option-name {
    font-size: 0.85rem;
  }
}
</style>
