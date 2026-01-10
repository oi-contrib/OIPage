const packageValue = require("../package.json");

module.exports = function () {
    console.log(`\x1b[36m
OIPage@v${packageValue.version}

可以使用的命令如下：

【1】oipage-cli serve 开发服务器
    --port|-p [端口号]
        默认8080
    --baseUrl [文件夹地址]
        服务器根目录
    --open
        自动打开浏览器
    （也可以设置打开地址，比如 oipage-cli serve --open docs/index.html）
    --config|-c [配置文件地址]
        设置配置文件，相对地址是相对当前命令行
    --cache [true|false]
        是否启用304（默认true表示开启）
    （eg: oipage-cli serve -p 20000 ）
    --proxy [转发前缀] [转发地址]
    （注意：转发前缀会被替换为空，相当于设置了 pathRewrite: { '^/demo': '' }）

【2】oipage-cli disk 磁盘操作
    --force|-f 
        强制执行，如果目标地址已有内容，会直接强制删除已有内容
    --delete|-d [文件或文件夹地址]
        删除文件或文件夹
    --delempty [文件夹地址]
        删除空文件夹
    --move|-m [源地址] [软链接地址]
        移动文件或文件夹
    --copy|-c [源地址] [目标地址]
        复制文件或文件夹
    --link|-l [源地址] [软链接地址]
        创建磁盘链接
    （eg: oipage-cli disk -m ./test.js ~/test.js -f ）

【3】oipage-cli run "任务一" "任务二" ... 运行多命令
    ( 如果希望动态给任务传递参数，可以查看： https://github.com/oi-contrib/OIPage/issues/5 )

【4】oipage-cli network 网络相关
    --log 
        打印网络信息
    （eg: oipage-cli network --log ）
\x1b[0m`);

};