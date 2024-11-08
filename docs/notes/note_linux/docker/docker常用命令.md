---
title: docker常用命令
createTime: 2024/11/07 15:39:40
permalink: /note_linux/t6kwnf83/
---


## docker删除镜像
```shell :collapsed-lines=20
echo "========== 删除<none>镜像 =========="
docker rmi $(docker images -q -f dangling=true)

echo "========== 删除20231205开头的所有镜像 =========="
docker rmi $(docker images | grep "20231205" | awk '{print $3}')

echo "========== 删除202403开头的所有镜像 =========="
docker images | grep "202403" | awk '{print $3}' | xargs docker rmi

#停止所有容器
docker stop $(docker ps -a -q)

```

## docker重启
```shell :collapsed-lines=20
systemctl restart docker
systemctl daemon-reload
systemctl restart docker
```

## docker操作命令
```shell :collapsed-lines=20

# 查看日志
docker logs -f --tail 100 xxx

docker rm -f xxx

docker update --restart=no xxx

#查看容器状态
docker stats --no-stream 

# 设置自动重启
docker update --restart=no/always/on-failure

# 进入docker容器操作
docker exec -it mysql bash

# 查看docker镜像版本号
docker image inspect mysql:latest | grep -i version

# Docker 复制
#将主机/www/runoob目录拷贝到容器96f7f14e99ab的/www目录下。
docker cp /www/runoob 96f7f14e99ab:/www/

#将主机/www/runoob目录拷贝到容器96f7f14e99ab中，目录重命名为www。
docker cp /www/runoob 96f7f14e99ab:/www

#将容器96f7f14e99ab的/www目录拷贝到主机的/tmp目录中。
docker cp  96f7f14e99ab:/www /tmp/

# 查看现存容器ip
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)


docker中 启动所有的容器命令
docker start $(docker ps -a | awk '{ print $1}' | tail -n +2)

docker中 关闭所有的容器命令
docker stop $(docker ps -a | awk '{ print $1}' | tail -n +2)

docker中 删除所有的容器命令
docker rm $(docker ps -a | awk '{ print $1}' | tail -n +2)

docker中 删除所有的镜像
docker rmi $(docker images | awk '{print $3}' |tail -n +2)

#docker根据tag前缀删除镜像
docker rmi $(docker images | grep "20231205" | awk '{print $3}')

docker images | grep "202401" | awk '{print $3}' | xargs docker rmi

停止所有容器
docker stop $(docker ps -a -q)

docker ps --format "table {{.ID}} {{.Names}} {{.CreatedAt}}	{{.Status}}  {{.Size}}" \r

-format="TEMPLATE"
Pretty-print containers using a Go template.
Valid placeholders:
.ID - Container ID
.Image - Image ID
.Command - Quoted command
.CreatedAt - Time when the container was created.
.RunningFor - Elapsed time since the container was started.
.Ports - Exposed ports.
.Status - Container status.
.Size - Container disk size.
.Names - Container names.
.Labels - All labels assigned to the container.
.Label - Value of a specific label for this container. For example {{.Label "com.docker.swarm.cpu"}}
.Mounts - Names of the volumes mounted in this container.


```

## docker启动容器
```shell :collapsed-lines=20

################# redis #####################
docker run -d --name redis -p 6379:6379 \
--net=my_network --ip=172.18.0.2 \
--restart=always --privileged=true -e TZ="Asia/Shanghai" \
redis:7.4.0 --requirepass "root"


################# postgres #####################
docker run -d --name postgres -p 5432:5432 --restart=always --privileged=true -e TZ="Asia/Shanghai" \
--net my_network --ip 172.18.0.3 \
-e POSTGRES_PASSWORD=root \
postgres:15.6


################# mysql #####################
docker run -d --name=mysql -p 3306:3306 \
--net=my_network --ip=172.18.0.4 \
--restart=always --privileged=true -e TZ="Asia/Shanghai" \
-e MYSQL_ROOT_PASSWORD=root \
mysql:8.3.0


################# nacos #####################

# 部署nacos 2.0版本 需要开放的端口： 8848  9848  9849，Nacos2.0增加了9848，9849端口来进行GRPC通信
# https://github.com/alibaba/nacos/blob/2.3.0/config/src/main/resources/META-INF/nacos-db.sql

docker run -d --name=nacos -p 8848:8848 -p 9848:9848 -p 9849:9849 \
--net=my_network --ip=172.18.0.5 \
--restart=on-failure:3 --privileged=true -e TZ="Asia/Shanghai" \
-e MODE=standalone \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_SERVICE_HOST=172.18.0.4 \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_USER=root \
-e MYSQL_SERVICE_PASSWORD=root \
-e MYSQL_SERVICE_DB_NAME=nacos \
-e MYSQL_DATABASE_NUM=1 \
-e NACOS_AUTH_ENABLE=true \
-e NACOS_AUTH_TOKEN=01121316789012adsfasd90123456789 \
-e NACOS_AUTH_IDENTITY_KEY=nacos \
-e NACOS_AUTH_IDENTITY_VALUE=nacos \
-e NACOS_AUTH_TOKEN_EXPIRE_SECONDS=30000 \
nacos/nacos-server:v2.4.1


################# xxl-job #####################
docker run -d --name=xxl-job -p 8090:8080 \
--net=my_network --ip=172.18.0.6 \
--restart=on-failure:3 --privileged=true -e TZ="Asia/Shanghai" \
-e PARAMS="--spring.datasource.url=jdbc:mysql://172.18.0.4:3306/xxl_job?Unicode=true&characterEncoding=UTF-8 \
--spring.datasource.username=root \
--spring.datasource.password=root \
--xxl.job.accessToken=rootaccessToken" \
xuxueli/xxl-job-admin:2.4.1


################# postgres #####################

```
## docker创建网络

```shell :collapsed-lines=20
docker network create --driver bridge --subnet=172.18.0.0/24 my_network

172.18.255.254

--net=my_network --ip=172.18.0.5 \
--restart=always --privileged=true -e TZ="Asia/Shanghai" \

##创建自定义网络
docker network create -d host --subnet=172.18.0.0/16 my_network    ##-d 指定模式（默认桥接）

##查看自定义网络信息
docker inspect my_network

##查看网络
docker network ls

##网络删除
docker network rm my_network

##使用自定义网路（打入后台：ctrl+p+q）
docker run -it --rm --name vm1 --network=my_network busybox

```


## docker 常见端口
```shell :collapsed-lines=20
2375：未加密的docker socket,远程root无密码访问主机
2376：tls加密套接字,很可能这是您的CI服务器4243端口作为https 443端口的修改
2377：群集模式套接字,适用于群集管理器,不适用于docker客户端
5000：docker注册服务
4789和7946：覆盖网络
```
