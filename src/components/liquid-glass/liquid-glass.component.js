class LiquidGlass extends Component {
  constructor() {
    super();
  }

  imports() {
    return [
      this.resources.icons.tabler,
      this.resources.fonts.roboto,
    ];
  }

  style() {
    return `      .liquid-glass-container {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        z-index: 200;
      }      .liquidGlass-wrapper {
        position: relative;
        display: flex;
        font-weight: 600;
        overflow: hidden;
        color: white;
        cursor: pointer;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .liquidGlass-wrapper:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
      }

      .liquidGlass-effect {
        position: absolute;
        z-index: 0;
        inset: 0;
        backdrop-filter: blur(3px);
        filter: url(#glass-distortion);
        overflow: hidden;
        isolation: isolate;
      }

      .liquidGlass-tint {
        z-index: 1;
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.25);
      }

      .liquidGlass-shine {
        position: absolute;
        inset: 0;
        z-index: 2;
        overflow: hidden;
        box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
          inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
      }

      .liquidGlass-text {
        z-index: 3;
        position: relative;
        color: white;
        font-weight: 600;
      }

      /* Menu Styles */
      .glass-menu {
        padding: 0.4rem;
        border-radius: 1.8rem;
      }

      .glass-menu:hover {
        padding: 0.6rem;
        border-radius: 1.8rem;
      }

      .glass-menu .liquidGlass-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .glass-menu .menu-item {
        font-size: 16px;
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 0.8rem;
        transition: all 0.2s ease-in;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.1);
        margin-bottom: 2px;
      }

      .glass-menu .menu-item:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.02);
        box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
      }

      .glass-menu .menu-item i {
        font-size: 18px;
      }

      /* Dock Styles */
      .glass-dock {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        border-radius: 2rem;
        padding: 0.8rem 1.2rem;
      }

      .glass-dock:hover {
        padding: 1rem 1.4rem;
        border-radius: 2.5rem;
      }

      .glass-dock .dock-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        text-decoration: none;
        color: white;
        font-size: 24px;
        position: relative;
        overflow: hidden;
      }

      .glass-dock .dock-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        transition: all 0.3s ease;
      }

      .glass-dock .dock-item:hover {
        transform: scale(1.2) translateY(-8px);
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      }

      .glass-dock .dock-item:hover::before {
        background: rgba(255, 255, 255, 0.2);
      }      /* Quick Actions Styles */
      .glass-quick-actions {
        position: fixed;
        top: 30px;
        right: 30px;
        display: flex;
        gap: 12px;
        z-index: 200;
      }

      .glass-action-btn {
        padding: 0.8rem 1.2rem;
        border-radius: 2rem;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .glass-action-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .glass-action-btn i {
        font-size: 16px;
      }      /* Floating Elements */
      .glass-floating {
        position: fixed;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 15px;
        z-index: 200;
      }

      .glass-floating-item {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        position: relative;
        overflow: hidden;
      }

      .glass-floating-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .glass-floating-item:hover {
        transform: scale(1.1);
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }

      .glass-floating-item:hover::before {
        opacity: 1;
      }      /* Animated particles */
      .glass-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
        overflow: hidden;
      }

      .glass-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
      }      @keyframes float {
        0%, 100% {
          transform: translateY(100vh) scale(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
          transform: scale(1);
        }
        90% {
          opacity: 1;
          transform: scale(1);
        }
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .liquid-glass-container {
          bottom: 20px;
          gap: 15px;
        }

        .glass-menu .menu-item {
          font-size: 14px;
          padding: 0.3rem 0.6rem;
        }

        .glass-dock {
          gap: 8px;
          padding: 0.6rem 1rem;
        }

        .glass-dock .dock-item {
          width: 40px;
          height: 40px;
          font-size: 20px;
        }

        .glass-quick-actions {
          top: 20px;
          right: 20px;
          gap: 8px;
        }

        .glass-action-btn {
          padding: 0.6rem 1rem;
          font-size: 12px;
        }

        .glass-floating {
          left: 15px;
          gap: 10px;
        }

        .glass-floating-item {
          width: 50px;
          height: 50px;
          font-size: 20px;
        }
      }

      @media (max-width: 480px) {
        .glass-floating {
          display: none;
        }

        .glass-quick-actions {
          flex-direction: column;
          align-items: flex-end;
        }
      }
    `;
  }
  createParticles() {
    const particles = document.querySelector('.glass-particles');
    if (!particles) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'glass-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
      particles.appendChild(particle);
    }
  }
  createCursor() {
    // Only create cursor on desktop
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'glass-cursor';
    document.body.appendChild(cursor);

    const trails = [];
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.className = 'glass-cursor-trail';
      document.body.appendChild(trail);
      trails.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      trails.forEach((trail, index) => {
        const delay = (index + 1) * 0.1;
        setTimeout(() => {
          trail.style.left = cursorX + 'px';
          trail.style.top = cursorY + 'px';
        }, delay * 100);
      });

      requestAnimationFrame(updateCursor);
    }
    updateCursor();
  }

  addInteractiveEffects() {
    // Add ripple effect to clickable elements
    const clickableElements = document.querySelectorAll('.liquidGlass-wrapper, .dock-item, .menu-item, .glass-action-btn');
    
    clickableElements.forEach(element => {
      element.classList.add('ripple-effect');
      
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    });

    // Add floating animation to main panels
    const panels = document.querySelectorAll('#panels');
    panels.forEach(panel => {
      panel.classList.add('floating-panel');
    });

    // Add tilt effect to dock items
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
      item.classList.add('tilt-card');
    });
  }

  template() {
    return `
      <div class="glass-particles"></div>
      
      <div class="glass-quick-actions">
        <a href="${CONFIG.fastlink}" class="glass-action-btn" target="_blank">
          <i class="ti ti-external-link"></i>
          主页
        </a>
        <a href="https://hxcn.cnies.org" class="glass-action-btn" target="_blank">
          <i class="ti ti-home"></i>
          HXCN
        </a>
      </div>

      <div class="glass-floating">
        <a href="https://github.com/excniesNIED" class="glass-floating-item" target="_blank">
          <i class="ti ti-brand-github"></i>
        </a>
        <a href="https://hs.cnies.org" class="glass-floating-item" target="_blank">
          <i class="ti ti-archive"></i>
        </a>
        <a href="https://enotes.cnies.org" class="glass-floating-item" target="_blank">
          <i class="ti ti-notebook"></i>
        </a>
      </div>

      <div class="liquid-glass-container">
        <div class="liquidGlass-wrapper glass-menu">
          <div class="liquidGlass-effect"></div>
          <div class="liquidGlass-tint"></div>
          <div class="liquidGlass-shine"></div>
          <div class="liquidGlass-text">
            <a href="https://hxcn.cnies.org" class="menu-item" target="_blank">
              <i class="ti ti-home"></i>
              主页
            </a>
            <a href="https://hs.cnies.org" class="menu-item" target="_blank">
              <i class="ti ti-archive"></i>
              博客
            </a>
            <a href="https://enotes.cnies.org" class="menu-item" target="_blank">
              <i class="ti ti-notebook"></i>
              笔记
            </a>
            <a href="https://bu.cnies.org" class="menu-item" target="_blank">
              <i class="ti ti-pencil-star"></i>
              BrushUp
            </a>
          </div>
        </div>

        <div class="liquidGlass-wrapper glass-dock">
          <div class="liquidGlass-effect"></div>
          <div class="liquidGlass-tint"></div>
          <div class="liquidGlass-shine"></div>
          <div class="liquidGlass-text">
            <a href="https://github.com/excniesNIED" class="dock-item" target="_blank">
              <i class="ti ti-brand-github"></i>
            </a>
            <a href="https://space.bilibili.com/3494377156511978" class="dock-item" target="_blank">
              <i class="ti ti-brand-bilibili"></i>
            </a>
            <a href="https://huggingface.co/excnies" class="dock-item" target="_blank">
              <i class="ti ti-mood-heart"></i>
            </a>
            <a href="mailto:hxcn@cnies.org" class="dock-item" target="_blank">
              <i class="ti ti-mail"></i>
            </a>
            <a href="https://qm.qq.com/cgi-bin/qm/qr?k=L_5nTaWr9hCupgFlntG9dJvVOYryFvv_" class="dock-item" target="_blank">
              <i class="ti ti-brand-qq"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }
  connectedCallback() {
    this.render();
    setTimeout(() => {
      this.createParticles();
      this.createCursor();
      this.addInteractiveEffects();
    }, 100);
  }
}

customElements.define("liquid-glass", LiquidGlass);
