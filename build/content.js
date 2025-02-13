const packageValue = require("../package.json");

let banner = (itemName) => {
    return `/*!
* ${itemName} of OIPage v${packageValue.version}
* git+https://github.com/oi-contrib/OIPage.git
*/`
};

exports.nodejsContent = function (itemName, content, config) {

    // 导入
    let importValue = ``;
    for (let importItem in config.import) {
        importValue += `const {${config.import[importItem].join(",")}} = require("../${importItem}/index.js");`;
    }

    // 导出
    let exportValue = ``;
    for (let exportKey of config.export) {
        exportValue += `exports.${exportKey} = ${exportKey};
`;
    }

    return `${banner(itemName)}
${importValue}
${content}
${exportValue}`;
};

exports.webContent = function (itemName, content, config) {

    // 导入
    let importValue = ``;
    for (let importItem in config.import) {
        importValue += `import {${config.import[importItem].join(",")}} from "../${importItem}/index.js";`;
    }

    // 导出
    for (let exportKey of config.export) {
        content = content.replace("function " + exportKey + "(", "export function " + exportKey + "(");
    }

    return `${banner(itemName)}
${importValue}
${content}`;
};