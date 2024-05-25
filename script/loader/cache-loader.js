const qs = require('querystring');

module.exports = function (source) {
    const incomingQuery = qs.parse(this.resourceQuery.slice(1));

    if (incomingQuery.type == 'disk') {

        let handler = require(`../../src/platform/${process.env.OIPAGE_PLATFORM}/index.js`);
        handler.call(this, {
            page: incomingQuery.page,
            lang: incomingQuery.lang,
            source
        });
    }

    return incomingQuery.lang == "json" ? source : `export default ""`;
};