export default function () {
    Object.prototype.oi = {
        navigateTo(_option) {
            return new Promise(function (resolve, reject) {
                my.navigateTo({
                    url: _option.url,
                    success: function () {
                        resolve();
                    },
                    fail: function () {
                        reject();
                    }
                });
            });
        },
        redirectTo(_option) {
            return new Promise(function (resolve, reject) {
                my.redirectTo({
                    url: _option.url,
                    success: function () {
                        resolve();
                    },
                    fail: function () {
                        reject();
                    }
                });
            });
        },
        reLaunch(_option) {
            return new Promise(function (resolve, reject) {
                my.reLaunch({
                    url: _option.url,
                    success: function () {
                        resolve();
                    },
                    fail: function () {
                        reject();
                    }
                });
            });
        },
        switchTab(_option) {
            return new Promise(function (resolve, reject) {
                my.switchTab({
                    url: _option.url,
                    success: function () {
                        resolve();
                    },
                    fail: function () {
                        reject();
                    }
                });
            });
        },
        navigateBack(_option) {
            return new Promise(function (resolve, reject) {
                my.navigateBack({
                    delta: _option.delta || 1,
                    success: function () {
                        resolve();
                    },
                    fail: function () {
                        reject();
                    }
                });
            });
        }
    };
};