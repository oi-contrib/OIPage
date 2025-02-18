const packageValue = require("../package.json");

module.exports = function () {
    console.log(`\x1b[36m
OIPage@v${packageValue.version}

可以使用的命令如下：

【1】oipage-cli serve 开发服务器
    --port|-p 端口号
    --baseUrl 服务器根目录

【2】oipage-cli disk 磁盘操作
    --force|-f 强制执行
    --delete|-d 删除文件或文件夹
    --move|m 移动文件或文件夹
    --copy|-c 复制文件或文件夹

【3】oipage-cli run "任务一" "任务二" ... 运行多命令

Powered by https://github.com/zxl20070701
\x1b[0m`);

};