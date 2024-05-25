const path = require("path");

// 对齐命令行解析后的参数
exports.command = function (parsed) {
    return {

        // 生产还是开发
        mode: Array.isArray(parsed.build) ? "production" : "development",

        // 平台
        platform: (Array.isArray(parsed.build) ? parsed.build[0] : parsed.dev[0]) || "h5",

        // 项目根目录
        root: (Array.isArray(parsed.root) && parsed.root[0]) ? parsed.root[0] : "./"
    };
};