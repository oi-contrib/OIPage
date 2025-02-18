const { join } = require("path");
const { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync, mkdirSync, copyFileSync } = require("fs");

/**
 * 删除文件或文件夹
 * @param {string} diskPath 
 */
function deleteDisk(diskPath) {
    // 如果文件夹不存在，直接返回即可
    if (!existsSync(diskPath)) return;

    // 如果是文件，直接删除即可
    if (!lstatSync(diskPath).isDirectory()) {
        unlinkSync(diskPath);
    } else {

        // 读取子文件
        const subFiles = readdirSync(diskPath);

        subFiles.forEach(function (item) {

            // 调用这个方法，删除子文件或文件夹
            const curPath = join(diskPath, "./" + item);
            deleteDisk(curPath);

        });

        // 等子文件或文件夹删除完毕以后，删除本文件夹
        rmdirSync(diskPath);
    }
}

/**
 * 复制文件或文件夹
 * @param {string} sourcePath 
 * @param {string} targetPath 
 * @param {boolean} isForce 可选，是否强制执行 
 */
function copyDisk(sourcePath, targetPath, isForce) {

    // 如果源文件不存在
    if (!existsSync(sourcePath)) {
        console.log("\x1b[0m\x1b[31m" + sourcePath + "\x1b[0m");
        throw new Error("OIPage: The source path does not exist.");
    }

    // 如果模板文件已经存在
    if (existsSync(targetPath)) {
        if (isForce) {
            deleteDisk(targetPath);
        } else {
            console.log("\x1b[0m\x1b[31m" + targetPath + "\x1b[0m");
            throw new Error("OIPage: The target path already exists.");
        }
    }

    (function copyDiskFun(sourcePath, targetPath) {
        // 如果是文件，直接复制即可
        if (!lstatSync(sourcePath).isDirectory()) {
            copyFileSync(sourcePath, targetPath);
        } else {

            // 读取子文件
            const subFiles = readdirSync(sourcePath);

            // 如果文件夹不存在，创建
            if (!existsSync(targetPath)) {
                mkdirSync(targetPath, { recursive: true });
            }

            // 复制子文件或文件夹
            subFiles.forEach(function (item) {
                copyDiskFun(join(sourcePath, "./" + item), join(targetPath, "./" + item));
            });

        }
    })(sourcePath, targetPath);
}