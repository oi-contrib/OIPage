const { dateFormat, numberFormat } = require('../../nodejs/format/index');

for (let value of [
    0, 0.1, 0.94, 0.033, 1, 12, 434, 3434, 43455, 1.23, 54.33344,
    3434.4343434,-10,-122
]) {
    console.log(value + " -> " + numberFormat(value));
}

for (let item of [
    {
        value: new Date(),
    },
    {
        value: "2022/11/22",
        option: {
            format: "yyyy年MM月",
        },
    },
    {
        value: null,
        option: {
            format: "MM月dd日 HH:mm:ss (yyyy年)",
        },
    },
    {
        value: "【日期】2033年2月14日",
        option: {
            inputFormat: "【日期】yyyy年MM月dd日",
        },
    },
]) {
    console.log(item.value + " -> " + dateFormat(item.value, item.option));
}