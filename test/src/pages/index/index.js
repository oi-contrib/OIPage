export default function (createPage) {
    createPage({
        data: {
            info: "这是登录页面info的默认内容～"
        },

        // 方法
        goLogin(event) {
            console.log(event);
            console.log(this.data.info);
            console.log("去登录页面");

            oi.navigateTo({
                url: "/pages/login/index"
            });
        },

        // 生命周期勾子
        onLoad() {
            console.log("index页面加载");
        },
        onReady() {
            console.log("index页面加载完成");
        },
        onShow() {
            console.log("index页面显示");
        },
        onHide() {
            console.log("index页面隐藏");
        },
        onUnload() {
            console.log("index页面被关闭")
        }
    });
};