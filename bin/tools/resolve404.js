const { readdirSync, lstatSync, readFileSync, statSync } = require("fs");
const { join } = require("path");
const { formatByte, formatTime } = require("./format");
const mineTypes = require("../data/mineTypes.json");

const img_folder = "data:image/png;base64," + readFileSync(join(__dirname, "../images/folder.png")).toString('base64');
const img_file = "data:image/png;base64," + readFileSync(join(__dirname, "../images/file.png")).toString('base64');

const template_404 = readFileSync(join(__dirname, "../template/404.html"), {
    encoding: "utf8"
})
    .replace("${img_folder}", img_folder)
    .replace("${img_file}", img_file);

module.exports = function (filePath, url) {

    let subItems = [];

    try {
        subItems = readdirSync(filePath);
        console.log("<i> \x1b[1m\x1b[32m[OIPage-dev-server] Read Folder: " + url + '\x1b[0m ' + new Date().toLocaleString());
    } catch (e) {
        console.log("<i> \x1b[1m\x1b[32m[OIPage-dev-server] Read " + (/\/$/.test(url) ? "Folder" : "File") + ": \x1b[35m" + url + ' 404 Not Found\x1b[0m ' + new Date().toLocaleString());
        try {
            if (!/\/$/.test(url) || url === "/") {
                filePath = join(filePath, "../");
                subItems = readdirSync(filePath);
            }
        } catch (e) { }
    }

    let template = "";
    for (let i in subItems) {
        let isDirectory = lstatSync(join(filePath, subItems[i])).isDirectory();
        let statObj = statSync(join(filePath, subItems[i]));

        // 文件夹
        if (isDirectory) {
            template += `<tr class="folder">
            <th class="name">
                <a href='./${subItems[i]}/'>${subItems[i]}</a>
            </th>
            <th>
                ${formatTime(statObj.mtime)}
            </th>
            <th>
                文件夹
            </th>
            <th>
                -
            </th>
            <th>
                <a href='./${subItems[i]}/' class="btn">打开</a>
            </th>
        </tr>`;
        }

        // 文件
        else {
            let dotName = /\./.test(subItems[i]) ? subItems[i].match(/\.([^.]+)$/)[1] : "";

            template += `<tr class="file">
            <th class="name">
                <a href='./${subItems[i]}'>${subItems[i]}</a>
            </th>
            <th>
                ${formatTime(statObj.mtime)}
            </th>
            <th>
                ${mineTypes[dotName] || "text/plain"}
            </th>
            <th>
            ${formatByte(statObj.size)}
        </th>
            <th>
                <a href='./${subItems[i]}' class="btn">访问</a>
                <a href='./${subItems[i]}?download' class="btn" download='${subItems[i]}'>下载</a>
            </th>
        </tr>`;
        }
    }

    return template_404.replace("${current}", filePath).replace("${template}", template);
};