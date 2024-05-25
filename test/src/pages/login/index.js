export default function (createPage) {
    createPage({
        onLoad() {
            console.log("login页面加载");
        },
        onReady() {
            console.log("login页面加载完成");
        },
        onShow() {
            console.log("login页面显示");
        },
        onHide() {
            console.log("login页面隐藏");
        },
        onUnload() {
            console.log("login页面被关闭")
        }
    });
};