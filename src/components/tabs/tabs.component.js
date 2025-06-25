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
                  <div class="link-info">
                    <a href="${link.url}" target="_blank">
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
          return `<ul class="${name}" ${Category.getBackgroundStyle(background_url)} ${index == 0 ? "active" : ""}>
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
      /* Liquid Glass Effect Styles */
      .liquidGlass-wrapper {
        position: relative;
        display: flex;
        font-weight: 600;
        overflow: hidden;
        color: black;
        cursor: pointer;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
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
        color: black;
      }      status-bar {
          bottom: -70px;
          height: 42px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 21px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: all 0.3s ease;
      }

      status-bar:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      }      #panels, #panels ul,
      #panels .links {
          position: absolute;
      }

      #links {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .nav {
          color: #fff;
      }#panels {
          border-radius: 20px;
          width: 90%;
          max-width: 1200px;
          height: 450px;
          right: 0;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          /* Apply liquid glass effect */
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      #panels:hover {
          transform: scale(1.01);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.15);
      }

      #panels::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 20px;
          z-index: 1;
          pointer-events: none;
      }

      #panels::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3),
            inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          z-index: 2;
          pointer-events: none;
      }.categories {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 20px;
          z-index: 3;
      }      .categories ul {
          --panelbg: transparent;
          --flavour: var(--accent);
          width: 100%;
          height: 100%;
          right: 100%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 2.2);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
      }

      .categories ul::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%);
          border-radius: 20px;
          pointer-events: none;
      }

      @keyframes scroll {
          50% {
              background-position-x: -240px;
          }
      }

      .categories ul:nth-child(1) {
          --flavour: ${CONFIG.palette.green};
      }

      .categories ul:nth-child(2) {
          --flavour: ${CONFIG.palette.peach};
      }

      .categories ul:nth-child(3) {
          --flavour: ${CONFIG.palette.red};
      }

      .categories ul:nth-child(4) {
          --flavour: ${CONFIG.palette.blue};
      }
      .categories ul:nth-child(5) {
          --flavour: ${CONFIG.palette.mauve};
      }

      .categories ul .links {
          box-shadow: inset -1px 0 var(--flavour);
      }

      .categories ul[active] {
          right: 0;
          z-index: 1;
      }      .categories .links {
          right: 0;
          width: 70%;
          height: 100%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          padding: 5%;
          flex-wrap: wrap;
          border-radius: 0 20px 20px 0;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
      }

      .categories .links::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 0 20px 20px 0;
          pointer-events: none;
      }

      .categories .links li {
          list-style: none;
      }      .categories ul .links a {
          color: white;
          text-decoration: none;
          font: 600 16px 'Roboto', sans-serif;
          transition: all .4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
          display: inline-flex;
          align-items: center;
          padding: .8em 1.2em;
          position: relative;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          border-radius: 16px;
          margin-bottom: .8em;
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
      }

      .categories ul .links a::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 16px;
          z-index: -2;
          transition: all 0.3s ease;
      }

      .categories ul .links a::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: inset 1px 1px 1px 0 rgba(255, 255, 255, 0.4),
            inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
      }

      .categories .link-info {
          display: inline-flex;
      }

      .categories .link-info:not(:last-child) { margin-right: .5em; }      .categories ul .links a:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          color: white;
      }

      .categories ul .links a:hover::before {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
      }

      .categories ul .links a:hover::after {
          opacity: 1;
      }      .categories ul::after {
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
          font: 200 28px 'Nunito', sans-serif;
          text-align: center;
          flex-wrap: wrap;
          word-break: break-all;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      }

      .categories ul:hover::after {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.03);
          box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.4),
                      0 6px 16px rgba(0, 0, 0, 0.2);
      }.categories .links li:not(:last-child) {
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
          padding: 0 0 .5em 0;
          margin-bottom: 1.5em;
      }

      .categories .links li h1 {
          color: white;
          opacity: 0.8;
          font-size: 13px;
          margin-bottom: 1em;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Raleway', sans-serif;
      }

      .categories .link-icon {
          font-size: 27px;
          color: white;
      }

      .categories .link-icon + .link-name {
          margin-left: 10px;
      }

      .categories .links-wrapper {
          display: flex;
          flex-wrap: wrap;
      }

      .ti {
          animation: fadeInAnimation ease .5s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          height: 27px;
          width: 27px;
      }

      @keyframes fadeInAnimation {
          0% {
              opacity: 0;
          }
          100% {
              opacity: 1;
          }
      }
    `;
  }
  template() {
    return `
      <div id="links" class="-">
        <div id="panels">
          <div class="categories">
            ${Category.getAll(this.tabs)}
          </div>
          <status-bar class="!-"></status-bar>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}
