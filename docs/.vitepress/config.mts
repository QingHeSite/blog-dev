import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "没有帽衫的笔记",
  description: "经验,笔记,优化方案",
  head: [['link', {rel:'icon', href: '/favicon.ico'}]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/fe/markdown-examples' }
    ],

    sidebar: [
      {
        text: '前端',
        items: [
          {text: 'Es Vs Commonjs', link: '/fe/es-commonjs'},
          {text: 'Typescript', link: '/fe/typescript'},
          {text: '拖拽事件', link: '/fe/drag'},
          {text: '下载文件', link: '/fe/download'},
          {text: '图片压缩', link: '/fe/img-compress'},
          {text: '优化-滚动条样式', link: '/fe/scroll-bar'},
          {text: '优化-页面加载', link: '/fe/optimization-page-load'},
        ]
      },
      {
        text: '框架类',
        items: [
          {text: 'Docker', link: '/framework/docker'},
          {text: 'Win & Linux 常用命令', link: '/framework/command'},
          {text: 'Git', link: '/framework/git'},
          {text: 'Shell', link: '/framework/shell'},
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
