const { simpleScss } = require("devby");

module.exports = function (source) {

    // scss语法转换成css
    source = simpleScss(source);

    if (process.env.OIPAGE_PLATFORM == "h5") {
        return `export default ${JSON.stringify(source)}`;
    }

    return source;
};