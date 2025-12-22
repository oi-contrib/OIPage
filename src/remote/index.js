const https = require('https');
const http = require('http');

let doResolve = (res, resolve) => {
    res.setEncoding('utf8');

    let data = "";
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        resolve({
            data: data.toString('utf8'),
            headers: res.headers
        });
    });
}

// GET请求
function get(url, headers = {}) {
    return new Promise((resolve, reject) => {

        let handler = /^https/.test(url) ? https : http;

        // https://nodejs.org/download/release/v16.8.0/docs/api/http.html#http_http_get_options_callback
        handler.get(url, {
            headers
        }, res => {
            doResolve(res, resolve)
        }).on('error', (e) => {
            reject(e);
        });
    });
};

// POST请求
function post(url, headers = {}, params = {}) {
    return new Promise((resolve, reject) => {

        let handler = /^https/.test(url) ? https : http;

        let execArray = /https*:\/\/([^\/]+)(.+)?/.exec(url);
        let hostport = execArray[1].split(":");

        // https://nodejs.org/download/release/v16.8.0/docs/api/http.html#http_http_request_options_callback
        const req = handler.request({
            hostname: hostport[0],
            port: hostport[1] || 80,
            path: execArray[2] || "/",
            method: "POST",
            headers
        }, (res) => {
            doResolve(res, resolve);
        });

        req.write(JSON.stringify(params));

        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    });
};
