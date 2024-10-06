# 文件解析Loader

## simpleScss 

scss文件转css（只支持部分scss语法）

```js
const { simpleScss } = require("oipage");

let cssCode = simpleScss(source);
```

## xhtml

xhtml文件解析成json对象

```js
const { xhtml } = require("oipage");

let domTree = xhtml(source);
```