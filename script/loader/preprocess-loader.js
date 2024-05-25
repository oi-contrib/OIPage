const qs = require('querystring');

module.exports = function (source) {
    const incomingQuery = qs.parse(this.resourceQuery.slice(1));

    // type有值且不是dist的都是特殊文件，预处理没有意义
    if (!incomingQuery.type || incomingQuery.type == 'dist') {
        // console.log(source)
    }

    return source;
};