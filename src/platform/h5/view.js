let count = 0;

export default function (template, option, config, callback) {

    let isLoad = false; // 是否挂载
    let uniqueid = count++; // 当前页面的唯一序号

    callback({

        uniqueid,

        // 挂载页面
        load() {
            (function doLoad(el, childNodes) {
                for (let i = 0; i < childNodes.length; i++) {

                    let currentNode = template[childNodes[i]];

                    // 如果是节点
                    if (currentNode.type == 'tag') {

                        let nodeName = currentNode.name;

                        if (nodeName == "image") {
                            nodeName = "img";
                        }

                        let currentEl = document.createElement(nodeName);
                        for (let attrKey in currentNode.attrs) {
                            let attrValue = currentNode.attrs[attrKey];

                            // 事件 oi-on:event="doit"
                            if (/^oi\-on:[a-z]+$/.test(attrKey)) {
                                currentEl.addEventListener(attrKey.replace("oi-on:", ""), function (event) {
                                    option[attrValue].call(option, event);
                                }, false);
                            } else {
                                currentEl.setAttribute(attrKey, attrValue);
                            }
                        }

                        // 挂载到页面
                        el.appendChild(currentEl);

                        //  解析孩子
                        doLoad(currentEl, currentNode.childNodes);
                    }

                    // 如果是文本
                    else if (currentNode.type == 'text') {
                        let currentEl = document.createTextNode("");
                        currentEl.textContent = currentNode.content;

                        el.appendChild(currentEl);
                    }

                }
            })(window.__OIPage.el, template[0].childNodes);

            isLoad = true;
        },

        // 解挂页面
        unload() {
            if (isLoad) {
                isLoad = false;
                window.__OIPage.el.innerHTML = "";
            }
        },

        // 销毁页面
        destory() {
            this.unload();

            // 从历史记录中移除
            for (let index = 0; index < window.__OIPage.history.length; index++) {
                if (window.__OIPage.history.uniqueid == uniqueid) {
                    window.__OIPage.history.splice(index, 1);
                    break;
                }
            }
        }
    });
};