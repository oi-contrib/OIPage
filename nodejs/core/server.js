const http = require('http');
const fs = require('fs');

const mineTypes = require('../data/mime.types.js');
const { log, warn, error } = require('./log.js');
const responseFileList = require('./responseFileList.js');
const path = require('path');

const jsonfile = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')));

module.exports = function (config = {}) {

    let port = config.port || 20000; // 端口号
    let handler = typeof config.handler == 'function' ? config.handler : function () { return false; };
    let suffixs = Array.isArray(config.suffix) ? config.suffix : [".html", ".htm", ".js", ".json", ".css"];

    let proxy = [];
    if (config.proxy) {
        for (let item of config.proxy) {
            let target = /(https*):\/\/([^/:]+):*(\d+)*(.*)/.exec(item.target) || [];
            proxy.push({
                test: item.test,
                target: {
                    protocol: target[1], // 使用的协议
                    hostname: target[2], // 请求发送至的服务器的域名或 IP 地址
                    port: target[3] || 80, // 端口号
                    path: target[4] || "", // 路径前缀
                }
            });
        }
    }

    let basePath = path.join(process.cwd(), config.basePath || "./"); // 服务器根路径

    let index = 0;
    let Server = http.createServer(function (request, response) {
        try {
            let requestData = "";

            request.on('data', (chunk) => {
                requestData += chunk;
            });

            request.on('end', () => {
                let url = decodeURIComponent(request.url);

                log("[" + index++ + "]" + url);

                // 自定义拦截
                if (handler.call({
                    data: requestData,
                    base: basePath
                }, request, response)) return;

                // proxy拦截
                for (let item of proxy) {
                    if (item.test.test(url)) {
                        let _path = item.target.path + (url.replace(item.test, ""));

                        warn("    ↳ [" + request.method + "] " + item.target.protocol + "://" + item.target.hostname + ":" + item.target.port + _path);

                        // https://www.nodeapp.cn/http.html#http_http_request_options_callback
                        const req = http.request({
                            hostname: item.target.hostname,
                            port: item.target.port,
                            path: _path,
                            method: request.method,
                            headers: request.headers
                        }, (res) => {
                            res.setEncoding('utf8');

                            let responseData = "";
                            res.on('data', (chunk) => {
                                responseData += chunk;
                            });
                            res.on('end', () => {
                                let responseHeaders = res.headers;
                                responseHeaders['proxy-server'] = "Powered by OIPage@" + jsonfile.version;
                                responseHeaders['Access-Control-Allow-Origin'] = '*';
                                response.writeHead(res.statusCode, responseHeaders);
                                response.write(responseData);
                                response.end();
                            });
                        });

                        req.on('error', (e) => {
                            error(`      转发的时候遇到问题: ${e.message}`);
                            response.writeHead('500', {
                                'Content-type': "text/plain;charset=utf-8",
                                'Access-Control-Allow-Origin': '*',
                                "proxy-server": "Powered by OIPage@" + jsonfile.version
                            });
                            response.write(e + "");
                            response.end();
                        });

                        req.write(requestData);
                        req.end();

                        return;
                    }
                }

                url = url.split("?")[0];

                // 请求的文件路径
                let filePath = path.join(basePath, url == "/" ? "index.html" : url.replace(/^\//, ""));

                let dotName = /\./.test(filePath) ? filePath.match(/\.([^.]+)$/)[1] : "";

                let is404 = true;
                let doResponse = function (type, filePath) {
                    response.writeHead(200, {
                        'Content-type': (type || "text/plain") + ";charset=utf-8",
                        'Access-Control-Allow-Origin': '*',
                        'Server': "Powered by OIPage@" + jsonfile.version
                    });
                    response.write(fs.readFileSync(filePath));
                    is404 = false;
                };

                // 文件类型
                type = mineTypes[dotName];
                if (fs.existsSync(filePath) && !fs.lstatSync(filePath).isDirectory()) {
                    doResponse(type, filePath);
                } else {
                    for (let suffix of suffixs) {
                        if (fs.existsSync(filePath + suffix) && !fs.lstatSync(filePath + suffix).isDirectory()) {
                            type = mineTypes[suffix.replace(/^\./, "")];
                            doResponse(type, filePath + suffix);
                        }
                    }
                }

                if (is404) {
                    response.writeHead(404, {
                        'Content-type': "text/html;charset=utf-8",
                        'Access-Control-Allow-Origin': '*',
                        'Server': "Powered by OIPage@" + jsonfile.version
                    });
                    response.write(responseFileList(filePath));
                }

                response.end();
            });
        } catch (e) {
            error(e);

            response.writeHead(500, {
                'Content-type': "text/plain;charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Server': "Powered by OIPage@" + jsonfile.version
            });
            response.write(e + "");

            response.end();
        }

    });

    Server.listen(port);
    log('server running on port:' + port);
};