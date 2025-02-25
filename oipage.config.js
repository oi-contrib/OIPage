module.exports = {
    devServer: {
        port: 20000,
        baseUrl: "./"
    },
    module: {
        rules: [{ // 配置对文件的自定义处理
            test: /\.html$/, // 匹配文件，如果多个匹配到，只会选用第一个
            use(source) {
                // let context = this;
                // console.log(context);

                return source + "<!-- tips：自动添加的 -->";
            }
        }]
    }
};