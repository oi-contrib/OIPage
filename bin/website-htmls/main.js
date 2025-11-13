import { createApp } from "zipaper"

import App from "./pages/App/index.js"
import router from "./router.config.js"
import dialogs from "./dialogs/index.js"
import uiSelectFile from "./components/ui-select-file/index.js"

// https://oi-contrib.github.io/Zipaper/index.html

createApp(App)
    .use(router) // 路由
    .use(dialogs) // 弹框
    .component("ui-select-file", uiSelectFile)
    .mount(document.getElementById("root")) // 挂载到页面