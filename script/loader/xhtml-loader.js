const { xhtml } = require("devby");

module.exports = function (source) {
    let domTree = xhtml(source);

    for (let index = 0; index < domTree.length; index++) {

        // 删除无用的信息
        delete domTree[index].preNode;
        delete domTree[index].nextNode;
        delete domTree[index].parentNode;
        delete domTree[index].__deep__;
    }

    return domTree;
};