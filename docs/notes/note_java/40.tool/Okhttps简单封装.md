---
title: Okhttps简单封装
tags:
  - Java
createTime: 2023/01/15
permalink: /note_java/tuuncv26/
---



> 简单的封装了下okhttp，提供常用方法

# 0. Okhttp工具类

```java
package com.example.testjar.okhttp;

import cn.hutool.extra.spring.SpringUtil;
import com.example.testjar.interceptor.NetworkInterceptor;
import okhttp3.*;
import org.springframework.util.CollectionUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * <p>OkHttps简单封装</p>
 *
 * @author : y
 * @date : 2022-12-06 22:16
 */
public class OkHttps {

    private static final String GET = "GET";
    private static final String POST = "POST";
    private static final String PUT = "PUT";
    private static final String DELETE = "DELETE";

    private OkHttpClient client = SpringUtil.getBean(OkHttpClient.class);

    public OkHttpClient client2 = new OkHttpClient.Builder()
            .retryOnConnectionFailure(false)
            .connectionPool(new ConnectionPool(50, 180, TimeUnit.SECONDS))
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(10, TimeUnit.SECONDS)
            .writeTimeout(10, TimeUnit.SECONDS)
            .hostnameVerifier((hostname, session) -> true)
            // 拦截器
//                .addInterceptor(new RetryInterceptor(3))
            //网络拦截器，统一打印日志
            .addNetworkInterceptor(new NetworkInterceptor())
            .build();

    private String url;

    private Map<String, String> headerMap;

    private Map<String, String> paramMap;

    private HashMap<String, byte[]> fileParamMap;

    public OkHttps(String url) {
        this.url = url;
    }

    /**
     * 设置请求地址
     */
    public static OkHttps url(String url) {
        return new OkHttps(url);
    }

    /**
     * 发送get请求
     */
    public String get() {
        return execute(GET, buildUrl(url, paramMap), buildHeader(headerMap), null);
    }

    /**
     * 下载文件
     */
    public byte[] download() {
        return this.executeBytes(GET, buildUrl(url, paramMap), buildHeader(headerMap), null);

    }

    /**
     * 二进制上传文件，一次只能上传一个
     */
    public String uploadBinary() {
        MediaType mediaType = MediaType.parse("application/octet-stream; charset=utf-8");
        if (CollectionUtils.isEmpty(fileParamMap)) {
            throw new RuntimeException("上传文件不能为空！");
        }
        String fileName = new ArrayList<>(fileParamMap.keySet()).get(0);
        byte[] fileBytes = fileParamMap.get(fileName);
        if (CollectionUtils.isEmpty(headerMap)) {
            headerMap = new HashMap<>(1);
        }
        //将文件名塞到请求头里
        headerMap.put("content-disposition", fileName);
        return this.execute(POST, buildUrl(url, null), buildHeader(headerMap), RequestBody.create(mediaType, fileBytes));
    }

    /**
     * 上传文件（multipart/form-data格式）
     * 不仅可以支持传文件，还可以在传文件的同时, 传参数，但是不常用
     *
     * @param field 接收字段名称
     * @return 文件地址
     */
    public String upload(String field) {
        if (CollectionUtils.isEmpty(fileParamMap)) {
            throw new RuntimeException("上传文件不能为空！");
        }
        //处理请求体
        MultipartBody.Builder bodyBuilder = new MultipartBody.Builder().setType(MultipartBody.FORM);
//                .addFormDataPart("v1", "参数1")
//                .addFormDataPart("files", "fileName111", RequestBody.create(MultipartBody.FORM, bytes))
//                .addFormDataPart("files", "fileName111", RequestBody.create(MultipartBody.FORM, bytes));
        fileParamMap.forEach((fileName, fileBytes) -> {
            bodyBuilder.addFormDataPart(field, fileName, RequestBody.create(MultipartBody.FORM, fileBytes));
        });
        if (!CollectionUtils.isEmpty(paramMap)) {
            paramMap.forEach(bodyBuilder::addFormDataPart);
        }
        return this.execute(POST, buildUrl(url, null), buildHeader(headerMap), bodyBuilder.build());
    }

    /**
     * 发送post请求（application/x-www-form-urlencoded格式）
     *
     * @return 返回值字符串
     */
    public String post() {
        FormBody.Builder bodyBuilder = new FormBody.Builder(StandardCharsets.UTF_8);
        if (!CollectionUtils.isEmpty(paramMap)) {
            paramMap.forEach(bodyBuilder::add);
        }
        return this.execute(POST, buildUrl(url, null), buildHeader(headerMap), bodyBuilder.build());
    }

    /**
     * 发送post请求（application/json格式）
     *
     * @param jsonParam json格式参数
     * @return 返回值字符串
     */
    public String postJson(String jsonParam) {
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        return this.execute(POST, buildUrl(url, null), buildHeader(headerMap), RequestBody.create(mediaType, jsonParam));
    }

    /**
     * 发送put请求（application/json格式）
     *
     * @param jsonParam json参数
     * @return 返回值字符串
     */
    public String putJson(String jsonParam) {
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        return this.execute(PUT, buildUrl(url, null), buildHeader(headerMap), RequestBody.create(mediaType, jsonParam));
    }

    /**
     * 发送delete请求
     *
     * @return 返回值字符串
     */
    public String delete() {
        return this.execute(DELETE, buildUrl(url, paramMap), buildHeader(headerMap), null);
    }

    /*****************************止步*********************************/

    private String execute(String method, HttpUrl httpUrl, Headers headers, RequestBody requestBody) {
        try (Response response = client.newCall(buildRequest(method, httpUrl, headers, requestBody)).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("请求失败：" + response);
            }
            return Objects.requireNonNull(response.body()).string();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("execute()执行失败, url=" + httpUrl);
        }
    }

    private byte[] executeBytes(String method, HttpUrl httpUrl, Headers headers, RequestBody requestBody) {
        try (Response response = client.newCall(buildRequest(method, httpUrl, headers, requestBody)).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("请求失败：" + response);
            }
            return Objects.requireNonNull(response.body()).bytes();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("executeBytes()执行失败, url=" + httpUrl);
        }
    }

    /**
     * 构建请求实体类
     *
     * @param method      {@link OkHttps#GET},{@link OkHttps#POST},{@link OkHttps#PUT},{@link OkHttps#DELETE}
     * @param httpUrl     请求地址
     * @param headers     请求头
     * @param requestBody 请求体
     * @return 请求类
     */
    private static Request buildRequest(String method, HttpUrl httpUrl, Headers headers, RequestBody requestBody) {
        Request.Builder requestBuilder = new Request.Builder().url(httpUrl);
        if (headers != null) {
            requestBuilder.headers(headers);
        }
        switch (method) {
            case GET:
                requestBuilder.get();
                break;
            case POST:
                if (requestBody == null) {
                    throw new RuntimeException("post请求体不能为空！");
                }
                requestBuilder.post(requestBody);
                break;
            case PUT:
                if (requestBody == null) {
                    throw new RuntimeException("put请求体不能为空！");
                }
                requestBuilder.put(requestBody);
                break;
            case DELETE:
                if (requestBody == null) {
                    requestBuilder.delete();
                } else {
                    requestBuilder.delete(requestBody);
                }
                break;
            default:
                break;
        }
        return requestBuilder.build();
    }


    /**
     * 处理请求头
     */
    private static Headers buildHeader(Map<String, String> headerMap) {
        Headers.Builder headersBuilder = new Headers.Builder();
        if (!CollectionUtils.isEmpty(headerMap)) {
            headerMap.forEach((k, v) -> {
                headersBuilder.add(k, String.valueOf(v));
            });
        }
        return headersBuilder.build();
    }

    /**
     * 处理get请求连接
     */
    private static HttpUrl buildUrl(String url, Map<String, String> paramMap) {
        HttpUrl.Builder urlBuilder = HttpUrl.get(url).newBuilder();
        if (!CollectionUtils.isEmpty(paramMap)) {
            paramMap.forEach((k, v) -> {
                urlBuilder.addEncodedQueryParameter(k, String.valueOf(v));
            });
        }
        return urlBuilder.build();
    }

    /**
     * 添加请求头
     */
    public OkHttps addHeader(String name, String value) {
        if (headerMap == null) {
            headerMap = new LinkedHashMap<>(16);
        }
        headerMap.put(name, value);
        return this;
    }

    /**
     * 添加请求参数
     */
    public OkHttps addParam(String name, String value) {
        if (paramMap == null) {
            paramMap = new LinkedHashMap<>(16);
        }
        paramMap.put(name, value);
        return this;
    }

    /**
     * 添加文件参数
     */
    public OkHttps addFileParam(String name, byte[] value) {
        if (fileParamMap == null) {
            fileParamMap = new LinkedHashMap<>(16);
        }
        fileParamMap.put(name, value);
        return this;
    }

}
```





# 1. OkHttpConfig

```java
package com.example.testjar.okhttp;

import okhttp3.ConnectionPool;
import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

@Configuration
public class OkHttpConfig {

    /**
     * 连接超时时间
     */
    @Value("${okhttp.connect-timeout:10}")
    private Integer connectTimeout;

    /**
     * 读取超时时间
     */
    @Value("${okhttp.read-timeout:10}")
    private Integer readTimeout;

    /**
     * 写入超时时间
     */
    @Value("${okhttp.write-timeout:10}")
    private Integer writeTimeout;

    /**
     * 最大空闲连接池数据量
     */
    @Value("${okhttp.max-idle-connections:10}")
    private Integer maxIdleConnections;

    /**
     * 连接存活时间
     */
    @Value("${okhttp.keep-alive-duration:300}")
    private Long keepAliveDuration;

    @Bean
    @SuppressWarnings("all")
    public OkHttpClient okHttpClient() {
        return new OkHttpClient.Builder()
                // 信任所有的链接，包括自己生成的SSL证书
                .sslSocketFactory(sslSocketFactory(), x509TrustManager())
                .hostnameVerifier((hostname, session) -> true)
                // 重试
                .retryOnConnectionFailure(false)
                // 连接池
                .connectionPool(new ConnectionPool(maxIdleConnections, keepAliveDuration, TimeUnit.SECONDS))
                // 连接超时
                .connectTimeout(connectTimeout, TimeUnit.SECONDS)
                // 读取超时
                .readTimeout(readTimeout, TimeUnit.SECONDS)
                // 写入超时
                .writeTimeout(writeTimeout, TimeUnit.SECONDS)
                // 设置代理
//            	.proxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 8888)))
                // 拦截器
//                .addInterceptor(new RetryInterceptor(3))
//                //网络拦截器，统一打印日志
//                .addNetworkInterceptor(new NetworkInterceptor())
                .build();
    }

    /**
     * 不需要任何配置就可以支持 SSL（HTTPS）,前提是服务器配置的 SSL 证书是值得信任并且有效的<p>
     * <p>
     * 如果服务器的 SSL 证书不是在权威机构购买而是自己生成的（不推荐这种做法），则需要配置sslSocketFactory和hostnameVerifier
     * 让 OkHttps 信任所有链接，需要配置sslSocketFactory、TrustManager和hostnameVerifier<p>
     */
    public SSLSocketFactory sslSocketFactory() {
        try {
            //1.X509TrustManager
            //2.SSLContext
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[]{x509TrustManager()}, new SecureRandom());
            //3.SSLSocketFactory
            return sslContext.getSocketFactory();
        } catch (NoSuchAlgorithmException | KeyManagementException e) {
            e.printStackTrace();
        }
        return null;
    }

    public X509TrustManager x509TrustManager() {
        return new X509TrustManager() {
            @Override
            public void checkClientTrusted(X509Certificate[] chain, String authType) {
            }
            @Override
            public void checkServerTrusted(X509Certificate[] chain, String authType) {
            }
            @Override
            public X509Certificate[] getAcceptedIssuers() {
                return new X509Certificate[0];
            }
        };
    }

}
```



# 2. NetworkInterceptor

```java
package com.example.testjar.interceptor;

import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import okio.Buffer;
import org.springframework.util.ObjectUtils;

import java.io.IOException;

/**
 * <p>网络拦截器:打印请求信息和返回信息</p>
 *
 * @author : y
 * @date : 2022-11-28 01:03
 */

/**
 * Response只能读取一次：<p>
 * 原因：在实际开发中，响应主体RessponseBody持有的资源可能会很大，所以OkHttp并不会将其直接保存到内存中，只是持有数据流连接。
 * 只有当我们需要时，才会从服务器获取数据并返回。同时，考虑到应用重复读取数据的可能性很小，所以将其设计为一次性流(one-shot)，
 * 读取后即 ‘关闭并释放资源’。
 * <p>
 * 使用这些方式会关闭 Response:<p>
 * Response.close() <br>
 * Response.body().close() <br>
 * Response.body().source().close() <br>
 * Response.body().charStream().close() <br>
 * Response.body().byteString().close()<br>
 * Response.body().bytes()<br>
 * Response.body().string()<br>
 */
@Slf4j
@SuppressWarnings("all")
public class NetworkInterceptor implements Interceptor {

    private static final int BYTE_COUNT = 1 * 1024 * 1024;

    /**
     * 获取请求返回值不能直接使用response.body().string()的方式输出日志,因为response.body().string()之后，response中的流会被关闭
     * 后续返回结果就是空的了，所以这里打日志需要创建出一个新的response用于拦截器使用
     *
     * 方法一：将请求的字节加载到内存中。大多数应用程序应该对byteCount设置适度的限制，限制为1m
     * ResponseBody responseBody = response.peekBody(1024 * 1024 * 5);
     *
     * 方法二：不推荐；从结果克隆一份出来
     * BufferedSource source = response.body().source();
     * source.request(Long.MAX_VALUE);
     * String result = source.getBuffer().clone().readString(StandardCharsets.UTF_8);
     *
     * 方法三：不推荐；重新构建一个Response返回
     * return response.newBuilder().body(ResponseBody.create(responseBodyString, mediaType)).build();
     */
    @Override
    public Response intercept(Chain chain) throws IOException {
        long start = System.currentTimeMillis();
        String url = null;
        String requestMethod = null;
        String mediaType = null;
        String requestBodyStr = null;
        Response response = null;
        String responseBodyStr = null;

        try {
            Request request = chain.request();
            url = request.url().toString();
            requestMethod = request.method();
            RequestBody body = request.body();
            if (!ObjectUtils.isEmpty(body)) {
                mediaType = body.contentType().toString();
                String requestFormat = String.format("请求体大小为【%s】kb，超过：【%s】kb，不予显示。", body.contentLength(), BYTE_COUNT);
                requestBodyStr = body.contentLength() > BYTE_COUNT ? requestFormat : getRequestBody(body);
            }
            response = chain.proceed(request);
            ResponseBody responseBody = response.peekBody(BYTE_COUNT);
            long responseBodyLength = responseBody.contentLength();
            String responseFormat = String.format("响应体大小为【%s】kb，超过：【%s】kb，不予显示。", responseBodyLength, BYTE_COUNT);
            responseBodyStr = responseBodyLength > BYTE_COUNT ? responseFormat : responseBody.string();
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            long end = System.currentTimeMillis();
            String duration = String.valueOf(end - start);
            log.info(ColorLog.yellow(
                    "\nBEGIN【\nRequestUrl：[{}] \nRequestMethod：[{}] \nmediaType：[{}] \nResponseTime：[{}ms]" +
                            "\nRequestBody：[{}]\n】END"),
                    url, requestMethod, mediaType, duration, responseBodyStr
                    );
        }
        return response;
    }

    private String getRequestBody(RequestBody requestBody) {
        String requestBodyStr = "";
        if (requestBody != null) {
            try {
                //1.先写到buffer里
                Buffer buffer = new Buffer();
                requestBody.writeTo(buffer);
                //2.从buffer里面读取最小的那个，超了会报错；
                //requestBody.contentLength()是字节数量；TF-8字符集：汉字占3个字节，英文、数字占1个字节；
                //1 kb = 1024 byte; 1 m = 1024 kb;
                requestBodyStr = buffer.readUtf8(Math.min(BYTE_COUNT, requestBody.contentLength()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return requestBodyStr;
    }
}
```



# 3. RetryInterceptor

```java
package com.example.testjar.okhttp;

import com.example.testjar.interceptor.ColorLog;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

/**
 * <p>description</p>
 *
 * @author : y
 * @date : 2022-12-18 16:42
 */
@Slf4j
public class RetryInterceptor2 implements Interceptor {

    /**
     * 最大重试次数, 默认重试2次，也就是一共请求3次
     */
    public int maxRetry = 2;

    /**
     * 假如设置为3次重试的话，则最大可能请求4次（默认1次+3次重试）
     */
    private int retryNum = 0;

    public RetryInterceptor2(int maxRetry) {
        this.maxRetry = maxRetry;
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        Response response = chain.proceed(request);

        while (!response.isSuccessful() && retryNum < maxRetry) {
            try {
                Thread.sleep(2000L);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            retryNum++;
            log.info(ColorLog.purple("okHttps开始第【"+retryNum+"】次重试, URL="+request.url()));
            response = chain.proceed(request);
        }
        return response;
    }


}
```

