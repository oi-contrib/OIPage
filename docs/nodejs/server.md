# 服务器

```js
const { server } = require("oipage");

server({
  port: 20000, // 可选，端口号
  basePath: "./", // 可选，服务器根地址
  proxy: [
    {
      // 可选，配置转发，可以任意多个
      test: /^\/example/, // 匹配规则
      target: "http://www.example.com", // 转发地址
    },
  ],
  handler: function (request, response) {
    // 可选，自定义拦截，如果返回true表示此次请求自定义处理
    /**
     * this 中包含一些有用信息：
     * {
     *    1、data:请求数据
     *    2、base:服务器根地址
     *    3、getFileInfo(filePath):获取文件信息 // v0.2.0新增
     *          返回值（为空表示文件不存在 ）：
     *          {
     *              type：文件类型，比如"text/plain"
     *              path：文件全路径
     *           }
     *     4、filePath:文件原始路径 // v0.2.0新增
     * }
     */
  },
  suffixs: [".html", ".htm", ".js", ".json"], // 可选，表示缺省后缀
});
```
