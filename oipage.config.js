module.exports = {
    devServer: {
        // port: 20000,
        baseUrl: "./",
        cache: true,
        // proxy: {
        //     "/apidemo": {
        //         target: "http://127.0.0.1:8080",
        //         pathRewrite: { '^/apidemo': '' }
        //     }
        // },
        intercept: [{
            test: /\.do$/,
            handler(request, response) {
                response.writeHead(200, {
                    'Content-Type': "text/html;charset=utf-8",
                    'Access-Control-Allow-Origin': '*',
                    'Server': 'Powered by OIPage-http-server\'s intercept'
                });
                response.write("<div>自定义的 ok</div>");
                response.end();
            }
        }],
        // 404: function (filePath, url) {
        //     console.log("自定义 404 页面：", filePath, url);
        //     return "<h1>自定义的 404 页面</h1><p>你访问的页面不存在！</p>";
        // }
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