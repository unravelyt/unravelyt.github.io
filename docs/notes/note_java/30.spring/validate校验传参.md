---
title: validate注解校验传参
createTime: 2024/11/17 01:23:41
permalink: /note_java/omgxitxi/
---





## 1. 引入依赖

注：从`springboot-2.3`开始，校验包被独立成了一个`starter`组件，所以需要引入validation和web，而`springboot-2.3`之前的版本只需要引入 web 依赖就可以了。

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

或者也可以引入：

```java
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>8.0.0.CR3</version>
</dependency>
```



## 2. 简单的例子

### 2.1 例子

```java
@RestController
@Slf4j
@Validated //注意，当使用单参数校验时需要在Controller上加上@Validated注解，否则不生效。
public class ValidController {

    //RequestBody校验
    @PostMapping("/valid/test1")   
    public String test1(@Validated @RequestBody ValidVO validVO){
        log.info("validEntity is {}", validVO);
        return "test1 valid success";
    }

    //Form校验
    @PostMapping(value = "/valid/test2")
    public String test2(@Validated ValidVO validVO){
        log.info("validEntity is {}", validVO);
        return "test2 valid success";
    }
  
    //注意，当使用单参数校验时需要在Controller上加上@Validated注解，否则不生效。
    @PostMapping(value = "/valid/test3")
    public String test3(@Email String email){
        log.info("email is {}", email);
        return "email valid success";
    }
}
```

### 2.2 方法级别的单个参数校验

1、在方法所在的类上添加 @Validated 。注意，此处 只能使用 @Validated 注解 ，@Valid 无效 ，因为 @Valid 不能用在类上。

2、对方法中的每个参数上加上所需的验证注解，如 @Rang， @Max，@Min、自定义注解 等注解 ；

3、定义 ConstraintViolationException 的异常拦截器 （这是系统全局 捕获异常。也可以使用BindingResult 捕获）

```java
@Validated   //第1步，告诉MethodValidationPostProcessor此Bean需要开启方法级别验证支持
@RestController
public class ValidationController {

	@RequestMapping(value = "/validation/demo")
	public void demo1(
			@Range(min = 1, max = 9, message = "年级只能从1-9")   //第2步
			@RequestParam(name = "grade", required = true) int grade, //
			
			@Min(value = 1, message = "班级最小只能1") @Max(value = 99, message = "班级最大只能99")  //第2步
			@RequestParam(name = "classroom", required = true) int classroom) { //

		System.out.println(grade + "," + classroom);
	}
}
```





## 3. 全局异常处理器

@Valid 和 @Validated 的异常信息捕获必须使用 `BindingResult bindingResult` （如下示例）， 非常麻烦。

```java
public void saveAll(@Validated User user, BindingResult bindingResult){
	 if (bindingResult.hasErrors()) {
        for (ObjectError error : bindingResult.getAllErrors()) {
           ....
        }
    }
}
```



`Validator`校验框架返回的错误提示太臃肿了，不便于阅读，为了方便前端提示，我们需要将其简化一下。

直接修改之前定义的`RestExceptionHandler`，单独拦截参数校验的三个异常：`javax.validation.ConstraintViolationException`，`org.springframework.validation.BindException`，`org.springframework.web.bind.MethodArgumentNotValidException`

```java
@ExceptionHandler(value = {
	BindException.class,ValidationException.class,MethodArgumentNotValidException.class
})
public ResponseEntity<ResultData<String>> handleValidatedException(Exception e) {
  ResultData<String> resp = null;

  if (e instanceof MethodArgumentNotValidException) {
    // BeanValidation exception
    MethodArgumentNotValidException ex = (MethodArgumentNotValidException) e;
    resp = ResultData.fail(HttpStatus.BAD_REQUEST.value(),
                           ex.getBindingResult().getAllErrors().stream()
                           .map(ObjectError::getDefaultMessage)
                           .collect(Collectors.joining("; "))
                          );
  } else if (e instanceof ConstraintViolationException) {
    // BeanValidation GET simple param
    ConstraintViolationException ex = (ConstraintViolationException) e;
    resp = ResultData.fail(HttpStatus.BAD_REQUEST.value(),
                           ex.getConstraintViolations().stream()
                           .map(ConstraintViolation::getMessage)
                           .collect(Collectors.joining("; "))
                          );
  } else if (e instanceof BindException) {
    // BeanValidation GET object param
    BindException ex = (BindException) e;
    resp = ResultData.fail(HttpStatus.BAD_REQUEST.value(),
                           ex.getAllErrors().stream()
                           .map(ObjectError::getDefaultMessage)
                           .collect(Collectors.joining("; "))
                          );
  }

  return new ResponseEntity<>(resp,HttpStatus.BAD_REQUEST);
}
```



## 4. 嵌套验证

在实际的开发中，前台会后台传递一个list，我们不仅要限制每次请求list内的个数，同时还要对list内基本元素的属性值进行校验。这个时候就需要进行嵌套验证了，实现的方式很简单。在list上添加@Vaild就可以实现了。

```java
@Data
public class JsonRequestForm {
    
    @Vaild
    @Size(min = 1 ,max =  10 , message = "列表中的元素数量为1~10")
    private List<RequestForm> requestFormList;
    
}
```



## 5. 自定义参数校验

面对复杂的定义，我们还是需要自己定义相关注解来实现自动校验。比如实体类中的sex性别属性，只允许前端传递传 M，F 这2个枚举值

### 5.1 创建自定义注解

```java
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Repeatable(EnumString.List.class)
@Documented
@Constraint(validatedBy = EnumStringValidator.class)//标明由哪个类执行校验逻辑
public @interface EnumString {
    String message() default "value not in enum values.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    /**
     * @return date must in this value array
     */
    String[] value();

    /**
     * Defines several {@link EnumString} annotations on the same element.
     *
     * @see EnumString
     */
    @Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
    @Retention(RUNTIME)
    @Documented
    @interface List {

        EnumString[] value();
    }
}
```

### 5.2 自定义校验逻辑

```java
public class EnumStringValidator implements ConstraintValidator<EnumString, String> {
    private List<String> enumStringList;

    @Override
    public void initialize(EnumString constraintAnnotation) {
        enumStringList = Arrays.asList(constraintAnnotation.value());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null){
            return true;
        }
        return enumStringList.contains(value);
    }
}
```



### 5.3 在字段上增加注解

```java
@ApiModelProperty(value = "性别")
@EnumString(value = {"F","M"}, message="性别只允许为F或M")
private String sex;
```





## 6.分组校验

有的时候，开发者在某一个实体类中定义了很多校验规则，但是在某一次业务处理中，并不需要这么多校验规则，此时就可以使用分组校验：

首先创建两个分组接口：

```java
public class ValidationCategory {

    /**
     * 质检
     */
    public interface Group1 {}

    /**
     * 详情
     */
    public interface Group2 {}

}

```

在实体类中添加分组信息：

```java
public class User {

    private Integer id;
	
	//groups属性，表示该校验属性规则所属的分组

    @Size(min = 5, max = 10, message = "{user.name.size}", groups = Group1.class)
    private String name;

    @NotNull(message = "{user.address.notnull}", groups = Group2.class)
    private String address;

    @DecimalMin(value = "1", message = "{user.age.size}")
    @DecimalMax(value = "200", message = "{user.age.size}")
    private Integer age;

    @Email(message = "{user.email.pattern}")
    @NotNull(message = "{user.email.notnull}", groups = {Group1.class, Group2.class})
    private String email;
}
```

在@Validated注解中指定校验分组：

```java
@RestController
public class UserController {
    
    //@Validated(ValidationGroup2.class) 表示这里的校验使用ValidationGroup2分组的校验规则，
    // 即只校验邮箱地址是否为空、用户地址是否为空
    @PostMapping("/user")
    public List<String> addUser(@Validated(Group2.class) User user, BindingResult result){
        List<String> errors = new ArrayList<>();
        if(result.hasErrors()){
            List<ObjectError> allErrors = result.getAllErrors();
            for(ObjectError error : allErrors){
                errors.add(error.getDefaultMessage());
            }
        }
        return errors;
    }
}
```

## 7. 常用注解

| 注解                                           | 作用类型                                                     | 解释                                                         | null是否能通过验证 |
| ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------ |
| @AssertFalse                                   | Boolean、boolean                                             | 该字段值为false时，验证才能通过                              | YES                |
| @AssertTrue                                    | Boolean、boolean                                             | 该字段值为true时，验证才能通过                               | YES                |
| @DecimalMax                                    | 数字类型（原子和包装）                                       | 验证小数的最大值`@DecimalMax(value = "12.35") private double money;` | YES                |
| @DecimalMin                                    | 数字类型（原子和包装）                                       | 验证小数的最小值                                             | YES                |
| @Digits                                        | 数字类型（原子和包装）                                       | 验证数字的整数位和小数位的位数是否超过指定的长度`@Digits(integer = 2, fraction = 2) private double money;` | YES                |
| @Email                                         | String                                                       | 该字段为Email格式，才能通过                                  | YES                |
| @Future                                        | 时期、时间                                                   | 验证日期是否在当前时间之后，否则无法通过校验`@Future private Date date;` | YES                |
| @FutureOrPresent                               | 时期、时间                                                   | 时间在当前时间之后 或者等于此时                              | YES                |
| @Max                                           | 数字类型（原子和包装）                                       | `//该字段的最大值为18，否则无法通过验证 @Max(value = 18) private Integer age;` | YES                |
| @Min                                           | 数字类型（原子和包装）                                       | 同上，不能低于某个值否则无法通过验证                         | YES                |
| @Negative                                      |                                                              | 数字<0                                                       | YES                |
| @NegativeOrZero                                |                                                              | 数字=<0                                                      | YES                |
| @NotBlank                                      | String 该注解用来判断字符串或者字符，只用在String上面        | 字符串不能为null,字符串trim()后也不能等于“”                  | NO                 |
| @NotEmpty                                      | String、集合、数组、Map、链表List                            | 不能为null，不能是空字符，集合、数组、map等size()不能为0；字符串trim()后可以等于“” | NO                 |
| @NotNull                                       | 任何类型                                                     | 使用该注解的字段的值不能为null，否则验证无法通过             | NO                 |
| @Null                                          |                                                              | 修饰的字段在验证时必须是null，否则验证无法通过               | YES                |
| @Past                                          | 时间、日期                                                   | 验证日期是否在当前时间之前，否则无法通过校验,必须是一个过去的时间或日期 | YES                |
| @PastOrPresent                                 | 时间、日期                                                   | 验证日期是否在当前时间之前或等于当前时间                     | YES                |
| @Pattern                                       |                                                              | 用于验证字段是否与给定的正则相匹配`@Pattern(regexp = "正则") private String name;` | YES                |
| @Positive                                      |                                                              | 数字>0                                                       | YES                |
| @PositiveOrZero                                |                                                              | 数字>=0                                                      | YES                |
| @Size                                          | 字符串String、集合Set、数组Array、Map，List** **             | `修饰的字段长度不能超过5或者低于1 @Size(min = 1, max = 5) private String name;`集合、数组、map等的size()值必须在指定范围内`    //只能一个    @Size(min = 1, max = 1)    private List<String> names;` | YES                |
| @URL(protocol=, host=, port=, regexp=, flags=) | 被注解的对象必须是字符串                                     | 检查是否是一个有效的URL，如果提供了protocol，host等，则该URL还需满足提供的条件 |                    |
| @Range(min=, max=)                             | 数据：BigDecimal, BigInteger, String, byte, short, int, long and 原始类型的包装类 | 被注释的元素必须在合适的范围内                               |                    |
| @Length(min=, max=)                            | String                                                       | 被注解的对象必须是字符串的大小必须在制定的范围内             |                    |





## 8. @Validated与@Valid区别



@Validated是对@Valid进行了二次封装，它们的区别如下表

| 不同     | @Valid                                      | @Validated                                                   |
| -------- | ------------------------------------------- | ------------------------------------------------------------ |
| 来源     | 是Hibernate validation 的 校验注解          | 是 Spring Validator 的校验注解，是 Hibernate validation 基础上的增加版 |
| 注解位置 | 用在 构造函数、方法、方法参数 和 成员属性上 | 用在 类、方法和方法参数上。 但不能用于成员属性               |
| 嵌套验证 | 用在级联对象的成员属性上面                  | 不支持                                                       |
| 分组     | 无此功能                                    | 提供分组功能，可以在入参验证时，根据不同的分组采用不同的验证机制 |