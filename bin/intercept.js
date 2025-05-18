exports.doIntercept = function (url, intercept, request, response) {
    for (let item of intercept) {
        if (item.test.test(url)) {
            item.handler(request, response);
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