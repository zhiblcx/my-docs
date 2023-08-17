---
title: 文件读写(fs模块)
date: 2023-08-16
order: 3
category:
  - node.js
tag:
  - 学习笔记
---

**fs 文件系统**

1. 在 Node 中，与文件系统的交互是非常重要的，服务器的本质就是将本地的文件发送给远程的客户端。

2. Node 通过 fs 模块来和文件进行交互，该模块提供了一些标准的文件访问API来打开、读取、写入文件，以及与其交互

3. 要使用 fs 模块，首先需要对其进行加载 `const fs = require('fs')`

### 1. 同步文件写入

1. 打开文件：`fs.openSync(path[,flags,mode])`

2. 写入内容：`fs.writeSync(fd,buffer[,offset[,length[,position]]])`

3. 保存并关闭文件：`fs.closeSync(fd)`

```js
// 1. 导入模块
const fs = require('fs')
// 2. 打开文件
const fd = fs.openSync('hello.txt','w')
// 3. 写入内容
fd.writeSync(fd,'码农云库的Node学习！')
// 4. 保存关闭
fs.closeSync(fd)
```

### 2. 异步文件写入

1. 打开文件：`fs.open(path[,flags[,mode]],callback)`

2. 写入内容：`fs.write(fd,buffer[,offset[,length[,position]]],callback)`

3. 保存并关闭：`fs.close(fd,callback)`

```js
// 1. 导入模块
const fs = require('fs')
// 2. 打开文件
fs.open('hello.txt', 'w', function (err, fd) {
  if (!err) { // 打开成功
    // 3. 写入内容
    fs.write(fd, '异步写入内容', function (err) {
      if (!err) { // 写入成功
        // 4. 关闭文件
        fs.close(fd, function (err) {
          if (!err) { // 关闭成功
            console.log('写入成功，已关闭文件！')
          }
        })
      }
    })
  }
})
```



### 3. 简单文件写入

一步到位：

```js
const fs = require('fs')

fs.writeFile('hello.txt',"简单文件写入",function(err){
  if(!err){
    console.log("写入成功！")
  }
})
```

### 4. 流式文件写入

不管是同步、异步、简单文件写入都不太适合大文件的写入，性能较差，容易导致内存溢出。

```js
// 1. 导入模块
const fs = require('fs')
// 2. 创建流
const ws = fs.createWriteStream('hello.txt') // 流式写入
// 监听事件
ws.once('open', function () {
  console.log('打开文件监听')
})

ws.once('close', function () {
  console.log('关闭文件监听')
})
// 3.写入内容
ws.write('1. 第一步\n')
ws.write('2. 第二步\n')
ws.write('3. 第三步\n')
// 4. 关闭流
ws.end()
```

### 5. 文件读取

简单读取文件：

1. 异步：`fs.readFile(path[,options],callback)`

2. 同步：`fs.readFileSync(path[,options])`

```js
const fs = require('fs')
// 读取内容
fs.readFile('hello.txt',function(err,data){
  console.log(data,toString())
})
```

**流式文件读取：**

1. 如果要读取一个可读流中的数据，必须要为可读流绑定一个data事件，data事件绑定完毕，它会自动开始读取数据

2. pipe() 可以将可读流中的内容直接输出到可写流中。

```js
const rs = fs.createReadStream('hello.txt') // 流式读取

rs.once('open', function () {
  console.log('文件打开了~')
})

rs.once('close', function () {
  console.log('文件关闭了~')
})

// 绑定 data 事件
rs.on('data', function (data) {
  console.log(data)
})

ws = fs.createWriteStream('1.txt') // 流式写入

// hello.txt 内容写入到了 1.txt
rs.pipe(ws)
```

### 6. fs 模块的其他方法

| 操作                      | 方法                                           |
| ------------------------- | ---------------------------------------------- |
| 检查文件是否存在(同步)      | fs.existsSync(path)                            |
| 检查文件是否存在(异步)      | fs.exists(path)                                |
| 查看文件状态               | fs.stat(path[, options], callback)             |
| 新建文件                   | fs.appendFile(path, data[, options], callback) |
| 重命名文件                 | fs.rename(oldPath, newPath, callback)         |
| 删除文件                   | fs.unlinkSync(path)                            |
| 创建目录                   | fs.mkdir(path[, options], callback)            |
| 读取目录结构               | rs.readdirSync(path,[options],callback)        |
| 拷贝文件                   | fs.copyFile(oldPath, newPath, callback)        |



### 7. fs 模块参数的说明

path: 必选参数，字符串，表示文件的路径

options: 可选参数，决定读取文件的编码方式

callback: 必选参数，文件读取后触发的回调函数

**fs 操作类型**

- r：读取文件，文件不存在则出现异常
- r+：读写文件，文件不存在则出现异常
- rs：在同步模式下打开文件用于读取
- rs+：在同步模式下打开文件用于读写
- w：打开文件用于写操作，如果不存在则创建，如果存在则截断，截断即覆盖全部
- wx：打开文件用于写操作，如果存在则打开失败
- w+: 打开文件用于读写，如果不存在则创建，如果存在则截断
- wx+：打开文件用于读写，如果存在则打开失败
- a：打开文件用于追加，如果不存在则创建
- ax：打开文件用于追加，如果路径存在则失败
- a+：打开文件进行读取和最佳，如果不存在则创建
- ax+：打开文件进行读取和追加，如果路径存在则失败