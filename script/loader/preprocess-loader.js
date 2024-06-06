const qs = require('querystring');

module.exports = function (source) {
    const incomingQuery = qs.parse(this.resourceQuery.slice(1));

    // type有值且不是dist的都是特殊文件，预处理没有意义
    if (!incomingQuery.type || incomingQuery.type == 'dist') {

        // 支付宝小程序不支持全局挂载，先从源码层面注入
        if (process.env.OIPAGE_PLATFORM == "mp-alipay") {
            if (!(/runtime\/mp-alipay\/index\.js$/.test(this.resourcePath)) && /\.js$/.test(this.resourcePath)) {
                if (/src\/app\.js$/.test(this.resourcePath)) {
                    source = `var oi=null;
                    var interval = setInterval(()=>{ 
                        if(my.__global__oipage__){
                            oi=my.__global__oipage__;
                            clearInterval(interval);
                        } 
                    },10);` + source;
                } else {
                    source = `var oi = my.__global__oipage__;` + source;
                }
            }
        }

    }

    return source;
};