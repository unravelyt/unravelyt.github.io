---
title: pom中Maven插件的用法
tags:
  - Java
  - Maven
createTime: 2024/11/16 23:11:28
permalink: /note_maven/ij0jkbrv/
---



## 1. Maven前置知识

- 构建Maven项目的时候，如果没有进行特殊的配置，Maven会按照标准的目录结构查找和处理各种类型文件。
- `src/main/java和src/test/java` 这两个目录中的所有*.java文件会分别在comile和test-comiple阶段被编译，编译结果分别放到了target/classes和targe/test-classes目录中，但是这两个目录中的其他文件都会被忽略掉。
- `src/main/resouces和src/test/resources` 这两个目录中的文件也会分别被复制到target/classes和 target/test-classes目录中
- 打包插件默认会把这个目录`target/classes`中的所有内容打入到jar包或者war包中。

## 2. Maven标准目录结构

- src
  - main
    - java     源文件 
    - resources   资源文件
    - filters  资源过滤文件
    - config  配置文件
    - scripts  脚本文件
    - webapp  web应用文件
  - test
    - java   测试源文件
    - resources   测试资源文件
    - filters   测试资源过滤文件
  - it    集成测试
  - assembly   assembly descriptors
  - site   Site
- target
  - generated-sources
  - classes
  - generated-test-sources
  - test-classes
  - xxx.jar
- pom.xml
- LICENSE.txt
- NOTICE.txt
- README.txt



## 3. 同时打包xml和.java文件

- 有时候，比如mybatis的mapper.xml文件，如果把它和Mapper.java放一起，都在src/main/java下面，这样利用maven打包时，就需要修改pom.xml文件，来把mapper.xml文件一起打包进jar或者war里了，否则，这些文件不会被打包的。(maven认为src/main/java只是java的源代码路径)
- 默认情况下，在POM.XML目录下执行: mvn clean package 打包命令在target\classes目录下不会把UserMapper.xml打包到下mapper目录下
- 而resources目录下的文件始终都会打包进jar包或war包

**下图不会打包进去：**
![](https://img-blog.csdn.net/20180113180018014)

### 方式一：配置POM.XML的resource

> 默认情况下，如果没有指定resources，目前认为自动会将classpath下的src/main/java下的.class文件和src/main/resources下的.xml文件放到target里头的classes文件夹下的package下的文件夹里。如果设定了resources，那么默认的就会失效，就会以指定的includes和excludes为准。例如，为了使打包的jar包里头包含.java源文件。


```xml
<build> 
  <!-- 资源目录 -->  
  <resources> 
    <resource> 
      <!-- 设定主资源目录  -->  
      <directory>src/main/java</directory>  
      <!-- maven default生命周期，process-resources阶段执行maven-resources-plugin插件的resources目标处理主资源目下的资源文件时，只处理如下配置中包含的资源类型 -->  
      <includes> 
        <include>**/*.xml</include> 
      </includes>  
      <!-- maven default生命周期，process-resources阶段执行maven-resources-plugin插件的resources目标处理主资源目下的资源文件时，不处理如下配置中包含的资源类型（剔除下如下配置中包含的资源类型）-->  
      <excludes> 
        <exclude>**/*.yaml</exclude> 
      </excludes>  
      <!-- maven default生命周期，process-resources阶段执行maven-resources-plugin插件的resources目标处理主资源目下的资源文件时，指定处理后的资源文件输出目录，默认是${build.outputDirectory}指定的目录-->  
      <!--<targetPath>${build.outputDirectory}</targetPath> -->  
      <!-- maven default生命周期，process-resources阶段执行maven-resources-plugin插件的resources目标处理主资源目下的资源文件时，是否对主资源目录开启资源过滤 -->  
      <filtering>true</filtering> 
    </resource> 
  </resources> 
</build>
```




### 方式二： maven-resources-plugin

- 为了使项目结构更为清晰，Maven区别对待Java代码文件和资源文件，maven-compiler-plugin用来编译Java代码，maven-resources-plugin则用来处理资源文件。

- 默认的主资源文件目录是src/main/resources，很多用户会需要添加额外的资源文件目录，这个时候就可以通过配置maven-resources-plugin来实现。

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.2.0</version>
    
    <configuration>
        <!-- maven打包时，有些资源文件被编译后会与原文件不同，导致文件不可用
        <encoding>UTF-8</encoding>
        <nonFilteredFileExtensions>
            <!-- 不需要编译的资源文件 -->
            <nonFilteredFileExtension>pdf</nonFilteredFileExtension>
            <nonFilteredFileExtension>swf</nonFilteredFileExtension>
        </nonFilteredFileExtensions>
	</configuration>
    <!-- 一个execution就是一个目标输入位置，如果想把各种资源拆开放的话，
			就可以创建多个execution，一个资源文件可以被拷贝多份 -->
    <executions>
        <execution>
            <!-- 需要在其他阶段拷贝资源文件，可以使用插件目标copy-resources -->
            <id>copy-resources</id>
            <phase>package</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
                <encoding>UTF-8</encoding>
                <!-- 资源文件的输出目录 -->
                <outputDirectory>${basedir}/target/classes</outputDirectory>
                <resources>
                    <!-- 资源文件的原始目录，有多个的话就多配几个 -->
                    <resource>
                        <!-- 原始目录 -->
                        <directory>src/main/resources</directory>
                        <!-- 是否使用过滤器，如果是的话，需要配置一下才行
                                    这个后续再研究，这边没有使用到 -->
                        <filtering>true</filtering>
                        <!-- 包含哪些文件以及去除调哪些文件等等 -->
                        <includes>
                            <include>**/*.*</include>
                        </includes>
                        <excludes>
                            <exclude>**/*.json</exclude>
                        </excludes>
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```

