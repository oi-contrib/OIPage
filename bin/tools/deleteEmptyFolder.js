const { readdirSync, lstatSync, rmdirSync, existsSync } = require("fs");
const { join } = require("path");

module.exports = function (rootPath) {

    // 命令地方已经确保是全路径
    // rootPath = path.resolve(rootPath);

    // 路径不存在，什么也不用干
    if (!existsSync(rootPath)) {
        console.log("路径不存在：\x1b[31m" + rootPath + "\x1b[0m");
        return;
    }

    ; (function deleteEmptyFolder(folderPath) {
        let subItems = readdirSync(folderPath);
        if (subItems.length > 0) {
            for (let i = 0; i < subItems.length; i++) {
                let itemPath = join(folderPath, subItems[i]);
                if (lstatSync(itemPath).isDirectory()) deleteEmptyFolder(itemPath);
            }
        } else {
            rmdirSync(folderPath);

            folderPath = join(folderPath, "..");
            while (folderPath.length >= rootPath.length) {
                subItems = readdirSync(folderPath);
                if (readdirSync(folderPath).length > 0) break;
                rmdirSync(folderPath);
                folderPath = join(folderPath, "..");
            }
        }
    })(rootPath);
};