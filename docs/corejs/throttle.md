# throttle 节流函数

## 引入

```js
import { throttle } from "oipage/corejs/throttle/index"
```

## 语法

```js
let newFunction = throttle(function(){
    // todo
}, option);
```

返回一个节流函数，具体的行为受第二个参数option控制，option是一个json，可选，其属性如下：

| 属性名 | 类型 | 默认值 | 说明 |
| ---------- | ---------- | ---------- | ---------- |
| time | number | 200 | 节流时长，单位毫秒 |
| keep | boolean | false | 是否持续节流，如果设置true，那个在一个持续时间内函数只会最后执行一次 |
| opportunity | string | "end" |  执行时机，可选值为：begin（开始触发）、end（结束触发）、wide（第一次开始触发，其余结束触发） |

## 举例子

```js
window.addEventListener("resize",throttle(function(){
    console.log("页面大小改变了～");
},{
    keep: true
}));
```
