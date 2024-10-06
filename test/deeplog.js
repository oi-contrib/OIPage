const OIPage = require('../nodejs/index');
const animation = require('vislite').animation;

animation(function (deep) {
    OIPage.deeplog(deep * 100, "完成进度：" + (deep * 100).toFixed(2) + "%");
}, 10000);