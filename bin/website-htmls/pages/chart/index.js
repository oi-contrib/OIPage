import { defineElement, ref } from "zipaper"
import template from "./index.html"
import style from "./index.scss"

export default defineElement({
    template,
    data() {
        return {
            uniqueid: new Date().valueOf() + "#" + (Math.random() * 10000).toFixed(0),
            msg: ref("")
        }
    },
    created() {

        let ws = new WebSocket('ws://' + window.location.hostname + ':' + (+window.location.port + 1) + '/');

        // 连接成功
        ws.addEventListener('open', () => {
            ws.send('客户端和服务器建立连接成功！(' + this.uniqueid + ')');
        });

        // 监听来自服务器的数据
        ws.addEventListener('message', (event) => {
            let data = JSON.parse(event.data);

            let contentEl = document.getElementById("chart-content-id");

            let itemEl = document.createElement("div");
            contentEl.appendChild(itemEl);

            itemEl.setAttribute("class", "item");

            if (data.uniqueid === this.uniqueid) {
                itemEl.setAttribute("tag", "sender");
            } else {
                itemEl.setAttribute("tag", "receiver");
            }

            let textEl = document.createElement("div");
            textEl.innerText = data.msg;
            itemEl.appendChild(textEl);
            textEl.setAttribute("class", "text");

            itemEl.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });
        });

    },
    methods: {
        doSubmit() {
            fetch("./chart/sendMsg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    msg: this.msg,
                    uniqueid: this.uniqueid
                })
            }).then(() => {
                this.msg = "";
            }).catch(() => {
                alert("发送失败！");
            });
        }
    },
    style: {
        content: style
    }
})