# 萑澈起始页 - 项目架构说明

## 📋 项目概述

这是一个基于 Vue.js + Vite 的现代化个人起始页项目，采用液体玻璃效果设计，配置驱动的模块化架构。

## 🏗️ 项目结构

```
src/
├── main.js                 # 应用入口和路由配置
├── App.vue                 # 根组件，包含背景和SVG滤镜
├── components/             # 可复用组件
│   ├── BottomNavigation.vue # 底部导航栏组件
│   └── CategoryCard.vue    # 分类卡片组件
├── pages/                  # 页面组件
│   └── UnifiedPage.vue     # 统一页面组件（处理所有页面）
├── config/                 # 配置管理
│   ├── config.toml         # TOML配置文件
│   ├── configManager.js    # 配置管理器
│   └── palette.js          # Catppuccin调色板
├── utils/                  # 工具模块
│   └── iconManager.js      # 图标管理器
└── styles/                 # 样式文件
    └── main.css            # 全局样式和液体玻璃效果
```

## 🔧 核心特性

### 1. 统一页面架构
- **单一页面组件**: `UnifiedPage.vue` 处理所有页面路由
- **动态内容加载**: 根据路由自动加载对应的标签页配置
- **智能头部显示**: 首页显示时间，其他页面显示标题
- **快速链接**: 首页独有的快速访问功能

### 2. 配置驱动设计
- **TOML配置文件**: 使用 `config.toml` 集中管理所有配置
- **配置管理器**: `ConfigManager` 类负责解析和提供配置数据
- **调色板支持**: 支持 Catppuccin 的四种主题色彩

### 3. 模块化组件系统
- **图标管理器**: 统一管理 Tabler Icons 的映射关系
- **液体玻璃效果**: 可复用的CSS类和SVG滤镜
- **响应式设计**: 完整的移动端适配

## 📝 配置文件结构

### config.toml 主要部分：

```toml
[app]                    # 应用基础配置
[theme]                  # 主题配置
[temperature]            # 温度显示配置  
[clock]                  # 时钟显示配置
[[tabs]]                 # 标签页配置（数组）
  [[tabs.categories]]    # 分类配置
    [[tabs.categories.links]]  # 链接配置
```

## 🎨 样式系统

### 液体玻璃效果组件：
- `.liquidGlass-wrapper`: 容器类
- `.liquidGlass-effect`: 模糊背景效果
- `.liquidGlass-tint`: 颜色叠加层
- `.liquidGlass-shine`: 光泽效果
- `.liquidGlass-text`: 文本内容层

## 🚀 开发指南

### 添加新页面：
1. 在 `config.toml` 中添加新的 `[[tabs]]` 配置
2. 在 `main.js` 中添加路由规则
3. `UnifiedPage.vue` 会自动处理新页面

### 添加新图标：
1. 在 `iconManager.js` 中导入新的 Tabler Icons
2. 在 `iconMap` 中添加映射关系

### 修改样式主题：
1. 修改 `config.toml` 中的 `theme.palette` 值
2. 支持：latte, frappe, macchiato, mocha

## 🔄 数据流

```
config.toml → ConfigManager → UnifiedPage → Components
     ↓              ↓              ↓            ↓
  TOML解析    配置管理      页面渲染    组件渲染
```

## 📱 响应式设计

- **桌面端**: 多列网格布局，完整导航
- **平板端**: 双列布局，优化间距
- **移动端**: 单列布局，紧凑设计

## 🛠️ 依赖管理

### 核心依赖：
- `vue`: 3.x Vue.js 框架
- `vue-router`: 4.x 路由管理
- `@tabler/icons-vue`: 图标组件库
- `toml`: TOML解析器

### 开发依赖：
- `vite`: 构建工具
- 其他开发工具...

## 📋 维护说明

这个架构的优势：
- ✅ **配置驱动**: 新增页面只需修改配置文件
- ✅ **统一管理**: 单一页面组件处理所有路由
- ✅ **模块化**: 清晰的职责分离
- ✅ **易扩展**: 组件和配置解耦设计
- ✅ **易维护**: 减少重复代码，统一样式系统

这个设计使得项目具有高度的可维护性和扩展性。
