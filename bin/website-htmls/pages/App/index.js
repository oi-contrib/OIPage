import { defineElement } from "zipaper"
import template from "./index.html"
import style from "./index.scss"

export default defineElement({
    template,
    data() {
        return {

        }
    },
    methods: {

        // 点击遮罩关闭弹框
        closeDialog() {
            this.$closeDialog()
        }

    },
    style: {
        content: style
    }
})