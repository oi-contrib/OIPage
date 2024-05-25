module.exports = function (source) {
    if (process.env.OIPAGE_PLATFORM == "h5") {

        // H5的具体解析交付给运行时
        return "export default " + JSON.stringify(source);
    } else {

        // 小程序等调用具体平台的方法拼接出页面
        return require("../../src/platform/" + process.env.OIPAGE_PLATFORM + "/view")(source);
    }
};