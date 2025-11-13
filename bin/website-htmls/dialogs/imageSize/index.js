import { defineElement, ref } from "zipaper"
import template from "./index.html"
import style from "./index.scss";

export default defineElement({
    template,
    data() {
        return {
            title: this._props.title,
            width: this._props.width,
            height: this._props.height,

            newWidth: ref(this._props.width),
            newHeight: ref(this._props.height),

            changeType: ref('center-middle')
        }
    },
    methods: {
        calcHeight() {
            if (this.title == '图像大小') {
                this.newHeight = +(this.newWidth * this.height / this.width).toFixed(0);
            }
        },

        calcWidth() {
            if (this.title == '图像大小') {
                this.newWidth = +(this.newHeight * this.width / this.height).toFixed(0);
            }
        },

        doChangeType: function (event, target) {
            this.changeType = target.getAttribute('val');
        },

        // 确定
        doSubmit: function () {
            this.$closeDialog({
                width: +this.newWidth,
                height: +this.newHeight,
                changeType: this.changeType
            });
        },

        // 取消
        doClose: function () {
            this.$closeDialog();
        }
    },
    style: {
        content: style
    }
})
