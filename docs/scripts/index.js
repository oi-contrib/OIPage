// 复制代码功能
function copyCode(button) {
    // 获取代码内容
    var codeElement = button.previousElementSibling;
    var codeText = codeElement.innerText || codeElement.textContent;

    // 创建临时文本区域
    var textArea = document.createElement('textarea');
    textArea.value = codeText;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        // 执行复制命令
        document.execCommand('copy');
        // 更新按钮文本
        var originalText = button.innerText;
        button.innerText = '已复制';
        setTimeout(function () {
            button.innerText = originalText;
        }, 2000);
    } catch (err) {
        console.error('复制失败:', err);
        button.innerText = '复制失败';
        setTimeout(function () {
            button.innerText = '复制';
        }, 2000);
    }

    // 清理临时元素
    document.body.removeChild(textArea);
}

// 为动态加载的pre标签添加复制按钮
function addCopyButtonToPre() {
    var preElements = document.querySelectorAll('.note-view pre');
    preElements.forEach(function (pre) {
        // 避免重复添加
        if (pre.parentNode.classList.contains('code-container')) {
            return;
        }

        // 创建容器
        var container = document.createElement('div');
        container.className = 'code-container';

        // 插入容器
        pre.parentNode.insertBefore(container, pre);
        container.appendChild(pre);

        // 创建复制按钮
        var copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerText = '复制';
        copyBtn.onclick = function () {
            copyCode(this);
        };

        container.appendChild(copyBtn);
    });
}

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

var getImportCode = function (importValue) {
    if (importValue.join(", ").length <= 40) {
        return importValue.join(", ");
    } else {
        var preTxt = "\n    ", importString = "";
        var currentItems = [];
        for (var i = 0; i < importValue.length; i++) {
            currentItems.push(importValue[i]);
            if (currentItems.join(", ").length > 80) {
                importString += currentItems.join(", ") + ",\n    ";
                currentItems = [];
            }
        }
        if (currentItems.length > 0) {
            importString += currentItems.join(", ");
        }
        return preTxt + importString + "\n";
    }
};
function initApiTable() {
    var apiViewEl = document.getElementById("api-view");
    fetchData("./api/index.json").then(function (res) {

        var apiTables = JSON.parse(res);
        for (var typeName in apiTables.platform) {

            var viewEl = document.getElementById(typeName + "-table");
            var tableEl = document.createElement("table");
            viewEl.appendChild(tableEl);

            viewEl.setAttribute("class", "table");

            var theadEl = document.createElement("thead");
            tableEl.appendChild(theadEl);
            theadEl.innerHTML = "<tr><th>模板文件<th><th>描述<th><th>开始版本</td><th>接口</td></tr>";

            var tbodyEl = document.createElement("tbody");
            tableEl.appendChild(tbodyEl);
            for (var bundleItem of apiTables.platform[typeName]) {

                var trEl = document.createElement("tr");
                tbodyEl.appendChild(trEl);
                trEl.innerHTML = "<th>" + bundleItem.name + "<th><th>" + apiTables.api[bundleItem.name].label + "<th><th>v" + bundleItem.version + "</td><th>" + (apiTables.api[bundleItem.name].import.length > 2 ? ([apiTables.api[bundleItem.name].import[0], apiTables.api[bundleItem.name].import[1]].join(" ") + " 等...") : apiTables.api[bundleItem.name].import.join(" ")) + "</td>";

                (function (typeName, bundleItem) {
                    trEl.setAttribute("id", "/api/" + typeName + "/" + bundleItem.name);
                    trEl.addEventListener("click", function () {
                        apiViewEl.innerHTML = "";

                        var apiContentEl = document.createElement("div");
                        apiViewEl.appendChild(apiContentEl);
                        apiContentEl.setAttribute("class", "note-view");

                        // 标题
                        var headerEl = document.createElement("header");
                        apiContentEl.appendChild(headerEl);
                        headerEl.innerText = apiTables.api[bundleItem.name].label;

                        // 版本
                        var versionEl = document.createElement("div");
                        apiContentEl.appendChild(versionEl);
                        versionEl.setAttribute("class", "version");
                        versionEl.innerText = "始于 v" + bundleItem.version;

                        // 引入
                        var importTitleEl = document.createElement("h2");
                        apiContentEl.appendChild(importTitleEl);
                        importTitleEl.innerText = "引入";

                        var preContainer = document.createElement('div');
                        preContainer.className = 'code-container';
                        apiContentEl.appendChild(preContainer);

                        var preEl = document.createElement("pre");
                        preContainer.appendChild(preEl);

                        if (typeName == 'web') {
                            preEl.innerHTML = 'import { ' + getImportCode(apiTables.api[bundleItem.name].import) + ' } from "oipage/web/' + bundleItem.name + '/index";';
                        } else {
                            preEl.innerHTML = 'const { ' + getImportCode(apiTables.api[bundleItem.name].import) + ' } = require("oipage/nodejs/' + bundleItem.name + '/index.js");';
                        }

                        // 添加复制按钮
                        var copyBtn = document.createElement('button');
                        copyBtn.className = 'copy-btn';
                        copyBtn.innerText = '复制';
                        copyBtn.onclick = function () {
                            copyCode(this);
                        };
                        preContainer.appendChild(copyBtn);

                        // 使用
                        var importTitleEl = document.createElement("h2");
                        apiContentEl.appendChild(importTitleEl);
                        importTitleEl.innerText = "使用";

                        var contentEl = document.createElement("div");
                        apiContentEl.appendChild(contentEl);
                        contentEl.setAttribute("class", "content");

                        contentEl.innerHTML = "<div style='height:300px;margin-bottom:50px;' class='stylecss-skeleton'></div>";
                        fetchData("./api/" + bundleItem.name + ".html").then(function (res) {
                            window.location.href = "./index.html#/api/" + typeName + "/" + bundleItem.name;
                            contentEl.innerHTML = res;
                            // 为动态加载的代码块添加复制按钮
                            setTimeout(addCopyButtonToPre, 100);
                        });

                        // 关闭
                        var closeEl = document.createElement("div");
                        headerEl.appendChild(closeEl);
                        closeEl.innerText = "返回";
                        closeEl.setAttribute("class", "close-btn");

                        closeEl.addEventListener("click", function () {
                            window.location.href = "./index.html#/";
                            apiViewEl.style.display = "";
                            document.body.style.overflow = "";
                        });

                        apiViewEl.style.display = "block";
                        document.body.style.overflow = "hidden";
                    });
                })(typeName, bundleItem);
            }

        }


        var btnEl = document.getElementById(window.location.hash.split("#")[1]);
        if (btnEl) btnEl.click();

    });
}