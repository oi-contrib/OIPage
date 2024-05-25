const path = require('path');

module.exports = function (parsed) {
    const main = path.resolve(process.cwd(), parsed.root, "./src/app.js");

    const entry = {
        "app": main + "?type=app&page=app"
    };

    if (parsed.platform != "h5") {

        const app = require(path.resolve(process.cwd(), parsed.root, "./src/app.json"));
        app.pages.forEach(item => {
            entry[item] = main + "?type=page&page=" + encodeURIComponent(item);
        });
    }

    return entry;
};