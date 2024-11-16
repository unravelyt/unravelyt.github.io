---
title: gitee和github同时使用
createTime: 2024/11/15 11:30:30
permalink: /note_git/bnkgifmf/
---

## 1. 生成ssh密钥

```shell
# 1.任意地方执行命令  -t key 类型 -C 注释
ssh-keygen -t ed25519 -C "xxxxxx@163.com"

# 2.三次回车后生成的密钥
ssh-keygen -t ed25519 -C "xxxxxx@163.com"
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

完成后会在`/root/.ssh`目录下生成以下文件 (widows是在`C:\Users\用户\.shh`)
```text
id_ed25519.github
id_ed25519.github.pub
或者
id_ed25519.gitee
id_ed25519.gitee.pub
```


## 2. 配置Gitee、Github的ssh公钥

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
在`/root/.ssh/`目录下创建`config`文件, widows是在`C:\Users\用户\.shh`

```shell
# 在/root/.ssh/文件夹中创建 config 文件
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


## 3. 解决ssh访问超时
[官方解决方案](https://docs.github.com/zh/authentication/troubleshooting-ssh/using-ssh-over-the-https-port)

同时配置github和gitee的时候出现了
```
ssh: connect to host github.com port 22: Connection timed out
```
原因：某些网络或ISP可能会阻塞SSH的默认端口（22）。尝试使用443端口连接到GitHub


### 测试通过 HTTPS 端口的 SSH 是否可行
```shell
ssh -T -p 443 git@ssh.github.com

# Hi USERNAME! You've successfully authenticated, but GitHub does not
# provide shell access.

#如果这样有效，可以使用这样的方式clone
git clone ssh://git@ssh.github.com:443/YOUR-USERNAME/YOUR-REPOSITORY.git

```

### 配置`/root/.ssh/config`

```shell
Host github.com
port 443 # 默认是22端口
HostName ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_ed25519
```

再次测试
```ssh -T git@github.com```

