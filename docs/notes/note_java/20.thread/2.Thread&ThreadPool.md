---
title: Thread && ThreadPool
createTime: 2024/11/16 22:49:43
permalink: /note_java/ry666u5n/
---


> java要使用多线程，一种是直接创建线程，另一种是用线程池
> 
> 1.直接创建：new Thread()
> 
> 2.线程池创建：一种手动创建（推荐），另一种使用Executors创建

## 1. 线程

### 1.1 线程的生命周期
**生命周期：**
![图解Thread生命周期](https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/1.4n2sdqdru200.webp)

**线程方法：**
![线程方法](https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/thread.2yqh49jz3wq0.webp)

### 1.2 线程的6种状态
**JVM线程运行状态 (JVM Thread Status)：**
![线程方法](https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/2.71salbu9rsk0.webp)

### 1.3 创建线程
>在 JDK1.5 之前，创建线程就只有两种方式，即继承java.lang.Thread类和实现java.lang.Runnable接口；
>
>而在 JDK1.5 以后，增加了两个创建线程的方式，即实现java.util.concurrent.Callable接口和线程池。

#### 1.3.1 继承java.lang.Thread类

```java
//继承Thread类来创建线程
public class ThreadTest {
    public static void main(String[] args) {
        //设置线程名字
        Thread.currentThread().setName("main thread");
        MyThread myThread = new MyThread();
        myThread.setName("子线程:");
        //开启线程
        myThread.start();
        for(int i = 0;i<5;i++){
            System.out.println(Thread.currentThread().getName() + i);
        }
    }
}
 
class MyThread extends Thread{
    //重写run()方法
    public void run(){
        for(int i = 0;i < 10; i++){
            System.out.println(Thread.currentThread().getName() + i);
        }
    }
}
```
#### 1.3.2 实现java.lang.Runnable接口

```java
//实现Runnable接口
public class RunnableTest {
    public static void main(String[] args) {
        //设置线程名字
        Thread.currentThread().setName("main thread:");
        //可用匿名内部类
        Thread thread = new Thread(new MyRunnable());
        thread.setName("子线程:");
        //开启线程
        thread.start();
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + i);
        }
    }
}

class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + i);
        }
    }
}
```

#### 1.3.3 实现java.util.concurrent.Callable接口

> 直接继承Thread或者实现Runnable接口都可以创建线程，但是这两种方法都有一个问题就是：没有返回值，也就是不能获取执行完的结果。
>
> 因此java1.5就提供了Callable接口来实现这一场景，而Future和FutureTask就可以和Callable接口配合起来使用。
>
> Callable必须要借助FutureTask封装才能启动线程，在线程池中并没有使用到FutureTask，而是直通过submit提交上去的。是因为submit里面也是使用了FutureTask，只是他帮我们写好了

##### （1）Callable接口
```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
//实现Callable接口
public class CallableTest {
    public static void main(String[] args) {
        //执行Callable 方式，需要FutureTask 实现实现，用于接收运算结果
        FutureTask<Integer> futureTask = new FutureTask<Integer>(new MyCallable());
        new Thread(futureTask).start();
        //接收线程运算后的结果
        try {
            Integer sum = futureTask.get();
            System.out.println(sum);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}

//call方法的返回值是泛型，也就是说call方法的返回值类型就是传进来的值的类型
class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 0; i < 100; i++) {sum += i;}
        return sum;
    }
}
```

##### （2）future与futuretask

**先看下Future、FutureTask相关类的关系：**
![关系](https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/3.2q7gqbau0q20.webp)

Future只是一个接口，FutureTask是实现了RunnableFuture；

**Future接口可以实现的功能**：

>Future呈现的是异步计算的结果。Future中的方法提供了检查计算是否已经完成，并且等待计算的结果，还能够重新获取计算记得结果。
>
>当计算已经完成的时候只能使用get()方法获取结果，如果有需要的话，可以一直阻塞等待结果，直到结果已经准备好了。
>
>通过cancel()方法可以取消执行。还提供了了其他方法来确定任务是否正常完成或者被取消。一旦一个计算已经完成的话，那么计算是不能够被取消的。
>
>如果是为了实现可以去掉任务但是不需要返回结果的话，那么就可以使用future，将返回结果设置成null就可以了。

**Future的常见的使用方法：** <span id="jump2"></span>

```java
ExecutorService service = Executors.newSingleThreadExecutor();
Future<String> future = service.submit(new Callable<String>() {
    @Override
    public String call() throws Exception {
        return "say helloWorld!!!";
    }
 });
 System.out.println(future.get());// 通过get返回结果
```

使用get()，主程序将停止往下执行，一直等待结果，直到有返回值，下面的程序才能得到继续的执行。如果不希望因为get一直等待下去的话，可以使用get(long timeout, TimeUnit unit)方法，通过这个方法可以设置等待时间，如果在定时时间内没有得到返回结果的话，将会抛出超时的异常，这种用法用来做远程调用设置超时的场景中。

**FutureTask实现了Future，常见用法：**
```java
ExecutorService service = Executors.newSingleThreadExecutor();
FutureTask<String> futureTask = new FutureTask<>(new Callable<String>(){
     @Override
     public String call() throws Exception {
         return "futureTask say HelloWorld!!!";
     }
});
service.execute(futureTask); //execute没有返回值的
System.out.println(futureTask.get());
```
ExecutorService的execute是没有返回值的，使用这种用法需要注意的是FutureTask的get方法会一直等待结果的返回，如果get的调用顺序在execute之前的话，那么程序将会停止在get这里。


#### 1.3.4 创建线程池

见： [创建线程池](#jump1)






### 1.4 Java中守护线程和本地线程区别
java 中的线程分为两种：**守护线程**(Daemon)和**用户线程**(User)
任何线程都可以设置为守护线程和用户线程，通过方法Thread.setDaemon(boolon)；
true则把该线程设置为守护线程，false则设置为用户线程。Thread.setDaemon() 必须在Thread.start()之前调用，否则运行时会抛出异常。

守护线程和本地线程两者的区别：
唯一的区别是判断虚拟机(JVM)何时离开，守护线程Daemon是为其他线程提供服务，如果全部的用户现场Thread 已经撤离， Daemon 没有可服务的线程，JVM 撤离。

也可以理解为守护线程是JVM 自动创建的线程( 但不一定)，用户线程是程序创建的线程；比如JVM 的垃圾回收线程是一个守护线程，
当所有线程已经撤离，不再产生垃圾，守护线程自然就没事可干了，当垃圾回收线程是Java 虚拟机上仅剩的线 程时，Java 虚拟机会自动离开。




## 2. 线程池 <span id="jump1" desc="线程池跳转"></span>
### 2.1 手动创建
```java
/*
 *7.ThreadPoolExecutor：最原始的创建线程池的方式，4个创建方法，它包含了7个参数可供设置
 *
 * 参数解释:
 * 1.corePoolSize：核心线程数，会一直存活，即使没有任务，线程池也会维护线程的最少数量
 *
 * 2.maximumPoolSize： 线程池维护线程的最大数量
 *
 * 3.keepAliveTime： 线程池维护线程所允许的空闲时间，当线程空闲时间达到keepAliveTime，该线程会退出，
 *   直到线程数量等于corePoolSize。如果allowCoreThreadTimeout设置为true，则所有线程均会退出直到线程数量为0。
 *
 * 4.unit：线程池维护线程所允许的空闲时间的单位、可选参数值为：TimeUnit中的几个静态属性：NANOSECONDS、MICROSECONDS、     MILLISECONDS、SECONDS。
 *
 * 5.workQueue： 线程池所使用的缓冲队列，常用的是：java.util.concurrent.ArrayBlockingQueue(有界阻塞队列)、
 *                                       LinkedBlockingQueue(双向阻塞队列)、SynchronousQueue(直接提交队列)
 *
 * 6.threadFactory –执行程序创建新线程时要使用的工厂
 *
 * 7.handler：线程池中的数量大于maximumPoolSize，对拒绝任务的处理策略，默认值ThreadPoolExecutor.AbortPolicy()。
 *            AbortPolicy：拒绝并抛出异常。
 *            CallerRunsPolicy：使用当前调用的线程来执行此任务。
 *            DiscardOldestPolicy：抛弃队列头部（最旧）的一个任务，并执行当前任务。
 *            DiscardPolicy：忽略并抛弃当前任务。
 */

ThreadFactory build = ThreadFactoryBuilder.create().setNamePrefix("demo-thread-%d").build();
ThreadPoolExecutor threadPool = new ThreadPoolExecutor(
        3, //corePoolSize
        5, //maximumPoolSize
        30, //keepAliveTime
        TimeUnit.SECONDS, //unit
        new LinkedBlockingQueue<Runnable>(), //workQueue
        threadFactory, //threadFactory
        new ThreadPoolExecutor.AbortPolicy() //handler
);
//execute没有返回值
threadPool.execute(() ->{});
//submit有返回值
Future<?> submit = threadPool.submit(() -> {});
```

见：[Future的用法](#jump2)

#### 2.1.1 ThreadFactory的4种创建方式
**（1）Spring 框架提供的 `CustomizableThreadFactory`。**

```java
ThreadFactory springThreadFactory = new CustomizableThreadFactory("springThread-pool-");
```

**（2）Google guava 工具类 提供的 `ThreadFactoryBuilder` ,使用链式方法创建。**

```java
ThreadFactory guavaThreadFactory = new ThreadFactoryBuilder().setNameFormat("retryClient-pool-")
```

**（3）Apache commons-lang3 提供的 `BasicThreadFactory`。**

```java
ThreadFactory basicThreadFactory = new BasicThreadFactory.Builder()
		.namingPattern("basicThreadFactory-").build();
```

**（4）hutool工具类提供的`ThreadFactoryBuilder`。**

```java
ThreadFactory hutoolThreadFactory = ThreadFactoryBuilder.create().setNamePrefix("demo-thread-%d").build();
```



### 2.2 newSingleThreadExecutor 

**创建一个单线程的线程池，它只会用唯一的工作线程来执行任务，保证所有任务按照指定顺序(FIFO, LIFO, 优先级)执行。**

```java
ExecutorService singleThreadPool = Executors.newSingleThreadExecutor();

//源码：
public static ExecutorService newSingleThreadExecutor() {
	return new FinalizableDelegatedExecutorService(
        new ThreadPoolExecutor(1, 1, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>()));
}
public LinkedBlockingQueue() {
        this(Integer.MAX_VALUE);
}

缺点：允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，从而导致OOM。
```

从参数可以看出来，SingleThreadExecutor 相当于特殊的 FixedThreadPool，它的执行流程如下：

1. 线程池中没有线程时，新建一个线程执行任务
2. 有一个线程以后，将任务加入阻塞队列，不停的加
3. 唯一的这一个线程不停地去队列里取任务执行

**SingleThreadExecutor 用于串行执行任务的场景，每个任务必须按顺序执行，不需要并发执行**。



### 2.3 newFixedThreadPool 

**创建一个固定大小的线程池，可控制并发的线程数，超出的线程会在队列中等待。**

```java
ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3); //固定3个线程

//源码：
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>());
}
public LinkedBlockingQueue() {
	this(Integer.MAX_VALUE);
}

缺点：允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，从而导致OOM。
```

可以看到，FixedThreadPool 的核心线程数和最大线程数都是指定值，也就是说当线程池中的线程数超过核心线程数后，任务都会被放到阻塞队列中。

此外 keepAliveTime 为 0，也就是多余的空余线程会被立即终止（由于这里没有多余线程，这个参数也没什么意义了）。

而这里选用的阻塞队列是 LinkedBlockingQueue，使用的是默认容量 Integer.MAX_VALUE，相当于没有上限。

因此这个线程池执行任务的流程如下：

1. 线程数少于核心线程数，也就是设置的线程数时，新建线程执行任务
2. 线程数等于核心线程数后，将任务加入阻塞队列
3. 由于队列容量非常大，可以一直加
4. 执行完任务的线程反复去队列中取任务执行

**FixedThreadPool 用于负载比较重的服务器，为了资源的合理利用，需要限制当前线程数量**。



### 2.4 newCachedThreadPool 

**创建一个可缓存的线程池，若线程数超过处理所需，缓存一段时间后会回收，若线程数不够，则新建线程。**

```Java
ExecutorService cachedThreadPool = Executors.newCachedThreadPool();

//源码：
public static ExecutorService newCachedThreadPool() {
	return new ThreadPoolExecutor(0, Integer.MAX_VALUE,60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>());
}

缺点：
允许的创建线程数量为 Integer.MAX_VALUE，可能会创建大量的线程，从而导致OOM
```

可以看到，CachedThreadPool 没有核心线程，非核心线程数无上限，也就是全部使用外包，但是每个外包空闲的时间只有 60 秒，超过后就会被回收。

CachedThreadPool 使用的队列是 SynchronousQueue，这个队列的作用就是传递任务，并不会保存。

因此当提交任务的速度大于处理任务的速度时，每次提交一个任务，就会创建一个线程。极端情况下会创建过多的线程，耗尽 CPU 和内存资源。

它的执行流程如下：

1. 没有核心线程，直接向 SynchronousQueue 中提交任务
2. 如果有空闲线程，就去取出任务执行；如果没有空闲线程，就新建一个
3. 执行完任务的线程有 60 秒生存时间，如果在这个时间内可以接到新任务，就可以继续活下去，否则就拜拜
4. 由于空闲 60 秒的线程会被终止，长时间保持空闲的 CachedThreadPool 不会占用任何资源。

**CachedThreadPool 用于并发执行大量短期的小任务，或者是负载较轻的服务器**。


### 2.5 newScheduledThreadPool 
#### 2.5.1 创建一个可以执行延迟任务的线程池

```java
//单线程延迟任务的线程池
ScheduledExecutorService singleThreadScheduledPool = Executors.newSingleThreadScheduledExecutor();
//自定义线程数的延迟任务线程池
ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(3);

//源码：
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE, DEFAULT_KEEPALIVE_MILLIS, MILLISECONDS,
          new DelayedWorkQueue());
}

缺点：
允许的创建线程数量为 Integer.MAX_VALUE，可能会创建大量的线程，从而导致OOM
```
ScheduledThreadPoolExecutor 的执行流程如下：

1. 添加一个任务
2. 线程池中的线程从 DelayQueue 中取任务
3. 然后执行任务

具体执行任务的步骤也比较复杂：

1. 线程从 DelayQueue 中获取 time 大于等于当前时间的 ScheduledFutureTask
2. 执行完后修改这个 task 的 time 为下次被执行的时间
3. 然后再把这个 task 放回队列中

**ScheduledThreadPoolExecutor 用于需要多个后台线程执行周期任务，同时需要限制线程数量的场景**。

#### 2.5.2 延迟线程池使用方式

**（1）延迟3秒执行，只执行一次**

```java
scheduledThreadPool.schedule(() ->{
    System.out.println("执行时间："+ LocalDateTime.now());

},3, TimeUnit.SECONDS);
```

**（2）表示延迟1秒后每3秒执行一次，有可能延迟超过3秒后才执行下一次**

```java
scheduledThreadPool.scheduleAtFixedRate(new Runnable(){
    @Override
    public void run() {
        System.out.println("延迟1秒后每三秒执行一次");
    }
}, 1, 3, TimeUnit.SECONDS);
```

分为两种情况：

1. 当前任务执行时间小于间隔时间，每次到点即执行；

   `程序启动时间是14:36:00，以后每间隔10s执行一次(即14:36:10、14:36:20、14:36:30等)。`

2. 当前任务执行时间大于等于间隔时间，任务执行后立即执行下一次任务。相当于连续执行了;

   `程序启动时间是14:30:13，按理说应该每间隔10s执行一次（即14:30:23、14:30:33等），但由于任务执行时间长于10s，下一次的任务要开始的时候发现上次的任务还没有完成，因此阻塞等待，一旦发现上次的任务完成，就马上启动。表现出来就是任务延时启动，最终的效果就是连续执行。`

**（3）表示延迟1秒后每3秒执行一次，上一次执行完成时间到下一次开始时间是固定的**

```java
//可以每个End后，等待了10秒，才启动下一次Start。
scheduledThreadPool.scheduleWithFixedDelay(new Runnable(){
    @Override
    public void run() {
    	System.out.println("延迟1秒后每三秒执行一次");
    }
}, 1, 3, TimeUnit.SECONDS);
```


### 2.6 newWorkStealingPool

https://blog.csdn.net/f641385712/article/details/83749798





























