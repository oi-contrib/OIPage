const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { log } = require("devby");

const getWebpackConfig = require("../config/webpack.dev");
const setEnv = require("./env");

module.exports = function (parsed) {
    const webpackConfig = getWebpackConfig(parsed);
    setEnv(parsed);

    if (parsed.platform == "h5") {
        const compiler = Webpack(webpackConfig);

        // https://webpack.docschina.org/api/webpack-dev-server
        const server = new WebpackDevServer(webpackConfig.devServer, compiler);

        server.start().then(function () {
            // todo
        });
    } else {
        Webpack(webpackConfig, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.error(err || stats.toJson().errors);
            }

            // 编译成功后的逻辑
            if (stats) console.log(stats.toString({ colors: true }) + "\n");
        });

        log("<日志> [OIPage] 启动监听：" + parsed.platform + "\n");

    }

};