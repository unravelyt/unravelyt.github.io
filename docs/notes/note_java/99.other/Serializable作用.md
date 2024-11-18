---
title: 实现Serializable接口的作用
createTime: 2024/11/17 01:21:08
permalink: /note_java/q276g3j7/
---



https://zhuanlan.zhihu.com/p/390884501



这个问题说的不清楚，集合类[框架](https://so.csdn.net/so/search?q=框架&spm=1001.2101.3001.7020)中的接口没有实现Cloneable和Serializable接口，但是具体的实现类是实现了这些接口的，比如Arraylist。

接口，比如[collection](https://so.csdn.net/so/search?q=collection&spm=1001.2101.3001.7020) list iterable

克隆（cloning）或者[序列化](https://so.csdn.net/so/search?q=序列化&spm=1001.2101.3001.7020)（serialization）的予以和含义是根具体的实现相关的。因此，应该由集合类的具体实现来决定如何被克隆或者是序列化。

实现[Serializable](https://so.csdn.net/so/search?q=Serializable&spm=1001.2101.3001.7020)序列化的作用：将对象状态保存在存储媒体中以便可以在以后重写创建出完全相同的副本；按置将对象从一个应用程序域发送到另一个应用程序域。

实现Serializable接口的作用就是可以把对象存到字节流，然后可以恢复。所以你想如果你的对象没有序列化，怎么才能进行网络传输呢？要网络传输就得转为字节流，所以在分布式应用中，你就得实现序列化。如果不需要分布式应用就没必要实现序列化。

java如果用json传输数据javabean时许需要实现Serializable

**个人观点：我写的应用中不需要实现Serializable因为我使用了json数据格式。**

**结论**：java如果使用json+restfulAPI进行数据交互那么javabean不需要implements Serializable接口因为对象数据并没有真正的进行网络传输或者持久化。而是转换为了json字符串。进行网络传输的是对象的具体信息而不是对象本身。所以在这种场景下不需要implements Serializable。

如果使用dubbo这种RPC（Remote Procedure Call）框架那么使用面向接口编程的时候，接口中的参数如果是类那么该类就必须implements Serializable才可以让对象在远程调用的时候在网络上传输。

**javabean为什么不implements Serializable也可以保存到数据库中**

不是说数据持久化就必须implements Serializable接口么

原因：

Java的基本数据类型（primitive：short int long float double byte char boolean）在数据库中都有对应的字段。一些Java的集合具体实现类也都实现了Serializable接口。那么JavaBean此时不实现该接口也可以存储到数据库中

**序列化绝对不止实现Serializable接口一种方式。还存在其他序列化方式可能效率更高。但是稳定性肯定是Serializable最好。因为该接口从Java1.1开始就存在并且一直保持使用**

https://github.com/eishay/jvm-serializers/wiki

序列化存储到本地，若从存储介质中读取数据字节流并反序列化的时候并不会调用类的构造函数



### 一、序列化的含义、意义及使用场景 

- **序列化：将对象写入到IO流中**
- **反序列化：从IO流中恢复对象**
- **意义：序列化机制允许将实现序列化的Java对象转换位字节序列，这些字节序列可以保存在磁盘上，或通过网络传输，以达到以后恢复成原来的对象。序列化机制使得对象可以脱离程序的运行而独立存在。**
- **使用场景：所有可在网络上传输的对象都必须是可序列化的，**比如RMI（remote method invoke,即远程方法调用），传入的参数或返回的对象都是可序列化的，否则会出错；**所有需要保存到磁盘的java对象都必须是可序列化的。通常建议：程序创建的每个JavaBean类都实现Serializeable接口。**

### 二、序列化实现的方式 

如果需要将某个对象保存到磁盘上或者通过网络传输，那么这个类应该实现**Serializable**接口或者**Externalizable**接口之一。

#### 1、Serializable

##### 1.1 普通序列化

Serializable接口是一个标记接口，不用实现任何方法。一旦实现了此接口，该类的对象就是可序列化的。

1. **序列化步骤：**

- **步骤一：创建一个ObjectOutputStream输出流；**

- **步骤二：调用ObjectOutputStream对象的writeObject输出可序列化对象。**

  ```typescript
  public class Person implements Serializable {
    private String name;
    private int age;
    //我不提供无参构造器
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
  
    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
  }
  
  public class WriteObject {
    public static void main(String[] args) {
        try (//创建一个ObjectOutputStream输出流
             ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("object.txt"))) {
            //将对象序列化到文件s
            Person person = new Person("9龙", 23);
            oos.writeObject(person);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
  }
  复制代码
  ```

1. **反序列化步骤：**

- **步骤一：创建一个ObjectInputStream输入流；**

- **步骤二：调用ObjectInputStream对象的readObject()得到序列化的对象。**

  我们将上面序列化到person.txt的person对象反序列化回来

  ```typescript
  public class Person implements Serializable {
    private String name;
    private int age;
    //我不提供无参构造器
    public Person(String name, int age) {
        System.out.println("反序列化，你调用我了吗？");
        this.name = name;
        this.age = age;
    }
  
    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
  }
  
  public class ReadObject {
    public static void main(String[] args) {
        try (//创建一个ObjectInputStream输入流
             ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.txt"))) {
            Person brady = (Person) ois.readObject();
            System.out.println(brady);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
  }
  //输出结果
  //Person{name='9龙', age=23}
  复制代码
  ```

  **waht????    输出告诉我们，反序列化并不会调用构造方法。反序列的对象是由JVM自己生成的对象，不通过构造方法生成。**

##### 1.2 成员是引用的序列化

**如果一个可序列化的类的成员不是基本类型，也不是String类型，那这个引用类型也必须是可序列化的；否则，会导致此类不能序列化。**

看例子，我们新增一个Teacher类。将Person去掉实现Serializable接口代码。

```java
public class Person{
    //省略相关属性与方法
}
public class Teacher implements Serializable {

    private String name;
    private Person person;

    public Teacher(String name, Person person) {
        this.name = name;
        this.person = person;
    }

     public static void main(String[] args) throws Exception {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("teacher.txt"))) {
            Person person = new Person("路飞", 20);
            Teacher teacher = new Teacher("雷利", person);
            oos.writeObject(teacher);
        }
    }
}
复制代码
```

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/5/21/16ad9dbc177d9abb~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

我们看到程序直接报错，因为Person类的对象是不可序列化的，这导致了Teacher的对象不可序列化

##### 1.3 同一对象序列化多次的机制

**同一对象序列化多次，会将这个对象序列化多次吗？**答案是**否定**的。

```java
public class WriteTeacher {
    public static void main(String[] args) throws Exception {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("teacher.txt"))) {
            Person person = new Person("路飞", 20);
            Teacher t1 = new Teacher("雷利", person);
            Teacher t2 = new Teacher("红发香克斯", person);
            //依次将4个对象写入输入流
            oos.writeObject(t1);
            oos.writeObject(t2);
            oos.writeObject(person);
            oos.writeObject(t2);
        }
    }
}
复制代码
```

依次将t1、t2、person、t2对象序列化到文件teacher.txt文件中。

**注意：反序列化的顺序与序列化时的顺序一致**。

```java
public class ReadTeacher {
    public static void main(String[] args) {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("teacher.txt"))) {
            Teacher t1 = (Teacher) ois.readObject();
            Teacher t2 = (Teacher) ois.readObject();
            Person p = (Person) ois.readObject();
            Teacher t3 = (Teacher) ois.readObject();
            System.out.println(t1 == t2);
            System.out.println(t1.getPerson() == p);
            System.out.println(t2.getPerson() == p);
            System.out.println(t2 == t3);
            System.out.println(t1.getPerson() == t2.getPerson());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
//输出结果
//false
//true
//true
//true
//true
复制代码
```

从输出结果可以看出，**Java序列化同一对象，并不会将此对象序列化多次得到多个对象。**

- **Java序列化算法**

1. **所有保存到磁盘的对象都有一个序列化编码号**

2. **当程序试图序列化一个对象时，会先检查此对象是否已经序列化过，只有此对象从未（在此虚拟机）被序列化过，才会将此对象序列化为字节序列输出。**

3. **如果此对象已经序列化过，则直接输出编号即可。**

   图示上述序列化过程。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/5/21/16ad9dbc1863188b~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

##### 1.4 java序列化算法潜在的问题

由于java序利化算法不会重复序列化同一个对象，只会记录已序列化对象的编号。**如果序列化一个可变对象（对象内的内容可更改）后，更改了对象内容，再次序列化，并不会再次将此对象转换为字节序列，而只是保存序列化编号。**

```java
public class WriteObject {
    public static void main(String[] args) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.txt"));
             ObjectInputStream ios = new ObjectInputStream(new FileInputStream("person.txt"))) {
            //第一次序列化person
            Person person = new Person("9龙", 23);
            oos.writeObject(person);
            System.out.println(person);

            //修改name
            person.setName("海贼王");
            System.out.println(person);
            //第二次序列化person
            oos.writeObject(person);

            //依次反序列化出p1、p2
            Person p1 = (Person) ios.readObject();
            Person p2 = (Person) ios.readObject();
            System.out.println(p1 == p2);
            System.out.println(p1.getName().equals(p2.getName()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
//输出结果
//Person{name='9龙', age=23}
//Person{name='海贼王', age=23}
//true
//true
复制代码
```

##### 1.5 可选的自定义序列化

1. 有些时候，我们有这样的需求，某些属性不需要序列化。**使用transient关键字选择不需要序列化的字段。**

   ```java
   public class Person implements Serializable {
      //不需要序列化名字与年龄
      private transient String name;
      private transient int age;
      private int height;
      private transient boolean singlehood;
      public Person(String name, int age) {
          this.name = name;
          this.age = age;
      }
      //省略get,set方法
   }
   
   public class TransientTest {
      public static void main(String[] args) throws Exception {
          try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.txt"));
               ObjectInputStream ios = new ObjectInputStream(new FileInputStream("person.txt"))) {
              Person person = new Person("9龙", 23);
              person.setHeight(185);
              System.out.println(person);
              oos.writeObject(person);
              Person p1 = (Person)ios.readObject();
              System.out.println(p1);
          }
      }
   }
   //输出结果
   //Person{name='9龙', age=23', singlehood=true', height=185cm}
   //Person{name='null', age=0', singlehood=false', height=185cm}
   复制代码
   ```

   从输出我们看到，**使用transient修饰的属性，java序列化时，会忽略掉此字段，所以反序列化出的对象，被transient修饰的属性是默认值。对于引用类型，值是null；基本类型，值是0；boolean类型，值是false。**

2. 使用transient虽然简单，但将此属性完全隔离在了序列化之外。java提供了**可选的自定义序列化。**可以进行控制序列化的方式，或者对序列化数据进行编码加密等。

   ```java
   private void writeObject(java.io.ObjectOutputStream out) throws IOException；
   private void readObject(java.io.ObjectIutputStream in) throws IOException,ClassNotFoundException;
   private void readObjectNoData() throws ObjectStreamException;

   ```

   通过重写writeObject与readObject方法，可以自己选择哪些属性需要序列化， 哪些属性不需要。如果writeObject使用某种规则序列化，则相应的readObject需要相反的规则反序列化，以便能正确反序列化出对象。这里展示对名字进行反转加密。

   ```java
   public class Person implements Serializable {
      private String name;
      private int age;
      //省略构造方法，get及set方法
   
      private void writeObject(ObjectOutputStream out) throws IOException {
          //将名字反转写入二进制流
          out.writeObject(new StringBuffer(this.name).reverse());
          out.writeInt(age);
      }
   
      private void readObject(ObjectInputStream ins) throws IOException,ClassNotFoundException{
          //将读出的字符串反转恢复回来
          this.name = ((StringBuffer)ins.readObject()).reverse().toString();
          this.age = ins.readInt();
      }
   }
   复制代码
   ```

   当序列化流不完整时，readObjectNoData()方法可以用来正确地初始化反序列化的对象。例如，使用不同类接收反序列化对象，或者序列化流被篡改时，系统都会调用readObjectNoData()方法来初始化反序列化的对象。

3. **更彻底的自定义序列化**

   ANY-ACCESS-MODIFIER Object writeReplace() throws ObjectStreamException;
     ANY-ACCESS-MODIFIER Object readResolve() throws ObjectStreamException;

   - **writeReplace：在序列化时，会先调用此方法，再调用writeObject方法。此方法可将任意对象代替目标序列化对象**

     ```java
     public class Person implements Serializable {
       private String name;
       private int age;
       //省略构造方法，get及set方法
     
       private Object writeReplace() throws ObjectStreamException {
           ArrayList<Object> list = new ArrayList<>(2);
           list.add(this.name);
           list.add(this.age);
           return list;
       }
     
        public static void main(String[] args) throws Exception {
           try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.txt"));
                ObjectInputStream ios = new ObjectInputStream(new FileInputStream("person.txt"))) {
               Person person = new Person("9龙", 23);
               oos.writeObject(person);
               ArrayList list = (ArrayList)ios.readObject();
               System.out.println(list);
           }
       }
     }
     //输出结果
     //[9龙, 23]
     复制代码
     ```

   - **readResolve：反序列化时替换反序列化出的对象，反序列化出来的对象被立即丢弃。此方法在readeObject后调用。**

     ```java
     public class Person implements Serializable {
         private String name;
         private int age;
         //省略构造方法，get及set方法
          private Object readResolve() throws ObjectStreamException{
             return new ("brady", 23);
         }
         public static void main(String[] args) throws Exception {
             try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.txt"));
                  ObjectInputStream ios = new ObjectInputStream(new FileInputStream("person.txt"))) {
                 Person person = new Person("9龙", 23);
                 oos.writeObject(person);
                 HashMap map = (HashMap)ios.readObject();
                 System.out.println(map);
             }
         }
     }
     //输出结果
     //{brady=23}
     复制代码
     ```

     **readResolve常用来反序列单例类，保证单例类的唯一性。**

     **注意：readResolve与writeReplace的访问修饰符可以是private、protected、public，如果父类重写了这两个方法，子类都需要根据自身需求重写，这显然不是一个好的设计。通常建议对于final修饰的类重写readResolve方法没有问题；否则，重写readResolve使用private修饰。**

#### 2、Externalizable：强制自定义序列化

通过实现Externalizable接口，必须实现writeExternal、readExternal方法。

```java
public interface Externalizable extends java.io.Serializable {
     void writeExternal(ObjectOutput out) throws IOException;
     void readExternal(ObjectInput in) throws IOException, ClassNotFoundException;
}
复制代码
public class ExPerson implements Externalizable {

    private String name;
    private int age;
    //注意，必须加上pulic 无参构造器
    public ExPerson() {
    }

    public ExPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        //将name反转后写入二进制流
        StringBuffer reverse = new StringBuffer(name).reverse();
        System.out.println(reverse.toString());
        out.writeObject(reverse);
        out.writeInt(age);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        //将读取的字符串反转后赋值给name实例变量
        this.name = ((StringBuffer) in.readObject()).reverse().toString();
        System.out.println(name);
        this.age = in.readInt();
    }

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ExPerson.txt"));
             ObjectInputStream ois = new ObjectInputStream(new FileInputStream("ExPerson.txt"))) {
            oos.writeObject(new ExPerson("brady", 23));
            ExPerson ep = (ExPerson) ois.readObject();
            System.out.println(ep);
        }
    }
}
//输出结果
//ydarb
//brady
//ExPerson{name='brady', age=23}
复制代码
```

**注意：Externalizable接口不同于Serializable接口，实现此接口必须实现接口中的两个方法实现自定义序列化，这是强制性的；特别之处是必须提供pulic的无参构造器，因为在反序列化的时候需要反射创建对象。**

#### 3、两种序列化对比

| 实现Serializable接口                                         | 实现Externalizable接口   |
| ------------------------------------------------------------ | ------------------------ |
| 系统自动存储必要的信息                                       | 程序员决定存储哪些信息   |
| Java内建支持，易于实现，只需要实现该接口即可，无需任何代码支持 | 必须实现接口内的两个方法 |
| 性能略差                                                     | 性能略好                 |

**虽然Externalizable接口带来了一定的性能提升，但变成复杂度也提高了，所以一般通过实现Serializable接口进行序列化。**

### 三、序列化版本号serialVersionUID 

我们知道，**反序列化必须拥有class文件，但随着项目的升级，class文件也会升级，序列化怎么保证升级前后的兼容性呢？**

java序列化提供了一个private static final long serialVersionUID 的序列化版本号，只有版本号相同，即使更改了序列化属性，对象也可以正确被反序列化回来。

```java
public class Person implements Serializable {
    //序列化版本号
    private static final long serialVersionUID = 1111013L;
    private String name;
    private int age;
    //省略构造方法及get,set
}
复制代码
```

如果反序列化使用的**class的版本号**与序列化时使用的**不一致**，反序列化会**报InvalidClassException异常。**

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/5/21/16ad9dbc2a4e3900~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

**序列化版本号可自由指定，如果不指定，JVM会根据类信息自己计算一个版本号，这样随着class的升级，就无法正确反序列化；不指定版本号另一个明显隐患是，不利于jvm间的移植，可能class文件没有更改，但不同jvm可能计算的规则不一样，这样也会导致无法反序列化。**

什么情况下需要修改serialVersionUID呢？分三种情况。

- 如果只是修改了方法，反序列化不容影响，则无需修改版本号；
- 如果只是修改了静态变量，瞬态变量（transient修饰的变量），反序列化不受影响，无需修改版本号；
- 如果修改了非瞬态变量，则可能导致反序列化失败。**如果新类中实例变量的类型与序列化时类的类型不一致，则会反序列化失败，这时候需要更改serialVersionUID。**如果只是新增了实例变量，则反序列化回来新增的是默认值；如果减少了实例变量，反序列化时会忽略掉减少的实例变量。

### 四、总结 

1. 所有需要网络传输的对象都需要实现序列化接口，通过建议所有的javaBean都实现Serializable接口。
2. 对象的类名、实例变量（包括基本类型，数组，对其他对象的引用）都会被序列化；方法、类变量、transient实例变量都不会被序列化。
3. 如果想让某个变量不被序列化，使用transient修饰。
4. 序列化对象的引用类型成员变量，也必须是可序列化的，否则，会报错。
5. 反序列化时必须有序列化对象的class文件。
6. 当通过文件、网络来读取序列化后的对象时，必须按照实际写入的顺序读取。
7. 单例类序列化，需要重写readResolve()方法；否则会破坏单例原则。
8. 同一对象序列化多次，只有第一次序列化为二进制流，以后都只是保存序列化编号，不会重复序列化。
9. 建议所有可序列化的类加上serialVersionUID 版本号，方便项目升级。

