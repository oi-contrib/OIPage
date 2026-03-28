function throttle(callback, _option) {

    // 缺省值
    let option = {
        time: 200,
        keep: false,
        opportunity: "end"
    };
    
    // 校对
    if (_option) {
        for (let key in _option) {
            option[key] = _option[key];
        }
    }

    let hadInterval = false, hadClick = false, oneClick = false, arg;
    return function () {
        const _this = this;
        arg = arguments;

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