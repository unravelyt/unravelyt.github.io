---
title: Spring事务使用及失效场景
createTime: 2024/11/17 00:37:28
permalink: /note_java/c1m5yzus/
---





> 参考：
>
> https://blog.csdn.net/mccand1234/article/details/124571619
>
> https://blog.csdn.net/zzhongcy/article/details/102893309



# 一、事务定义

事务，就是一组操作数据库的动作集合。事务是现代数据库理论中的核心概念之一。如果一组处理步骤或者全部发生或者一步也不执行，我们称该组处理步骤为一个事务。当所有的步骤像一个操作一样被完整地执行，我们称该事务被提交。由于其中的一部分或多步执行失败，导致没有步骤被提交，则事务必须回滚到最初的系统状态。

## 1.事务特点ACID 

1.原子性(Atomicity)：一个事务中所有对数据库的操作是一个不可分割的操作序列，要么全做要么全不做

2.一致性(Consistency)：数据不会因为事务的执行而遭到破坏

3.隔离性(Isolation)：一个事物的执行，不受其他事务的干扰，即并发执行的事物之间互不干扰

4.持久性(Durability)：一个事物一旦提交，它对数据库的改变就是永久的。

## 2.spring事务

 Spring 为事务管理提供了丰富的功能支持。Spring 事务管理分为**编码式**和**声明式**的两种方式。

   （1）编程式事务指的是通过编码方式实现事务；

   （2）声明式事务基于 AOP,将具体业务逻辑与事务处理解耦。

   声明式事务管理使业务代码逻辑不受污染, 因此在实际使用中声明式事务用的比较多。

   声明式事务有两种方式：

     （1）一种是在配置文件（xml）中做相关的事务规则声明，

     （2）另一种是基于@Transactional 注解的方式。

## 3.开启事务

- 方式1：在 xml 配置中的事务配置信息

```xml
<tx:annotation-driven />
<bean id="transactionManager"
class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
	<property name="dataSource" ref="dataSource" />
</bean>
```

- 方式2：使用**@EnableTransactionManagement** 注解也可以启用事务管理功能

springboot通过DataSourceTransactionManagerAutoConfiguration类，已经默默的开启了事务

## 4.事务的传播行为

| **Propagation属性** | **含义**                                                     |
| ------------------- | ------------------------------------------------------------ |
| REQUIRED            | 默认值 在有transaction状态下执行；如当前没有transaction，则创建新的transaction； |
| SUPPORTS            | 如当前有transaction，则在transaction状态下执行；如果当前没有transaction，在无transaction状态下执行； |
| MANDATORY           | 必须在有transaction状态下执行，如果当前没有transaction，则抛出异常IllegalTransactionStateException； |
| REQUIRES_NEW        | 创建新的transaction并执行；如果当前已有transaction，则将当前transaction挂起； |
| NOT_SUPPORTED       | 在无transaction状态下执行；如果当前已有transaction，则将当前transaction挂起； |
| NEVER               | 在无transaction状态下执行；如果当前已有transaction，则抛出异常IllegalTransactionStateException； |
| NESTED              | 如果当前上下文中存在事务，则嵌套事务执行，如果不存在事务，则新建事务 |



## 5.事务的隔离级别

| 隔离级别         | 含义                                                         |
| :--------------- | :----------------------------------------------------------- |
| DEFAULT          | 这是一个PlatfromTransactionManager默认的隔离级别，使用数据库默认的事务隔离级别. 另外四个与JDBC的隔离级别相对应； |
| READ_UNCOMMITTED | 最低的隔离级别。事实上我们不应该称其为隔离级别，因为在事务完成前，其他事务可以看到该事务所修改的数据。而在其他事务提交前，该事务也可以看到其他事务所做的修改。可能导致脏，幻，不可重复读 |
| READ_COMMITTED   | 大多数数据库的默认级别。在事务完成前，其他事务无法看到该事务所修改的数据。遗憾的是，在该事务提交后，你就可以查看其他事务插入或更新的数据。这意味着在事务的不同点上，如果其他事务修改了数据，你就会看到不同的数据。可防止脏读，但幻读和不可重复读仍可以发生。 |
| REPEATABLE_READ  | 比ISOLATION_READ_COMMITTED更严格，该隔离级别确保如果在事务中查询了某个数据集，你至少还能再次查询到相同的数据集，即使其他事务修改了所查询的数据。然而如果其他事务插入了新数据，你就可以查询到该新插入的数据。可防止脏读，不可重复读，但幻读仍可能发生。 |
| SERIALIZABLE     | 完全服从ACID的隔离级别，**确保不发生脏读、不可重复读和幻影读**。这在所有隔离级别中也是最慢的，因为它通常是通过完全锁定当前事务所涉及的数据表来完成的。代价最大、可靠性最高的隔离级别，所有的事务都是按顺序一个接一个地执行。避免所有不安全读取。 |

 ## 6.事务并发会产生什么问题

| 术语       | 含义                                                         |
| :--------- | :----------------------------------------------------------- |
| 脏读       | **A事务读取到了B事务还未提交的数据，如果B未提交的事务回滚了，那么A事务读取的数据就是无效的，这就是数据脏读** |
| 不可重复读 | **在同一个事务中，多次读取同一数据返回的结果不一致，这是由于读取事务在进行操作的过程中，如果出现更新事务，它必须等待更新事务执行成功提交完成后才能继续读取数据，这就导致读取事务在前后读取的数据不一致的状况出现** |
| 幻读       | **A事务读取了几行记录后，B事务插入了新数据，并且提交了插入操作，在后续操作中A事务就会多出几行原本不存在的数据，就像A事务出现幻觉，这就是幻读** |

### 1）第一类丢失更新：

在**没有事务隔离**的情况下，两个事务都同时更新一行数据，但是第二个事务却中途失败退出， 导致对数据的两个修改都失效了。

例如：

张三的工资为5000，事务A中获取工资为5000，事务B获取工资为5000，汇入100，并提交数据库，工资变为5100，

随后

事务A发生异常，回滚了，恢复张三的工资为5000，这样就导致事务B的更新丢失了。

### 2）脏读：

脏读就是指当一个事务正在访问数据，并且对数据进行了修改，而这种修改还没有提交到数据库中，这时，另外一个事务也访问这个数据，然后使用了这个数据。
例如：
　　张三的工资为5000,事务A中把他的工资改为8000,但事务A尚未提交。
　　与此同时，
　　事务B正在读取张三的工资，读取到张三的工资为8000。
　　随后，
　　事务A发生异常，而回滚了事务。张三的工资又回滚为5000。
　　最后，
　　事务B读取到的张三工资为8000的数据即为脏数据，事务B做了一次脏读。

### 3）不可重复读：

是指在一个事务内，多次读同一数据。在这个事务还没有结束时，另外一个事务也访问该同一数据。那么，在第一个事务中的两次读数据之间，由于第二个事务的修改，那么第一个事务两次读到的的数据可能是不一样的。这样就发生了在一个事务内两次读到的数据是不一样的，因此称为是不可重复读。
例如：
　　在事务A中，读取到张三的工资为5000，操作没有完成，事务还没提交。
　　与此同时，
　　事务B把张三的工资改为8000，并提交了事务。
　　随后，
　　在事务A中，再次读取张三的工资，此时工资变为8000。在一个事务中前后两次读取的结果并不致，导致了不可重复读。

### 4）第二类丢失更新：

不可重复读的特例。
有两个并发事务同时读取同一行数据，然后其中一个对它进行修改提交，而另一个也进行了修改提交。这就会造成第一次写操作失效。

例如：

在事务A中，读取到张三的存款为5000，操作没有完成，事务还没提交。
　　与此同时，
　　事务B，存储1000，把张三的存款改为6000，并提交了事务。
　　随后，
　　在事务A中，存储500，把张三的存款改为5500，并提交了事务，这样事务A的更新覆盖了事务B的更新。

### 5）幻读：

是指当事务不是独立执行时发生的一种现象，例如第一个事务对一个表中的数据进行了修改，这种修改涉及到表中的全部数据行。同时，第二个事务也修改这个表中的数据，这种修改是向表中插入一行新数据。那么，以后就会发生操作第一个事务的用户发现表中还有没有修改的数据行，就好象发生了幻觉一样。
例如：
　　目前工资为5000的员工有10人，事务A读取所有工资为5000的人数为10人。
　　此时，
　　事务B插入一条工资也为5000的记录。
　　这是，事务A再次读取工资为5000的员工，记录为11人。此时产生了幻读。

**提醒：**
  不可重复读的重点是修改，同样的条件，你读取过的数据，再次读取出来发现值不一样了
  幻读的重点在于新增或者删除，同样的条件，第 1 次和第 2 次读出来的记录数不一样



# 二 、事务不生效【七种】

## 1.访问权限问题 (只有public方法会生效)

| 修饰范围  | 当前类 | 当前包 | 子类 | 其他类 |
| --------- | ------ | ------ | ---- | ------ |
| private   | Y      |        |      |        |
| default   | Y      | Y      |      |        |
| protected | Y      | Y      | Y    |        |
| public    | Y      | Y      | Y    | Y      |

1.private：Java中**private**修饰词修饰的变量，该变量**仅能在当前类内**访问，其他地方（如：当前包、子类、其他类）均无法访问。

2.default：默认情况下的变量（也就是没有public、private和protected修饰的变量），**既能在当前类内访问，又能在当前包（package）访问。**

3.protected：Java中用protected修饰的变量，**可在当前类访问，也可在当前包和子类（继承父类的子类）中访问。**

4.public：Java中使用public修饰的变量，**当前类、当前包、子类和其他类均可访问。**



众所周知，java的访问权限主要有四种：private、default、protected、public，它们的权限从左到右，依次变大。

但如果我们在开发过程中，把有某些事务方法，定义了错误的访问权限，就会导致事务功能出问题，例如：

```
@Service
public class UserService {
    @Transactional
    private void add(UserModel userModel) {
         saveData(userModel);
         updateData(userModel);
    }
}
```

我们可以看到add方法的访问权限被定义成了private，这样会导致事务失效，spring要求被代理方法必须得是public的。

说白了，在AbstractFallbackTransactionAttributeSource类的computeTransactionAttribute方法中有个判断，**如果目标方法不是public**，则TransactionAttribute返回null，即不支持事务。

```java
protected TransactionAttribute computeTransactionAttribute(Method method, @Nullable Class<?> targetClass) {
    // Don't allow no-public methods as required.可以看到， 这里不支持public类型的方法
    if (allowPublicMethodsOnly() && !Modifier.isPublic(method.getModifiers())) {
      return null;
    }

    // The method may be on an interface, but we need attributes from the target class.
    // If the target class is null, the method will be unchanged.
    Method specificMethod = AopUtils.getMostSpecificMethod(method, targetClass);

    // First try is the method in the target class.
    TransactionAttribute txAttr = findTransactionAttribute(specificMethod);
    if (txAttr != null) {
      return txAttr;
    }

    // Second try is the transaction attribute on the target class.
    txAttr = findTransactionAttribute(specificMethod.getDeclaringClass());
    if (txAttr != null && ClassUtils.isUserLevelMethod(method)) {
      return txAttr;
    }

    if (specificMethod != method) {
      // Fallback is to look at the original method.
      txAttr = findTransactionAttribute(method);
      if (txAttr != null) {
        return txAttr;
      }
      // Last fallback is the class of the original method.
      txAttr = findTransactionAttribute(method.getDeclaringClass());
      if (txAttr != null && ClassUtils.isUserLevelMethod(method)) {
        return txAttr;
      }
    }
    return null;
}
```

也就是说，如果我们自定义的事务方法（即目标方法），它的访问权限不是public，而是private、default或protected的话，spring则不会提供事务功能。

## 2.方法用final或者static修饰，不会生效

有时候，某个方法不想被子类重新，这时可以将该方法定义成final的。普通方法这样定义是没问题的，但如果将事务方法定义成final，例如：

```java
@Service
public class UserService {

    @Transactional
    public final void add(UserModel userModel){
        saveData(userModel);
        updateData(userModel);
    }
}
```

我们可以看到add方法被定义成了final的，这样会导致事务失效。

如果你看过spring事务的源码，可能会知道**spring事务底层使用了aop，也就是通过jdk动态代理或者cglib，帮我们生成了代理类，在代理类中实现的事务功能**。**但如果某个方法用final修饰了，那么在它的代理类中，就无法重写该方法**，而添加事务功能。

注意：如果某个方法是static的，同样无法通过动态代理，变成事务方法。

## 3.同一个类中的方法直接内部调用，会导致事务失效

由于@Transactional 的实现原理是AOP，AOP的实现原理是动态代理，换句话说，自调用时不存在代理对象的调用，这时不会产生我们注解@Transactional 配置的参数，自然无效了。

- 对于JDK动态代理

 因为JDK动态代理采用的是接口实现的方式，通过反射调用目标类的方法，此时如果调用本类的方法，this指的是目标类，并不是代理类所以不会走代理。不走代理，事务自然会失效。

- 对于cglib动态代理

 上文中分析jdk动态代理和cglib动态代理中发现，本类调用本类的方法，如果是cglib代理也会走代理，为什么spring [aop](https://so.csdn.net/so/search?q=aop&spm=1001.2101.3001.7020)中这里不会走代理，事务继续无效呢？

 原因是cglib的代理中我们使用的proxy.invokeSuper(obj,args)方法，他就会走代理，而我们的spring AOP中他是采用责任链的方式调用，相当于先将匹配到的Advisor执行完后，直接执行目标类方法，实际走的是类似与MethodBeforeAdviceInterceptor他的invoke方法，没有走invokeSuper方法就没有走cglib动态代理机制。直接执行的目标方法，没有通过代理。



有时候我们需要在某个Service类的某个方法中，调用另外一个事务方法，比如：

```java
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
  
  	//主方法没有事务注解
    public void add(UserModel userModel) {
        userMapper.insertUser(userModel);
        updateStatus(userModel);
    }

	//子方法有事务注解
    @Transactional
    public void updateStatus(UserModel userModel) {
        doSameThing();
    }
}
```

我们看到在事务方法add中，直接调用事务方法updateStatus。从前面介绍的内容可以知道，updateStatus方法拥有事务的能力是因为spring aop生成代理了对象，但是这种方法直接调用了this对象的方法，所以updateStatus方法不会生成事务。[根本原因](https://blog.csdn.net/yyoc97/article/details/81911744) [根本原因2](https://blog.csdn.net/mccand1234/article/details/124578233)

由此可见，在同一个类中的方法直接内部调用，会导致事务失效。

```java
/*
* 情况一：都有事务注解，异常在子方法出现，事务生效
*/
@Override
@Transactional
public Long addBook(Book book) {
    Long result = add(book);
    return result;
}

@Transactional
public Long add(Book book){
    Long result =  bookDao.addBook(book);
    int i = 1/0;
    return result;
}

/*
* 情况二：都有事务注解，异常在主方法出现，事务生效
*/
@Override
@Transactional
public Long addBook(Book book) {
    Long result = add(book);
    int i = 1/0;
    return result;
}

@Transactional
public Long add(Book book){
    Long result =  bookDao.addBook(book);
    return result;
}

/*
* 情况三：只有主方法有事务注解，异常在子方法出现，事务生效
*/
@Override
@Transactional
public Long addBook(Book book) {
    Long result = add(book);
    return result;
}

public Long add(Book book){
    Long result =  bookDao.addBook(book);
    int i = 1/0;
    return result;
}

/*
* 情况四：只有主方法有事务注解，异常在主方法出现，事务生效
*/
@Override
@Transactional
public Long addBook(Book book) {
    Long result = add(book);
    int i = 1/0;
    return result;
}

public Long add(Book book){
    Long result =  bookDao.addBook(book);
    return result;
}

/*
* 情况五：只有子方法有事务注解，异常在子方法出现，事务不生效
*/
@Override
public Long addBook(Book book) {
    Long result = add(book);
    return result;
}

@Transactional
public Long add(Book book){
    Long result =  bookDao.addBook(book);
    int i = 1/0;
    return result;
}
```

如果有些场景，确实想在同一个类的某个方法中，调用它自己的另外一个方法，该怎么办呢？

### 3.1 新加一个Service方法

这个方法非常简单，只需要新加一个Service方法，把**@Transactional**注解加到新Service方法上，把需要事务执行的代码移到新方法中。具体代码如下：

```java
@Servcie
public class ServiceA {
   @Autowired
   prvate ServiceB serviceB;

   public void save(User user) {
         queryData1();
         queryData2();
         serviceB.doSave(user);
   }
}

@Servcie
public class ServiceB {

    @Transactional(rollbackFor=Exception.class)
    public void doSave(User user) {
       addData1();
       updateData2();
    }
}
```

### 3.2 在该Service类中注入自己

如果不想再新加一个Service类，在该Service类中注入自己也是一种选择。具体代码如下：

```java
@Servcie
public class ServiceA {
   @Autowired
   prvate ServiceA serviceA;

   public void save(User user) {
         queryData1();
         queryData2();
         serviceA.doSave(user);
   }

   @Transactional(rollbackFor=Exception.class)
   public void doSave(User user) {
       addData1();
       updateData2();
   }
}
```

可能有些人可能会有这样的疑问：这种做法会不会出现循环依赖问题？

答案：不会。

其实spring ioc内部的[三级缓存](https://blog.csdn.net/mccand1234/article/details/116403266)保证了它，不会出现循环依赖问题。

### 3.3 通过AopContent类

在该Service类中使用AopContext.currentProxy()获取代理对象

上面的方法2确实可以解决问题，但是代码看起来并不直观，还可以通过在该Service类中使用AOPProxy获取代理对象，实现相同的功能。具体代码如下：

```java
@Servcie
public class ServiceA {

   public void save(User user) {
         queryData1();
         queryData2();
         ((ServiceA)AopContext.currentProxy()).doSave(user);
   }

   @Transactional(rollbackFor=Exception.class)
   public void doSave(User user) {
       addData1();
       updateData2();
   }
}
```

## 4.类本身未被spring管理

在我们平时开发过程中，有个细节很容易被忽略。即使用spring事务的前提是：对象要被spring管理，需要创建bean实例。

通常情况下，我们通过@Controller、@Service、@Component、@Repository等注解，可以自动实现bean实例化和依赖注入的功能。当然创建bean实例的方法还有很多，不一一说了。有兴趣的小伙伴可以参考这篇文章：@Autowired的这些骚操作，你都知道吗？

如下所示, 开发了一个Service类，但忘了加@Service注解，比如：

```java
//@Service
public class UserService {

    @Transactional
    public void add(UserModel userModel) {
         saveData(userModel);
         updateData(userModel);
    }    
}
```

从上面的例子，我们可以看到UserService类没有加@Service注解，那么该类不会交给spring管理，所以它的add方法也不会生成事务。

## 5.[多线程](https://blog.csdn.net/Evankaka/article/details/44153709)调用

在实际项目开发中，多线程的使用场景还是挺多的。如果spring事务用在多线程场景中，会有问题吗？

```java
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private RoleService roleService;

    @Transactional
    public void add(UserModel userModel) throws Exception {
        userMapper.insertUser(userModel);
        new Thread(() -> {
            roleService.doOtherThing();
        }).start();
    }
}

@Service
public class RoleService {

    @Transactional
    public void doOtherThing() {
        System.out.println("保存role表数据");
    }
}
```

从上面的例子中，我们可以看到事务方法add中，调用了事务方法doOtherThing，但是事务方法doOtherThing是在另外一个线程中调用的。

**这样会导致两个方法不在同一个线程中，获取到的数据库连接不一样，从而是两个不同的事务。如果想doOtherThing方法中抛了异常，add方法也回滚是不可能的。**

如果看过spring事务源码的朋友，可能会知道spring的事务是通过数据库连接来实现的。当前线程中保存了一个map，key是数据源，value是数据库连接。

```java
private static final ThreadLocal<Map<Object, Object>> resources =

new NamedThreadLocal<>("Transactional resources");
```

我们说的同一个事务，其实是指同一个数据库连接，只有拥有同一个数据库连接才能同时提交和回滚。如果在不同的线程，拿到的数据库连接肯定是不一样的，所以是不同的事务。

### 5.1 多线程控制事务



## 6.(存储引擎)表不支持事务

周所周知，在mysql5之前，默认的数据库引擎是myisam。

它的好处就不用多说了：索引文件和数据文件是分开存储的，对于查多写少的单表操作，性能比innodb更好。

有些老项目中，可能还在用它。

在创建表的时候，只需要把ENGINE参数设置成MyISAM即可：

```
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `one_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `two_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `three_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `four_category` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin

```

myisam好用，但有个很致命的问题是：**不支持事务**。

如果只是单表操作还好，不会出现太大的问题。但如果需要跨多张表操作，由于其不支持事务，数据极有可能会出现不完整的情况。

此外，myisam还不支持行锁和外键。

所以在实际业务场景中，myisam使用的并不多。在mysql5以后，myisam已经逐渐退出了历史的舞台，取而代之的是innodb。

有时候我们在开发的过程中，发现某张表的事务一直都没有生效，那不一定是spring事务的锅，最好确认一下你使用的那张表，是否支持事务。

## 7.未开启事务

有时候，事务没有生效的根本原因是没有开启事务。

你看到这句话可能会觉得好笑。

开启事务不是一个项目中，最最最基本的功能吗？

为什么还会没有开启事务？

没错，如果项目已经搭建好了，事务功能肯定是有的。

但如果你是在搭建项目demo的时候，只有一张表，而这张表的事务没有生效。那么会是什么原因造成的呢？

当然原因有很多，但没有开启事务，这个原因极其容易被忽略。

如果你使用的是springboot项目，那么你很幸运。**因为springboot通过DataSourceTransactionManagerAutoConfiguration类，已经默默的帮你开启了事务。**

你所要做的事情很简单，只需要配置spring.datasource相关参数即可。

但如果你使用的还是传统的spring项目，则需要在applicationContext.xml文件中，手动配置事务相关参数。如果忘了配置，事务肯定是不会生效的。

具体配置如下信息：

```xml
<!-- 配置事务管理器 --> 
<bean class="org.springframework.jdbc.datasource.DataSourceTransactionManager" id="transactionManager"> 
    <property name="dataSource" ref="dataSource"></property> 
</bean> 
<tx:advice id="advice" transaction-manager="transactionManager"> 
    <tx:attributes> 
        <tx:method name="*" propagation="REQUIRED"/>
    </tx:attributes> 
</tx:advice> 
<!-- 用切点把事务切进去 --> 
<aop:config> 
    <aop:pointcut expression="execution(* com.susan.*.*(..))" id="pointcut"/> 
    <aop:advisor advice-ref="advice" pointcut-ref="pointcut"/> 
</aop:config> 
```

默默的说一句，**如果在pointcut标签中的切入点匹配规则，配错了的话，有些类的事务也不会生效。**

# 三、事务不回滚【五种】

## 1.错误的传播特性

其实，我们在使用@Transactional注解时，是可以指定propagation参数的。

该参数的作用是指定事务的传播特性，spring目前支持7种传播特性：

| **Propagation属性** | **含义**                                                     |
| ------------------- | ------------------------------------------------------------ |
| REQUIRED            | 默认值 在有transaction状态下执行；如当前没有transaction，则创建新的transaction； |
| SUPPORTS            | 如当前有transaction，则在transaction状态下执行；如果当前没有transaction，在无transaction状态下执行； |
| MANDATORY           | 必须在有transaction状态下执行，如果当前没有transaction，则抛出异常IllegalTransactionStateException； |
| REQUIRES_NEW        | 创建新的transaction并执行；如果当前已有transaction，则将当前transaction挂起； |
| NOT_SUPPORTED       | 在无transaction状态下执行；如果当前已有transaction，则将当前transaction挂起； |
| NEVER               | 在无transaction状态下执行；如果当前已有transaction，则抛出异常IllegalTransactionStateException； |
| NESTED              | 如果当前上下文中存在事务，则嵌套事务执行，如果不存在事务，则新建事务 |



如果我们在手动设置propagation参数的时候，把传播特性设置错了，比如：

```java
@Service
public class UserService {

    @Transactional(propagation = Propagation.NEVER)
    public void add(UserModel userModel) {
        saveData(userModel);
        updateData(userModel);
    }
}
```

我们可以看到add方法的事务传播特性定义成了Propagation.NEVER，这种类型的传播特性不支持事务，如果有事务则会抛异常。

目前只有这三种传播特性才会创建新事务：REQUIRED，REQUIRES_NEW，NESTED。

## 2.自己吞了异常

事务不会回滚，最常见的问题是：开发者在代码中手动try…catch了异常。比如：

```java
@Slf4j
@Service
public class UserService {
    
    @Transactional
    public void add(UserModel userModel) {
        try {
            saveData(userModel);
            updateData(userModel);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

这种情况下spring事务当然不会回滚，因为开发者**自己捕获了异常**，又没有手动抛出，换句话说就是把异常吞掉了。

如果想要spring事务能够正常回滚，必须抛出它能够处理的异常。如果没有抛异常，则spring认为程序是正常的。



## 3.手动抛了别的异常

即使开发者没有手动捕获异常，但如果抛的异常不正确，spring事务也不会回滚。

```java
@Slf4j
@Service
public class UserService {
    @Transactional
    public void add(UserModel userModel) throws Exception {
        try {
			saveData(userModel);
			updateData(userModel);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new Exception(e);
        }
    }
}
```

上面的这种情况，开发人员自己捕获了异常，又手动抛出了异常：Exception，事务同样不会回滚。

**因为spring事务，默认情况下只会回滚RuntimeException（运行时异常）和Error（错误），对于普通的Exception[非运行时异常](https://blog.csdn.net/mccand1234/article/details/51579425)，它不会回滚。比如常见的IOExeption和SQLException。**

## 4.自定义了回滚异常

在使用@Transactional注解声明事务时，有时我们想自定义回滚的异常，spring也是支持的。可以通过设置rollbackFor参数，来完成这个功能。

但如果这个参数的值设置错了，就会引出一些莫名其妙的问题，例如：

```java
@Service
public class UserService {
    @Transactional(rollbackFor = BusinessException.class)
    public void add(UserModel userModel) throws Exception {
       saveData(userModel);
       updateData(userModel);
    }
}
```

如果在执行上面这段代码，保存和更新数据时，程序报错了，抛了SqlException、DuplicateKeyException等异常。而BusinessException是我们自定义的异常，报错的异常不属于BusinessException，所以事务也不会回滚。

即使rollbackFor有默认值，但阿里巴巴开发者规范中，还是要求开发者重新指定该参数。

因为如果使用默认值，一旦程序抛出了Exception，事务不会回滚，这会出现很大的bug。所以，建议一般情况下，将该参数设置成：Exception或Throwable。

## 5.嵌套事务回滚多了

```java
public class UserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleService roleService;

    @Transactional
    public void add(UserModel userModel) throws Exception {
        userMapper.insertUser(userModel);
        roleService.doOtherThing();
    }
}

@Service
public class RoleService {

    @Transactional(propagation = Propagation.NESTED)
    public void doOtherThing() {
        System.out.println("保存role表数据");
    }
}
```

这种情况使用了嵌套的内部事务，原本是希望调用roleService.doOtherThing方法时，如果出现了异常，只回滚doOtherThing方法里的内容，不回滚 userMapper.insertUser里的内容，即回滚保存点。但事实是，insertUser也回滚了。

因为doOtherThing方法出现了异常，**没有手动捕获**，会继续往上抛，到外层add方法的代理方法中捕获了异常。所以，这种情况是直接回滚了整个事务，不只回滚单个保存点。

怎么样才能只回滚保存点呢？

```
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleService roleService;

    @Transactional
    public void add(UserModel userModel) throws Exception {

        userMapper.insertUser(userModel);
        try {
            roleService.doOtherThing();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

可以将内部嵌套事务放在try/catch中，并且不继续往上抛异常。这样就能保证，如果内部嵌套事务中出现异常，只回滚内部事务，而不影响外部事务。

# 四、大事务与编程式事务

## 1. 大事务问题

在使用spring事务时，有个让人非常头疼的问题，就是大事务问题。
关于大事务可参考：[大事务问题](https://blog.csdn.net/mccand1234/article/details/124560532)



### 1.1 问题

通常情况下，我们会在方法上@Transactional注解，填加事务功能，比如：

```java
@Service
public class UserService {
    
    @Autowired 
    private RoleService roleService;
    
    @Transactional
    public void add(UserModel userModel) throws Exception {
       query1();
       query2();
       query3();
       roleService.save(userModel);
       update(userModel);
    }
}


@Service
public class RoleService {
    
    @Autowired 
    private RoleService roleService;
    
    @Transactional
    public void save(UserModel userModel) throws Exception {
       query4();
       query5();
       query6();
       saveData(userModel);
    }
}
```

但@Transactional注解，如果被加到方法上，有个缺点就是整个方法都包含在事务当中了。

上面的这个例子中，在UserService类中，其实只有这两行才需要事务：

```
roleService.save(userModel);
update(userModel);
```

在RoleService类中，只有这一行需要事务：

```
saveData(userModel);
```

现在的这种写法，会导致所有的query方法也被包含在同一个事务当中。

如果query方法非常多，调用层级很深，而且有部分查询方法比较耗时的话，会造成整个事务非常耗时，而从造成大事务问题。

### 2.解决方案

- 少用@Transactional注解，多用编程式事务
- 将查询(select)方法放到事务外
- 新加上一个service方法，把@Transactional注解加到新Service方法上，把需要事务执行的代码移到新方法中
- 在该Service类中注入自己
- 在该Service类中使用AopContext.currentProxy()获取代理对象

```java
@Servcie
public class ServiceA {
    public void save(User user) {
        queryData1();
        queryData2();
        ((ServiceA)AopContext.currentProxy()).doSave(user);
    }

    @Transactional(rollbackFor=Exception.class)
    public void doSave(User user) {
        addData1();
        updateData2();
    }
}
```

- 事务中避免一次性处理太多数据，可以采用分批处理
- 非事务处理，在使用事务之前，应该思考一下，是不是所有的数据库操作都需要在事务中执行
- 异步处理

## 2. 声明式事务

 默认情况下，数据库处于自动提交模式。每一条语句处于一个单独的事务中，在这条语句执行完毕时，如果执行成功则隐式的提交事务，如果执行失败则隐式的回滚事务。

​    对于正常的事务管理，是一组相关的操作处于一个事务之中，因此必须关闭数据库的自动提交模式。不过，这个我们不用担心，spring会将底层连接的自动提交特性设置为false。也就是在使用spring进行事物管理的时候，spring会将是否自动提交设置为false，等价于JDBC中的 connection.setAutoCommit(false);，在执行完之后在进行提交，connection.commit(); 。

**@Transactional** 可以作用在**接口、类、类方法**。

- **作用于类**：当把@Transactional 注解放在类上时，表示所有该类的public方法都配置相同的事务属性信息。
- **作用于方法**：当类配置了@Transactional，方法也配置了@Transactional，方法的事务会覆盖类的事务配置信息。
- **作用于接口**：不推荐这种使用方法，因为一旦标注在Interface上并且配置了Spring AOP 使用CGLib动态代理，将会导致@Transactional注解失效

| 参 数 名 称            | 功 能 描 述                                                  |
| :--------------------- | :----------------------------------------------------------- |
| readOnly               | 该属性用于设置当前事务是否为只读事务，设置为true表示只读，false则表示可读写，默认值为false。例如：@Transactional(readOnly=true) |
| **rollbackFor**        | **rollbackFor   该属性用于设置需要进行回滚的异常类数组**，当方法中抛出指定异常数组中的异常时，则进行事务回滚。例如：指定单一异常类：@Transactional(rollbackFor=RuntimeException.class)指定多个异常类：@Transactional(rollbackFor={RuntimeException.class, Exception.class}) |
| rollbackForClassName   | 该属性用于设置需要进行回滚的异常类名称数组，当方法中抛出指定异常名称数组中的异常时，则进行事务回滚。例如：指定单一异常类名称@Transactional(rollbackForClassName=”RuntimeException”)指定多个异常类名称：@Transactional(rollbackForClassName={“RuntimeException”,”Exception”}) |
| **noRollbackFor**      | 该属性用于设置不需要进行回滚的异常类数组，当方法中抛出指定异常数组中的异常时，不进行事务回滚。例如：指定单一异常类：@Transactional(noRollbackFor=RuntimeException.class)指定多个异常类：@Transactional(noRollbackFor={RuntimeException.class, Exception.class}) |
| noRollbackForClassName | 该属性用于设置不需要进行回滚的异常类名称数组，当方法中抛出指定异常名称数组中的异常时，不进行事务回滚。例如：指定单一异常类名称：@Transactional(noRollbackForClassName=”RuntimeException”)指定多个异常类名称：@Transactional(noRollbackForClassName={“RuntimeException”,”Exception”}) |
| **propagation**        | 该属性用于设置事务的传播行为。例如：@Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true) |
| **isolation**          | 该属性用于设置底层数据库的事务隔离级别，事务隔离级别用于处理多事务并发的情况，通常使用数据库的默认隔离级别即可，基本不需要进行设置 |
| timeout                | 该属性用于设置事务的超时秒数，默认值为-1表示永不超时事物超时设置: @Transactional(timeout=30) //默认是30秒 |

## 3. 编程式事务

### 3.1 TransactionTemplate

上面的这些内容都是基于@Transactional注解的，主要讲的是它的事务问题，我们把这种事务叫做：声明式事务。

其实，spring还提供了另外一种创建事务的方式，即通过手动编写代码实现的事务，我们把这种事务叫做：编程式事务。例如：

```java
@Autowired
private TransactionTemplate transactionTemplate;

public void save(final User user) {
    queryData1();
    queryData2();
    transactionTemplate.execute(transactionStatus -> {
        addData1();
        updateData2();
        return Boolean.TRUE;
    });
}
```

在spring中为了支持编程式事务，专门提供了一个类：TransactionTemplate，在它的execute方法中，就实现了事务的功能。

相较于@Transactional注解声明式事务，更建议大家使用，基于TransactionTemplate的编程式事务。主要原因如下：

- 避免由于spring [aop](https://so.csdn.net/so/search?q=aop&spm=1001.2101.3001.7020)问题，导致事务失效的问题。
- 能够更小粒度的控制事务的范围，更直观。
- 建议在项目中少使用@Transactional注解开启事务。但并不是说一定不能用它，如果项目中有些业务逻辑比较简单，而且不经常变动，使用@Transactional注解开启事务开启事务也无妨，因为它更简单，开发效率更高，但是千万要小心事务失效的问题。



### 3.2 手动回滚（进行try/catch，回滚并抛出）

```java
@Transactional(rollbackFor=MyException.class,noRollbackFor=RuntimeException.class)
public void updateUser(User user){
    try{
        dao.update(user);
    }catch(MyException e){
        //------//其他操作
        //捕获异常后进行回滚
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
    }
}
```

### 3.3 回滚部分异常

```java
//使用Object savePoint = TransactionAspectSupport.currentTransactionStatus().createSavepoint(); 设置回滚点。

//使用TransactionAspectSupport.currentTransactionStatus().rollbackToSavepoint(savePoint);回滚到savePoint。

@Override
@Transactional(rollbackFor = Exception.class)
public Object submitOrder (){  
    success();  
    //只回滚以下异常，
    Object savePoint = TransactionAspectSupport.currentTransactionStatus().createSavepoint();
    try {  
        exception(); 
     } catch (Exception e) {  
        e.printStackTrace();     
//手工回滚异常
TransactionAspectSupport.currentTransactionStatus().rollbackToSavepoint(savePoint);
        return ApiReturnUtil.error();
     }  
    return ApiReturnUtil.success();
}
```



### 3.4 使用DataSourceTransactionManager

```
PlatformTransactionManager 事务管理器
TransactionDefinition 事务的一些基础信息，如超时时间、隔离级别、传播属性等
TransactionStatus 事务的一些状态信息，如是否一个新的事务、是否已被标记为回滚
```

1. **PlatformTransactionManager**

```java
public interface PlatformTransactionManager {
    //根据事务定义TransactionDefinition，获取事务
    TransactionStatus getTransaction(TransactionDefinition definition);
    //提交事务
    void commit(TransactionStatus status);
    //回滚事务
    void rollback(TransactionStatus status);
}
```

2. **事务定义接口TransactionDefinition**

```java
//事务的定义包括: 事务的隔离级别，事务的传播属性，超时时间设置，是否只读事务的隔离级别是数据库本身的事务功能，事务的播属性则是spring为我们提供的功能
//该接口的实现DefaultTransactionDefinition,默认的事务定义

public class DefaultTransactionDefinition implements TransactionDefinition, 	Serializable {
    private int propagationBehavior = PROPAGATION_REQUIRED;
    private int isolationLevel = ISOLATION_DEFAULT;
    private int timeout = TIMEOUT_DEFAULT;
    private boolean readOnly = false;
    //略
} 
```

- 1.事务的传播属性为PROPAGATION_REQUIRED，即当前没有事务的时候，创建一个，如果有则使用当前事务
- 2.事务的隔离级别采用底层数据库默认的隔离级别
- 3.超时时间采用底层数据库默认的超时时间
- 4.是否只读为false

3. **事务接口定义 TransactionStatus**

TransactionStatus它继承了SavepointManager接口，SavepointManager是对事务中上述保存点功能的封装，如下：

```java
public interface SavepointManager {
    Object createSavepoint() throws TransactionException;
    void rollbackToSavepoint(Object savepoint) throws TransactionException;
    void releaseSavepoint(Object savepoint) throws TransactionException;
}
```

TransactionStatus本身更多存储的是事务的一些状态信息 是否是一个新的事物 是否有保存点 是否已被标记为回滚

整个流程:

```java
@Autowired
private PlatformTransactionManager transactionManager;

// 手动开启事务
TransactionStatus status = null;

status = transactionManager.getTransaction(new DefaultTransactionDefinition());

// 事务提交
transactionManager.commit(status);

// 事务回滚
if (StringMoreUtils.checkValNotNull(status)) {
    transactionManager.rollback(status);
}
```

springboot 开启事务以及手动提交事务，可以在服务类上加上两个注解

1. 手动开启事务
   TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
2. 手动提交事务
   dataSourceTransactionManager.commit(transactionStatus);
3. 手动回滚事务, 最好是放在catch 里面,防止程序异常而事务一直卡在哪里未提交
   dataSourceTransactionManager.rollback(transactionStatus);

```java
@Autowired
private TransactionDefinition transactionDefinition;

@Autowired
private PlatformTransactionManager platformTransactionManager;

@Test
void updateEmpanelItemTran() {

    TransactionStatus transaction = platformTransactionManager.getTransaction(transactionDefinition);
    try {
        t1();
        t2();
        platformTransactionManager.commit(transaction);
        System.out.println("提交成功。。。");
    } catch (Exception e) {
        e.printStackTrace();
        System.out.println("进入了异常。。。");
        platformTransactionManager.rollback(transaction);
    }
}
```







## 异常

**默认配置下，spring只有在抛出的异常为运行时unchecked异常时才回滚该事务，也就是抛出的异常为RuntimeException的子类(Errors也会导致事务回滚)，而抛出checked异常则不会导致事务回滚。**

异常的继承结构：

- Throwable为基类，Error和Exception继承Throwable。
- Error和RuntimeException及其子类成为未检查异常（unchecked）
- 其它异常成为已检查异常（checked）。



![](https://images2015.cnblogs.com/blog/805308/201704/805308-20170407134736253-1566741718.jpg)

























