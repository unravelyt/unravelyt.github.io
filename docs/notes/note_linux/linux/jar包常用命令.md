---
title: 运行Jar包并设置jvm参数
createTime: 2024/11/07 14:52:46
permalink: /note_linux/slbprv95
---

## 后台启动jar进程

```shell  :collapsed-lines=20
nohup java -jar -Xms512M -Xmx1024M -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/data/heapdump/xxl_job
xxl-job-admin-2.4.1.jar --server.port=8090 \
--server.servlet.context-path="/job" \ 
--spring.datasource.url="jdbc:mysql://192.168.1.5:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai" \
--spring.datasource.username="root" \
--spring.datasource.password="root" > /dev/null 2>&1 &

```

参数代表的含义：

```text
nohup 后台运行
0 标准输入（一般是键盘）
1 标准输出（一般是显示屏，是用户终端控制台）
2 标准错误（错误信息输出）
/dev/null ：首先表示标准输出重定向到空设备文件，也就是不输出任何信息到终端，说白了就是不显示任何信息。
一般项目中有定义中输出运行日志到指定地址，这样的话，就不需要再单独输出nohup.out文件，这种情况可以考虑使用这种。
```

## 停止jar包进程

```shell  :collapsed-lines=20
#!/bin/bash
# 写死服务名称
app_name=appName
#服务停止
echo "${app_name} 服务停止中。。"

#kill：适用于已知 PID 的单个进程
#pkill：适用于根据名称、命令行参数、用户等条件匹配多个进程 
#pkill -9 -f $app_name

#查找所有包含 gas-custom.jar 的进程，并终止它们
ps -ef | grep $app_name | grep -v grep | awk '{print $2}' | xargs kill

#检查服务是否停止成功
sleep 1
if [[ `ps aux |grep java | grep ${app_name} | grep -v grep | wc -l` -eq 0 ]];then
    echo "$app_name 服务停止成功！"
else
    echo "$app_name 服务停止失败！"
    exit 1
fi
```

## 综合脚本（启动停止状态日志）

```shell :collapsed-lines=20
#!/bin/bash
#这里可替换为你自己的执行程序，其他代码无需更改
APP_NAME=xxl-job-admin-2.4.1.jar
DEPLOY_DIR=/data/app
LOG_PATH=/data/logs/xxl-job/xxl-job.log

#使用说明，用来提示输入参 数
help() {
 echo "help: sh 脚本名.sh [start|stop|restart|status]"
 exit 1
}
 
#检查程序是否在运行
is_exist(){
 pid=`ps -ef | grep $APP_NAME | grep -v grep | awk '{print $2}' `
 #如果不存在返回1，存在返回0 
 if [ -z "${pid}" ]; then
 return 1
 else
 return 0
 fi
}
 
#启动方法
start(){
 is_exist
 if [ $? -eq "0" ]; then
 echo -e "\033[36;1m ${APP_NAME} IS ALREADY RUNNING. PID=${pid} \033[0m"
 else
  nohup java -jar -Xms512M -Xmx1024M $DEPLOY_DIR/$APP_NAME \
  --server.port=8090 --server.servlet.context-path=/job \
  --spring.datasource.username="root" \
  --spring.datasource.url="jdbc:mysql://127.0.0.1:10004/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai" \
  --spring.datasource.password="mysqlyutong95" > /dev/null 2>&1 &
 echo -e "\033[36;1m ${APP_NAME} START SUCCESS ~ \033[0m"
 fi
 log
}

#输出日志
log(){
 is_exist
 if [ $? -eq "0" ]; then
 tail -f -n 20 ${LOG_PATH}
 else
 echo -e "\033[33;1m ${APP_NAME} IS NOT RUNNING. \033[0m"
 fi 
}
 
#停止方法
stop(){
 is_exist
 if [ $? -eq "0" ]; then
 kill -9 $pid
 echo -e "\033[31;1m ${APP_NAME} IS STOPING \033[0m"
 else
 echo -e "\033[33;1m ${APP_NAME} IS NOT RUNNING. \033[0m"
 fi 
}
 
#输出运行状态
status(){
 is_exist
 if [ $? -eq "0" ]; then
 echo -e "\033[36;1m ${APP_NAME} IS RUNNING. PID IS ${pid} \033[0m"
 else
 echo -e "\033[33;1m ${APP_NAME} IS NOT RUNNING. \033[0m"
 fi
}
 
#重启
restart(){
 stop
 sleep 1
 start
}
 
#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
 "start")
 start
 ;;
 "stop")
 stop
 ;;
 "status")
 status
 ;;
 "restart")
 restart
 ;;
  "help")
 help
 ;;
  "log")
 log
 ;;
 *)
 restart
 ;;
esac

exit 0
```

## jar跟参数方式

1、第一种形式
-DpropName=propValue
-DpropName=propValue的形式携带，要放在-jar参数前面

```shell
# 取值：System.getProperty("propName")
java -Dxxx=test -DprocessType=1 -jar xxx.jar
```

2、第二种形式
参数直接跟在命令后面

```shell
# 取值：参数就是jar包里主启动类中main方法的args参数，按顺序来
java -jar xxx.jar processType=1 processType2=2
```

3、第三种形式
springboot的方式，--key=value方式

```shell
# 取值：spring的@value("${xxx}")
java -jar xxx.jar --xxx=test
```

## jar包解压后重新打包

```shell
jar cvf0M app-bootstrap.jar ./
```

## windows操作jar包

```shell
# 列出所有正在运行的与 java 相关的进程
tasklist | findstr java

# 列出所有与端口 8090 相关的网络连接和监听状态，进程 ID
netstat -ano | findstr :8090

# 关掉pid为5的进程
taskkill /PID 5 /F

```