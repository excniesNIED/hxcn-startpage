<h1 align="center">
  🌙 Churnie HXCN Homepage
</h1>

<p align="center">
  <strong>Personal macOS-inspired Homepage</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Theme-Catppuccin-f5c2e7?style=for-the-badge" alt="Theme">
  <img src="https://img.shields.io/badge/Tech-HTML+CSS+JS-blue?style=for-the-badge" alt="Tech Stack">
</p>

---

## ✨ Overview

A personal homepage with macOS-inspired design, built with the elegant [**Catppuccin**](https://catppuccin.com/palette) color palette. This project combines macOS design language with advanced liquid glass visual effects for an immersive navigation experience.

### 🎯 Features

- **🍎 macOS-inspired Design** - Clean and elegant visual experience inspired by macOS interface elements
- **🎨 Liquid Glass Effects** - Advanced SVG filters and CSS animations creating flowing glass textures
- **⚡ Smooth Animations** - Carefully tuned easing functions for silky smooth interactions
- **🌈 Multi-theme Support** - Supports Latte, Frappé, Macchiato, and Mocha color schemes
- **📱 Responsive Design** - Perfect adaptation for desktop and mobile devices
- **🔧 Modular Architecture** - Web Components architecture for easy extension and maintenance

### 🏗️ Tech Architecture

| Component | Technology | Description |
|-----------|------------|-------------|
| **🎬 Visual Effects** | CSS3 + SVG Filters | Liquid glass distortion effects, gaussian blur, lighting rendering |
| **⚡ Interactive Animations** | CSS Animations | Easing functions, keyframe animations, hardware acceleration |
| **🧩 Component System** | Web Components | Custom elements, Shadow DOM, lifecycle management |
| **🎨 Icon System** | Tabler Icons | 2000+ beautiful vector icons |
| **📐 Layout System** | CSS Grid + Flexbox | Responsive grid layout, flexible boxes |

### 📦 Modules

- **📌 Navigation Tabs** - Multi-page switching with keyboard and mouse support
- **🌡️ Weather Component** - Real-time weather display with configurable location
- **⏰ Clock Component** - Customizable time format display
- **🔗 Quick Navigation** - Categorized management, icon customization, one-click access to various services
- **🎭 Status Bar** - Page indicators and quick navigation

## 🚀 Quick Start

### 📋 Requirements

- Modern browser (supports ES6+ and Web Components)
- Local server (optional, for development)

### 🛠️ Installation & Configuration

1. **Clone the project**
   ```powershell
   git clone <repository-url>
   cd hxcn-startpage
   ```

2. **Configure personal settings**
   
   Edit the `userconfig.js` file:
   
   ```javascript
   // Choose theme palette: latte / frappe / macchiato / mocha
   const palette = latte;
   
   const default_config = {
     // Weather settings
     temperature: {
       location: "Your City",    // Set your city
       scale: "C",              // Temperature unit: C(Celsius) / F(Fahrenheit)
     },
     
     // Clock format
     clock: {
       format: "h:i:s - Y/b/m", // Custom time display format
     },
     
     // Navigation links
     tabs: [
       {
         name: "My Tab",
         categories: [
           {
             name: "Common Sites",
             links: [
               {
                 name: "Website Name",
                 url: "https://example.com",
                 icon: "home",           // Tabler icon name
                 icon_color: palette.blue,
               }
             ]
           }
         ]
       }
     ]
   };
   ```

3. **Deploy & Access**
   
   **Option 1: Direct access**
   ```powershell
   # Open index.html directly in browser
   start index.html
   ```
   
   **Option 2: Local server**
   ```powershell
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (requires http-server)
   npx http-server -p 8000
   
   # Then visit http://localhost:8000
   ```
   
   **Option 3: Deploy to server**
   - Upload all files to web server
   - Access via domain name or IP address

## ⚙️ Customization Guide

### 🎨 Theme Colors

The project supports four Catppuccin color schemes:

| Theme | Characteristics | Use Case |
|-------|----------------|----------|
| **Latte** ☀️ | Bright and gentle | Daytime use, eye-friendly |
| **Frappé** 🌅 | Warm transition | Evening hours, soft visuals |
| **Macchiato** 🌙 | Deep and elegant | Night work, focus mode |
| **Mocha** ⭐ | Deep and mysterious | Late night use, ultimate dark mode |

### 🔗 Adding Navigation Links

1. Find the `tabs` array in `userconfig.js`
2. Add new link objects:
   ```javascript
   {
     name: "Website Name",
     url: "https://example.com",
     icon: "icon-name",         // See https://tabler.io/icons
     icon_color: palette.color, // blue, green, red, yellow, etc.
   }
   ```

### 🎯 Icon Selection

Visit [Tabler Icons](https://tabler.io/icons) to choose appropriate icons:
- 🏠 `home` - Homepage sites
- 📧 `mail` - Email services  
- 🐙 `brand-github` - GitHub
- 📹 `brand-youtube` - YouTube
- 🎵 `music` - Music services
- 🛍️ `shopping-cart` - Shopping sites

## 🎥 Project Showcase

### 🌟 Visual Effects

- **Liquid Glass Effects** - Dynamic distortion filters creating flowing textures
- **Depth Blur** - Professional-grade transition effects during page switching
- **Elastic Animations** - Carefully tuned easing curves with bouncy feel
- **Light Rendering** - SVG lighting system enhancing 3D perception

### 🎮 Interactive Experience

- **Mouse Hover** - Element scaling, shadow changes, magnetic effects
- **Page Switching** - Left-right sliding with keyboard arrow key support
- **Click Feedback** - Bounce animations with visual confirmation
- **Smooth Scrolling** - Custom scrollbars with fluid experience

## 🔧 Development Info

### 📁 Project Structure

```
hxcn-startpage/
├── index.html              # Main page file
├── userconfig.js           # User configuration file
├── src/
│   ├── common/            # Common modules
│   │   ├── component.js   # Component base class
│   │   ├── config.js      # Configuration management
│   │   ├── palette.js     # Color themes
│   │   └── utils.js       # Utility functions
│   ├── components/        # Feature components
│   │   ├── clock/         # Clock component
│   │   ├── weather/       # Weather component
│   │   ├── tabs/          # Tab component
│   │   └── statusbar/     # Status bar component
│   ├── css/              # Style files
│   │   ├── style.css     # Main styles
│   │   └── tabler-icons.min.css # Icon fonts
│   └── img/              # Image resources
└── README.md              # Project documentation
```

### 🛠️ Tech Stack Details

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | - | Semantic structure, custom elements |
| **CSS3** | - | Modern styling, animation effects |
| **JavaScript** | ES6+ | Component logic, event handling |
| **Web Components** | - | Modular architecture |
| **SVG Filters** | - | Advanced visual effects |

### ⚡ Performance Optimizations

- **Hardware Acceleration** - Key animations use `transform` and `opacity`
- **Debounce & Throttle** - Optimized scroll and resize events
- **Lazy Loading** - Icon fonts loaded on demand
- **Code Splitting** - Components loaded independently

## 🤝 Contributing

### 🐛 Bug Reports

If you find bugs or have improvement suggestions:

1. Check existing [Issues](../../issues)
2. Create a new Issue with detailed problem description
3. Provide reproduction steps and environment information

### 💡 Feature Proposals

Welcome to propose new feature ideas:

1. Mark as `enhancement` in Issues
2. Describe feature requirements and use cases in detail
3. Provide design ideas if possible

### 🔧 Code Contributions

1. **Fork** this project
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Create **Pull Request**

### 📝 Development Guidelines

- **Code Style**: Use 2-space indentation, follow JavaScript Standard Style
- **Commit Messages**: Use conventional commit format `type: description`
- **Component Development**: Inherit from `Component` base class, implement necessary lifecycle methods
- **Style Writing**: Use BEM naming convention, avoid global style pollution

## 📄 License

This project is released under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Catppuccin](https://catppuccin.com/) - Elegant color schemes
- [Tabler Icons](https://tabler.io/icons) - Beautiful icon library
- [Catppuccin Startpage](https://github.com/pivoshenko/catppuccin-startpage) - Project foundation and design inspiration

---

<p align="center">
  <strong>🌟 If this project helps you, please give us a Star!</strong>
</p>

<p align="center">
  Made with ❤️ by Churnie HXCN
</p>
