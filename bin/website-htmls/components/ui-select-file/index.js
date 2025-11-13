import { defineElement } from "zipaper";
import template from "./index.html";
import style from "./index.scss";

export default defineElement({
    template,
    emits: ["change"],
    props: {
        title: {
            type: String,
            required: true,
        },
        tips: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            accept: {
                pdf: "application/pdf",
                image: "image/*"
            }[this._props.type]
        };
    },
    methods: {
        doChange(event, target) {
            this.$emit("change", target.files);
        }
    },
    style: {
        content: style
    }
});