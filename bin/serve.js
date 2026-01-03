const { join } = require("path");
const { existsSync, lstatSync, statSync, createReadStream } = require("fs");
const { createServer } = require('http');
const packageValue = require("../package.json");
const network = require("./tools/network.js");
const mineTypes = require("./data/mineTypes.json");
const resolve404 = require("./tools/resolve404.js");
const resolveImportFactory = require("./tools/resolveImport.js");
const { doIntercept } = require("./intercept.js");

const websiteIntercept = require("./website-plugins/intercept/index.js");
const websiteLoader = require("./website-plugins/loader/index.js");

const WebSocketClass = require("./WebSocket/index.js");

// 开发服务器
module.exports = function (config) {
    let startTime = new Date().valueOf();

    const cache = "cache" in config.devServer ? config.devServer.cache : true;
    const port = +config.devServer.port; // 端口号
    const basePath = (/^\./.test(config.devServer.baseUrl)) ? join(process.cwd(), config.devServer.baseUrl) : config.devServer.baseUrl; // 服务器根路径

    const name = (config.name || "OIPage") + "-http-server";
    const version = config.version || packageValue.version;

    const wsHandler = WebSocketClass(port + 1, (config.name || "OIPage") + "-ws-server", version);

    let Server = createServer(function (request, response) {
        let headers = request.headers;
        let url = decodeURIComponent(request.url);

        let urlArray = url.split("?");
        url = urlArray[0];

        // 请求的文件路径
        let filePath;

        let isWebsite = /^\/_oipage_website_\//.test(url);
        if (isWebsite) {
            filePath = join(__dirname, "./website-htmls/", url.replace(/^\/_oipage_website_\//, ""));
        } else {
            filePath = join(basePath, url == "/" ? "index.html" : url.replace(/^\//, ""));
        }

        // 请求拦截
        if (doIntercept(url.replace(/^\/_oipage_website_/, "").replace(/^\/@modules\//, ""), isWebsite ? websiteIntercept : config.devServer.intercept, request, response, wsHandler)) {
            console.log("<i> \x1b[1m\x1b[32m[" + name + "] intercept: " + url + '\x1b[0m ' + new Date().toLocaleString());
        }

        // 如果存在且是文件
        else if (existsSync(filePath) && !lstatSync(filePath).isDirectory()) {

            // 判断是否是请求而无需进一步解析
            // 2025年12月5日 于南京
            let isXHR = headers["sec-fetch-dest"] === "empty";

            let dotName = /\./.test(filePath) ? filePath.match(/\.([^.]+)$/)[1] : "";
            let fileType = mineTypes[dotName]; // 文件类型
            let fileInfo = statSync(filePath);

            let fileModifiedTime = new Date(fileInfo.mtime).toGMTString();

            let responseHeader = {
                'Content-Type': (fileType || "text/plain") + ";charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Server': 'Powered by ' + name + '@' + version,
                'Cache-Control': 'no-cache',
                // 'Content-Length': fileInfo.size, // 会导致拦截修改的文本内容不对

                // 与if-modified-since配合使用，做缓存验证
                'Last-Modified': fileModifiedTime,

                // 与if-none-match配合使用，做缓存验证
                // 'ETag': basePath + "-" + new Date(fileInfo.mtime).toString()
            };

            if (cache && headers["if-modified-since"]) {
                let ifModifiedSince = new Date(headers["if-modified-since"]).valueOf()
                let lastModified = new Date(fileModifiedTime).valueOf()

                // 注意这里不能使用<=，否则
                // 1、会出现时区问题
                // 2、作为开发服务器，可能同一个url地址对应的文件不同，被误判为未修改
                // 2025年12月29日 于南京
                // if (lastModified <= ifModifiedSince) {}
                if (lastModified === ifModifiedSince) {
                    response.writeHead('304', responseHeader);
                    response.end();
                    console.log("<i> \x1b[1m\x1b[32m[" + name + "] Cache File: " + url + "\x1b[0m " + new Date().toLocaleString() + "\x1b[33m\x1b[1m 304" + (isXHR ? " 请求" : "") + "\x1b[0m");
                    return;
                }
            }

            let sendType = "";
            let entry = headers.accept !== "*/*";

            // 如果文件小于10M，认为不大，直接读取
            if (fileInfo.size < 10 * 1024 * 1024) {
                let { source, resolveImport } = resolveImportFactory(basePath, filePath, entry, isWebsite ? websiteIntercept : config.devServer.intercept, urlArray[1] === "download", isWebsite)

                // 只处理非下载文件
                // 过大的也不进行处理
                // （对website无效）
                if (urlArray[1] !== "download") {
                    let loaders = isWebsite ? websiteLoader : config.module;

                    for (let i = 0; i < loaders.rules.length; i++) {
                        if (loaders.rules[i].test.test(filePath)) {
                            source = loaders.rules[i].use.call({
                                root: basePath, // 服务器根路径
                                path: filePath.replace(basePath, ""), // 文件相对路径
                                entry, // 是否是浏览器地址栏直接访问
                                setFileType(_fileType) { // 设置文件类型
                                    fileType = _fileType;
                                    responseHeader['Content-Type'] = _fileType + ";charset=utf-8";
                                }
                            }, source);
                            break;
                        }
                    }

                }

                sendType = "Read";
                response.writeHead('200', responseHeader);
                response.write(isXHR ? source : resolveImport(source, fileType !== "application/javascript"));
                response.end();
            }

            // 对于大文件，使用流读取
            else {
                sendType = "Stream";

                responseHeader['Content-Length'] = fileInfo.size

                response.writeHead('200', responseHeader);
                createReadStream(filePath).pipe(response);
            }

            console.log("<i> \x1b[1m\x1b[32m[" + name + "] " + sendType + " File: " + url + '\x1b[0m ' + new Date().toLocaleString() + "\x1b[33m\x1b[1m" + (isXHR ? " 请求" : "") + "\x1b[0m");
        }

        // 否则就是404
        else {
            response.writeHead(404, {
                'Content-Type': "text/html;charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Server': 'Powered by ' + name + '@' + version
            });
            response.write(resolve404(filePath, url));
            response.end();
        }

    });

    Server.listen(port);

    // 获取网络信息
    let networkValue = network();

    // 打印成功提示
    console.log('<i> \x1b[1m\x1b[32m[' + name + '] Project is running at:\x1b[0m');
    console.log('<i> \x1b[1m\x1b[32m[' + name + '] Loopback: \x1b[36mhttp://localhost:' + port + '/\x1b[0m');
    for (let ipv4Item of networkValue.IPv4) console.log('<i> \x1b[1m\x1b[32m[' + name + '] On Your Network (IPv4):\x1b[36m http://' + ipv4Item.address + ':' + port + '/\x1b[0m');
    for (let ipv6Item of networkValue.IPv6) console.log('<i> \x1b[1m\x1b[32m[' + name + '] On Your Network (IPv6): \x1b[36mhttp://[' + ipv6Item.address + ']:' + port + '/\x1b[0m');
    console.log('<i> \x1b[1m\x1b[32m[' + name + '] Content not from ' + (config.name || "OIPage") + ' is served from \x1b[36m"' + basePath + '" \x1b[0mdirectory');
    if (!cache) console.log('<i> \x1b[1m\x1b[32m[' + name + '] Cancel 304 Cache!\x1b[0m');
    console.log('\n' + (config.name || "OIPage") + ' ' + version + ' compiled \x1b[1m\x1b[32msuccessfully\x1b[0m in ' + (new Date().valueOf() - startTime) + ' ms\n')
};