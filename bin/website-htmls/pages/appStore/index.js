import { defineElement, ref } from "zipaper"
import template from "./index.html"
import style from "./index.scss"

export default defineElement({
    template,
    data() {
        return {

        }
    },
    methods: {
        goto(event, target) {
            this.$goto("/" + target.getAttribute("tag"))
        }
    },
    style: {
        content: style
    }
})