
// 把字节转换成更可读的内容
exports.formatByte = function (value) {
    if (value < 1024) return value + "Byte";

    let kb = value / 1024;
    if (kb < 1024) return kb.toFixed(1) + "KB";

    let mb = kb / 1024;
    if (mb < 1024) return mb.toFixed(1) + "MB";

    let gb = mb / 1024;
    return gb.toFixed(1) + "GB";
};

// 把时间变成更可读的格式
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

exports.formatArgv = function (argvs, shorts) {
    let result = {};

    let keyName = "args", value = [];
    for (let index = 3; index < argvs.length; index++) {
        let argv = argvs[index];

        if (/^\-/.test(argv)) {
            result[keyName] = value;
            keyName = shorts[argv] || argv;
            value = [];
        } else {
            value.push(argv);
        }
    }
    result[keyName] = value;

    return result;
};