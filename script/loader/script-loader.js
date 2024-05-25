const qs = require("querystring");

module.exports = function (source) {

    if (!/node_modules/.test(this.resourcePath) && this.resourcePath.indexOf(process.env.OIPAGE_ROOT) > -1) {
        const incomingQuery = qs.parse(this.resourceQuery.slice(1));

        // type有值且不是dist的都是特殊文件，只是走流程，编译无意义
        if (!incomingQuery.type || incomingQuery.type == 'dist') {
            // console.log(this.resourcePath);
            // console.log(source);
        }

    }

    return source
};