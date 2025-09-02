const OIPageScssLoader = require("./oipage-scss-loader.js");
const OIPageHtmlLoader = require("./oipage-html-loader.js");

module.exports = {
    rules: [{
        test: /\.scss$/,
        use: OIPageScssLoader
    }, {
        test: /\.html$/,
        use: OIPageHtmlLoader
    }]
};