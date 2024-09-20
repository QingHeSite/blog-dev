# Vue 用法(3.5+)
## 路由 vue-router
### 全局
#### 前置钩子-beforeEach
场景
- 权限判断
```js
const router = createRouter({ ... })

 router.beforeEach(async (to, from) => {
   if (
     // 检查用户是否已登录
     !isAuthenticated &&
     // ❗️ 避免无限重定向
     to.name !== 'Login'
   ) {
     // 将用户重定向到登录页面
     return { name: 'Login' }
   }
 })
```
**导航** 在所有守卫 resolve 完之前一直**处于等待中**


#### 全局解析守卫-beforeResolve

执行时机：在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后。
例如: pageA > pageB
`beforeEach` > `组件内守卫-beforeRouterEnter` > `beforeResolve`
只有当`beforeResolve`确认后, pageB才会展示

#### 全局后置钩子-afterEach
可用于分析、更改页面标题、声明页面等辅助功能等
参数:
- 不会接受 next 函数
- 形参 `to` 和 `from`

### [路由独享守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB)
#### beforeEnter
触发时机: 只在进入路由时触发,参数变化不触发
```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

### 组件内守卫
- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave