-   💘 开源不易，去 <i>[Github给个Star](https://github.com/oi-contrib/OIPage) </i>吧！

<img src='https://oi-contrib.github.io/OIPage/images/logo.png' height='100px'/>

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=oipage&interval=7">
        <img src="https://img.shields.io/npm/dm/oipage.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/oipage">
        <img src="https://img.shields.io/npm/v/oipage.svg" alt="npm">
    </a>
    <a href="https://github.com/oi-contrib/OIPage/issues">
        <img src="https://img.shields.io/github/issues/oi-contrib/OIPage" alt="issue">
    </a>
    <a href="https://github.com/oi-contrib/OIPage" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/OIPage?style=social">
    </a>
    <a href="https://github.com/oi-contrib/OIPage">
        <img src="https://img.shields.io/github/forks/oi-contrib/OIPage" alt="forks">
    </a>
     <a href="https://gitee.com/oi-contrib/OIPage" target='_blank'>
        <img alt="Gitee repo stars" src="https://gitee.com/oi-contrib/OIPage/badge/star.svg">
    </a>
    <a href="https://gitee.com/oi-contrib/OIPage">
        <img src="https://gitee.com/oi-contrib/OIPage/badge/fork.svg" alt="forks">
    </a>
</p>

<img src="https://nodei.co/npm/oipage.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

# [OIPage](https://github.com/oi-contrib/OIPage)
前端网页或应用快速开发助手，包括开发服务器、辅助命令、实用API等。官网地址：[https://oi-contrib.github.io/OIPage](https://oi-contrib.github.io/OIPage)

## 如何使用？

你可以作为一个命令行使用，那么你需要全局安装：

```shell
npm install -g oipage
```

也可以作为项目开发中的一个功能加强，在 package.json 中配置命令或nodejs文件中引入需要的模块使用，那么就在项目中执行安装命令：

```shell
npm install oipage --save
```

安装后，就可以直接作为命令行使用了。你可以打印帮助查看：

```shell
oipage-cli
```

比如会出现类似下列内容：

```
OIPage@v1.2.0

可以使用的命令如下：

【1】oipage-cli serve 开发服务器
    --port|-p 端口号
    --baseUrl 服务器根目录
......
```

根据提示我们知道，比如第一个命令，其提供了一个快速访问本地资源服务器的功能，比如执行：

```shell
oipage-cli serve -p 8080
```

启动成功后，直接访问： http://localhost:8080/ 即可。

如果你需要在项目中使用，我们也提供了一些有用的API，具体可以访问[ 在线文档 ](https://oi-contrib.github.io/OIPage)进行了解。

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步