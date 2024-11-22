---
title: 自建Immich图库
tags:
  - 图床
createTime: 2024/11/20 14:43:23
excerpt: 避免时间冲淡记忆
cover: /cover/cover_immich.jpg
permalink: /article/ehir7gjs/
---


## 1.下载配置文件

```shell :collapsed-lines=20
# 创建文件夹
mkdir ./immich-app
cd ./immich-app

# 获取 docker-compose.yml 文件
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml

# 获取 .env 文件
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env

# （可选）获取 hwaccel.transcoding.yml 文件
wget -O hwaccel.transcoding.yml https://github.com/immich-app/immich/releases/latest/download/hwaccel.transcoding.yml

# （可选）获取 hwaccel.ml.yml 文件
wget -O hwaccel.ml.yml https://github.com/immich-app/immich/releases/latest/download/hwaccel.ml.yml

```

## 2.修改配置文件
```shell :collapsed-lines=20
# You can find documentation for all the supported env variables at https://immich.app/docs/install/environment-variables

# The location where your uploaded files are stored
UPLOAD_LOCATION=./library
# The location where your database files are stored
DB_DATA_LOCATION=./postgres

# To set a timezone, uncomment the next line and change Etc/UTC to a TZ identifier from this list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
# TZ=Etc/UTC

# The Immich version to use. You can pin this to a specific version like "v1.71.0"
IMMICH_VERSION=release

# Connection secret for postgres. You should change it to a random password
# Please use only the characters `A-Za-z0-9`, without special characters or spaces
DB_PASSWORD=postgres

# The values below this line do not need to be changed
###################################################################################
DB_USERNAME=postgres
DB_DATABASE_NAME=immich

```

## 3.替换文件内镜像
```shell :collapsed-lines=20
image: ghcr.m.daocloud.io/immich-app/immich-server:${IMMICH_VERSION:-release}

image: ghcr.m.daocloud.io/immich-app/immich-machine-learning:${IMMICH_VERSION:-release}

```
### 3.1 替换规则

```shell
k8s.gcr.io/coredns/coredns => m.daocloud.io/k8s.gcr.io/coredns/coredns 

```
| 源站         | 替换为               |
| ---------- | ----------------- |
| [cr.l5d.io | [l5d.m.daocloud.io] |
| [docker.elastic.co] | [elastic.m.daocloud.io] |
| [docker.io] | [docker.m.daocloud.io]|
| [gcr.io] | [gcr.m.daocloud.io]|
| [ghcr.io] | [ghcr.m.daocloud.io] |
| [k8s.gcr.io] | [k8s-gcr.m.daocloud.io]|
| [registry.k8s.io] | [k8s.m.daocloud.io]|
| [mcr.microsoft.com] | [mcr.m.daocloud.io] |
| [nvcr.io] | [nvcr.m.daocloud.io] |
| [quay.io]| [quay.m.daocloud.io]|
| [registry.jujucharms.com] | [jujucharms.m.daocloud.io] |
| rocks.canonical.com | [rocks-canonical.m.daocloud.io] |
| [gcr.io] | [gcr.nju.edu.cn] |
| [k8s.gcr.io] | [gcr.nju.edu.cn/google-containers] |
| [ghcr.io]| [ghcr.nju.edu.cn] |
| [nvcr.io] | [nvcr.nju.edu.cn] |
| [quay.io]| [quay.nju.edu.cn] |
| [registry.k8s.io] | [k8s.mirror.nju.edu.cn] |




## 4.启动容器
```shell :collapsed-lines=20
docker compose up -d
```
## 5.登录后台

`http://<machine-ip-address>:2283`
