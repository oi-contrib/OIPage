const headFactory = require("./head.js");
const getPackage = require("./getPackage.js");

const head = headFactory();

// Zipaper框架
module.exports = {
    test: /^zipaper$/,
    handler(request, response) {
        head["Content-Type"] = "application/javascript;charset=utf-8";
        head["ETag"] = "Zipaper@v" + require("zipaper/package.json").version;

        if (request.headers["if-none-match"] === head["ETag"]) {
            response.writeHead('304', head);
            response.end();
            console.log("<i> \x1b[1m\x1b[32m[OIPage-http-server] Cache File: Zipaper\x1b[0m " + new Date().toLocaleString() + "\x1b[33m\x1b[1m 304\x1b[0m");;
            return;
        }

        response.writeHead(200, head);

        let source = getPackage("zipaper/dist/Zipaper.min.js");

        response.write(`let module = { exports: {} };
let exports = module.exports;
${source}
export let createApp = exports.createApp;
export let defineDirective = exports.defineDirective;
export let defineElement = exports.defineElement;
export let defineRouter = exports.defineRouter;
export let ref = exports.ref;
export let reactive = exports.reactive;
export let watcher = exports.watcher;
`);
        response.end();
    }
};