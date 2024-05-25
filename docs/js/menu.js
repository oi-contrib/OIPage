document.getElementById("version-id").innerText = window.OIPage_system.version;

var menuEl = document.getElementById("menu-id");
var contentEl = document.getElementById("content-id");

// 记录当前地址栏信息
var urlObj = pageby.url();

var changePage = function (pagename, isInit) {
    if (!isInit) urlObj.router[1] = pagename;

    fetchData("./pages/" + urlObj.router[0] + "/" + pagename + ".html").then(function (res) {
        contentEl.innerHTML = res;
        pageby.shader(contentEl);

        // 打开编辑界面按钮
        var editBtn = document.createElement('a');
        contentEl.appendChild(editBtn);
        editBtn.innerHTML = '<svg fill="currentColor" height="20" width="20" viewBox="0 0 40 40" class="iconEdit_Z9Sw" aria-hidden="true"><g><path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"></path></g></svg>在 GitHub 上编辑此页';
        editBtn.setAttribute('class', 'to-editor-btn');
        editBtn.setAttribute('href', "https://github.com/oi-contrib/OIPage/edit/master/docs/pages/" + urlObj.router.join('/') + ".html");
        editBtn.setAttribute('target', '_blank');

        if (!isInit) window.location.href = "#/" + urlObj.router.join("/");
    });
};

var changeMenu = function (menuname, isInit) {
    if (!isInit) urlObj.router[0] = menuname;

    fetchData("./pages/" + menuname + "/menu.html").then(function (res) {
        menuEl.innerHTML = res;
        var spanEls = menuEl.getElementsByTagName("span"), firstSpanEl, targetSpanEl, tagValue;

        for (var index = 0; index < spanEls.length; index++) {
            tagValue = spanEls[index].getAttribute("tag");
            if (tagValue) {
                if (!firstSpanEl) firstSpanEl = spanEls[index];
                if (tagValue == urlObj.router[1]) targetSpanEl = spanEls[index];

                (function (tagValue, index) {
                    spanEls[index].addEventListener("click", function () {
                        changePage(tagValue);

                        for (var k = 0; k < spanEls.length; k++) {
                            if (spanEls[k].getAttribute("tag")) spanEls[k].setAttribute("active", "no");
                        }
                        spanEls[index].setAttribute("active", "yes");
                        spanEls[index].parentElement.parentElement.parentElement.setAttribute("active", "yes");
                    });
                })(tagValue, index);
            } else {
                spanEls[index].parentElement.setAttribute("active", "no");
                (function (el) {
                    el.addEventListener("click", function () {
                        let active = el.parentElement.getAttribute("active") == "yes" ? "no" : "yes";
                        el.parentElement.setAttribute("active", active);
                    });
                })(spanEls[index]);
            }
        }

        (targetSpanEl || firstSpanEl).click();
    });
};

if (!urlObj.router[0]) urlObj.router[0] = "introduce";

var isInit = true;

var spanEls = document.getElementById("nav-id").getElementsByTagName("span"), firstSpanEl, targetSpanEl, tagValue;
for (var index = 0; index < spanEls.length; index++) {
    tagValue = spanEls[index].getAttribute("tag");
    if (tagValue) {
        if (!firstSpanEl) firstSpanEl = spanEls[index];
        if (tagValue == urlObj.router[0]) targetSpanEl = spanEls[index];

        (function (tagValue, index) {
            spanEls[index].addEventListener("click", function () {
                changeMenu(tagValue, isInit);
                isInit = false;

                for (var k = 0; k < spanEls.length; k++) {
                    spanEls[k].setAttribute("active", "no");
                }
                spanEls[index].setAttribute("active", "yes");
            });
        })(tagValue, index);
    }
}

(targetSpanEl || firstSpanEl).click();