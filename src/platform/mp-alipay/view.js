module.exports = function (domTree) {
    let template = "";

    let getTemplate = function (currentNode) {
        if (currentNode.type == "tag") {
            let template = `<${currentNode.name}`;

            for (let attrKey in currentNode.attrs) {
                let attrValue = currentNode.attrs[attrKey];

                 // 事件 oi-on:event="doit"
                 if (/^oi\-on:[a-z]+$/.test(attrKey)) {
                    let eventName = {
                        "click": "Tap"
                    }[attrKey.replace("oi-on:", "")];

                    template += ` on${eventName}="${attrValue}"`;
                } else {
                    template += ` ${attrKey}="${attrValue}"`;
                }
            }

            if (currentNode.__tagType__ == "single") {
                template += ` />`;
            } else {
                template += `>`;

                for (let index = 0; index < currentNode.childNodes.length; index++) {
                    template += getTemplate(domTree[currentNode.childNodes[index]]);
                }

                template += `</${currentNode.name}>`;
            }
            return template;
        } else if (currentNode.type == "text") {
            return currentNode.content;
        }
    };

    for (let index = 0; index < domTree[0].childNodes.length; index++) {
        template += getTemplate(domTree[domTree[0].childNodes[index]]);
    }

    return template
};