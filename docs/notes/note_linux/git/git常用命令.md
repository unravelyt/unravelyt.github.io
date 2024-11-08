---
title: git常用命令
createTime: 2024/11/07 22:40:02
permalink: /note_linux/xlko1vqa/
---

## git提交规范
```text
<type>(<scope>): <subject>
// 注意冒号 : 后有空格
// 例： feat(miniprogram): 增加了小程序模板消息相关功能

scope	选填	表示 commit 的作用范围，如数据层、视图层，也可以是目录名称。
subject	必填	用于对commit进行简短的描述。
type	必填	表示提交类型。
```

类型选项	说明
feat	新增功能 feature
fix	    修复 bug
docs	文档注释
style	代码格式 (不影响代码运行的改动)
refactor 重构优化
perf	性能优化
test	增加测试
chore	构建过程或辅助工具改动
revert	回退
build	打包

## 创建项目
```shell
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/unravelyt/test.git
git push -u origin main

```


## 输出、设置基本的全局变量
```shell
git config --global user.email
git config --global user.name

git config --global user.email "MyEmail@gmail.com"
git config --global user.name "My Name"
```

## 查看远程分支
```shell
git br # 本地分支

git br -r
```


## 创建新的分支
```shell
git br <new_branch>
```
## 添加当前目录的所有文件到暂存区
```shell
git add .
```

## 切换到指定分支，并更新工作区
```shell
git checkout [branch-name]
```

## 合并指定分支到当前分支
```shell
git merge [branch]
```

## 选择一个commit，合并进当前分支
```
git cherry-pick [commit]
```

## 删除分支
```shell
git branch -d [branch-name]
```

## 删除远程分支
```shell
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```

## 强行推送当前分支到远程仓库，即使有冲突
```shell
git push [remote] --force
```

## 标签管理
```shell
# 打标签
git tag v1.0

# 指定标签名和说明文字
git tag -a v0.1 -m "version 0.1 released" 1094adb 

# 查看所有标签
git tag

# 若是忘记打，则查找历史提交commit id ，再打上
git log --pretty=oneline --abbrev-commit

git tag v0.9 f52c633

# 查看标签详细信息
git show v0.9

# 删除标签
git tag -d v0.1

# 推送标签到远程
git push origin v1.0

# 一次性推送全部本地标签
git push origin –tags

# 删除标签，（若已推送到远程，先从本地删除，从远程删除）
git tag -d v0.9

git push origin :refs/tags/v0.9
```