# Vue 用法(3.5+)
## 路由 vue-router
### 前置钩子-beforeEach
```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```
**导航** 在所有守卫 resolve 完之前一直**处于等待中**


### 全局解析守卫-beforeResolve

执行时机：在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后。
例如: pageA > pageB
`beforeEach` > `组件内守卫-beforeRouterEnter` > `beforeResolve`
只有当`beforeResolve`确认后, pageB才会展示

### 全局后置钩子-afterEach
可用于分析、更改页面标题、声明页面等辅助功能等
参数:
- 不会接受 next 函数
- 形参 `to` 和 `from`