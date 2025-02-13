const { watch, mkdirSync, readdirSync, writeFileSync, readFileSync, copyFileSync } = require("fs");
const { join } = require("path");
const { deleteSync } = require("oipage");
const { nodejsContent, webContent } = require("./content");

let index = 0;
function logInfo(txt, notWatch) {
    let txts = txt.split("\n");
    for (let val of txts) {
        console.log("<" + (notWatch ? "i" : index) + "> \x1b[1m\x1b[32m[OIPage-bundle-setup] " + val + "\x1b[0m");
    }
}

function forEachItem(callback) {
    const subFiles = readdirSync("./src");
    subFiles.forEach(function (itemName) {
        let indexJson = JSON.parse(readFileSync(join("./src", itemName, "index.json"), {
            encoding: "utf8"
        }));
        callback(itemName, indexJson, readFileSync(join("./src", itemName, "index.js"), {
            encoding: "utf8"
        }));
    });
}

function doBuild(notWatch) {
    index += 1;

    let startTime = new Date().valueOf();
    console.log("");

    logInfo("Build is running:", notWatch);

    deleteSync("./nodejs");
    mkdirSync("./nodejs");

    let nodejsItems = [];
    forEachItem(function (itemName, config, content) {
        if (config.type.indexOf("nodejs") > -1) {
            nodejsItems.push(itemName);
            mkdirSync(join("./nodejs", itemName));
            copyFileSync(join("./src", itemName, "index.d.ts"), join("./nodejs", itemName, "index.d.ts"));
            writeFileSync(join("./nodejs", itemName, "index.js"), nodejsContent(itemName, content, config));
        }
    });
    logInfo("Current Bundle On Node.js: \x1b[0m\x1b[36m" + nodejsItems.join(" "), notWatch);

    deleteSync("./web");
    mkdirSync("./web");

    let webItems = [];
    forEachItem(function (itemName, config, content) {
        if (config.type.indexOf("web") > -1) {
            webItems.push(itemName);
            mkdirSync(join("./web", itemName));
            copyFileSync(join("./src", itemName, "index.d.ts"), join("./web", itemName, "index.d.ts"));
            writeFileSync(join("./web", itemName, "index.js"), webContent(itemName, content, config));
        }
    });
    logInfo("Current Bundle On Web: \x1b[0m\x1b[36m" + webItems.join(" "), notWatch);

    console.log("\n本次打包用时：" + (new Date().valueOf() - startTime) + "ms");
}

if (process.argv[2] == "watch") {
    console.log("\x1b[37m\x1b[44m INFO \x1b[0m Starting development Server");
    let hadWill = false;
    watch("./src", {
        recursive: true
    }, function () {

        // 如果在很短时间内同一个任务需要执行，只执行一次即可
        if (!hadWill) {

            // 记录有未完成任务
            hadWill = true;
            setTimeout(function () {

                // 执行
                doBuild();

                // 标记任务完成
                hadWill = false;
            }, 1000);
        }
    });
    doBuild();
    console.log("\n\x1b[30m\x1b[42m DONE \x1b[0m\x1b[32m Watched successfully by OIPage\x1b[0m");
    console.log("\n监听文件改变......");
} else {
    console.log("\x1b[37m\x1b[44m INFO \x1b[0m Starting Compile Builder");
    doBuild(true);
    console.log("\n\x1b[30m\x1b[42m DONE \x1b[0m\x1b[32m Compiled successfully by OIPage\x1b[0m\n");
}
