# 文件读取

> 0.2.0 新增

## plain

读取文本内容

```js
const { plain } = require("oipage");

let reader = plain(txt);
```

有如下方法可供使用：

- readNext()：读取下一个字符
- getNextN(num)：获取往后 num 个值
