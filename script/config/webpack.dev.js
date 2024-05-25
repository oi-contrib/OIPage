const getWebpackConfig = require("./webpack.config");
const path = require('path');

module.exports = function (parsed) {
    const config = getWebpackConfig(parsed);

    // H5环境
    if (parsed.platform == "h5") {
        config.devServer = {
            open: false,
            host: '0.0.0.0',
            port: 8080,
            hot: true,
            compress: false,
            historyApiFallback: true,
            static: {
                directory: path.join(process.cwd(), parsed.root, './public'),
            },
        };
    }

    // 其它环境
    else {
        config.output.path = path.resolve(process.cwd(), parsed.root, "./dist/dev/" + parsed.platform);
        config.output.pathinfo = true;

        config.watchOptions = {
            aggregateTimeout: 600, // 当第一个文件更改，会在重新构建前增加延迟
            poll: 1000, // 指定毫秒为单位进行轮询
            ignored: ['**/node_modules'], // 排除像 node_modules 如此庞大的文件夹
        };
    }

    return config;
};