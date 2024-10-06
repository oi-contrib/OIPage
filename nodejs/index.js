const { deleteSync, copySync, moveSync, listFileSync, fullPathSync } = require('./core/file');
const { log, warn, error, linelog, deeplog } = require('./core/log');
const options = require('./core/options');
const { get, post } = require('./core/remote');
const network = require('./core/network');
const mimeTypes = require('./data/mime.types');
const server = require('./core/server');
const { toBase64 } = require('./core/image');

const simpleScss = require('./loader/simpleScss');
const xhtml = require('./loader/xhtml');

module.exports = {

    // 命令行相关
    options,

    // 文件操作相关
    deleteSync, copySync, moveSync, listFileSync, fullPathSync,

    // 图片相关
    toBase64,

    // 日志打印
    log, warn, error,

    // 单行打印
    linelog,

    // 进度打印
    process: deeplog, // 向下兼容
    deeplog,

    // 请求
    get, post,

    // 查看网络信息
    network,

    // 文件类型
    mimeTypes,

    // 服务器
    server,

    // 文件解析Loader
    simpleScss, xhtml
};