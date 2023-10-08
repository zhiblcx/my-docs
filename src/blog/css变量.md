---
title: css中的变量
date: 2023-08-18
category:
  - 使用指南
  - css
---

CSS变量是在CSS文档中定义的值，其目的是可重用性并减少CSS值中的冗余。

在一些代码中，一些颜色多次被使用，如果哪天要求更改颜色，我们只能一个一个的去改，但是css变量就很好的解决了这个问题。首先我们在`:root`中定义变量

```css
:root{
  --color-primary:#235ad1;
}
```

> 自定义变量名需要以`--`开头

**使用变量**

```css
.title{
  color:var(--color-primary)
}
```

`--color-primary` 是全局变量，因为我们在`:root`定义了它，如果我们想要在局部使用，比如tab栏

![](./image/tab栏.gif)

当字不同的时候，横线的长短也不一样，这时候不仅需要用到局部变量，也需要用到`calc`。`calc`允许在css进行数学运算。

```css
.tab-item::after{
	content: '';
	position: absolute;
	width: calc(50rpx * var(--tablength));
	height: 4rpx;
	background-color: black;
	left: 0px;
	right: 0px;
	bottom: 0px;
	margin: auto;
}
```

html部分只需要传字数就可以实现，横线也会跟随字数而变化。
