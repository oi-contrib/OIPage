const { join } = require("path");
const { existsSync, lstatSync, statSync, createReadStream } = require("fs");
const { createServer } = require('http');
const packageValue = require("../package.json");
const network = require("./tools/network.js");
const mineTypes = require("./data/mineTypes.json");
const resolve404 = require("./tools/resolve404.js");
const resolveImportFactory = require("./tools/resolveImport.js");
const { formatRawHeaders } = require("./tools/format.js");

// 开发服务器
module.exports = function (config) {
    let startTime = new Date().valueOf();

    const port = config.devServer.port; // 端口号
    const basePath = (/^\./.test(config.devServer.baseUrl)) ? join(process.cwd(), config.devServer.baseUrl) : config.devServer.baseUrl; // 服务器根路径

    let Server = createServer(function (request, response) {
        let headers = formatRawHeaders(request.rawHeaders);
        let url = decodeURIComponent(request.url);

        let urlArray = url.split("?");
        url = urlArray[0];

        // 请求的文件路径
        let filePath = join(basePath, url == "/" ? "index.html" : url.replace(/^\//, ""));

        // 如果存在且是文件
        if (existsSync(filePath) && !lstatSync(filePath).isDirectory()) {

            let dotName = /\./.test(filePath) ? filePath.match(/\.([^.]+)$/)[1] : "";
            let fileType = mineTypes[dotName]; // 文件类型
            let fileInfo = statSync(filePath);

            let responseHeader = {
                'Content-type': (fileType || "text/plain") + ";charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Server': 'Powered by OIPage-dev-server@' + packageValue.version
            };

            let sendType = "";
            let entry = headers.Accept !== "*/*";

            // 如果文件小于10M，认为不大，直接读取
            if (fileInfo.size < 10 * 1024 * 1024) {
                let { source, resolveImport } = resolveImportFactory(basePath, filePath, entry, urlArray[1] === "download")

                // 只处理非下载文件
                // 过大的也不进行处理
                if (urlArray[1] !== "download") {
                    for (let i = 0; i < config.module.rules.length; i++) {
                        if (config.module.rules[i].test.test(filePath)) {
                            source = config.module.rules[i].use.call({
                                root: basePath, // 服务器根路径
                                path: filePath.replace(basePath, ""), // 文件相对路径
                                entry, // 是否是浏览器地址栏直接访问
                                setFileType(_fileType) { // 设置文件类型
                                    fileType = _fileType;
                                    responseHeader['Content-type'] = _fileType + ";charset=utf-8";
                                }
                            }, source);
                            break;
                        }
                    }
                }

                sendType = "Read";
                response.writeHead('200', responseHeader);
                response.write(resolveImport(source, fileType !== "application/javascript"));
                response.end();
            }

            // 对于大文件，使用流读取
            else {
                sendType = "Stream";
                responseHeader["Content-Length"] = fileInfo.size;
                response.writeHead('200', responseHeader);
                createReadStream(filePath).pipe(response);
            }

            console.log("<i> \x1b[1m\x1b[32m[OIPage-dev-server] " + sendType + " File: " + url + '\x1b[0m ' + new Date().toLocaleString());
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