---
title: try catch含return的几种情况
createTime: 2024/11/17 00:32:16
permalink: /note_java/ym9hi21c/
---


## 0. 总结：

- 当 try 代码块和 catch 代码块中有 return 语句时，finally 仍然会被执行；
- 执行 try 代码块或 catch 代码块中的 return 语句之前，**都会先执行 finally 语句**；
- finally 代码块中的 return 语句会**覆盖 try 或 catch 中的 return**， finally 中最好不要出现 return；
- finally 中没有 return 语句的情况下，对变量进行修改：return 语句中是基本数据类型，则 finally 中对变量进行操作不会改变其值；return 语句中是引用数据类型，finally 中则会修改里面的数据；



## 1. 在try和catch中有return，finally中没有return，try发生异常

```java
public class Test {
    public static int num=1;
    public static void main(String[] args) throws ParseException {
        int result;
        result = num();
        System.out.println(result);
    }
    private static int num() {
        try{
            int b=4/0;
            return num = num+2;
        }catch(Exception e){
            return num = num+3;
        }finally {
        System.out.println("不管你怎么样，我都是要执行");    
        }        
    }    
}

输出内容为：
不管你怎么样，我都是要执行
4
```

**解释：**int b=4/0；发生了异常，直接进入catch的代码块中执行了return num = num+3；此时把返回的结果4。如果没有异常的话会执行try中的return，catch中的代码不会执行，但是无论怎样，finally中的代码都会执行。



## 2. 在try和catch中有return，finally中没有return，在finally中对try或catch中要 return数据进行操作

**（1）返回的数据为基本数据类型，则finally中对要返回数据操作无影响**

```java
public class Test {
    public static int num=1;
    public static void main(String[] args){
        int result;
        result = num();
        System.out.println(result);//结果不受finally影响，输出4
        System.out.println(num);//5
    }
    private static int num() {
        try{
            int b=4/0;
            return num = num+2; //3
        }catch(Exception e){
            return num = num+3;//4
        }finally {
            ++num; //4+1
        }        
    }    
}
```

**解释：**result的值为4的原因是，当执行到catch中的 return num = num+3;时，**已经把要返回的num的值存到了其他局部变量中**，在执行完finally中的++num;后，是从其他局部变量中获取的返回值，而不是直接返回num的值



**（2）返回的数据为引用数据类型，finally中如果改变了返回对象的属性则影响结果，如果改变的是对象的引用则和基本数据类型一样不改变结果**

```java
public class Test {
    public static void main(String[] args) {
        People bride;
        bride = marry();
        System.out.println(bride.getState());//结果受finally影响，输出dead
    }
    private static People marry() {
        People people=new People();
        people.setState("happy");;
        try{
            int b=4/0;
            return people;
        }catch(Exception e){
            return people;
        }finally {
            people.setState("dead");
        }        
    }    
}
```

**解释：**bride.getState()的结果为dead的原因是，当执行到catch中的return  people;时，把要返回people的内存地址存储起来，但是finally中对该内存地址对象的属性进行了更改，bride = marry();获取的内存地址对应的对象是更改属性后的people，所以属性值改变了。

改的是对象地址指向的数据



## 3.在try和catch中有return，finally中也有return

try或catch中return后面的代码会执行，但最终返回的结果为finally中return的值，需要注意的是try或catch中return后面的代码会执行，**只是存起来了，并没有返回**，让finally捷足先登先返回了。

```java
public class Test {
    public static int num=1;
    public static void main(String[] args) throws ParseException {
        int result;
        result = num();
        System.out.println(result);//输出结果为1003
        System.out.println(num);//输出结果为1001
    }
    private static int num() {
        try{
            int b=4/0;
            return num = num+1000;
        }catch(Exception e){
            return num = num+1000;
        }finally {
            return num+2;
        }        
    }    
}
```



## 4.在try中有return，在catch中新抛出异常，finally中有return

如果catch块中捕获了异常, 并且在catch块中将该异常throw给上级调用者进行处理, 但finally中有return, 那么catch块中的throw就失效了, 上级方法调用者是捕获不到异常

```java
public class Test {
    public static void main(String[] args) throws Exception {
        String result="";
        try {
            result = num();
        } catch (Exception e) {
            System.out.println("青天大老爷在此");
        }
        System.out.println(result);
    }
    public static String num() throws Exception {
        try{
            int b=4/0;
            return "总是异常，反正我又不会执行";
        }catch(Exception e){
            throw new Exception();
        }finally {
            return "用金钱蒙蔽你的双眼";
        }    
    }    
}

以上代码输出：

用金钱蒙蔽你的双眼

如果把finally里的return注释掉就会输出：
青天大老爷在此
```











