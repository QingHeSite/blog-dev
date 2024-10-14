# 页面加载

## script 标签的 async 和 defer
**async**: 异步加载，加载完成后立即执行, 执行会阻塞页面渲染

**defer**: 异步加载，加载完成后在 DOMContentLoaded 事件后执行(推荐使用)

事件: DOMContentLoaded

    页面dom解析完成,在loaded之前,资源文件可能未加载完成,例如img未加载

事件: loaded

    页面dom解析完成,资源文件加载完成


![解析顺序图](../assets/image/async-defer.png)

