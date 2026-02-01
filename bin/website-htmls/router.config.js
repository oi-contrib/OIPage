import { defineRouter } from "zipaper"

export default defineRouter({
    routers: [{
        path: "/",
        redirect: "/appStore"
    }, {
        path: "/appStore",
        component: () => import("./pages/appStore/index.js"),
        children: [{
            path: "/",
            redirect: "/home"
        }, {
            path: "/home",
            component: () => import("./pages/home/index.js"),
        }, {
            path: "/chart",
            component: () => import("./pages/chart/index.js"),
        }, {
            path: "/image-editor",
            component: () => import("./pages/image-editor/index.js"),
        }, {
            path: "/img-to-pdf",
            component: () => import("./pages/img-to-pdf/index.js"),
        }]
    }]
})