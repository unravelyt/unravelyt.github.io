---
title: maven常用命令
createTime: 2024/11/07
permalink: /note_linux/j5w1cdfd/
---

## scope依赖范围
| **scope取值** | **有效范围**  | **依赖传递** | **例子**    |
| ------------- | ------------- | ------------ | ----------- |
| **compile**   | all           | 是           | spring-core |
| **provided**  | compile, test | **否**       | servlet-api |
| **runtime**   | runtime, test | 是           | JDBC驱动    |
| **test**      | test          | **否**       | JUnit       |
| **system**    | compile, test | 是           |             |

1. **compile**：为默认的依赖有效范围。`如果没有明确指定依赖有效范围，则为默认值。在编译、运行、测试时均有效。`
2. **provided** ：在编译、测试时有效，但是在运行时无效。`打包的时候不用包进去，别的设施(Web Container)会提供。该依赖理论上可以参与编译，测试，运行等周期。相当于compile，但是在打包阶段做了exclude的动作。
   例如：servlet-api，运行项目时，容器已经提供，就不需要Maven重复地引入一遍了。`
3. **runtime** ：在运行、测试时有效，但是在编译代码时无效。
   `在终端的项目（非开源，企业内部系统）中，和compile区别不是很大。例如：JDBC驱动实现，项目代码编译只需要JDK提供的JDBC接口，只有在测试或运行项目时才需要实现上述接口的具体JDBC驱动。
   另外runntime的依赖通常和optional搭配使用，optional为true。我可以用A实现，也可以用B实现。`
4. **test** ：只在测试时有效，包括测试代码的编译，执行。例如：JUnit。
   `test表示只能在src下的test文件夹下面才可以使用，你如果在a项目中引入了这个依赖，在b项目引入了a项目作为依赖，在b项目中这个注解不会生效，因为scope为test时无法传递依赖。`
5. **system** ：在编译、测试时有效，但是在运行时无效。
   `和provided的区别是，使用system范围的依赖时必须通过systemPath元素显式地指定依赖文件的路径。由于此类依赖不是通过Maven仓库解析的，而且往往与本机系统绑定，可能造成构建的不可移植，因此应该谨慎使用。`


## 将本地jar包添加到本地仓库
```shell

mvn install:install-file "-Dfile=hitachivantara-java-sdk-core-0.4.457.jar" 
"-DgroupId=com.hitachivantara" "-DartifactId=hitachivantara-java-sdk-core" 
"-Dversion=0.4.457" "-Dpackaging=jar"


mvn install:install-file "-Dfile=hitachivantara-java-sdk-hcp-0.4.457.jar" "-DgroupId=com.hitachivantara" "-DartifactId=hitachivantara-java-sdk-hcp" "-Dversion=0.4.457" "-Dpackaging=jar"
```


## 找出重复引入的jar
```shell
mvn dependency:tree -Dverbose -Dincludes=org.apache.poi
```
![maven_jar.jpg](..%2F..%2Farticle_pic%2Fmaven_jar.jpg)