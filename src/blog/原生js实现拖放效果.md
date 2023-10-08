---
title: 原生js实现拖放效果
date: 2023-08-17
category:
  - 使用指南
  - javascript
---

拖放是很常见的一种交互效果，很多时候我们都会借助于第三方的控件来实现，其实用原生js实现起来也非常的方便。接下来我们就用原生js和css快速实现这样的拖放效果：

![](./image/dragAnddrop.gif)

`html：`

```html
 <body>
  <div class="droppable">
    <div class="draggable" draggable="true"></div>
  </div>
  <div class="droppable"></div>
  <div class="droppable"></div>
  <div class="droppable"></div>
  <div class="droppable"></div>
</body>
```

> 注意点：1. 容器的class=droppable，用于接受被拖拽的图片，可被拖拽的元素class=draggable，同时设置draggable=true，表示该元素可以被拖拽。2. 默认情况下，只有图片、连接还有被选中的文字能被拖拽，其他元素都需要设置`draggable`为`true`才能拖拽。

`css：`

```css
  body {
     background-color: pink;
  }

  .droppable {
    display: inline-block;
    width: 160px;
    height: 160px;
    margin: 10px;
    border: 3px pink solid;
    background-color: white;
    }

  .draggable {
    background-image: url('http://source.unsplash.com/random/150x150');
    position: relative;
    height: 150px;
    width: 150px;
    top: 5px;
    left: 5px;
    cursor: pointer;
    }

  .draggable-over {
    border-style: dashed;
  }

  .invisible {
    display: none;
  }
```

> 1. `draggable-over`为droaggable元素被拖动到容器上方时容器的状态。2. `invisible`为droggable元素开始拖动的时候，在原来存在的容器中消失


`js：`

```js
const draggable = document.querySelector('.draggable')
const droppableAll = document.querySelectorAll('.droppable')
draggable.addEventListener('dragstart', function () {
  setTimeout(() => {
    this.className = 'invisible'
  }, 0)
  console.log('图片开始拖动')
})
draggable.addEventListener('drag', function () {
  console.log('图片拖动过程中')
})
draggable.addEventListener('dragend', function () {
  this.className = 'draggable'
  console.log('图片拖动结束')
})
for (let i = 0; i < droppableAll.length; i++) {
  droppableAll[i].addEventListener('dragenter', function () {
    this.className += ' draggable-over'
    console.log('图片进入到框' + i + '里')
  })
  droppableAll[i].addEventListener('dragover', function (event) {
    event.preventDefault()
    console.log('图片在框' + i + '里移动')
  })
  droppableAll[i].addEventListener('dragleave', function () {
    this.className = 'droppable'
    console.log('图片离开框' + i)
  })
  droppableAll[i].addEventListener('drop', function () {
    this.className = 'droppable'
    this.append(draggable)
  })
}
```

**拖放事件**

拖放事件由不同的元素产生。一个元素被拖放，它可能会经过很多个元素，最终到达想要的元素内。这里我将被拖放的元素称为源对象，被经过的元素称为过程对象，到达的元素我称为目标对象。不同的对象产生不同的拖放事件。

源对象:

- dragstart：源对象开始拖放

- drag：源对象拖放过程中

- dragend：源对象拖放结束

目标对象：

- dragenter：源对象开始进入到过程对象范围内

- dragover：源对象开始在过程对象范围内移动

- dragleave：源对象离开过程对象的范围

目标对象

- drop：源对象被拖放目标对象内

**一个最小的拖放示例**

我们在容器中有一个可拖放的元素，尝试抓住这个元素，将其拖放到另一个容器中，然后释放它

我们在这里使用了三个事件处理器：

- 在 `dragstart` 事件处理中，我们获得对用户拖放的元素的引用
- 在目标容器的`dragover`事件处理中，我们调用`event.preventDefault()`，以使得元素能够接收到`drop`事件
- 在放置区域中`drop`事件处理器中，我们将可拖放元素从原来容器中移动到放置区域。