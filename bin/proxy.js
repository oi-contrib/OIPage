const https = require('https');
const http = require('http');

module.exports = function (args, proxy) {

    let intercept = [];
    for (let key in proxy) {
        intercept.push({
            test: new RegExp("^" + key),
            handler(request, response) {
                let proxyItem = proxy[key];

                let throwError = function (err) {
                    response.writeHead(500, {
                        'Content-Type': "text/plain;charset=utf-8",
                        'Access-Control-Allow-Origin': '*',
                        'Server': 'Powered by ' + args.name + "@" + args.version + ' proxy'
                    });
                    response.write(err);
                    response.end();
                };

                let headers = request.headers;
                let url = decodeURIComponent(request.url);

                if (proxyItem.pathRewrite) {
                    for (pathRewrite_key in proxyItem.pathRewrite) {
                        url = url.replace(new RegExp(pathRewrite_key), proxyItem.pathRewrite[pathRewrite_key]);
                    }
                }

                let fullUrl = proxy[key].target + url;

                let handler = /^https/.test(url) ? https : http;

                let execArray = /https*:\/\/([^\/]+)(.+)?/.exec(fullUrl);
                let hostport = execArray[1].split(":");

                // 创建与目标服务器的连接
                const req = handler.request({
                    hostname: hostport[0],
                    port: hostport[1] || 80,
                    path: execArray[2] || "/",
                    method: request.method,
                    headers
                }, (res) => {

                    let resHeaders = {
                        ...res.headers
                    }

                    // 标记响应服务器
                    delete resHeaders["server"];
                    resHeaders["Server"] = 'Powered by ' + args.name + "@" + args.version + ' proxy';

                    // 设置响应头
                    response.writeHead(res.statusCode, resHeaders);
                    // 流式传输响应体
                    res.pipe(response);
                });

                // 错误处理
                req.on('error', (e) => {
                    throwError(e.message);
                });

                // 将原始请求体传递给目标服务器
                request.pipe(req);

            }
        });
    }

    return intercept;
};
