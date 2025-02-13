// 请求数据
function fetchData(url) {
    return new Promise(function (resolve, reject) {
        var cacheData = sessionStorage.getItem("cache://" + url);
        if (window.needCache && cacheData) {
            resolve(cacheData);
        } else {
            fetch(url, {
                method: "GET"
            }).then(function (res) {
                if (res.status === 200) {
                    return res.text();
                } else {
                    return Promise.reject(res.json());
                }
            }).then(function (res) {

                if (window.needCache) {
                    sessionStorage.setItem("cache://" + url, res);
                }

                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        }
    });
}

function initApiTable() {
    var apiViewEl = document.getElementById("api-view");
    fetchData("./api/index.json").then(function (res) {

        var apiTables = JSON.parse(res);
        for (var typeName in apiTables) {

            var viewEl = document.getElementById(typeName + "-table");
            var tableEl = document.createElement("table");
            viewEl.appendChild(tableEl);

            viewEl.setAttribute("class", "table");

            var theadEl = document.createElement("thead");
            tableEl.appendChild(theadEl);
            theadEl.innerHTML = "<tr><th>模板文件<th><th>描述<th><th>开始版本</td><th>接口</td></tr>";

            var tbodyEl = document.createElement("tbody");
            tableEl.appendChild(tbodyEl);
            for (var bundleItem of apiTables[typeName]) {

                var trEl = document.createElement("tr");
                tbodyEl.appendChild(trEl);
                trEl.innerHTML = "<th>" + bundleItem.name + "/index.js<th><th>" + bundleItem.label + "<th><th>v" + bundleItem.version + "</td><th>" + bundleItem.import.join(" ") + "</td>";

                (function (typeName, bundleItem) {
                    trEl.addEventListener("click", function () {
                        apiViewEl.innerHTML = "";

                        // 标题
                        var headerEl = document.createElement("header");
                        apiViewEl.appendChild(headerEl);
                        headerEl.innerText = bundleItem.label;

                        // 版本
                        var versionEl = document.createElement("div");
                        apiViewEl.appendChild(versionEl);
                        versionEl.setAttribute("class", "version");
                        versionEl.innerText = "始于 v" + bundleItem.version;

                        // 引入
                        var importTitleEl = document.createElement("h2");
                        apiViewEl.appendChild(importTitleEl);
                        importTitleEl.innerText = "引入";

                        var preEl = document.createElement("pre");
                        apiViewEl.appendChild(preEl);

                        if (typeName == 'web') {
                            preEl.innerHTML = 'import { ' + bundleItem.import.join(", ") + ' } from "oipage/web/' + bundleItem.name + '/index";';
                        } else {
                            preEl.innerHTML = 'const { ' + bundleItem.import.join(", ") + ' } = require("oipage/nodejs/' + bundleItem.name + '/index.js");';
                        }

                        // 使用
                        var importTitleEl = document.createElement("h2");
                        apiViewEl.appendChild(importTitleEl);
                        importTitleEl.innerText = "使用";

                        var contentEl = document.createElement("div");
                        apiViewEl.appendChild(contentEl);
                        contentEl.setAttribute("class", "content");

                        fetchData("./api/" + bundleItem.name + ".html").then(function (res) {
                            contentEl.innerHTML = res;
                        });

                        // 关闭
                        var closeEl = document.createElement("div");
                        apiViewEl.appendChild(closeEl);
                        closeEl.innerText = "返回";
                        closeEl.setAttribute("class", "close-btn");

                        closeEl.addEventListener("click", function () {
                            apiViewEl.style.display = "";
                            document.body.style.overflow = "";
                        });

                        apiViewEl.style.display = "block";
                        document.body.style.overflow = "hidden";
                    });
                })(typeName, bundleItem);
            }

        }

    });
}