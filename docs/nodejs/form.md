# 表单录入

> v0.2.0新增

实现在命令行中录入表单：

```js
const { form } = require("oipage");

form(formData).then(result=>{
    // result 是一个数组，记录着录入结果
});
```

其中formData用于定义表单，是一个数组，可选录入方式如下：

## 输入框

```js
formData = [{
    type: "input",
    label: "请输入名称："
}];
```

## 列表选择

```js
formData = [{
    type: "select",
    label: "请选择水果类型：",
    value: ["苹果", "西瓜", "草莓", "火龙果", "榴莲", "西红柿"]
}];
```