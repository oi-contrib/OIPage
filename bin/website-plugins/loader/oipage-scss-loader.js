// 参考：https://github.com/zxl20070701/zxl20070701.github.io/blob/master/bin/loader/scss.js
let toSelector = function (preSelectorArray, deep) {
    let selectors = preSelectorArray[0], i, j, k;
    for (i = 1; i < deep; i++) {
        let temp = [];
        for (j = 0; j < selectors.length; j++) {
            for (k = 0; k < preSelectorArray[i].length; k++) {
                temp.push(selectors[j] + preSelectorArray[i][k]);
            }
        }
        selectors = temp;
    }
    return "\n" + (selectors.join(',')) + "{\n";
};
let analyseBlock = function (source) {
    let i = -1, currentChar = null;
    let next = function () {
        currentChar = i++ < source.length - 1 ? source[i] : null;
        return currentChar;
    }
    let nextNValue = function (n) {
        return source.substring(i, n + i > source.length ? source.length : n + i);
    }
    let blocks = [];
    let currentBlock = "";
    next();
    while (true) {
        while (new RegExp("[\\x20\\t\\r\\n\\f]").test(currentChar)) {
            next();
        }
        if (currentChar == null) break;
        if (nextNValue(2) == '/*') {

            next();
            next();
            currentBlock = "/*";

            while (nextNValue(2) != '*/' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }
            if (currentChar == null) {
                throw new Error('The comment is not closed.');
            }
            currentBlock += "*/";
            next();
            next();
            blocks.push({
                value: currentBlock,
                type: "comment-double"
            });
        }
        else if (nextNValue(2) == '//') {
            currentBlock = '';

            while (currentChar != '\n' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            blocks.push({
                value: currentBlock,
                type: "comment-single"
            });

        }
        else if (currentChar == '}') {

            blocks.push({
                value: "}",
                type: "end"
            });

            next();

        }
        else {

            currentBlock = '';
            while (currentChar != '{' && currentChar != ';' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }
            if (currentChar == null) {
                throw new Error('Statement or code block missing closure.');
            }
            blocks.push({
                value: currentBlock + currentChar,
                type: {
                    '{': "begin",
                    ';': 'statement'
                }[currentChar]
            });
            next();
        }
    }
    return blocks;
};
module.exports = function (source) {
    this.setFileType("application/javascript");
    let blocks = analyseBlock(source + "");
    let i, j, cssCode = "", preSelectorArray = [], deep = 0;
    for (i = 0; i < blocks.length; i++) {
        if (blocks[i].type == 'comment-double') {
            cssCode += blocks[i].value;
        }
        else if (blocks[i].type == 'comment-single') {
            cssCode += "\n/* " + blocks[i].value + " */\n";
        }
        else if (blocks[i].type == 'begin') {
            let preSplit = blocks[i].value.split(',');
            let preSelect = [];
            for (j = 0; j < preSplit.length; j++) {
                preSelect[j] = preSplit[j].replace(/\{$/, '').trim();
                if (/^&/.test(preSelect[j])) {
                    preSelect[j] = preSelect[j].replace(/^&/, '');
                } else {
                    preSelect[j] = " " + preSelect[j];
                }
            }
            preSelectorArray[deep] = preSelect;
            deep += 1;
        }
        else if (blocks[i].type == 'end') {
            deep -= 1;
        }
        else if (blocks[i].type == 'statement') {
            j = 1;
            let preType = blocks[i - j].type;
            while (['comment-double', 'comment-single'].indexOf(preType) > -1) {
                j += 1;
                preType = blocks[i - j].type;
            }
            if (['end', 'begin'].indexOf(preType) > -1) {
                cssCode += toSelector(preSelectorArray, deep);
            }
            cssCode += "\n" + blocks[i].value + "\n";
            j = 1;
            let nextType = blocks[i + j].type;
            while (['comment-double', 'comment-single'].indexOf(nextType) > -1) {
                j += 1;
                nextType = blocks[i + j].type;
            }
            if (['end', 'begin'].indexOf(nextType) > -1) {
                cssCode += "\n}\n";
            }
        }
    }
    return `export default ${JSON.stringify(cssCode)}`;
};