import { createApp } from "zipaper";

const dialogs = {
    imageSize: () => import("./imageSize/index.js")
};

let dialogsResolve = [];
export default {
    install(Zipaper) {

        // 打开弹框
        Zipaper.prototype.$openDialog = function (dialogName, data) {
            let el = document.createElement("div");

            dialogs[dialogName]().then(App => {

                // 准备好挂载点
                el.setAttribute("class", "content " + dialogName);

                // 创建并挂载
                document.getElementById("dialog-root").appendChild(el);

                if (data) {
                    let props = {};
                    for (let key in data) {
                        props[key] = {
                            default: data[key]
                        };
                    }
                    App.default.props = props;
                } else {
                    App.default.props = {};
                }

                createApp(App.default).mount(el);
            });

            return new Promise((resolve) => {
                dialogsResolve.push({
                    resolve,
                    el
                });
            });
        };

        // 关闭弹框
        Zipaper.prototype.$closeDialog = function (data) {
            let dialog = dialogsResolve.pop();
            dialog.el.parentNode.removeChild(dialog.el);
            dialog.resolve(data);
        };
    }
}