---
title: 模块化
date: 2023-08-16
order: 1
category:
  - node.js
tag:
  - 学习笔记
---

## 1. 模块化简介

1. 一个 js 文件就是一个 js 模块

2. 在 node 中，通过 `require()` 函数来引入外部的模块,`require()` 可以传递一个文件路径作为参数，node将会自动根据该路径引入外部模块，这里的路径，如果使用相对路径，必须要以.或者..开头

3. 在使用 `require()` 函数引入模块后，该函数会返回一个对象，这个对象代表的是引入的模块

4. 在 node 中，每个 js 文件中的 js 代码都是独立运行在函数中。而不是全局作用域，所以一个模块中的变量和函数在其他模块中无法访问的。**但是可以通过exports(module.exports)来向外暴露变量和方法!**，只需要奖需要暴露给外部的变量和方法设置为`export`的属性即可。

5. 在 node 中有一个全局变量`global`，它的作用和网页中的`window`类似，在全局创建的变量和方法会作为 `global` 中的属性和方法保存。

模块 (第三方) 的引用：从当前目录的`node_modules`依次向上级寻找，只要存在就可以使用。

**创建模块**
```js
// 1. 使用 exports 单个导出
exports.x = 10;
exports.y = 20;
exports.add = function(a,b){
  return a + b;
};

// 2. 使用 module.exports 整体导出
module.exports = {
  name:'码云仓库',
  age:2,
  mul:function(a,b){
    return a * b;
  }
}
```

**使用模块**
```js
// 1. 引入模块
var math = require('./math');
console.log(math);
// 2. 使用模块 (通过exports单个导出的)
console.log(math.x)
console.log(math.y)
// 3. 使用模块 (通过 module 导出对象形式)
console.log(math.name)
console.log(math.age)
console.log(math.mul(2,8))
```

> exports 变量是 node提供的一个对 module.exports 的引用。exports 用添加属性的方式来导出，且只能导出一个对象，如果直接将 exports 变量指向一个值，不会影响 module.exports，但是这样等于切断了 exports 与 module.exports 的联系。最后导出的对象以 module.exports 为主

## 2. 包的简介
1. CommonJS 的包规范允许我们将一组相关的模块组合到一起，形成一组完整的工具。CommonJS 的包规范由包结构和包描述文件两部分组成。**包结构**：用于组织包中的各种文件。**包描述文件 package.json**：描述包的相关信息，以供外部读取分析。

2. **包结构**：包实际上就是一个压缩文件，解压以后还原为目录。符合规范的目录，应该包含如下文件：package.json --- 描述文件，bin --- 可执行二进制文件，lib --- js 代码, doc --- 文档, test --- 单元测试。

## 3. npm 简介
1. 全称：Node Package Manager (包管理器，就相当于一个应用商店，我们可以下载自己想要的软件(包))

2. CommonJS包规范是理论，npm 是其中一种实践

3. 对于 Node 而言，npm 帮助其完成了第三方模块发布、安装和依赖等。借助 npm，node 与 第三方模块之间形成了很好的一个生态系统。

4. 当我们安装好 node 以后，会自带一个 npm

**npm常用命令**

1. npm -v：查看版本

2. npm: 帮助说明

3. npm search 包名: 搜索包名

4. npm install 包名: 在当前目录下安装包

5. npm install 包名 -g :全局模式安装包

6. npm remove 包名 : 删除包

7. npm install 包名 -- save 安装包并添加到依赖中 (常用)

8. npm install : 下载当前项目所依赖的包 (根据package.json)

**淘宝npm镜像**

当我们在项目中`npm install` 太慢时，可以使用淘宝镜像来提高 npm 的速度
1. 单次使用
```
npm install --registry=https://registry.npmmirror.com/
```
2. 永久使用
```
npm config set registry https://registry.npmmirror.com/
```
3. 检测是否成功
```
npm config get registry
或
npm info express
```

> 通过 npm 下载的包都放在了 node_modules 文件夹中，通过 npm 下载的包可以直接通过包名引入即可

**node搜索包的流程**

node 在使用模块名来引入模块时，它会首先在当前目录下的`node_modules`中寻找是否含有该模块，如果有则直接使用，如果没有则去上一级目录寻找，直到找到为止

