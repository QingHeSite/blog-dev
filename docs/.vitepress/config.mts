import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const base = '/blog-dev/'
export default defineConfig({
  base: base,
  title: "没有帽衫的笔记",
  description: "经验,笔记,优化方案",
  head: [['link', {rel:'icon',type:'image/png', href: base + 'favicon.ico'}],
['script', {}, `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "o51zyfyzhx");`],
  [ "meta", { name: "keywords", content: "前端,Vue,Es Vs Commonjs,Typescript,如何处理拖拽事件,下载文件,图片压缩,组件库设计,组件库设计开发,缓存,优化-滚动条样式,优化-页面加载,框架类,Web Cli,npm私有仓库搭建,Docker,Win和Linux 常用命令,Git,Shell,工具,Win11激活" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      // { text: 'Examples', link: '/fe/markdown-examples' }
    ],

    sidebar: [
      {
        text: '前端',
        items: [
          {text: 'Vue', link: '/fe/vue'},
          {text: 'Es Vs Commonjs', link: '/fe/es-commonjs'},
          {text: 'Typescript', link: '/fe/typescript'},
          {text: '拖拽事件', link: '/fe/drag'},
          {text: '下载文件', link: '/fe/download'},
          {text: '图片压缩', link: '/fe/img-compress'},
          {text: '组件库-设计&开发', link: '/fe/component'},
          {text: '缓存', link: '/fe/cache'},
          {text: '优化-滚动条样式', link: '/fe/scroll-bar'},
          {text: '优化-页面加载', link: '/fe/optimization-page-load'},
        ]
      },
      {
        text: '框架类',
        items: [
          {text: 'Web Cli', link: '/framework/web-cli'},
          {text: 'npm私有仓库搭建', link: '/framework/verdaccio'},
          {text: 'Docker', link: '/framework/docker'},
          {text: 'Win & Linux 常用命令', link: '/framework/command'},
          {text: 'Git', link: '/framework/git'},
          {text: 'Shell', link: '/framework/shell'},
        ]
      },{
        text: '工具',
        base: '/pages-tool/',
        items: [
          {text: 'Win11激活', link: 'win11'}
        ]
      }
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/fe/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/QingHeSite' }
    ],
    search: {
      provider: 'local'
    }
  },
  lastUpdated: true
})
