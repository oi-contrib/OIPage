const { exec } = require('child_process');
const os = require('os');

module.exports = function (url) {
    const platform = os.platform();
    let command;

    switch (platform) {
        case 'win32': // Windows
            command = `start ${url}`;
            break;
        case 'darwin': // macOS
            command = `open ${url}`;
            break;
        default: // Linux及其他
            command = `xdg-open ${url}`;
    }

    exec(command, (error) => {
        if (error) {
            console.error(`无法打开浏览器: ${error}`);
        } else {
            // todo
        }
    });
}