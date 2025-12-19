const { readFileSync } = require("fs");
const { join } = require("path");
const { existsSync } = require("fs");

module.exports = function (filpath) {

    let node_modulesPath = join(__dirname, "../../../node_modules");

    while (!existsSync(join(node_modulesPath, filpath)) && node_modulesPath != join(node_modulesPath, "../")) {
        node_modulesPath = join(node_modulesPath, "../");
    }

    let source = readFileSync(join(node_modulesPath, filpath), {
        encoding: "utf8"
    });

    return source;
};