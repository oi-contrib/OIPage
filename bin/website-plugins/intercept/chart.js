const headFactory = require("./head.js");

const head = headFactory();

// 聊天
module.exports = {
    test: /^\/chart\//,
    handler(request, response, wsHandler) {
        let url = decodeURIComponent(request.url);

        let requestData = "";

        request.on('data', (chunk) => {
            requestData += chunk;
        });

        request.on('end', () => {

            if (/sendMsg$/.test(url)) {
                wsHandler.notifyBrowser({
                    payloadData: requestData
                });
            }

            head["Content-Type"] = "application/json;charset=utf-8";
            response.writeHead(200, head);
            response.write(JSON.stringify({
                code: "000000"
            }));
            response.end();

        });
    }
};