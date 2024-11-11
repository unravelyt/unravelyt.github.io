---
title: maven私服
createTime: 2024/11/08 10:55:30
permalink: /note_linux/w8ms6rsv/
---

## 仓库的搜索优先级：

本地仓库 > settings_profile_repo > pom_profile_repo > pom_repositories > settings_mirror > central

## 常用Maven配置

[阿里云Maven](https://developer.aliyun.com/mvn/guide)

### 1.maven setting配置

```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

### 2.项目pom指定

```xml
<repositories>
  <repository>
    <id>central</id>
    <name>aliyun maven</name>
    <url>https://maven.aliyun.com/repository/public</url>
    <layout>default</layout>
    <!-- 是否开启发布版构件下载 -->
    <releases>
    	<enabled>true</enabled>
    </releases>
    <!-- 是否开启快照版构件下载 -->
    <snapshots>
    	<enabled>false</enabled>
    </snapshots>
  </repository>
</repositories>


<repositories>
    <repository>
        <id>nexus-aliyun</id>
        <name>nexus-aliyun</name>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>

<pluginRepositories>
    <pluginRepository>
        <id>public</id>
        <name>aliyun nexus</name>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </pluginRepository>
</pluginRepositories>
```

## 私服上传

**pom配置私服地址：**

```xml
<!--上传私服 配置-->
<distributionManagement>
    <repository>
    	<!--id的名字可以任意取，但是在setting文件中的属性<server>的ID与这里一致-->
        <id>local-releases</id>
        <!--name只是标识作用，无实际作用-->
        <name>nexus Repository RELEASES</name>
        <!--指向仓库类型为host(宿主仓库）的储存类型为Release的仓库-->
        <url>http://192.168.244.130:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>local-snapshots</id>
        <name>nexus Repository SNAPSHOTS</name>
        <url>http://192.168.244.130:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

**Maven settings 配置:**

setting配置文件默认路径（windows）：`C:\Users\用户名\.m2\settings.xml`

指定本地maven仓库路径：<localRepository>D:/dev/maven-repository</localRepository>

```xml
<!-- 指定私服的密码： -->
<servers>
  	<server>
        <!--对应pom.xml的distributionManagement.id=releases的仓库-->
        <id>local-releases</id> 
        <username>admin</username>
        <password>admin</password>
    </server>

    <server>
        <!--对应pom.xml的distributionManagement.id=releases的仓库-->
        <id>local-snapshots</id>
        <username>admin</username>
        <password>admin</password>
    </server>
 </servers>
```

根据pom文件中设置的上传到不同仓库

- 带有【-SNAPSHOT】会上传到 snapshotRepository 仓库
- 其余的会上传到 repository 仓库

## 私服下载

*两种任选其一：*

### 1. pom配置：

```xml
<!--从私服下载-->
<repositories>
    <repository>
        <id>maven-public</id> <!-- 这里的ID为maven仓库的name -->
        <name>local Repository</name> <!-- 这里的name 只是标识作用，随意取 -->
        <url>http://192.168.244.130:8081/repository/maven-public/</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>

<pluginRepositories>
    <pluginRepository>
        <id>maven-public</id> <!-- 这里的ID为maven仓库的name -->
        <name>local Repository</name> <!-- 这里的name 只是标识作用，随意取 -->
        <url>http://192.168.244.130:8081/repository/maven-public/</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </pluginRepository>
</pluginRepositories>
```

### 2. Maven settings 配置

```xml
<!-- 仓库地址1 -->
<!-- 这里的ID为maven仓库的name -->
<mirror>
    <id>maven-public</id> 
    <name>local nexus</name>
    <mirrorOf>*</mirrorOf>
    <url>http://192.168.244.130:8081/repository/maven-public/</url>
</mirror>

<!-- 仓库地址2 -->
<mirror>
    <id>wshoto-nexus</id>
    <url>http://111.229.217.171:7081/nexus/repository/maven-public/</url>
    <mirrorOf>!maven-public,*</mirrorOf>
</mirror>
```



## setting的mirrorOf作用

当通过pom文件指定的repository去下载镜像时，mirror首先通过repository的id拦截对远程仓库的请求 , 改变对目标仓库的下载地址，因为自己在这里指定的mirrorOf为*，那么所有的repository都会被该mirror拦截，从而替换成了自己的私服镜像

```text
1.*
匹配所有远程仓库。

2.external:*
匹配所有远程仓库，使用localhost的除外，使用file://协议的除外。也就是说，匹配所有不在本机上的远程仓库。

3.repo1,repo2
匹配仓库repo1和repo2，使用逗号分隔多个远程仓库。

4.*,!repo1
匹配所有远程仓库，repo1除外，使用感叹号将仓库从匹配中排除。
```
