import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Snaplo UI",
  head: [
    // Add the following line to register your CSS file
    ["link", { rel: "stylesheet", href: "/index.css" }],
  ],
  description: "Copy-Paste Components with Full CSS Control.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Components", link: "/components" },
    ],

    sidebar: [
      {
        text: "Components",
        items: [
          { text: "Single Select Menu", link: "/single-select-menu" },
          { text: "Multi Select Menu", link: "/multi-select-menu" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/AleksanderTech/snaplo" }],
  },
});
