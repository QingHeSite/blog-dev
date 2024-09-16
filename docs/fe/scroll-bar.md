---
title: '滚动条优化'
permalink: '/core/scrollBar/'
---

# 处理浏览器滚动条 显示|隐藏 时引发页面跳动问题
- css 处理方式(最优雅)
```css
html {overflow-y:scroll}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}

```

- js处理方式
```js
function getScrollbarWidth() {
    var odiv = document.createElement('div'),//创建一个div
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll'//让他有滚动条
        }, i, scrollbarWidth;
    for (i in styles) odiv.style[i] = styles[i];
    document.body.appendChild(odiv);//把div添加到body中
    scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;//相减
    odiv.remove();//移除创建的div
    return scrollbarWidth;//返回滚动条宽度
}
```

#### css修改滚动条样式
```css
::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

::-webkit-scrollbar-thumb {
    background-color: #7f7f7f;
    border-radius: 4px;
    display: inline-block;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}
```