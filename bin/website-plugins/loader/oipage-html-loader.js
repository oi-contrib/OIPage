const { parseTemplate } = require("xhtml-to-json");

module.exports = function (source) {
    if (this.entry) return source;

    this.setFileType("application/javascript");
    return `export default ${JSON.stringify(parseTemplate(source).toJson())}`;
};