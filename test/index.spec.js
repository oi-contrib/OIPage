const { animation } = require("../nodejs/animation/index.js");
const { deeplog, linelog } = require("../nodejs/cmdlog/index.js");
const { throttle } = require("../nodejs/throttle/index.js");
const { logform } = require("../nodejs/logform/index.js");
const { deleteDisk, copyDisk, moveDisk, listDisk } = require("../nodejs/disk/index.js");
const { reader } = require("../nodejs/reader/index.js");
const { strToJson } = require('../nodejs/json/index.js');

/* 测试一：引入 */

let apis = {
    animation, deeplog, linelog, throttle, logform, deleteDisk, copyDisk, moveDisk, listDisk, reader, strToJson
};

for (let apiName in apis) {
    console.log("【" + apiName + "】", apis[apiName]);
}

/* 测试二：单元测试 */
