exports.doIntercept = function (url, intercept, request, response, wsHandler) {
    for (let item of intercept) {
        if (item.test.test(url)) {
            item.handler(request, response, wsHandler);
            return true;
        }
    }
}

exports.testIntercept = function (url, intercept) {
    for (let item of intercept) {
        if (item.test.test(url)) {
            return true;
        }
    }
}