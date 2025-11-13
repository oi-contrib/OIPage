const { deleteDisk, copyDisk, moveDisk } = require("../nodejs/disk");

module.exports = function (config) {
    let isForce = false;

    // 判断是否开启强制执行
    for (let i = 0; i < config.value.length; i++) {
        if (config.value[i].name === "--force") isForce = true;
    }

    // 执行一个个任务
    for (let i = 0; i < config.value.length; i++) {

        // 删除文件或文件夹
        if (config.value[i].name === "--delete") {
            for (let j = 0; j < config.value[i].value.length; j++) {
                deleteDisk(config.value[i].value[j]);
            }
        }

        // 移动文件或文件夹
        else if (config.value[i].name === "--move") {
            moveDisk(config.value[i].value[0], config.value[i].value[1], isForce);
        }

        // 复制文件或文件夹
        else if (config.value[i].name === "--copy") {
            copyDisk(config.value[i].value[0], config.value[i].value[1], isForce);
        }
    }
};