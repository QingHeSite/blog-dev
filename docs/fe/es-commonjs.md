---
title: 'ES vs CommonJS'
permalink: '/core/concept/'
---
# 为什么ES模块比CommonJS更好?

ES模块是官方标准，也是JavaScript语言明确的发展方向，而CommonJS模块是一种特殊的传统格式，在ES模块被提出之前做为暂时的解决方案。 ES模块允许进行静态分析，从而实现像 tree-shaking 的优化，并提供诸如循环引用和动态绑定等高级功能。


## Commonjs 运行机制
- 运行环境: 每个 CommonJS 模块的代码都会被包装在一个函数里,运行在自定义函数内
- 缓存: 加载的模块会被缓存，后续 `require` 不会重复执行，而是直接返回缓存的模块导出对象。
- 导出对象: 为`module.exports`
```js
// CommonJS 实现机制
(function (exports, require, module, __filename, __dirname) {
    // 模块代码在这里
    const someModule = require('someModule');
    module.exports = { ... };
});
```

## ESModule 运行机制
- 不包装在函数中：ESModule 代码运行在模块的顶层作用域，并且没有额外的包装函数。模块的作用域是天然隔离的。
- 静态分析：导入和导出是静态的，编译器和 JavaScript 引擎在编译时可以解析和优化这些语句。
- import/export：使用 import 和 export 关键字导入和导出模块
- 异步加载：ESModules 支持异步加载，它们在被引入时不会立即执行，而是按照依赖图执行。这为浏览器环境下的模块加载提供了更高的灵活性。