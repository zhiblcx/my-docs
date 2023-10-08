---
title: 初识kotlin
date: 2023-08-20
category:
  - 使用指南
  - kotlin
---

## 1. 变量

kotlin只允许变量前声明两种关键字:var和val

val(value的简写)用来声明一个不可变的变量，这种变量在初始化赋值后就再也不能重新赋值

var(variable的简写)用来声明一个可变的变量，这种变量在初始赋值之后仍然可以再被赋值

> kotlin的每一行代码的结尾是不需要加分号的

## 2. 函数

```kotlin
fun methodName(param1:Int , param2:Int):Int{
  return 0
}
```

**kotlin函数语法糖**

```kotlin
fun methodName(param1:Int , param2:Int) = max(param1,param2)
```

类似于javascript的箭头函数

## 3. 条件语句

1. if条件语句

```kotlin
fun largerNumber(param1:Int,param2:Int):Int{
    var value = 0
    if(param1>param2){
        value = param1
    }else{
        value = param2
    }
    return value
}
```

> kotlin中的if相当于Java有一个额外的功能，它是可以有返回值的，返回值就是if语句每一个条件的中最后一行代码的值

```kotlin
fun largerNumber(param1:Int,param2:Int):Int{
    val value = if(param1 > param2){
        param1
      }else{
        param2
    }
    return value
}
```

2. when条件语句

```kotlin
fun getStore(name:String) = when(name){
  "Tom" -> 86
  "Jim" -> 77
  "Jack" -> 95
  "Lily" -> 100
  else -> 0
}
```

> when语句允许传入一个任意类型的参数，然后可以在when结构体定义一系列条件，格式是：匹配值 -> {执行逻辑}

除了精确匹配以外，when语句还允许进行类型匹配

```kotlin
fun checkNumber(num:Number){
  when(num){
    is Int -> println("number is Int")
    is Double -> println('number is double')
    else -> println('number not support')
  }
}
```

when 还有一种不带参数的

```kotlin 
fun getStore(name:String) = when{
  name == "Tom" -> 86
  name == "Jim" -> 77
  name == "Jack" -> 95
  name == "Lily" -> 100
  else -> 0
}
```

> 注意kotlin判断字符串或对象是否相等可以用 == 

name不带参数的用法

```kotlin
fun getStore(name:String) = when{
  name.startsWith("Tom") -> 86
  name == "Jim" -> 77
  name == "Jack" -> 95
  name == "Lily" -> 100
  else -> 0
}
```

> 不管传入名字是 Tom 或 Tommy，只要以 Tom 开头，分数都为 86  

## 4. 循环语句

while循环与java或者其他语言类似

```kotlin
val rang = 0..10
```
上面代码表示创建了一个0-10的区间，[0,10]

..是创建两端闭区间的关键字

`for in` 遍历区间中的每一个元素

```kotlin 
for(i in 0..10){
  println(i)
}
```

```kotlin
val range = 0 until 10
```

上述代码表示创建了一个0到10的左闭右开区间,[0,10)

```kotlin
for(i in range 0 until 10 step 2)
```

每次递增2，相当于循环 i = i + 2 的效果

```kotlin
for(i in 10 downTo 1){
  println(i)
}
```

这样我们就创建了一个降序区间，[10,1]

## 5. 面向对象编程

### 5.1 类和对象

```kotlin
class Person{
  var name = ""
  var age = 0

  fun eat(){
    println(name + ' is eating. He is ' + age +" years old.")
  }
}

fun main(){
  val p = Person()
  p.name = "Jack"
  p.age = 19
  p.eat()
}
```

输出 Jack is eating. He is 19 years old.

> kotlin实例化一个类的方式与java类似，只是去掉了new关键字

**面向对象编程：**

要将事物封装成具体的类，然后将事物所拥有的属性和能力分别定义为类中的字段和函数，接下来对类进行实例化，再根据具体的编程需求调用类中的字段和方法即可。


### 5.2 继承

kotlin 默认所有非抽象类是不可以被继承的，在类的前面加上 `open` 关键字就可以被继承了。

```kotlin
// Person类
open class Person{
    ...
}

// Student类
class Student : Person(){
  var sno = ""
  var grade = 0
}
```

> 在 java 中继承是 extends ，而在kotlin中变成了一个冒号 :

kotlin 将构造函数分为了两种：主构造函数和次构造函数

### 5.3 主构造函数

主构造函数是最常用的构造函数，每个类默认都会有一个不带参数的主构造函数，也可以指定显示指明参数。主构造函数的特点是没有函数体，直接定义在类名即可。

```kotlin
class Student : Person(){}
```

> 在这里，Person类后面的一对空括号表示Student类的主构造函数在初始化的时候会调用Person类的无参构造函数，即使在无参数的情况下，这对括号也不能省。

主构造函数没有函数体，如果我们想要在主构造函数中编写一些逻辑怎么办？kotlin为我们提供了init结构体，所有主构造函数的逻辑都可以写在里面

```kotlin
class Student(val sno : String, val grade : Int) : Person(){
  init{
    println("sno is " + sno)
    println("grade is " + grade)
  }
}
```

```kotlin
// 如果把Person类改为这样，Student类会报错，因为Person已经没有无参的构造函数了
open class Person(val name: String,val age: Int){
    ...
}

class Student(val sno: String,val grade: Int,name:String,age:Int):Person(name,age){
  ...
}
```

> 注意，我们在Student类的主构造函数中添加 name 和 age这两个字段时，不能再将它们声明成 val，因为在主构造函数中声明成 val或者var 的参数将自动成为该类的字段，这就会导致和父类中同名的 name 和 age 字段造成冲突。因此，这里的 name 和 age 参数前面我们不用加任何关键字，让它的作用域仅限定在主构造函数当中即可。

下面是创建Student的实例

```kotlin
val student = Student("a123",5,"Jack",19)
```

### 5.4 次构造函数

## 6. 接口

```kotlin
interface Study {
    fun readBooks()
    fun doHomework()
}
```

以上是Study接口，注意接口中不要有函数体

```kotlin
class Student(name: String, age: Int) : Person(name, age),
    Study {
    override fun readBooks() {
        println(name + " is reading.")
    }

    override fun doHomework() {
        println(name + " is doing homework.")
    }
}
```

以上是Student实现Study接口，Java实现接口的关键字是`implements`，而`kotlin`统一用冒号，中间用逗号分隔。

> 接口后面不需要加上括号，因为它没有构造函数可调用

```kotlin
fun main() {
    val student = Student("Jack", 19)
    doStudy(student)
}

fun doStudy(study: Study) {
    study.readBooks()
    study.doHomework()
}
```

首先创建了一个 Student 类的实例，将它传入到了doStudy()函数中。doStudy()函数接收了一个Study类型的参数，由于Student类实现了Study接口，因此Student类的实例是可以传递给doStudy()函数的，接下来我们调用了Study接口的readBookds()和doHomework()函数，这种就叫做面向接口编程，也可以称为多态。

**调用接口中的函数**

```kotlin
interface Study {
    fun readBooks()
    fun doHomework() {
        println("do homework default implementation.")
    }
}
```

我们给doHomework()函数中添加了函数体。如果接口中的一个函数拥有了函数体，这个函数体的内容就是它的默认内容。现在当一个类去实现Study接口时，只会强制要求实现readBooks()函数，而doHomework()函数则可以自由选择实现或者不实现，不实现就会实现默认的逻辑。

**kotlin函数可见性修饰符对照表**

|  修饰符   |       kotlin       |
| :-------: | :----------------: |
|  public   |  所有类可见(默认)  |
|  private  |     当前类可见     |
| protected |  当前类、子类可见  |
| internal  | 同一模块中的类可见 |


## 7. 数据类与单例类

### 7.1 数据类

数据类用于将服务器端或数据库中的数据映射到内存中，为编程逻辑提供数据模型的支持。

```kotlin
data class Cellphone(val brand: String,val price: Double)
```

当在一个类前面声明了data关键字时，就表明希望这个类是一个数据类，kotlin会根据主构造函数中的参数帮你将`equals()`、`hashCode()`、`toString()`等固定且无实际逻辑意义的方法自动生成，从而大大减少了开发的工作量。

> 当一个类中没有任何代码时，可以将尾部的大括号省略

```kotlin
fun main() {
    val cellphone1 = Cellphone("samsung", 1299.99)
    val cellphone2 = Cellphone("samsung", 1299.99)
    println(cellphone1)
    println(cellphone2 == cellphone1)
}
```

输出：Cellphone(brand=samsung, price=1299.99)
      true


### 7.2 单例类

单例类是最常用、最基础的设计模式之一，它可以用于避免创建重复的对象。

```kotlin
object Singleton{
  fun singletonTest(){
    println("singletonTest is called.")
  }
}
```

创建单例类,并且加入了一个singletonTest()函数

## 8. Lambda编程

### 8.1 集合的创建与遍历

**List集合**

```kotlin
val list = listOf("Apple","Banana","Orange","Pear","Grape")
```

> listOf()函数创建的是一个不可变的集合

```kotlin
val list = mutableListOf("Apple","Banana","Orange","Pear","Grape")
list.add("Watermelon")
```

> mutableListOf()函数创建的是一个可变的集合

```kotlin
for(fruit in list){
  println(fruit)
}
```

> for-in不仅可以遍历区间，还可以遍历集合。

**Set集合**

set集合与list集合用法几乎一模一样，`setOf()`、`mutableSetof()`

> Set集合中是不可以存放重复的元素的，如果存放重复的元素，只会保留其中的一份

**Map集合**

Map集合提供了两个方法,`mapOf()`、`mutableMapOf()`

```kotlin
fun main(){
  val map = mapOf("Apple" to 1,"Banana" to 2,"Orange" to 3,"Pear" to 4,"Grape" to 5)
  for((fruit,number) in map){
    println("fruit is " + fruit + ",number is " + number)
  }
}
```

输出  fruit is Apple,number is 1
      fruit is Banana,number is 2
      fruit is Orange,number is 3
      fruit is Pear,number is 4
      fruit is Grape,number is 5


### 8.2 集合的函数式API

Lambda表达式的语法结构

```kotlin
{参数名1：参数类型，参数名2：参数类型 -> 函数体}
```

这是Lambda表达式最完整的语法结构定义。首先最外层是一对大括号，如果有参数传入到Lambda表达式中的话，我们还需要声明参数列表，参数列表的结尾使用 -> 符号，表示参数列表的结束以及函数体的开始，函数体可以编写任意行代码（虽然不建议编写太长的代码），并且最后一行代码会自动作为Lambda表达式的返回值。

```kotlin
val maxLengthFruit = list.maxBy({fruit:String -> fruit.length})
```

kotlin 规定，当Lambda参数是函数的最后一个参数时，可以将Lambda表达式移到函数括号的外面

```kotlin
val maxLengthFruit = list.maxBy(){fruit:String -> fruit.length}
```

接下来，如果Lambda参数是函数的唯一一个参数，还可以将函数的括号省略

```kotlin
val maxLengthFruit = list.maxBy{fruit:String -> fruit.length}
```

kotlin拥有出色的类型推导机制，Lambda表达式中的参数列表其实在大多数情况下不必声明参数类型

```kotlin
val maxLengthFruit = list.maxBy{fruit -> fruit.length}
```

当Lambda表达式的参数列表中只有一个参数，也不必声明参数名，而是可以使用it关键字代替

```kotlin
val maxLengthFruit = list.maxBy{ it.length }
```

将水果换成大写模式

```kotlin
fun main(){
  var list = listOf("Apple","Orange","Pear","Banana","Grade")
  val newList = list.map { it.toUpperCase() }
  for(fruit in newList){
    println(fruit)
  }
}
```

> map集合用于将集合中的每个元素都映射成另外一个值

filter函数是用来过滤集合中的数据的

如果我们想保留5个字母以内的水果，并且字母大写

```kotlin
fun main(){
  val list = listOf("Apple","Orange","Pear","Grade","Banana")
  val newList = list.filter{ it.length <= 5 }.map{ it.toUpperCase() }
  for(fruit in newList){
    println(fruit)
  }
}
```

any函数用于判断集合中是否存在一个元素满足指定条件

all函数用于判断集合中是否所有元素都满足指定条件

## 9. 空指针检查

### 9.1 可选空类型

kotlin默认所有参数和变量都不能为空，如果必须为空的话，在类名的后面加上一个?

```kotlin
fun doStudy(study: Study?){
  if(study != null){
    study.readBooks()
    study.doHomework()
  }
}
```

### 9.2 判空辅助工具

```kotlin
a?.doSomething()
==
if(a != null){
  a.doSomething()
}
```

> 当对象不为空的时候，正确调用相应的方法，当对象为空的时候，什么都不做

```kotlin
fun doStudy(study: Study?){
    study?.readBooks()
    study?.doHomework()
}
```

```kotlin
val c = if( a != null){
  a
}else{
  b
}
```

这段代码的逻辑使用 `?:` 可以简化成

```kotlin
val c = a ?: b
```

> ?: 这个操作符的左右两边都接收一个表达式，如果左边的表达式的结果不为空，就返回左边的表达式的结果，否则返回右边表达式的值

获取文本的长度

```kotlin
fun getTextLength(text:String?) = text?.length ?: 0
```

非空断言 `!!`

这是一种有风险的写法，意在告诉kotlin,我非常确信这里的对象不会为空，所以不用你来帮我做空指针检查了，如果出现问题，你可以直接抛出空指针异常，后果我自己承担。

```kotlin
fun doStudy(study: Study?){
    study?.readBooks()
    study?.doHomework()
}

==

fun doStudy(study:Study?){
  study?.let{
    it.readBooks()
    it.doHomework()
  }
}
```

> let可以处理全局变量的判空问题，if无法做到这一点。



## 10. kotlin 小技巧

### 10.1 字符串内嵌表达式

```kotlin
"hello, ${obj.name}. nice to meet you!"
```

> 当表达式只有一个变量的时候，还可以将两边大括号省略 "hello, name. nice to meet you!"

### 10.2 函数参数的默认值

```kotlin
fun printParams(num:Int ,str:String = "hello"){
  println("num is $num,str is $str")
}
```

我们可以在定义函数的时候给任意参数设定一个默认值，这样当调用此函数时就不会强制要求调用方为此提供参数，在没有参数的情况下会自动使用参数的默认值