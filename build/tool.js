const { readdirSync, unlinkSync, lstatSync, existsSync, rmdirSync } = require('fs');
const { join } = require('path');

// 删除文件或文件夹
exports.deleteSync = function deleteSync(target) {
    if (!existsSync(target)) return;
    if (!lstatSync(target).isDirectory()) {
        unlinkSync(target);
    } else {
        const subFiles = readdirSync(target);
        subFiles.forEach(function (file) {
            const curPath = join(target, "./" + file);
            deleteSync(curPath);
        });
        rmdirSync(target);
    }
};