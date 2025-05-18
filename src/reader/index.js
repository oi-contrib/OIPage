function reader(plain) {

    let handler = {
        index: -1,
        value: null
    };

    // 读取下一个字符
    handler.readNext = function () {
        handler.value = handler.index++ < plain.length - 1 ? plain[handler.index] : null;
        return handler.value;
    };

    // 获取往后num个值
    handler.getNextN = function (num) {
        return plain.substring(handler.index, num + handler.index > plain.length ? plain.length : num + handler.index);
    };

    return handler;
}