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

> 【v0.2.0新增】打印完成后请执行一下 `linelog()` 来通知我们重置记录。

## 进度打印

```js
const { deeplog } = require("oipage");

deeplog(percentum, txt);
```

> 【v0.2.0新增】打印完成后请执行一下 `deeplog()` 来通知我们重置记录。