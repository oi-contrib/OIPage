import { createApp } from "zipaper"

import App from "./pages/App/index.js"
import router from "./router.config.js"
import dialogs from "./dialogs/index.js"

createApp(App)
    .use(router) // 路由
    .use(dialogs) // 弹框
    .mount(document.getElementById("root")) // 挂载到页面