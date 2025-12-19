const headFactory = require("./head.js");
const getPackage = require("./getPackage.js");

const head = headFactory();

// VISLite库
module.exports = {
    test: /^vislite$/,
    handler(request, response) {
        head["Content-Type"] = "application/javascript;charset=utf-8";
        head["ETag"] = "VISLite@v" + require("vislite/package.json").version;

        if (request.headers["if-none-match"] === head["ETag"]) {
            response.writeHead('304', head);
            response.end();
            console.log("<i> \x1b[1m\x1b[32m[OIPage-http-server] Cache File: VISLite\x1b[0m " + new Date().toLocaleString() + "\x1b[33m\x1b[1m 304\x1b[0m");;
            return;
        }

        response.writeHead(200, head);

        let source =getPackage("vislite/lib/index.umd.min.js");

        response.write(`let module = { exports: {} };
let exports = module.exports;
${source}
export let Canvas = module.exports.Canvas;
`);
        response.end();
    }
};