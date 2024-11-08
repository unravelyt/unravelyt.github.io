---
title: docker国内镜像源
createTime: 2024/11/07 18:04:17
permalink: /note_linux/uhg19d4i/
---

## 方式一：

```shell :collapsed-lines=20

sudo mkdir -p /etc/docker
 
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://do.nark.eu.org",
        "https://dc.j8.work",
        "https://docker.m.daocloud.io",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
EOF
 
sudo systemctl daemon-reload
sudo systemctl restart docker

```


## 方式二:

https://dockerproxy.net/docs



```shell :collapsed-lines=20
docker pull dockerproxy.com/minio/minio:RELEASE.2023-09-20T22-49-55Z

Docker Hub 官方镜像代理
常规镜像代理
官方命令：docker pull stilleshan/frpc:latest
代理命令：docker pull dockerproxy.com/stilleshan/frpc:latest

根镜像代理
官方命令：docker pull nginx:latest
代理命令：docker pull dockerproxy.com/library/nginx:latest

GitHub Container Registry
常规镜像代理
官方命令：docker pull ghcr.io/username/image:tag
代理命令：docker pull ghcr.dockerproxy.com/username/image:tag

Google Container Registry
常规镜像代理
官方命令：docker pull gcr.io/username/image:tag
代理命令：docker pull gcr.dockerproxy.com/username/image:tag

Google Kubernetes
常规镜像代理
官方命令：docker pull k8s.gcr.io/username/image:tag
官方命令：docker pull registry.k8s.io/username/image:tag
代理命令：docker pull k8s.dockerproxy.com/username/image:tag

根镜像代理
官方命令：docker pull k8s.gcr.io/coredns:1.6.5
官方命令：docker pull registry.k8s.io/coredns:1.6.5
代理命令：docker pull k8s.dockerproxy.com/coredns:1.6.5

Quay.io
常规镜像代理
官方命令：docker pull quay.io/username/image:tag
代理命令：docker pull quay.dockerproxy.com/username/image:tag

Microsoft Artifact Registry
常规镜像代理
官方命令：docker pull mcr.microsoft.com/azure-cognitive-services/diagnostic:latest
代理命令：docker pull mcr.dockerproxy.com/azure-cognitive-services/diagnostic:latest
```