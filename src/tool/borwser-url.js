export default function () {
    let temp = (window.location.hash + "#").split("#")[1].replace(/^\//, '').replace(/\/$/, '').split("?")

    let routerTemp = temp[0].split('/');
    let paramTemp = (window.location.search.replace(/^\?/, "") + (temp[1] ? ("&" + temp[1]) : "")).replace(/^\&/, "");

    let paramResult, paramArray;
    if (paramTemp == "") {
        paramResult = {};
    } else {
        paramArray = paramTemp.split("&"), paramResult = {};
        paramArray.forEach(function (item) {
            let temp = item.split("=");
            paramResult[temp[0]] = decodeURIComponent(temp[1]);
        })
    }

    let resultData = {
        router: routerTemp[0] == '' ? [] : routerTemp,
        params: paramResult,
        origin: window.location.origin
    };

    return resultData;
};