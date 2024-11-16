---
title: pnpm安装升级
createTime: 2024/11/16 16:07:00
permalink: /note_front/7rqt007c/
---


## pnpm 安装与配置

### 1. 通过 npm 安装
```shell
npm install -g pnpm
```

### 2. 配置镜像源
```shell
# 查看当前配置的镜像地址：
pnpm get registry

# 设置新的镜像地址(淘宝镜像)
pnpm set registry https://registry.npmmirror.com


```

### 3. 更新 pnpm 到最新版本
```shell
pnpm add -g pnpm

```






