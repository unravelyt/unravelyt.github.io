---
title: 常用bash脚本
createTime: 2024/11/05
permalink: /note_linux/7wv2tb5s/
---

```shell :collapsed-lines=20
脚本构建镜像并推送至镜像仓库
#!/bin/bash
# docker登录
docker login apps.tencentcloud.com --username 123213131 --password eyJhbGcAyEY2HRUHlKQiMw

# get work directory
workdir=$(cd "$(dirname "$0")" || exit; pwd)

# jar包名称
jar_name=$1
# 版本号
img_tag=$2

# 将所有的 apps-server.jar 替换为环境变量 ${jar_name} 的值
sed -i "s/apps-server.jar/${jar_name}/g" Dockerfile

# 如果 img_tag 为空，则将其设置为当前的日期和时间字符串
if  [ ! -n "${img_tag}" ] ;then
    img_tag=$(date +"%Y%m%d_%H%M")
fi

# 编译打包，指定tag
docker build -t ka-tcr.tencentcloudcr.com/customize/${jar_name%%.*}:${img_tag} .
# 登录tcr 
# 推送到tcr
docker push apps.tencentcloud.com/customize/${jar_name%%.*}:${img_tag}

echo apps.tencentcloud.com/customize/${jar_name%%.*}:${img_tag}
```


## 批量clone代码到指定目录
一次性拉取很多工程代码，可以一次性操作
```shell :collapsed-lines=20
#! /bin/bash

if [ ! -d projectDir ];then
    mkdir projectDir
    cd projectDir
else
    cd projectDir
fi

git clone -b master https://gitee.com/zhijiantianya/ruoyi-vue-pro.git
git clone -b master https://gitee.com/zhijiantianya/ruoyi-vue-cloud.git

```

## 批量更新Git仓库
将脚本放在项目同一层级，执行脚本即可
```shell :collapsed-lines=20
#!/bin/sh
for dir in $(ls -d */)
do
  cd $dir
  echo "into $dir"
  if [ -d ".git" ]; then
       echo "正在拉取 $dir"
     git pull
  elif [ -d ".svn" ]; then
     svn update
  else
    for dir1 in $(ls -d */)
    do
        cd $dir1 echo "--into $dir1"
        if [ -d ".git" ]; then
            echo "--正在拉取 $dir1"
            git pull
        elif [ -d ".svn" ]; then
            svn update
        fi
        cd ..
    done
  fi
  cd ..
done
```