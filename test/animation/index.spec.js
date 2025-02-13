const { animation } = require("../../nodejs/animation/index");
const { deeplog } = require('../../nodejs/cmdlog/index');

let { stop } = animation((deep) => {
    deeplog(deep * 100, "动画进度：" + (deep * 100).toFixed(2) + "%\n");
}, 5000, (deep) => {
    console.log("结束：deep=" + deep);
});

setTimeout(function () {
    stop();
}, 500);