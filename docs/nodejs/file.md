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

遍历当前文件或文件夹中所有文件：

```js
const { listFileSync } = require("oipage");

listFileSync(source, fileInfo => {});
```

其中fileInfo表示当前面对的文件信息，具体如下：

```js
{
    name: string, // 文件名
    path: string, // 文件相对命令行路径
    folder: string // 文件所在文件夹相对命令行路径
}
```

## 全路径

获取文件或文件夹的全路径：

```js
const { fullPathSync } = require("oipage");

let fullPath = fullPathSync(pathString, contextPath);
```

其中contextPath可选，如果当前根路径。