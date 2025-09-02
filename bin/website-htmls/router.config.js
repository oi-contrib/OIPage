import { defineRouter } from "zipaper"

export default defineRouter({
    routers: [{
        path: "/",
        redirect: "/appStore"
    }, {
        path: "/appStore",
        component: () => import("./pages/appStore/index.js"),
    }]
})