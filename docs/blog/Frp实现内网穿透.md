---
title: frp实现内网穿透
tags:
  - linux
  - frp
createTime: 2023/05/06
cover: /cover/cover_frp.png
excerpt: 通过frp内网穿透解决外网访问内网服务器
permalink: /article/bd79zupz/
---


> 背景：
>
> 工作和在家学习时会用到很多中间件，想要一个稳定的开发环境，直接买个32G内存的服务器太贵了，所以买了迷你主机装了Ubuntu当做服务器，那就需要解决外网访问问题，这里就涉及到内网穿透。
>
> 内网穿透方式：
>
> - 自建：[frp](https://gofrp.org/docs/)（推荐），[localhost.run](http://localhost.run/)，[gost](https://github.com/ginuerzh/gost)，[nps](https://ehang-io.github.io/nps/#/?id=nps)
> - 购买：花生壳，[pubyun](http://www.pubyun.com/)，[ngrok](https://www.ngrok.cc/)，[路由侠](https://www.luyouxia.com/)
>
> 准备：一台Ubuntu系统主机，一台有公网IP的主机

## 1. frp工作原理


![工作原理](../images/frp_work.webp)



## 2. frp压缩包文件说明

1. [下载frp文件包](https://github.com/fatedier/frp/releases)  
2. [frp文档](https://gofrp.org/docs/examples/)

每个压缩包解压后都包含以下文件和一个systemd文件夹：

- frpc —— 客户端可执行二进制文件
- frpc_full.ini —— 包含全部配置项的客户端配置文件
- frpc.ini —— 客户端使用的配置文件，包含最简配置
- frps —— 服务端可执行二进制文件
- frps_full.ini —— 包含全部配置项的服务端配置文件
- frps.ini —— 服务端使用的配置文件，包含最简配置
- systemd —— 文件夹，用于将frpc和frps添加为服务的配置，linux下使用systemd作为守护程序、mac os使用launchd作为守护程序

注：服务端只需用到frp_0.46.1_linux_amd64目录下的frps相关文件，本机（客户端）只需用到frp_0.46.1_linux_amd64目录下的frpc相关文件

## 3. 服务端配置(公网服务器)

### 3.1 解压

```bash
# 一般放到opt目录下
cd /opt

# 解压
tar -zxvf frp_0.46.0_linux_amd64.tar.gz

# 编辑配置文件，注意是frps
vim frps.ini
```

### 3.2 配置文件

```sh
# 输入如下内容
[common]
# frp监听的端口，默认是7000，可以改成其他的
bind_port = 7000

# frp管理后台端口，请按自己需求更改
dashboard_port = 7500

# frp管理后台用户名和密码，请改成自己的
dashboard_user = xxx
dashboard_pwd = xxxx

# token在客户端会用到
token = frp_token

# http穿透端口
vhost_http_port = 7002
# https穿透端口
vhost_https_port = 7003

# 最大连接池大小
max_pool_count = 50

# 是否提供 Prometheus 监控接口，需要同时启用了 Dashboard 才会生效
enable_prometheus = true

# frp日志配置
log_file = /var/log/frps.log
log_level = info
log_max_days = 3

# 注册的域名
# subdomain_host = test.xyz
# privilege_mode = true
```

### 3.3 启动

```bash
# 前台启动
./frps -c ./frps.ini

# 后台启动
./frps -c ./frps.ini &
```

## 4. 客户端配置(内网服务器)

### 4.1 解压

```bash
# 一般放到opt目录下
cd /opt

# 解压
tar -zxvf frp_0.46.0_linux_amd64.tar.gz

# 编辑配置文件, 注意是frpc
vim frpc.ini
```

### 4.2 编辑配置文件

```sh
[common]
# 公网服务器ip
server_addr = 143.10.xx.xxx
# 公网服务端通信端口
server_port = 7000   
# 令牌，与公网服务端保持一致
token = frp_token
tcp_mux = true

# 日志相关
log_file = /var/log/frps.log
log_level = info
log_max_days = 3
# 服务器与客户端时间相差15min会连接失败，0表示不验证
authentication_timeout = 0

# 添加ssh节点 
[ssh]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 22
# 指明由公网服务器的7001端口代理
remote_port = 7001

[pgsql]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 5432
remote_port = 7010

[mysql]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 3306
remote_port = 7011

[redis]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 6379
remote_port = 7012

[es]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 9200
remote_port = 7013

[kibana]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 5601
remote_port = 7014

[mq]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 9876
remote_port = 7015

[rocketMqConsole]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 8080
remote_port = 7016

[nacos]
type = tcp
local_ip = 192.168.xxx.xxx
local_port = 8848
remote_port = 7017

# 添加web节点
[nacos]                                                 
type = http
local_ip = 192.168.xxx.xxx
# 本地8080端口可以通公网服务器7002端口访问
local_port = 8180
# 自定义子域名
custom_domains = 143.10.xx.xxx
```

ps：[配置多个http](https://www.yakshare.cn/article/frp-lot-port/)

### 4.3 启动

```shell
# 前台启动
./frpc -c ./frpc.ini

# 后台启动
./frpc -c ./frpc.ini &
```

## 5. systemd管理frp

```shell
# 配置 frps 开机自启
sudo chmod 775 /etc/systemd/system/frps_/_frpc.service

systemctl enable frps/frpc

# 启动frp 
systemctl start frps/frpc

# 停止frp 
systemctl stop frps/frpc

# 重启frp 
systemctl restart frps/frpc

# 查看frp状态 
systemctl status frps/frpc
```

### 5.1 安装systemd

如Linux服务端上没有安装 systemd，可以使用 yum 或 apt 等命令安装 systemd

```shell
# yum
yum install systemd
# apt
apt install systemd
```

### 5.2 创建和编辑 frps.service

#### 服务端：

```shell
# 创建文件
vim /etc/systemd/system/frps.service

# 编写如下内容：
[Unit]
# 服务名称，可自定义
Description = frps server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /opt/frp_0.46.0_linux_amd64/frps -c /opt/frp_0.46.0_linux_amd64/frps.ini

[Install]
WantedBy = multi-user.target
```

#### 客户端：

```shell
# 创建文件
vim /etc/systemd/system/frpc.service

# 编写如下内容：
[Unit]
# 服务名称，可自定义
Description = frpc server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
User=nobody
Restart=on-failure
RestartSec=5s
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /opt/frp_0.46.0_linux_amd64/frpc -c /opt/frp_0.46.0_linux_amd64/frpc.ini
ExecReload = /opt/frp_0.46.0_linux_amd64/frpc reload -c /opt/frp_0.46.0_linux_amd64/frpc.ini

[Install]
WantedBy = multi-user.target
```

## 重要：避开以下端口

```java
1, // tcpmux
7, // echo
9, // discard
11, // systat
13, // daytime
15, // netstat
17, // qotd
19, // chargen
20, // ftp data
21, // ftp access
22, // ssh
23, // telnet
25, // smtp
37, // time
42, // name
43, // nicname
53, // domain
77, // priv-rjs
79, // finger
87, // ttylink
95, // supdup
101, // hostriame
102, // iso-tsap
103, // gppitnp
104, // acr-nema
109, // pop2
110, // pop3
111, // sunrpc
113, // auth
115, // sftp
117, // uucp-path
119, // nntp
123, // NTP
135, // loc-srv /epmap
139, // netbios
143, // imap2
179, // BGP
389, // ldap
465, // smtp+ssl
512, // print / exec
513, // login
514, // shell
515, // printer
526, // tempo
530, // courier
531, // chat
532, // netnews
540, // uucp
556, // remotefs
563, // nntp+ssl
587, // stmp?
601, // ??
636, // ldap+ssl
993, // ldap+ssl
995, // pop3+ssl
2049, // nfs
3659, // apple-sasl / PasswordServer
4045, // lockd
6000, // X11
6665, // Alternate IRC [Apple addition]
6666, // Alternate IRC [Apple addition]
6667, // Standard IRC [Apple addition]
6668, // Alternate IRC [Apple addition]
6669, // Alternate IRC [Apple addition]
```
