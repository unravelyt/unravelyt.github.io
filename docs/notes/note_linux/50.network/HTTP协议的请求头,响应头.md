---
title: HTTP协议的请求头,响应头
createTime: 2024/11/13 18:08:18
permalink: /note_linux/2p382vdh/
---


## 1. HTTP请求

HTTP 协议是 Hyper Text Transfer Protocol（超文本传输协议）的缩写，是用于从万维网（ WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。

HTTP 是一个基于 TCP/IP 通信协议来传递数据（HTML 文件、图片文件、查询结果等）。

HTTP请求由三部分组成，**请求行**，**消息报头**，**请求正文**

http请求行以一个方法开头，以空格开头，后面跟着URI以及http协议版本,每行结尾使用回车和换行，CRLF标识回车换行

**HTTP 三点注意事项：**

- HTTP 是无连接：无连接的含义是限制每次连接只处理一个请求，服务器处理完客户的请求，并收到客户的应答后，即断开连接，采用这种方式可以节省传输时间。
- HTTP 是媒体独立的：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送，客户端以及服务器指定使用适合的 MIME-type 内容类型。
- HTTP 是无状态：HTTP 协议是无状态协议，无状态是指协议对于事务处理没有记忆能力，缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大，另一方面，在服务器不需要先前信息时它的应答就较快。

| 请求方法 | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| GET      | 请求获取URI所标识的资源（指定的页面信息），并返回实体主体。  |
| POST     | 请求服务器接受所指定的文档作为对所标识的URI的新的从属实体    |
| HEAD     | 请求获取由URI所标识的的资源的响应头信息，只请求页面的首部    |
| PUT      | 从客户端向服务器传送的数据取代指定的文档的内容               |
| DELETE   | 请求服务器删除URI所表示的资源                                |
| TRACE    | 请求服务器在响应中的实体主体部分返回所得到的内容，用于测试或诊断 |
| PATCH    | 实体中包含一个表，表中说明与该URI所表示的原内容的区别        |
| MOVE     | 请求服务器将指定的页面移至另一个网络地址                     |
| COPY     | 请求服务器将指定的页面拷贝至另一个网络地址                   |
| LINK     | 请求服务器建立链接关系                                       |
| UNLINK   | 断开链接关系                                                 |
| WRAPPED  | 允许客户端发送经过封装的请求                                 |
| CONNECT  |                                                              |
| OPTIONS  | 允许客户端查看服务器的性能                                   |

## 2. 请求报头Request

| Header              | 解释                                                         | 示例                                                    |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| Accept              | 指定客户端能够接收的内容类型                                 | Accept: text/plain, text/html                           |
| Accept-Charset      | 浏览器可以接受的字符编码集。                                 | Accept-Charset: iso-8859-5                              |
| Accept-Encoding     | 指定浏览器可以支持的web服务器返回内容压缩编码类型。          | Accept-Encoding: compress, gzip                         |
| Accept-Language     | 浏览器可接受的语言                                           | Accept-Language: en,zh                                  |
| Accept-Ranges       | 可以请求网页实体的一个或者多个子范围字段                     | Accept-Ranges: bytes                                    |
| Authorization       | HTTP授权的授权证书                                           | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==       |
| Cache-Control       | 指定请求和响应遵循的缓存机制                                 | Cache-Control: no-cache                                 |
| Connection          | 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）           | Connection: close                                       |
| Cookie              | HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。 | Cookie: $Version=1; Skin=new;                           |
| Content-Length      | 请求的内容长度                                               | Content-Length: 348                                     |
| Content-Type        | 请求的与实体对应的MIME信息                                   | Content-Type: application/x-www-form-urlencoded         |
| Date                | 请求发送的日期和时间                                         | Date: Tue, 15 Nov 2010 08:12:31 GMT                     |
| Expect              | 请求的特定的服务器行为                                       | Expect: 100-continue                                    |
| From                | 发出请求的用户的Email                                        | From: [user@email.com](mailto:user@email.com)           |
| Host                | 指定请求的服务器的域名和端口号                               | Host: [www.zcmhi.com](https://www.zcmhi.com)            |
| Origin              | 用来说明请求从哪里发起的，包括且仅仅包括协议和域名。这个参数一般只存在于CORS跨域请求中，可以看到response有对应的header：Access-Control-Allow-Origin | header：Access-Control-Allow-Origin                     |
| If-Match            | 只有请求内容与实体相匹配才有效                               | If-Match: “737060cd8c284d8af7ad3082f209582d”            |
| If-Modified-Since   | 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码 | If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT        |
| If-None-Match       | 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变 | If-None-Match: “737060cd8c284d8af7ad3082f209582d”       |
| If-Range            | 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag | If-Range: “737060cd8c284d8af7ad3082f209582d”            |
| If-Unmodified-Since | 只在实体在指定时间之后未被修改才请求成功                     | If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT      |
| Max-Forwards        | 限制信息通过代理和网关传送的时间                             | Max-Forwards: 10                                        |
| Pragma              | 用来包含实现特定的指令                                       | Pragma: no-cache                                        |
| Proxy-Authorization | 连接到代理的授权证书                                         | Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ== |
| Range               | 只请求实体的一部分，指定范围                                 | Range: bytes=500-999                                    |
| Referer             | 先前网页的地址，当前请求网页紧随其后,即来路                  | Referer: http://www.zcmhi.com/archives/71.html          |
| Upgrade             | 向服务器指定某种传输协议以便服务器进行转换（如果支持）       | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11          |
| User-Agent          | User-Agent的内容包含发出请求的用户信息                       | User-Agent: Mozilla/5.0 (Linux; X11)                    |
| Via                 | 通知中间网关或代理服务器地址，通信协议                       | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)             |
| Warning             | 关于消息实体的警告信息                                       | Warn: 199 Miscellaneous warning                         |

## 3. 响应报头Response

| Header              | 解释                                                         | 示例                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Accept-Ranges       | 表明服务器是否支持指定范围请求及哪种类型的分段请求           | Accept-Ranges: bytes                                         |
| Age                 | 从原始服务器到代理缓存形成的估算时间（以秒计，非负）         | Age: 12                                                      |
| Allow               | 对某网络资源的有效的请求行为，不允许则返回405                | Allow: GET, HEAD                                             |
| Cache-Control       | 告诉所有的缓存机制是否可以缓存及哪种类型                     | Cache-Control: no-cache                                      |
| Content-Encoding    | web服务器支持的返回内容压缩编码类型。                        | Content-Encoding: gzip                                       |
| Content-Language    | 响应体的语言                                                 | Content-Language: en,zh                                      |
| Content-Length      | 响应体的长度                                                 | Content-Length: 348                                          |
| Content-Location    | 请求资源可替代的备用的另一地址                               | Content-Location: /index.htm                                 |
| Content-MD5         | 返回资源的MD5校验值                                          | Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==                        |
| Content-Range       | 在整个返回体中本部分的字节位置                               | Content-Range: bytes 21010-47021/47022                       |
| Content-Type        | 返回内容的MIME类型                                           | Content-Type: text/html; charset=utf-8                       |
| Content-Disposition | 服务器通过这个头，告诉浏览器以下载的方式打开数据。           | Content-Disposition: inline Content-Disposition: attachment Content-Disposition: attachment; filename="filename.jpg" |
| Date                | 原始服务器消息发出的时间                                     | Date: Tue, 15 Nov 2010 08:12:31 GMT                          |
| ETag                | 请求变量的实体标签的当前值                                   | ETag: “737060cd8c284d8af7ad3082f209582d”                     |
| Expires             | 响应过期的日期和时间                                         | Expires: Thu, 01 Dec 2010 16:00:00 GMT                       |
| Last-Modified       | 请求资源的最后修改时间                                       | Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT                 |
| Location            | 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源    | Location: http://www.zcmhi.com/archives/94.html              |
| Pragma              | 包括实现特定的指令，它可应用到响应链上的任何接收方           | Pragma: no-cache                                             |
| Proxy-Authenticate  | 它指出认证方案和可应用到代理的该URL上的参数                  | Proxy-Authenticate: Basic                                    |
| refresh             | 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持） | Refresh: 5; url=http://www.zcmhi.com/archives/94.html        |
| Retry-After         | 如果实体暂时不可取，通知客户端在指定时间之后再次尝试         | Retry-After: 120                                             |
| Server              | web服务器软件名称                                            | Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)                 |
| Set-Cookie          | 设置Http Cookie                                              | Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1          |
| Trailer             | 指出头域在分块传输编码的尾部存在                             | Trailer: Max-Forwards                                        |
| Transfer-Encoding   | 文件传输编码                                                 | Transfer-Encoding:chunked                                    |
| Vary                | 告诉下游代理是使用缓存响应还是从原始服务器请求               | Vary: *                                                      |
| Via                 | 告知代理客户端响应是通过哪里发送的                           | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)                  |
| Warning             | 警告实体可能存在的问题                                       | Warning: 199 Miscellaneous warning                           |
| WWW-Authenticate    | 表明客户端请求实体应该使用的授权方案                         | WWW-Authenticate: Basic                                      |

## 4. Content-Type

MediaType即是Internet Media Type，互联网媒体类型；也叫做MIME类型，在Http协议消息头中，使用Content-Type来表示具体请求中的媒体类型信息。

在HTTP协议消息头中，使用Content-Type来表示媒体类型信息。它被用来告诉服务端如何处理请求的数据，以及告诉客户端（一般是浏览器）如何解析响应的数据，比如显示图片，解析html或仅仅展示一个文本等。

Post请求的内容放置在请求体中，**Content-Type**定义了请求体的编码格式。数据发送出去后，还需要接收端解析才可以。接收端依靠请求头中的**Content-Type**字段来获知请求体的编码格式，最后再进行解析。

### 4.1 常见的媒体格式类型

- text/html：HTML格式
- text/plain：纯文本格式
- text/xml：XML格式
- image/gif：gif图片格式
- image/jpeg：jpg图片格式
- image/png：png图片格式

以application开头的媒体格式类型：

- application/xhtml+xml：XHTML格式
- application/xml：XML数据格式
- application/atom+xml：Atom XML聚合格式
- application/json：JSON数据格式
- application/pdf：pdf格式
- application/msword：Word文档格式
- application/octet-stream：二进制流数据（常见的文件下载)
- application/x-www-form-urlencoded：表单中默认的encType,表单数据被编码为key/value格式发送到服务器

另外一种常见的媒体格式是上传文件时使用：

- multipart/form-data：需要在表单中进行文件上传时，就需要使用该格式

### 4.2 Spring MVC中关于Content-Type类型的使用

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
@Reflective({ControllerMappingReflectiveProcessor.class})
public @interface RequestMapping {
    //指定请求的实际地址， 比如 /action/info之类
    String name() default "";

    @AliasFor("path")
    String[] value() default {};

    @AliasFor("value")
    String[] path() default {};
    
	// 指定请求的method类型， GET、POST、PUT、DELETE等
    RequestMethod[] method() default {};
    
    //指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;
    String[] params() default {};

    //指定request中必须包含某些指定的header值，才能让该方法处理请求
    String[] headers() default {};

    //指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;
    String[] consumes() default {};

    //指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    String[] produces() default {};
}
```



### 4.3 Content-Type参照表

| 文件扩展名 | Content-Type(Mime-Type)                           | 文件扩展名 | Content-Type(Mime-Type)             |
| ---------- | ------------------------------------------------- | ---------- | ----------------------------------- |
| .*         | application/octet-stream 二进制流，不知道文件类型 | .tif       | image/tiff                          |
| .001       | application/x-001                                 | .301       | application/x-301                   |
| .323       | text/h323                                         | .906       | application/x-906                   |
| .907       | drawing/907                                       | .a11       | application/x-a11                   |
| .acp       | audio/x-mei-aac                                   | .ai        | application/postscript              |
| .aif       | audio/aiff                                        | .aifc      | audio/aiff                          |
| .aiff      | audio/aiff                                        | .anv       | application/x-anv                   |
| .asa       | text/asa                                          | .asf       | video/x-ms-asf                      |
| .asp       | text/asp                                          | .asx       | video/x-ms-asf                      |
| .au        | audio/basic                                       | .avi       | video/avi                           |
| .awf       | application/vnd.adobe.workflow                    | .biz       | text/xml                            |
| .bmp       | application/x-bmp                                 | .bot       | application/x-bot                   |
| .c4t       | application/x-c4t                                 | .c90       | application/x-c90                   |
| .cal       | application/x-cals                                | .cat       | application/vnd.ms-pki.seccat       |
| .cdf       | application/x-netcdf                              | .cdr       | application/x-cdr                   |
| .cel       | application/x-cel                                 | .cer       | application/x-x509-ca-cert          |
| .cg4       | application/x-g4                                  | .cgm       | application/x-cgm                   |
| .cit       | application/x-cit                                 | .class     | java/*                              |
| .cml       | text/xml                                          | .cmp       | application/x-cmp                   |
| .cmx       | application/x-cmx                                 | .cot       | application/x-cot                   |
| .crl       | application/pkix-crl                              | .crt       | application/x-x509-ca-cert          |
| .csi       | application/x-csi                                 | .css       | text/css                            |
| .cut       | application/x-cut                                 | .dbf       | application/x-dbf                   |
| .dbm       | application/x-dbm                                 | .dbx       | application/x-dbx                   |
| .dcd       | text/xml                                          | .dcx       | application/x-dcx                   |
| .der       | application/x-x509-ca-cert                        | .dgn       | application/x-dgn                   |
| .dib       | application/x-dib                                 | .dll       | application/x-msdownload            |
| .doc       | application/msword                                | .dot       | application/msword                  |
| .drw       | application/x-drw                                 | .dtd       | text/xml                            |
| .dwf       | Model/vnd.dwf                                     | .dwf       | application/x-dwf                   |
| .dwg       | application/x-dwg                                 | .dxb       | application/x-dxb                   |
| .dxf       | application/x-dxf                                 | .edn       | application/vnd.adobe.edn           |
| .emf       | application/x-emf                                 | .eml       | message/rfc822                      |
| .ent       | text/xml                                          | .epi       | application/x-epi                   |
| .eps       | application/x-ps                                  | .eps       | application/postscript              |
| .etd       | application/x-ebx                                 | .exe       | application/x-msdownload            |
| .fax       | image/fax                                         | .fdf       | application/vnd.fdf                 |
| .fif       | application/fractals                              | .fo        | text/xml                            |
| .frm       | application/x-frm                                 | .g4        | application/x-g4                    |
| .gbr       | application/x-gbr                                 | .          | application/x-                      |
| .gif       | image/gif                                         | .gl2       | application/x-gl2                   |
| .gp4       | application/x-gp4                                 | .hgl       | application/x-hgl                   |
| .hmr       | application/x-hmr                                 | .hpg       | application/x-hpgl                  |
| .hpl       | application/x-hpl                                 | .hqx       | application/mac-binhex40            |
| .hrf       | application/x-hrf                                 | .hta       | application/hta                     |
| .htc       | text/x-component                                  | .htm       | text/html                           |
| .html      | text/html                                         | .htt       | text/webviewhtml                    |
| .htx       | text/html                                         | .icb       | application/x-icb                   |
| .ico       | image/x-icon                                      | .ico       | application/x-ico                   |
| .iff       | application/x-iff                                 | .ig4       | application/x-g4                    |
| .igs       | application/x-igs                                 | .iii       | application/x-iphone                |
| .img       | application/x-img                                 | .ins       | application/x-internet-signup       |
| .isp       | application/x-internet-signup                     | .IVF       | video/x-ivf                         |
| .java      | java/*                                            | .jfif      | image/jpeg                          |
| .jpe       | image/jpeg                                        | .jpe       | application/x-jpe                   |
| .jpeg      | image/jpeg                                        | .jpg       | image/jpeg                          |
| .jpg       | application/x-jpg                                 | .js        | application/x-javascript            |
| .jsp       | text/html                                         | .la1       | audio/x-liquid-file                 |
| .lar       | application/x-laplayer-reg                        | .latex     | application/x-latex                 |
| .lavs      | audio/x-liquid-secure                             | .lbm       | application/x-lbm                   |
| .lmsff     | audio/x-la-lms                                    | .ls        | application/x-javascript            |
| .ltr       | application/x-ltr                                 | .m1v       | video/x-mpeg                        |
| .m2v       | video/x-mpeg                                      | .m3u       | audio/mpegurl                       |
| .m4e       | video/mpeg4                                       | .mac       | application/x-mac                   |
| .man       | application/x-troff-man                           | .math      | text/xml                            |
| .mdb       | application/msaccess                              | .mdb       | application/x-mdb                   |
| .mfp       | application/x-shockwave-flash                     | .mht       | message/rfc822                      |
| .mhtml     | message/rfc822                                    | .mi        | application/x-mi                    |
| .mid       | audio/mid                                         | .midi      | audio/mid                           |
| .mil       | application/x-mil                                 | .mml       | text/xml                            |
| .mnd       | audio/x-musicnet-download                         | .mns       | audio/x-musicnet-stream             |
| .mocha     | application/x-javascript                          | .movie     | video/x-sgi-movie                   |
| .mp1       | audio/mp1                                         | .mp2       | audio/mp2                           |
| .mp2v      | video/mpeg                                        | .mp3       | audio/mp3                           |
| .mp4       | video/mpeg4                                       | .mpa       | video/x-mpg                         |
| .mpd       | application/vnd.ms-project                        | .mpe       | video/x-mpeg                        |
| .mpeg      | video/mpg                                         | .mpg       | video/mpg                           |
| .mpga      | audio/rn-mpeg                                     | .mpp       | application/vnd.ms-project          |
| .mps       | video/x-mpeg                                      | .mpt       | application/vnd.ms-project          |
| .mpv       | video/mpg                                         | .mpv2      | video/mpeg                          |
| .mpw       | application/vnd.ms-project                        | .mpx       | application/vnd.ms-project          |
| .mtx       | text/xml                                          | .mxp       | application/x-mmxp                  |
| .net       | image/pnetvue                                     | .nrf       | application/x-nrf                   |
| .nws       | message/rfc822                                    | .odc       | text/x-ms-odc                       |
| .out       | application/x-out                                 | .p10       | application/pkcs10                  |
| .p12       | application/x-pkcs12                              | .p7b       | application/x-pkcs7-certificates    |
| .p7c       | application/pkcs7-mime                            | .p7m       | application/pkcs7-mime              |
| .p7r       | application/x-pkcs7-certreqresp                   | .p7s       | application/pkcs7-signature         |
| .pc5       | application/x-pc5                                 | .pci       | application/x-pci                   |
| .pcl       | application/x-pcl                                 | .pcx       | application/x-pcx                   |
| .pdf       | application/pdf                                   | .pdf       | application/pdf                     |
| .pdx       | application/vnd.adobe.pdx                         | .pfx       | application/x-pkcs12                |
| .pgl       | application/x-pgl                                 | .pic       | application/x-pic                   |
| .pko       | application/vnd.ms-pki.pko                        | .pl        | application/x-perl                  |
| .plg       | text/html                                         | .pls       | audio/scpls                         |
| .plt       | application/x-plt                                 | .png       | image/png                           |
| .png       | application/x-png                                 | .pot       | application/vnd.ms-powerpoint       |
| .ppa       | application/vnd.ms-powerpoint                     | .ppm       | application/x-ppm                   |
| .pps       | application/vnd.ms-powerpoint                     | .ppt       | application/vnd.ms-powerpoint       |
| .ppt       | application/x-ppt                                 | .pr        | application/x-pr                    |
| .prf       | application/pics-rules                            | .prn       | application/x-prn                   |
| .prt       | application/x-prt                                 | .ps        | application/x-ps                    |
| .ps        | application/postscript                            | .ptn       | application/x-ptn                   |
| .pwz       | application/vnd.ms-powerpoint                     | .r3t       | text/vnd.rn-realtext3d              |
| .ra        | audio/vnd.rn-realaudio                            | .ram       | audio/x-pn-realaudio                |
| .ras       | application/x-ras                                 | .rat       | application/rat-file                |
| .rdf       | text/xml                                          | .rec       | application/vnd.rn-recording        |
| .red       | application/x-red                                 | .rgb       | application/x-rgb                   |
| .rjs       | application/vnd.rn-realsystem-rjs                 | .rjt       | application/vnd.rn-realsystem-rjt   |
| .rlc       | application/x-rlc                                 | .rle       | application/x-rle                   |
| .rm        | application/vnd.rn-realmedia                      | .rmf       | application/vnd.adobe.rmf           |
| .rmi       | audio/mid                                         | .rmj       | application/vnd.rn-realsystem-rmj   |
| .rmm       | audio/x-pn-realaudio                              | .rmp       | application/vnd.rn-rn_music_package |
| .rms       | application/vnd.rn-realmedia-secure               | .rmvb      | application/vnd.rn-realmedia-vbr    |
| .rmx       | application/vnd.rn-realsystem-rmx                 | .rnx       | application/vnd.rn-realplayer       |
| .rp        | image/vnd.rn-realpix                              | .rpm       | audio/x-pn-realaudio-plugin         |
| .rsml      | application/vnd.rn-rsml                           | .rt        | text/vnd.rn-realtext                |
| .rtf       | application/msword                                | .rtf       | application/x-rtf                   |
| .rv        | video/vnd.rn-realvideo                            | .sam       | application/x-sam                   |
| .sat       | application/x-sat                                 | .sdp       | application/sdp                     |
| .sdw       | application/x-sdw                                 | .sit       | application/x-stuffit               |
| .slb       | application/x-slb                                 | .sld       | application/x-sld                   |
| .slk       | drawing/x-slk                                     | .smi       | application/smil                    |
| .smil      | application/smil                                  | .smk       | application/x-smk                   |
| .snd       | audio/basic                                       | .sol       | text/plain                          |
| .sor       | text/plain                                        | .spc       | application/x-pkcs7-certificates    |
| .spl       | application/futuresplash                          | .spp       | text/xml                            |
| .ssm       | application/streamingmedia                        | .sst       | application/vnd.ms-pki.certstore    |
| .stl       | application/vnd.ms-pki.stl                        | .stm       | text/html                           |
| .sty       | application/x-sty                                 | .svg       | text/xml                            |
| .swf       | application/x-shockwave-flash                     | .tdf       | application/x-tdf                   |
| .tg4       | application/x-tg4                                 | .tga       | application/x-tga                   |
| .tif       | image/tiff                                        | .tif       | application/x-tif                   |
| .tiff      | image/tiff                                        | .tld       | text/xml                            |
| .top       | drawing/x-top                                     | .torrent   | application/x-bittorrent            |
| .tsd       | text/xml                                          | .txt       | text/plain                          |
| .uin       | application/x-icq                                 | .uls       | text/iuls                           |
| .vcf       | text/x-vcard                                      | .vda       | application/x-vda                   |
| .vdx       | application/vnd.visio                             | .vml       | text/xml                            |
| .vpg       | application/x-vpeg005                             | .vsd       | application/vnd.visio               |
| .vsd       | application/x-vsd                                 | .vss       | application/vnd.visio               |
| .vst       | application/vnd.visio                             | .vst       | application/x-vst                   |
| .vsw       | application/vnd.visio                             | .vsx       | application/vnd.visio               |
| .vtx       | application/vnd.visio                             | .vxml      | text/xml                            |
| .wav       | audio/wav                                         | .wax       | audio/x-ms-wax                      |
| .wb1       | application/x-wb1                                 | .wb2       | application/x-wb2                   |
| .wb3       | application/x-wb3                                 | .wbmp      | image/vnd.wap.wbmp                  |
| .wiz       | application/msword                                | .wk3       | application/x-wk3                   |
| .wk4       | application/x-wk4                                 | .wkq       | application/x-wkq                   |
| .wks       | application/x-wks                                 | .wm        | video/x-ms-wm                       |
| .wma       | audio/x-ms-wma                                    | .wmd       | application/x-ms-wmd                |
| .wmf       | application/x-wmf                                 | .wml       | text/vnd.wap.wml                    |
| .wmv       | video/x-ms-wmv                                    | .wmx       | video/x-ms-wmx                      |
| .wmz       | application/x-ms-wmz                              | .wp6       | application/x-wp6                   |
| .wpd       | application/x-wpd                                 | .wpg       | application/x-wpg                   |
| .wpl       | application/vnd.ms-wpl                            | .wq1       | application/x-wq1                   |
| .wr1       | application/x-wr1                                 | .wri       | application/x-wri                   |
| .wrk       | application/x-wrk                                 | .ws        | application/x-ws                    |
| .ws2       | application/x-ws                                  | .wsc       | text/scriptlet                      |
| .wsdl      | text/xml                                          | .wvx       | video/x-ms-wvx                      |
| .xdp       | application/vnd.adobe.xdp                         | .xdr       | text/xml                            |
| .xfd       | application/vnd.adobe.xfd                         | .xfdf      | application/vnd.adobe.xfdf          |
| .xhtml     | text/html                                         | .xls       | application/vnd.ms-excel            |
| .xls       | application/x-xls                                 | .xlw       | application/x-xlw                   |
| .xml       | text/xml                                          | .xpl       | audio/scpls                         |
| .xq        | text/xml                                          | .xql       | text/xml                            |
| .xquery    | text/xml                                          | .xsd       | text/xml                            |
| .xsl       | text/xml                                          | .xslt      | text/xml                            |
| .xwd       | application/x-xwd                                 | .x_b       | application/x-x_b                   |
| .sis       | application/vnd.symbian.install                   | .sisx      | application/vnd.symbian.install     |
| .x_t       | application/x-x_t                                 | .ipa       | application/vnd.iphone              |
| .apk       | application/vnd.android.package-archive           | .xap       | application/x-silverlight-app       |

## 5. 响应头Content-disposition

使用：response.setHeader("Content-disposition", "attachment;filename=" +filename);

- **attachment**:表示以附件方式下载
- **inline**：在页面中打开

注意:filename如果是中文会出现乱码：解决办法：

1、将filename 替换为 new String(filename.getBytes(), "ISO8859-1");

2、将filename 替换为 URLEncoder.encode(filename, "utf-8");
