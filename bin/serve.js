const { join } = require("path");
const { existsSync, lstatSync, readFileSync } = require("fs");
const { createServer } = require('http');
const packageValue = require("../package.json");
const network = require("./network");
const mineTypes = require("./mineTypes.json");
const resolve404 = require("./resolve404.js");

// 开发服务器
module.exports = function (config) {
    let startTime = new Date().valueOf();

    const port = config.port; // 端口号
    const basePath = join(process.cwd(), config.baseUrl); // 服务器根路径

    let Server = createServer(function (request, response) {

        let url = decodeURIComponent(request.url);
        url = url.split("?")[0];

        // 请求的文件路径
        let filePath = join(basePath, url == "/" ? "index.html" : url.replace(/^\//, ""));

        // 如果存在且是文件
        if (existsSync(filePath) && !lstatSync(filePath).isDirectory()) {

            let dotName = /\./.test(filePath) ? filePath.match(/\.([^.]+)$/)[1] : "";
            let fileType = mineTypes[dotName]; // 文件类型

            response.writeHead('200', {
                'Content-type': (fileType || "text/plain") + ";charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Server': 'Powered by OIPage-dev-server@' + packageValue.version
            });
            response.write(readFileSync(filePath));
            response.end();

            console.log("<i> \x1b[1m\x1b[32m[OIPage-dev-server] Read File: " + url + '\x1b[0m ' + new Date().toLocaleString());
        }

        // 否则就是404
        else {
            response.writeHead(404, {
                'Content-type': "text/html;charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Server': 'Powered by OIPage-dev-server@' + packageValue.version
            });
            response.write(resolve404(filePath, url));
            response.end();
        }

    });

    Server.listen(port);

    // 获取网络信息
    let networkValue = network();

    // 打印成功提示
    console.log('<i> \x1b[1m\x1b[32m[OIPage-dev-server] Project is running at:\x1b[0m');
    console.log('<i> \x1b[1m\x1b[32m[OIPage-dev-server] Loopback: \x1b[36mhttp://localhost:' + port + '/\x1b[0m');
    for (let ipv4Item of networkValue.IPv4) console.log('<i> \x1b[1m\x1b[32m[OIPage-dev-server] On Your Network (IPv4):\x1b[36m http://' + ipv4Item.address + ':' + port + '/\x1b[0m');
    for (let ipv6Item of networkValue.IPv6) console.log('<i> \x1b[1m\x1b[32m[OIPage-dev-server] On Your Network (IPv6): \x1b[36mhttp://[' + ipv6Item.address + ']:' + port + '/\x1b[0m');
    console.log('<i> \x1b[1m\x1b[32m[OIPage-dev-server] Content not from OIPage is served from \x1b[36m"' + basePath + '" \x1b[0mdirectory');
    console.log('\nOIPage ' + packageValue.version + ' compiled \x1b[1m\x1b[32msuccessfully\x1b[0m in ' + (new Date().valueOf() - startTime) + ' ms\n')
};