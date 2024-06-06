const qs = require("querystring");

module.exports = function (source) {
    const incomingQuery = qs.parse(this.resourceQuery.slice(1));

    if (incomingQuery.type == 'disk') {

        let handler = require(`../../src/platform/${process.env.OIPAGE_PLATFORM}/index.js`);

        let manifest = {};
        if (incomingQuery.page == "app" && incomingQuery.lang == "json") {
            manifest = require(process.env.OIPAGE_ROOT + "/src/manifest.json");
        }

        handler.call(this, {
            page: incomingQuery.page,
            lang: incomingQuery.lang,
            source,
            manifest
        });
    }

    return incomingQuery.lang == "json" ? `{}` : `export default ""`;
};