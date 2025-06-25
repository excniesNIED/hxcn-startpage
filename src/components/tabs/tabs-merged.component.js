class Links extends Component {
  constructor() {
    super();
  }

  static getIcon(link) {
    const defaultColor = CONFIG.palette.base;

    return link.icon
      ? `<i class="ti ti-${link.icon} link-icon"
            style="color: ${link.icon_color ?? defaultColor}"></i>`
      : "";
  }

  static getAll(tabName, tabs) {
    const { categories } = tabs.find((f) => f.name === tabName);

    return `
      ${categories
        .map(({ name, links }) => {
          return `
          <li>
            <h1>${name}</h1>
              <div class="links-wrapper">
              ${links
                .map(
                  (link) => `
                  <div class="link-info liquidGlass-wrapper">
                    <div class="liquidGlass-effect"></div>
                    <div class="liquidGlass-tint"></div>
                    <div class="liquidGlass-shine"></div>
                    <a href="${link.url}" target="_blank" class="liquidGlass-text">
                      ${Links.getIcon(link)}
                      ${link.name ? `<p class="link-name">${link.name}</p>` : ""}
                    </a>
                </div>`,
                )
                .join("")}
            </div>
          </li>`;
        })
        .join("")}
    `;
  }
}

class Category extends Component {
  constructor() {
    super();
  }

  static getBackgroundStyle(url) {
    return `style="background-image: url(${url}); background-repeat: no-repeat;background-size: contain;"`;
  }

  static getAll(tabs) {
    return `
      ${tabs
        .map(({ name, background_url }, index) => {
          return `<ul class="${name}" ${Category.getBackgroundStyle(background_url)} ${index === 0 ? 'active=""' : ''}>
            <div class="banner"></div>
            <div class="links">${Links.getAll(name, tabs)}</div>
          </ul>`;
        })
        .join("")}
    `;
  }
}

class Tabs extends Component {
  refs = {};

  constructor() {
    super();
    this.tabs = CONFIG.tabs;
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.icons.tabler,
      this.resources.fonts.roboto,
      this.resources.fonts.raleway,
      this.resources.libs.awoo,
    ];
  }

  style() {
    return `
      /* Reference风格的液体玻璃效果 */
      .liquidGlass-wrapper {
        position: relative;
        display: flex;
        font-weight: 600;
        overflow: hidden;
        color: black;
        cursor: pointer;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        border-radius: 16px;
      }

      .liquidGlass-effect {
        position: absolute;
        z-index: 0;
        inset: 0;
        backdrop-filter: blur(3px);
        filter: url(#glass-distortion-light);
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
      }

      .liquidGlass-shine {
        position: absolute;
        inset: 0;
        z-index: 2;
        overflow: hidden;
        box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
          inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
        border-radius: inherit;
      }

      .liquidGlass-text {
        z-index: 3;
        position: relative;
        color: black;
        padding: 12px 20px;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        background: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      /* Main Layout */
      #panels, #panels ul, #panels .links {
        position: absolute;
      }

      #links {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 30px;
      }

      #panels {
        border-radius: 24px;
        width: 95%;
        max-width: 1400px;
        height: 500px;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(3px);
        background: rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        /* 主卡片使用最强扭曲效果 */
        filter: url(#glass-distortion) contrast(1.1) saturate(1.05) brightness(1.02);
        isolation: isolate;
        /* 增强边缘扭曲的视觉效果 */
        transform-style: preserve-3d;
        /* 增强3D变换效果 */
        perspective: 1000px;
      }

      #panels::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%);
        border-radius: 26px;
        z-index: -1;
        pointer-events: none;
        /* 边缘也应用扭曲 */
        filter: url(#glass-distortion);
        opacity: 0.6;
      }      #panels:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25), 0 0 25px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(5px);
        background: rgba(255, 255, 255, 0.02);
        /* 确保悬停时保持白色调 */
        filter: url(#glass-distortion) contrast(1.1) saturate(1.05) brightness(1.05);
      }

      #panels:hover::before {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.15) 100%);
        opacity: 0.8;
      }

      /* 添加额外的玻璃光泽效果 */
      #panels::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.4),
          inset -1px -1px 1px 1px rgba(255, 255, 255, 0.2);
        border-radius: 24px;
        z-index: 2;
        pointer-events: none;
      }

      .categories {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 24px;
        z-index: 3;
      }

      .categories ul {
        --flavour: var(--accent);
        width: 100%;
        height: 100%;
        right: 100%;
        background: rgba(255, 255, 255, 0.005);
        backdrop-filter: blur(3px);
        transition: right 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.03);
        position: absolute;
        top: 0;
        z-index: 0;
        opacity: 0;
        /* 子卡片使用中等扭曲效果 */
        filter: url(#glass-distortion-medium);
        overflow: hidden;
        isolation: isolate;
      }

      .categories ul:nth-child(1) { --flavour: ${CONFIG.palette.green}; }
      .categories ul:nth-child(2) { --flavour: ${CONFIG.palette.peach}; }
      .categories ul:nth-child(3) { --flavour: ${CONFIG.palette.red}; }
      .categories ul:nth-child(4) { --flavour: ${CONFIG.palette.blue}; }
      .categories ul:nth-child(5) { --flavour: ${CONFIG.palette.mauve}; }

      .categories ul[active] {
        right: 0;
        z-index: 1;
        opacity: 1;
        background: rgba(255, 255, 255, 0.015);
        transform: scale(1.001);
      }

      .categories ul:first-child {
        right: 0;
        z-index: 1;
        opacity: 1;
      }

      /* 增强玻璃效果层 */
      .categories ul::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.03) 0%, 
          rgba(255, 255, 255, 0.01) 50%,
          rgba(255, 255, 255, 0.02) 100%);
        border-radius: 24px;
        pointer-events: none;
        z-index: 1;
      }

      .categories .links {
        right: 0;
        width: 75%;
        height: 100%;        background: rgba(0, 0, 0, 0.03);
        backdrop-filter: blur(60px);
        padding: 6%;
        flex-wrap: wrap;
        border-radius: 0 24px 24px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.08);
        position: relative;
        box-shadow: inset -3px 0 var(--flavour), 0 20px 80px rgba(0, 0, 0, 0.6);
        overflow-y: auto;
        /* 自定义滚动条样式 */
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
        z-index: 2;
        /* 混色模糊效果 - 参考导航栏风格 */
        mix-blend-mode: overlay;
        filter: url(#glass-distortion-light) contrast(1.2) saturate(1.1);
        /* 参考导航栏的动效 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);        /* 添加微妙的呼吸动画 */
        animation: linksBreathing 8s ease-in-out infinite;
      }      @keyframes linksBreathing {
        0%, 100% { 
          background: rgba(0, 0, 0, 0.03);
          box-shadow: inset -3px 0 var(--flavour), 0 20px 80px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(60px);
        }
        50% { 
          background: rgba(0, 0, 0, 0.05);
          box-shadow: inset -3px 0 var(--flavour), 0 25px 100px rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(65px);
        }
      }      .categories .links:hover {
        background: rgba(0, 0, 0, 0.12);
        transform: scale(1.05) translateY(-5px);
        box-shadow: inset -3px 0 var(--flavour), 0 35px 140px rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(100px);
        border-radius: 0 30px 30px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.15);
      }

      /* 增强.links区域的玻璃效果 - 参考导航栏 */
      .categories .links::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.1) 0%, 
          rgba(255, 255, 255, 0.05) 50%,
          rgba(255, 255, 255, 0.08) 100%);
        border-radius: 0 24px 24px 0;
        pointer-events: none;
        z-index: -1;
        backdrop-filter: blur(8px);
        mix-blend-mode: screen;        /* 为.links区域添加轻微扭曲 */
        filter: url(#glass-distortion-light);
      }

      .categories .links:hover::before {
        border-radius: 0 30px 30px 0;
        background: linear-gradient(135deg, 
          rgba(0, 0, 0, 0.08) 0%, 
          rgba(0, 0, 0, 0.04) 50%,
          rgba(0, 0, 0, 0.06) 100%);
        backdrop-filter: blur(25px);
      }

      /* 增强玻璃效果滚动条 */
      .categories .links::-webkit-scrollbar {
        width: 10px;
      }

      .categories .links::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .categories .links::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 12px;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        box-shadow: inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3),
          0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .categories .links::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.6);
        transform: scaleY(1.1);
        box-shadow: inset 1px 1px 1px 0 rgba(255, 255, 255, 0.5),
          0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .categories .links::-webkit-scrollbar-thumb:active {
        background: rgba(255, 255, 255, 0.8);
        transform: scaleY(0.9);
        box-shadow: inset 2px 2px 2px 0 rgba(255, 255, 255, 0.4),
          0 2px 8px rgba(0, 0, 0, 0.4);
      }

      .categories .links li {
        list-style: none;
        margin-bottom: 20px;
      }

      .categories .links li:not(:last-child) {
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
        padding: 0 0 .5em 0;
        margin-bottom: 1.5em;
      }

      .categories .links h1 {
        color: white;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 16px;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        letter-spacing: 1px;
        text-transform: uppercase;
        font-family: 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', 'Raleway', -apple-system, BlinkMacSystemFont, sans-serif;
        opacity: 0.9;
      }

      .categories .links-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }      .categories .link-info {
        margin-bottom: 8px;
        border-radius: 16px;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        display: inline-flex;
        /* 使用与底部导航栏相同的模糊参数但背景为白色 */
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
      }

      .categories .link-info::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        border-radius: 16px;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories .link-info:hover {
        transform: scale(1.12) translateY(-5px);
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.4);
      }

      .categories .link-info:hover::before {
        border-radius: 20px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
      }

      .categories .link-icon {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      .categories .link-name {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.95);
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
        font-family: 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .categories ul::after {
        content: attr(class);
        position: absolute;
        display: flex;
        text-transform: uppercase;
        overflow-wrap: break-word;
        width: 28px;
        height: 280px;
        padding: 1.2em;
        margin: auto;
        border-radius: 25px;
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
        left: calc(15% - 46px);
        bottom: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: white;
        letter-spacing: 2px;
        font: 700 28px 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
        text-align: center;
        flex-wrap: wrap;
        word-break: break-all;
        align-items: center;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        cursor: pointer;
        transform-origin: center center;
      }

      .categories ul::after:hover {
        transform: scale(1.08) translateY(-2px);
        padding: 1.5em;
        border-radius: 30px;
        background: rgba(255, 255, 255, 0.22);
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.4), 0 12px 40px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(15px);
        text-shadow: 0 6px 16px rgba(0, 0, 0, 0.8);
      }

      /* 增强Q弹动效 - aerolab风格 */
      .categories ul::after:active {
        transform: scale(0.88) translateY(1px);
        transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: rgba(255, 255, 255, 0.3);
        box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4);
      }

      /* 鼠标释放后的回弹效果 */
      .categories ul::after:not(:active) {
        animation: bounce-back 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes bounce-back {
        0% { transform: scale(0.88); }
        50% { transform: scale(1.12); }
        100% { transform: scale(1); }
      }

      /* Navigation Container (外部导航栏) */
      .navigation-container {
        display: flex;
        gap: 15px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 25px;
        z-index: 10;
        /* 添加胶囊背景 */
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        padding: 12px 20px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .navigation-container:hover {
        background: rgba(255, 255, 255, 0.18);
        transform: translateY(-2px);
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4);
      }

      .nav-item {
        padding: 12px 24px;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        cursor: pointer;
        min-width: 80px;
        text-align: center;
        position: relative;
        overflow: hidden;
        /* 导航按钮轻微扭曲 */
        filter: url(#glass-distortion-light);
      }

      .nav-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        border-radius: 25px;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .nav-item:hover {
        transform: scale(1.05) translateY(-2px);
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        padding: 15px 27px;
        border-radius: 30px;
      }

      .nav-item:hover::before {
        border-radius: 30px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
      }

      .nav-item:hover .liquidGlass-effect {
        border-radius: 30px;
      }

      .nav-item:hover .liquidGlass-tint {
        border-radius: 30px;
      }

      .nav-item:hover .liquidGlass-shine {
        border-radius: 30px;
      }

      .nav-item.active {
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.2);
        transform: scale(1.02);
        border: 1px solid rgba(255, 255, 255, 0.4);
      }

      .nav-item.active::before {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
      }

      .nav-item .liquidGlass-text {
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.9);
        text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
        padding: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        pointer-events: none; /* 防止子元素干扰点击事件 */
        font-family: 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .nav-item:hover .liquidGlass-text {
        transform: scale(0.95);
        color: rgba(0, 0, 0, 1);
        text-shadow: 0 2px 4px rgba(255, 255, 255, 0.7);
      }

      /* 激活状态的额外样式 */
      .nav-item.active .liquidGlass-text {
        color: rgba(0, 0, 0, 1);
        font-weight: 700;
        text-shadow: 0 2px 6px rgba(255, 255, 255, 0.8);
      }

      .ti {
        animation: fadeInAnimation ease .5s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        height: 20px;
        width: 20px;
      }

      @keyframes fadeInAnimation {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      /* Scroll indicator */
      .scroll-hint {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
    `;
  }

  template() {
    return `
      <div id="links">
        <div id="panels">
          <div class="categories">
            ${Category.getAll(this.tabs)}
          </div>
        </div>
        <!-- 导航栏移到大卡片外部 -->
        <div class="navigation-container">
          ${this.tabs.map((tab, index) => `
            <div class="nav-item liquidGlass-wrapper ${index === 0 ? 'active' : ''}" data-tab="${index}">
              <div class="liquidGlass-effect"></div>
              <div class="liquidGlass-tint"></div>
              <div class="liquidGlass-shine"></div>
              <div class="liquidGlass-text">${tab.name}</div>
            </div>
          `).join('')}
        </div>
        <div class="scroll-hint">滚动鼠标滚轮切换标签</div>
      </div>
    `;
  }

  setEvents() {
    // 延迟确保DOM完全渲染
    setTimeout(() => {
      this.refs.categories = this.shadowRoot.querySelector(".categories");
      this.refs.navItems = this.shadowRoot.querySelectorAll(".nav-item");
      this.refs.links = this.shadowRoot.querySelector("#links");

      if (!this.refs.categories || !this.refs.navItems.length) {
        console.error('DOM elements not found, retrying...');
        setTimeout(() => this.setEvents(), 100);
        return;
      }

      console.log('🔧 Setting up navigation events...');
      
      // 简化但可靠的导航事件设置
      this.refs.navItems.forEach((navItem, index) => {
        navItem.addEventListener('click', (e) => {
          console.log(`🎯 Navigation click: ${index}`);
          e.preventDefault();
          e.stopPropagation();
          this.showCategory(index);
        });
        
        navItem.addEventListener('mousedown', (e) => {
          e.preventDefault();
          navItem.style.transform = 'scale(0.95)';
          setTimeout(() => {
            navItem.style.transform = '';
          }, 150);
        });
      });

      // Scroll wheel events for tab switching
      if (this.refs.links) {
        this.refs.links.addEventListener("wheel", (e) => {
          e.preventDefault();
          const delta = e.deltaY > 0 ? 1 : -1;
          this.switchTab(delta);
        });
      }

      // Keyboard events
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          this.switchTab(-1);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          this.switchTab(1);
        }
      });

      // Touch/swipe events for mobile
      let startX = 0;
      let startY = 0;
      
      if (this.refs.links) {
        this.refs.links.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        });

        this.refs.links.addEventListener("touchend", (e) => {
          const endX = e.changedTouches[0].clientX;
          const endY = e.changedTouches[0].clientY;
          const deltaX = endX - startX;
          const deltaY = endY - startY;

          // Only handle horizontal swipes
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
              this.switchTab(-1); // Swipe right = previous tab
            } else {
              this.switchTab(1);  // Swipe left = next tab
            }
          }
        });
      }

      this.currentTab = 0;
      
      // 强制初始化显示第一个标签页
      setTimeout(() => {
        this.showCategory(0);
      }, 50);
    }, 200);
  }

  switchTab(direction) {
    const newTab = (this.currentTab + direction + this.tabs.length) % this.tabs.length;
    this.showCategory(newTab);
  }

  showCategory(index) {
    if (index < 0 || index >= this.tabs.length) {
      console.log('Invalid index:', index);
      return;
    }

    console.log(`🔄 Switching to category ${index}: ${this.tabs[index].name}`);
    this.currentTab = index;
    
    // Update active navigation item with clear visual feedback
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    navItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
        console.log(`✅ Nav item ${i} activated`);
      } else {
        item.classList.remove("active");
      }
    });

    // Force category switching with multiple methods
    const categories = this.shadowRoot.querySelectorAll(".categories ul");
    console.log(`Found ${categories.length} categories`);
    
    categories.forEach((cat, i) => {
      if (i === index) {
        // Show active category
        cat.setAttribute("active", "");
        cat.style.setProperty('right', '0', 'important');
        cat.style.setProperty('z-index', '10', 'important');
        cat.style.setProperty('opacity', '1', 'important');
        cat.style.setProperty('visibility', 'visible', 'important');
        cat.style.setProperty('pointer-events', 'auto', 'important');
        console.log(`✅ Category ${i} shown`);
      } else {
        // Hide inactive categories
        cat.removeAttribute("active");
        cat.style.setProperty('right', '100%', 'important');
        cat.style.setProperty('z-index', '0', 'important');
        cat.style.setProperty('opacity', '0', 'important');
        cat.style.setProperty('visibility', 'hidden', 'important');
        cat.style.setProperty('pointer-events', 'none', 'important');
      }
    });

    // Visual feedback animation
    const activeCategory = categories[index];
    if (activeCategory) {
      activeCategory.style.transform = 'scale(1.01)';
      setTimeout(() => {
        if (activeCategory) {
          activeCategory.style.transform = '';
        }
      }, 200);
    }
    
    console.log(`🎯 Category switch completed: ${this.tabs[index].name} is now active`);
  }

  connectedCallback() {
    this.render().then(() => this.setEvents());
  }
}

customElements.define("tabs-list", Tabs);
