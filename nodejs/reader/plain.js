module.exports = function (txt) {

    let reader = {
        index: -1,
        currentChar: null
    };

    // 读取下一个字符
    reader.readNext = function () {
        reader.currentChar = reader.index++ < txt.length - 1 ? txt[reader.index] : null;
        return reader.currentChar;
    };

    // 获取往后num个值
    reader.getNextN = function (num) {
        return txt.substring(reader.index, num + reader.index > txt.length ? txt.length : num + reader.index);
    };

    return reader;
};
