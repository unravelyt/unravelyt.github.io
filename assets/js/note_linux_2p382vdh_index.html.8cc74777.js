"use strict";(self.webpackChunkunravely_blog=self.webpackChunkunravely_blog||[]).push([[2722],{3216:(t,d,i)=>{i.r(d),i.d(d,{comp:()=>p,data:()=>s});var a=i(6254);const n={},p=(0,i(1021).A)(n,[["render",function(t,d){return(0,a.uX)(),(0,a.CE)("div",null,d[0]||(d[0]=[(0,a.Fv)('<h2 id="_1-http请求" tabindex="-1"><a class="header-anchor" href="#_1-http请求"><span>1. HTTP请求</span></a></h2><p>HTTP 协议是 Hyper Text Transfer Protocol（超文本传输协议）的缩写，是用于从万维网（ WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。</p><p>HTTP 是一个基于 TCP/IP 通信协议来传递数据（HTML 文件、图片文件、查询结果等）。</p><p>HTTP请求由三部分组成，<strong>请求行</strong>，<strong>消息报头</strong>，<strong>请求正文</strong></p><p>http请求行以一个方法开头，以空格开头，后面跟着URI以及http协议版本,每行结尾使用回车和换行，CRLF标识回车换行</p><p><strong>HTTP 三点注意事项：</strong></p><ul><li>HTTP 是无连接：无连接的含义是限制每次连接只处理一个请求，服务器处理完客户的请求，并收到客户的应答后，即断开连接，采用这种方式可以节省传输时间。</li><li>HTTP 是媒体独立的：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送，客户端以及服务器指定使用适合的 MIME-type 内容类型。</li><li>HTTP 是无状态：HTTP 协议是无状态协议，无状态是指协议对于事务处理没有记忆能力，缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大，另一方面，在服务器不需要先前信息时它的应答就较快。</li></ul><table><thead><tr><th>请求方法</th><th>描述</th></tr></thead><tbody><tr><td>GET</td><td>请求获取URI所标识的资源（指定的页面信息），并返回实体主体。</td></tr><tr><td>POST</td><td>请求服务器接受所指定的文档作为对所标识的URI的新的从属实体</td></tr><tr><td>HEAD</td><td>请求获取由URI所标识的的资源的响应头信息，只请求页面的首部</td></tr><tr><td>PUT</td><td>从客户端向服务器传送的数据取代指定的文档的内容</td></tr><tr><td>DELETE</td><td>请求服务器删除URI所表示的资源</td></tr><tr><td>TRACE</td><td>请求服务器在响应中的实体主体部分返回所得到的内容，用于测试或诊断</td></tr><tr><td>PATCH</td><td>实体中包含一个表，表中说明与该URI所表示的原内容的区别</td></tr><tr><td>MOVE</td><td>请求服务器将指定的页面移至另一个网络地址</td></tr><tr><td>COPY</td><td>请求服务器将指定的页面拷贝至另一个网络地址</td></tr><tr><td>LINK</td><td>请求服务器建立链接关系</td></tr><tr><td>UNLINK</td><td>断开链接关系</td></tr><tr><td>WRAPPED</td><td>允许客户端发送经过封装的请求</td></tr><tr><td>CONNECT</td><td></td></tr><tr><td>OPTIONS</td><td>允许客户端查看服务器的性能</td></tr></tbody></table><h2 id="_2-请求报头request" tabindex="-1"><a class="header-anchor" href="#_2-请求报头request"><span>2. 请求报头Request</span></a></h2><table><thead><tr><th>Header</th><th>解释</th><th>示例</th></tr></thead><tbody><tr><td>Accept</td><td>指定客户端能够接收的内容类型</td><td>Accept: text/plain, text/html</td></tr><tr><td>Accept-Charset</td><td>浏览器可以接受的字符编码集。</td><td>Accept-Charset: iso-8859-5</td></tr><tr><td>Accept-Encoding</td><td>指定浏览器可以支持的web服务器返回内容压缩编码类型。</td><td>Accept-Encoding: compress, gzip</td></tr><tr><td>Accept-Language</td><td>浏览器可接受的语言</td><td>Accept-Language: en,zh</td></tr><tr><td>Accept-Ranges</td><td>可以请求网页实体的一个或者多个子范围字段</td><td>Accept-Ranges: bytes</td></tr><tr><td>Authorization</td><td>HTTP授权的授权证书</td><td>Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==</td></tr><tr><td>Cache-Control</td><td>指定请求和响应遵循的缓存机制</td><td>Cache-Control: no-cache</td></tr><tr><td>Connection</td><td>表示是否需要持久连接。（HTTP 1.1默认进行持久连接）</td><td>Connection: close</td></tr><tr><td>Cookie</td><td>HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。</td><td>Cookie: $Version=1; Skin=new;</td></tr><tr><td>Content-Length</td><td>请求的内容长度</td><td>Content-Length: 348</td></tr><tr><td>Content-Type</td><td>请求的与实体对应的MIME信息</td><td>Content-Type: application/x-www-form-urlencoded</td></tr><tr><td>Date</td><td>请求发送的日期和时间</td><td>Date: Tue, 15 Nov 2010 08:12:31 GMT</td></tr><tr><td>Expect</td><td>请求的特定的服务器行为</td><td>Expect: 100-continue</td></tr><tr><td>From</td><td>发出请求的用户的Email</td><td>From: <a href="mailto:user@email.com" target="_blank" rel="noopener noreferrer">user@email.com</a></td></tr><tr><td>Host</td><td>指定请求的服务器的域名和端口号</td><td>Host: <a href="https://www.zcmhi.com" target="_blank" rel="noopener noreferrer">www.zcmhi.com</a></td></tr><tr><td>Origin</td><td>用来说明请求从哪里发起的，包括且仅仅包括协议和域名。这个参数一般只存在于CORS跨域请求中，可以看到response有对应的header：Access-Control-Allow-Origin</td><td>header：Access-Control-Allow-Origin</td></tr><tr><td>If-Match</td><td>只有请求内容与实体相匹配才有效</td><td>If-Match: “737060cd8c284d8af7ad3082f209582d”</td></tr><tr><td>If-Modified-Since</td><td>如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码</td><td>If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT</td></tr><tr><td>If-None-Match</td><td>如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变</td><td>If-None-Match: “737060cd8c284d8af7ad3082f209582d”</td></tr><tr><td>If-Range</td><td>如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag</td><td>If-Range: “737060cd8c284d8af7ad3082f209582d”</td></tr><tr><td>If-Unmodified-Since</td><td>只在实体在指定时间之后未被修改才请求成功</td><td>If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT</td></tr><tr><td>Max-Forwards</td><td>限制信息通过代理和网关传送的时间</td><td>Max-Forwards: 10</td></tr><tr><td>Pragma</td><td>用来包含实现特定的指令</td><td>Pragma: no-cache</td></tr><tr><td>Proxy-Authorization</td><td>连接到代理的授权证书</td><td>Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==</td></tr><tr><td>Range</td><td>只请求实体的一部分，指定范围</td><td>Range: bytes=500-999</td></tr><tr><td>Referer</td><td>先前网页的地址，当前请求网页紧随其后,即来路</td><td>Referer: http://www.zcmhi.com/archives/71.html</td></tr><tr><td>Upgrade</td><td>向服务器指定某种传输协议以便服务器进行转换（如果支持）</td><td>Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11</td></tr><tr><td>User-Agent</td><td>User-Agent的内容包含发出请求的用户信息</td><td>User-Agent: Mozilla/5.0 (Linux; X11)</td></tr><tr><td>Via</td><td>通知中间网关或代理服务器地址，通信协议</td><td>Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)</td></tr><tr><td>Warning</td><td>关于消息实体的警告信息</td><td>Warn: 199 Miscellaneous warning</td></tr></tbody></table><h2 id="_3-响应报头response" tabindex="-1"><a class="header-anchor" href="#_3-响应报头response"><span>3. 响应报头Response</span></a></h2><table><thead><tr><th>Header</th><th>解释</th><th>示例</th></tr></thead><tbody><tr><td>Accept-Ranges</td><td>表明服务器是否支持指定范围请求及哪种类型的分段请求</td><td>Accept-Ranges: bytes</td></tr><tr><td>Age</td><td>从原始服务器到代理缓存形成的估算时间（以秒计，非负）</td><td>Age: 12</td></tr><tr><td>Allow</td><td>对某网络资源的有效的请求行为，不允许则返回405</td><td>Allow: GET, HEAD</td></tr><tr><td>Cache-Control</td><td>告诉所有的缓存机制是否可以缓存及哪种类型</td><td>Cache-Control: no-cache</td></tr><tr><td>Content-Encoding</td><td>web服务器支持的返回内容压缩编码类型。</td><td>Content-Encoding: gzip</td></tr><tr><td>Content-Language</td><td>响应体的语言</td><td>Content-Language: en,zh</td></tr><tr><td>Content-Length</td><td>响应体的长度</td><td>Content-Length: 348</td></tr><tr><td>Content-Location</td><td>请求资源可替代的备用的另一地址</td><td>Content-Location: /index.htm</td></tr><tr><td>Content-MD5</td><td>返回资源的MD5校验值</td><td>Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==</td></tr><tr><td>Content-Range</td><td>在整个返回体中本部分的字节位置</td><td>Content-Range: bytes 21010-47021/47022</td></tr><tr><td>Content-Type</td><td>返回内容的MIME类型</td><td>Content-Type: text/html; charset=utf-8</td></tr><tr><td>Content-Disposition</td><td>服务器通过这个头，告诉浏览器以下载的方式打开数据。</td><td>Content-Disposition: inline Content-Disposition: attachment Content-Disposition: attachment; filename=&quot;filename.jpg&quot;</td></tr><tr><td>Date</td><td>原始服务器消息发出的时间</td><td>Date: Tue, 15 Nov 2010 08:12:31 GMT</td></tr><tr><td>ETag</td><td>请求变量的实体标签的当前值</td><td>ETag: “737060cd8c284d8af7ad3082f209582d”</td></tr><tr><td>Expires</td><td>响应过期的日期和时间</td><td>Expires: Thu, 01 Dec 2010 16:00:00 GMT</td></tr><tr><td>Last-Modified</td><td>请求资源的最后修改时间</td><td>Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT</td></tr><tr><td>Location</td><td>用来重定向接收方到非请求URL的位置来完成请求或标识新的资源</td><td>Location: http://www.zcmhi.com/archives/94.html</td></tr><tr><td>Pragma</td><td>包括实现特定的指令，它可应用到响应链上的任何接收方</td><td>Pragma: no-cache</td></tr><tr><td>Proxy-Authenticate</td><td>它指出认证方案和可应用到代理的该URL上的参数</td><td>Proxy-Authenticate: Basic</td></tr><tr><td>refresh</td><td>应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）</td><td>Refresh: 5; url=http://www.zcmhi.com/archives/94.html</td></tr><tr><td>Retry-After</td><td>如果实体暂时不可取，通知客户端在指定时间之后再次尝试</td><td>Retry-After: 120</td></tr><tr><td>Server</td><td>web服务器软件名称</td><td>Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)</td></tr><tr><td>Set-Cookie</td><td>设置Http Cookie</td><td>Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1</td></tr><tr><td>Trailer</td><td>指出头域在分块传输编码的尾部存在</td><td>Trailer: Max-Forwards</td></tr><tr><td>Transfer-Encoding</td><td>文件传输编码</td><td>Transfer-Encoding:chunked</td></tr><tr><td>Vary</td><td>告诉下游代理是使用缓存响应还是从原始服务器请求</td><td>Vary: *</td></tr><tr><td>Via</td><td>告知代理客户端响应是通过哪里发送的</td><td>Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)</td></tr><tr><td>Warning</td><td>警告实体可能存在的问题</td><td>Warning: 199 Miscellaneous warning</td></tr><tr><td>WWW-Authenticate</td><td>表明客户端请求实体应该使用的授权方案</td><td>WWW-Authenticate: Basic</td></tr></tbody></table><h2 id="_4-content-type" tabindex="-1"><a class="header-anchor" href="#_4-content-type"><span>4. Content-Type</span></a></h2><p>MediaType即是Internet Media Type，互联网媒体类型；也叫做MIME类型，在Http协议消息头中，使用Content-Type来表示具体请求中的媒体类型信息。</p><p>在HTTP协议消息头中，使用Content-Type来表示媒体类型信息。它被用来告诉服务端如何处理请求的数据，以及告诉客户端（一般是浏览器）如何解析响应的数据，比如显示图片，解析html或仅仅展示一个文本等。</p><p>Post请求的内容放置在请求体中，<strong>Content-Type</strong>定义了请求体的编码格式。数据发送出去后，还需要接收端解析才可以。接收端依靠请求头中的<strong>Content-Type</strong>字段来获知请求体的编码格式，最后再进行解析。</p><h3 id="_4-1-常见的媒体格式类型" tabindex="-1"><a class="header-anchor" href="#_4-1-常见的媒体格式类型"><span>4.1 常见的媒体格式类型</span></a></h3><ul><li>text/html：HTML格式</li><li>text/plain：纯文本格式</li><li>text/xml：XML格式</li><li>image/gif：gif图片格式</li><li>image/jpeg：jpg图片格式</li><li>image/png：png图片格式</li></ul><p>以application开头的媒体格式类型：</p><ul><li>application/xhtml+xml：XHTML格式</li><li>application/xml：XML数据格式</li><li>application/atom+xml：Atom XML聚合格式</li><li>application/json：JSON数据格式</li><li>application/pdf：pdf格式</li><li>application/msword：Word文档格式</li><li>application/octet-stream：二进制流数据（常见的文件下载)</li><li>application/x-www-form-urlencoded：表单中默认的encType,表单数据被编码为key/value格式发送到服务器</li></ul><p>另外一种常见的媒体格式是上传文件时使用：</p><ul><li>multipart/form-data：需要在表单中进行文件上传时，就需要使用该格式</li></ul><h3 id="_4-2-spring-mvc中关于content-type类型的使用" tabindex="-1"><a class="header-anchor" href="#_4-2-spring-mvc中关于content-type类型的使用"><span>4.2 Spring MVC中关于Content-Type类型的使用</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">@</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Target</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">ElementType</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">TYPE</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> ElementType</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">METHOD</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">})</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">@</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Retention</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">RetentionPolicy</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">RUNTIME</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">@</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Documented</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">@</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Mapping</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">@</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">Reflective</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">ControllerMappingReflectiveProcessor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">class</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">})</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> @</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">interface</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> RequestMapping</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    //指定请求的实际地址， 比如 /action/info之类</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    String </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    @</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">AliasFor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">path</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {};</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    @</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">AliasFor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">value</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> path</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {};</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    </span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">\t// 指定请求的method类型， GET、POST、PUT、DELETE等</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    RequestMethod</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> method</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {};</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    </span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    //指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> params</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {};</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    //指定request中必须包含某些指定的header值，才能让该方法处理请求</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> headers</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {};</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    //指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> consumes</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {};</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    //指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[]</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> produces</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {};</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-content-type参照表" tabindex="-1"><a class="header-anchor" href="#_4-3-content-type参照表"><span>4.3 Content-Type参照表</span></a></h3><table><thead><tr><th>文件扩展名</th><th>Content-Type(Mime-Type)</th><th>文件扩展名</th><th>Content-Type(Mime-Type)</th></tr></thead><tbody><tr><td>.*</td><td>application/octet-stream 二进制流，不知道文件类型</td><td>.tif</td><td>image/tiff</td></tr><tr><td>.001</td><td>application/x-001</td><td>.301</td><td>application/x-301</td></tr><tr><td>.323</td><td>text/h323</td><td>.906</td><td>application/x-906</td></tr><tr><td>.907</td><td>drawing/907</td><td>.a11</td><td>application/x-a11</td></tr><tr><td>.acp</td><td>audio/x-mei-aac</td><td>.ai</td><td>application/postscript</td></tr><tr><td>.aif</td><td>audio/aiff</td><td>.aifc</td><td>audio/aiff</td></tr><tr><td>.aiff</td><td>audio/aiff</td><td>.anv</td><td>application/x-anv</td></tr><tr><td>.asa</td><td>text/asa</td><td>.asf</td><td>video/x-ms-asf</td></tr><tr><td>.asp</td><td>text/asp</td><td>.asx</td><td>video/x-ms-asf</td></tr><tr><td>.au</td><td>audio/basic</td><td>.avi</td><td>video/avi</td></tr><tr><td>.awf</td><td>application/vnd.adobe.workflow</td><td>.biz</td><td>text/xml</td></tr><tr><td>.bmp</td><td>application/x-bmp</td><td>.bot</td><td>application/x-bot</td></tr><tr><td>.c4t</td><td>application/x-c4t</td><td>.c90</td><td>application/x-c90</td></tr><tr><td>.cal</td><td>application/x-cals</td><td>.cat</td><td>application/vnd.ms-pki.seccat</td></tr><tr><td>.cdf</td><td>application/x-netcdf</td><td>.cdr</td><td>application/x-cdr</td></tr><tr><td>.cel</td><td>application/x-cel</td><td>.cer</td><td>application/x-x509-ca-cert</td></tr><tr><td>.cg4</td><td>application/x-g4</td><td>.cgm</td><td>application/x-cgm</td></tr><tr><td>.cit</td><td>application/x-cit</td><td>.class</td><td>java/*</td></tr><tr><td>.cml</td><td>text/xml</td><td>.cmp</td><td>application/x-cmp</td></tr><tr><td>.cmx</td><td>application/x-cmx</td><td>.cot</td><td>application/x-cot</td></tr><tr><td>.crl</td><td>application/pkix-crl</td><td>.crt</td><td>application/x-x509-ca-cert</td></tr><tr><td>.csi</td><td>application/x-csi</td><td>.css</td><td>text/css</td></tr><tr><td>.cut</td><td>application/x-cut</td><td>.dbf</td><td>application/x-dbf</td></tr><tr><td>.dbm</td><td>application/x-dbm</td><td>.dbx</td><td>application/x-dbx</td></tr><tr><td>.dcd</td><td>text/xml</td><td>.dcx</td><td>application/x-dcx</td></tr><tr><td>.der</td><td>application/x-x509-ca-cert</td><td>.dgn</td><td>application/x-dgn</td></tr><tr><td>.dib</td><td>application/x-dib</td><td>.dll</td><td>application/x-msdownload</td></tr><tr><td>.doc</td><td>application/msword</td><td>.dot</td><td>application/msword</td></tr><tr><td>.drw</td><td>application/x-drw</td><td>.dtd</td><td>text/xml</td></tr><tr><td>.dwf</td><td>Model/vnd.dwf</td><td>.dwf</td><td>application/x-dwf</td></tr><tr><td>.dwg</td><td>application/x-dwg</td><td>.dxb</td><td>application/x-dxb</td></tr><tr><td>.dxf</td><td>application/x-dxf</td><td>.edn</td><td>application/vnd.adobe.edn</td></tr><tr><td>.emf</td><td>application/x-emf</td><td>.eml</td><td>message/rfc822</td></tr><tr><td>.ent</td><td>text/xml</td><td>.epi</td><td>application/x-epi</td></tr><tr><td>.eps</td><td>application/x-ps</td><td>.eps</td><td>application/postscript</td></tr><tr><td>.etd</td><td>application/x-ebx</td><td>.exe</td><td>application/x-msdownload</td></tr><tr><td>.fax</td><td>image/fax</td><td>.fdf</td><td>application/vnd.fdf</td></tr><tr><td>.fif</td><td>application/fractals</td><td>.fo</td><td>text/xml</td></tr><tr><td>.frm</td><td>application/x-frm</td><td>.g4</td><td>application/x-g4</td></tr><tr><td>.gbr</td><td>application/x-gbr</td><td>.</td><td>application/x-</td></tr><tr><td>.gif</td><td>image/gif</td><td>.gl2</td><td>application/x-gl2</td></tr><tr><td>.gp4</td><td>application/x-gp4</td><td>.hgl</td><td>application/x-hgl</td></tr><tr><td>.hmr</td><td>application/x-hmr</td><td>.hpg</td><td>application/x-hpgl</td></tr><tr><td>.hpl</td><td>application/x-hpl</td><td>.hqx</td><td>application/mac-binhex40</td></tr><tr><td>.hrf</td><td>application/x-hrf</td><td>.hta</td><td>application/hta</td></tr><tr><td>.htc</td><td>text/x-component</td><td>.htm</td><td>text/html</td></tr><tr><td>.html</td><td>text/html</td><td>.htt</td><td>text/webviewhtml</td></tr><tr><td>.htx</td><td>text/html</td><td>.icb</td><td>application/x-icb</td></tr><tr><td>.ico</td><td>image/x-icon</td><td>.ico</td><td>application/x-ico</td></tr><tr><td>.iff</td><td>application/x-iff</td><td>.ig4</td><td>application/x-g4</td></tr><tr><td>.igs</td><td>application/x-igs</td><td>.iii</td><td>application/x-iphone</td></tr><tr><td>.img</td><td>application/x-img</td><td>.ins</td><td>application/x-internet-signup</td></tr><tr><td>.isp</td><td>application/x-internet-signup</td><td>.IVF</td><td>video/x-ivf</td></tr><tr><td>.java</td><td>java/*</td><td>.jfif</td><td>image/jpeg</td></tr><tr><td>.jpe</td><td>image/jpeg</td><td>.jpe</td><td>application/x-jpe</td></tr><tr><td>.jpeg</td><td>image/jpeg</td><td>.jpg</td><td>image/jpeg</td></tr><tr><td>.jpg</td><td>application/x-jpg</td><td>.js</td><td>application/x-javascript</td></tr><tr><td>.jsp</td><td>text/html</td><td>.la1</td><td>audio/x-liquid-file</td></tr><tr><td>.lar</td><td>application/x-laplayer-reg</td><td>.latex</td><td>application/x-latex</td></tr><tr><td>.lavs</td><td>audio/x-liquid-secure</td><td>.lbm</td><td>application/x-lbm</td></tr><tr><td>.lmsff</td><td>audio/x-la-lms</td><td>.ls</td><td>application/x-javascript</td></tr><tr><td>.ltr</td><td>application/x-ltr</td><td>.m1v</td><td>video/x-mpeg</td></tr><tr><td>.m2v</td><td>video/x-mpeg</td><td>.m3u</td><td>audio/mpegurl</td></tr><tr><td>.m4e</td><td>video/mpeg4</td><td>.mac</td><td>application/x-mac</td></tr><tr><td>.man</td><td>application/x-troff-man</td><td>.math</td><td>text/xml</td></tr><tr><td>.mdb</td><td>application/msaccess</td><td>.mdb</td><td>application/x-mdb</td></tr><tr><td>.mfp</td><td>application/x-shockwave-flash</td><td>.mht</td><td>message/rfc822</td></tr><tr><td>.mhtml</td><td>message/rfc822</td><td>.mi</td><td>application/x-mi</td></tr><tr><td>.mid</td><td>audio/mid</td><td>.midi</td><td>audio/mid</td></tr><tr><td>.mil</td><td>application/x-mil</td><td>.mml</td><td>text/xml</td></tr><tr><td>.mnd</td><td>audio/x-musicnet-download</td><td>.mns</td><td>audio/x-musicnet-stream</td></tr><tr><td>.mocha</td><td>application/x-javascript</td><td>.movie</td><td>video/x-sgi-movie</td></tr><tr><td>.mp1</td><td>audio/mp1</td><td>.mp2</td><td>audio/mp2</td></tr><tr><td>.mp2v</td><td>video/mpeg</td><td>.mp3</td><td>audio/mp3</td></tr><tr><td>.mp4</td><td>video/mpeg4</td><td>.mpa</td><td>video/x-mpg</td></tr><tr><td>.mpd</td><td>application/vnd.ms-project</td><td>.mpe</td><td>video/x-mpeg</td></tr><tr><td>.mpeg</td><td>video/mpg</td><td>.mpg</td><td>video/mpg</td></tr><tr><td>.mpga</td><td>audio/rn-mpeg</td><td>.mpp</td><td>application/vnd.ms-project</td></tr><tr><td>.mps</td><td>video/x-mpeg</td><td>.mpt</td><td>application/vnd.ms-project</td></tr><tr><td>.mpv</td><td>video/mpg</td><td>.mpv2</td><td>video/mpeg</td></tr><tr><td>.mpw</td><td>application/vnd.ms-project</td><td>.mpx</td><td>application/vnd.ms-project</td></tr><tr><td>.mtx</td><td>text/xml</td><td>.mxp</td><td>application/x-mmxp</td></tr><tr><td>.net</td><td>image/pnetvue</td><td>.nrf</td><td>application/x-nrf</td></tr><tr><td>.nws</td><td>message/rfc822</td><td>.odc</td><td>text/x-ms-odc</td></tr><tr><td>.out</td><td>application/x-out</td><td>.p10</td><td>application/pkcs10</td></tr><tr><td>.p12</td><td>application/x-pkcs12</td><td>.p7b</td><td>application/x-pkcs7-certificates</td></tr><tr><td>.p7c</td><td>application/pkcs7-mime</td><td>.p7m</td><td>application/pkcs7-mime</td></tr><tr><td>.p7r</td><td>application/x-pkcs7-certreqresp</td><td>.p7s</td><td>application/pkcs7-signature</td></tr><tr><td>.pc5</td><td>application/x-pc5</td><td>.pci</td><td>application/x-pci</td></tr><tr><td>.pcl</td><td>application/x-pcl</td><td>.pcx</td><td>application/x-pcx</td></tr><tr><td>.pdf</td><td>application/pdf</td><td>.pdf</td><td>application/pdf</td></tr><tr><td>.pdx</td><td>application/vnd.adobe.pdx</td><td>.pfx</td><td>application/x-pkcs12</td></tr><tr><td>.pgl</td><td>application/x-pgl</td><td>.pic</td><td>application/x-pic</td></tr><tr><td>.pko</td><td>application/vnd.ms-pki.pko</td><td>.pl</td><td>application/x-perl</td></tr><tr><td>.plg</td><td>text/html</td><td>.pls</td><td>audio/scpls</td></tr><tr><td>.plt</td><td>application/x-plt</td><td>.png</td><td>image/png</td></tr><tr><td>.png</td><td>application/x-png</td><td>.pot</td><td>application/vnd.ms-powerpoint</td></tr><tr><td>.ppa</td><td>application/vnd.ms-powerpoint</td><td>.ppm</td><td>application/x-ppm</td></tr><tr><td>.pps</td><td>application/vnd.ms-powerpoint</td><td>.ppt</td><td>application/vnd.ms-powerpoint</td></tr><tr><td>.ppt</td><td>application/x-ppt</td><td>.pr</td><td>application/x-pr</td></tr><tr><td>.prf</td><td>application/pics-rules</td><td>.prn</td><td>application/x-prn</td></tr><tr><td>.prt</td><td>application/x-prt</td><td>.ps</td><td>application/x-ps</td></tr><tr><td>.ps</td><td>application/postscript</td><td>.ptn</td><td>application/x-ptn</td></tr><tr><td>.pwz</td><td>application/vnd.ms-powerpoint</td><td>.r3t</td><td>text/vnd.rn-realtext3d</td></tr><tr><td>.ra</td><td>audio/vnd.rn-realaudio</td><td>.ram</td><td>audio/x-pn-realaudio</td></tr><tr><td>.ras</td><td>application/x-ras</td><td>.rat</td><td>application/rat-file</td></tr><tr><td>.rdf</td><td>text/xml</td><td>.rec</td><td>application/vnd.rn-recording</td></tr><tr><td>.red</td><td>application/x-red</td><td>.rgb</td><td>application/x-rgb</td></tr><tr><td>.rjs</td><td>application/vnd.rn-realsystem-rjs</td><td>.rjt</td><td>application/vnd.rn-realsystem-rjt</td></tr><tr><td>.rlc</td><td>application/x-rlc</td><td>.rle</td><td>application/x-rle</td></tr><tr><td>.rm</td><td>application/vnd.rn-realmedia</td><td>.rmf</td><td>application/vnd.adobe.rmf</td></tr><tr><td>.rmi</td><td>audio/mid</td><td>.rmj</td><td>application/vnd.rn-realsystem-rmj</td></tr><tr><td>.rmm</td><td>audio/x-pn-realaudio</td><td>.rmp</td><td>application/vnd.rn-rn_music_package</td></tr><tr><td>.rms</td><td>application/vnd.rn-realmedia-secure</td><td>.rmvb</td><td>application/vnd.rn-realmedia-vbr</td></tr><tr><td>.rmx</td><td>application/vnd.rn-realsystem-rmx</td><td>.rnx</td><td>application/vnd.rn-realplayer</td></tr><tr><td>.rp</td><td>image/vnd.rn-realpix</td><td>.rpm</td><td>audio/x-pn-realaudio-plugin</td></tr><tr><td>.rsml</td><td>application/vnd.rn-rsml</td><td>.rt</td><td>text/vnd.rn-realtext</td></tr><tr><td>.rtf</td><td>application/msword</td><td>.rtf</td><td>application/x-rtf</td></tr><tr><td>.rv</td><td>video/vnd.rn-realvideo</td><td>.sam</td><td>application/x-sam</td></tr><tr><td>.sat</td><td>application/x-sat</td><td>.sdp</td><td>application/sdp</td></tr><tr><td>.sdw</td><td>application/x-sdw</td><td>.sit</td><td>application/x-stuffit</td></tr><tr><td>.slb</td><td>application/x-slb</td><td>.sld</td><td>application/x-sld</td></tr><tr><td>.slk</td><td>drawing/x-slk</td><td>.smi</td><td>application/smil</td></tr><tr><td>.smil</td><td>application/smil</td><td>.smk</td><td>application/x-smk</td></tr><tr><td>.snd</td><td>audio/basic</td><td>.sol</td><td>text/plain</td></tr><tr><td>.sor</td><td>text/plain</td><td>.spc</td><td>application/x-pkcs7-certificates</td></tr><tr><td>.spl</td><td>application/futuresplash</td><td>.spp</td><td>text/xml</td></tr><tr><td>.ssm</td><td>application/streamingmedia</td><td>.sst</td><td>application/vnd.ms-pki.certstore</td></tr><tr><td>.stl</td><td>application/vnd.ms-pki.stl</td><td>.stm</td><td>text/html</td></tr><tr><td>.sty</td><td>application/x-sty</td><td>.svg</td><td>text/xml</td></tr><tr><td>.swf</td><td>application/x-shockwave-flash</td><td>.tdf</td><td>application/x-tdf</td></tr><tr><td>.tg4</td><td>application/x-tg4</td><td>.tga</td><td>application/x-tga</td></tr><tr><td>.tif</td><td>image/tiff</td><td>.tif</td><td>application/x-tif</td></tr><tr><td>.tiff</td><td>image/tiff</td><td>.tld</td><td>text/xml</td></tr><tr><td>.top</td><td>drawing/x-top</td><td>.torrent</td><td>application/x-bittorrent</td></tr><tr><td>.tsd</td><td>text/xml</td><td>.txt</td><td>text/plain</td></tr><tr><td>.uin</td><td>application/x-icq</td><td>.uls</td><td>text/iuls</td></tr><tr><td>.vcf</td><td>text/x-vcard</td><td>.vda</td><td>application/x-vda</td></tr><tr><td>.vdx</td><td>application/vnd.visio</td><td>.vml</td><td>text/xml</td></tr><tr><td>.vpg</td><td>application/x-vpeg005</td><td>.vsd</td><td>application/vnd.visio</td></tr><tr><td>.vsd</td><td>application/x-vsd</td><td>.vss</td><td>application/vnd.visio</td></tr><tr><td>.vst</td><td>application/vnd.visio</td><td>.vst</td><td>application/x-vst</td></tr><tr><td>.vsw</td><td>application/vnd.visio</td><td>.vsx</td><td>application/vnd.visio</td></tr><tr><td>.vtx</td><td>application/vnd.visio</td><td>.vxml</td><td>text/xml</td></tr><tr><td>.wav</td><td>audio/wav</td><td>.wax</td><td>audio/x-ms-wax</td></tr><tr><td>.wb1</td><td>application/x-wb1</td><td>.wb2</td><td>application/x-wb2</td></tr><tr><td>.wb3</td><td>application/x-wb3</td><td>.wbmp</td><td>image/vnd.wap.wbmp</td></tr><tr><td>.wiz</td><td>application/msword</td><td>.wk3</td><td>application/x-wk3</td></tr><tr><td>.wk4</td><td>application/x-wk4</td><td>.wkq</td><td>application/x-wkq</td></tr><tr><td>.wks</td><td>application/x-wks</td><td>.wm</td><td>video/x-ms-wm</td></tr><tr><td>.wma</td><td>audio/x-ms-wma</td><td>.wmd</td><td>application/x-ms-wmd</td></tr><tr><td>.wmf</td><td>application/x-wmf</td><td>.wml</td><td>text/vnd.wap.wml</td></tr><tr><td>.wmv</td><td>video/x-ms-wmv</td><td>.wmx</td><td>video/x-ms-wmx</td></tr><tr><td>.wmz</td><td>application/x-ms-wmz</td><td>.wp6</td><td>application/x-wp6</td></tr><tr><td>.wpd</td><td>application/x-wpd</td><td>.wpg</td><td>application/x-wpg</td></tr><tr><td>.wpl</td><td>application/vnd.ms-wpl</td><td>.wq1</td><td>application/x-wq1</td></tr><tr><td>.wr1</td><td>application/x-wr1</td><td>.wri</td><td>application/x-wri</td></tr><tr><td>.wrk</td><td>application/x-wrk</td><td>.ws</td><td>application/x-ws</td></tr><tr><td>.ws2</td><td>application/x-ws</td><td>.wsc</td><td>text/scriptlet</td></tr><tr><td>.wsdl</td><td>text/xml</td><td>.wvx</td><td>video/x-ms-wvx</td></tr><tr><td>.xdp</td><td>application/vnd.adobe.xdp</td><td>.xdr</td><td>text/xml</td></tr><tr><td>.xfd</td><td>application/vnd.adobe.xfd</td><td>.xfdf</td><td>application/vnd.adobe.xfdf</td></tr><tr><td>.xhtml</td><td>text/html</td><td>.xls</td><td>application/vnd.ms-excel</td></tr><tr><td>.xls</td><td>application/x-xls</td><td>.xlw</td><td>application/x-xlw</td></tr><tr><td>.xml</td><td>text/xml</td><td>.xpl</td><td>audio/scpls</td></tr><tr><td>.xq</td><td>text/xml</td><td>.xql</td><td>text/xml</td></tr><tr><td>.xquery</td><td>text/xml</td><td>.xsd</td><td>text/xml</td></tr><tr><td>.xsl</td><td>text/xml</td><td>.xslt</td><td>text/xml</td></tr><tr><td>.xwd</td><td>application/x-xwd</td><td>.x_b</td><td>application/x-x_b</td></tr><tr><td>.sis</td><td>application/vnd.symbian.install</td><td>.sisx</td><td>application/vnd.symbian.install</td></tr><tr><td>.x_t</td><td>application/x-x_t</td><td>.ipa</td><td>application/vnd.iphone</td></tr><tr><td>.apk</td><td>application/vnd.android.package-archive</td><td>.xap</td><td>application/x-silverlight-app</td></tr></tbody></table><h2 id="_5-响应头content-disposition" tabindex="-1"><a class="header-anchor" href="#_5-响应头content-disposition"><span>5. 响应头Content-disposition</span></a></h2><p>使用：response.setHeader(&quot;Content-disposition&quot;, &quot;attachment;filename=&quot; +filename);</p><ul><li><strong>attachment</strong>:表示以附件方式下载</li><li><strong>inline</strong>：在页面中打开</li></ul><p>注意:filename如果是中文会出现乱码：解决办法：</p><p>1、将filename 替换为 new String(filename.getBytes(), &quot;ISO8859-1&quot;);</p><p>2、将filename 替换为 URLEncoder.encode(filename, &quot;utf-8&quot;);</p>',32)]))}]]),s=JSON.parse('{"path":"/note_linux/2p382vdh/","title":"HTTP协议的请求头,响应头","lang":"zh-CN","frontmatter":{"title":"HTTP协议的请求头,响应头","createTime":"2024/11/13 18:08:18","permalink":"/note_linux/2p382vdh/","description":"1. HTTP请求 HTTP 协议是 Hyper Text Transfer Protocol（超文本传输协议）的缩写，是用于从万维网（ WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。 HTTP 是一个基于 TCP/IP 通信协议来传递数据（HTML 文件、图片文件、查询结果等）。 HTTP请求由三部分组成，请求行，消...","head":[["meta",{"property":"og:url","content":"https://www.unravely.press/note_linux/2p382vdh/"}],["meta",{"property":"og:site_name","content":"Unravely"}],["meta",{"property":"og:title","content":"HTTP协议的请求头,响应头"}],["meta",{"property":"og:description","content":"1. HTTP请求 HTTP 协议是 Hyper Text Transfer Protocol（超文本传输协议）的缩写，是用于从万维网（ WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。 HTTP 是一个基于 TCP/IP 通信协议来传递数据（HTML 文件、图片文件、查询结果等）。 HTTP请求由三部分组成，请求行，消..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-14T10:44:31.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-14T10:44:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HTTP协议的请求头,响应头\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-14T10:44:31.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. HTTP请求","slug":"_1-http请求","link":"#_1-http请求","children":[]},{"level":2,"title":"2. 请求报头Request","slug":"_2-请求报头request","link":"#_2-请求报头request","children":[]},{"level":2,"title":"3. 响应报头Response","slug":"_3-响应报头response","link":"#_3-响应报头response","children":[]},{"level":2,"title":"4. Content-Type","slug":"_4-content-type","link":"#_4-content-type","children":[{"level":3,"title":"4.1 常见的媒体格式类型","slug":"_4-1-常见的媒体格式类型","link":"#_4-1-常见的媒体格式类型","children":[]},{"level":3,"title":"4.2 Spring MVC中关于Content-Type类型的使用","slug":"_4-2-spring-mvc中关于content-type类型的使用","link":"#_4-2-spring-mvc中关于content-type类型的使用","children":[]},{"level":3,"title":"4.3 Content-Type参照表","slug":"_4-3-content-type参照表","link":"#_4-3-content-type参照表","children":[]}]},{"level":2,"title":"5. 响应头Content-disposition","slug":"_5-响应头content-disposition","link":"#_5-响应头content-disposition","children":[]}],"readingTime":{"minutes":12.34,"words":3702},"git":{"createdTime":1731493537000,"updatedTime":1731581071000,"contributors":[{"name":"banxia","email":"yutong9717@163.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/note_linux/60.network/HTTP协议的请求头,响应头.md","bulletin":false}')}}]);