import toml from 'toml'
import { reactive } from 'vue'
import searchConfigText from './search.toml?raw'

/**
 * 搜索引擎管理类
 */
class SearchManager {
  constructor() {
    this.state = reactive({
      engines: [],
      currentEngine: null
    })
    this.loadConfig()
  }

  /**
   * 加载搜索引擎配置
   */
  loadConfig() {
    try {
      const config = toml.parse(searchConfigText)
      this.state.engines = config.engines || []
      this.state.currentEngine = this.state.engines[0] || null
      console.log('✅ 搜索引擎配置加载成功', this.state.engines)
    } catch (error) {
      console.error('❌ 搜索引擎配置加载失败:', error)
      this.state.engines = this.getDefaultEngines()
      this.state.currentEngine = this.state.engines[0]
    }
  }

  /**
   * 获取所有搜索引擎
   */
  getEngines() {
    return this.state.engines
  }

  /**
   * 获取当前搜索引擎
   */
  getCurrentEngine() {
    return this.state.currentEngine
  }

  /**
   * 设置当前搜索引擎
   */
  setCurrentEngine(engineKey) {
    const engine = this.state.engines.find(e => e.key === engineKey)
    if (engine) {
      this.state.currentEngine = engine
      // 保存到 localStorage
      localStorage.setItem('preferred_search_engine', engineKey)
    }
  }

  /**
   * 从 localStorage 恢复首选搜索引擎
   */
  restorePreferredEngine() {
    const saved = localStorage.getItem('preferred_search_engine')
    if (saved) {
      this.setCurrentEngine(saved)
    }
  }

  /**
   * 检查是否为URL
   */
  isUrl(text) {
    try {
      new URL(text)
      return true
    } catch {
      // 检查简单的URL模式
      return /^(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i.test(text)
    }
  }

  /**
   * 执行搜索或跳转
   */
  search(query) {
    if (!query.trim()) return

    if (this.isUrl(query)) {
      // 如果是URL，直接跳转
      let url = query
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      window.open(url, '_blank')
    } else {
      // 使用当前搜索引擎搜索
      if (this.state.currentEngine) {
        const searchUrl = this.state.currentEngine.url.replace('%s', encodeURIComponent(query))
        window.open(searchUrl, '_blank')
      }
    }
  }

  /**
   * 默认搜索引擎配置
   */
  getDefaultEngines() {
    return [
      {
        name: "Bing",
        key: "bing",
        icon: "brand-bing",
        url: "https://www.bing.com/search?&q=%s"
      },
      {
        name: "Google",
        key: "google",
        icon: "brand-google",
        url: "https://www.google.com/search?q=%s&sourceid=chrome&ie=UTF-8"
      }
    ]
  }
}

// 创建全局实例
const searchManager = new SearchManager()

// 页面加载时恢复首选搜索引擎
document.addEventListener('DOMContentLoaded', () => {
  searchManager.restorePreferredEngine()
})

export default searchManager
export { SearchManager }
