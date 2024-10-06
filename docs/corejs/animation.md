# animation 动画

## 引入

```js
import { animation } from "oipage/corejs/animation/index"
```

## 语法

```js
let stop = animation(deep => {
    // 轮询调用，必输
}, duration = 400, deep => {
    // 结束调用，可选
})
```

 返回一个函数，调用该函数，可以提前结束动画。