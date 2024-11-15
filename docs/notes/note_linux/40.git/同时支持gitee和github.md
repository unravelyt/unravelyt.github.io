---
title: 同时支持gitee和github
createTime: 2024/11/15 11:30:30
permalink: /note_linux/bnkgifmf/
---


## 生成ssh密钥

```shell
# 1.任意地方执行命令  -t key 类型 -C 注释
ssh-keygen -t ed25519 -C "xxxxxx@163.com"

# 2.三次回车后生成的密钥
ssh-keygen -t ed25519 -C "Gitee SSH Key"
Generating public/private ed25519 key pair.
# 密钥名称
Enter file in which to save the key (/root/.ssh/id_ed25519): id_ed25519_gitee 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in id_ed25519_gitee
Your public key has been saved in id_ed25519_gitee.pub
The key fingerprint is:
SHA256:Mlc/3Hu3qX Gitee SSH Key


# 3.linux公钥目录
cat /root/.ssh/id_ed25519.pub

# 3.windows公钥目录
C:\Users\BE\.ssh

```
完成后会在~/.ssh / 目录下生成以下文件
```text
id_ed25519.github
id_ed25519.github.pub
或者
id_ed25519.gitee
id_ed25519.gitee.pub
```


## 同台电脑配置Gitee、Github的Git SSH公钥

### 前置设置
```shell
# 查看是否设置,如果没有就跳过这一步。
git config --global --list

# 删除设置
git config --global --unset user.name
git config --global --unset user.email
git config --global --unset yser.name
git config --global --unset yser.email

```

### 创建配置文件，解决ssh冲突

```shell
# 在 .ssh 文件夹中创建 config 文件
vim config 

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_ed25519.github

# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_ed25519.gitee

```
### 测试连接是否正常

```shell
ssh -T git@github.com

ssh -T git@gitee.com

# 成功配置
Hi xxx(@xxxx)! You've successfully authenticated, but GITEE.COM does not provide shell access.

```

