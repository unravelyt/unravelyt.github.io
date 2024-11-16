---
title: SpringBoot读取Resource目录下的资源文件
tags:
  - Java
  - SpringBoot
createTime: 2024/11/16 23:08:55
permalink: /note_java/4z9inlqx/
---



## 1. 使用ResourceUtils获取

> 导包：import org.springframework.util.ResourceUtils;


### 1.1 获取文件绝对路径 
- 先获取绝对路径地址，然后通过地址生成File文件
```Java
String path = ResourceUtils.getURL(ResourceUtils.CLASSPATH_URL_PREFIX+"logback.xml").getPath();
System.out.println("文件绝对路径="+path); // D:/ideaProject/treasure-chest/wshoto/target/classes/logback.xml

FileInputStream inputStream1 = new FileInputStream(path);
```
### 1.2 直接获取文件
- 1.1 的简略版本，省去了获取绝对路径
```java
File file = ResourceUtils.getFile(ResourceUtils.CLASSPATH_URL_PREFIX+"logback.xml");
```

## 2. 类加载器获取


### 2.1 类加载器种类
1. **引导类加载器(Bootstrap CLassLoader)**
它是由本地代码(c/c++)实现的，你根本拿不到他的引用，但是他实际存在，并且加载一些重要的类，它加载(%JAVA_HOME%\jre\lib),如rt.jar(runtime)、i18n.jar等，这些是Java的核心类。 他是用原生代码来实现的，并不继承自 java.lang.ClassLoader。
2. **扩展类加载器(Extension CLassLoader)**
虽说能拿到，但是我们在实践中很少用到它，它主要加载扩展目录下的jar包， %JAVA_HOME%\lib\ext
3. **系统类加载器(System CLassLoader)**
它主要加载我们应用程序中的类，如Test,或者用到的第三方包,如jdbc驱动包等。
这里的父类加载器与类中继承概念要区分，它们在class定义上是没有父子关系的。

### 2.2 获取类加载器：

1. 获取加载当前类的类加载器，可能是"启动类加载器"、“拓展类加载器”、"系统类加载器"等，取决于当前类是由哪个加载器加载的；
```java
//获取当前类的加载器
ClassLoader classLoader = Test.class.getClassLoader();
```
2. 获取当前线程上下文的类加载器，用户可以自己设置，java se环境下一般是AppClassLoader、java ee环境下一般是WebappClassLoader
```java
//获取当前线程上下文类加载器
ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();

```
3. 获取系统类加载器 System CLassLoader
```java
//获取系统类加载器 System CLassLoader
ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
```
4. 获取当前线程的ClassLoader
```java
ClassLoader contextClassLoader1 = Thread.currentThread().getContextClassLoader();
```


### 2.3 通过类加载器获取资源

```java
ClassLoader loader = ClassLoader.getSystemClassLoader();

InputStream inputStream2 = loader.getResourceAsStream("logback.xml");
```

## 3. ClassPathResource获取文件(推荐)

- 读取classPaths路径下的文件

```java
Resource resource = new ClassPathResource("logback.xml");
File file = resource2.getFile();
```











