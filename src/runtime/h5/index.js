import view from "../../platform/h5/view";

window.__OIPage = {
    el: null,
    history: [],
    pages: {}
};

let openNewPage = function (_option, doit) {
    return new Promise(function (resolve, reject) {
        __OIPage.pages[_option.url]().then(res => {
            res.default(function (template, option, config) {
                view(template, option, config, function (pageInstance) {
                    doit();

                    __OIPage.history.push(pageInstance);

                    // 挂载新页面
                    pageInstance.load();

                    window.location.href = "#" + _option.url;
                    resolve();

                });
            });
        }).catch(error => {
            reject(error);
        });
    });
};

export default function () {
    window.oi = {
        navigateTo(_option) {
            return openNewPage(_option, function () {

                // 如果旧页面存在，卸载即可
                if (window.__OIPage.history.length > 0) {
                    window.__OIPage.history[window.__OIPage.history.length - 1].unload();
                }
            });
        },
        redirectTo(_option) {

            // 如果旧页面存在，销毁
            if (window.__OIPage.history.length > 0) {
                window.__OIPage.history[window.__OIPage.history.length - 1].destory();
            }
        },
        reLaunch(_option) {

            // 销毁所有旧页面
            for (let index = 0; index < window.__OIPage.history.length; index++) {
                window.__OIPage.history[index].destory();
            }
        },
        switchTab(_option) {

        },
        navigateBack(_option) {

        }
    };
};