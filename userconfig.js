// latte / frappe / macchiato / mocha
const palette = latte;

const default_config = {
  overrideStorage: true,
  temperature: {
    location: "Changqing",
    scale: "C",
  },
  clock: {
    format: "h:i p",
    iconColor: palette.maroon,
  },
  disabled: [],
  fastlink: "https://hxcn.cnies.org",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "HXCN",
      background_url: "src/img/banners/bg-2.gif",
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
              name: "HAM",
              url: "https://bg4klr.cnies.org",
              icon: "radio",
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
          name: "CHAWORLD",
          links: [
            {
              name: "猹盘",
              url: "https://ed.qcea.top",
              icon: "brand-onedrive",
              icon_color: palette.mauve,
            },
            {
              name: "猹馆",
              url: "https://qm.qq.com/cgi-bin/qm/qr?k=L_5nTaWr9hCupgFlntG9dJvVOYryFvv_&jump_from=webapi&authKey=dMK7Hy64j/qHufvU/SiTkzq1BCI2rAFXvNqNV57WFiQ/9nQUF5OP/ZSNQlSQuura",
              icon: "mug",
              icon_color: palette.sapphire,
            },
            {
              name: "猹界",
              url: "https://qcea.top/",
              icon: "brand-minecraft",
              icon_color: macchiato.lavender,
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
