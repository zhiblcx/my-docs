---
title: andorid UI开发的点点滴滴
date: 2023-08-24
category:
  - 使用指南
tag:
  - android
---

## 常用控件的使用方法

### TextView

Android 中所有的控件都具有`android:layout_width`和`android:layout_height`这两个属性，可选值有3种：`match_parent`、`wrap_content`和固定值。

`match_parent`：让当前控件的大小和父布局的大小一样。

`wrap_content`：让当前控件的大小能够刚好包含住里面的内容。

固定值：给控件一个指定的固定的尺寸，单位一般用dp，这是一种屏幕密度无关的尺寸单位，可以保证在不同分辨率的手机上显示效果尽量一致。

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
 android:orientation="vertical"
 android:layout_width="match_parent"
 android:layout_height="match_parent">
 <TextView
 android:id="@+id/textView"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 android:gravity="center"
 android:text="This is TextView"/>
</LinearLayout> 
```

`android:gravity`：指定文字的对齐方式，可选值有`top`、`buttom`、`start`、`end`、`center`，可以用'|'来同时指定多个值

```xml
<TextView 
 android:id="@+id/textView"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 android:gravity="center"
 android:textColor="#00ff00"
 android:textSize="24sp"
 android:text="This is TextView"/>
```

`android:textColor`：指定文字的颜色

`android:textSize`：指定文字的大小

### Button

Andr oid 系统默认会将按钮上的英文字母全部转换成大写，如果这不是想要的效果，可以在xml添加`android:textAllCaps="false"`这个属性

### EditText

EditText 是程序用于和用户进行交互的另一个重要控件，它允许用户在控件里输入和编辑内容，并可以在程序中对这些内容进行处理。

```xml
<EditText
    android:id="@+id/editText"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Type something here"
    android:maxLines="2" 
    />
```

`android:hint`：提示性文本。

`android:maxLines`：指定最大行数

### ImageView

ImageView 是用于在界面上展示图片的一个控件，它可以让我们的程序界面变得更加丰富多彩。

```xml
<ImageView
 android:id="@+id/imageView"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:src="@drawable/img_1"
 /> 
```

### ProgressBar

ProgressBar 用于在界面上显示一个进度条，表示我们的程序正在加载一些数据。

```xml
<ProgressBar
 android:id="@+id/progressBar"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 /> 
```

所有的 Android 控件都具有这个属性，可以通过 `android:visibility` 进行指定，可选值有3种：visible、invisible 和 gone。

visible 表示控件是可见的，这个值是默认值，不指定 android:visibility 时，控件都是可见的。

invisible 表示控件不可见，但是它仍然占据着原来的位置和大小，可以理解成控件变成透明状态了。

gone则表示控件不仅不可见，而且不再占用任何屏幕空间。

我们可以通过代码来设置控件的可见性，使用的是 setVisibility() 方法，允许传入View.VISIBLE、 View.INVISIBLE和 View.GONE 这3种值。

```kotlin
override fun onClick(v: View?) {
    when (v?.id) {
        R.id.button -> {
            if (progressBar.visibility == View.VISIBLE) {
                progressBar.visibility = View.GONE
            } else {
                progressBar.visibility = View.VISIBLE
            }
        }
    } 
```

```xml
<ProgressBar
 android:id="@+id/progressBar"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 style="?android:attr/progressBarStyleHorizontal"
 android:max="100"
 />
```

水平进度条

### AlertDialog

AlertDialog 可以在当前界面弹出一个对话框，这个对话框是置顶于所有界面元素之上的，能够屏蔽其他控件的交互能力，因此 AlertDialog 一般用于提示一些非常重要的内容或者警告信息。

```kotlin
AlertDialog.Builder(this).apply {
    setTitle("This is Dialog")
    setMessage("Something important.")
    setCancelable(false)
    setPositiveButton("OK") { dialog, which ->
                         }
    setNegativeButton("Cancel") { dialog, which ->
                             }
    show()
} 

```

`setPositiveButton()`方法为对话框设置确定按钮的点击事件

`setNegativeButton()`方法设置取消按钮的点击事件