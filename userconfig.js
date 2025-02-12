// latte / frappe / macchiato / mocha
const palette = latte;

const default_config = {
  overrideStorage: true,
  temperature: {
    location: "Changqing",
    scale: "C",
  },
  clock: {
    format: "h:i:s - Y/b/m",
    iconColor: palette.maroon,
  },
  disabled: [],
  fastlink: "https://hxcn.cnies.org",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "HXCN",
      background_url: "src/img/banners/cbg-03.gif",
      categories: [
        {
          name: "Websites",
          links: [
            {
              name: "Homepage",
              url: "https://hxcn.cnies.org",
              icon: "home",
              icon_color: frappe.green,
            },
            {
              name: "Blog",
              url: "https://hs.cnies.org",
              icon: "archive",
              icon_color: frappe.peach,
            },
            {
              name: "Note",
              url: "https://enotes.cnies.org",
              icon: "notebook",
              icon_color: frappe.flamingo,
            },
            {
              name: "BrushUp",
              url: "https://bu.cnies.org",
              icon: "pencil-star",
              icon_color: frappe.maroon,
            },
            {
              name: "Mates",
              url: "https://hs.cnies.org/links",
              icon: "link",
              icon_color: frappe.teal,
            },
          ],
        },
        {
          name: "Socials",
          links: [
            {
              name: "Github",
              url: "https://github.com/excniesNIED",
              icon: "brand-github",
              icon_color: palette.lavender,
            },

            {
                name: "Codeberg",
                url: "https://codeberg.org/excnies",
                icon: "mountain",
                icon_color: palette.green,
            },
            {
              name: "Huggingface",
              url: "https://huggingface.co/excnies",
              icon: "mood-heart",
              icon_color: palette.yellow,
            },
            {
              name: "Bilibili",
              url: "https://space.bilibili.com/520945083",
              icon: "brand-bilibili",
              icon_color: palette.sky,
            },
            {
              name: "QQ",
              url: "https://qm.qq.com/cgi-bin/qm/qr?k=L_5nTaWr9hCupgFlntG9dJvVOYryFvv_&jump_from=webapi&authKey=dMK7Hy64j/qHufvU/SiTkzq1BCI2rAFXvNqNV57WFiQ/9nQUF5OP/ZSNQlSQuura",
              icon: "brand-qq",
              icon_color: palette.blue,
            },
            {
              name: "Mail",
              url: "mailto:hxcn@cnies.org",
              icon: "mail",
              icon_color: palette.sapphire,
            },
          ],
        },
        {
            name: "Mates",
            links: [
              {
                name: "ChaWorld",
                url: "https://home.qcea.top",
                icon: "home",
                icon_color: palette.green,
              },
              {
                name: "Cysnies",
                url: "https://tcea.top",
                icon: "home",
                icon_color: palette.peach,
              },
              {
                name: "FOSScope",
                url: "https://fosscope.com",
                icon: "archive",
                icon_color: palette.flamingo,
              },
            ],
        }
      ],
    },
    {
      name: "Specu",
      background_url: "src/img/banners/cbg-01.gif",
      categories: [
        {
          name: "development",
          links: [
            {
              name: "github",
              url: "https://github.com",
              icon: "brand-github",
              icon_color: palette.green,
            },
            {
              name: "neptune",
              url: "https://ui.neptune.ai",
              icon: "circle-triangle",
              icon_color: palette.peach,
            },
            {
              name: "stackoverflow",
              url: "https://stackoverflow.com",
              icon: "brand-stackoverflow",
              icon_color: palette.red,
            },
          ],
        },
        {
          name: "challenges",
          links: [
            {
              name: "kaggle",
              url: "https://www.kaggle.com",
              icon: "brain",
              icon_color: palette.green,
            },
            {
              name: "leetcode",
              url: "https://leetcode.com",
              icon: "code-plus",
              icon_color: palette.peach,
            },
            {
              name: "exercism",
              url: "https://exercism.org",
              icon: "code-minus",
              icon_color: palette.red,
            },
            {
              name: "aoc",
              url: "https://adventofcode.com",
              icon: "brand-linktree",
              icon_color: palette.blue,
            },
          ],
        },
        {
          name: "resources",
          links: [
            {
              name: "dou",
              url: "https://dou.ua",
              icon: "brand-prisma",
              icon_color: palette.green,
            },
            {
              name: "hackernews",
              url: "https://news.ycombinator.com",
              icon: "brand-redhat",
              icon_color: palette.peach,
            },
            {
              name: "uber engineering",
              url: "https://www.uber.com/en-GB/blog/london/engineering",
              icon: "brand-uber",
              icon_color: palette.red,
            },
            {
              name: "netflix tech blog",
              url: "https://netflixtechblog.com",
              icon: "brand-netflix",
              icon_color: palette.blue,
            },
          ],
        },
      ],
    },
    {
      name: "CHA",
      background_url: "src/img/banners/cbg-14.gif",
      categories: [
        {
          name: "Home Page",
          links: [
            {
              name: "主页",
              url: "https://home.qcea.top",
              icon: "home",
              icon_color: palette.green,
            },
          ],
        },
        {
          name: "Core Services",
          links: [

            {
              name: "猹馆",
              url: "https://home.qcea.top",
              icon: "users",
              icon_color: palette.peach,
            },
            {
                name: "龙井猹馆",
                url: "https://qm.qq.com/cgi-bin/qm/qr?k=L_5nTaWr9hCupgFlntG9dJvVOYryFvv_&jump_from=webapi&authKey=dMK7Hy64j/qHufvU/SiTkzq1BCI2rAFXvNqNV57WFiQ/9nQUF5OP/ZSNQlSQuura",
                icon: "mug",
                icon_color: palette.peach,
            },
            {
              name: "猹聊",
              url: "https://matrix.qcea.top",
              icon: "message",
              icon_color: palette.red,
            },
            {
              name: "猹问",
              url: "https://ask.qcea.top",
              icon: "question-mark",
              icon_color: palette.red,
            },
            {
              name: "猹盘",
              url: "https://ed.qcea.top",
              icon: "brand-onedrive",
              icon_color: palette.red,
            },
            {
              name: "服务监测",
              url: "https://status.qcea.top",
              icon: "heart-rate-monitor",
              icon_color: palette.red,
            },
          ],
        },
        {
          name: "Tools",
          links: [
            {
              name: "Stirling PDF",
              url: "https://pdf.qcea.top",
              icon: "file-type-pdf",
              icon_color: palette.green,
            },
            {
              name: "IT Tools",
              url: "https://tools.qcea.top",
              icon: "tool",
              icon_color: palette.peach,
            },
          ],
        },
      ],
    },
  ],
};

const CONFIG = new Config(default_config, palette);

const root = document.querySelector(":root");
root.style.setProperty("--bg", palette.mantle);
root.style.setProperty("--accent", palette.green);
