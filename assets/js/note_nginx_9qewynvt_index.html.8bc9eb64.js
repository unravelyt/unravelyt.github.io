"use strict";(self.webpackChunkunravely_blog=self.webpackChunkunravely_blog||[]).push([[8062],{4222:(s,i,n)=>{n.r(i),n.d(i,{comp:()=>l,data:()=>t});var e=n(6254);const a={},l=(0,n(1021).A)(a,[["render",function(s,i){return(0,e.uX)(),(0,e.CE)("div",null,i[0]||(i[0]=[(0,e.Fv)('<p><a href="https://nginx.org/en/linux_packages.html" target="_blank" rel="noopener noreferrer">nginx官网</a></p><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 不重启服务的情况下，加载新的内容</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">nginx</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -s</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> reload</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 测试配置是否写对了</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">nginx</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -t</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ubuntu安装" tabindex="-1"><a class="header-anchor" href="#ubuntu安装"><span>ubuntu安装:</span></a></h2><p>1.安装必备组件:</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> curl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> gnupg2</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ca-certificates</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> lsb-release</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ubuntu-keyring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.导入官方的nginx签名密钥，apt验证包的真实性:</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">curl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://nginx.org/keys/nginx_signing.key</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> gpg</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --dearmor</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> tee</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /usr/share/keyrings/nginx-archive-keyring.gpg</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/dev/null</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>3.验证下载的文件是否包含正确的密钥:</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">gpg</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --dry-run</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --quiet</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --no-keyring</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --import</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --import-options</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> import-show</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /usr/share/keyrings/nginx-archive-keyring.gpg</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>4.输出应该包含完整的指纹573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62，如果指纹不一致，请删除文件。如下所示:</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">pub</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">   rsa2048</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 2011-08-19</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> [SC] </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">expires: 2024-06-14</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">uid</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">                      nginx</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> signing</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> key</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">signing-key@nginx.co</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">m</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.（推荐）安装稳定版本的nginx包设置apt存储库，请运行以下命令:</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\</span></span>\n<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">http://nginx.org/packages/ubuntu </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">`</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">lsb_release</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -cs</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">`</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> tee</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /etc/apt/sources.list.d/nginx.list</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>如果想使用最新版本的nginx包，运行以下命令:</li></ol><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\</span></span>\n<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">http://nginx.org/packages/mainline/ubuntu </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">`</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">lsb_release</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -cs</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">`</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> tee</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /etc/apt/sources.list.d/nginx.list</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>7.设置存储库绑定，优先选择我们的包而不是发行版提供的包:</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">echo</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -e</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Package: *\\nPin: origin nginx.org\\nPin: release o=nginx\\nPin-Priority: 900\\n</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> tee</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /etc/apt/preferences.d/99nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>8.安装nginx的命令如下:</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> update</span></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="debian安装" tabindex="-1"><a class="header-anchor" href="#debian安装"><span>debian安装:</span></a></h2><p>见官网：<a href="https://nginx.org/en/linux_packages.html" target="_blank" rel="noopener noreferrer">nginx官网</a></p><h2 id="卸载后重新安装-etc-nginx配置文件没了" tabindex="-1"><a class="header-anchor" href="#卸载后重新安装-etc-nginx配置文件没了"><span>卸载后重新安装/etc/nginx配置文件没了</span></a></h2><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt-get</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --purge</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> remove</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx-common</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt-get</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --purge</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> remove</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">*</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt-get</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> autoremove</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">tree</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /etc/nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx文件目录" tabindex="-1"><a class="header-anchor" href="#nginx文件目录"><span>nginx文件目录</span></a></h2><ul><li>/etc/nginx Nginx配置文件目录, 所有的Nginx配置文件都在这里.</li><li>/usr/lib/nginx</li><li>/usr/share/nginx 网站文件存放的地方, 默认只有Nginx欢迎页面, 可以通过改变Nginx配置文件的方式来修改这个位置.</li><li>/usr/share/doc/nginx</li><li>/var/cache/nginx</li><li>/var/log/nginx 日志目录</li></ul>',26)]))}]]),t=JSON.parse('{"path":"/note_nginx/9qewynvt/","title":"nginx安装","lang":"zh-CN","frontmatter":{"title":"nginx安装","createTime":"2024/11/14 16:49:20","permalink":"/note_nginx/9qewynvt/","description":"nginx官网 常用命令 ubuntu安装: 1.安装必备组件: 2.导入官方的nginx签名密钥，apt验证包的真实性: 3.验证下载的文件是否包含正确的密钥: 4.输出应该包含完整的指纹573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62，如果指纹不一致，请删除文件。如下所示: 5.（推荐）安装稳定版本的nginx包设置...","head":[["meta",{"property":"og:url","content":"https://www.unravely.press/note_nginx/9qewynvt/"}],["meta",{"property":"og:site_name","content":"Unravely"}],["meta",{"property":"og:title","content":"nginx安装"}],["meta",{"property":"og:description","content":"nginx官网 常用命令 ubuntu安装: 1.安装必备组件: 2.导入官方的nginx签名密钥，apt验证包的真实性: 3.验证下载的文件是否包含正确的密钥: 4.输出应该包含完整的指纹573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62，如果指纹不一致，请删除文件。如下所示: 5.（推荐）安装稳定版本的nginx包设置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-16T17:28:23.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-16T17:28:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx安装\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-16T17:28:23.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]},{"level":2,"title":"ubuntu安装:","slug":"ubuntu安装","link":"#ubuntu安装","children":[]},{"level":2,"title":"debian安装:","slug":"debian安装","link":"#debian安装","children":[]},{"level":2,"title":"卸载后重新安装/etc/nginx配置文件没了","slug":"卸载后重新安装-etc-nginx配置文件没了","link":"#卸载后重新安装-etc-nginx配置文件没了","children":[]},{"level":2,"title":"nginx文件目录","slug":"nginx文件目录","link":"#nginx文件目录","children":[]}],"readingTime":{"minutes":1.48,"words":443},"git":{"createdTime":1731581071000,"updatedTime":1731778103000,"contributors":[{"name":"unravely","email":"yutong9717@163.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/note_nginx/1.nginx安装和命令.md","bulletin":false}')}}]);