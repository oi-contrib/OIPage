const { readFileSync, existsSync, lstatSync } = require("fs");
const { join } = require("path");
const { testIntercept } = require("../intercept.js");

module.exports = function (basePath, filePath, entry, intercept, isDownload) {
    basePath = join(basePath, "./");

    let source = readFileSync(filePath);
    let resolveImport = content => content;

    let __resolveImport = function (content) {
        return content.replace(/import [^'"]* from (['"])([^'"]*)['"]/sg, function (_importCode, _, _importUrl) {
            if (/^[./]/.test(_importUrl)) {
                return _importCode;
            } else {
                return _importCode.replace(_importUrl, _importUrl.replace(/([^/])+/s, function (npmName) {

                    if (testIntercept(npmName, intercept)) {
                        return "/@modules/" + npmName;
                    } else {

                        let node_modulesRootPath = join(filePath, "../");
                        let prePath = "";
                        while (true) {
                            let npmBundlePath = join(node_modulesRootPath, "./node_modules/", npmName);

                            // 如果存在
                            if (existsSync(npmBundlePath) && lstatSync(npmBundlePath).isDirectory()) {
                                let npmNameValue = npmName;

                                // 对于类似 import VISLite from "vislite"
                                // 需要把包名解析成具体的文件
                                if (!/\//.test(_importUrl)) {
                                    let bundlePackage = require(join(npmBundlePath, "./package.json"));
                                    npmNameValue = npmName + "/" + bundlePackage.main;
                                }

                                return (prePath ? prePath : "./") + "node_modules/" + npmNameValue;
                            }

                            if (node_modulesRootPath === basePath) {

                                // 如果命令行根目录是一个项目
                                let packagePath = join(basePath, "./package.json");
                                if (existsSync(packagePath) && !lstatSync(packagePath).isDirectory()) {
                                    let bundlePackage = require(packagePath);
                                    if (!/\//.test(_importUrl)) {
                                        return "/" + bundlePackage.main;
                                    } else {
                                        return "/"
                                    }
                                }

                                return npmName;
                            } else {
                                node_modulesRootPath = join(node_modulesRootPath, "../");
                                prePath = "../" + prePath;
                            }
                        }

                    }
                }));
            }
        });
    };

    // 如果是下载
    if (isDownload) {
        // todo
    }

    // 如果不是直接访问的
    else if (!entry) {
        source += "";
        resolveImport = (content, notResolve) => notResolve ? content : __resolveImport(content);
    }

    // 如果是.html或.htm结尾
    else if (/\.html{0,1}$/.test(filePath)) {
        source = (source + "").replace(/<script type="module">(.*)<\/script>/sg, function (_, _matchCode) {
            return `<script type="module">${__resolveImport(_matchCode)}</script>`;
        });
    }

    return {
        source,
        resolveImport
    };
};