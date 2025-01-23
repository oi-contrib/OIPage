# 文件相关操作

## 删除

删除文件或文件夹：

```js
const { deleteSync } = require("oipage");

deleteSync(target);
```

## 复制

复制文件或文件夹：

```js
const { copySync } = require("oipage");

copySync(source, target);
```

## 移动

移动文件或文件夹：

```js
const { moveSync } = require("oipage");

moveSync(source, target);
```

## 遍历文件

遍历文件或文件夹中所有文件：

```js
const { listFileSync } = require("oipage");

listFileSync(source, fileInfo => {});
```

其中fileInfo表示当前面对的文件信息，具体如下：

```js
{
    name: string, // 文件名
    path: string, // 文件路径
    folder: string // 文件所在文件夹路径
}
```

## 遍历文件夹

遍历文件夹中所有文件夹：

```js
const { listFolderSync } = require("oipage");

listFolderSync(source, folderInfo => {});
```

其中folderInfo表示当前面对的文件架信息，具体如下：

```js
{
    name: string, // 文件夹名
    path: string, // 文件夹路径
}
```

此外，第二个参数作为一个函数，可以返回一个boolean值，默认false，如果返回true，将不再对此文件夹进行深入遍历。

## 全路径

获取文件或文件夹的全路径：

```js
const { fullPathSync } = require("oipage");

let fullPath = fullPathSync(pathString, contextPath);
```

其中contextPath可选，如果当前根路径。