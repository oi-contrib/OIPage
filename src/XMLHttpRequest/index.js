function XHRIntercept(callbackFactory) {

    // 原生的请求方法
    var { open, send } = window.XMLHttpRequest.prototype;

    window.XMLHttpRequest.prototype.open = function (method, url) {
        this.callback = callbackFactory();

        // 响应
        let { ontimeout, onerror, onloadend } = this;

        this.onloadend = function () {
            if (onloadend) { onloadend.apply(this, arguments); }


            if (this.readyState == 4) {
                let response = "";
                try { response = JSON.parse(this.response); } catch (e) { response = this.response; }

                this.callback("end", {
                    url: this.responseURL,
                    status: this.status,
                    statusText: this.statusText,
                    response: response,
                    responseText: this.responseText
                });
            }
        };

        this.ontimeout = function () {
            if (ontimeout) { ontimeout.apply(this, arguments); }
            this.callback("timeout", {});
        };

        this.onerror = function () {
            if (onerror) { onerror.apply(this, arguments); }
            this.callback("error", {});
        };

        open.apply(this, arguments);
        this.callback("open", {
            method: method,
            url: url
        });
    };

    // 拦截发送
    window.XMLHttpRequest.prototype.send = function (data) {
        try {
            send.apply(this, arguments);
            this.callback("send", {
                data: data
            });
        } catch (error) {
            this.callback("send@error", {
                error: error
            });
        }
    }
}