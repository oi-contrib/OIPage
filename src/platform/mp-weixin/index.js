const path = require("path");
const writeFileSync= require("../../tool/writeFileSync");

module.exports = function (data) {
    let filepath = path.join(process.env.OIPAGE_CACHE, data.page);

    if (data.lang == "json") {
        let json = {}, rawJSON = JSON.parse(data.source);

        if (data.page == "app") {
            json = {
                pages: rawJSON.pages
            };

            // 项目配置
            let project = {

            };
            writeFileSync(path.join(process.env.OIPAGE_CACHE, "./project.config.json"), JSON.stringify(project, null, 2));
        } else {
            json = {

            };
        }
        writeFileSync(filepath + ".json", JSON.stringify(json, null, 2));
    } else if (data.lang == "style") {
        writeFileSync(filepath + ".wxss", data.source);
    } else if (data.lang == "template") {
        writeFileSync(filepath + ".wxml", data.source);
    }
};