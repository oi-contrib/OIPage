let calcValue = function (word) {
    if (word.type != 'string' && word.type != 'object') {

        // 数字
        if (/[+-]{0,1}\d{1,}\.{0,1}\d{0,}/.test(word.value)) {
            return +word.value;
        }

        // undefined
        else if (word.value == 'undefined') {
            return undefined;
        }

        // null
        else if (word.value == 'null') {
            return null;
        }

        // false
        else if (word.value == 'false') {
            return false;
        }

        // true
        else if (word.value == 'true') {
            return true;
        }

    }

    return word.value;
};

let toValue = function (wordArray) {
    let value;

    // 是json
    if (wordArray[0].value == '{') {
        value = {};
        for (let i = 3; i < wordArray.length; i += 4) {
            value[wordArray[i - 2].value] = calcValue(wordArray[i]);
        }
    }

    // 数组
    else {
        value = [];
        for (let i = 2; i < wordArray.length; i += 2) {
            value.push(calcValue(wordArray[i - 1]));
        }
    }

    return {
        type: "object",
        value: value
    };
};

let analyseWord = function (express) {
    // 剔除开头和结尾的空白
    express = express.trim();

    // 获取字符串分析对象
    let readerHandler = reader(express);

    let wordArray = [];
    let tempWord = "";
    readerHandler.readNext();

    // 定义一个追加普通串的方法
    let pushNormal = function () {
        tempWord = tempWord.trim();
        if (tempWord != '') {
            wordArray.push({
                type: /\d%/.test(tempWord) ? "string" : "normal",
                value: tempWord
            });
        }
        tempWord = "";
    };

    while (true) {

        if (readerHandler.index >= express.length) break;

        // 单行注释
        if (readerHandler.getNextN(2) == '//') {
            while (!/\n/.test(readerHandler.readNext()) && readerHandler.index < express.length);
        }

        // 多行注释
        else if (readerHandler.getNextN(2) == '/*') {
            while (readerHandler.getNextN(2) != '*/') {
                if (readerHandler.index >= express.length) {
                    throw new Error("Multiline comment not closed correctly : " + express + "\nstep='analyseWord-searchEndComment'");
                }
                readerHandler.readNext();
            }
            readerHandler.readNext();
            readerHandler.readNext();
        }

        // 如果是边界符号
        else if (['{', '}', ',', '[', ']', ':'].indexOf(readerHandler.value) > -1) {
            pushNormal();

            wordArray.push({
                type: "insign",
                value: readerHandler.value
            });
            readerHandler.readNext();
        }

        // 如果遇到字符串，应该是一个独立的单词
        else if (['"', "'"].indexOf(readerHandler.value) > -1) {

            let tempStrWord = "";
            while (['"', "'"].indexOf(readerHandler.readNext()) < 0) {
                if (readerHandler.index >= express.length) {
                    throw new Error("The string is not closed correctly : " + express + "\nstep='analyseWord-searchString',currentStrWord=" + tempStrWord);
                }
                tempStrWord += readerHandler.value;
            }
            readerHandler.readNext();
            wordArray.push({
                type: "string",
                value: tempStrWord
            });

        } else {
            tempWord += readerHandler.value;
            readerHandler.readNext();
        }

    }

    return wordArray;
};

function strToJson(express) {
    if (typeof express === "string") {

        // 先分析出来单词
        let wordArray = analyseWord(express);

        /**
         * 思路：
         * 从后往前找，找到第一个需要归结的，直接归结，
         * 归结完毕以后，继续，直到找到开头，说明归结完毕，
         * 这样设计的好处是：
         * 从后往前找，一定是叶子，这就消除了递归。
         */
        let i = wordArray.length - 1, j;

        // 只要单词数组归结完毕
        while (wordArray.length > 1) {

            // 从后往前找第一个需要归结的子对象
            while (i >= 0 && (wordArray[i].type != 'insign' || ['{', '['].indexOf(wordArray[i].value) < 0)) {
                i = i - 1;
            }

            if (i < 0) {
                // 如果到开头都没有遇到，缺少开始符号
                throw new Error("Illegal express : " + express + "\nstep='toOne-searchBeginIndex',wordArray=" + wordArray);
            }

            // 然后合并
            j = i + 1;
            let subWordArray = [wordArray[i]];
            while (j < wordArray.length && (wordArray[j].type != 'insign' || wordArray[j].value != {
                "{": "}",
                "[": "]"
            }[wordArray[i].value])) {
                subWordArray.push(wordArray[j]);
                j = j + 1;
            }

            if (j >= wordArray.length) {
                // 如果到结尾都没有需要应该闭合的符号，缺少闭合符号
                throw new Error("Illegal express : " + express + "\nstep='toOne-searchEndIndex',wordArray=" + wordArray);
            } else {

                // 结尾追加进去
                subWordArray.push(wordArray[j]);

                // 归结
                wordArray[i] = toValue(subWordArray);

                // 调整
                wordArray.splice(i + 1, j - i);
            }


        }

        // 返回计算结果
        return wordArray[0].value;

    } else {

        throw new Error('The data passed is not a string.');

    }

}