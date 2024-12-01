const { linelog } = require("../core/log");

exports.logView = (title, list, index) => {
    let txtArray = [];
    for (let i = 0; i < list.length; i++) {
        txtArray.push("    " + (i == index ? "●" : "○") + " " + list[i]);
    }

    linelog(`${title}\n${txtArray.join("\n")}\n`);
};