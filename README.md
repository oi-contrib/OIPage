# [OIPage](https://github.com/oi-contrib/OIPage)
OI页面快速开发辅助库，包括核心包、Nodejs、浏览器、样式文件等

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=oipage&interval=7">
        <img src="https://img.shields.io/npm/dm/oipage.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/oipage">
        <img src="https://img.shields.io/npm/v/oipage.svg" alt="npm">
    </a>
    <a href="https://github.com/oi-contrib/OIPage" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/OIPage?style=social">
    </a>
</p>

<img src="https://nodei.co/npm/oipage.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

## 使用方式

你可以作为一个命令行使用，那么你需要全局安装：

```shell
npm install -g oipage
```

也可以作为项目开发中的一个功能加强，在 package.json 中配置命令或nodejs文件中引入需要的模块使用，那么就在项目中执行安装命令：

```shell
npm install oipage --save
```

全局安装后，就可以直接作为命令行使用了。你可以打印帮助查看：

```shell
oipage-cli -h
```

比如会出现下列内容：

```
Usage: oipage-cli <command>

    where <command> is one of:
        --help, -h, --server, -s, --version, -v, --config, -c, --delete, --copy, --pick, --move, --network, --get, --post, --cat, --run
    
    oipage-cli --help|-h <term>       search for help on <term>
    oipage-cli --help|-h              involved overview
```

比如--server或-s命令如何查看具体使用说明？只需要：

```shell
oipage-cli -h s
```

然后看见打印提示：

```
oipage-cli --server|-s [port|20000]         [2]render source server.
```

根据提示我们知道，这是一个快速启动一个本地资源服务器的命令，使用的时候可以设置服务器端口号，端口号缺省是20000。

比如我们启动端口为8080的服务器：

```shell
oipage-cli -s 8080
```

对于更复杂的业务，我们推荐使用配置文件的方式。比如我们准备了配置文件 oipage.config.js ，那么就可以：

```shell
oipage-cli -c ./oipage.config.js
```

配置文件的内容如下：

```js
module.exports = {
    devServer: {
        // 可配置参数和“服务器”一致
    }
};
```

如果你需要在项目中更灵活的使用，我们也提供了一些有用的API，具体如下：

### 核心包

- [animation 动画](./docs/corejs/animation.md)
- [throttle 节流函数](./docs/corejs/throttle.md)

### Nodejs

- [服务器](./docs/nodejs/server.md)
- [命令行参数解析](./docs/nodejs/options.md)
- [文件相关操作](./docs/nodejs/file.md)
- [控制台打印](./docs/nodejs/console.md)
- [网络请求（ajax）](./docs/nodejs/ajax.md)
- [网络信息等](./docs/nodejs/network.md)
- [资源数据](./docs/nodejs/data.md)
- [图片相关操作](./docs/nodejs/image.md)
- [文件解析](./docs/nodejs/loader.md)
- [文件读取](./docs/nodejs/reader.md)
- [表单录入](./docs/nodejs/form.md)

### 浏览器

- [getStyle 获取节点样式](./docs/browserjs/getStyle.md)
- [onReady 解析完执行](./docs/browserjs/onReady.md)

### 样式文件

> 统一浏览器样式 `normalize.css` 直接： `import 'oipage/stylecss/normalize.css'` 即可！

- [rasterize 十二栅格化](./docs/stylecss/rasterize.md)
- [skeleton 骨架屏动画](./docs/stylecss/skeleton.md)

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步