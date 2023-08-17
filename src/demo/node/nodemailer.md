---
title: nodemailer模块发送邮件
date: 2023-08-16
order: 5
category:
  - node.js
tag:
  - 学习笔记
---

nodemailer模块可以实现发邮件。

<!-- more -->

**下载：**

`npm install nodemailer nodemailer-smtp-transport`

**发送邮件**

```js
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

smtpTransport = nodemailer.createTransport({
  service: 'QQ',
  secure: true,
  auth: {
    user: '', //自己的QQ邮箱地址
    pass: '' //授权码
  }
})

/**
 * @param {String} recipient 收件人的邮箱
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */

smtpTransport.sendMail(
  {
    from: '', // 自己的邮箱
    to: recipient,
    subject: subject,
    html: html
  },
  function (error, response) {
    if (error) {
      console.log(error)
    }
    console.log(response, '发送成功')
  }
)
```

1、什么是授权码？

授权码是QQ邮箱推出的，用于登录第三方客户端的专用密码。
适用于登录以下服务：POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务。
温馨提醒：为了你的帐户安全，更改QQ密码以及独立密码会触发授权码过期，需要重新获取新的授权码登录。

2、怎么获取授权码？

在 账号与安全 --安全设置--SMTP/IMAP服务 中开启服务并获取授权码

