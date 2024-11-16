---
title: stream常用方法记录
createTime: 2024/11/17 00:36:03
permalink: /note_java/kx8v4uwu/
---



> 都说用的多自然就记住了，但是还是有用的少的方法，但是很巧妙，需要的时候还得去查，用一个记一个吧。
> 别人的博文：https://www.exception.site/java8/java8-stream-tutorial



## 1. 从对象集合中根据id找唯一的元素

```java
public static void main(String[] args) {
    List<SampleEntity> list = new ArrayList<>();
    for (int i = 0; i < 5; i++) {
        SampleEntity sampleEntity = new SampleEntity();
        sampleEntity.setId(i);
        sampleEntity.setName("name"+i);
        list.add(sampleEntity);
    }

    //查出id为3的元素
    SampleEntity one = list.stream().filter(
        s -> s.getId() == 3
    ).findFirst().orElseThrow(RuntimeException::new);
    
    System.out.println("findFirst().get()="+sampleEntity);
    
    //根据id删除某个元素
    boolean b = list.removeIf(s -> s.getId().equals(3));
    System.out.println("removeIf="+b);

    System.out.println(list);
}
```



