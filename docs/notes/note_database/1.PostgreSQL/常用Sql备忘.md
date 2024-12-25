---
title: 常用SQL
createTime: 2024/11/17 01:22:38
permalink: /note_database/yzbypphy/
---



```sql
找出前缀为qr的所有数据库

SELECT
	CONCAT('drop table ',table_name,';')
FROM
	information_schema. TABLES
WHERE
	table_name LIKE 'qr_%';
```





# mysql不同时间粒度下的分组统计

我们在做项目或者数据分析时，经常遇到这样的需求：统计不同时间粒度下的数据分布情况，例如，每一天中每个小时网站的访问量，某路口每半个小时通过的车辆数量等。对于此类的问题，一个sql简单的查询就能实现，故特此记录下，方便以后使用。
在MySQL中，我的表为：track
数据结构如下所示：
![表track的数据结构示意](https://img-blog.csdnimg.cn/20181105163738204.png)

## 按天统计

```sql
SELECT DATE(TimeStart) AS date, COUNT(*) AS num
FROM track
WHERE Flag = 0 AND Duration >= 300 
GROUP BY date
ORDER BY date;

```

## 按小时统计

```sql
SELECT DATE_FORMAT(TimeStart, '%Y-%m-%d %H:00:00') AS time, COUNT(*) AS num
FROM track
WHERE Flag = 0 AND Duration >= 300
GROUP BY time
ORDER BY time;

```

结果如下：
![一小时结果](https://img-blog.csdnimg.cn/20181105164437450.png)

## 按半小时统计

```sql
SELECT time, COUNT( * ) AS num 
FROM
	(
	SELECT Duration,
		DATE_FORMAT(
			concat( date( TimeStart ), ' ', HOUR ( TimeStart ), ':', floor( MINUTE ( TimeStart ) / 30 ) * 30 ),
			'%Y-%m-%d %H:%i' 
		) AS time 
	FROM tarck
	WHERE Flag = 0  AND Duration >= 300 
	) a 
GROUP BY DATE_FORMAT( time, '%Y-%m-%d %H:%i' ) 
ORDER BY time;

```

结果如下：
![半小时查询结果](https://img-blog.csdnimg.cn/20181105164102966.png)

## 按N分钟统计

将上面的[SQL语句](https://so.csdn.net/so/search?q=SQL语句&spm=1001.2101.3001.7020)稍微修改下，就可以实现按任意N分钟为时间片的分组统计，如按10分钟统计，先上代码：

```sql
SELECT time, COUNT( * ) AS num 
FROM
	(
	SELECT Duration,
		DATE_FORMAT(
			concat( date( TimeStart ), ' ', HOUR ( TimeStart ), ':', floor( MINUTE ( TimeStart ) / 10 ) * 10 ),
			'%Y-%m-%d %H:%i' 
		) AS time 
	FROM tarck
	WHERE Flag = 0  AND Duration >= 300 
	) a 
GROUP BY DATE_FORMAT( time, '%Y-%m-%d %H:%i' ) 
ORDER BY time;

```

基本思路：
将datetime类型的时间转化为相应时间片的时间，例如将‘2017-03-01 01:08:19’ 转化为‘2017-03-01 01:00:00’，然后group by即可。

## 按分钟统计

将按小时统计的SQL语句稍微修改下，就可以实现按分钟统计

```sql
SELECT DATE_FORMAT(TimeStart, '%Y-%m-%d %H:%i:00') AS time, COUNT(*) AS num
FROM track 
WHERE Flag = 0 AND Duration >= 300
GROUP BY time
ORDER BY time;

```

DATE_FORMAT功能强大，可以根据format字符串格式化date值，参考下面链接
http://www.w3school.com.cn/sql/func_date_format.asp