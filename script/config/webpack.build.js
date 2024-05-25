const getWebpackConfig = require("./webpack.config");
const path = require('path');

module.exports = function (parsed) {
    const config = getWebpackConfig(parsed);

    config.output.path = path.resolve(process.cwd(), parsed.root, "./dist/build/" + parsed.platform);
    config.output.pathinfo = false;

    return config;
};