/**
 * 把字节转换成更可读的内容
 * @param {*} value 
 * @returns 
 */
exports.formatByte = function (value) {
    if (value < 1024) return value + "Byte";

    let kb = value / 1024;
    if (kb < 1024) return kb.toFixed(1) + "KB";

    let mb = kb / 1024;
    if (mb < 1024) return mb.toFixed(1) + "MB";

    let gb = mb / 1024;
    return gb.toFixed(1) + "GB";
};

/**
 * 把时间变成更可读的格式
 * @param {*} value 
 * @returns 
 */
exports.formatTime = function (value) {
    let year = value.getFullYear();
    let month = value.getMonth() + 1;
    let day = value.getDate();

    let hour = value.getHours();
    let minutes = value.getMinutes();

    let today = new Date();
    if (year == today.getFullYear() && month == today.getMonth() + 1 && day == today.getDate()) {
        return "今天 " + hour + ":" + minutes;
    } else {
        return year + "年" + month + "月" + day + "日 " + hour + ":" + minutes;
    }
};

/**
 * 命令行参数解析
 * @param {*} argvs 
 * @param {*} shorts 
 * @param {*} isArray 是否按序号记录
 * @returns 
 */
exports.formatArgv = function (argvs, shorts, isArray) {
    let result = {}, keyName = "args", value = [];
    if (isArray) result["value"] = [];

    let pushValue = function () {
        if (isArray && keyName !== "args") {
            result["value"].push({
                name: keyName,
                value
            });
        } else {
            result[keyName] = value;
        }
    };

    for (let index = 3; index < argvs.length; index++) {
        let argv = argvs[index];

        if (/^\-/.test(argv)) {
            pushValue();
            keyName = shorts[argv] || argv;
            value = [];
        } else {
            value.push(argv);
        }
    }
    pushValue();

    return result;
};

/**
 * 请求头解析
 * @param {*} rawHeaders 
 * @returns 
 */
exports.formatRawHeaders = function (rawHeaders) {
    let headers = {};
    for (let i = 0; i < rawHeaders.length - 1; i += 2) {
        headers[rawHeaders[i]] = rawHeaders[i + 1];
    }
    return headers;
};