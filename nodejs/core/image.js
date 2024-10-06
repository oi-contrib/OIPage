const fs = require('fs');

exports.toBase64 = function (filepath) {
    return "data:image/png;base64," + fs.readFileSync(filepath).toString('base64');
};