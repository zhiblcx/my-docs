---
title: Buffer 缓冲区
date: 2023-08-16
order: 2
category:
  - node.js
tag:
  - 学习笔记
---

Buffer 的结构和数组很像，操作的方法也和数组类似

数组不能存储二进制文件，而 buffer 就是专门用来存储二进制数据，但在显示时都是16进制形式(00 - ff)

使用 buffer 不需要引入模块，可以直接使用

```js
// Buffer.form(str) 将字符串转换为字符编码
const str = Buffer.from('Hello')
console.log(str)

// Buffer.alloc(size) 返回指定大小的初始化 Buffer
const buf = Buffer.alloc(10)
buf[0] = 15
console.log(buf)

// Buffer.allocUnsafe(size) 不清除原来的数据，新创建的内容未知，可能包含敏感数据
const buf2 = Buffer.allocUnsafe(10)
console.log(buf2)

// 将Buffer数据转换为字符串
const buf3 = Buffer.from('这是数据')
console.log(buf3.toString())
```