---
title: SFTP文件上传工具类
tags:
  - Java
createTime: 2024/05/03
permalink: /code/jpyab1x8/
---


# SFTP文件上传工具类

```java

import cn.hutool.crypto.SecureUtil;
import com.jcraft.jsch.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.ObjectUtils;

import java.io.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Vector;
import java.util.zip.GZIPInputStream;

/**
 * <p>SFTPUtils 文件上传</p>
 *
 * @author : u
 */

@Slf4j
public class SFTPUtil {

    private ChannelSftp sftp;

    private Session session;

    /**
     * SFTP 登录用户名
     */
    private String username;

    /**
     * SFTP 登录密码
     */
    private String password;

    /**
     * 私钥
     */
    private String privateKey;

    /**
     * SFTP 服务器地址IP地址
     */
    private String host;

    /**
     * SFTP 端口
     */
    private int port;


    /**
     * 构造基于密码认证的sftp对象
     */
    public SFTPUtil(String username, String password, String host, int port) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
    }

    /**
     * 构造基于秘钥认证的sftp对象
     */
    public SFTPUtil(String username, String host, int port, String privateKey) {
        this.username = username;
        this.host = host;
        this.port = port;
        this.privateKey = privateKey;
    }

    public SFTPUtil() {
    }


    /**
     * 连接sftp服务器
     */
    public void login() {
        try {
            JSch jsch = new JSch();
            if (privateKey != null) {
                jsch.addIdentity(privateKey);// 设置私钥
            }

            session = jsch.getSession(username, host, port);

            if (password != null) {
                session.setPassword(password);
            }
            Properties config = new Properties();
            config.put("StrictHostKeyChecking", "no");

            session.setConfig(config);
            session.connect();

            Channel channel = session.openChannel("sftp");
            channel.connect();

            sftp = (ChannelSftp) channel;
        } catch (JSchException e) {
            log.error(e.getMessage(), e);
        }
    }

    /**
     * 关闭连接 server
     */
    public void logout() {
        if (sftp != null) {
            if (sftp.isConnected()) {
                sftp.disconnect();
            }
        }
        if (session != null) {
            if (session.isConnected()) {
                session.disconnect();
            }
        }
    }


    /**
     * 将输入流的数据上传到sftp作为文件。文件完整路径=basePath+directory
     *
     * @param basePath     服务器的基础路径
     * @param directory    上传到该目录
     * @param sftpFileName sftp端文件名
     * @param inputStream  输入流
     */
    public void upload(String basePath, String directory, String sftpFileName, InputStream inputStream) throws SftpException {
        try {
            sftp.cd(basePath);
            sftp.cd(directory);
        } catch (SftpException e) {
            //目录不存在，则创建文件夹
            String[] dirs = directory.split("/");
            String tempPath = basePath;
            for (String dir : dirs) {
                if (null == dir || dir.isEmpty()) {
                    continue;
                }
                tempPath += "/" + dir;
                try {
                    sftp.cd(tempPath);
                } catch (SftpException ex) {
                    sftp.mkdir(tempPath);
                    sftp.cd(tempPath);
                }
            }
        }
        sftp.put(inputStream, sftpFileName);  //上传文件
    }


    /**
     * 下载文件。
     *
     * @param directory    下载目录
     * @param downloadFile 下载的文件
     * @param saveFile     存在本地的路径
     */
    public void download(String directory, String downloadFile, String saveFile) throws SftpException, IOException {
        if (directory != null && !directory.isEmpty()) {
            sftp.cd(directory);
        }
        File file = new File(saveFile);
        sftp.get(downloadFile, Files.newOutputStream(file.toPath()));
    }

    /**
     * 下载文件
     *
     * @param directory    下载目录
     * @param downloadFile 下载的文件名
     * @return 字节数组
     */
    public byte[] download(String directory, String downloadFile) {
        try {
            if (directory != null && !directory.isEmpty()) {
                sftp.cd(directory);
            }
            InputStream is = sftp.get(downloadFile);
            return IOUtils.toByteArray(is);
        } catch (Exception e) {
            log.error("从sftp下载文件失败，url = 【{}】，= 【{}】", directory, downloadFile);
            log.error(e.getMessage(), e);
        }
        return null;
    }


    /**
     * 删除文件
     *
     * @param directory  要删除文件所在目录
     * @param deleteFile 要删除的文件
     */
    public void delete(String directory, String deleteFile) throws SftpException {
        sftp.cd(directory);
        sftp.rm(deleteFile);
    }


    /**
     * 列出目录下的文件
     *
     * @param directory 要列出的目录
     */
    public Vector<?> listFiles(String directory) throws SftpException {
        return sftp.ls(directory);
    }

    public static List<String> bufferedReaderGzFile(byte[] fileBytes) {
        List<String> arrayList = new ArrayList<>();
        if (ObjectUtils.isEmpty(fileBytes)) {
            return arrayList;
        }
        try (GZIPInputStream gzipInputStream = new GZIPInputStream(new ByteArrayInputStream(fileBytes));
             BufferedReader reader = new BufferedReader(new InputStreamReader(gzipInputStream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                arrayList.add(line);
            }
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
        log.info("bufferedReaderGzFile.size=【{}】", arrayList.size());
        return arrayList;
    }

    public static String encryptStr(String data) {
        return SecureUtil.aes("sftpscrmsftpscrm".getBytes()).encryptBase64(data);
    }

    public static String decryptStr(String data) {
        return SecureUtil.aes("sftpscrmsftpscrm".getBytes()).decryptStr(data);
    }




    public static void main2(String[] args) throws FileNotFoundException {
        String filePath = "D:\\reportData2024.gz";
        FileInputStream fileInputStream = new FileInputStream(filePath);
//        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(fileInputStream);
        try (GZIPInputStream gzipInputStream = new GZIPInputStream(fileInputStream);
             BufferedReader reader = new BufferedReader(new InputStreamReader(gzipInputStream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }


    //上传文件测试
    public static void main(String[] args) throws SftpException, IOException {
        SFTPUtil sftpUtil = new SFTPUtil("root", "xx", "11.21.32.142", 22);
        sftpUtil.login();

        Vector<?> listFiles = sftpUtil.listFiles("/data");
        for (Object listFile : listFiles) {
            System.out.println(listFile.toString());
        }
        byte[] gzBytes = sftpUtil.download("/data", "reportData2024.gz");
        log.info("gzBytes size = {}", gzBytes.length);


//        byte[] fileBytes = ZipUtil.unGzip(gzBytes);

        List<String> strings = bufferedReaderGzFile(gzBytes);

        for (String string : strings) {
            System.out.println(string);
        }
        sftpUtil.logout();
    }


}
```
