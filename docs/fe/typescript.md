# Typescript
### type和interface有什么区别
#### 相同点
---
- 都可以描述一个对象或函数

#### 不同点
---
- type可以声明基本类型,元组,联合类型
- interface可以而type不可以
    ```ts
    interface可以进行声明合并
    interface cat {
     name: string
     age: number
    }
    interface cat {
     color: string
    }

    那么cat接口为
    cat {
     name: string
     age: number
     color: string
    }
    ```
  
#### Omit<Type, Keys>
通过从 Type 中选择所有属性然后删除 Keys（字符串字面或字符串字面的并集）来构造一个类型。与 Pick 相反。
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
```

#### Pick<Type, Keys>
通过从 Type 中选取一组属性 Keys（字符串字面或字符串字面的并集）来构造一个类型。
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
}
```

#### Partial
构造一个将 Type 的所有属性设置为可选的类型。此工具将返回一个表示给定类型的所有子集的类型。
```ts
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## 全局
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

### 全局后置钩子-afterEach
可用于分析、更改页面标题、声明页面等辅助功能等
参数:
- 不会接受 next 函数
- 形参 `to` 和 `from`



