const { getTitle } = require("./common");
const { logView } = require("./select");
const { linelog } = require("../core/log");

module.exports = function (form) {
    const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(function (resolve, reject) {
        let result = [], keyback = () => { };

        console.log("");

        process.stdin.on("keypress", (_str, key) => {
            keyback(key.name);
        });

        let getResult = (index) => {
            if (index >= form.length) {
                process.removeAllListeners("keypress");
                rl.close();
                resolve(result);
            } else {
                let item = form[index];

                // 文本输入
                if (item.type == "input") {

                    rl.question(getTitle(item.label), (answer) => {
                        result.push(answer);
                        setTimeout(() => {
                            console.log("");
                            getResult(index + 1);
                        }, 50);
                    });

                }

                // 列表选择
                else if (item.type == "select") {
                    let title = getTitle(item.label);

                    let selectIndex = 0;
                    logView(title, item.value, selectIndex);
                    keyback = (keyname) => {
                        if (keyname == "return") {
                            result.push(selectIndex);
                            keyback = () => { };
                            linelog();
                            setTimeout(() => {
                                getResult(index + 1);
                            }, 50);
                        } else {
                            if (keyname == "left" || keyname == "up") {
                                if (selectIndex > 0) selectIndex -= 1;
                                else selectIndex = item.value.length - 1;
                            } else if (keyname == "right" || keyname == "down") {
                                if (selectIndex < item.value.length - 1) selectIndex += 1;
                                else selectIndex = 0;
                            } else {
                                return;
                            }
                            logView(title, item.value, selectIndex);
                        }
                    };

                }

                // 非法类型
                else {
                    throw new Error("Illegal type！");
                }
            }

        };
        getResult(0);
    });
};