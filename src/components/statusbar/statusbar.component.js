class Statusbar extends Component {
  externalRefs = {};

  refs = {
    categories: ".categories ul",
    tabs: "#tabs ul li:not(:last-child)", // 排除indicator元素
    indicator: ".indicator",
    fastlink: ".fastlink",
  };

  currentTabIndex = 0;

  constructor() {
    super();
    this.setDependencies();
  }

  setDependencies() {
    this.externalRefs = {
      categories: this.parentNode.querySelectorAll(this.refs.categories),
    };
  }

  imports() {
    return [this.resources.fonts.roboto, this.resources.icons.material, this.resources.libs.awoo];
  }

  style() {
    return `
      *:not(:defined) { display: none; }

      #tabs,
      #tabs .widgets,
      #tabs ul li:last-child {
          position: absolute;
      }

      #tabs {
          width: 100%;
          height: 100%;
      }

      #tabs ul {
          height: 100%;
          position: relative;
          list-style: none;
          margin-left: 1em;
          display: flex;
      }

      #tabs ul li:not(:last-child) {
          width: 80px;
          text-align: center;
          font: 700 13px 'Roboto', sans-serif;
          color: ${CONFIG.palette.text};
          padding: 6px 0;
          transition: all .1s;
          cursor: pointer;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
      }

      #tabs ul li:not(:last-child):hover {
          background: ${CONFIG.palette.surface0};
      }

      #tabs ul li:last-child {
          --flavour: var(--accent);
          width: 80px;
          height: 3px;
          background: var(--flavour);
          bottom: 0;
          transition: all .3s;
      }

      #tabs ul li[active]:not(:last-child) {
          color: ${CONFIG.palette.text};
          font-size: 13px;
          padding: 6px 0;
      }

      #tabs ul li[active]:nth-child(1) ~ li:last-child { margin: 0 0 0 0; }
      #tabs ul li[active]:nth-child(2) ~ li:last-child { margin: 0 0 0 80px; }
      #tabs ul li[active]:nth-child(3) ~ li:last-child { margin: 0 0 0 160px; }
      #tabs ul li[active]:nth-child(4) ~ li:last-child { margin: 0 0 0 240px; }
      #tabs ul li[active]:nth-child(5) ~ li:last-child { margin: 0 0 0 320px; }

      #tabs ul li[active]:nth-child(1) ~ li:last-child {
          --flavour: ${CONFIG.palette.green};
      }

      #tabs ul li[active]:nth-child(2) ~ li:last-child {
          --flavour: ${CONFIG.palette.peach};
      }

      #tabs ul li[active]:nth-child(3) ~ li:last-child {
          --flavour: ${CONFIG.palette.red};
      }

      #tabs ul li[active]:nth-child(4) ~ li:last-child {
          --flavour: ${CONFIG.palette.blue};
      }

      #tabs ul li[active]:nth-child(5) ~ li:last-child {
          --flavour: ${CONFIG.palette.mauve};
      }

      .widgets {
          right: 0;
          margin: auto;
          height: 32px;
          color: #fff;
          font-size: 12px;
      }

      .widgets:hover .edit {
          margin: 0;
      }

      .widget {
          position: relative;
          height: 100%;
          padding: 0 1em;
      }

      .widget:first-child {
          padding-left: 2em;
      }

      .widget:last-child {
          padding-right: 2em;
      }

      .widget:hover {
          cursor: pointer;
          background: rgba(255, 255, 255, .05);
      }

      #tabs > cols {
          position: relative;
          grid-template-columns: [chat-tab] 35px [tabs] auto [widgets] auto;
      }

      #tabs .time span {
          font-weight: 400;
      }

      #tabs i {
          font-size: 14pt !important;
      }

      .widget:not(:first-child)::before {
          content: '';
          position: absolute;
          display: block;
          left: 0;
          height: calc(100% - 15px);
          width: 1px;
          background: rgb(255 255 255 / 10%);
      }

      .fastlink {
          border: 0;
          background: ${CONFIG.palette.mantle};
          color: ${CONFIG.palette.green};
          cursor: pointer;
          border-radius: 5px 15px 15px 5px;
      }

      .fastlink:hover {
          filter: brightness(1.2);
      }

      .fastlink-icon {
        width: 70%;
      }
    `;
  }

  template() {
    return `
        <div id="tabs">
            <cols>
                <button class="+ fastlink">
                  <img class="fastlink-icon" src="src/img/favicon.png"/>
                </button>
                <ul class="- indicator"></ul>
                <div class="+ widgets col-end">
                    <current-time class="+ widget"></current-time>
                    <weather-forecast class="+ widget weather"></weather-forecast>
                </div>
            </cols>
        </div>`;
  }

  setEvents() {
    this.refs.tabs.forEach((tab) => (tab.onclick = ({ target }) => this.handleTabChange(target)));    document.onkeydown = (e) => this.handleKeyPress(e);

    this.refs.fastlink.onclick = () => {
      if (CONFIG.config.fastlink) {
        window.location.href = CONFIG.config.fastlink;
      }
    };

    if (CONFIG.openLastVisitedTab) {
      window.onbeforeunload = () => this.saveCurrentTab();
    }
  }

  saveCurrentTab() {
    localStorage.lastVisitedTab = this.currentTabIndex;
  }

  openLastVisitedTab() {
    if (!CONFIG.openLastVisitedTab) return;
    this.activateByKey(localStorage.lastVisitedTab);
  }

  handleTabChange(tab) {
    this.activateByKey(Number(tab.getAttribute("tab-index")));
  }

  handleWheelScroll(event) {
    if (!event) return;

    const { wheelDelta } = event;
    const tabsCount = CONFIG.config.tabs.length;

    let activeTab = Array.from(this.refs.tabs).findIndex(tab =>
      tab.hasAttribute("active")
    );

    if (wheelDelta > 0) {
      this.activateByKey((activeTab + 1) % tabsCount);
    } else {
      this.activateByKey(activeTab - 1 < 0 ? tabsCount - 1 : activeTab - 1);
    }
  }

  handleKeyPress(event) {
    if (!event) return;

    const { key } = event;
    const tabsCount = CONFIG.config.tabs.length;

    if (Number.isInteger(parseInt(key)) && key <= tabsCount) {
      this.activateByKey(key - 1);
    }
  }

  activateByKey(key) {
    if (key < 0 || key >= CONFIG.config.tabs.length) return;
    this.currentTabIndex = key;

    this.activate(this.refs.tabs, this.refs.tabs[key]);
    this.activate(this.externalRefs.categories, this.externalRefs.categories[key]);
  }

  createTabs() {
    const tabs = CONFIG.config.tabs;

    tabs.forEach((tab, index) => {
      const active = index === 0 ? "active" : "";
      this.refs.indicator.innerHTML += `
        <li tab-index="${index}" ${active}>${tab.name}</li>
      `;
    });

    // 添加indicator元素
    this.refs.indicator.innerHTML += "<li></li>";
  }

  activate(target, item) {
    target.forEach((i) => i.removeAttribute("active"));
    item.setAttribute("active", "");
  }

  connectedCallback() {
    this.render().then(() => {
      this.createTabs();
      this.setEvents();
      this.openLastVisitedTab();
    });
  }
}
