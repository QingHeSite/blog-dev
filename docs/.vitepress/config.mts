import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端开发笔记",
  description: "经验,笔记,优化方案",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/fe/markdown-examples' }
    ],

    sidebar: [
      {
        text: '前端',
        items: [
          {text: 'Es Vs Commonjs', link: '/fe/es-commonjs'},
          {text: 'Typescript', link: '/fe/typescript'},
          {text: '滚动条优化', link: '/fe/scroll-bar'},
        ]
      },
      {
        text: '框架类',
        items: [
          {text: 'Docker', link: '/framework/docker'},
          {text: 'win & linux 常用命令', link: '/framework/command'}
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/fe/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/QingHeSite' }
    ]
  }
})
