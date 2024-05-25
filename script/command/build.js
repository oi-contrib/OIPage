const Webpack = require("webpack");
const { log } = require("devby");

const getWebpackConfig = require("../config/webpack.build");
const setEnv = require("./env");

module.exports = function (parsed) {
    const webpackConfig = getWebpackConfig(parsed);
    setEnv(parsed);

    // https://webpack.docschina.org/api/node/#webpack
    const compiler = Webpack(webpackConfig);

    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            console.error(err || stats.toJson().errors);
        }

        log("<日志> [OIPage] 打包完成：" + webpackConfig.output.path.replace(process.cwd(), '.') + "\n")
        compiler.close((closeErr) => {
            if (closeErr) console.error(closeErr);
        });
    });
};