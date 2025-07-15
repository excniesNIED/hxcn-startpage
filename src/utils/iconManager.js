import * as TablerIcons from '@tabler/icons-vue'

/**
 * 图标管理类
 * 负责图标名称到组件的映射
 */
class IconManager {
  constructor() {
    // 图标名称映射表
    this.iconMap = {
      // 基础图标
      'home': 'IconHome',
      'server': 'IconServer',
      'users': 'IconUsers',
      'archive': 'IconArchive',
      'notebook': 'IconNotebook',
      'pencil-star': 'IconPencil',
      'link': 'IconLink',
      'mail': 'IconMail',
      'coffee': 'IconCoffee',
      'message': 'IconMessage',
      'question-mark': 'IconQuestionMark',
      'tool': 'IconTool',
      'mug': 'IconCoffee',
      'mountain': 'IconMountain',
      
      // 品牌图标
      'brand-github': 'IconBrandGithub',
      'brand-bilibili': 'IconMovie',
      'brand-qq': 'IconMessage',
      'brand-stackoverflow': 'IconStack2',
      'brand-linktree': 'IconTree',
      'brand-prisma': 'IconTriangleSquareCircle',
      'brand-redhat': 'IconBrandRedhat',
      'brand-uber': 'IconCar',
      'brand-netflix': 'IconDeviceTv',
      'brand-onedrive': 'IconCloud',
      'brand-bing': 'IconBrandBing',
      'brand-google': 'IconBrandGoogle',
      'brand-yandex': 'IconBrandYandex',
      
      // 开发相关
      'code-plus': 'IconCodePlus',
      'code-minus': 'IconCodeMinus',
      'brain': 'IconBrain',
      'circle-triangle': 'IconTriangle',
        // 其他
      'mood-heart': 'IconHeart',
      'heart-rate-monitor': 'IconActivity',
      'file-type-pdf': 'IconFileText',
      'tools': 'IconTools',
      'world': 'IconWorld',
      'rocket': 'IconRocket',
      'box': 'IconBox',
      
      // 搜索相关图标
      'search': 'IconSearch',
      'arrow-right': 'IconArrowRight',
      'chevron-down': 'IconChevronDown',
      
      // 默认图标
      'default': 'IconHelp'
    }
  }
  /**
   * 根据图标名称获取对应的Vue组件
   * @param {string} iconName - 图标名称
   * @returns {Object} Vue图标组件
   */
  getIcon(iconName) {
    const componentName = this.iconMap[iconName] || this.iconMap['default']
    return TablerIcons[componentName] || TablerIcons.IconHelp
  }

  /**
   * 获取所有可用的图标名称
   * @returns {string[]} 图标名称数组
   */
  getAvailableIcons() {
    return Object.keys(this.iconMap)
  }

  /**
   * 检查图标是否存在
   * @param {string} iconName - 图标名称
   * @returns {boolean} 是否存在
   */
  hasIcon(iconName) {
    return iconName in this.iconMap
  }

  /**
   * 添加新的图标映射
   * @param {string} iconName - 图标名称
   * @param {string} componentName - 组件名称
   */
  addIconMapping(iconName, componentName) {
    this.iconMap[iconName] = componentName
  }
}

// 创建全局实例
const iconManager = new IconManager()

export default iconManager
export { IconManager }
