---
title: 自动装配格式变更：SpringBoot 3.x与2.x不同
createTime: 2024/11/08 14:29:55
tags:
  - SpringBoot
excerpt: 3.x之后Spring.factories被弃用
cover: /cover/cover_springboot.jpg
permalink: /article/0tv1arox/
---

> [!info]
> 2.7版本引入了`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`，
> 同时兼容以前的`spring.factories`中的自动配置。
> 
> 3.0版本移除了对`spring.factories`中自动配置项的支持。
> 
> 3.0以后，自动配置只能在`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`文件中配置了。


## 2.7.x 之前版本
文件路径：`/resources/META-INF/spring.factories`

![spring_factories.jpg](..%2Farticle_pic%2Fspring_factories.jpg)


## 3.x 以后版本
文件路径：`/resources/META-INF/spring.factories`

![AutoConfiguration_imports.jpg](..%2Farticle_pic%2FAutoConfiguration_imports.jpg)
