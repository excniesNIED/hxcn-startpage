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
    this.currentTab = 0;
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
        /* 减慢动画速率，增强弹性 */
        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.5);
        border-radius: 16px;
      }

      .liquidGlass-effect {
        position: absolute;
        z-index: 0;
        inset: 0;
        /* 恢复参考值 */
        backdrop-filter: blur(3px);
        filter: url(#glass-distortion);
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
        /* 将背景色调从白色改为黑色 */
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
        filter: url(#glass-distortion) contrast(1.2) saturate(1.1) brightness(1.05) !important;
        isolation: isolate;
        transform-style: preserve-3d;
        perspective: 1000px;
      }

      #panels::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        /* 将渐变背景从白色系改为黑色系 */
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%);
        border-radius: 26px;
        z-index: -1;
        pointer-events: none;
        filter: url(#glass-distortion);
        opacity: 0.6;
      }

      #panels:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25), 0 0 25px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.12);
        filter: url(#glass-distortion) contrast(1.2) saturate(1.1) brightness(1.05) !important;
      }

      #panels:hover::before {
        /* 将渐变背景从白色系改为黑色系 */
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.15) 100%);
        opacity: 0.8;
      }

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

      /* 恢复主卡片回弹动画，并改为从左到右的效果 */
      @keyframes panelBounce {
        0%, 100% {
          transform: translateX(0);
        }
        40% {
          transform: translateX(-15px); /* 被内容向左推动 */
        }
        70% {
          transform: translateX(8px);  /* 向右回弹 */
        }
        90% {
          transform: translateX(-4px); /* 稳定下来 */
        }
      }

      #panels.bounce {
        animation: panelBounce 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
        /* 将背景色调从白色改为黑色 */
        background: rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(3px);
        /* 修改动画属性以支持左右轮播 */
        transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.03);
        position: absolute;
        top: 0;
        left: 0; /* 使用 left 和 transform 代替 right */
        z-index: 0;
        opacity: 0;
        filter: url(#glass-distortion-medium);
        overflow: hidden;
        isolation: isolate;
        /* 默认将所有标签页移到右侧 */
        transform: translateX(100%);
      }

      .categories ul:nth-child(1) { --flavour: ${CONFIG.palette.green}; }
      .categories ul:nth-child(2) { --flavour: ${CONFIG.palette.peach}; }
      .categories ul:nth-child(3) { --flavour: ${CONFIG.palette.red}; }
      .categories ul:nth-child(4) { --flavour: ${CONFIG.palette.blue}; }
      .categories ul:nth-child(5) { --flavour: ${CONFIG.palette.mauve}; }

      .categories ul[active] {
        transform: translateX(0); /* 激活时移到视图中 */
        z-index: 1;
        opacity: 1;
        background: rgba(0, 0, 0, 0.08); /* 调整激活时的背景色 */
      }

      .categories ul::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /* 将渐变背景从白色系改为黑色系 */
        background: linear-gradient(135deg, 
          rgba(0, 0, 0, 0.03) 0%, 
          rgba(0, 0, 0, 0.01) 50%,
          rgba(0, 0, 0, 0.02) 100%);
        border-radius: 24px;
        pointer-events: none;
        z-index: 1;
      }

      .categories .links {
        right: 0;
        width: 75%;
        height: 100%;
        background: rgba(0, 0, 0, 0.03);
        /* 移除遮罩模糊 */
        backdrop-filter: none;
        padding: 6%;
        flex-wrap: wrap;
        border-radius: 0 24px 24px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.08);
        position: relative;
        box-shadow: inset -3px 0 var(--flavour), 0 20px 80px rgba(0, 0, 0, 0.6);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
        z-index: 2;
        mix-blend-mode: overlay;
        filter: url(#glass-distortion-light) contrast(1.2) saturate(1.1);
        /* 减慢动画速率，增强弹性 */
        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.5);
        animation: linksBreathing 8s ease-in-out infinite;
      }

      @keyframes linksBreathing {
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
      }

      .categories .links:hover {
        background: rgba(0, 0, 0, 0.12);
        transform: scale(1.05) translateY(-5px);
        box-shadow: inset -3px 0 var(--flavour), 0 35px 140px rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(100px);
        border-radius: 0 30px 30px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.15);
      }

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
        /* 移除遮罩模糊 */
        backdrop-filter: none;
        mix-blend-mode: screen;
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

      /* 滚动条样式 */
      .categories .links::-webkit-scrollbar {
        width: 8px;
      }

      .categories .links::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        backdrop-filter: blur(8px);
        border: 0.5px solid rgba(255, 255, 255, 0.1);
      }

      .categories .links::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 10px;
        backdrop-filter: blur(15px);
        border: 0.5px solid rgba(255, 255, 255, 0.2);
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
      }

      .categories .link-info {
        margin-bottom: 8px;
        border-radius: 25px;
        /* 减慢动画速率，增强弹性 */
        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.5);
        display: inline-flex;
        background: rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(20px);
        border: 0.5px solid rgba(255, 255, 255, 0.25);
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
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%);
        border-radius: 25px;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories .link-info:hover {
        transform: scale(1.12) translateY(-5px);
        background: rgba(0, 0, 0, 0.18);
        box-shadow: 
          0 15px 50px rgba(0, 0, 0, 0.4),
          0 0 30px rgba(255, 255, 255, 0.1),
          inset 0 1px 1px rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        border: 0.5px solid rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(25px);
        z-index: 100;
        position: relative;
      }

      .categories .link-info:hover::before {
        border-radius: 30px;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.06) 100%);
      }

      /* 简化的磁性效果 */
      .categories .link-info:hover ~ .link-info {
        transform: scale(0.97) translateY(1px);
        opacity: 0.8;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .categories .link-info:hover + .link-info {
        transform: scale(1.03) translateY(-1px) translateX(-3px);
        opacity: 0.9;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .categories .links-wrapper:has(.link-info:hover) {
        filter: brightness(1.05) contrast(1.02);
        transition: all 0.4s ease-out;
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
        /* 减慢动画速率，增强弹性 */
        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.5);
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

      .categories ul::after:active {
        transform: scale(0.88) translateY(1px);
        transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: rgba(255, 255, 255, 0.3);
        box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4);
      }

      .categories ul::after:not(:active) {
        animation: bounce-back 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes bounce-back {
        0% { transform: scale(0.88); }
        50% { transform: scale(1.12); }
        100% { transform: scale(1); }
      }

      /* Navigation Container */
      .navigation-container {
        display: flex;
        gap: 15px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 25px;
        z-index: 10;
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(25px);
        border: 0.5px solid rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        padding: 12px 20px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
        /* 恢复原始动画速率 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .navigation-container:hover {
        background: rgba(255, 255, 255, 0.18);
        transform: translateY(-2px);
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4);
      }

      .nav-item {
        padding: 12px 24px;
        /* 保持胶囊形状，边角不变 */
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.18);
        backdrop-filter: blur(20px);
        border: 0.5px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        /* 恢复原始动画速率 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        cursor: pointer;
        min-width: 80px;
        text-align: center;
        position: relative;
        overflow: hidden;
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

      .nav-item:not(.active):hover {
        /* 悬停时稍微亮一点 */
        background: rgba(255, 255, 255, 0.22);
      }

      .nav-item:hover {
        transform: scale(1.05) translateY(-2px);
        background: rgba(255, 255, 255, 0.22);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        /* 保持原有 border-radius 和 padding */
      }

      .nav-item.active {
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.2);
        transform: scale(1.02);
        border: 0.5px solid rgba(255, 255, 255, 0.4);
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
        pointer-events: none;
        font-family: 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .nav-item:hover .liquidGlass-text {
        transform: scale(0.95);
        color: rgba(0, 0, 0, 1);
        text-shadow: 0 2px 4px rgba(255, 255, 255, 0.7);
      }

      .nav-item.active .liquidGlass-text {
        color: rgba(0, 0, 0, 1);
        font-weight: 700;
        text-shadow: 0 2px 6px rgba(255, 255, 255, 0.8);
      }

      .ti {
        height: 20px;
        width: 20px;
      }

      .ti.animate-in {
        animation: fadeInAnimation ease .5s 1 forwards;
      }

      @keyframes fadeInAnimation {
        0% { 
          opacity: 0; 
          transform: translateY(15px) scale(1.4); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      }

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

      /* 为 link-info 创建新的入场动画 */
      @keyframes linkItemEnter {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .link-info.animate-in {
        opacity: 0; /* 动画开始前设为透明 */
        animation: linkItemEnter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }

      /* 按钮点击弹跳 */
      @keyframes clickBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.88); } /* 增大幅度 */
      }
      .links-wrapper .link-info.click-bounce,
      .navigation-container .nav-item.click-bounce {
        /* 减慢动画速率 */
        animation: clickBounce 0.4s cubic-bezier(0.34, 1.6, 0.64, 1);
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
    setTimeout(() => {
      // 本地获取 DOM 引用，避免 Proxy.set 触发错误
      const categoriesEl = this.shadowRoot.querySelector(".categories");
      const navItems = this.shadowRoot.querySelectorAll('.nav-item');
      const linksEl = this.shadowRoot.querySelector("#links");
      if (!categoriesEl || navItems.length === 0) {
        console.error('DOM elements not found, retrying...');
        setTimeout(() => this.setEvents(), 100);
        return;
      }

      console.log('🔧 Setting up navigation events...');
      // 注册导航点击及按下反馈
      navItems.forEach(item => {
        const index = Number(item.dataset.tab);
        item.addEventListener('click', e => {
          e.preventDefault();
          console.log(`🎯 Nav click: ${index}`);
          // 按钮 Q 弹
          item.classList.add('click-bounce');
          setTimeout(() => item.classList.remove('click-bounce'), 300);
          this.showCategory(index);
        });
        item.addEventListener('mousedown', e => {
          e.preventDefault();
          item.style.transform = 'scale(0.95)';
          setTimeout(() => item.style.transform = '', 150);
        });
      });

      // 添加 link-info 点击和按下反馈
      const linkInfos = this.shadowRoot.querySelectorAll('.link-info');
      linkInfos.forEach(info => {
        info.addEventListener('click', () => {
          info.classList.add('click-bounce');
          setTimeout(() => info.classList.remove('click-bounce'), 300);
        });
        info.addEventListener('mousedown', () => {
          info.style.transform = 'scale(0.95)';
          setTimeout(() => info.style.transform = '', 150);
        });
      });

      if (linksEl) {
        linksEl.addEventListener("wheel", (e) => {
          e.preventDefault();
          const delta = e.deltaY > 0 ? 1 : -1;
          this.switchTab(delta);
        });
      }

      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          this.switchTab(-1);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          this.switchTab(1);
        }
      });

      let startX = 0;
      let startY = 0;
      
      if (linksEl) {
        linksEl.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        });

        linksEl.addEventListener("touchend", (e) => {
          const endX = e.changedTouches[0].clientX;
          const endY = e.changedTouches[0].clientY;
          const deltaX = endX - startX;
          const deltaY = endY - startY;

          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
              this.switchTab(-1);
            } else {
              this.switchTab(1);
            }
          }
        });
      }

      this.currentTab = 0;
      setTimeout(() => {
        this.showCategory(0);
      }, 50);
    }, 50);
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
    
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    navItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    const categories = this.shadowRoot.querySelectorAll(".categories ul");
    
    categories.forEach((cat, i) => {
      const linkItems = cat.querySelectorAll('.link-info');

      if (i === index) {
        cat.setAttribute("active", "");
        cat.style.setProperty('transform', 'translateX(0)', 'important');
        cat.style.setProperty('z-index', '10', 'important');
        cat.style.setProperty('opacity', '1', 'important');
        cat.style.setProperty('visibility', 'visible', 'important');
        cat.style.setProperty('pointer-events', 'auto', 'important');
        
        const icons = cat.querySelectorAll('.ti');
        icons.forEach(icon => {
          icon.classList.remove('animate-in');
          void icon.offsetWidth; // Force reflow
          icon.classList.add('animate-in');
        });

        // 为 link-info 触发交错动画
        linkItems.forEach((item, idx) => {
          item.classList.remove('animate-in');
          void item.offsetWidth; // 强制重绘以确保动画重新播放
          item.style.animationDelay = `${idx * 50}ms`; // 设置交错延迟
          item.classList.add('animate-in');
        });

      } else {
        cat.removeAttribute("active");
        cat.style.setProperty('transform', 'translateX(100%)', 'important');
        cat.style.setProperty('z-index', '0', 'important');
        cat.style.setProperty('opacity', '0', 'important');
        cat.style.setProperty('visibility', 'hidden', 'important');
        cat.style.setProperty('pointer-events', 'none', 'important');

        // 重置非活动标签页的动画
        linkItems.forEach(item => {
          item.classList.remove('animate-in');
          item.style.animationDelay = '';
        });
      }
    });

    // 恢复主卡片切换时的回弹动画
    const panelsEl = this.shadowRoot.querySelector('#panels');
    panelsEl.classList.remove('bounce');
    void panelsEl.offsetWidth; // 强制重绘以确保动画可以重新触发
    panelsEl.classList.add('bounce');
    setTimeout(() => panelsEl.classList.remove('bounce'), 700); // 动画结束后移除类

    console.log(`🎯 Category switch completed: ${this.tabs[index].name} is now active`);
  }

  connectedCallback() {
    this.render().then(() => this.setEvents());
  }
}

customElements.define("tabs-list", Tabs);
