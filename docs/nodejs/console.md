# 控制台打印

## 普通打印

```js
const { log, warn, error } = require('oipage');
```

## 单行打印

```js
const { linelog } = require("oipage");

linelog(txt);
```

## 进度打印

```js
const { deeplog } = require("oipage");

deeplog(percentum, txt);
```