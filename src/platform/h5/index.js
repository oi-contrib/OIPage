import formatUrl from "../../tool/borwser-url";

export default function (el, option, pages) {
    let url = formatUrl();

    let router = "/"+url.router.join("/");
    if (!pages[router]) router = "/pages/index/index";

    window.__OIPage.pages = pages;
    window.__OIPage.el = el;

    // 先不考虑是否存在tabbar的情况
    oi.navigateTo({
        url: router
    }).then(() => {
        option?.onLaunch();
    });

};