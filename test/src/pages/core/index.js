export default function (createPage) {
    createPage({
        onLoad() {
            console.log("core页面加载");
        },
        onReady() {
            console.log("core页面加载完成");
        },
        onShow() {
            console.log("core页面显示");
        },
        onHide() {
            console.log("core页面隐藏");
        },
        onUnload() {
            console.log("core页面被关闭")
        }
    });
};