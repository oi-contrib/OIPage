# 命令行参数解析

```js
const { options } = require("oipage");

const parsed = options(shortHands, argv);
```

例如：

```js
const parsed = options({
    '-v': '--version',
    '-h': '--help',
    '-s': '--server',
    '-c': '--config'
    }, process.argv);
```

返回的值parsed是一个简单可读的包含命令行所有信息的JSON，具体的你可以打印一下试试。
