import toml from 'toml'
import { frappe, latte, macchiato, mocha } from '../theme/palette.js'
import configTomlText from '../config.toml?raw'

// 调色板映射
const paletteMap = {
  frappe,
  latte,
  macchiato,
  mocha
}

/**
 * 配置管理类
 */
class ConfigManager {  constructor() {
    this.config = null
    this.palette = null
    // 立即加载配置
    this.loadConfig()
  }  /**
   * 加载TOML配置文件
   */
  loadConfig() {
    try {
      // 直接使用导入的TOML文本
      this.config = toml.parse(configTomlText)
      
      // 设置调色板
      this.palette = paletteMap[this.config.theme?.palette] || frappe
      
      console.log('✅ TOML配置文件加载成功', this.config)
      return this.config
    } catch (error) {
      console.error('❌ Failed to load config:', error)
      // 返回默认配置
      this.config = this.getDefaultConfig()
      this.palette = frappe
      return this.config
    }
  }

  /**
   * 获取当前配置
   */
  getConfig() {
    return this.config
  }

  /**
   * 获取当前调色板
   */
  getPalette() {
    return this.palette
  }

  /**
   * 根据key获取标签页
   */
  getTabByKey(key) {
    if (!this.config) return null
    return this.config.tabs.find(tab => tab.key === key)
  }

  /**
   * 获取所有标签页用于导航
   */
  getNavigationTabs() {
    if (!this.config) return []
    return this.config.tabs.map(tab => ({
      name: tab.name,
      key: tab.key,
      icon: tab.icon,
      path: tab.key === 'hxcn' ? '/' : `/${tab.key}`
    }))
  }

  /**
   * 获取应用基础配置
   */
  getAppConfig() {
    return this.config?.app || {}
  }
  /**
   * 获取主题配置
   */
  getThemeConfig() {
    return this.config?.theme || {}
  }

  /**
   * 获取时钟配置
   */
  getClockConfig() {
    return this.config?.clock || {}
  }

  /**
   * 获取温度配置
   */
  getTemperatureConfig() {
    return this.config?.temperature || {}
  }

  /**
   * 默认配置（备用）
   */
  getDefaultConfig() {
    return {
      app: {
        title: "萑澈起始页",
        fastlink: "https://hxcn.cnies.org",
        enable_animations: true
      },
      theme: {
        palette: "frappe"
      },
      tabs: [
        {
          name: "萑澈",
          key: "hxcn",
          icon: "home",
          categories: []
        }
      ]
    }
  }
}

// 创建全局实例
const configManager = new ConfigManager()

export default configManager
export { ConfigManager } 
