const packageValue = require("../package.json");

module.exports = function () {
    console.log(`\x1b[36m
OIPage@v${packageValue.version}

可以使用的命令如下：

【1】oipage-cli serve 开发服务器
    --port|-p 端口号
    --baseUrl 服务器根目录（相对命令行）

Powered by https://github.com/zxl20070701
\x1b[0m`);

};