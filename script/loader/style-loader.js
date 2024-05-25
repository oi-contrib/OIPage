/**
 *
 * loader:[loader3,loader2,loader1]
 *
 * 执行顺序：
 *
 * picth3 -> pitch2 -> pitch1
 *
 * -> loader1 -> loader2 -> loader3
 *
 * 特别注意：如果pitch有return，会提前返回执行
 *
 */

const loaderUtils = require('loader-utils');
const path = require("path");

let loaderApi = () => { };

if (process.env.OIPAGE_PLATFORM == "h5") {
    loaderApi.pitch = function (remainingRequest) {

        let request = loaderUtils.stringifyRequest(this, '!!' + remainingRequest);
        let addStylesClientPath = loaderUtils.stringifyRequest(this, '!' + path.join(__dirname, '../../src/tool/addStylesClient.js'));

        let help = process.env.OIPAGE_MODE == "development" ? (JSON.stringify(`/* ` + remainingRequest.replaceAll(process.env.OIPAGE_ROOT, "") + ` */
        `) + "+") : "";

        return `// style-loader: Adds some css to the DOM by adding a <style> tag
        
// load the styles
var content = require(${request});

// add the styles to the DOM
var add = require(${addStylesClientPath}).default;
add(${help}content.default);
`;
    };
} else {
    loaderApi = function (source) {
        return source;
    };
}

module.exports = loaderApi;