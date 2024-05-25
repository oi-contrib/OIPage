export default function () {
    global.oi = {
        navigateTo(_option) {
            return new Promise(function (resolve, reject) {
                wx.navigateTo({
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
                wx.redirectTo({
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
                wx.reLaunch({
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
                wx.switchTab({
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
                wx.navigateBack({
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