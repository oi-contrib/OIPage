const qs = require("querystring");
const path = require("path");

module.exports = function () {
    const incomingQuery = qs.parse(this.resourceQuery.slice(1));

    let type = incomingQuery.type;
    let filename = incomingQuery.page;
    let code = `import startUp from "./${filename}.js";`;

    if (process.env.OIPAGE_PLATFORM == "h5") {
        if (type == 'app') {
            let config = require(path.resolve(process.env.OIPAGE_ROOT, "./src/app.json"));

            code += `let lazyPage ={`;
            for (let index = 0; index < config.pages.length; index++) {
                code += `"/${config.pages[index]}":()=>import("${config.pages[index]}.js?type=page"),`;
            }
            code += `};`;

            code += `import "@oipage/style";
            import "./app.css";
            import runtime from "@oipage/runtime";
            import render from "@oipage/render";
            runtime();
            startUp(function(option) { 
                render(document.getElementById("root"), option, lazyPage); 
            });`;
        } else {
            code = `
            import startUp from "./index.js";
            import "./index.css";
            import config from "./index.json";
            import template from "./index.html";
            export default function(view){
                startUp(function(option){
                    view(template,option,config);
                });
            }`;
        }
    } else {
        code += `import "./${filename}.json?type=disk&page=${incomingQuery.page}&lang=json";`;
        code += `import "./${filename}.css?type=disk&page=${incomingQuery.page}&lang=style";`;

        if (type == 'app') {
            code += `import runtime from "@oipage/runtime";runtime();`;
            code += `startUp(App);`;
        } else {
            code += `import "./${filename}.html?type=disk&page=${incomingQuery.page}&lang=template";`;
            code += `startUp(Page);`;
        }
    }

    return code;
};