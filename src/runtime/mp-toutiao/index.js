export default function () {

    Object.defineProperty(Object.prototype, 'oi', {
        get() {
            return {
                navigateTo(_option) {
                    return new Promise(function (resolve, reject) {
                        tt.navigateTo({
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
                        tt.redirectTo({
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
                        tt.reLaunch({
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
                        tt.switchTab({
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
                        tt.navigateBack({
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
        },
        configurable: false,
        enumerable: false
    })

};