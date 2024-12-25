---
title: mybatis-plus中更新null值
createTime: 2024/12/17 10:05:13
permalink: /note_java/uuc3b5fo/
---

默认情况下， mybatis-plus 在更新数据时时会判断字段是否为 null，如果是 null 则不设置值，也就是更新后的该字段数据依然是原数据，
有时候需要设置某些字段的数据为 null。

## 方式一
字段加上注解
```java
@TableField(updateStrategy = FieldStrategy.IGNORED)
```


## 方式二：使用 UpdateWrapper 进行设置
```java
studentMapper.update(student, new UpdateWrapper<Student>()
                .lambda()
                .eq(Student::getId, student.getId())
                .set(Student::getAge, null)
                .set(Student::getName, null)
        );
```

## 方式三：修改全局策略模式
全局配置的方法会对所有的字段都忽略判断，如果一些字段不想要修改，也会因为传的是 null 而修改，导致业务数据的缺失，所以并不推荐使用。
```yaml
mybatis-plus:
  global-config:
    db-config:
      update-strategy: IGNORED

```