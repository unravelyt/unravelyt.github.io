---
title: Maven镜像仓库配置
createTime: 2024/11/17 01:09:49
permalink: /note_maven/ab2mrv8r/
---


# maven相关知识

## 1. scope依赖范围

| scope取值    | 有效范围（compile, runtime, test） | 依赖传递 | 例子        |
| :----------- | :--------------------------------- | :------- | :---------- |
| **compile**  | all                                | 是       | spring-core |
| **provided** | compile, test                      | **否**   | servlet-api |
| **runtime**  | runtime, test                      | 是       | JDBC驱动    |
| **test**     | test                               | **否**   | JUnit       |
| **system**   | compile, test                      | 是       |             |

正如上表所示，

**compile** ：为**默认的**依赖有效范围。如果在定义依赖关系的时候，没有明确指定依赖有效范围的话，则默认采用该依赖有效范围。此种依赖，在编译、运行、测试时均有效。

**provided** ：在编译、测试时有效，但是在运行时无效。

provided意味着打包的时候可以不用包进去，别的设施(Web Container)会提供。

事实上该依赖理论上可以参与编译，测试，运行等周期。相当于compile，但是在打包阶段做了exclude的动作。

例如：servlet-api，运行项目时，容器已经提供，就不需要Maven重复地引入一遍了。

**runtime** ：在运行、测试时有效，但是在编译代码时无效。

说实话在终端的项目（非开源，企业内部系统）中，和compile区别不是很大。比较常见的如JSR×××的实现，对应的API jar是compile的，具体实现是runtime的，compile只需要知道接口就足够了。

例如：JDBC驱动实现，项目代码编译只需要JDK提供的JDBC接口，只有在测试或运行项目时才需要实现上述接口的具体JDBC驱动。

另外runntime的依赖通常和optional搭配使用，optional为true。我可以用A实现，也可以用B实现。

**test** ：只在测试时有效，包括测试代码的编译，执行。例如：JUnit。

PS: test表示只能在src下的test文件夹下面才可以使用，你如果在a项目中引入了这个依赖，在b项目引入了a项目作为依赖，在b项目中这个注解不会生效，因为scope为test时无法传递依赖。

**system** ：在编译、测试时有效，但是在**运行时无效**。

和provided的区别是，使用system范围的依赖时必须通过**systemPath元素显式地指定依赖文件的路径**。由于此类依赖**不是通过Maven仓库解析的，而且往往与本机系统绑定**，可能造成构建的不可移植，因此应该谨慎使用。

systemPath元素可以引用环境变量。例如：

```xml
<dependency>
    <groupId>javax.sql</groupId>
    <artifactId>jdbc-stdext</artifactId>
    <version>2.0</version>
    <scope>system</scope>
    <systemPath>${java.home}/lib/rt.jar</systemPath>
</dependency>
```

scope的依赖传递

A–>B–>C。当前项目为A，A依赖于B，B依赖于C。知道B在A项目中的scope，那么怎么知道C在A中的scope呢？

答案是：

当C是test或者provided时，C直接被丢弃，A不依赖C； 否则A依赖C，C的scope继承于B的scope。



## 2. 两者效果一样

```xml
<!-- SpringBoot的依赖配置-->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-dependencies</artifactId>
	<version>${spring-boot.version}</version>
	<type>pom</type>
	<scope>import</scope>
</dependency>
```


```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.4.10</version>
    <relativePath/>
</parent>
```



## 3. `<relativePath>`标签

`<parent>下面的<relativePath>属性是什么意思`

```xml
<parent>
	<groupId>net.itxw</groupId>
	<artifactId>test</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<relativePath/>
</parent>
```

就是parent的路径，具体来说就是你引用这个parent项目，那parent项目的pom在哪里？

1. 默认值：**默认我们不用写`<relativePath>`，那默认值就是 ../pom.xml**，会从本地路径中获取parent的pom，我们建多模块的项目就是这个情况

2. `<relativePath/>`：这样写，也就是说我指定了relativePath，但值是空的，设定一个空值将始终从仓库中获取，不从本地路径获取，很常见的场景就是使用springboot的时候

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.0.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```



## 4. 常用的镜像地址

阿里云仓库

```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

华为云

```xml
<mirror>
　　<id>huaweicloud</id>
   <name>华为云 maven</name>
   <mirrorOf>*</mirrorOf>
   <url>https://mirrors.huaweicloud.com/repository/maven/</url>
</mirror>
```

腾讯云

```xml
<mirror>
　　<id>nexus-tencentyun</id>
　　<mirrorOf>*</mirrorOf>
　　<name>Nexus tencentyun</name>
　　<url>http://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
</mirror>
```