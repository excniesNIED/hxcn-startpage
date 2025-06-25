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
          return `<ul class="${name}" data-category-name="${name}" ${Category.getBackgroundStyle(background_url)} ${index === 0 ? 'active=""' : ''}>
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
    this.isTransitioning = false; // 添加过渡状态标记
    this.pendingSwitch = null; // 添加待处理的切换请求
    this.transitionTimeouts = []; // 存储过渡定时器，用于清理
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
      }      .categories ul {
        --flavour: var(--accent);
        width: 100%;
        height: 100%;
        /* 将背景色调从白色改为黑色 */
        background: rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(3px);
        /* 修改动画属性以支持左右轮播和Q弹效果，添加filter过渡 */
        transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), 
                    opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1),
                    scale 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2),
                    filter 0.7s cubic-bezier(0.25, 1, 0.5, 1);
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
      }      /* 动态模糊效果类 */
      .categories ul.blur-out {
        filter: url(#glass-distortion-medium) blur(12px) brightness(0.7) saturate(0.8);
        opacity: 0.5;
        transform: scale(0.92);
      }

      .categories ul.blur-in {
        filter: url(#glass-distortion-medium) blur(6px) brightness(0.85) saturate(0.9);
        opacity: 0.75;
        transform: scale(0.96);
      }

      .categories ul.blur-clear {
        filter: url(#glass-distortion-medium) blur(0px) brightness(1) saturate(1);
        opacity: 1;
        transform: scale(1);
      }

      /* 增强的过渡效果 */
      .categories ul.transitioning {
        transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), 
                    opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
                    filter 0.8s cubic-bezier(0.23, 1, 0.32, 1),
                    scale 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      }

      /* 为分类大卡片添加Q弹悬停效果 */
      .categories ul:hover {
        scale: 1.02;
        backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: scale 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2),
                    backdrop-filter 0.32s ease,
                    background 0.32s ease,
                    border 0.32s ease;
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
      }      /* 为分类大卡片悬停时的内部links区域添加反向缩放效果 */
      .categories ul:hover .links {
        transform: scale(0.98);
        transition: transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* 为分类大卡片悬停时的内部link-info添加轻微反向缩放 */
      .categories ul:hover .link-info {
        transform: scale(0.99);
        transition: transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      .categories .links {
        right: 0;
        width: 75%;
        height: 100%;
        /* 设置固定的黑色模糊背景，悬停时不变 */
        background: rgba(0, 0, 0, 0.03);
        backdrop-filter: blur(60px);
        padding: 6%;
        flex-wrap: wrap;
        border-radius: 0 24px 24px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.08);
        position: relative;
        box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
        overflow-y: auto;
        /* 隐藏滚动条 */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        z-index: 2;
        mix-blend-mode: overlay;
        filter: url(#glass-distortion-light) contrast(1.2) saturate(1.1);
        /* 添加丝滑的悬停过渡动画和模糊过渡 */
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    filter 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        animation: linksBreathing 8s ease-in-out infinite;
      }

      /* links区域的模糊效果 */
      .categories ul.blur-out .links {
        filter: url(#glass-distortion-light) contrast(1.2) saturate(1.1) blur(6px);
        opacity: 0.7;
        transform: scale(0.98);
      }

      .categories ul.blur-in .links {
        filter: url(#glass-distortion-light) contrast(1.2) saturate(1.1) blur(3px);
        opacity: 0.85;
        transform: scale(0.99);
      }

      .categories ul.blur-clear .links {
        filter: url(#glass-distortion-light) contrast(1.2) saturate(1.1) blur(0px);
        opacity: 1;
        transform: scale(1);
      }@keyframes linksBreathing {
        0%, 100% { 
          background: rgba(0, 0, 0, 0.03);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(60px);
        }
        50% { 
          background: rgba(0, 0, 0, 0.05);
          box-shadow: 0 25px 100px rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(65px);
        }
      }      .categories .links:hover {
        transform: scale(1.05) translateY(-5px);
        /* 保持与基础状态相同的背景和模糊，不发生变化 */
        background: rgba(0, 0, 0, 0.12);
        backdrop-filter: blur(100px);
        box-shadow: 0 35px 140px rgba(0, 0, 0, 0.9);
        border-radius: 0 30px 30px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.15);
      }      .categories .links::before {
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
        mix-blend-mode: screen;
        filter: url(#glass-distortion-light);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }.categories .links:hover::before {
        border-radius: 0 32px 32px 0;
        background: linear-gradient(135deg, 
          rgba(0, 0, 0, 0.06) 0%, 
          rgba(0, 0, 0, 0.03) 50%,
          rgba(0, 0, 0, 0.05) 100%);
        backdrop-filter: blur(28px);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform: scale(1.01);
      }

      /* 滚动条样式 - 隐藏滚动条 */
      .categories .links::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
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
        border-radius: 25px;
        /* 调整动画速率为0.8（0.4s * 0.8 = 0.32s） */
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        display: inline-flex;
        /* 恢复原来的深色背景 */
        background: rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(20px);
        border: 0.5px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
      }      /* 添加非激活状态的悬停效果 */
      .categories .link-info:not(.active):hover {
        background: rgba(0, 0, 0, 0.18);
      }

      .categories .link-info::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /* 恢复原来的浅色渐变背景 */
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
        border-radius: 25px;
        pointer-events: none;
        /* 调整动画速率为0.8 */
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      .categories .link-info:hover {
        /* Q弹动画：按钮整体放大 */
        transform: scale(1.12) translateY(-5px);
        /* 恢复原来的深色悬停背景 */
        background: rgba(0, 0, 0, 0.18);
        /* 移除所有白色阴影，只保留黑色阴影 */
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
        border-radius: 30px;
        border: 0.5px solid rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(25px);
        z-index: 100;
        position: relative;
        /* 动画速率0.8 */
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* Q弹动画：悬停时内部元素反向缩放 */
      .categories .link-info:hover .link-icon {
        transform: scale(0.95);
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories .link-info:hover .link-name {
        transform: scale(0.95);
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      .categories .link-info:hover::before {
        border-radius: 30px;
        /* 完全移除白色渐变，使用深色渐变以避免诡异的白色效果 */
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%);
        /* 动画速率0.8 */
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      /* 修复磁性效果，避免临近按钮出现诡异白色 - 重新设计 */
      .categories .link-info:hover ~ .link-info,
      .categories .link-info:hover + .link-info {
        /* 统一所有临近按钮的样式，去掉白色阴影 */
        background: rgba(0, 0, 0, 0.12) !important;
        backdrop-filter: blur(18px) !important;
        border: 0.5px solid rgba(255, 255, 255, 0.15) !important;
        /* 移除可能产生白色阴影的box-shadow */
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
        transform: scale(0.96) translateY(1px);
        opacity: 0.75;
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* 特殊处理直接相邻的按钮（hover的下一个） */
      .categories .link-info:hover + .link-info {
        transform: scale(1.02) translateY(-1px) translateX(-2px);
        opacity: 0.88;
        background: rgba(0, 0, 0, 0.08) !important;
        /* 确保没有白色阴影 */
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25) !important;
      }.categories .links-wrapper:has(.link-info:hover) {
        filter: brightness(1.08) contrast(1.03) saturate(1.05);
        transform: scale(1.005);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }.categories .link-icon {
        font-size: 20px;
        /* 恢复原来的白色图标 */
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        /* 为 Q 弹动画添加过渡效果 */
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories .link-name {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.95);
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
        font-family: 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
        /* 为 Q 弹动画添加过渡效果 */
        transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      .categories ul::after {
        content: attr(data-category-name);
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
        /* 减慢动画速率，增强弹性，并添加更多缓动曲线 */
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        cursor: pointer;
        transform-origin: center center;
        filter: saturate(1.05) brightness(1.02);
        /* 防止内容变化导致的布局重排 - 固定宽度和内容溢出处理 */
        min-width: 28px;
        max-width: 28px;
        overflow: hidden;
      }.categories ul::after:hover {
        transform: scale(1.05) translateY(-3px) rotate(0.5deg);
        padding: 1.4em;
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.20);
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35), 
                    0 16px 48px rgba(0, 0, 0, 0.4),
                    0 4px 16px rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(18px);
        text-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        filter: brightness(1.1) saturate(1.1);
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
      }      .nav-item {
        padding: 12px 24px;
        /* 保持胶囊形状，边角不变 */
        border-radius: 25px;
        /* 未选中时透明背景 */
        background: transparent;
        backdrop-filter: none;
        border: none;
        box-shadow: none;
        /* 添加平滑过渡效果 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        cursor: pointer;
        min-width: 80px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .nav-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /* 未选中时透明 */
        background: transparent;
        border-radius: 25px;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        opacity: 0;
        transform: scale(0.9);
      }

      .nav-item:not(.active):hover {
        /* 悬停时轻微的背景 */
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 0.5px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .nav-item:hover {
        transform: scale(1.05) translateY(-2px);
      }

      /* 激活状态的胶囊背景 */
      .nav-item.active {
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.2);
        transform: scale(1.02);
        border: 0.5px solid rgba(255, 255, 255, 0.4);
        filter: url(#glass-distortion-light);
      }

      .nav-item.active::before {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
        opacity: 1;
        transform: scale(1);
      }      .nav-item .liquidGlass-text {
        font-size: 14px;
        font-weight: 600;
        /* 未选中时使用浅色字体 */
        color: rgba(255, 255, 255, 0.7);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        padding: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        pointer-events: none;
        font-family: 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .nav-item:hover .liquidGlass-text {
        transform: scale(0.95);
        /* 悬停时稍微亮一些 */
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
      }      .nav-item.active .liquidGlass-text {
        /* 激活时使用深色字体，与背景形成对比 */
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
      const categoriesEl = this.shadowRoot.querySelector(".categories");
      const navItems = this.shadowRoot.querySelectorAll('.nav-item');
      const linksEl = this.shadowRoot.querySelector("#links");
      if (!categoriesEl || navItems.length === 0) {
        console.error('DOM elements not found, retrying...');
        setTimeout(() => this.setEvents(), 100);
        return;
      }

      // 初始化所有标签页的位置和动画
      const categories = this.shadowRoot.querySelectorAll('.categories ul');
      categories.forEach((cat, i) => {
        if (i === 0) {
          cat.setAttribute('active', '');
          cat.style.transform = 'translateX(0)';
          const icons = cat.querySelectorAll('.ti');
          icons.forEach(icon => icon.classList.add('animate-in'));
          const linkItems = cat.querySelectorAll('.link-info');
          linkItems.forEach((item, idx) => {
            item.style.animationDelay = `${idx * 50}ms`;
            item.classList.add('animate-in');
          });
        } else {
          cat.style.transform = 'translateX(100%)';
        }
      });
      this.currentTab = 0;

      console.log('🔧 Setting up navigation events...');
      navItems.forEach(item => {
        const index = Number(item.dataset.tab);
        item.addEventListener('click', e => {
          e.preventDefault();
          console.log(`🎯 Nav click: ${index}`);
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
    }, 50);
  }
  switchTab(direction) {
    const newTab = (this.currentTab + direction + this.tabs.length) % this.tabs.length;
    
    // 如果正在过渡中，存储待处理的请求
    if (this.isTransitioning) {
      this.pendingSwitch = newTab;
      console.log(`🔄 Queued switch to tab ${newTab} (currently transitioning)`);
      return;
    }
    
    this.showCategory(newTab);
  }

  // 新增：处理待处理的切换请求
  processPendingSwitch() {
    if (this.pendingSwitch !== null && !this.isTransitioning) {
      const targetTab = this.pendingSwitch;
      this.pendingSwitch = null;
      console.log(`🎯 Processing queued switch to tab ${targetTab}`);
      this.showCategory(targetTab);
    }
  }

  // 新增：清理所有过渡定时器
  clearTransitionTimeouts() {
    this.transitionTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.transitionTimeouts = [];
  }  showCategory(newIndex) {
    const oldIndex = this.currentTab;
    if (newIndex === oldIndex || newIndex < 0 || newIndex >= this.tabs.length) {
      return;
    }

    // 如果正在过渡，但新请求与当前目标不同，允许中断
    if (this.isTransitioning) {
      console.log(`🔄 Interrupting current transition to switch to ${newIndex}`);
      this.clearTransitionTimeouts();
      
      // 快速清理当前状态
      const categories = this.shadowRoot.querySelectorAll(".categories ul");
      categories.forEach(cat => {
        cat.classList.remove('transitioning', 'blur-out', 'blur-in', 'blur-clear');
      });
    }

    this.isTransitioning = true; // 设置过渡状态
    console.log(`🔄 Switching from ${oldIndex} to ${newIndex}`);
    const categories = this.shadowRoot.querySelectorAll(".categories ul");
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    const direction = newIndex > oldIndex ? 'right' : 'left';

    const currentSlide = categories[oldIndex];
    const nextSlide = categories[newIndex];

    // 阶段1: 立即开始当前卡片的模糊退出
    currentSlide.classList.add('transitioning', 'blur-out');
    
    // 准备下一个卡片的初始位置
    nextSlide.style.transition = 'none';
    if (direction === 'right') {
      nextSlide.style.transform = 'translateX(100%)';
    } else {
      nextSlide.style.transform = 'translateX(-100%)';
    }
    nextSlide.classList.add('transitioning', 'blur-in');
    nextSlide.offsetHeight; // 强制重排

    // 阶段2: 开始位置过渡
    const transitionStyle = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    currentSlide.style.transition = transitionStyle;
    nextSlide.style.transition = transitionStyle;

    // 移动卡片到目标位置
    if (direction === 'right') {
      currentSlide.style.transform = 'translateX(-100%)';
    } else {
      currentSlide.style.transform = 'translateX(100%)';
    }
    nextSlide.style.transform = 'translateX(0)';

    // 更新导航状态
    navItems[oldIndex].classList.remove('active');
    navItems[newIndex].classList.add('active');
    currentSlide.removeAttribute('active');
    nextSlide.setAttribute('active', '');

    // 阶段3: 渐进式清除模糊效果
    const timeout1 = setTimeout(() => {
      if (this.isTransitioning) { // 检查是否仍在当前过渡中
        nextSlide.classList.remove('blur-in');
        nextSlide.classList.add('blur-clear');
      }
    }, 300);
    this.transitionTimeouts.push(timeout1);

    const timeout2 = setTimeout(() => {
      if (this.isTransitioning) { // 检查是否仍在当前过渡中
        nextSlide.classList.remove('blur-clear');
      }
    }, 600);
    this.transitionTimeouts.push(timeout2);

    // 提前重置过渡状态（在50%完成时）
    const timeout3 = setTimeout(() => {
      this.isTransitioning = false; // 提前重置过渡状态
      this.processPendingSwitch(); // 处理待处理的切换
    }, 400);
    this.transitionTimeouts.push(timeout3);

    // 清理过渡类
    const timeout4 = setTimeout(() => {
      currentSlide.classList.remove('blur-out', 'transitioning');
      nextSlide.classList.remove('transitioning');
      this.clearTransitionTimeouts(); // 清理定时器数组
    }, 800);
    this.transitionTimeouts.push(timeout4);

    // 元素动画 - 延迟启动以配合模糊效果
    const timeout5 = setTimeout(() => {
      const icons = nextSlide.querySelectorAll('.ti');
      icons.forEach(icon => {
        icon.classList.remove('animate-in');
        void icon.offsetWidth;
        icon.classList.add('animate-in');
      });
      const linkItems = nextSlide.querySelectorAll('.link-info');
      linkItems.forEach((item, idx) => {
        item.classList.remove('animate-in');
        void item.offsetWidth;
        item.style.animationDelay = `${idx * 30}ms`;
        item.classList.add('animate-in');
      });
    }, 250);
    this.transitionTimeouts.push(timeout5);

    this.currentTab = newIndex;

    // 面板弹跳效果
    const panelsEl = this.shadowRoot.querySelector('#panels');
    panelsEl.classList.remove('bounce');
    void panelsEl.offsetWidth;
    panelsEl.classList.add('bounce');
    const timeout6 = setTimeout(() => panelsEl.classList.remove('bounce'), 800);
    this.transitionTimeouts.push(timeout6);

    console.log(`🎯 Category switch completed: ${this.tabs[newIndex].name} is now active`);
  }
  connectedCallback() {
    this.render().then(() => this.setEvents());
  }

  disconnectedCallback() {
    // 清理所有定时器，防止内存泄漏
    this.clearTransitionTimeouts();
    this.isTransitioning = false;
    this.pendingSwitch = null;
  }
}

customElements.define("tabs-list", Tabs);
