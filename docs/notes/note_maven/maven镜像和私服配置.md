---
title: maven镜像和私服配置
createTime: 2024/11/08 10:55:30
permalink: /note_maven/w8ms6rsv/
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

<repository>
    <id>spring</id>
    <url>https://maven.aliyun.com/repository/spring</url>
    <releases>
        <enabled>true</enabled>
    </releases>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>

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
<mirrors>
    <!-- 仓库地址1 -->
    <!-- 这里的ID为maven仓库的name -->
    <mirror>
        <id>maven-public</id>
        <name>名字不重要，id很重要</name>
        <mirrorOf>*</mirrorOf>
        <url>http://192.168.244.130:8081/repository/maven-public/</url>
    </mirror>
    <!-- 仓库地址2 -->
    <mirror>
        <id>wshoto-nexus</id>
        <url>http://111.229.217.171:7081/nexus/repository/maven-public/</url>
        <mirrorOf>!maven-public,*</mirrorOf>
    </mirror>
</mirrors>
```

## setting的mirrorOf作用

在Maven的`settings.xml`文件中，`<mirrors>`元素用于定义镜像服务器，这些镜像服务器可以替代默认的中央仓库或其他远程仓库。
`<mirrorOf>`属性用于指定哪些仓库可以被这个镜像替代。

mirrorOf 属性指定了哪些仓库可以被当前定义的镜像替代。 可以使用通配符来匹配多个仓库。

常见的 mirrorOf 值：

- `*`：匹配所有仓库。
- `external:*`：匹配所有外部仓库（即不在本地网络中的仓库）。
- `central`：仅匹配中央仓库。
- `repo1,repo2`：匹配特定的仓库 repo1 和 repo2。
- `*,!repo1`：匹配所有仓库，但排除 repo1。

```xml
<!--在这个示例中，mirror1 替代 repo1 和 repo2，而 mirror2 替代所有其他仓库，但不包括 repo1-->
<settings>
    <mirrors>
        <mirror>
            <id>mirror1</id>
            <url>https://mirror1.example.com/maven2</url>
            <mirrorOf>repo1,repo2</mirrorOf>
        </mirror>
        <mirror>
            <id>mirror2</id>
            <url>https://mirror2.example.com/maven2</url>
            <mirrorOf>*,!repo1</mirrorOf>
        </mirror>
    </mirrors>
</settings>

```

如果有多个镜像匹配同一个仓库，Maven 会按 `<mirrors>` 列表中的顺序选择第一个匹配的镜像。
通过合理配置 mirrorOf 属性，可以优化 Maven 的依赖下载速度，减少对外部网络的依赖