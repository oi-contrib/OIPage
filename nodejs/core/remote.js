const https = require('https');
const http = require('http');

exports.get = function (url, options = {}) {
    return new Promise((resolve, reject) => {

        let handler = /^https/.test(url) ? https : http;

        handler.get(url, res => {
            res.on('data', (data) => {
                if (options.json) {
                    resolve(JSON.parse(data.toString('utf8')));
                } else {
                    resolve(data);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
};

exports.post = function (url, options = {}) {
    return new Promise((resolve, reject) => {

        let handler = /^https/.test(url) ? https : http;

        let execArray = /https*:\/\/([^\/]+)(.+)?/.exec(url);
        let hostport = execArray[1].split(":");

        const req = handler.request({
            hostname: hostport[0],
            port: hostport[1] || 80,
            path: execArray[2] || "/",
            method: "POST",
            headers: options.header || {}
        }, (res) => {
            res.setEncoding('utf8');

            let data = "";
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (options.json) {
                    resolve(JSON.parse(data.toString('utf8')));
                } else {
                    resolve(data);
                }
            });
        });

        req.write(options.params || "{}");

        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    });
};
