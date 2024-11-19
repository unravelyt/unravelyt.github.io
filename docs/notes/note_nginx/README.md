---
title: 备忘
createTime: 2024/11/05 18:12:51
permalink: /note_nginx/
---


## 主配置

实践过的配置直接用

```shell
user  nginx;
# 自动调整工作进程数
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    # 每个工作进程的最大连接数
    worker_connections  1024;
    # 允许一个进程同时接受多个连接
    multi_accept on;
    # 使用高效的事件模型
    use epoll;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # 限制body大小 默认：1M
    client_max_body_size 100m;
    
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    # 直接从文件系统传输文件到网络，减少内存拷贝，提高传输效率
    sendfile        on;
    # 启用后，Nginx会将多个小的数据包合成一个大的数据包发送，而不是立即发送每个小的数据包。减少网络拥塞和提高传输效率
    tcp_nopush      on;

    keepalive_timeout  65;
    
    #启用gzip
    gzip  on;
    # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
    gzip_min_length 1k;
    # gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间。一般设置1和2
    gzip_comp_level 5;
    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
    # 禁用IE 6 gzip
    gzip_disable "MSIE [1-6]\.";

    include /etc/nginx/conf.d/*.conf;
}

```


## 子配置
```shell
server {
    #SSL 默认访问端口号为 443
    listen 443 ssl; 
    #请填写绑定证书的域名
    server_name unravely.cn; 
    #请填写证书文件的相对路径或绝对路径
    ssl_certificate /etc/nginx/unravely.cn_bundle.crt; 
    #请填写私钥文件的相对路径或绝对路径
    ssl_certificate_key /etc/nginx/unravely.cn.key; 
    ssl_session_timeout 5m;
    #请按照以下协议配置
    ssl_protocols TLSv1.2 TLSv1.3;
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
    ssl_prefer_server_ciphers on;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        #root   /usr/share/nginx/html;
        root    /data/vuepress/dist;
        index  index.html index.htm;
        # 缓存时间7天
        expires 7d;
    }
    
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

# 将http请求自动转为https
server {
    listen       80;
    server_name  unravely.cn;
    return 301 https://$host$request_uri;
}



```







