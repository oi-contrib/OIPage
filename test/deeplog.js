const OIPage = require('../nodejs/index');

let deep = 0;
let interval = setInterval(function () {
    OIPage.deeplog(deep * 100, "完成进度：" + (deep * 100).toFixed(2) + "%\n");

    if (deep < 1) {
        deep += Math.random() * 0.1;

        if (deep > 1) deep = 1;
    } else {
        clearInterval(interval);
    }
}, 40);