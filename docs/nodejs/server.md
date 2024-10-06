# 服务器

```js
const { server } = require("oipage");

server({
    port: 20000, // 可选，端口号
    basePath: "./", // 可选，服务器根地址
    proxy: [{ // 可选，配置转发，可以任意多个
        test: /^\/example/, // 匹配规则
        target: "http://www.example.com" // 转发地址
    }],
    handler:function(request, response){ // 可选，自定义拦截，如果返回true表示此次请求自定义处理
        /**
         * this 中包含一些有用信息：
         * {
         *    data:请求数据,
         *    base:服务器根地址    
         * }
         */
    },
    suffixs:[".html",".htm",".js",".json"] // 可选，表示缺省后缀
});
```