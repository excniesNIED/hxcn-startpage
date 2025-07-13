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
          return `<ul class="profile-card ${name}" data-category-name="${name}" ${Category.getBackgroundStyle(background_url)} ${index === 0 ? 'active=""' : ''}>
<div class="effect"></div>
<div class="tint"></div>
<div class="shine"></div>
<div class="card-content">
            <div class="banner"></div>
            <div class="links-container">
              <div class="effect"></div>
              <div class="tint"></div>
              <div class="shine"></div>
              <div class="links">${Links.getAll(name, tabs)}</div>
            </div>
          </div>
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
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        border-radius: 16px;
      }

      .liquidGlass-wrapper:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 20px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.15);
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
        animation: panelBounce 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
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
        /* 简化过渡动画，移除可能导致冲突的filter过渡 */
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
                    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: linksBreathing 8s ease-in-out infinite;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.03);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0;
        overflow: hidden;
        isolation: isolate;
        /* 默认将所有标签页移到右侧 */
        transform: translateX(100%);
        /* 确保内容始终可见 */
        display: none;
        /* 添加硬件加速 */
        will-change: transform, opacity, filter;
      }/* 为分类大卡片添加Q弹悬停效果 */
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
      .categories ul:nth-child(5) { --flavour: ${CONFIG.palette.mauve}; }      .categories ul[active] {
        transform: translateX(0); /* 激活时移到视图中 */
        z-index: 1;
        opacity: 1;
        background: rgba(0, 0, 0, 0.08); /* 调整激活时的背景色 */
        display: block; /* 确保激活的分类页面显示 */
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
        z-index: 3; /* Ensure links are on top of the container's effect */
        mix-blend-mode: overlay;
        filter: url(#glass-distortion-light) contrast(1.2) saturate(1.1);        /* 简化过渡动画，移除可能导致冲突的filter过渡 */
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
                    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: linksBreathing 8s ease-in-out infinite;
      }

      /* links区域的简化效果 */
      .categories ul:not([active]) .links {
        opacity: 0.8;
        transform: scale(0.98);
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
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }.categories .links:hover::before {
        border-radius: 0 32px 32px 0;
        background: linear-gradient(135deg, 
          rgba(0, 0, 0, 0.06) 0%, 
          rgba(0, 0, 0, 0.03) 50%,
          rgba(0, 0, 0, 0.05) 100%);
        backdrop-filter: blur(28px);
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
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
        opacity: 0.9;
      }

      .categories .links-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }      .categories .link-info {
        margin-bottom: 8px;
        border-radius: 25px;
        /* 使用aerolab的缓动曲线 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        display: inline-flex;
        /* 恢复原来的深色背景 */
        background: rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(20px);
        border: 0.5px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
        /* 为所有按钮添加transform-origin，让变换更自然 */
        transform-origin: center center;
        /* 添加will-change来优化性能 */
        will-change: transform, opacity, filter;
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
        /* 使用aerolab的缓动曲线 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      /* Aerolab风格的Q弹动效 - 参考reference/3右下角按钮 */
      .categories .link-info:hover {
        /* Q弹动画：按钮整体放大，使用aerolab的缓动曲线 */
        transform: scale(1.15) translateY(-5px);
        border-radius: 35px; /* 增加圆角模拟aerolab效果 */
        /* 恢复原来的深色悬停背景 */
        background: rgba(0, 0, 0, 0.18);
        backdrop-filter: blur(25px);
        /* 移除所有白色阴影，只保留黑色阴影 */
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
        border: 0.5px solid rgba(255, 255, 255, 0.3);
        z-index: 100;
        position: relative;
        /* 使用aerolab的缓动曲线 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
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

      /* Aerolab风格：悬停时内部元素反向缩放 */
      .categories .link-info:hover .link-icon {
        transform: scale(0.88);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories .link-info:hover .link-name {
        transform: scale(0.88);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* 磁性效果：相邻按钮内部元素的微妙响应 */
      .categories .link-info:hover + .link-info .link-icon,
      .categories .link-info:hover + .link-info .link-name {
        transform: scale(0.95) translateX(2px);
        opacity: 0.9;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories .link-info:hover ~ .link-info .link-icon,
      .categories .link-info:hover ~ .link-info .link-name {
        transform: scale(0.92) translateX(1px);
        opacity: 0.8;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* 前置按钮的内部元素响应 */
      .categories .link-info:has(+ .link-info:hover) .link-icon,
      .categories .link-info:has(+ .link-info:hover) .link-name {
        transform: scale(0.96) translateX(-1px);
        opacity: 0.92;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      .categories .link-info:hover::before {
        border-radius: 35px;
        /* 完全移除白色渐变，使用深色渐变以避免诡异的白色效果 */
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 100%);
        /* 使用aerolab的缓动曲线 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      /* 增强版"牵一发而动全身"磁性效果 - 模拟物理引力 */
      
      /* 直接相邻的按钮 - 最强的"引力"效果 */
      .categories .link-info:hover + .link-info {
        transform: scale(0.97) translateY(-2px) translateX(8px) rotate(1deg);
        opacity: 0.82;
        background: rgba(0, 0, 0, 0.12) !important;
        backdrop-filter: blur(20px) !important;
        border: 0.5px solid rgba(255, 255, 255, 0.18) !important;
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3) !important;
        filter: brightness(0.95) contrast(1.02);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        /* 使用更物理化的缓动曲线 */
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        /* 为相邻按钮添加延迟，模拟物理传播 */
        transition-delay: 0.02s;
      }

      /* 前一个相邻按钮 - 反向引力 */
      .categories .link-info:has(+ .link-info:hover) {
        transform: scale(0.98) translateY(-1px) translateX(-4px) rotate(-0.5deg);
        opacity: 0.85;
        background: rgba(0, 0, 0, 0.1) !important;
        backdrop-filter: blur(18px) !important;
        border: 0.5px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
        filter: brightness(0.96);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        /* 使用更物理化的缓动曲线 */
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        /* 反向传播延迟 */
        transition-delay: 0.01s;
      }

      /* 后续所有按钮 - 递减的波纹效果 */
      .categories .link-info:hover ~ .link-info {
        transform: scale(0.94) translateY(3px) translateX(4px) rotate(0.5deg);
        opacity: 0.65;
        background: rgba(0, 0, 0, 0.06) !important;
        backdrop-filter: blur(12px) !important;
        border: 0.5px solid rgba(255, 255, 255, 0.08) !important;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15) !important;
        filter: brightness(0.9) saturate(0.95);
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        /* 使用更物理化的缓动曲线 */
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      /* 第二个后续按钮 - 中等影响 */
      .categories .link-info:hover + .link-info + .link-info {
        transform: scale(0.96) translateY(1px) translateX(6px) rotate(0.8deg);
        opacity: 0.75;
        background: rgba(0, 0, 0, 0.08) !important;
        backdrop-filter: blur(15px) !important;
        border: 0.5px solid rgba(255, 255, 255, 0.12) !important;
        box-shadow: 0 3px 18px rgba(0, 0, 0, 0.2) !important;
        filter: brightness(0.93) contrast(1.01);
        transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        /* 使用更物理化的缓动曲线 */
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        /* 为相邻按钮添加延迟，模拟物理传播 */
        transition-delay: 0.04s;
      }

      /* 第三个后续按钮 - 轻微影响 */
      .categories .link-info:hover + .link-info + .link-info + .link-info {
        transform: scale(0.98) translateY(0.5px) translateX(2px);
        opacity: 0.85;
        background: rgba(0, 0, 0, 0.04) !important;
        backdrop-filter: blur(10px) !important;
        border: 0.5px solid rgba(255, 255, 255, 0.06) !important;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1) !important;
        filter: brightness(0.97);
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        /* 使用更物理化的缓动曲线 */
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        /* 为相邻按钮添加延迟，模拟物理传播 */
        transition-delay: 0.06s;
      }

      /* 磁性恢复效果 - 当鼠标离开时 */
      .categories .link-info:not(:hover) {
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      }      /* 增强版整个links-wrapper容器的磁性响应效果 */
      .categories .links-wrapper:has(.link-info:hover) {
        /* 整体容器的物理响应 */
        filter: brightness(1.12) contrast(1.08) saturate(1.12);
        transform: scale(1.02) translateY(-3px) rotate(0.2deg);
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(8px);
        border-radius: 18px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* 容器内未悬停按钮的全局微调 */
      .categories .links-wrapper:has(.link-info:hover) .link-info:not(:hover) {
        filter: brightness(0.94) saturate(0.96);
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* 为整个分类卡片添加呼吸效果响应 */
      .categories ul:has(.link-info:hover) {
        transform: scale(1.005) translateY(-1px);
        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(8px);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      /* 为links区域添加整体磁性拉伸效果 */
      .categories .links:has(.link-info:hover) {
        transform: scale(1.01) translateY(-2px);
        background: rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(80px);
        border-radius: 0 28px 28px 0;
        border-left: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }      /* 磁性波纹效果 - 从悬停按钮向外扩散 */
      @keyframes magneticRipple {
        0% {
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
        }
        50% {
          box-shadow: 0 0 0 15px rgba(255, 255, 255, 0.05);
        }
        100% {
          box-shadow: 0 0 0 30px rgba(255, 255, 255, 0);
        }
      }

      /* 为悬停的按钮添加波纹动画 */
      .categories .link-info:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        pointer-events: none;
        animation: magneticRipple 1.5s ease-out infinite;
        z-index: -1;
      }

      /* 磁性光晕效果 */
      .categories .links-wrapper:has(.link-info:hover)::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        background: radial-gradient(
          circle at center,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 30%,
          transparent 70%
        );
        border-radius: 20px;
        pointer-events: none;
        opacity: 0;
        animation: glowPulse 2s ease-in-out infinite;
        z-index: -1;
      }

      @keyframes glowPulse {
        0%, 100% {
          opacity: 0;
          transform: scale(0.95);
        }
        50% {
          opacity: 1;
          transform: scale(1.02);
        }
      }

      /* 按钮间的"磁力线"效果 */
      .categories .link-info:hover + .link-info::before {
        box-shadow: -2px 0 8px rgba(255, 255, 255, 0.1);
      }

      .categories .link-info:has(+ .link-info:hover)::before {
        box-shadow: 2px 0 8px rgba(255, 255, 255, 0.1);
      }

      .categories .link-icon {
        font-size: 20px;
        /* 恢复原来的白色图标 */
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        /* 使用aerolab的缓动曲线 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories .link-name {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.95);
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
        font-family: 'SF Pro Display', 'SF Pro Text', 'San Francisco', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
        /* 使用aerolab的缓动曲线 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
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
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
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
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        filter: brightness(1.1) saturate(1.1);
      }

      .categories ul::after:active {
        transform: scale(0.88) translateY(1px);
        transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: rgba(255, 255, 255, 0.3);
        box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4);
      }

      .categories ul::after:not(:active) {
        animation: bounce-back 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
        animation: fadeInAnimation ease .4s 1 forwards;
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
        animation: linkItemEnter 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      }      /* 按钮点击弹跳 */
      @keyframes clickBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.88); } /* 增大幅度 */
      }

      /* 模糊过渡动画 */
      @keyframes blurOut {
        0% { 
          filter: blur(0px);
          opacity: 1;
        }
        100% { 
          filter: blur(20px);
          opacity: 0;
        }
      }

      @keyframes blurIn {
        0% { 
          filter: blur(20px);
          opacity: 0;
        }
        50% {
          filter: blur(10px);
          opacity: 0.5;
        }
        100% { 
          filter: blur(0px);
          opacity: 1;
        }
      }

      /* 平滑的页面切换动画 */
      .categories ul.blur-out {
        animation: blurOut 0.3s ease-out forwards;
      }

      .categories ul.blur-in {
        animation: blurIn 0.4s ease-in-out forwards;
      }.links-wrapper .link-info.click-bounce,
      .navigation-container .nav-item.click-bounce {
        /* 减慢动画速率 */
        animation: clickBounce 0.4s cubic-bezier(0.34, 1.6, 0.64, 1);
      }      /* 响应式设计：在小屏幕上隐藏分类名字并调整卡片宽度 */
      @media screen and (max-width: 768px) {
        .categories ul::after {
          display: none !important;
        }
        
        /* 在小屏幕上调整分类大卡片和links区域的宽度 */
        .categories ul {
          width: 100% !important;
        }
        
        .categories .links {
          width: 100% !重要;
          border-radius: 24px !important;
          border-left: none !important;
        }
        
        /* 调整主面板的最大宽度以适配手机屏幕 */
        #panels {
          width: 98% !important;
          max-width: 100% !important;
        }
      }
    `;
  }

  // 通用点击效果处理，使用CSS动画替代定时器
  addClickEffect(element) {
    element.addEventListener('click', () => {
      element.classList.add('click-bounce');
      // 使用animationend事件替代setTimeout
      element.addEventListener('animationend', () => {
        element.classList.remove('click-bounce');
      }, { once: true });
    });
    element.addEventListener('mousedown', () => {
      element.style.transform = 'scale(0.95)';
      // 使用transitionend事件替代setTimeout
      element.addEventListener('transitionend', () => {
        element.style.transform = '';
      }, { once: true });
    });
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
      }      // 初始化所有标签页的位置和动画
      const categories = this.shadowRoot.querySelectorAll('.categories ul');
      categories.forEach((cat, i) => {
        // 清理任何残留的状态
        cat.classList.remove('transitioning', 'blur-out', 'blur-in');
        cat.style.transition = '';
        cat.style.filter = '';
        
        if (i === 0) {
          cat.setAttribute('active', '');
          cat.style.transform = 'translateX(0)';
          cat.style.opacity = '1';
          cat.style.display = 'block';
          const icons = cat.querySelectorAll('.ti');
          icons.forEach(icon => icon.classList.add('animate-in'));
          const linkItems = cat.querySelectorAll('.link-info');
          linkItems.forEach((item, idx) => {
            item.style.animationDelay = `${idx * 50}ms`;
            item.classList.add('animate-in');
          });
        } else {
          cat.removeAttribute('active');
          cat.style.transform = 'translateX(100%)';
          cat.style.opacity = '0';
          cat.style.display = 'none';
        }
      });this.currentTab = 0;

      navItems.forEach(item => {
        const index = Number(item.dataset.tab);
        this.addClickEffect(item);
        item.addEventListener('click', e => {
          e.preventDefault();
          this.showCategory(index);
        });
      });

      const linkInfos = this.shadowRoot.querySelectorAll('.link-info');
      linkInfos.forEach(info => {
        this.addClickEffect(info);
      });

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
      return;
    }
    
    this.showCategory(newTab);
  }
  // 新增：处理待处理的切换请求
  processPendingSwitch() {
    if (this.pendingSwitch !== null && !this.isTransitioning) {
      const targetTab = this.pendingSwitch;
      this.pendingSwitch = null;
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
      this.clearTransitionTimeouts();
      
      // 彻底清理当前状态，恢复默认过渡
      const categories = this.shadowRoot.querySelectorAll(".categories ul");
      categories.forEach(cat => {
        cat.classList.remove('transitioning', 'blur-out', 'blur-in');
        cat.style.transition = '';
        cat.style.transform = '';
        cat.style.filter = '';
        cat.style.opacity = '';
      });
    }

    this.isTransitioning = true;
    const categories = this.shadowRoot.querySelectorAll(".categories ul");
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    const direction = newIndex > oldIndex ? 'right' : 'left';

    const currentSlide = categories[oldIndex];
    const nextSlide = categories[newIndex];

    // 确保清理状态
    categories.forEach(cat => {
      cat.classList.remove('transitioning', 'blur-out', 'blur-in');
      cat.style.transition = '';
      cat.style.filter = '';
    });

    // 立即显示下一个分类以避免空白
    nextSlide.style.opacity = '1';
    nextSlide.style.display = 'block';
    nextSlide.setAttribute('active', '');

    // 准备下一个卡片的初始位置
    nextSlide.style.transition = 'none';
    nextSlide.style.filter = 'blur(20px)'; // 初始模糊
    if (direction === 'right') {
      nextSlide.style.transform = 'translateX(100%)';
    } else {
      nextSlide.style.transform = 'translateX(-100%)';
    }
    
    // 强制重排
    requestAnimationFrame(() => {
      // 开始过渡动画 - 包含模糊效果
      const transitionStyle = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease-out, filter 0.4s ease-in-out';
      currentSlide.style.transition = transitionStyle;
      nextSlide.style.transition = transitionStyle;

      // 添加模糊过渡效果
      currentSlide.style.filter = 'blur(20px)';
      
      // 移动卡片到目标位置
      if (direction === 'right') {
        currentSlide.style.transform = 'translateX(-100%)';
        currentSlide.style.opacity = '0';
      } else {
        currentSlide.style.transform = 'translateX(100%)';
        currentSlide.style.opacity = '0';
      }
      
      nextSlide.style.transform = 'translateX(0)';
      nextSlide.style.opacity = '1';

      // 延迟清除模糊效果，让新页面清晰显示
      setTimeout(() => {
        nextSlide.style.filter = 'blur(0px)';
      }, 150);

      // 更新导航状态
      navItems[oldIndex].classList.remove('active');
      navItems[newIndex].classList.add('active');
      currentSlide.removeAttribute('active');
      
      // 启动元素动画
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
    });

    this.currentTab = newIndex;

    // 过渡完成处理 - 稍微延长时间以配合模糊效果
    const transitionTimeout = setTimeout(() => {
      // 彻底清理所有状态，恢复默认CSS
      categories.forEach(cat => {
        cat.classList.remove('transitioning', 'blur-out', 'blur-in');
        cat.style.transition = '';
        cat.style.filter = '';
      });
      
      // 确保正确的激活状态
      categories.forEach((cat, index) => {
        if (index === newIndex) {
          cat.setAttribute('active', '');
          cat.style.transform = 'translateX(0)';
          cat.style.opacity = '1';
          cat.style.display = 'block';
          cat.style.filter = 'blur(0px)'; // 确保清晰
        } else {
          cat.removeAttribute('active');
          cat.style.transform = 'translateX(100%)';
          cat.style.opacity = '0';
          cat.style.display = 'none';
          cat.style.filter = '';
        }
      });
      
      this.isTransitioning = false;
      this.processPendingSwitch();
      this.clearTransitionTimeouts();
    }, 550); // 延长时间以配合模糊效果
    
    this.transitionTimeouts.push(transitionTimeout);
  }
  connectedCallback() {
    this.render().then(() => this.setEvents());
  }
  disconnectedCallback() {
    // 清理所有定时器，防止内存泄漏
    this.clearTransitionTimeouts();
    this.isTransitioning = false;
    this.pendingSwitch = null;
    
    // 清理所有CSS状态
    if (this.shadowRoot) {
      const categories = this.shadowRoot.querySelectorAll('.categories ul');
      categories.forEach(cat => {
        cat.classList.remove('transitioning', 'blur-out', 'blur-in');
        cat.style.transition = '';
        cat.style.transform = '';
        cat.style.filter = '';
        cat.style.opacity = '';
      });
    }
  }
}

customElements.define("tabs-list", Tabs);
