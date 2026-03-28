const { animation } = require("../nodejs/animation/index.js");
const { deeplog, linelog } = require("../nodejs/cmdlog/index.js");
const { throttle } = require("../nodejs/throttle/index.js");
const { logform } = require("../nodejs/logform/index.js");
const { deleteDisk, copyDisk, moveDisk, listDisk, linkDisk, readPlain, writePlain, readJSON, writeJSON } = require("../nodejs/disk/index.js");
const { reader } = require("../nodejs/reader/index.js");
const { strToJson } = require('../nodejs/json/index.js');
const { initOption, mergeOption } = require("../nodejs/option/index.js");

/* 测试一：引入 */

let apis = {
    animation, deeplog, linelog, throttle, logform, deleteDisk, copyDisk, moveDisk, listDisk, linkDisk, readPlain, writePlain, readJSON, writeJSON, reader, strToJson, initOption, mergeOption
};

for (let apiName in apis) {
    console.log("【" + apiName + "】", apis[apiName]);
}

/* 测试二：单元测试 */

const { Unit } = require('@oipage/testjs');

let { describe, it, expect } = Unit.node();

describe("strToJson", () => {
    it("{key:'value'}", () => {
        expect(strToJson("{key:'value'}")).toEqual({ key: "value" })
    });
});

describe("option", () => {
    it("initOption", () => {
        expect(initOption({}, {})).toEqual({});
    })
    it("mergeOption", () => {
        let myOption = { key: "oldValue" };
        let newOption = { key: "newValue", newKey: "newValue" };
        mergeOption(myOption, newOption);

        expect(myOption).toEqual({ key: "newValue", newKey: "newValue" });
    });
});

describe("readJSON, writeJSON", () => {
    let obj = { key: "value" }, filePath = "test-" + new Date().getTime() + ".json";

    writeJSON(filePath, obj);

    it("readJSON", () => {
        expect(readJSON(filePath)).toEqual(obj);

        require("fs").unlinkSync(filePath);
    });
});