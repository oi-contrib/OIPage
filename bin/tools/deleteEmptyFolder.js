const { readdirSync, lstatSync, rmdirSync } = require("fs");
const { join } = require("path");

module.exports = function (rootPath) {
    (function deleteEmptyFolder(folderPath) {
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
    })(params.path);
};