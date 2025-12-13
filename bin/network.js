const networkInfo = require("./tools/network");

module.exports = function (config) {
    let info = networkInfo(true);

    // 执行一个个任务
    for (let i = 0; i < config.value.length; i++) {

        // 打印信息
        if (config.value[i].name === "--log") {

            for (let iptype of ["IPv4", "IPv6"]) {
                console.log("\n" + iptype);
                for (let i = 0; i < info[iptype].length; i++) {
                    console.log("  \x1b[1m\x1b[32m" + info[iptype][i].address + "\x1b[0m  " + info[iptype][i].mac);
                }
            }

            console.log("");
        }
    }
};