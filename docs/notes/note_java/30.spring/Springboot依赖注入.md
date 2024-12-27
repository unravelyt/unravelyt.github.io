---
title: SpringBoot依赖注入
createTime: 2024/12/25 17:51:51
permalink: /note_java/p9p781kr/
---

依赖注入分为Spring和Springboot依赖注入

## Springboot依赖注入

### 1. Field 注入/属性注入

通过Java的反射机制实现，所以private的成员也可以被注入具体的对象

```java
@Controller
public class UserController {

    @Autowired
    private UserService userService;

}

```
**优点：**
- 代码少，简洁明了。
- 新增依赖十分方便，不需要修改原有代码

**缺点：**
- 容易出现空指针异常。Field 注入允许构建对象实例时依赖的对象为空，导致空指针异常不能在启动时就爆出来，只能在用到它时才发现。
空指针异常不是必现的，与bean的实例化顺序有关。有时，把依赖的bean改个名字就会报空指针异常。
- 会出现循环依赖的隐患。

### 2. set注入
Setter Injection需要依赖@Autowired注解，使用方式与Field Injection有所不同，Field Injection时@Autowired是用在成员变量上，
**而Setter Injection的时候，@Autowired是用在成员变量的Setter函数上。**

通过调用成员变量的set方法来注入想要使用的依赖对象。
```java
@Controller
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService){
        this.userService = userService;
    }
}

```


**优点：**
- 注入参数多的时候比较方便。构造器注入参数太多了，显得很笨重
- 能让类在之后重新配置或者重新注入。

**缺点：**
- 有一定风险。set注入是后初始化其依赖对象，如果一个对象在没有完全初始化就被外界使用是不安全的（尤其是在多线程场景下更加突出）。

### 3. 构造器注入
Constructor Injection是构造器注入，是Springboot最为推荐的一种使用方式。

```java
@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

}

```
**注意：**

- <p style="color: red;">不能提供无参构造方法，否则Springboot默认会加载无参的构造方法，Bean实例对象会为null</p>

- Springboot官方建议使用final来修饰成员变量，然后通过构造方法来进行注入。原因：final修饰的成员变量是不能够被修改的；不加final虽然也能注入Bean,但是若被其他人修改为null,可能会导致不必要的问题，所以最好是加final。

通过对象构建的时候建立关系，这种方式对对象创建的顺序会有要求，当然Spring会为你搞定这样的先后顺序，除非你出现循环依赖，然后就会抛出异常。

Spring 4.x 的时候，Spring 官方在对比构造器注入和 Setter 注入时，推荐使用构造器注入方式：

**优点：**

- 保证注入的组件不可变
- 确保需要的依赖不为空
- 解决循环依赖的问题(若有循环依赖会在项目启动时抛错)

能够保证注入的组件不可变，并且确保需要的依赖不为空。此外，构造器注入的依赖总是能够在返回客户端（组件）代码的时候保证完全初始化的状态。

若手工写构造方法觉得麻烦，也可以使用lombok中的 **@RequiredArgsConstructor**

```java
@RequiredArgsConstructor //注解是针对标有 @NonNull 注解的变量和 final 变量进行参数的构造方法。
public class VerifyController {

    private final UserService userService;
    private final StudentService studentService;
}
```


## Spring依赖注入

### 1. 构造器注入
构造器注入是最常见和推荐的依赖注入方式之一。
通过构造器注入，我们可以在创建一个Bean实例时，将其所需的依赖项作为构造函数的参数进行传递。Spring容器会负责解析依赖关系并创建Bean的实例

```java
public class ExampleService {
   
    private Dependency dependency;

    public ExampleService(Dependency dependency) {
        this.dependency = dependency;
    }

    // ...
}

```
在配置文件中，使用`<constructor-arg>`标签定义构造函数的参数：

```xml
<bean id="exampleService" class="com.example.ExampleService">
    <constructor-arg ref="dependency" />
</bean>

<bean id="dependency" class="com.example.Dependency" />

```

### 2. Setter方法注入
Setter方法注入是另一种常用的依赖注入方式。通过Setter方法注入，我们在Bean的类中定义对应的Setter方法，Spring容器会通过调用这些Setter方法来设置依赖项
```java
public class ExampleService {
    
    private Dependency dependency;

    public void setDependency(Dependency dependency) {
        this.dependency = dependency;
    }

    // ...
}

```
在配置文件中，使用`<property>`标签调用Setter方法：
```xml
<bean id="exampleService" class="com.example.ExampleService">
    <property name="dependency" ref="dependency" />
</bean>

<bean id="dependency" class="com.example.Dependency" />

```

### 3. 接口注入
除了构造器注入和Setter方法注入，Spring还支持通过接口注入来实现依赖注入。这种方式要求目标Bean实现特定的接口，并通过接口方法来设置依赖项。
```java
public interface DependencyInjection {
    void setDependency(Dependency dependency);
}

public class ExampleService implements DependencyInjection {
   
    private Dependency dependency;

    @Override
    public void setDependency(Dependency dependency) {
        this.dependency = dependency;
    }

    // ...
}

```
在配置文件中，使用`<bean>`标签定义Bean，并通过`<lookup-method>`标签指定接口方法：
```xml
<bean id="exampleService" class="com.example.ExampleService">
    <lookup-method name="setDependency" bean="dependency" />
</bean>

<bean id="dependency" class="com.example.Dependency" />

```

### 4. 自动装配（Autowiring）
自动装配是Spring框架提供的一种便捷的依赖注入方式。通过自动装配，Spring容器可以自动识别和解析Bean之间的依赖关系，
并将相应的依赖注入到目标Bean中。自动装配可以根据不同的规则进行，包括按类型、按名称、按注解等。
```java
public class ExampleService {
   
    @Autowired
    private Dependency dependency;
    // ...
}

```
在配置文件中，使用`<bean>`标签定义Bean，并设置autowire属性为对应的自动装配方式：
```xml
<bean id="exampleService" class="com.example.ExampleService" autowire="byType" />

<bean id="dependency" class="com.example.Dependency" />
```

### 5. 注解注入
Spring框架提供了多个注解用于依赖注入，简化了配置和代码的编写。常用的注解包括：

- @Autowired：自动装配依赖项。
- @Qualifier：在存在多个候选Bean时，指定要注入的具体Bean。
- @Resource：指定要注入的Bean，并可以通过名称或类型进行查找。
- @Value：注入简单的值，如基本类型、字符串等。
- @Inject：与@Autowired类似，用于依赖注入。
```java
public class ExampleService {
    @Autowired
    @Qualifier("dependency")
    private Dependency dependency;

    // ...
}
```
在配置文件中，使用<context:annotation-config>启用注解支持，并在需要注入的Bean上添加对应的注解：
```xml
<context:annotation-config />

<bean id="exampleService" class="com.example.ExampleService" />

<bean id="dependency" class="com.example.Dependency" />

```

### 6. Java配置
除了XML配置，Spring还支持使用Java配置类来进行依赖注入。通过编写Java配置类，可以更加灵活地定义和管理Bean之间的依赖关系。
```java
@Configuration
public class AppConfig {
    @Bean
    public ExampleService exampleService() {
        ExampleService service = new ExampleService();
        service.setDependency(dependency());
        return service;
    }

    @Bean
    public Dependency dependency() {
        return new Dependency();
    }
}

```
在配置文件中，通过`<context:annotation-config>`启用注解支持，并使用`<bean>`标签引用Java配置类：
```xml
<context:annotation-config />

<bean class="com.example.AppConfig" />

```











