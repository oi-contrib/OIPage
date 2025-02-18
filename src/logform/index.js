let getTitle = function (title) {
    return "➤ " + title;
};

let closeForm = function () {
    process.removeAllListeners("keypress");
    rl.close();
};

let selectView = (title, list, index) => {
    let txtArray = [];
    for (let i = 0; i < list.length; i++) {
        txtArray.push("    " + (i == index ? "●" : "○") + " " + list[i]);
    }

    linelog(`${title}\n${txtArray.join("\n")}\n`);
};

function logform(config) {
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
            if (index >= config.length) {
                closeForm();
                resolve(result);
            } else {
                let item = config[index];

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
                    selectView(title, item.value, selectIndex);
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
                            selectView(title, item.value, selectIndex);
                        }
                    };

                }

                // 非法类型
                else {
                    closeForm();
                    reject(new Error("Illegal type！"));
                }
            }

        };
        getResult(0);
    });
}