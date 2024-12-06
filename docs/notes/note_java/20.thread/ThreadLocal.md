---
title: ThreadLocal使用和了解
tags:
  - ThreadLocal
  - Java
createTime: 2024/12/05 00:09:48
permalink: /note_java/n06pdkxz/
---



> 参考：https://blog.csdn.net/weixin_39791386/article/details/109977273
>
> 推荐：https://blog.csdn.net/silence_yb/article/details/124265702

# 1. 多线程下的SimpleDateFormat

## 1.1 案例

多线程下不建议使用SimpleDateFormat，因为SimpleDateFormat是线程不安全的类，一般不要定义为static变量，如果定义为static，必须加锁，或者使用 DateUtils 工具类；

```java
public static void main(String[] args) throws InterruptedException {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    CountDownLatch countDownLatch = new CountDownLatch(10);
    for (int i = 0; i < 10; i++) {
        CompletableFuture.runAsync(() -> {
            //先获取当前时间的格式化字符串
            String str1 = simpleDateFormat.format(new Date());
            try {
                //在通过格式化字符串再操作一次
                Date parseDate = simpleDateFormat.parse(str1);
                String str2 = simpleDateFormat.format(parseDate);
                //对比前后格式化字符串是否一致
                System.out.println(String.format("threadId = %s , 前 = %s , 后 = %s", Thread.currentThread().getId(), str1, str2));
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                countDownLatch.countDown();
            }
        });
    }
    countDownLatch.await();
}
```

在同个一个线程中，多次操作同一个时间new Date()，比较前后操作的结果是否一样。一样，则代表是现场安全的

结果：

````java
java.lang.NumberFormatException: For input string: "1101.E11012E"
	at java.base/jdk.internal.math.FloatingDecimal.readJavaFormatString(FloatingDecimal.java:2054)
	at java.base/jdk.internal.math.FloatingDecimal.parseDouble(FloatingDecimal.java:110)
	at java.base/java.lang.Double.parseDouble(Double.java:543)
	at java.base/java.text.DigitList.getDouble(DigitList.java:169)
	at java.base/java.text.DecimalFormat.parse(DecimalFormat.java:2126)
	at java.base/java.text.SimpleDateFormat.subParse(SimpleDateFormat.java:2240)
	at java.base/java.text.SimpleDateFormat.parse(SimpleDateFormat.java:1541)
	at java.base/java.text.DateFormat.parse(DateFormat.java:393)
	at com.unravely.common.SimpleDateTest.lambda$main$0(SimpleDateTest.java:25)
	at java.base/java.util.concurrent.CompletableFuture$AsyncRun.run(CompletableFuture.java:1736)
	at java.base/java.util.concurrent.CompletableFuture$AsyncRun.exec(CompletableFuture.java:1728)
	at java.base/java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:290)
	at java.base/java.util.concurrent.ForkJoinPool$WorkQueue.topLevelExec(ForkJoinPool.java:1020)
	at java.base/java.util.concurrent.ForkJoinPool.scan(ForkJoinPool.java:1656)
	at java.base/java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1594)
	at java.base/java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:183)
threadId = 19 , 前 = 2022-09-11 17:41:10 , 后 = 2022-08-31 00:41:00
threadId = 16 , 前 = 2022-09-11 17:41:10 , 后 = 2022-09-11 17:41:10
threadId = 17 , 前 = 2022-09-11 17:41:10 , 后 = 2022-09-11 17:41:10
threadId = 15 , 前 = 2022-09-11 17:41:10 , 后 = 2034-01-01 17:41:10
threadId = 14 , 前 = 2022-09-11 17:41:10 , 后 = 2022-08-31 00:41:00
threadId = 18 , 前 = 2022-09-11 17:41:10 , 后 = 2022-09-11 17:41:10
````

源码：

```java
private StringBuffer format(Date date, StringBuffer toAppendTo,
                            FieldDelegate delegate) {
    // Convert input date to time field list
    calendar.setTime(date);

    boolean useDateFormatSymbols = useDateFormatSymbols();

    for (int i = 0; i < compiledPattern.length; ) {
        int tag = compiledPattern[i] >>> 8;
        int count = compiledPattern[i++] & 0xff;
        if (count == 255) {
            count = compiledPattern[i++] << 16;
            count |= compiledPattern[i++];
        }

        switch (tag) {
        case TAG_QUOTE_ASCII_CHAR:
            toAppendTo.append((char)count);
            break;

        case TAG_QUOTE_CHARS:
            toAppendTo.append(compiledPattern, i, count);
            i += count;
            break;

        default:
            subFormat(tag, count, delegate, toAppendTo, useDateFormatSymbols);
            break;
        }
    }
    return toAppendTo;
}
```

可以看到，多个线程之间共享变量calendar，并修改calendar。

因此在多线程环境下，当多个线程同时使用相同的SimpleDateFormat对象（如static修饰）的话，如调用format方法时，多个线程会同时调用calendar.setTime(date)方法，导致time被别的线程修改，因此线程是不安全的。
此外，parse方法也是线程不安全的，parse方法实际调用的是CalenderBuilder的establish来进行解析，其方法中主要步骤不是原子操作。 想要避免，要不就**加锁**、要不就在方法内**new SimpleDateFormat**，或者使用**ThreadLocal**。推荐使用 **Jdk 8 的DateTimeFormatter** 的解决方式。



## 1.2 解决方案

1. 每个线程里直接new一个
2. 使用synchronized，不推荐效率低

```java
public static void main(String[] args) throws InterruptedException {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    CountDownLatch countDownLatch = new CountDownLatch(10);
    for (int i = 0; i < 10; i++) {
        CompletableFuture.runAsync(() -> {
            //把SimpleDateFormat锁住
            synchronized (simpleDateFormat) {
                //先获取当前时间的格式化字符串
                String str1 = simpleDateFormat.format(new Date());
                try {
                    //在通过格式化字符串再操作一次
                    Date parseDate = simpleDateFormat.parse(str1);
                    String str2 = simpleDateFormat.format(parseDate);
                    //对比前后格式化字符串是否一致
                    System.out.println(String.format("threadId = %s , 前 = %s , 后 = %s", Thread.currentThread().getId(), str1, str2));
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    countDownLatch.countDown();
                }
            }
        });
    }
    countDownLatch.await();
}
```

3. **使用TreadLocal**

```java
public static void main(String[] args) throws InterruptedException {
    ThreadLocal<SimpleDateFormat> sdf = new ThreadLocal<SimpleDateFormat>() {
        @Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        }
    };

    CountDownLatch countDownLatch = new CountDownLatch(10);
    for (int i = 0; i < 10; i++) {
        CompletableFuture.runAsync(() -> {
            //先获取当前时间的格式化字符串
            String str1 = sdf.get().format(new Date());
            try {
                //在通过格式化字符串再操作一次
                Date parseDate = sdf.get().parse(str1);
                String str2 = sdf.get().format(parseDate);
                //对比前后格式化字符串是否一致
                System.out.println(String.format("threadId = %s , 前 = %s , 后 = %s", Thread.currentThread().getId(), str1, str2));
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                countDownLatch.countDown();
            }
        });
    }
    countDownLatch.await();
}
```



# 2. Spring中ThreadLocal的应用

Spring中的bean不是单例模式吗？为什么那么多客户端访问同一个接口不会出现线程安全问题？
其实：

1. spring单例模式指的是在内存中只实例化一个类的对象。确保某个类只有一个实例，而且自行实例化并向整个系统提供这个实例。
2. 当多个用户同时请求一个接口服务的时候，容器会给每一个请求分配一个线程，这时候多个线程会并发执行该请求所对应的业务逻辑。如果该逻辑涉及到对该单例状态（成员变量）的改变，就会有线程安全的问题。
3. Spring使用ThreadLocal来解决线程安全问题，每个线程去执行业务代码的时候，都会去内存申请临时变量，这样就不会涉及变量并发访问冲突的问题。
4. 一般的 Web 应用划分为展现层、服务层和持久层三个层次，在不同的层中编写对应的逻辑，下层通过接口向上层开放功能调用。在一般情况下，从接收请求到返回响应所经过的所有程序调用都同属于一个线程。

**那JVM是如何实现线程的独立内存空间？**

- 每当启用一个线程时，JVM就为他分配一个Java栈，栈是以帧为单位保存当前线程的运行状态。某个线程正在执行的方法称为当前方法，当前方法使用的栈帧称为当前帧，当前方法所属的类称为当前类，当前类的常量池称为当前常量池。当线程执行一个方法时，它会跟踪当前常量池。
- 每当线程调用一个Java方法时，JVM就会在该线程对应的栈中压入一个帧，这个帧自然就成了当前帧。当执行这个方法时，它使用这个帧来存储参数、局部变量、中间运算结果等等。
- Java栈上的所有数据都是私有的。任何线程都不能访问另一个线程的栈数据。所以我们不用考虑多线程情况下栈数据访问同步的情况。



# 3. ThreadLocal

## 3.1 ThreadLocal是干什么的

多线程访问**同一个共享变量**的时候容易出现并发问题，特别是多个线程对一个变量进行写入的时候，为了保证线程安全，一般在访问共享变量的时候需要进行额外的同步措施才能保证线程安全性。**`ThreadLocal`是除了加锁这种同步方式之外的另一种保证多线程访问变量时的线程安全的方法**；如果每个线程对变量的访问都是基于**线程自己的变量**这样就不会存在线程不安全问题。

在Java的多线程编程中，为保证多个线程对共享变量的安全访问，通常会使用`synchronized`来保证同一时刻只有一个线程对共享变量进行操作。这种情况下其实还可以将变量放到`ThreadLocal`类型的对象中，使变量在每个线程中都有**独立拷贝**，**在一个线程中对变量的任何操作都不会影响到其它线程的变量**。在很多情况下，`ThreadLocal`比直接使用`synchronized`同步机制解决线程安全问题更简单，更方便，同时还能保证程序的性能。

## 3.2 ThreadLocal的实现原理

Java中的`ThreadLocal`是用哈希表实现的，每个线程里都有一个`ThreadLocalMap`属性，里面就以`Map`的形式存储了多个`ThreadLocal`对象。**当在线程中调用`ThreadLocal`操作方法时，都会通过当前`Thread`线程对象拿到线程里的`ThreadLocalMap`，再通过`ThreadLocal`对象从`ThreadLocalMap`中锁定数据实体（`ThreadLocalMap.Entry`）**。

## 3.3 ThreadLocal中的基本方法

`ThreadLocal`暴露了5个基本的操作和构造方法，主要的功能有：构造方法、设值方法、取值方法和资源回收；上面我们已经简单阐述了`ThreadLocal`的实现原理，这里我们再通过解析其中的代码来详细说说它是怎么做到线程隔离的。

### (1) ThreadLocal构造方法

`ThreadLocal`是一个泛型类，只提供了一个构造方法，通过泛型可以指定要存储的值的类型；这个构造方法通常可以单独使用，也可以配合`protected T initialValue()`方法 从而在实例化对象时提供一个初始值，因为这是一个`protected`方法，所以我们需要在实例化`ThreadLocal`对象时覆盖该方法：

```java
private static ThreadLocal<Integer> threadLocal = new ThreadLocal<Integer>() {
    @Override
    protected Integer initialValue() {
        return 5; // 这里设置期望的初始值
    }
};
```

当然这样未免太过繁琐了，代码也比较冗余！官方自然也考虑到了这一点，所以提供了一个静态的设置初始值的方法`withInitial`：

```java
public static <S> ThreadLocal<S> withInitial(Supplier<? extends S> supplier) {
        return new SuppliedThreadLocal<>(supplier);
}
```

有`Supplier`供给接口，这意味着我们可以使用如下方式设置初始值：

```java
private static ThreadLocal<Long> threadLocal1 = ThreadLocal.withInitial(() -> 1L);
```

这样的形式明显要优雅很多，但`SuppliedThreadLocal`又是个什么东西？其实它只是`ThreadLocal`类中一个简单的静态内部类罢了：

```java
static final class SuppliedThreadLocal<T> extends ThreadLocal<T> {
    private final Supplier<? extends T> supplier;
    SuppliedThreadLocal(Supplier<? extends T> supplier) {
        this.supplier = Objects.requireNonNull(supplier);
    }

    @Override // 这里通过覆盖ThreadLocal的initialValue方法设置初始值
    protected T initialValue() { return supplier.get(); }
}
```

### (2) 设值方法set

要保存的数据通过`set`方法设置，多次调用`set`方法并不会保存多个数据，而是发生覆盖，一个`ThreadLocal`正常只能保存一个数据：

```java
public void set(T value) {
    Thread t = Thread.currentThread(); // 获取当前线程
    ThreadLocalMap map = getMap(t); // 拿到当前线程中的ThreadLocalMap
    if (map != null) {
        map.set(this, value); // 线程中存在ThreadLocalMap，设值
    } else {
        createMap(t, value); // 线程中不存在ThreadLocalMap，创建后再设值
    }
}
```

### (3) 取值方法get

在没有使用`set`方法设值之前，调用`get`方法获取的将是`initialValue`方法设置的值（没有覆盖该方法返回就是`null`），否则返回的就是`set`方法设置的值。我们通过代码来解析其中的原理：

```java
public T get() {
    Thread t = Thread.currentThread(); // 获取当前线程
    ThreadLocalMap map = getMap(t); // 拿到当前线程保存的ThreadLocalMap
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this); // 这里传入的this就是当前的ThreadLocal对象，拿到ThreadLocal对应的值
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value; // 拿到ThreadLocal的值
            return result;
        }
    }
    return setInitialValue(); // 调用setInitialValue方法返回初始值
}
```

代码中的`getMap(t)`方法返回当前线程的`ThreadLocalMap`类型的变量：

```java
ThreadLocalMap getMap(Thread t) {
	return t.threadLocals; // 返回线程中的ThreadLocalMap
}
```

而`map.getEntry(this)`这里通过传入当前的`ThreadLocal`对象（线程`Thread`中有一个`ThreadLocalMap`类型属性，存储了多个`ThreadLocal`）拿到了`ThreadLocalMap.Entry`，它是`ThreadLocal`的静态内部类`ThreadLocalMap`的静态内部类，代码如下：

```java
static class ThreadLocalMap {
    static class Entry extends WeakReference<ThreadLocal<?>> {
        Object value;

        Entry(ThreadLocal<?> k, Object v) {
            super(k);
            value = v;
        }
    }
}
```

代码很简单，其实`ThreadLocal`就是通过这个类以弱引用的方式与`value`绑定在了一起，通过`ThreadLocal`对象就能获取到对应`ThreadLocal`中存储的值。

在我们还没有使用`set`方法为`ThreadLocal`设置值的情况下，`get`方法会返回`setInitialValue`方法的值，可以看看这个方法的具体实现：

```java
private T setInitialValue() {
    T value = initialValue(); // 这里获取初始值，如果我们有重写了initialValue方法的话就会返回设置的初始值
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        map.set(this, value); // 存在当前Thread对应的ThreadLocalMap，直接设值
    } else {
        createMap(t, value); // 不存在当前Thread对应的ThreadLocalMap，为当前线程创建一个ThreadLocalMap并设值
    }
    if (this instanceof TerminatingThreadLocal) {
        TerminatingThreadLocal.register((TerminatingThreadLocal<?>) this);
    }
    return value;
}
```

上面最主要的是`createMap`这个方法，它的作用是给传递的线程创建一个对应的`ThreadLocalMap`并把值存进去，可以看到新创建的`ThreadLocalMap`被赋值给了线程中的`threadLocals`变量，这也说明对应的数据都是存储在各个线程中的，所以每个线程对数据的操作自然不会影响其它线程的数据：

```java
void createMap(Thread t, T firstValue) {
	// this就是操作的ThreadLocal对象，firstValue就是要保存的值
	t.threadLocals = new ThreadLocalMap(this, firstValue); 
}
```

### (4) 资源回收remove

当我们不再需要保存的数据时，应该通过`remove`方法将当前线程中保存的值移除掉使对象得到`GC`（调用`remove`方法将把`ThreadLocal`对象从当前线程的`ThreadLocalMap`移除）：

```java
public void remove() {
    ThreadLocalMap m = getMap(Thread.currentThread()); // 拿到当前线程中的ThreadLocalMap
    if (m != null) {
        m.remove(this); // 从ThreadLocalMap移除key为当前ThreadLocal对象的记录
    }
}
```

调用`remove`方法会清空使用`set`方法设置的值，此时如果再次调用了`get`方法，由于`ThreadLocal`对应的记录已经不存在，所以将会执行`return setInitialValue();`这段代码，这里将会调用`initialValue`方法从而返回初始值。

## 3.4 ThreadLocal的使用

最后我们再结合一个小栗子来解释`ThreadLocal`在多线程下的表现：

```java
public class ThreadLocalDemo {
    
    private static ThreadLocal<Integer> threadLocal = new ThreadLocal<Integer>() {
        // 复写initialValue方法为ThreadLocal设置一个初始值，并获取调用了threadLocal的线程id
        @Override
        protected Integer initialValue() {
            System.out.println("当前的线程id：" + Thread.currentThread().getId());
            return 10;
        }
    };
    
    public static void main(String[] args) {
        // main方法就对应一个线程了，我们在主线程中对threadLocal的值进行修改
        System.out.println("～～～～～～～～～～～～主线程～～～～～～～～～～～～～");
        System.out.println("在主线程中获取threadLocal的值：" + threadLocal.get());
        threadLocal.set(100); // 改变threadLocal的值
        System.out.println("在主线程中再次获取threadLocal的值：" + threadLocal.get());
 
        System.out.println("～～～～～～～～～～～～新线程～～～～～～～～～～～～～");
        // 新创一个线程，并获取threadLocal的值
        new Thread(() -> System.out.println("在新的线程中获取threadLocal的值：" + threadLocal.get())).start();
    }
}
```

上面我们有一个静态的`threadLocal`变量，通过在`new`的时候覆盖`initialValue`方法（延迟加载，不会立即调用）为它设置了一个初始值10，并顺便在方法中输出使用`threadLocal`变量的线程的id，接着在获取了`threadLocal`的初始值后重新设置了一个数值100；在改变了`threadLocal`值的那个线程中确实看到了改变后的结果，然而在新线程中却有了“意料之外”的结果：



![0a56750ec81eada101c9409cf1d5d911.png](https://img-blog.csdnimg.cn/img_convert/0a56750ec81eada101c9409cf1d5d911.png)

之所以会有这样的结果其实因为`ThreadLocal`是线程隔离的，我们看到的是在操作同一个变量，但是Java会为每一个线程都创建一个`threadLocal`的副本变量，每个线程操作的其实都是属于它的那个副本变量，而不是公共的那个`threadLocal`；每个线程对`threadLocal`的任何操作都不会影响到其它线程的`threadLocal`！

上面我们通过覆盖`initialValue`方法为`threadLocal`设置了一个默认值，如果不设置初始值，那么获取到的值就是`null`，这是`ThreadLocal`的初始化方法决定的；

## 3.5 总结

其实`ThreadLocal`并没有那么的神秘莫测，但它在多线程编程中的地位却是毋庸置疑的，用好了`ThreadLocal`能够帮助你写出优雅简洁的多线程代码。在使用`synchronized`同步代码的时候，如果没法保证同步代码的（细）粒度，则会使得程序的性能下降，而使用`ThreadLocal`时完全不用考虑性能问题，因为没有了多线程的竞争，也就不用额外的同步判断等开销。总而言之，当**遇到多线程操作同一个共享变量需要保证线程安全**的时候，你应该首先考虑使用`ThreadLocal`而不是`synchronized`！