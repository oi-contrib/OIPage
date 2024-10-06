# getStyle 获取节点样式

## 引入

```js
import { getStyle } from "oipage/browserjs/getStyle"
```

## 使用

获取节点el的所有渲染后的样式值：

```js
let styles = getStyle(el)
```

或，获取el节点指定样式值：

```js
let value = getStyle(el, name)
```