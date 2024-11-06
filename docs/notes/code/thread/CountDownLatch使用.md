---
title: CountDownLatch使用
createTime: 2024/11/05 16:06:15
permalink: /code/w85d9xfa/
---

CountDownLatch用于主线程和子线程协同配合，常用2种使用方式：

1. 主线程等待所有的子线程完成任务后再执行；
2. 所有的子线程准备，等待主线程发令执行；

<!-- more -->

## 用法一：主线程等子线程

```java
private static void m2() throws InterruptedException {
    CountDownLatch countDownLatch2 = new CountDownLatch(5);
    for (int i = 0; i < 5; i++) {
        new Thread(() -> {
            try {
                String name = Thread.currentThread().getName();
                System.out.println("子线程" + name + "执行任务中...");
                Thread.sleep(1000 + ThreadLocalRandom.current().nextInt(2000));
                System.out.println("子线程" + name + "完成任务");
                countDownLatch2.countDown();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
    System.out.println("主线程等待中....");
    countDownLatch2.await();// 主线程在阻塞，当计数器==0，就唤醒主线程往下执行。
    System.out.println("主线程:在所有任务运行完成后，进行结果汇总");
}
```

运行结果：

```plain
子线程Thread-0执行任务中...
子线程Thread-2执行任务中...
主线程等待中....
子线程Thread-1执行任务中...
子线程Thread-3执行任务中...
子线程Thread-4执行任务中...
子线程Thread-1完成任务
子线程Thread-0完成任务
子线程Thread-3完成任务
子线程Thread-2完成任务
子线程Thread-4完成任务
主线程:在所有任务运行完成后，进行结果汇总
```

## 用法二：所有子线程准备，等待主线程发令执行

```java
CountDownLatch countDownLatch = new CountDownLatch(1);
for(
int i = 0;
i< 5;i++){
        new

Thread(() ->{
        try{
        //准备完毕……运动员都阻塞在这，等待号令
        countDownLatch.

await();

String parter = "【" + Thread.currentThread().getName() + "】";
            System.out.

println(parter +"开始执行……");
        }catch(
InterruptedException e){
        e.

printStackTrace();
        }
                }).

start();
    System.out.

println("创建线程时间："+LocalDateTime.now());
        }

        System.out.

println("裁判准备发令");
System.out.

println("3");
Thread.

sleep(1000);
System.out.

println("2");
Thread.

sleep(1000);
System.out.

println("1");
Thread.

sleep(1000);
countDownLatch.

countDown();// 发令枪：执行发令
```

运行结果：

```plain
创建线程时间：2022-03-06T19:12:55.077911700
创建线程时间：2022-03-06T19:12:55.077911700
创建线程时间：2022-03-06T19:12:55.077911700
创建线程时间：2022-03-06T19:12:55.077911700
创建线程时间：2022-03-06T19:12:55.077911700
裁判准备发令
3
2
1
【Thread-0】开始执行……
【Thread-2】开始执行……
【Thread-4】开始执行……
【Thread-1】开始执行……
【Thread-3】开始执行……
```

ps:

- CountDownLatch的作用就是允许一个或多个线程等待其他线程完成操作，看起来有点类似join()方法，但其提供了比join()更加灵活的API。
- CountDownLatch可以手动控制在n个线程里调用n次countDown()方法使计数器进行减一操作，也可以在一个线程里调用n次执行减一操作。
- Thread.join() 当我们调用某个线程的这个方法时，这个方法会挂起调用线程，直到被调用线程结束执行，调用线程才会继续执行。
