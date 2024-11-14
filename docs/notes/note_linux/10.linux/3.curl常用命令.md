---
title: curl常用命令
createTime: 2024/11/08 11:06:37
permalink: /note_linux/9un6uy6f/
---

## POST请求

### application/x-www-form-urlencoded
```shell
curl localhost:3000/api/basic -X POST -d 'hello=world'
```

### multipart/form-data
```shell
curl localhost:3000/api/multipart -F raw=@raw.data -F hello=world
```

### application/json
```shell
curl localhost:3000/api/json -X POST -d '{"hello": "world"}' --header "Content-Type: application/json"
```