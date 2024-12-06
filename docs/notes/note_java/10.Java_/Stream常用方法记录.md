---
title: stream常用方法记录
createTime: 2024/11/17 00:36:03
permalink: /note_java/kx8v4uwu/
---


> 记不住啊
> 汇总：https://www.exception.site/java8/java8-stream-tutorial

## 获取2个日期内间隔多少个日期
```java
public List<LocalDate> getDatesBetween(LocalDateTime start, LocalDateTime end) {
    // 提取日期部分
    LocalDate startDate = start.toLocalDate();
    LocalDate endDate = end.toLocalDate();

    // 计算天数差
    long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);

    // 生成每一天的日期
    List<LocalDate> dates = new ArrayList<>();
    for (long i = 0; i <= daysBetween; i++) {
        dates.add(startDate.plusDays(i));
    }
    return dates;
}
```

## Collectors.toMap
```java
Map<Long, String> map = list.stream().collect(
        Collectors.toMap(GroupInfoEntity::getId, GroupInfoEntity::getName, (k1, k2) -> k1)
);


customerRelateList = customerRelateList.stream()
    .collect(Collectors.collectingAndThen(
        Collectors.toCollection(
            () -> new TreeSet<>(Comparator.comparing(CustomerRelate::getUnionId))
        ), ArrayList::new)
);



//找出最早的addTime
 Map<String, SysCustomer> unionIdMap = sysCustomerList.stream()
        .filter(s -> StringUtils.hasText(s.getUnionId()) && StringUtils.hasText(s.getAddTime())).collect(
        Collectors.toMap(SysCustomer::getUnionId, Function.identity(),
                BinaryOperator.minBy(Comparator.comparing(SysCustomer::getAddTime))
        )
);
```


## Collectors.groupingBy用法
```java
//简单分组
Map<String, List<EventRecord>> collect1 = eventRecords.stream()
                .collect(Collectors.groupingBy(EventRecord::getUnionId));

//分组后再分组
Map<String, Map<Long, List<MediaVisitRecordCountResponse>>> collect = responses.stream()
        .collect(
                Collectors.groupingBy(MediaVisitRecordCountResponse::getCustomerUnionId,
                        Collectors.groupingBy(MediaVisitRecordCountResponse::getMaterialId))
        );

//分组并去重
Map<String, Set<Integer>> unionIdToEventEnum = eventRecords.stream().collect(
        Collectors.groupingBy(EventRecord::getUnionId, Collectors.collectingAndThen(
                        Collectors.toSet(), (list) -> list.stream().map(EventRecord::getEventEnum).collect(Collectors.toSet())
                )
        )
);

//分组后将value里的字段拆分后合在一起
Map<String, Set<String>> collect = relatedList.stream()
        .filter(x -> StringUtils.hasText(x.getOrderOwner()))
        .collect(Collectors.groupingBy(GroupchatRelated::getOrderOwner,
                Collectors.collectingAndThen(Collectors.toList(),
                        (list) -> list.stream().map(x -> {
                            String customerIdList = x.getCustomerIdList();
                            if (StringUtils.hasText(customerIdList)) {
                                return Arrays.asList(customerIdList.split(","));
                            }
                            return null;
                        }).filter(Objects::nonNull).flatMap(Collection::stream).collect(Collectors.toSet())
                ))
        );

//分组后再分组，并去重
Map<String, Map<String, Set<Long>>> materialRecordMap = qwMaterialRecords.stream()
        .filter(s -> StringUtils.isNotBlank(s.getWhoId()))
        .map(m -> {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            QwMaterialRecordDTO dto = new QwMaterialRecordDTO();
            BeanUtils.copyProperties(m, dto);
            Date startTime = m.getStartTime();
            if (!ObjectUtils.isEmpty(startTime)) {
                dto.setDateStr(format.format(startTime));
            }
            return dto;
        }).collect(Collectors.groupingBy(QwMaterialRecordDTO::getWhoId,
                Collectors.groupingBy(QwMaterialRecordDTO::getDateStr, Collectors.collectingAndThen(
                        Collectors.toSet(), (list) -> list.stream().map(QwMaterialRecordDTO::getMaterialId).collect(Collectors.toSet()))
                ))
        );


//取某字段成为列表
Map<String, List<String>> ruleMap1 = ruleList.stream().
                .collect(Collectors.groupingBy(Rule::getId,
                         Collectors.mapping(Rule::getRuleName, Collectors.toList())));

//取列表中第一个值
Map<String, Rule> ruleMap = ruleList.stream().
        .collect(Collectors.groupingBy(Rule::getId,
                 Collectors.collectingAndThen(Collectors.toList(), value -> value.get(0))));


//分组后取value里的最大值
Map<String, DwsCustomerGroupSt> group = list.stream()
        .collect(Collectors.groupingBy(DwsCustomerGroupSt::getOwnerId,
                Collectors.collectingAndThen(
                        Collectors.maxBy(Comparator.comparingDouble(DwsCustomerGroupSt::getTotalRoomCnt)),
                        optional -> optional.orElse(null)
                )
        ));
int totalChatCnt = group.values().stream().mapToInt(DwsCustomerGroupSt::getTotalRoomCnt).sum();
```

## stream去重
```java
studentList = studentList.stream().collect(
  	Collectors.collectingAndThen(
    	Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(Student::getName))), ArrayList::new)
);


studentList = studentList.stream().filter(distinctByKey(Student::getName))
    .collect(Collectors.toList());


private static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
    Set<Object> seen = ConcurrentHashMap.newKeySet();
    return t -> seen.add(keyExtractor.apply(t));
}

```

## flatMap使用
```java

public static void main(String[] args) {
    QwDepartment qwDepartment = new QwDepartment();
    qwDepartment.setPath("/1/3402/3459/62");
    qwDepartment.setDeptId(62L);

    QwDepartment qwDepartment2 = new QwDepartment();
    qwDepartment2.setPath("/1/2884/3475/2885/3005");
    qwDepartment2.setDeptId(2885L);

    List<QwDepartment> list = Lists.newArrayList(qwDepartment, qwDepartment2);

    List<String> collect = list.stream().map(s -> {
        return Lists.newArrayList(s.getPath().substring(1).split("/"));
    }).flatMap(Collection::stream).distinct().collect(Collectors.toList());

    //        List<String> list = list.newArrayList(path.substring(1).split("/"));

    System.out.println(collect);
}

```



## 从对象集合中根据id找唯一的元素

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

## 集合中获取最小的日期
```java
Date date = firstAddTimeList.stream().min(Date::compareTo).get();

```



## 集合的安全删除
```java
//根据id删除某个元素
boolean b = list.removeIf(s -> s.getId().equals(3));
```
