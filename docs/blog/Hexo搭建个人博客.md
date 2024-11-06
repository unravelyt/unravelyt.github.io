---
title: Hexo搭建个人博客
tags:
  - Hexo
createTime: 2021/11/13
cover: /cover/cover_hexo.jpeg
permalink: /article/7l1q8kh1/
---

## 1. 安装Node.js
（1）下载并安装Node.js（最新版本即可） [ Node.js 中文网 ](http://nodejs.cn/download/)
（2）检查版本：`node -v`

## 2. 安装Git
（1）下载并安装Git（最新版本即可）[ Git官网 ](https://git-scm.com/downloads)
（2）检查版本：`git version`

## 3. 安装Hexo
（1）安装Hexo：`npm install -g hexo-cli`
（2）检查版本：`hexo -v`
（3）详细指南：[Hexo官网](https://hexo.io/zh-cn/)

## 4. Hexo初始化
（1）在D盘新建一个文件夹：D:\blog
（2）在D:\blog文件夹内初始化Hexo：`hexo init`
（3）启动 hexo, 在当前路径内执行：`hexo s`
（4）访问：`localhost:4000`

## 5. Hexo常用命令
（1）创建一个博客：`hexo new "My New Post"`
（2）启动：`hexo server` 简写：`hexo s`
（3）生成静态文件：`hexo generate` 简写：`hexo g` 
（4）部署网站：`hexo deploy` 简写：`hexo d`
（5）`hexo clean` 

## 6.部署到Gitee
（1）新建一个公开的仓库 仓库的名称和路径保存一致
例如：仓库名称为`myblog`， 仓库路径为：`https://gitee.com/mygitee/myblog`
（2）修改hexo配置文件

（3）安装Git 部署的插件

```
npm install hexo-deployer-git --save
```
（4）修改配置

```
deploy:
  type: git
  repository: https://github.com/xxxx/xxx.github.io.git
  branch: master
```



帮助中心：[Gitee 帮助中心](https://gitee.com/help/articles/4136#article-header0)

推荐主题：[hexo-theme-keep](https://keep-docs.xpoet.cn/)

## 7.安装Butterfly主题

（1）到hexo根目录下执行

```
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

（2）安装主题插件

```
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

（3）自行修改主题配置

（4）引入外部JS换成本地引入

- 安装插件

```
npm install hexo-butterfly-extjs
```

- 修改主题配置，third_party_provider: local

```
CDN:
  # The CDN provider of internal scripts (主題內部 js 的 cdn 配置)
  # option: local/jsdelivr
  # Dev version cannot choose jsdelivr (dev版的主題不能設置為 jsdelivr)
  internal_provider: local
  # The CDN provider of third party scripts (第三方 js 的 cdn 配置)
  # option: local/jsdelivr
  # when set it to local, you need to install hexo-butterfly-extjs
  third_party_provider: local
```

## 8.处理Butterfly警告

启动后访问会出现如下日志：

```javascript
INFO  Hexo is running at http://localhost:4000/ . Press Ctrl+C to stop.
(node:19140) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:19140) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:19140) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
(node:19140) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(node:19140) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:19140) Warning: Accessing non-existent property 'filename' of module exports inside circular dependenc
```

解决：

- 进去对应目录找到index.js `D:\hexo\node_modules\nib\node_modules\stylus\lib\nodes`

- 添加以下代码：

  ```javascript
  exports.lineno = null;
  exports.column = null;
  exports.filename = null;
  ```

- hexo clean  & hexo s 问题解决

