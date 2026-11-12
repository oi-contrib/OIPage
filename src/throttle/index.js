function throttle(callback, _option) {

    // 缺省值
    let option = {
        time: 200,
        keep: false,
        opportunity: "end",
        dida: 0
    };

    // 校对
    if (_option) {
        for (let key in _option) {
            option[key] = _option[key];
        }
    }

    let hadInterval = false, hadClick = false, oneClick = false, arg;
    let didaBegin = void 0;
    return function () {
        const _this = this;
        arg = arguments;

        if (option.dida) {
            if (!didaBegin) {
                didaBegin = new Date().valueOf();
            } else {
                if (new Date().valueOf() - didaBegin > option.dida) {
                    callback.apply(_this, arg);
                    didaBegin = new Date().valueOf();
                    return;
                }
            }
        }

        // 如果前置任务都完成了
        if (!hadInterval) {
            if (option.opportunity != 'end') {
                callback.apply(_this, arg);
            }
            hadInterval = true;

            let interval = setInterval(() => {
                if (hadClick) {
                    if (!option.keep) {
                        callback.apply(_this, arg);
                    }
                } else {
                    if (option.opportunity != 'begin') {
                        if (oneClick || option.opportunity == 'end') callback.apply(_this, arg);
                    }
                    hadInterval = false;
                    oneClick = false;
                    clearInterval(interval);
                }
                hadClick = false;
            }, option.time);
        } else {
            hadClick = true;
            oneClick = true;
        }

    };
}