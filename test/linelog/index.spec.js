const { linelog } = require('../../nodejs/cmdlog/index');

let index = 0;
let interval = setInterval(function () {
    index += 1;

    let txt = '[1] - ' + Math.random();

    if (index < 10) txt += ' - ' + Math.random();

    if (index < 40) txt += '\n[2] - ' + Math.random();
    if (index < 30) txt += '\n[3] - ' + Math.random();
    txt += "\n[more more more more more more more more more more more more more more more more more more more more more more more more more more more more more more more]";
    if (index < 20) txt += '\n[4] - ' + Math.random();
    if (index > 40) txt += '\n[5] - ' + Math.random();

    linelog("\x1B[33m" + txt + "\x1B[39m");

    if (index === 50) {
        clearInterval(interval);
        linelog('同行打印结束\n');
        console.log('exit');
    }

}, 300);