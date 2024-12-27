"use strict";(self.webpackChunkunravely_blog=self.webpackChunkunravely_blog||[]).push([[8123],{4351:(s,i,a)=>{a.r(i),a.d(i,{comp:()=>t,data:()=>l});var e=a(6254);const n={},t=(0,a(1021).A)(n,[["render",function(s,i){return(0,e.uX)(),(0,e.CE)("div",null,i[0]||(i[0]=[(0,e.Fv)('<h2 id="_1-下载配置文件" tabindex="-1"><a class="header-anchor" href="#_1-下载配置文件"><span>1.下载配置文件</span></a></h2><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 创建文件夹</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">mkdir</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ./immich-app</span></span>\n<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ./immich-app</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 获取 docker-compose.yml 文件</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wget</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -O</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker-compose.yml</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 获取 .env 文件</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wget</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -O</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> .env</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://github.com/immich-app/immich/releases/latest/download/example.env</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># （可选）获取 hwaccel.transcoding.yml 文件</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wget</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -O</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> hwaccel.transcoding.yml</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://github.com/immich-app/immich/releases/latest/download/hwaccel.transcoding.yml</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># （可选）获取 hwaccel.ml.yml 文件</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wget</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -O</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> hwaccel.ml.yml</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://github.com/immich-app/immich/releases/latest/download/hwaccel.ml.yml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-修改配置文件" tabindex="-1"><a class="header-anchor" href="#_2-修改配置文件"><span>2.修改配置文件</span></a></h2><div class="language-shell line-numbers-mode has-collapsed collapsed" data-ext="shell" data-title="shell" style="--vp-collapsed-lines:20;"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># You can find documentation for all the supported env variables at https://immich.app/docs/install/environment-variables</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># The location where your uploaded files are stored</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">UPLOAD_LOCATION</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">./library</span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># The location where your database files are stored</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">DB_DATA_LOCATION</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">./postgres</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># To set a timezone, uncomment the next line and change Etc/UTC to a TZ identifier from this list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List</span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># TZ=Etc/UTC</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># The Immich version to use. You can pin this to a specific version like &quot;v1.71.0&quot;</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">IMMICH_VERSION</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">release</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># Connection secret for postgres. You should change it to a random password</span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># Please use only the characters `A-Za-z0-9`, without special characters or spaces</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">DB_PASSWORD</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">postgres</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># The values below this line do not need to be changed</span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">###################################################################################</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">DB_USERNAME</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">postgres</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">DB_DATABASE_NAME</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">immich</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div><div class="collapsed-lines"></div></div><h2 id="_3-替换文件内镜像" tabindex="-1"><a class="header-anchor" href="#_3-替换文件内镜像"><span>3.替换文件内镜像</span></a></h2><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">image:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ghcr.m.daocloud.io/immich-app/immich-server:</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">${</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">IMMICH_VERSION</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">:-</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">release</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">image:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ghcr.m.daocloud.io/immich-app/immich-machine-learning:</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">${</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">IMMICH_VERSION</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">:-</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">release</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-替换规则" tabindex="-1"><a class="header-anchor" href="#_3-1-替换规则"><span>3.1 替换规则</span></a></h3><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">k8s.gcr.io/coredns/coredns</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> m.daocloud.io/k8s.gcr.io/coredns/coredns</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><table><thead><tr><th>源站</th><th>替换为</th></tr></thead><tbody><tr><td>[cr.l5d.io</td><td>[l5d.m.daocloud.io]</td></tr><tr><td>[docker.elastic.co]</td><td>[elastic.m.daocloud.io]</td></tr><tr><td>[docker.io]</td><td>[docker.m.daocloud.io]</td></tr><tr><td>[gcr.io]</td><td>[gcr.m.daocloud.io]</td></tr><tr><td>[ghcr.io]</td><td>[ghcr.m.daocloud.io]</td></tr><tr><td>[k8s.gcr.io]</td><td>[k8s-gcr.m.daocloud.io]</td></tr><tr><td>[registry.k8s.io]</td><td>[k8s.m.daocloud.io]</td></tr><tr><td>[mcr.microsoft.com]</td><td>[mcr.m.daocloud.io]</td></tr><tr><td>[nvcr.io]</td><td>[nvcr.m.daocloud.io]</td></tr><tr><td>[quay.io]</td><td>[quay.m.daocloud.io]</td></tr><tr><td>[registry.jujucharms.com]</td><td>[jujucharms.m.daocloud.io]</td></tr><tr><td>rocks.canonical.com</td><td>[rocks-canonical.m.daocloud.io]</td></tr><tr><td>[gcr.io]</td><td>[gcr.nju.edu.cn]</td></tr><tr><td>[k8s.gcr.io]</td><td>[gcr.nju.edu.cn/google-containers]</td></tr><tr><td>[ghcr.io]</td><td>[ghcr.nju.edu.cn]</td></tr><tr><td>[nvcr.io]</td><td>[nvcr.nju.edu.cn]</td></tr><tr><td>[quay.io]</td><td>[quay.nju.edu.cn]</td></tr><tr><td>[registry.k8s.io]</td><td>[k8s.mirror.nju.edu.cn]</td></tr></tbody></table><h2 id="_4-启动容器" tabindex="-1"><a class="header-anchor" href="#_4-启动容器"><span>4.启动容器</span></a></h2><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> compose</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> up</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_5-登录后台" tabindex="-1"><a class="header-anchor" href="#_5-登录后台"><span>5.登录后台</span></a></h2><p><code>http://&lt;machine-ip-address&gt;:2283</code></p>',13)]))}]]),l=JSON.parse('{"path":"/article/ehir7gjs/","title":"自建Immich图库","lang":"zh-CN","frontmatter":{"title":"自建Immich图库","tags":["图床"],"createTime":"2024/11/20 14:43:23","excerpt":"避免时间冲淡记忆","cover":"/cover/cover_immich.jpg","permalink":"/article/ehir7gjs/","description":"1.下载配置文件 2.修改配置文件 3.替换文件内镜像 3.1 替换规则 4.启动容器 5.登录后台 http://<machine-ip-address>:2283","head":[["meta",{"property":"og:url","content":"https://www.unravely.press/article/ehir7gjs/"}],["meta",{"property":"og:site_name","content":"Unravely"}],["meta",{"property":"og:title","content":"自建Immich图库"}],["meta",{"property":"og:description","content":"1.下载配置文件 2.修改配置文件 3.替换文件内镜像 3.1 替换规则 4.启动容器 5.登录后台 http://<machine-ip-address>:2283"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.unravely.press/cover/cover_immich.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-22T10:34:02.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://www.unravely.press/cover/cover_immich.jpg"}],["meta",{"name":"twitter:image:alt","content":"自建Immich图库"}],["meta",{"property":"article:tag","content":"图床"}],["meta",{"property":"article:modified_time","content":"2024-11-22T10:34:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自建Immich图库\\",\\"image\\":[\\"https://www.unravely.press/cover/cover_immich.jpg\\"],\\"dateModified\\":\\"2024-11-22T10:34:02.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.下载配置文件","slug":"_1-下载配置文件","link":"#_1-下载配置文件","children":[]},{"level":2,"title":"2.修改配置文件","slug":"_2-修改配置文件","link":"#_2-修改配置文件","children":[]},{"level":2,"title":"3.替换文件内镜像","slug":"_3-替换文件内镜像","link":"#_3-替换文件内镜像","children":[{"level":3,"title":"3.1 替换规则","slug":"_3-1-替换规则","link":"#_3-1-替换规则","children":[]}]},{"level":2,"title":"4.启动容器","slug":"_4-启动容器","link":"#_4-启动容器","children":[]},{"level":2,"title":"5.登录后台","slug":"_5-登录后台","link":"#_5-登录后台","children":[]}],"readingTime":{"minutes":1.1,"words":329},"git":{"createdTime":1732098709000,"updatedTime":1732271642000,"contributors":[{"name":"banxia","email":"yutong9717@163.com","commits":3}]},"autoDesc":true,"filePathRelative":"blog/linux/自建Immich图库.md","categoryList":[{"id":"126ac9","sort":10002,"name":"blog"},{"id":"dce1fa","sort":10004,"name":"linux"}],"bulletin":false}')}}]);