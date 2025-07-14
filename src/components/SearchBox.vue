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
                
                <div class="liquidGlass-text">
                  <div 
                    v-for="engine in engines" 
                    :key="engine.key"
                    class="engine-option"
                    :class="{ 'active': engine.key === currentEngine.key }"
                    @click.stop="selectEngine(engine, $event)"
                    @mousedown.prevent
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
            </div>
          </transition>
        </div>

        <!-- 搜索输入框 -->
        <input 
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="search-input"
          :placeholder="`使用 ${currentEngine.name} 搜索或粘贴链接...`"
          @keydown.enter="handleSearch"
          @keydown.arrow-down="navigateSuggestions(1)"
          @keydown.arrow-up="navigateSuggestions(-1)"
          @keydown.escape="hideSuggestions"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- 搜索建议下拉列表 -->
        <transition name="suggestions">
          <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-dropdown">
            <div class="liquidGlass-wrapper suggestions-content">
              <div class="liquidGlass-effect"></div>
              <div class="liquidGlass-tint"></div>
              <div class="liquidGlass-shine"></div>
              
              <div class="liquidGlass-text">
                <div 
                  v-for="(suggestion, index) in suggestions" 
                  :key="index"
                  class="suggestion-option"
                  :class="{ 'active': index === selectedSuggestionIndex }"
                  @click.stop="selectSuggestion(suggestion)"
                  @mouseenter="selectedSuggestionIndex = index"
                  @mousedown.prevent
                >
                  <component 
                    :is="getIconComponent('search')" 
                    :size="16" 
                    class="suggestion-icon"
                  />
                  <span class="suggestion-text">{{ suggestion }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

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
import suggestionDict from '../config/suggestionDict.js'
import generatedSuggestions from '../config/suggestionGenerator.js'

export default {
  name: 'SearchBox',
  data() {
    return {
      searchQuery: '',
      showEngineDropdown: false,
      showSuggestions: false,
      suggestions: [],
      selectedSuggestionIndex: -1,
      suggestionDebounceTimer: null
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
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
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
        this.hideSuggestions()
        this.searchQuery = ''
      }
    },

    /**
     * 处理输入
     */
    handleInput() {
      this.selectedSuggestionIndex = -1
      
      if (this.searchQuery.trim().length > 0) {
        // 防抖处理
        clearTimeout(this.suggestionDebounceTimer)
        this.suggestionDebounceTimer = setTimeout(() => {
          this.fetchSuggestions()
        }, 300)
      } else {
        this.hideSuggestions()
      }
    },

    /**
     * 处理输入框聚焦
     */
    handleFocus() {
      if (this.searchQuery.trim().length > 0 && this.suggestions.length > 0) {
        this.showSuggestions = true
      }
    },

    /**
     * 处理输入框失焦
     */
    handleBlur() {
      // 延迟隐藏建议，给点击建议留时间
      setTimeout(() => {
        this.hideSuggestions()
      }, 150)
    },

    /**
     * 获取搜索建议
     */
    async fetchSuggestions() {
      const query = this.searchQuery.trim()
      if (!query) {
        this.hideSuggestions()
        return
      }

      // 获取本地搜索建议
      const suggestions = await this.getSuggestionsFromEngine(query)
      this.suggestions = suggestions
      this.showSuggestions = this.suggestions.length > 0
    },

    /**
     * 从搜索引擎获取建议
     */
    async getSuggestionsFromEngine(query) {
      // 直接使用本地建议，不再尝试从在线服务获取
      return this.getLocalSuggestions(query)
    },

    /**
     * 获取本地搜索建议
     */
    getLocalSuggestions(query) {
      if (!query || query.trim().length === 0) return []
      
      const lowerQuery = query.toLowerCase().trim()
      
      // 合并两个建议数据源
      const allSuggestions = [...suggestionDict, ...generatedSuggestions]
      
      // 根据查询过滤建议
      return allSuggestions
        .filter(item => {
          if (typeof item !== 'string') return false
          return item.toLowerCase().includes(lowerQuery)
        })
        .slice(0, 8) // 限制最多8条建议
    },

    /**
     * 导航搜索建议
     */
    navigateSuggestions(direction) {
      if (!this.showSuggestions || this.suggestions.length === 0) return

      this.selectedSuggestionIndex += direction

      if (this.selectedSuggestionIndex < -1) {
        this.selectedSuggestionIndex = this.suggestions.length - 1
      } else if (this.selectedSuggestionIndex >= this.suggestions.length) {
        this.selectedSuggestionIndex = -1
      }

      // 如果选中了建议，更新搜索框内容
      if (this.selectedSuggestionIndex >= 0) {
        this.searchQuery = this.suggestions[this.selectedSuggestionIndex]
      }
    },

    /**
     * 选择搜索建议
     */
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion
      this.hideSuggestions()
      this.$nextTick(() => {
        this.handleSearch()
      })
    },

    /**
     * 隐藏搜索建议
     */
    hideSuggestions() {
      this.showSuggestions = false
      this.selectedSuggestionIndex = -1
    },

    /**
     * 处理点击外部
     */
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showEngineDropdown = false
        this.hideSuggestions()
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
    if (this.suggestionDebounceTimer) {
      clearTimeout(this.suggestionDebounceTimer)
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
  min-width: fit-content;
  width: max-content;
  z-index: 1001;
}

.dropdown-content {
  border-radius: 1.8rem;
  overflow: hidden;
  border: 1px solid rgba(var(--surface1-rgb), 0.5);
  padding: 0.3rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  width: fit-content;
  min-width: fit-content;
  pointer-events: auto;
}

.dropdown-content:hover {
  padding: 0.5rem;
  border-radius: 1.8rem;
}

.engine-option {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
  position: relative;
  border-radius: 0.8rem;
  color: var(--text);
  font-size: 1rem;
  white-space: nowrap; /* 防止文本换行 */
}

.engine-option:hover {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
}

.engine-option.active {
  background: rgba(var(--accent-rgb), 0.6);
  color: var(--base);
  box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.2);
}

.option-icon {
  flex-shrink: 0;
}

.option-name {
  font-size: 0.9rem;
  font-weight: 500;
}

/* liquidGlass基础效果层 - 确保不阻止事件传播 */
.liquidGlass-effect,
.liquidGlass-tint,
.liquidGlass-shine {
  pointer-events: none;
}

.liquidGlass-text {
  z-index: 10;
  position: relative;
  pointer-events: auto;
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
  position: relative;
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

/* 搜索建议下拉菜单 */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  z-index: 1001;
}

.suggestions-content {
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(var(--surface1-rgb), 0.5);
  padding: 0.4rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  max-height: 300px;
  overflow-y: auto;
  pointer-events: auto;
}

.suggestions-content:hover {
  padding: 0.6rem;
  border-radius: 1.8rem;
}

.suggestion-option {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
  position: relative;
  border-radius: 1rem;
  color: var(--text);
}

.suggestion-option:hover,
.suggestion-option.active {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  border-radius: 1.2rem;
  padding: 0.8rem 1.1rem;
}

.suggestion-option.active {
  background: rgba(var(--accent-rgb), 0.6);
  color: var(--base);
  box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.2);
}

.suggestion-icon {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.suggestion-option.active .suggestion-icon {
  color: var(--base);
}

.suggestion-text {
  font-size: 0.9rem;
  font-weight: 500;
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

/* 搜索建议动画 */
.suggestions-enter-active,
.suggestions-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.suggestions-enter-from,
.suggestions-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.9);
}

.suggestions-enter-to,
.suggestions-leave-from {
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
    min-width: fit-content;
    width: max-content;
  }

  .engine-selector {
    padding: 0.6rem 0.8rem;
  }

  .engine-selector:hover {
    padding: 0.7rem 0.9rem;
  }

  .suggestions-content {
    max-height: 250px;
  }

  .suggestion-option {
    padding: 0.6rem 0.8rem;
  }

  .suggestion-option:hover,
  .suggestion-option.active {
    padding: 0.7rem 0.9rem;
  }

  .engine-option {
    padding: 0.35rem 0.5rem;
    font-size: 0.9rem;
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
    min-width: fit-content;
    width: max-content;
  }
  
  .engine-option {
    padding: 0.3rem 0.4rem;
    font-size: 0.85rem;
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

  .suggestions-content {
    max-height: 200px;
  }

  .suggestion-option {
    padding: 0.5rem 0.7rem;
  }

  .suggestion-option:hover,
  .suggestion-option.active {
    padding: 0.6rem 0.8rem;
  }

  .suggestion-text {
    font-size: 0.85rem;
  }
}
</style>
