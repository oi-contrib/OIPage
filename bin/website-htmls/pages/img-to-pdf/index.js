import { defineElement, ref } from "zipaper"
import template from "./index.html"
import style from "./index.scss"

export default defineElement({
    template,
    methods: {
        doChange(event) {
            let files = event.data, promises = [], iframeEl = document.getElementById("iframe");

            let template = "";
            for (let index = 0; index < files.length; index++) {
                let file = files[index];

                promises.push(new Promise(function (resolve) {

                    let reader = new FileReader();

                    reader.onload = function () {

                        template += '<div style="display: flex;justify-content: center;align-items: center;height: 100vh;width: 100vw;"><img src="' + reader.result + '" style="max-width: 100vw;max-height: 100vh;"></img></div>';
                        resolve("");
                    }
                    reader.readAsDataURL(file);
                }));
            }

            Promise.all(promises).then(function () {
                    let iframeWindow = iframeEl.contentWindow;
                    let iframeDocument = iframeEl.contentWindow?.document;

                    iframeDocument.open();
                    iframeDocument.write(`<style>body{margin:0px;}</style>` + template);
                    iframeDocument.close();

                    setTimeout(function () {
                        iframeWindow.print();
                    }, 500);
            });
        }
    },
    style: {
        content: style
    }
})