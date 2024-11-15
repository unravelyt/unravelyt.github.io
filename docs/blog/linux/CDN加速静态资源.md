---
title: CDN加速静态资源
tags:
  - CDN
createTime: 2023/02/04
excerpt: 免费的CDN, 个人主要用途访问搭建的GitHub图床图片
cover: /cover/cover_cdn.jpg
permalink: /article/yuubz445/
---


> 5月19号的时候 搭建的GitHub图床图片访问不了了，发现是原来的CDN（jsDelivr）加速被墙了，gitee听说禁止用来做图床，会被封； 
> 
> 然后又是替换原来博客主题（Butterfly）的 js地址，又是搞图床，图床试了下腾讯的cos，发现存储要收费，访问流量要收费，操作图片也要收费，虽然费用不高，但是还是有点不爽（没办法白嫖）；
> 
> 虽然5月21号上午 jsdelivr已经恢复了，但是忧患意识还是要有的，搜了下其他免费的CDN，看了一圈，国内的虽然有免费的，但是要注册，国外的直接替换地址就可以了，还是外国的老爷们大方，记录下国内外的CDN吧，我只是搬运工；
>
> 目前只是用作GitHub的，其他用途没试过。

## 1. [JsDelivr](https://www.jsdelivr.com)

（1）GitHub原地址：
```
https://raw.githubusercontent.com/unravelyt/image-hosting/master/base_img/avatar.4zr2jgjmhq80.webp

```

（2）替换后：
经常失效不推荐：
```
https://cdn.jsdelivr.net/gh/unravelyt/image-hosting**@**master/base_img/avatar.4zr2jgjmhq80.webp
```

推荐使用：
```
https://fastly.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/SecurityContextHolder.637wmh9seyg0.png
```


（3）替换规则：

`/unravelyt/image-hosting/master/base_img/avatar.4zr2jgjmhq80.webp`

对应关系：

```
unravelyt = GitHub用户id

image-hosting = 仓库名称

master = 仓库分支

base_img = 文件夹名称

avatar.4zr2jgjmhq80.webp = 文件名称
```

将`https://raw.githubusercontent.com/`替换为`https://cdn.jsdelivr.net/gh/` 或者`https://fastly.jsdelivr.net/gh/`

将`/master`替换为 `@master`

## 2. [Sevencdn](https://pangniao.net/tag/Sevencdn/)

Sevencdn有两个cdn域名：

```plain
raw.sevencdn.com` 国内cdn，但是因为滥用增加了白名单限制
只有在白名单中的github仓库才能使用，其他仓库的[资源](https://pangniao.net/tag/资源/)会自动跳转到 raw.githubusercontents.com
```

`raw.githubusercontents.com`为中国香港cdn节点，国内访问速度也是很不错的，但是也因为滥用进行了限速。


由于滥用，现对 raw.githubusercontents.com 进行限速，策略如下：

- 小于 1M 的文件不限速
- 超过 1M 的文件，超过部分限速 100K/s
  若滥用情况继续，则**未来**采用如下限速策略：
- 限速 10K/s

替换规则

```
三个域名替换规则，将 raw.githubusercontent.com 替换为

**raw.sevencdn.com**

或**raw.staticdn.net**

或**raw.githubusercontents.com** 即可加速。
```



## 3. [91chi.fun](https://github.91chi.fun/)

这个有个插件可以直接使用：[fhefh2015/Fast-GitHub: 国内Github下载很慢，用上了这个插件后，下载速度嗖嗖嗖的~！](https://github.com/fhefh2015/Fast-GitHub)



（1）GitHub原地址：

```
https://raw.githubusercontent.com/unravelyt/image-hosting/master/base_img/icon1.webp
```



（2）替换后：

```
https://github.91chi.fun/https://raw.githubusercontent.com/unravelyt/image-hosting/master/base_img/icon1.webp
```

（3）替换规则：

直接在地址前面加上`https://github.91chi.fun/`


备选：

```plain
https://github.91chi.fun/
https://ghproxy.com/
https://github.abskoop.workers.dev
https://gh.api.99988866.xyz
```

也可以访问网站输入地址：https://github.91chi.fun/

## 4. [staticaly](https://www.staticaly.com/)

（1）GitHub原地址：

```text
https://raw.githubusercontent.com/unravelyt/image-hosting/master/base_img/icon1.webp
```

（2）替换后：

```text
https://cdn.staticaly.com/gh/unravelyt/image-hosting/master/base_img/icon1.webp
```

（3）替换规则：

GitHub CDN

```plain
https://cdn.staticaly.com/gh/:user/:repo/:tag/:file
```

GitLab CDN

```plain
https://cdn.staticaly.com/gl/:user/:repo/:tag/:file
```

Bitbucket CDN

```plain
https://cdn.staticaly.com/bb/:user/:repo/:tag/:file
```


WordPress CDN

```plain
https://cdn.staticaly.com/wp/c/:version/wp-includes/:file  
https://cdn.staticaly.com/wp/p/:plugin_name/:version/:file  
https://cdn.staticaly.com/wp/t/:theme_name/:version/:file
```



Imgpx CDN

```plain
https://cdn.staticaly.com/img/:image_url
```



Favicons CDN

```plain
https://cdn.staticaly.com/favicons/:favicon_url
```

## 5. npm

前端一般会引入很多的外部的js，css，收集癖的我也找到了些npm的CDN

```plain
1.
https://unpkg.com/social-share.js/dist/css/share.min.css

2.
https://beecdn.com/

3.
http://www.staticfile.org/

4.
https://www.npmjs.com/
```
