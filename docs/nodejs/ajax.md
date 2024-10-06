# 网络请求（ajax）

## GET

```js
const { get } = require("oipage");

get(url, {
    json?: boolean
}).then(data => {
    // todo
});
```

## POST

```js
const { post } = require("oipage");

post(url, {
    json?: boolean
    header?: {} // 请求头
    params?: "" // 请求参数
}).then(data => {
    // todo
});
```

