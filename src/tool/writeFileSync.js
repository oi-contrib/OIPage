const fs = require('fs');
const path = require('path');

module.exports = function (filepath, data) {

    // 如果文件夹不存在，创建
    if (!fs.existsSync(path.resolve(filepath, "../"))) {
        fs.mkdirSync(path.resolve(filepath, "../"), { recursive: true });
    }

    fs.writeFileSync(filepath, data);
};