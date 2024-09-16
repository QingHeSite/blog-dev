# 页面加载优化

1. 采用ssr(server side render)方案,服务端渲染,首屏直出
2. 模块按需加载,按需渲染
3. 骨架屏
4. 首屏图片懒加载
5. dns预解析
   - 如果页面里使用到的不同域名较多推荐使用
6. 页面链接预加载
   - 预加载页面链接,下次点击时直接从缓存中读取,提升用户体验
       ```html
       const linkPrefetch = document.createElement('link');
       linkPrefetch.setAttribute('rel','prefetch');
       linkPrefetch.setAttribute('href','https://www.baidu.com');
       document.head.appendChild(linkPrefetch)
      ```
     or
      
     ```javascript
        if (HTMLScriptElement.supports &&
        HTMLScriptElement.supports('speculationrules')) {
        const specScript = document.createElement('script');
        specScript.type = 'speculationrules';
        specRules = {
        prerender: [
        {
        source: 'list',
        urls: ['/next.html'],
        },
        ],
        };
        specScript.textContent = JSON.stringify(specRules);
        console.log('added speculation rules to: next.html');
        document.body.append(specScript);
        }
     ```