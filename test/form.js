const OIPage = require('../nodejs/index');

OIPage.form([{
        type: "input",
        label: "请输入名称："
    },
    {
        type: "select",
        label: "请选择水果类型：",
        value: ["苹果", "西瓜", "草莓", "火龙果", "榴莲", "西红柿"]
    }, {
        type: "select",
        label: "请选择一个国家：",
        value: ["中国", "美国", "巴西"]
    }, {
        type: "select",
        label: "请选择一种动物：",
        value: ["狗", "猫", "老虎"]
    }]).then(result => {
        console.log("录入结果：" + result);
    });