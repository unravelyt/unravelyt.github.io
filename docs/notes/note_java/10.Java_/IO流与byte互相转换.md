---
title: IO流与byte[]互转
tags:
  - Java
createTime: 2024/11/05 16:06:15
permalink: /note_java/xcd49nql/
---


## 0. 写到本地
```java

File file = new File("/data/fe-workbench.tar.gz");
try (FileOutputStream fos = new FileOutputStream(file)) {
    IOUtils.write(in.readAllBytes(), fos);
    System.out.println("Content written to file successfully.");
} catch (IOException e) {
    e.printStackTrace();
}

```

## 1. File转byte[]

```java
//java.nio.file
String filePath = "C:\\Users\\user\\Pictures\\22.jpg";
byte[] bytes = Files.readAllBytes(Paths.get(filePath));
```

## 2. InputStream转byte[]

**方式1：**

```java
String filePath = "C:\\Users\\user\\Pictures\\22.jpg";
FileInputStream inputStream = new FileInputStream(filePath);
byte[] bytes1 = new byte[fileInputStream.available()];
fileInputStream.read(bytes1);
```

**方式2：**

```java
//使用Apache Common中IOUtils.toByteArray()转换
byte[] bytes = IOUtils.toByteArray(inputStream);
```

**方式3：**

```java
String filePath = "C:\\Users\\user\\Pictures\\22.jpg";
FileInputStream fileInputStream = new FileInputStream(filePath);
ByteArrayOutputStream output = new ByteArrayOutputStream();
byte[] bytes = new byte[4096];
int n = 0;
while (-1 != fileInputStream.read(bytes)) {
    output.write(bytes);
}
byte[] bytes2 = output.toByteArray();
```

**方式4：**

```java
//使用Google Guava中ByteStreams.toByteArray()转换
byte[] bytes = ByteStreams.toByteArray(inputStream);
```

**方式5（jdk9）：**

```abap
byte[] bytes = inputStream.readAllBytes()
```

## 3. byte[]转InputStream

```java
byte[] bytes = new byte[1024];
InputStream inputStream = new ByteArrayInputStream(bytes);
```

## 4. byte[]转File

```java
File file = new File("C:\\Users\\user\\Pictures\\22.jpg");
OutputStream output = new FileOutputStream(file);
BufferedOutputStream bufferedOutput = new BufferedOutputStream(output);
bufferedOutput.write(byt);
```

## 5. ByteArrayInputStream使用

```java
byte[] source = ...;
ByteArrayInputStream bis = new ByteArrayInputStream(source);
// read bytes from bis ...

ByteArrayOutputStream bos = new ByteArrayOutputStream();
// write bytes to bos ...
byte[] sink = bos.toByteArray();
```
