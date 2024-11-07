---
title: ubuntu_server初始化
createTime: 2024/11/07 18:37:07
permalink: /note_linux/4cda7bs1/
---

## Ubuntu24.04换镜像源

### 1. 源文件位置

Ubuntu24.04的源地址[配置文件]发生改变，不再使用以前的sources.list文件，升级24.04之后，而是使用如下文件
`/etc/apt/sources.list.d/ubuntu.sources`

### 2. 备份源配置文件

```shell
sudo cp /etc/apt/sources.list.d/ubuntu.sources  /etc/apt/sources.list.d/ubuntu.sources.bak
```

### 3. 编辑源配置文件

```shell
sudo vim /etc/apt/sources.list.d/ubuntu.sources
```

### 4. 添加[清华源]配置

```shell
注释掉原来的:

Types: deb
# URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

### 5. 更新

```shell
sudo apt-get update

sudo apt-get upgrade

```

### 6. 国内源
```shell
# 中科大源: 
Types: deb
URIs: http://mirrors.ustc.edu.cn/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 阿里源
Types: deb
URIs: http://mirrors.aliyun.com/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 网易源 
Types: deb
URIs: http://mirrors.163.com/ubuntu/
Suites: noble noble-updates noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

```



## 镜像下载地址：
```shell
https://mirrors.aliyun.com/ubuntu-releases/
```

## 普通用户登录成功后设置 root 用户的登录密码
```shell
unravely@ser5:/$ sudo passwd root
[sudo] password for unravely: 
New password: 
Retype new password: 
passwd: password updated successfully
```

## 开启 root 用户 SSH 远程登录权限
```shell
vim /etc/ssh/sshd_config

# 按下字母“i”键， 在最后一行添加 PermitRootLogin yes配置，最后esc退出编辑模式，再“:wq” 保存退出：
PermitRootLogin yes

# 重启 SSH Server 服务：
sudo systemctl restart sshd
```



## 查看linux版本信息

```shell
# 查看Linux内核版本命令（两种方法）：
cat /proc/version

uname -a

# 查看Linux系统版本的命令（3种方法）：
# 这个命令适用于所有的Linux发行版，包括RedHat、SUSE、Debian…等发行版。
lsb_release -a

# 这种方法只适合Redhat系的Linux：
cat /etc/redhat-release

# 此命令也适用于所有的Linux发行版。
cat /etc/issue
```



## 磁盘只有100g可用

在安装系统的时候需要对分区进行设置

```shell
# 1. 查看现有的卷组
sudo vgdisplay

# 2. 扩展现有的逻辑卷
sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv

# 3. 重新计算逻辑卷大小
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
 
# 4. 再次查看磁盘使用情况
df -hl

```



## 修改时区

```bash
# 当前系统时间
date

# 查看当前系统时间及对应时区
timedatectl

# 罗列可用时区
timedatectl list-timezones

# 设置时区
sudo timedatectl set-timezone Asia/Shanghai
```
