const path = require("path");
const writeFileSync = require("../../tool/writeFileSync");

module.exports = function (data) {
    let filepath = path.join(process.env.OIPAGE_CACHE, data.page);

    if (data.lang == "json") {
        let json, rawJSON = JSON.parse(data.source);

        if (data.page == "app") {
            json = {
                pages: rawJSON.pages
            };

            // 项目配置
            let project = {
                "projectname": data.manifest.name,
                "component2": true,
                "enableAppxNg": true,
                "enableNodeModuleBabelTransform": true
            };
            writeFileSync(path.join(process.env.OIPAGE_CACHE, "./mini.project.json"), JSON.stringify(project, null, 2));
        } else {
            json = {

            };
        }
        writeFileSync(filepath + ".json", JSON.stringify(json, null, 2));
    } else if (data.lang == "style") {
        writeFileSync(filepath + ".acss", data.source);
    } else if (data.lang == "template") {
        writeFileSync(filepath + ".axml", data.source);
    }
};