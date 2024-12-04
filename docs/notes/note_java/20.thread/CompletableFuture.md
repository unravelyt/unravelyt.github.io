---
title: CompletableFuture使用
createTime: 2024/11/17 00:57:15
permalink: /note_java/7vvyda3z/
---


## 0.Future

学习CompletableFuture之前了解下Future，它是Java5新加的一个接口，它提供了一种异步并行计算的功能。如果主线程需要执行一个很耗时的计算任务，我们就可以通过future把这个任务放到异步线程中执行。主线程继续处理其他任务，处理完成后，再通过Future获取计算结果。

```java
public static void main(String[] args) throws Exception{
    ExecutorService executorService = Executors.newFixedThreadPool(10);
    long startTime = System.currentTimeMillis();
    //1. 执行业务逻辑1
    FutureTask<Integer> futureTask1 = new FutureTask<>(new Callable<Integer>() {
        @Override
        public Integer call() {
            return Integer.SIZE;
        }
    });
    executorService.submit(futureTask1);

    //2. 模拟主线程其它操作耗时
    Thread.sleep(300);

    //3. 执行业务逻辑2
    FutureTask<String> futureTask2 = new FutureTask<>(new Callable<String>() {
        @Override
        public String call() throws Exception {
            return String.valueOf(1);
        }
    });
    executorService.submit(futureTask2);

    //4. 获取结果
    Integer integer = futureTask1.get();
    String string = futureTask2.get();

    System.out.println("总共用时" + (System.currentTimeMillis() - startTime) + "ms");
}
```

可以发现，**future+线程池**异步配合，提高了程序的执行效率，避免了主线程串行执行计算。

但是Future对于结果的获取，不是很友好，只能通过**阻塞**或者**轮询的方式**得到任务的结果。

- Future.get() 就是阻塞调用，在线程获取结果之前**get方法会一直阻塞**；
- Future.get(long timeout, TimeUnit unit)，可以设置一个超时时间，**未在设置时间范围内返回结果会抛出TimeoutException异常；**
- Future提供了一个isDone方法，可以在程序中**轮询这个方法查询**执行结果；

**阻塞的方式和异步编程的设计理念相违背，而轮询的方式会耗费无谓的CPU资源**。因此，JDK8设计出CompletableFuture。CompletableFuture提供了一种**观察者模式类似的机制**，可以让任务执行完成后通知监听的一方。


## 1. CompletableFuture含义

CompletableFuture字面翻译过来，就是“可完成的Future”。同传统的Future相比较，CompletableFuture能够主动设置计算的结果值（主动终结计算过程，即completable），从而在某些场景下主动结束阻塞等待。而Future由于不能主动设置计算结果值，一旦调用get()进行阻塞等待，要么当计算结果产生，要么超时，才会返回。

CompletableFuture是如何被主动完成的。在下面这段代码中，由于调用了complete方法，所以最终的打印结果是“manual test”，而不是"test"。

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(()->{
    try{
        Thread.sleep(1000L);
        return "test";
    } catch (Exception e){
        return "failed test";
    }
});
//如果计算没完成的话就将返回传入的值，这里即：manual test
future.complete("manual test");
System.out.println(future.join());
```

可以发现，使用CompletableFuture，代码简洁了很多。CompletableFuture的supplyAsync方法，提供了异步执行的功能，线程池也不用单独创建了。实际上，它CompletableFuture使用了默认线程池：`ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();`

## 2. get()和join()区别

### 1. 区别

- **get()** 方法抛出的是checkException（受检异常）， **需要用户手动处理**（抛出或者 try catch）

- **join() **方法抛出的是uncheckException（非受检异常)，**不会强制开发者强制捕捉**

### 2. 异常

java.lang.Throwable

- Error
- Exception
  - uncheckException - RuntimeException
  - checkException -  IOException

异常分为两种，运行时异常(也就是uncheckException)和已检查异常checkException；

- 运行时异常包括平常遇到的各种异常，如空指针异常，数据格式异常等一系列异常，这种异常是可以不捕获的，可通过throws抛出异常，交给别的代码或者JAVA虚拟机来完成。

- checkException是必须要处理的，也就是不能抛出，必须通过try-catch来完成，不处理的话是不能进行编译的。但是checkException不是一个具体的异常类型，它只是一个概念。所以你判断一个异常是已检查异常还是未检查异常，只需要通过抛出这个异常就可以知道了。

**Error类**
Error是系统中的错误，程序员是不能通过代码进行逻辑捕获的，这个错误是在程序编译时出现的，只能通过修改代码才能改正。属于uncheckedException。
如：内存空间不足，方法调用栈溢等。

**受检异常(checkedException)**
除去RuntimeException和Error外的异常都属于受检异常，该异常需要强制处理([throws](https://so.csdn.net/so/search?q=throws&spm=1001.2101.3001.7020)给方法调用者，或者在发生的方法中try/catch掉)。

**常见受检异常如下：**
Java.lang.ClassNotFoundException --找不到类异常
Java.lang.CloneNotSupportedException --clone异常-未实现Cloneable接口
Java.lang.IOException --IO流异常
Java.lang.SqlException --sql异常
Java.lang.IllegalAccessException --访问权限异常-private
Java.lang.DataFormatException --数据格式化异常
Java.lang.NoSuchFieldException --反射异常
Java.lang.NoSuchMethodException --方法未找到异常

**非受检异常(uncheckedException)**
RuntimeException是所有非受检异常类的基类，即所有非受检异常继承自该类。该类异常不强制处理，但通常开发人员为了代码健全会进行封装处理，该异常发生的原因也通常是程序员对逻辑的考虑不周而出现的。

常见非受检异常如下：
Java.lang.ClassCastException --类型转换异常
Java.lang.NumberFormatException --数字转换异常
Java.lang.NullPointerException --空指针异常
Java.lang.IndexOutOfBoundsException --索引越界异常
Java.lang.ArrayIndexOutOfBoundsException --数组下标越界异常
Java.lang.StringIndexOutOfBoundsException --字符串截取下标越界异常
Java.lang.NegativeArraySizeException --数组大小为负数异常
Java.lang.ArithmeticException --算术异常
Java.lang.ArrayStoreException --数组元素不匹配异常
Java.lang.EnumConstantNotPresentException --枚举常量不存在异常
Java.lang.IllegalArgumentException --非法参数异常
Java.lang.IllegalThreadStateException --线程异常
Java.lang.IllegalMonitorStateException --违法的监控状态异常
Java.lang.TypeNotPresentException --类型不存在异常



## 3. 创建异步方法

CompletableFuture创建异步任务，一般有supplyAsync和runAsync两个方法

- supplyAsync执行CompletableFuture任务，支持返回值
- runAsync执行CompletableFuture任务，没有返回值。

```java
public static void main(String[] args) {
    //无返回值 使用默认线程池 ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();
    CompletableFuture<Void> future = CompletableFuture.runAsync(
        () -> System.out.println("无返回值")
	);
    
	//可以自定义线程池
    ExecutorService pool = Executors.newCachedThreadPool();
  
    //无返回值
    CompletableFuture<Void> future = CompletableFuture.runAsync(
        () -> System.out.println("无返回值"), executor
    );
    
    //有返回值
    CompletableFuture<Void> future = CompletableFuture.supplyAsync(
        () -> System.out.println("无返回值"), executor
    );
    
    //runAsync的future没有返回值，输出null
    System.out.println(runFuture.join());
    //supplyAsync的future，有返回值
    System.out.println(supplyFuture.join());
    pool.shutdown(); // 线程池需要关闭
}
```



## 4. 任务异步回调

**方法一览：**

### 1. thenRun/thenRunAsync

thenRun方法：做完第一个任务后，再做第二个任务。某个任务执行完成后，执行回调方法；但是**前后两个任务没有参数传递，第二个任务也没有返回值**

```java
public static void main(String[] args) throws Exception{
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("执行第一个任务");
        return "第一个任务返回值";
    });

    CompletableFuture thenRunFuture = future.thenRun(
        () -> System.out.println("接着执行第二个任务"));

    System.out.println(thenRunFuture.get());
}

//结果输出
执行第一个任务
接着执行第二个任务
null
```

**TIPS：**

**thenRun 和thenRunAsync区别：**

如果你执行第一个任务的时候，传入了一个自定义线程池：

- 调用thenRun方法执行第二个任务时，则第二个任务和第一个任务是**共用同一个线程池**。
- 调用thenRunAsync执行第二个任务时，则第一个任务使用的是你自己传入的线程池，**第二个任务使用的是ForkJoin线程池**

后面介绍的thenAccept和thenAcceptAsync，thenApply和thenApplyAsync等，它们之间的区别也是这个。

### 2. thenAccept/thenAcceptAsync

CompletableFuture的thenAccept方法表示，第一个任务执行完成后，执行第二个回调方法任务，会将该任务的执行结果，作为入参，传递到回调方法中，但是回调方法是**没有返回值**的。

```java
public static void main(String[] args) throws Exception {
    //有返回值
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("future执行第一个任务");
        return "abc";
    });

    //没有返回值
    CompletableFuture<Void> thenAcceptFuture = future.thenAccept((param) -> {
        System.out.println("thenAcceptFuture接受第一个任务的入参=" + param);
        System.out.println("thenAcceptFuture接着执行第二个任务");
    });

    System.out.println("thenAcceptFuture结果="+thenAcceptFuture.get());
}

//结果输出
future执行第一个任务
thenAcceptFuture接受第一个任务的入参=abc
thenAcceptFuture接着执行第二个任务
thenAcceptFuture结果=null
```



### 3. thenApply/thenApplyAsync

CompletableFuture的thenApply方法表示，第一个任务执行完成后，执行第二个回调方法任务，会将该任务的执行结果，作为入参，传递到回调方法中，并且回调方法是有返回值的。

```java
public static void main(String[] args) throws Exception {
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("future执行第一个任务");
        return "future第一个任务返回值";
    });

    CompletableFuture<String> thenApplyFuture = future.thenApply((param) -> {
        System.out.println("thenApplyFuture任务1入参打印出来=" + param);
        return "thenApplyFuture第二个任务返回值";
    });

    System.out.println("thenApplyFuture获取结果=" + thenApplyFuture.get());
}

//结果输出
future执行第一个任务
thenApplyFuture任务1入参打印出来=future第一个任务返回值
thenApplyFuture获取结果=thenApplyFuture第二个任务返回值
```



### 4. exceptionally

CompletableFuture的exceptionally方法表示，某个任务执行异常时，执行的回调方法;并且有**抛出异常作为参数**，传递到回调方法。

```java
public static void main(String[] args) throws Exception {
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("future执行第一个任务");
        throw new RuntimeException("抛出异常");
    });

    CompletableFuture<String> exceptionFuture = future.exceptionally((exception) -> {
        // exception.printStackTrace();
        return "你的程序异常啦";
    });

    System.out.println(exceptionFuture.get());
}

//结果输出
future执行第一个任务
你的程序异常啦
```



### 5. whenComplete

CompletableFuture的whenComplete方法表示，某个任务执行完成后，执行的回调方法，**无返回值**；并且whenComplete方法返回的CompletableFuture的**result是上个任务的结果**。

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    System.out.println("任务一当前线程名称：" + Thread.currentThread().getName());
    try {
        Thread.sleep(2000L);

    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    //            int s = 10/0;
    return "future任务一返回值";
});

CompletableFuture<String> whenCompleteFuture = future.whenComplete((param,exception) -> {
    System.out.println("任务二当前线程名称：" + Thread.currentThread().getName());
    System.out.println("param=【"+param+"】");
    System.out.println("exception=【"+exception+"】");
});

System.out.println("最后返回值="+whenCompleteFuture.get());
}

//结果输出
任务一当前线程名称：ForkJoinPool.commonPool-worker-1
任务二当前线程名称：ForkJoinPool.commonPool-worker-1
param=【future任务一返回值】
exception=【null】
最后返回值=future任务一返回值
```

### 6. handle

CompletableFuture的handle方法表示，**某个任务执行完成后，执行回调方法，并且是有返回值的**；并且handle方法返回的CompletableFuture的result是**回调方法**执行的结果。

```java
public static void main(String[] args) throws Exception {
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务一当前线程名称：" + Thread.currentThread().getName());
        try {
            Thread.sleep(2000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "future返回值";
    });

    CompletableFuture<String> handleFuture = future.handle((param, throwable) -> {
        System.out.println("handleFuture当前线程名称：" + Thread.currentThread().getName());
        System.out.println("handleFuture入參"+param);
        return "handleFuture返回值";
    });

    System.out.println("最終結果="+handleFuture.get());
}

//结果输出
任务一当前线程名称：ForkJoinPool.commonPool-worker-1
handleFuture当前线程名称：ForkJoinPool.commonPool-worker-1
handleFuture入參future返回值
最終結果=handleFuture返回值

```



## 5. 多任务组合处理

**方法一览：**


### 1. AND组合关系

thenCombine / thenAcceptBoth / runAfterBoth都表示：**将两个CompletableFuture组合起来，只有这两个都正常执行完了，才会执行某个任务**。

区别在于：

- thenCombine：会将两个任务的执行结果作为方法入参，传递到指定方法中，且**有返回值**
- thenAcceptBoth：会将两个任务的执行结果作为方法入参，传递到指定方法中，且**无返回值**
- runAfterBoth：不会把执行结果当做方法入参，且没有返回值。

```java
public static void main(String[] args) throws Exception {
    ExecutorService executor = Executors.newFixedThreadPool(10);

    CompletableFuture<String> first = CompletableFuture.completedFuture("第一个异步任务");
    CompletableFuture<String> second = CompletableFuture.supplyAsync(() -> "第二个异步任务", executor);

    // (w, s) -> System.out.println(s) 是第三个任务
    CompletableFuture<String> future = second.thenCombineAsync(first, (var1, var2) -> {
        System.out.println("var1=" + var1);
        System.out.println("var2=" + var2);
        return "两个异步任务的组合";
    }, executor);
    System.out.println("最終結果=" + future.join());
    executor.shutdown();
}

//结果输出
var1=第二个异步任务
var2=第一个异步任务
最終結果=两个异步任务的组合
```



### 2. OR组合关系

applyToEither / acceptEither / runAfterEither 都表示：将两个CompletableFuture组合起来，只要其中一个执行完了,就会执行某个任务。

区别在于：

- applyToEither：会将已经执行完成的任务，作为方法入参，传递到指定方法中，且有返回值
- acceptEither: 会将已经执行完成的任务，作为方法入参，传递到指定方法中，且无返回值
- runAfterEither： 不会把执行结果当做方法入参，且没有返回值。



```java
public static void main(String[] args) {
    CompletableFuture<String> first = CompletableFuture.supplyAsync(() -> {
        try {
            //第一个异步任务，休眠2秒，保证它执行晚点
            //                Thread.sleep(2000L);
            System.out.println("执行第一个异步任务");
        } catch (Exception e) {
            return "第一个任务异常";
        }
        return "第一个任务返回值";
    });
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        try {
            Thread.sleep(2000L);
            System.out.println("执行第二个异步任务");
        } catch (Exception e) {
            return "第二个任务异常";
        }
        return "第二个任务返回值";
    });

    //第三个任务
    CompletableFuture<Void> result = future.acceptEitherAsync(first, (param) -> {
        System.out.println("第三个任务执行=" + param);
    });

    System.out.println("最終結果=" + result.join());
}

//结果输出
执行第一个异步任务
第三个任务执行=第一个任务返回值
最終結果=null
```



### 3. AllOf组合关系

AllOf返回的CompletableFuture是多个任务都执行完成后才会执行，只有有一个任务执行异常，则返回的CompletableFuture执行get方法时会抛出异常，如果都是正常执行，则get返回null。常见用法：

`CompletableFuture.allOf(c1, c2, c3).join(); `

```java
public static void main(String[] args) throws Exception {
    CompletableFuture<String> future1 = CompletableFuture.supplyAsync(()->{
        try {
            System.out.println("任务1睡觉5秒！");
            Thread.sleep(3000L);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("任务1执行完了");
        return "任务1结果";
    });

    CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2执行完了");
        return "任务2结果";
    });

    CompletableFuture<Void> future3 = CompletableFuture.runAsync(() -> {
        System.out.println("任务3执行前");
        throw new RuntimeException("自定义异常");
    });

   //在继续程序之前等待传入的一组CompletableFuture完成,如果有异常的话，会等最后一个任务完成才会抛异常，
    CompletableFuture.allOf(future1, future2).join();

    //如果要获取每个CompletableFuture的结果需要单独获取
    future1.whenComplete((s, exception) -> {
        System.out.println("future1=" + s);
    });

    future2.whenComplete((s, exception) -> {
        System.out.println("future2=" + s);
    });
}

//结果输出
任务1睡觉5秒！
任务2执行完了
任务1执行完了
future1=任务1结果
future2=任务2结果
```

AllOf大数据量批量处理

```java
public static void main(String[] args) {
    ExecutorService threadPool = Executors.newCachedThreadPool();
    // 多线程处理
    List<String> resultBo = Collections.synchronizedList(new ArrayList<>());

    List<String> paramList = new ArrayList<>();
    CompletableFuture[] completableFutures = paramList.stream().map(s -> {
        return CompletableFuture.supplyAsync(() -> {
            List<String> result = new ArrayList<>();
            result.add(s);
            return result;
        }, threadPool);
    }).toArray(CompletableFuture[]::new);

    //等待所有任务执行完成，如果有异常则抛出异常
    CompletableFuture.allOf(completableFutures).join();
	//单独获取每个CompletableFuture结果
    for (CompletableFuture future : completableFutures) {
        future.whenComplete((result, throwable) -> {
            resultBo.addAll((List<String>) result);
        });
    }
}
```

### 4. AnyOf组合关系

任意一个任务执行完，就执行anyOf返回的CompletableFuture。如果执行的任务异常，anyOf的CompletableFuture，执行get方法，会抛出异常。

```java
public static void main(String[] args) throws Exception {
    CompletableFuture<Void> future1 = CompletableFuture.runAsync(() -> {
        try {
            Thread.sleep(3000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("future1执行完了");
    });

    CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("future2执行完了");
        return "future2结果";
    });

    CompletableFuture<Object> anyOfFuture = CompletableFuture
        .anyOf(future1, future2)
        .whenComplete((param, exception) -> {
            System.out.println("anyOfFuture param="+param);
            System.out.println("anyOfFuture exception="+exception);
            System.out.println("anyOfFuture finish");
        });

    Object join = anyOfFuture.join();
    System.out.println("最終結果=" + join);
}

//结果输出
future2执行完了
anyOfFuture param=future2结果
anyOfFuture exception=null
anyOfFuture finish
最終結果=future2结果
```



### 5. thenCompose

thenCompose方法会在A任务执行完成后，将A任务的执行结果,作为方法入参,去执行指定的方法。该方法会返回一个新的CompletableFuture实例

- 如果该CompletableFuture实例的result不为null，则返回一个基于该result新的CompletableFuture实例；
- 如果该CompletableFuture实例为null，然后就执行这个新任务

```java
public static void main(String[] args) throws Exception {
    CompletableFuture<String> future1 = CompletableFuture.completedFuture("第一个任务");
    CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "第二个任务");

    CompletableFuture<String> future3 = future2.thenCompose(data -> {
        System.out.println("future3=" + data);
        return future1; //使用第一个任务作为返回
    });
    //future3的结果是他返回的future1
    System.out.println("最終結果="+future3.join());
}

//结果输出
future3=第二个任务
最終結果=第一个任务
```

## 6. CompletableFuture注意点

- Future需要获取返回值才能获取异常信息
- 他的get()和join() 方法是阻塞的
- 需要注意默认线程池，即`ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();`
- 自定义线程池是`DiscardPolicy`或者`DiscardOldestPolicy`饱和策略

**1.Future需要获取返回值，才能获取异常信息**

```java
ExecutorService pool = new ThreadPoolExecutor(5, 10, 5L,
    TimeUnit.SECONDS, new ArrayBlockingQueue<>(10));

CompletableFuture<Void> future = CompletableFuture.supplyAsync(() -> {
      int a = 0;
      int b = 666;
      int c = b / a;
      return true;
   },pool).thenAccept(System.out::println);
   
 //如果不加 get()方法这一行，看不到异常信息
 //future.get();
```

**2.Future需要获取返回值，才能获取到异常信息。**

如果不加 get()/join()方法，看不到异常信息。使用的时候，注意一下考虑是否加try...catch...或者使用exceptionally方法。

CompletableFuture的get()方法是阻塞的。

CompletableFuture的get()方法是阻塞的，如果使用它来获取异步调用的返回值，需要添加超时时间。

```java
//反例
 CompletableFuture.get();
//正例
CompletableFuture.get(5, TimeUnit.SECONDS);
```

**3.默认线程池的注意点**

CompletableFuture代码中又使用了默认的线程池，即`ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();` 处理的线程个数是电脑CPU核数-1。在**大量请求过来的时候，处理逻辑复杂的话，响应会很慢**。一般建议使用自定义线程池，优化线程池配置参数。

**4.自定义线程池时，注意饱和策略**

CompletableFuture的get()方法是阻塞的，我们一般建议使用`future.get(3, TimeUnit.SECONDS)`。并且一般建议使用自定义线程池。

但是如果线程池拒绝策略是`DiscardPolicy`或者`DiscardOldestPolicy`，当线程池饱和时，会直接丢弃任务，不会抛弃异常。因此建议，CompletableFuture线程池策略**最好使用AbortPolicy**，然后耗时的异步线程，做好**线程池隔离**。





