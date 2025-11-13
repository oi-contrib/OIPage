import { defineElement } from "zipaper";
import template from "./index.html";
import style from "./index.scss";
import { Canvas } from "vislite";

export default defineElement({
    template,
    data() {
        return {
            painter: null,
            drawEl: null
        }
    },
    created() {
        this.drawEl = document.getElementById("drawId");
        this.painter = new Canvas(this.drawEl, {
            scale: 1
        }, 700, 400);
    },
    methods: {
        openImage(event, target) {
            let file = target.files[0];
            if (file) {
                let reader = new FileReader();

                reader.onload = () => {
                    let image = new Image();

                    image.onload = () => {

                        // 调整画布大小
                        this.painter = new Canvas(this.drawEl, {
                            scale: 1
                        }, image.width, image.height);

                        // 绘制图片
                        this.painter.clearRect(0, 0, image.width, image.height).drawImage(image, 0, 0, image.width, image.height);
                    }

                    image.src = reader.result;
                }
                reader.readAsDataURL(file);
            }
        },
        download(event, target) {
            let btn = document.createElement('a');
            btn.href = this.painter.__canvas.toDataURL("image/" + target.getAttribute("type"));
            btn.download = "图片." + target.getAttribute("type");
            btn.click();
        },
        changeSize(event, target) {
            let canvasInfo = this.painter.getInfo();
            this.$openDialog("imageSize", {
                title: target.innerText.trim(),
                width: canvasInfo.width,
                height: canvasInfo.height
            }).then(data => {
                if (data) {
                    let base64 = this.painter.__canvas.toDataURL();

                    // 调整画布大小
                    this.painter = new Canvas(this.drawEl, {
                        scale: 1
                    }, data.width, data.height).clearRect(0, 0, data.width, data.height);

                    if (target.innerText.trim() === "画布大小") {

                        // 计算图片的对齐方式

                        let _left, _top;
                        let changeType = data.changeType.split('-');

                        // 水平方向
                        if (changeType[0] == 'left') {
                            _left = 0;
                        } else if (changeType[0] == 'right') {
                            _left = data.width - canvasInfo.width;
                        } else {
                            _left = (data.width - canvasInfo.width) * 0.5;
                        }

                        // 垂直方向
                        if (changeType[1] == 'top') {
                            _top = 0;
                        } else if (changeType[1] == 'bottom') {
                            _top = data.height - canvasInfo.height;
                        } else {
                            _top = (data.height - canvasInfo.height) * 0.5;
                        }

                        const img = new Image();
                        img.onload = () => {
                            this.painter.getContext().drawImage(img, 0, 0, canvasInfo.width, canvasInfo.height, _left, _top, canvasInfo.width, canvasInfo.height);
                        };
                        img.src = base64;

                    } else {
                        this.painter.drawImage(base64, 0, 0, data.width, data.height);
                    }
                }
            });
        }
    },
    style: {
        content: style
    }
})