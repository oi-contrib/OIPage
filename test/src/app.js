export default function (createApp) {
    createApp({

        // 第一次打开
        onLaunch() {
            console.log("应用启动成功～");
            // console.log(oi.navigateTo)
        },

        // 从后台被重新打开
        onShow() {
            console.log("应用显示");
        }
    });
};