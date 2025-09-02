module.exports = {
    devServer: {
        port: 20000,
        baseUrl: "./",
        cache: true,
        intercept: [{
            test: /\.do$/,
            handler(request, response) {
                response.writeHead(200, {
                    'Content-type': "text/html;charset=utf-8",
                    'Access-Control-Allow-Origin': '*',
                    'Server': 'Powered by OIPage-dev-server\'s intercept'
                });
                response.write("<div>自定义的 ok</div>");
                response.end();
            }
        }]
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