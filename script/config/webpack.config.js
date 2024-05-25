const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const entrys = require("./entrys");
const OIPageTimePlugin = require("../plugin/oipage-time-plugin");

module.exports = function (parsed) {

    const config = {

        // 入口
        entry: entrys(parsed),

        // 指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」
        // 差异的在后续判断后设置
        output: {
            publicPath: "",
            clean: true
        },

        // 如何处理项目中的不同类型的模块
        // 部分内容的处理方式应该区分dev和build以满足不同场景的要求
        module: {

            // rules是从后往前，一个个匹配，成功一个就运行一个
            rules: [{
                test: /\.js$/,

                // 和rules不同，表示当匹配到一个规则的时候，就不再匹配其他的了
                oneOf: [{
                    resourceQuery: /type=app/, // 入口
                    loader: path.resolve(__dirname, "../loader/oipage-loader.js")
                }, {
                    resourceQuery: /type=page/, // 单页
                    loader: path.resolve(__dirname, "../loader/oipage-loader.js")
                }]
            }, {
                oneOf: [{
                    resourceQuery: /type=disk/, // 需要手动写入磁盘的
                    loader: path.resolve(__dirname, "../loader/cache-loader.js")
                }]
            }, {
                test: /\.html$/,
                use: [
                    path.resolve(__dirname, "../loader/template-loader.js"),
                    path.resolve(__dirname, "../loader/xhtml-loader.js"),
                    path.resolve(__dirname, "../loader/preprocess-loader.js")
                ]
            }, {
                test: /\.js$/,
                use: [
                    path.resolve(__dirname, "../loader/script-loader.js"),
                    path.resolve(__dirname, "../loader/preprocess-loader.js")
                ]
            }, {
                test: /\.(scss|css)$/,
                use: [
                    path.resolve(__dirname, "../loader/style-loader.js"),
                    path.resolve(__dirname, "../loader/scss-loader.js"),
                    path.resolve(__dirname, "../loader/preprocess-loader.js")
                ]
            }]
        },

        // 是否生成，以及如何生成 source map
        devtool: false,

        // 模式
        mode: parsed.mode,

        // 插件
        plugins: [
            new OIPageTimePlugin()
        ],

        // 启用 Watch 模式
        // 这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改
        // 由于h5版本使用的devServer，因此不需要开启
        watch: parsed.mode == "development" && parsed.platform != "h5",

        // 配置模块如何解析
        resolve: {

            // 告诉 webpack 解析模块时应该搜索的目录
            modules: [
                "node_modules",
                path.resolve(process.cwd(), parsed.root, "./node_modules"),
                path.resolve(process.cwd(), parsed.root, "./src")
            ],

            // 尝试按顺序解析这些后缀名
            extensions: [".js", ".json", ".css", ".html"],

            // 创建 import 或 require 的别名，来确保模块引入变得更简单
            alias: {
                "@": path.resolve(process.cwd(), parsed.root, "./src"),
                "@oipage/runtime": path.resolve(__dirname, '../../src/runtime/' + parsed.platform + '/index.js'), // runtime时的全局API
                "@oipage/style": path.resolve(__dirname, '../../src/runtime/' + parsed.platform + '/style.scss'), // runtime时的初始化style
            }
        },

        // 这组选项与上面的 resolve 对象的属性集合相同， 但仅用于解析 webpack 的 loader 包
        resolveLoader: {}
    };

    // H5环境
    if (parsed.platform == "h5") {
        config.plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../public/index.htm'),
            title: "OIPage"
        }));

        config.output.filename = "static/js/[name].[contenthash:8].js";
        config.output.chunkFilename = "static/js/[name].[contenthash:8].js";

        // H5时候的内置框架
        config.resolve.alias["@oipage/render"] = path.resolve(__dirname, '../../src/platform/h5/index.js');
    }

    // 其它环境
    else {
        config.output.filename = "[name].js";
        config.output.chunkFilename = "[id].js";
    }

    return config;
};