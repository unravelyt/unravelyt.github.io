---
title: 部署Picx图床
tags: 
  - 图床
createTime: 2023/01/30
cover: /cover/cover_picx.png
excerpt: 穷鬼必备，白嫖github图床
permalink: /article/7wv2tb5s/
---

根据 [免费的GitHub图床PicX](https://blog.csdn.net/wbsu2004/article/details/121154470) 整理，替换镜像源

## 1. 下载代码

```shell
git clone https://github.com/XPoet/picx.git

cd picx
```

## 2 创建dockerfile文件

```dockerfile
# build stage
FROM node:lts-slim as build-stage
LABEL maintainer=unravely

WORKDIR /app
COPY package*.json ./
#这里用淘宝镜像，不然会卡住
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN cnpm install pm2 -g

COPY ../../blog .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 3. 构建镜像

```dockerfile
docker build -t unravely/pixc:v1 .
```

## 4. 启动服务

```dockerfile
docker run -d --name=picx --restart=always -p 3480:80 unravely/pixc:v1
```

## 5.访问

访问地址：http://ip:3480

## ps：

也可以直接去([Docker Hub](https://hub.docker.com/search?type=image))搜索`pixc`，直接拉取镜像，然后运行；
