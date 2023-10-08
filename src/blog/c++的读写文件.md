---
title: c++ 文件的读写
date: 2023-10-08
category:
  - 使用指南
tag:
  - c++
---

1. fstream：可读可写操作
2. ifstream：只能读操作
3. ofstream：只能写操作

文件的打开方式

1. ios::in 为读文件打开方式
2. ios::out 为写文件打开方式
3. ios::ate 初始位置文件尾
4. ios::app 写文件尾追加
5. ios::trunc 若文件存在先删除，在创建
6. ios::binary 二进制方式打开

写入文件：

```c++
#include <iostream>
#include <fstream>
using namespace std;

int main(){
    ofstream ofs;
    ofs.open("a.txt",ios::in);
    ofs << "输入一行" << endl;
    ofs << "输入两行" << endl;
    ofs << "输入三行" << endl;
    ofs.close();
}
```

第一种读法：

```c++
#include <iostrea>
#include <fstream>
using namespace std;
int main(){
    ifstream ifs("123.txt",ios::in);
    if(!ifs.is_open()){
        cout << "文件不存在" << endl;
    }
    char arr[1024] = { 0 };
    while(ifs>>arr){
        cout << arr << endl;
    }
    ifs.close();
}
```

第二种读法：

```c++
#include <iostrea>
#include <fstream>
using namespace std;
int main(){
    ifstream ifs;
    ifs.open("123.txt",ios::in);
    if(!ifs.is_open()){
        cout << "文件不存在" << endl;
    }
    char arr[1024] = { 0 };
    while(ifs.getline(arr.sizeof(arr))) // 按行读取
    {
        cout << arr << endl;
    }
    ifs.open();
}
```

第三种字符串读取：

```c++
#include <iostrea>
#include <fstream>
using namespace std;
int main(){
    ifstream ifs;
    ifs.open("123.txt",ios::in);
    if(!ifs.is_open()){
        cout << "文件不存在" << endl;
    }
    string arr;
    while(getline(ifs,arr)){
        cout << arr << endl;
    }
    ifs.close();
}
```

第四种二进制读取文件：

read() 它属于 ifs 的成员函数，读取时需要调用

white() 它属于 ofs 的成员函数，写入时需要调用

```c++
#include <iostrea>
#include <fstream>
using namespace std;
struct student
{
    string name;
    int age;
}
int main()
{
    ofstream ofs;
    ofs.open("123.txt",ios::out|ios:;binary);
    student one = { "小明",12 };
    ofs.write((const char*)&one,sizeof(one));
    ofs.close();
    
    ifstream ifs;
    if(!ifs.is_open())
    {
        cout << "文件不存在" << endl;
    }
    ifs.read((char *)&one,sizeof(one));
    cout << "姓名" << one.name << "年龄" << one.age << endl;
    ifs.open();
}
```

