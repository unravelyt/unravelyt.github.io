---
title: Spring的常用注解
createTime: 2024/11/05 21:13:25
permalink: /note_java/yunl3qqx/
---



 https://blog.csdn.net/guorui_java/article/details/107347754



> ttps://blog.csdn.net/guorui_java/article/details/107347754



> 原文：https://blog.csdn.net/guorui_java/article/details/107347754

## 一、Spring的常用注解

### 1、给容器中注入组件

（1）包扫描+组件标注注解

@Component：泛指各种组件

@Controller、@Service、@Repository都可以称为@Component。

@Controller：控制层

@Service：业务层

@Repository：数据访问层

（2）@Bean

导入第三方包里面的注解

（3）@Import

@Import(要导入到容器中的组件)；

```plain
@Import({Color.class, MyImportSelector.class, MyImportBeanDefinitionRegistrar.class})
public class MainConfig2 {
    @Scope("prototype")
    @Bean("person")
    public Person person() {
        System.out.println("我是Person");
        return new Person("素小暖",25);
    }
}
```

@ImportSelector：返回需要导入的组件的全类名数组；

```plain
public class MyImportSelector implements ImportSelector {
    //返回值就是导入容器的组件全类目
    // AnnotationMetadata 当前标注@Import注解的类的所有注解信息
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        //importingClassMetadata.get
        return new String[]{"com.atguigu.bean.Blue","com.atguigu.bean.Red"}

    }
}
```

@ImportBeanDefinitionRegistrar：手动注册bean到容器中；

```plain
public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    /*
    * AnnotationMetadata：当前类的注解信息
    * BeanDefinitionRegistry：BeanDefinition注册类
    * 把所有需要添加到容器中的bean，调用BeanDefinitionRegistry.registerBeanDefinition手动注入
    *
    * */

    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        boolean definition = registry.containsBeanDefinition("com.atguigu.bean.Red");
        boolean definition2 = registry.containsBeanDefinition("com.atguigu.bean.Blue");
        if(definition && definition2){
            //指定bean定义信息（bean的类型，bean的scope）
            RootBeanDefinition rootBeanDefinition = new RootBeanDefinition(RainBow.class);
            //注册一个bean，指定bean名
            registry.registerBeanDefinition("rainBow",rootBeanDefinition);
        }
    }

}
```

（4）使用spring提供的FactoryBean（工厂Bean）

- 默认获取到的是工厂Bean调用getObject创建的对象
- 要获取工厂Bean本身，需要在id前面加一个&

```plain
@Bean
public ColorFactoryBean colorFactoryBean(){
    return new ColorFactoryBean();
}
//创建一个spring定义的FactoryBean

public class ColorFactoryBean implements FactoryBean<Color> {
    //返回一个Color对象，并将Color添加到容器中
    public Color getObject() throws Exception {
        System.out.println("ColorFactoryBean,getObject()");
        return new Color();
    }

    public Class<?> getObjectType() {
        return Color.class;
    }

    public boolean isSingleton() {
        return false;
    }
}
```

### 2、注入bean的注解

@Autowired：由bean提供

- @Autowired可以作用在变量、setter方法、构造函数上；
- 有个属性为required，可以配置为false；

@Inject：由JSR-330提供

- @Inject用法和@Autowired一样。

@Resource：由JSR-250提供

@Autowired、@Inject是默认按照类型匹配的，@Resource是按照名称匹配的，@Autowired如果需要按照名称匹配需要和@Qualifier一起使用，@Inject和@Name一起使用。

@Primary

让spring进行自动装配的时候，默认使用首选的bean，和@Qualifier一个效果。

### 3、@JsonIgnore

（1）作用

在json序列化时将java bean中的一些属性忽略掉，序列化和反序列化都受影响。

（2）使用方法

一般标记在属性或者方法上，返回的json数据即不包含该属性。

（3）注解失效

如果注解失效，可能是因为你使用的是fastJson，尝试使用对应的注解来忽略字段，注解为：@JSONField(serialize = false)，使用方法一样。

### 4、初始化和销毁方法

（1）通过@Bean(initMethod="init",destoryMethod="destory")方法

（2）通过bean实现InitializingBean来定义初始化逻辑，DisposableBean定义销毁逻辑

（3）可以使用JSR250：@PostConstruct：初始化方法；@PreDestory：销毁方法。

（4）BeanPostProcessor：bean的后置处理器，在bean初始化前后进行一些处理工作

postProcessBeforeInitialization：在初始化之前工作；

postProcessAfterInitialization：在初始化工作之后工作；

### 5、Java配置类相关注解

@Configuration

声明当前类为配置类；

@Bean

注解在方法上，声明当前方法的返回值为一个bean，替代xml中的方式；

@ComponentScan

用于对Component进行扫描；

### 6、切面（AOP）相关注解

[Spring AOP详细介绍](https://blog.csdn.net/JinXYan/article/details/89302126)

Spring支持AspectJ的注解式切面编程。

@Aspect 声明一个切面

@After 在方法执行之后执行（方法上）

@Before 在方法执行之前执行（方法上）

@Around 在方法执行之前与之后执行（方法上）

@PointCut 声明切点

在java配置类中使用@EnableAspectJAutoProxy注解开启Spring对AspectJ代理的支持

### 7、@Bean的属性支持

@Scope设置类型包括：

设置Spring容器如何新建Bean实例（方法上，得有@Bean）

① Singleton

（单例,一个Spring容器中只有一个bean实例，默认模式）,

② Protetype

（每次调用新建一个bean）,

③ Request

（web项目中，给每个http request新建一个bean）,

④ Session

（web项目中，给每个http session新建一个bean）,

⑤ GlobalSession

（给每一个 global http session新建一个Bean实例）

### 8、@Value注解

（1）支持如下方式的注入：

- 注入普通字符
- 注入操作系统属性
- 注入表达式结果
- 注入其它bean属性
- 注入文件资源
- 注入网站资源
- 注入配置文件

（2）@Value三种情况的用法。

1. ${}是去找外部配置的参数，将值赋过来
2. \#{}是SpEL表达式，去寻找对应变量的内容
3. \#{}直接写字符串就是将字符串的值注入进去

### 9、环境切换

@Profile

指定组件在哪个环境的情况下才能被注册到容器中，不指定，任何环境下都能注册这个组件。

@Conditional

通过实现Condition接口，并重写matches方法，从而决定该bean是否被实例化。

### 10、异步相关

@EnableAsync

配置类中通过此注解开启对异步任务的支持；

@Async

在实际执行的bean方法使用该注解来声明其是一个异步任务（方法上或类上所有的方法都将异步，需要@EnableAsync开启异步任务）

### 11、定时任务相关

@EnableScheduling

在配置类上使用，开启计划任务的支持（类上）

@Scheduled

来申明这是一个任务，包括cron,fixDelay,fixRate等类型（方法上，需先开启计划任务的支持）

### 12、Enable***注解说明

这些注解主要是用来开启对xxx的支持：

- @EnableAspectAutoProxy：开启对AspectJ自动代理的支持；
- @EnableAsync：开启异步方法的支持；
- @EnableScheduling：开启计划任务的支持；
- @EnableWebMvc：开启web MVC的配置支持；
- @EnableConfigurationProperties：开启对@ConfigurationProperties注解配置Bean的支持；
- @EnableJpaRepositories：开启对SpringData JPA Repository的支持；
- @EnableTransactionManagement：开启注解式事务的支持；
- @EnableCaching：开启注解式的缓存支持；

### 13、测试相关注解

@RunWith

运行器，Spring中通常用于对JUnit的支持

@ContextConfiguration

用来加载配置配置文件，其中classes属性用来加载配置类。

```plain
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:/*.xml"})
public class CDPlayerTest {

}
```

@ContextConfiguration这个注解通常与@RunWith(SpringJUnit4ClassRunner.class)联合使用用来测试。

@ContextConfiguration括号里的locations = {"classpath*:/*.xml"}就表示将classpath路径里所有的xml文件都包括进来，自动扫描的bean就可以拿到，此时就可以在测试类中使用@Autowired注解来获取之前自动扫描包下的所有bean。

### 14、@EqualsAndHashCode

任意类的定义都可以添加@EqualsAndHashCode注解，让lombok帮你生成equals(Object other)和hashCode()方法的实现。默认情况下会使用非静态和非transient型字段来生成，但是你也通过在字段上添加 @EqualsAndHashCode.Include 或者@EqualsAndHashCode.Exclude 修改你使用的字段（甚至指定各种方法的输出）。或者你也可以通过在类上使用 @EqualsAndHashCode(onlyExplicitlyIncluded = true) ，且在特定字段或特定方法上添加 @EqualsAndHashCode.Include 来指定他们。

如果将@EqualsAndHashCode添加到继承于另一个类的类上，这个功能会有点棘手。一般情况下，为这样的类自动生成equals和hashCode方法是一个坏思路，因为超类也有定义了一些字段，他们也需要equals/hashCode方法但是不会自动生成。通过设置callSuper=true，可以在生成的equals和hashCode方法里包含超类的方法。对于hashCode，·super.hashCode()·会被包含在hash算法内，而对于equals，如果超类实现认为它与传入的对象不一致则会返回false。注意：并非所有的equals都能正确的处理这样的情况。然而刚好lombok可以，若超类也使用lombok来生成equals方法，那么你可以安全的使用它的equals方法。如果你有一个明确的超类, 你得在callSuper上提供一些值来表示你已经斟酌过，要不然的话就会产生一条警告信息。

当你的类没有继承至任何类（非java.lang.Object, 当然任何类都是继承于Object类的），而你却将callSuer置为true, 这会产生编译错误（译者注： java: Generating equals/hashCode with a supercall to java.lang.Object is pointless. ）。因为这会使得生成的equals和hashCode方法实现只是简单的继承至Object类的方法，只有相同的对象并且相同的hashCode才会判定他们相等。若你的类继承至另一个类又没有设置callSuper, 则会产品一个告警，因为除非超类没有（或者没有跟相等相关的）字段，否则lombok无法为你生成考虑超类声明字段的实现。

### 15、XmlAccessorType

类级别的注解

定义这个类中何种类型需要映射到XML。

1. XmlAccessType.FIELD：映射这个类中的所有字段到XML
2. XmlAccessType.PROPERTY：映射这个类中的属性（get/set方法）到XML
3. XmlAccessType.PUBLIC_MEMBER：将这个类中的所有public的field或property同时映射到XML（默认）
4. XmlAccessType.NONE：不映射

### 16、@SuppressWarnings

Suppress 抑制；镇压；废止 Warnings警告 

@SuppressWarnings("resource")是J2SE 提供的一个批注。该批注的作用是给编译器一条指令，告诉它对被批注的代码元素内部的某些警告保持静默。

@SuppressWarnings 批注允许您选择性地取消特定代码段（即，类或方法）中的警告。其中的想法是当您看到警告时，您将调查它，如果您确定它不是问题，您就可以添加一个 @SuppressWarnings 批注，以使您不会再看到警告。虽然它听起来似乎会屏蔽潜在的错误，但实际上它将提高代码安全性，因为它将防止您对警告无动于衷 — 您看到的每一个警告都将值得注意。

## 二、SpringMVC常用注解

### 1、@EnableWebMvc

在配置类中开启Web MVC的配置支持。

### 2、@Controller

### 3、@RequestMapping

用于映射web请求，包括访问路径和参数。

### 4、@ResponseBody

支持将返回值放到response内，而不是一个页面，通常用户返回json数据。

### 5、@RequestBody

允许request的参数在request体中，而不是在直接连接的地址后面。（放在参数前）

### 6、@PathVariable

用于接收路径参数，比如@RequestMapping(“/hello/{name}”)声明的路径，将注解放在参数前，即可获取该值，通常作为Restful的接口实现方法。

### 7、@RestController

该注解为一个组合注解，相当于@Controller和@ResponseBody的组合，注解在类上，意味着，该Controller的所有方法都默认加上了@ResponseBody。

### 8、@ControllerAdvice

- 全局异常处理
- 全局数据绑定
- 全局数据预处理

[ControllerAdvice的常用场景](https://blog.csdn.net/guorui_java/article/details/106883939)

### 9、@ExceptionHandler

用于全局处理控制器里的异常。

### 10、@InitBinder

用来设置WebDataBinder，WebDataBinder用来自动绑定前台请求参数到Model中。

### 11、@ModelAttribute

（1）@ModelAttribute注释方法 

如果把@ModelAttribute放在方法的注解上时，代表的是：该Controller的所有方法在调用前，先执行此@ModelAttribute方法。可以把这个@ModelAttribute特性，应用在BaseController当中，所有的Controller继承BaseController，即可实现在调用Controller时，先执行@ModelAttribute方法。比如权限的验证（也可以使用Interceptor）等。

（2）@ModelAttribute注释一个方法的参数 

当作为方法的参数使用，指示的参数应该从模型中检索。如果不存在，它应该首先实例化，然后添加到模型中，一旦出现在模型中，参数字段应该从具有匹配名称的所有请求参数中填充。

![img](https://cdn.nlark.com/yuque/0/2023/png/2476458/1672677820922-9fa961bd-2e66-479e-9cbc-772faaa796f8.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/2476458/1672677820854-0f278180-81c0-432f-a4a3-6cc7ed2072bf.png)

hellorWord方法的userLogin参数的值来源于getUserLogin()方法中的model属性。

### 12、@Transactional 

@Transactional 注解放在类级别时，表示所有该类的公共方法都配置相同的事务属性信息。EmployeeService 的所有方法都支持事务并且是只读。当类级别配置了@Transactional，方法级别也配置了@Transactional，应用程序会以方法级别的事务属性信息来管理事务，换言之，方法级别的事务属性信息会覆盖类级别的相关配置信息。

```plain
@Transactional(propagation= Propagation.SUPPORTS,readOnly=true)
@Service(value ="employeeService")
public class EmployeeService
```

@Transactional 注解的属性信息

| **属性名**       | **说明**                                                     |
| ---------------- | ------------------------------------------------------------ |
| name             | 当在配置文件中有多个 TransactionManager , 可以用该属性指定选择哪个事务管理器。 |
| propagation      | 事务的传播行为，默认值为 REQUIRED。                          |
| isolation        | 事务的隔离度，默认值采用 DEFAULT。                           |
| timeout          | 事务的超时时间，默认值为-1。如果超过该时间限制但事务还没有完成，则自动回滚事务。 |
| read-only        | 指定事务是否为只读事务，默认值为 false；为了忽略那些不需要事务的方法，比如读取数据，可以设置 read-only 为 true。 |
| rollback-for     | 用于指定能够触发事务回滚的异常类型，如果有多个异常类型需要指定，各类型之间可以通过逗号分隔。 |
| no-rollback- for | 抛出 no-rollback-for 指定的异常类型，不回滚事务。            |

## 三、其它注解

### 1、@JsonIgnore

（1）作用

在json序列化时将java bean中的一些属性忽略掉，序列化和反序列化都受影响。

（2）使用方法

一般标记在属性或者方法上，返回的json数据即不包含该属性。

（3）注解失效

如果注解失效，可能是因为你使用的是fastJson，尝试使用对应的注解来忽略字段，注解为：@JSONField(serialize = false)，使用方法一样。

### 2、@Schema

@schema注解标注在class上，表示此类对应的数据库表对应的schema。

可以用如下语句判断某个实体类上是否带有@schema注解，从而得到schema。

bean.getClass().isAnnotationPresent(Schema.class)

## 四、json常用注解

### 1、@JsonIgnoreProperties

此注解是类注解，作用是json序列化时将java bean中的一些属性忽略掉，序列化和反序列化都受影响。

写法将此标签加在user类的类名上 ，可以多个属性也可以单个属性。

```plain
//生成json时将name和age属性过滤
@JsonIgnoreProperties({"name"},{"age"})
public class  user {
    private  String name;
    private int age;
}
```

### 2、@JsonIgnore

此注解用于属性或者方法上（最好是属性上），作用和上面的@JsonIgnoreProperties一样。

```plain
//生成json 时不生成age 属性
public class user {
    private String name;
    
    @JsonIgnore
    private int age;
}
```

### 3、@JsonFormat

此注解用于属性或者方法上（最好是属性上），可以方便的把Date类型直接转化为我们想要的模式，比如：

```plain
public class User{
    @JsonFormat(pattern = “yyyy-MM-dd HH-mm-ss”)
    private Date date;
}
```

### 4、@JsonSerialize

此注解用于属性或者getter方法上，用于在序列化时嵌入我们自定义的代码，比如序列化一个double时在其后面限制两位小数点。

### 5、@JsonDeserialize

此注解用于属性或者setter方法上，用于在反序列化时可以嵌入我们自定义的代码，类似于上面的@JsonSerialize

### 6、@Transient

如果一个属性并非数据库表的字段映射，就务必将其标示为@Transient，否则ORM框架默认其注解为@Basic；

### 7、@JsonIgnoreType

标注在类上，当其他类有该类作为属性时，该属性将被忽略。

### 8、@JsonProperty

@JsonProperty 可以指定某个属性和json映射的名称。例如我们有个json字符串为{“user_name”:”aaa”}，而java中命名要遵循驼峰规则，则为userName，这时通过@JsonProperty 注解来指定两者的映射规则即可。这个注解也比较常用。

```plain
public class SomeEntity {
    @JsonProperty("user_name")
    private String userName;
}
```

### 9、只在序列化情况下生效的注解

@JsonPropertyOrder

在将 java pojo 对象序列化成为 json 字符串时，使用 @JsonPropertyOrder 可以指定属性在 json 字符串中的顺序。

@JsonInclude

在将 java pojo 对象序列化成为 json 字符串时，使用 @JsonInclude 注解可以控制在哪些情况下才将被注解的属性转换成 json，例如只有属性不为 null 时。

@JsonInclude(JsonInclude.Include.NON_NULL)

这个注解放在类头上，返给前端的json里就没有null类型的字段，即实体类与json互转的时候 属性值为null的不参与序列化。另外还有很多其它的范围，例如 NON_EMPTY、NON_DEFAULT等

### 10、在反序列化情况下生效的注解

@JsonSetter

@JsonSetter 标注于 setter 方法上，类似 @JsonProperty ，也可以解决 json 键名称和 java pojo 字段名称不匹配的问题。


 
