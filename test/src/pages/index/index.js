export default function (createPage) {
    createPage({
        data: {

        },

        // 方法
        goto(event) {
            console.log(event)
            oi.navigateTo({
                url: "/pages/" + event.target.dataset.page + "/index"
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