"use strict";(self.webpackChunkunravely_blog=self.webpackChunkunravely_blog||[]).push([[7420],{8137:(e,n,a)=>{a.r(n),a.d(n,{comp:()=>l,data:()=>p});var s=a(6254);const i={},l=(0,a(1021).A)(i,[["render",function(e,n){return(0,s.uX)(),(0,s.CE)("div",null,n[0]||(n[0]=[(0,s.Fv)('<p>https://blog.csdn.net/guorui_java/article/details/107347754</p><blockquote><p>ttps://blog.csdn.net/guorui_java/article/details/107347754</p></blockquote><blockquote><p>原文：https://blog.csdn.net/guorui_java/article/details/107347754</p></blockquote><h2 id="一、spring的常用注解" tabindex="-1"><a class="header-anchor" href="#一、spring的常用注解"><span>一、Spring的常用注解</span></a></h2><h3 id="_1、给容器中注入组件" tabindex="-1"><a class="header-anchor" href="#_1、给容器中注入组件"><span>1、给容器中注入组件</span></a></h3><p>（1）包扫描+组件标注注解</p><p>@Component：泛指各种组件</p><p>@Controller、@Service、@Repository都可以称为@Component。</p><p>@Controller：控制层</p><p>@Service：业务层</p><p>@Repository：数据访问层</p><p>（2）@Bean</p><p>导入第三方包里面的注解</p><p>（3）@Import</p><p>@Import(要导入到容器中的组件)；</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>@Import({Color.class, MyImportSelector.class, MyImportBeanDefinitionRegistrar.class})</span></span>\n<span class="line"><span>public class MainConfig2 {</span></span>\n<span class="line"><span>    @Scope(&quot;prototype&quot;)</span></span>\n<span class="line"><span>    @Bean(&quot;person&quot;)</span></span>\n<span class="line"><span>    public Person person() {</span></span>\n<span class="line"><span>        System.out.println(&quot;我是Person&quot;);</span></span>\n<span class="line"><span>        return new Person(&quot;素小暖&quot;,25);</span></span>\n<span class="line"><span>    }</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@ImportSelector：返回需要导入的组件的全类名数组；</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public class MyImportSelector implements ImportSelector {</span></span>\n<span class="line"><span>    //返回值就是导入容器的组件全类目</span></span>\n<span class="line"><span>    // AnnotationMetadata 当前标注@Import注解的类的所有注解信息</span></span>\n<span class="line"><span>    public String[] selectImports(AnnotationMetadata importingClassMetadata) {</span></span>\n<span class="line"><span>        //importingClassMetadata.get</span></span>\n<span class="line"><span>        return new String[]{&quot;com.atguigu.bean.Blue&quot;,&quot;com.atguigu.bean.Red&quot;}</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>    }</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@ImportBeanDefinitionRegistrar：手动注册bean到容器中；</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {</span></span>\n<span class="line"><span>    /*</span></span>\n<span class="line"><span>    * AnnotationMetadata：当前类的注解信息</span></span>\n<span class="line"><span>    * BeanDefinitionRegistry：BeanDefinition注册类</span></span>\n<span class="line"><span>    * 把所有需要添加到容器中的bean，调用BeanDefinitionRegistry.registerBeanDefinition手动注入</span></span>\n<span class="line"><span>    *</span></span>\n<span class="line"><span>    * */</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {</span></span>\n<span class="line"><span>        boolean definition = registry.containsBeanDefinition(&quot;com.atguigu.bean.Red&quot;);</span></span>\n<span class="line"><span>        boolean definition2 = registry.containsBeanDefinition(&quot;com.atguigu.bean.Blue&quot;);</span></span>\n<span class="line"><span>        if(definition &amp;&amp; definition2){</span></span>\n<span class="line"><span>            //指定bean定义信息（bean的类型，bean的scope）</span></span>\n<span class="line"><span>            RootBeanDefinition rootBeanDefinition = new RootBeanDefinition(RainBow.class);</span></span>\n<span class="line"><span>            //注册一个bean，指定bean名</span></span>\n<span class="line"><span>            registry.registerBeanDefinition(&quot;rainBow&quot;,rootBeanDefinition);</span></span>\n<span class="line"><span>        }</span></span>\n<span class="line"><span>    }</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）使用spring提供的FactoryBean（工厂Bean）</p><ul><li>默认获取到的是工厂Bean调用getObject创建的对象</li><li>要获取工厂Bean本身，需要在id前面加一个&amp;</li></ul><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>@Bean</span></span>\n<span class="line"><span>public ColorFactoryBean colorFactoryBean(){</span></span>\n<span class="line"><span>    return new ColorFactoryBean();</span></span>\n<span class="line"><span>}</span></span>\n<span class="line"><span>//创建一个spring定义的FactoryBean</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>public class ColorFactoryBean implements FactoryBean&lt;Color&gt; {</span></span>\n<span class="line"><span>    //返回一个Color对象，并将Color添加到容器中</span></span>\n<span class="line"><span>    public Color getObject() throws Exception {</span></span>\n<span class="line"><span>        System.out.println(&quot;ColorFactoryBean,getObject()&quot;);</span></span>\n<span class="line"><span>        return new Color();</span></span>\n<span class="line"><span>    }</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>    public Class&lt;?&gt; getObjectType() {</span></span>\n<span class="line"><span>        return Color.class;</span></span>\n<span class="line"><span>    }</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>    public boolean isSingleton() {</span></span>\n<span class="line"><span>        return false;</span></span>\n<span class="line"><span>    }</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、注入bean的注解" tabindex="-1"><a class="header-anchor" href="#_2、注入bean的注解"><span>2、注入bean的注解</span></a></h3><p>@Autowired：由bean提供</p><ul><li>@Autowired可以作用在变量、setter方法、构造函数上；</li><li>有个属性为required，可以配置为false；</li></ul><p>@Inject：由JSR-330提供</p><ul><li>@Inject用法和@Autowired一样。</li></ul><p>@Resource：由JSR-250提供</p><p>@Autowired、@Inject是默认按照类型匹配的，@Resource是按照名称匹配的，@Autowired如果需要按照名称匹配需要和@Qualifier一起使用，@Inject和@Name一起使用。</p><p>@Primary</p><p>让spring进行自动装配的时候，默认使用首选的bean，和@Qualifier一个效果。</p><h3 id="_3、-jsonignore" tabindex="-1"><a class="header-anchor" href="#_3、-jsonignore"><span>3、@JsonIgnore</span></a></h3><p>（1）作用</p><p>在json序列化时将java bean中的一些属性忽略掉，序列化和反序列化都受影响。</p><p>（2）使用方法</p><p>一般标记在属性或者方法上，返回的json数据即不包含该属性。</p><p>（3）注解失效</p><p>如果注解失效，可能是因为你使用的是fastJson，尝试使用对应的注解来忽略字段，注解为：@JSONField(serialize = false)，使用方法一样。</p><h3 id="_4、初始化和销毁方法" tabindex="-1"><a class="header-anchor" href="#_4、初始化和销毁方法"><span>4、初始化和销毁方法</span></a></h3><p>（1）通过@Bean(initMethod=&quot;init&quot;,destoryMethod=&quot;destory&quot;)方法</p><p>（2）通过bean实现InitializingBean来定义初始化逻辑，DisposableBean定义销毁逻辑</p><p>（3）可以使用JSR250：@PostConstruct：初始化方法；@PreDestory：销毁方法。</p><p>（4）BeanPostProcessor：bean的后置处理器，在bean初始化前后进行一些处理工作</p><p>postProcessBeforeInitialization：在初始化之前工作；</p><p>postProcessAfterInitialization：在初始化工作之后工作；</p><h3 id="_5、java配置类相关注解" tabindex="-1"><a class="header-anchor" href="#_5、java配置类相关注解"><span>5、Java配置类相关注解</span></a></h3><p>@Configuration</p><p>声明当前类为配置类；</p><p>@Bean</p><p>注解在方法上，声明当前方法的返回值为一个bean，替代xml中的方式；</p><p>@ComponentScan</p><p>用于对Component进行扫描；</p><h3 id="_6、切面-aop-相关注解" tabindex="-1"><a class="header-anchor" href="#_6、切面-aop-相关注解"><span>6、切面（AOP）相关注解</span></a></h3><p><a href="https://blog.csdn.net/JinXYan/article/details/89302126" target="_blank" rel="noopener noreferrer">Spring AOP详细介绍</a></p><p>Spring支持AspectJ的注解式切面编程。</p><p>@Aspect 声明一个切面</p><p>@After 在方法执行之后执行（方法上）</p><p>@Before 在方法执行之前执行（方法上）</p><p>@Around 在方法执行之前与之后执行（方法上）</p><p>@PointCut 声明切点</p><p>在java配置类中使用@EnableAspectJAutoProxy注解开启Spring对AspectJ代理的支持</p><h3 id="_7、-bean的属性支持" tabindex="-1"><a class="header-anchor" href="#_7、-bean的属性支持"><span>7、@Bean的属性支持</span></a></h3><p>@Scope设置类型包括：</p><p>设置Spring容器如何新建Bean实例（方法上，得有@Bean）</p><p>① Singleton</p><p>（单例,一个Spring容器中只有一个bean实例，默认模式）,</p><p>② Protetype</p><p>（每次调用新建一个bean）,</p><p>③ Request</p><p>（web项目中，给每个http request新建一个bean）,</p><p>④ Session</p><p>（web项目中，给每个http session新建一个bean）,</p><p>⑤ GlobalSession</p><p>（给每一个 global http session新建一个Bean实例）</p><h3 id="_8、-value注解" tabindex="-1"><a class="header-anchor" href="#_8、-value注解"><span>8、@Value注解</span></a></h3><p>（1）支持如下方式的注入：</p><ul><li>注入普通字符</li><li>注入操作系统属性</li><li>注入表达式结果</li><li>注入其它bean属性</li><li>注入文件资源</li><li>注入网站资源</li><li>注入配置文件</li></ul><p>（2）@Value三种情况的用法。</p><ol><li>${}是去找外部配置的参数，将值赋过来</li><li>#{}是SpEL表达式，去寻找对应变量的内容</li><li>#{}直接写字符串就是将字符串的值注入进去</li></ol><h3 id="_9、环境切换" tabindex="-1"><a class="header-anchor" href="#_9、环境切换"><span>9、环境切换</span></a></h3><p>@Profile</p><p>指定组件在哪个环境的情况下才能被注册到容器中，不指定，任何环境下都能注册这个组件。</p><p>@Conditional</p><p>通过实现Condition接口，并重写matches方法，从而决定该bean是否被实例化。</p><h3 id="_10、异步相关" tabindex="-1"><a class="header-anchor" href="#_10、异步相关"><span>10、异步相关</span></a></h3><p>@EnableAsync</p><p>配置类中通过此注解开启对异步任务的支持；</p><p>@Async</p><p>在实际执行的bean方法使用该注解来声明其是一个异步任务（方法上或类上所有的方法都将异步，需要@EnableAsync开启异步任务）</p><h3 id="_11、定时任务相关" tabindex="-1"><a class="header-anchor" href="#_11、定时任务相关"><span>11、定时任务相关</span></a></h3><p>@EnableScheduling</p><p>在配置类上使用，开启计划任务的支持（类上）</p><p>@Scheduled</p><p>来申明这是一个任务，包括cron,fixDelay,fixRate等类型（方法上，需先开启计划任务的支持）</p><h3 id="_12、enable-注解说明" tabindex="-1"><a class="header-anchor" href="#_12、enable-注解说明"><span>12、Enable***注解说明</span></a></h3><p>这些注解主要是用来开启对xxx的支持：</p><ul><li>@EnableAspectAutoProxy：开启对AspectJ自动代理的支持；</li><li>@EnableAsync：开启异步方法的支持；</li><li>@EnableScheduling：开启计划任务的支持；</li><li>@EnableWebMvc：开启web MVC的配置支持；</li><li>@EnableConfigurationProperties：开启对@ConfigurationProperties注解配置Bean的支持；</li><li>@EnableJpaRepositories：开启对SpringData JPA Repository的支持；</li><li>@EnableTransactionManagement：开启注解式事务的支持；</li><li>@EnableCaching：开启注解式的缓存支持；</li></ul><h3 id="_13、测试相关注解" tabindex="-1"><a class="header-anchor" href="#_13、测试相关注解"><span>13、测试相关注解</span></a></h3><p>@RunWith</p><p>运行器，Spring中通常用于对JUnit的支持</p><p>@ContextConfiguration</p><p>用来加载配置配置文件，其中classes属性用来加载配置类。</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>@RunWith(SpringJUnit4ClassRunner.class)</span></span>\n<span class="line"><span>@ContextConfiguration(locations = {&quot;classpath*:/*.xml&quot;})</span></span>\n<span class="line"><span>public class CDPlayerTest {</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@ContextConfiguration这个注解通常与@RunWith(SpringJUnit4ClassRunner.class)联合使用用来测试。</p><p>@ContextConfiguration括号里的locations = {&quot;classpath*😕*.xml&quot;}就表示将classpath路径里所有的xml文件都包括进来，自动扫描的bean就可以拿到，此时就可以在测试类中使用@Autowired注解来获取之前自动扫描包下的所有bean。</p><h3 id="_14、-equalsandhashcode" tabindex="-1"><a class="header-anchor" href="#_14、-equalsandhashcode"><span>14、@EqualsAndHashCode</span></a></h3><p>任意类的定义都可以添加@EqualsAndHashCode注解，让lombok帮你生成equals(Object other)和hashCode()方法的实现。默认情况下会使用非静态和非transient型字段来生成，但是你也通过在字段上添加 @EqualsAndHashCode.Include 或者@EqualsAndHashCode.Exclude 修改你使用的字段（甚至指定各种方法的输出）。或者你也可以通过在类上使用 @EqualsAndHashCode(onlyExplicitlyIncluded = true) ，且在特定字段或特定方法上添加 @EqualsAndHashCode.Include 来指定他们。</p><p>如果将@EqualsAndHashCode添加到继承于另一个类的类上，这个功能会有点棘手。一般情况下，为这样的类自动生成equals和hashCode方法是一个坏思路，因为超类也有定义了一些字段，他们也需要equals/hashCode方法但是不会自动生成。通过设置callSuper=true，可以在生成的equals和hashCode方法里包含超类的方法。对于hashCode，·super.hashCode()·会被包含在hash算法内，而对于equals，如果超类实现认为它与传入的对象不一致则会返回false。注意：并非所有的equals都能正确的处理这样的情况。然而刚好lombok可以，若超类也使用lombok来生成equals方法，那么你可以安全的使用它的equals方法。如果你有一个明确的超类, 你得在callSuper上提供一些值来表示你已经斟酌过，要不然的话就会产生一条警告信息。</p><p>当你的类没有继承至任何类（非java.lang.Object, 当然任何类都是继承于Object类的），而你却将callSuer置为true, 这会产生编译错误（译者注： java: Generating equals/hashCode with a supercall to java.lang.Object is pointless. ）。因为这会使得生成的equals和hashCode方法实现只是简单的继承至Object类的方法，只有相同的对象并且相同的hashCode才会判定他们相等。若你的类继承至另一个类又没有设置callSuper, 则会产品一个告警，因为除非超类没有（或者没有跟相等相关的）字段，否则lombok无法为你生成考虑超类声明字段的实现。</p><h3 id="_15、xmlaccessortype" tabindex="-1"><a class="header-anchor" href="#_15、xmlaccessortype"><span>15、XmlAccessorType</span></a></h3><p>类级别的注解</p><p>定义这个类中何种类型需要映射到XML。</p><ol><li>XmlAccessType.FIELD：映射这个类中的所有字段到XML</li><li>XmlAccessType.PROPERTY：映射这个类中的属性（get/set方法）到XML</li><li>XmlAccessType.PUBLIC_MEMBER：将这个类中的所有public的field或property同时映射到XML（默认）</li><li>XmlAccessType.NONE：不映射</li></ol><h3 id="_16、-suppresswarnings" tabindex="-1"><a class="header-anchor" href="#_16、-suppresswarnings"><span>16、@SuppressWarnings</span></a></h3><p>Suppress 抑制；镇压；废止 Warnings警告</p><p>@SuppressWarnings(&quot;resource&quot;)是J2SE 提供的一个批注。该批注的作用是给编译器一条指令，告诉它对被批注的代码元素内部的某些警告保持静默。</p><p>@SuppressWarnings 批注允许您选择性地取消特定代码段（即，类或方法）中的警告。其中的想法是当您看到警告时，您将调查它，如果您确定它不是问题，您就可以添加一个 @SuppressWarnings 批注，以使您不会再看到警告。虽然它听起来似乎会屏蔽潜在的错误，但实际上它将提高代码安全性，因为它将防止您对警告无动于衷 — 您看到的每一个警告都将值得注意。</p><h2 id="二、springmvc常用注解" tabindex="-1"><a class="header-anchor" href="#二、springmvc常用注解"><span>二、SpringMVC常用注解</span></a></h2><h3 id="_1、-enablewebmvc" tabindex="-1"><a class="header-anchor" href="#_1、-enablewebmvc"><span>1、@EnableWebMvc</span></a></h3><p>在配置类中开启Web MVC的配置支持。</p><h3 id="_2、-controller" tabindex="-1"><a class="header-anchor" href="#_2、-controller"><span>2、@Controller</span></a></h3><h3 id="_3、-requestmapping" tabindex="-1"><a class="header-anchor" href="#_3、-requestmapping"><span>3、@RequestMapping</span></a></h3><p>用于映射web请求，包括访问路径和参数。</p><h3 id="_4、-responsebody" tabindex="-1"><a class="header-anchor" href="#_4、-responsebody"><span>4、@ResponseBody</span></a></h3><p>支持将返回值放到response内，而不是一个页面，通常用户返回json数据。</p><h3 id="_5、-requestbody" tabindex="-1"><a class="header-anchor" href="#_5、-requestbody"><span>5、@RequestBody</span></a></h3><p>允许request的参数在request体中，而不是在直接连接的地址后面。（放在参数前）</p><h3 id="_6、-pathvariable" tabindex="-1"><a class="header-anchor" href="#_6、-pathvariable"><span>6、@PathVariable</span></a></h3><p>用于接收路径参数，比如@RequestMapping(“/hello/{name}”)声明的路径，将注解放在参数前，即可获取该值，通常作为Restful的接口实现方法。</p><h3 id="_7、-restcontroller" tabindex="-1"><a class="header-anchor" href="#_7、-restcontroller"><span>7、@RestController</span></a></h3><p>该注解为一个组合注解，相当于@Controller和@ResponseBody的组合，注解在类上，意味着，该Controller的所有方法都默认加上了@ResponseBody。</p><h3 id="_8、-controlleradvice" tabindex="-1"><a class="header-anchor" href="#_8、-controlleradvice"><span>8、@ControllerAdvice</span></a></h3><ul><li>全局异常处理</li><li>全局数据绑定</li><li>全局数据预处理</li></ul><p><a href="https://blog.csdn.net/guorui_java/article/details/106883939" target="_blank" rel="noopener noreferrer">ControllerAdvice的常用场景</a></p><h3 id="_9、-exceptionhandler" tabindex="-1"><a class="header-anchor" href="#_9、-exceptionhandler"><span>9、@ExceptionHandler</span></a></h3><p>用于全局处理控制器里的异常。</p><h3 id="_10、-initbinder" tabindex="-1"><a class="header-anchor" href="#_10、-initbinder"><span>10、@InitBinder</span></a></h3><p>用来设置WebDataBinder，WebDataBinder用来自动绑定前台请求参数到Model中。</p><h3 id="_11、-modelattribute" tabindex="-1"><a class="header-anchor" href="#_11、-modelattribute"><span>11、@ModelAttribute</span></a></h3><p>（1）@ModelAttribute注释方法</p><p>如果把@ModelAttribute放在方法的注解上时，代表的是：该Controller的所有方法在调用前，先执行此@ModelAttribute方法。可以把这个@ModelAttribute特性，应用在BaseController当中，所有的Controller继承BaseController，即可实现在调用Controller时，先执行@ModelAttribute方法。比如权限的验证（也可以使用Interceptor）等。</p><p>（2）@ModelAttribute注释一个方法的参数</p><p>当作为方法的参数使用，指示的参数应该从模型中检索。如果不存在，它应该首先实例化，然后添加到模型中，一旦出现在模型中，参数字段应该从具有匹配名称的所有请求参数中填充。</p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/2476458/1672677820922-9fa961bd-2e66-479e-9cbc-772faaa796f8.png" alt="img"></p><p><img src="https://cdn.nlark.com/yuque/0/2023/png/2476458/1672677820854-0f278180-81c0-432f-a4a3-6cc7ed2072bf.png" alt="img"></p><p>hellorWord方法的userLogin参数的值来源于getUserLogin()方法中的model属性。</p><h3 id="_12、-transactional" tabindex="-1"><a class="header-anchor" href="#_12、-transactional"><span>12、@Transactional</span></a></h3><p>@Transactional 注解放在类级别时，表示所有该类的公共方法都配置相同的事务属性信息。EmployeeService 的所有方法都支持事务并且是只读。当类级别配置了@Transactional，方法级别也配置了@Transactional，应用程序会以方法级别的事务属性信息来管理事务，换言之，方法级别的事务属性信息会覆盖类级别的相关配置信息。</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>@Transactional(propagation= Propagation.SUPPORTS,readOnly=true)</span></span>\n<span class="line"><span>@Service(value =&quot;employeeService&quot;)</span></span>\n<span class="line"><span>public class EmployeeService</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Transactional 注解的属性信息</p><table><thead><tr><th><strong>属性名</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>name</td><td>当在配置文件中有多个 TransactionManager , 可以用该属性指定选择哪个事务管理器。</td></tr><tr><td>propagation</td><td>事务的传播行为，默认值为 REQUIRED。</td></tr><tr><td>isolation</td><td>事务的隔离度，默认值采用 DEFAULT。</td></tr><tr><td>timeout</td><td>事务的超时时间，默认值为-1。如果超过该时间限制但事务还没有完成，则自动回滚事务。</td></tr><tr><td>read-only</td><td>指定事务是否为只读事务，默认值为 false；为了忽略那些不需要事务的方法，比如读取数据，可以设置 read-only 为 true。</td></tr><tr><td>rollback-for</td><td>用于指定能够触发事务回滚的异常类型，如果有多个异常类型需要指定，各类型之间可以通过逗号分隔。</td></tr><tr><td>no-rollback- for</td><td>抛出 no-rollback-for 指定的异常类型，不回滚事务。</td></tr></tbody></table><h2 id="三、其它注解" tabindex="-1"><a class="header-anchor" href="#三、其它注解"><span>三、其它注解</span></a></h2><h3 id="_1、-jsonignore" tabindex="-1"><a class="header-anchor" href="#_1、-jsonignore"><span>1、@JsonIgnore</span></a></h3><p>（1）作用</p><p>在json序列化时将java bean中的一些属性忽略掉，序列化和反序列化都受影响。</p><p>（2）使用方法</p><p>一般标记在属性或者方法上，返回的json数据即不包含该属性。</p><p>（3）注解失效</p><p>如果注解失效，可能是因为你使用的是fastJson，尝试使用对应的注解来忽略字段，注解为：@JSONField(serialize = false)，使用方法一样。</p><h3 id="_2、-schema" tabindex="-1"><a class="header-anchor" href="#_2、-schema"><span>2、@Schema</span></a></h3><p>@schema注解标注在class上，表示此类对应的数据库表对应的schema。</p><p>可以用如下语句判断某个实体类上是否带有@schema注解，从而得到schema。</p><p>bean.getClass().isAnnotationPresent(Schema.class)</p><h2 id="四、json常用注解" tabindex="-1"><a class="header-anchor" href="#四、json常用注解"><span>四、json常用注解</span></a></h2><h3 id="_1、-jsonignoreproperties" tabindex="-1"><a class="header-anchor" href="#_1、-jsonignoreproperties"><span>1、@JsonIgnoreProperties</span></a></h3><p>此注解是类注解，作用是json序列化时将java bean中的一些属性忽略掉，序列化和反序列化都受影响。</p><p>写法将此标签加在user类的类名上 ，可以多个属性也可以单个属性。</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>//生成json时将name和age属性过滤</span></span>\n<span class="line"><span>@JsonIgnoreProperties({&quot;name&quot;},{&quot;age&quot;})</span></span>\n<span class="line"><span>public class  user {</span></span>\n<span class="line"><span>    private  String name;</span></span>\n<span class="line"><span>    private int age;</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、-jsonignore" tabindex="-1"><a class="header-anchor" href="#_2、-jsonignore"><span>2、@JsonIgnore</span></a></h3><p>此注解用于属性或者方法上（最好是属性上），作用和上面的@JsonIgnoreProperties一样。</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>//生成json 时不生成age 属性</span></span>\n<span class="line"><span>public class user {</span></span>\n<span class="line"><span>    private String name;</span></span>\n<span class="line"><span>    </span></span>\n<span class="line"><span>    @JsonIgnore</span></span>\n<span class="line"><span>    private int age;</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、-jsonformat" tabindex="-1"><a class="header-anchor" href="#_3、-jsonformat"><span>3、@JsonFormat</span></a></h3><p>此注解用于属性或者方法上（最好是属性上），可以方便的把Date类型直接转化为我们想要的模式，比如：</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public class User{</span></span>\n<span class="line"><span>    @JsonFormat(pattern = “yyyy-MM-dd HH-mm-ss”)</span></span>\n<span class="line"><span>    private Date date;</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、-jsonserialize" tabindex="-1"><a class="header-anchor" href="#_4、-jsonserialize"><span>4、@JsonSerialize</span></a></h3><p>此注解用于属性或者getter方法上，用于在序列化时嵌入我们自定义的代码，比如序列化一个double时在其后面限制两位小数点。</p><h3 id="_5、-jsondeserialize" tabindex="-1"><a class="header-anchor" href="#_5、-jsondeserialize"><span>5、@JsonDeserialize</span></a></h3><p>此注解用于属性或者setter方法上，用于在反序列化时可以嵌入我们自定义的代码，类似于上面的@JsonSerialize</p><h3 id="_6、-transient" tabindex="-1"><a class="header-anchor" href="#_6、-transient"><span>6、@Transient</span></a></h3><p>如果一个属性并非数据库表的字段映射，就务必将其标示为@Transient，否则ORM框架默认其注解为@Basic；</p><h3 id="_7、-jsonignoretype" tabindex="-1"><a class="header-anchor" href="#_7、-jsonignoretype"><span>7、@JsonIgnoreType</span></a></h3><p>标注在类上，当其他类有该类作为属性时，该属性将被忽略。</p><h3 id="_8、-jsonproperty" tabindex="-1"><a class="header-anchor" href="#_8、-jsonproperty"><span>8、@JsonProperty</span></a></h3><p>@JsonProperty 可以指定某个属性和json映射的名称。例如我们有个json字符串为{“user_name”:”aaa”}，而java中命名要遵循驼峰规则，则为userName，这时通过@JsonProperty 注解来指定两者的映射规则即可。这个注解也比较常用。</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public class SomeEntity {</span></span>\n<span class="line"><span>    @JsonProperty(&quot;user_name&quot;)</span></span>\n<span class="line"><span>    private String userName;</span></span>\n<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、只在序列化情况下生效的注解" tabindex="-1"><a class="header-anchor" href="#_9、只在序列化情况下生效的注解"><span>9、只在序列化情况下生效的注解</span></a></h3><p>@JsonPropertyOrder</p><p>在将 java pojo 对象序列化成为 json 字符串时，使用 @JsonPropertyOrder 可以指定属性在 json 字符串中的顺序。</p><p>@JsonInclude</p><p>在将 java pojo 对象序列化成为 json 字符串时，使用 @JsonInclude 注解可以控制在哪些情况下才将被注解的属性转换成 json，例如只有属性不为 null 时。</p><p>@JsonInclude(JsonInclude.Include.NON_NULL)</p><p>这个注解放在类头上，返给前端的json里就没有null类型的字段，即实体类与json互转的时候 属性值为null的不参与序列化。另外还有很多其它的范围，例如 NON_EMPTY、NON_DEFAULT等</p><h3 id="_10、在反序列化情况下生效的注解" tabindex="-1"><a class="header-anchor" href="#_10、在反序列化情况下生效的注解"><span>10、在反序列化情况下生效的注解</span></a></h3><p>@JsonSetter</p><p>@JsonSetter 标注于 setter 方法上，类似 @JsonProperty ，也可以解决 json 键名称和 java pojo 字段名称不匹配的问题。</p>',196)]))}]]),p=JSON.parse('{"path":"/note_java/yunl3qqx/","title":"Spring的常用注解","lang":"zh-CN","frontmatter":{"title":"Spring的常用注解","createTime":"2024/11/05 21:13:25","permalink":"/note_java/yunl3qqx/","description":"https://blog.csdn.net/guorui_java/article/details/107347754 ttps://blog.csdn.net/guorui_java/article/details/107347754 原文：https://blog.csdn.net/guorui_java/article/details/10734...","head":[["meta",{"property":"og:url","content":"https://www.unravely.press/note_java/yunl3qqx/"}],["meta",{"property":"og:site_name","content":"Unravely"}],["meta",{"property":"og:title","content":"Spring的常用注解"}],["meta",{"property":"og:description","content":"https://blog.csdn.net/guorui_java/article/details/107347754 ttps://blog.csdn.net/guorui_java/article/details/107347754 原文：https://blog.csdn.net/guorui_java/article/details/10734..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.nlark.com/yuque/0/2023/png/2476458/1672677820922-9fa961bd-2e66-479e-9cbc-772faaa796f8.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-16T17:28:23.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-16T17:28:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring的常用注解\\",\\"image\\":[\\"https://cdn.nlark.com/yuque/0/2023/png/2476458/1672677820922-9fa961bd-2e66-479e-9cbc-772faaa796f8.png\\",\\"https://cdn.nlark.com/yuque/0/2023/png/2476458/1672677820854-0f278180-81c0-432f-a4a3-6cc7ed2072bf.png\\"],\\"dateModified\\":\\"2024-11-16T17:28:23.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"一、Spring的常用注解","slug":"一、spring的常用注解","link":"#一、spring的常用注解","children":[{"level":3,"title":"1、给容器中注入组件","slug":"_1、给容器中注入组件","link":"#_1、给容器中注入组件","children":[]},{"level":3,"title":"2、注入bean的注解","slug":"_2、注入bean的注解","link":"#_2、注入bean的注解","children":[]},{"level":3,"title":"3、@JsonIgnore","slug":"_3、-jsonignore","link":"#_3、-jsonignore","children":[]},{"level":3,"title":"4、初始化和销毁方法","slug":"_4、初始化和销毁方法","link":"#_4、初始化和销毁方法","children":[]},{"level":3,"title":"5、Java配置类相关注解","slug":"_5、java配置类相关注解","link":"#_5、java配置类相关注解","children":[]},{"level":3,"title":"6、切面（AOP）相关注解","slug":"_6、切面-aop-相关注解","link":"#_6、切面-aop-相关注解","children":[]},{"level":3,"title":"7、@Bean的属性支持","slug":"_7、-bean的属性支持","link":"#_7、-bean的属性支持","children":[]},{"level":3,"title":"8、@Value注解","slug":"_8、-value注解","link":"#_8、-value注解","children":[]},{"level":3,"title":"9、环境切换","slug":"_9、环境切换","link":"#_9、环境切换","children":[]},{"level":3,"title":"10、异步相关","slug":"_10、异步相关","link":"#_10、异步相关","children":[]},{"level":3,"title":"11、定时任务相关","slug":"_11、定时任务相关","link":"#_11、定时任务相关","children":[]},{"level":3,"title":"12、Enable***注解说明","slug":"_12、enable-注解说明","link":"#_12、enable-注解说明","children":[]},{"level":3,"title":"13、测试相关注解","slug":"_13、测试相关注解","link":"#_13、测试相关注解","children":[]},{"level":3,"title":"14、@EqualsAndHashCode","slug":"_14、-equalsandhashcode","link":"#_14、-equalsandhashcode","children":[]},{"level":3,"title":"15、XmlAccessorType","slug":"_15、xmlaccessortype","link":"#_15、xmlaccessortype","children":[]},{"level":3,"title":"16、@SuppressWarnings","slug":"_16、-suppresswarnings","link":"#_16、-suppresswarnings","children":[]}]},{"level":2,"title":"二、SpringMVC常用注解","slug":"二、springmvc常用注解","link":"#二、springmvc常用注解","children":[{"level":3,"title":"1、@EnableWebMvc","slug":"_1、-enablewebmvc","link":"#_1、-enablewebmvc","children":[]},{"level":3,"title":"2、@Controller","slug":"_2、-controller","link":"#_2、-controller","children":[]},{"level":3,"title":"3、@RequestMapping","slug":"_3、-requestmapping","link":"#_3、-requestmapping","children":[]},{"level":3,"title":"4、@ResponseBody","slug":"_4、-responsebody","link":"#_4、-responsebody","children":[]},{"level":3,"title":"5、@RequestBody","slug":"_5、-requestbody","link":"#_5、-requestbody","children":[]},{"level":3,"title":"6、@PathVariable","slug":"_6、-pathvariable","link":"#_6、-pathvariable","children":[]},{"level":3,"title":"7、@RestController","slug":"_7、-restcontroller","link":"#_7、-restcontroller","children":[]},{"level":3,"title":"8、@ControllerAdvice","slug":"_8、-controlleradvice","link":"#_8、-controlleradvice","children":[]},{"level":3,"title":"9、@ExceptionHandler","slug":"_9、-exceptionhandler","link":"#_9、-exceptionhandler","children":[]},{"level":3,"title":"10、@InitBinder","slug":"_10、-initbinder","link":"#_10、-initbinder","children":[]},{"level":3,"title":"11、@ModelAttribute","slug":"_11、-modelattribute","link":"#_11、-modelattribute","children":[]},{"level":3,"title":"12、@Transactional","slug":"_12、-transactional","link":"#_12、-transactional","children":[]}]},{"level":2,"title":"三、其它注解","slug":"三、其它注解","link":"#三、其它注解","children":[{"level":3,"title":"1、@JsonIgnore","slug":"_1、-jsonignore","link":"#_1、-jsonignore","children":[]},{"level":3,"title":"2、@Schema","slug":"_2、-schema","link":"#_2、-schema","children":[]}]},{"level":2,"title":"四、json常用注解","slug":"四、json常用注解","link":"#四、json常用注解","children":[{"level":3,"title":"1、@JsonIgnoreProperties","slug":"_1、-jsonignoreproperties","link":"#_1、-jsonignoreproperties","children":[]},{"level":3,"title":"2、@JsonIgnore","slug":"_2、-jsonignore","link":"#_2、-jsonignore","children":[]},{"level":3,"title":"3、@JsonFormat","slug":"_3、-jsonformat","link":"#_3、-jsonformat","children":[]},{"level":3,"title":"4、@JsonSerialize","slug":"_4、-jsonserialize","link":"#_4、-jsonserialize","children":[]},{"level":3,"title":"5、@JsonDeserialize","slug":"_5、-jsondeserialize","link":"#_5、-jsondeserialize","children":[]},{"level":3,"title":"6、@Transient","slug":"_6、-transient","link":"#_6、-transient","children":[]},{"level":3,"title":"7、@JsonIgnoreType","slug":"_7、-jsonignoretype","link":"#_7、-jsonignoretype","children":[]},{"level":3,"title":"8、@JsonProperty","slug":"_8、-jsonproperty","link":"#_8、-jsonproperty","children":[]},{"level":3,"title":"9、只在序列化情况下生效的注解","slug":"_9、只在序列化情况下生效的注解","link":"#_9、只在序列化情况下生效的注解","children":[]},{"level":3,"title":"10、在反序列化情况下生效的注解","slug":"_10、在反序列化情况下生效的注解","link":"#_10、在反序列化情况下生效的注解","children":[]}]}],"readingTime":{"minutes":13.56,"words":4069},"git":{"createdTime":1730863308000,"updatedTime":1731778103000,"contributors":[{"name":"banxia","email":"yutong9717@163.com","commits":1},{"name":"unravely","email":"yutong9717@163.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/note_java/30.spring/Spring的常用注解.md","bulletin":false}')}}]);