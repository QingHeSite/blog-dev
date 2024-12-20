# 页面加载

## [页面渲染 工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
1. 导航
2. DNS查询
3. TCP三次握手
4. TSL协商
5. 响应(建立连接,发送请求, 响应请求)
6. 构建DOM树

    dom树描述了文档内容, `<html/>`为根节点,
    1. 获取HTML文件
    2. 开始构建DOM树
    3. 解析到 `<link rel="stylesheet"/>` 标签，异步加载CSS文件
    4. 解析到 `<script/>` 标签
        - 如果没有 async 或 defer：
            - 暂停DOM树构建，加载并执行JavaScript
            - JavaScript执行完后，继续解析HTML并构建DOM树
        - 如果有 async：
            - 并行加载脚本，加载完成后立即执行（可能打断解析）
            - 如果有 defer：
            - 并行加载脚本，但在DOM树构建完成后按顺序执行
    5. 继续构建DOM树，处理其他HTML内容
    6. CSS文件加载完成，解析为CSSOM树
    7. DOM树和CSSOM树结合，生成渲染树（render tree）
    8. 重排-布局(Layout)阶段：计算每个元素的几何信息,如位置和大小
    9. 重绘-绘制(Painting)阶段：将元素绘制到屏幕上
    10. 完成页面渲染



## script 标签的 async 和 defer

**默认**: 同步加载和执行，即会阻塞HTML解析

**async**: 异步加载，加载完成后立即执行, 执行会阻塞页面渲染

**defer**: 异步加载，加载完成后在 DOMContentLoaded 事件后执行(推荐使用)

事件: DOMContentLoaded

    页面dom解析完成,在loaded之前,资源文件可能未加载完成,例如img未加载

事件: loaded

    页面dom解析完成,资源文件加载完成


![解析顺序图](../assets/image/async-defer.jpg)

