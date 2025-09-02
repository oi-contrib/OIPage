import { createApp } from "zipaper"

const dialogs = {

    // xxx
    xxx: () => import("./xxx/index.js")
}

let dialogsResolve = []
export default {
    install(Zipaper) {

        // 打开弹框
        Zipaper.prototype.$openDialog = function (dialogName, callback) {
            let el = document.createElement("div")

            dialogs[dialogName]().then(App => {

                // 准备好挂载点
                el.setAttribute("class", "content " + dialogName)

                // 创建并挂载
                document.getElementById("dialog-root").appendChild(el)
                createApp(App.default).mount(el)
                if (callback) callback()
            })

            return new Promise((resolve) => {
                dialogsResolve.push({
                    resolve,
                    el
                })
            })
        }

        // 关闭弹框
        Zipaper.prototype.$closeDialog = function (data) {
            let dialog = dialogsResolve.pop()
            dialog.el.parentNode.removeChild(dialog.el);
            dialog.resolve(data)
        }
    }
}