---
title: url模块和querystring模块
date: 2023-08-16
order: 4
category:
  - node.js
tag:
  - 学习笔记
---

**url模块**

1. url.parse()：将url字符串转换为对象
2. url.format()：将对象转换为字符串

```js
const str = 'www.baidu.com?id=500&name=jane&age=18'
const url = require('url')
url.parse(str)
url.format(url.parse(str))
```

**querystring模块**

1. qs.parse()：将字符串进行切分后形成对象
2. qs.stringfy()；将对象转换为字符串
3. qs.escape()：对给定的str执行百分比url编码操作
4. qs.unescape()：对给定的str执行url百分比解码操作

**parse使用**

```js
const qs = require('querystring')
const string = 'name=nzs&password=123456'
const personObj = qs.parse(string)
console.log(personObj)
输出：{ name：'nzs'，password:'123456' }

const string = 'name:nzs#password:123456'
const personObj = qs.parse(string, '#', ':')
console.log(personObj)
输出：{ name：'nzs'，password:'123456' }
```

- '#'：这个参数的作用是请求的多个参数之间用什么隔开，默认值为：'&'
- ':'：这个参数的作用是key与value用什么进行连接的，默认值为：'='

**stringify的使用**

```js
const qs = require('querystring')
const personObj = { name: 'nzs', password: '123465' }
const string = qs.stringify(personObj)
console.log(string)
输出：name=nzs&password=123465

const string = qs.stringify(personObj, '*', ':')
console.log(string)
输出：name:nzs*password:123465
```

**escape和unescape的使用**

```js
const result = qs.escape('name=码农')
console.log(result)
输出：name%3D%E7%A0%81%E5%86%9C

const string = 'name%3D%E7%A0%81%E5%86%9C'
const result = qs.unescape(string)
console.log(result)
输出：name=码农
```
