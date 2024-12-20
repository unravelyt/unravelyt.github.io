---
title: MySQL基础命令
createTime: 2024/11/16 23:14:12
permalink: /note_database/jwccemx4/
---



- SQL：Structure Query Language结构化查询语言

- DDL:数据定义语言，定义数据库、数据表它们的结构：create(创建) drop(删除) alter(修改)

- DML:数据操作语言，主要是用来操作数据insert(插入) update(修改) delete(删除)

- DCL:数据控制语言，定义访问权限，取消访问权限，安全设置grant

- DQL:数据查询语言，select(查询) from字句 where字句

  

## 1. 操作数据库

```sql :collapsed-lines=20 :collapsed-lines=20
--1.首先要登陆数据库服务器
    mysql -uroot -p123456
--2.数据库的创建 : 
    create database 数据库的名 character set 字符集  collate 校对规则
    create database demodb character set utf8 collate utf8_bin;
    --创建数据库，判断不存在，再创建：
	create database if not exists 数据库名称;
	--创建数据库，并指定字符集
	create database 数据库名称 character set 字符集名;
--3.数据库的查询:  
    show databases;
    select database();    //正在使用的
    show create database 数据库的名字;
--4.数据库的修改: 
    alter database 数据库 character set 字符集(utf8);
--5.数据库的删除: 
    drop database if exists 数据库名
--6.切换数据库 :
	select database();
    use 数据库的名字;
```



## 2. 操作表

### （1）创建表

```sql :collapsed-lines=20
create table 表名（
    列名 列的类型(长度) 约束，
    sid int primary key auto_increment,  
    sname varchar(30),
    sex int,
    age int
）;

--列的类型：
    int
    char（固定长度）/varchar（可变长度），长度代表的是字符的个数
    double
    date:YYYY-MM-DD
    time:hh:mm:ss    默认值是null
    timestamp:YYYY-MM-DD hh:mm:ss默认使用当前时间   
    text:主要是存放文本
    blob:存放的是二进制
                
--列的约束：
    主键约束：primary key
    唯一约束：unique
    非空约束：not null  
    自动增长: auto_increment
```

### （2）查看表

```sql :collapsed-lines=20
--查看所有的表
    show tables;
--查看表的定义
    show create table 表名;
--查看表结构
    desc 表名;
```

### （3）修改表

```sql :collapsed-lines=20
--修改表名和字符集
    rename table 旧表名 to 新表名;
    alter table 表名 character set gbk;
--修改列
    添加列: alter table 表名 add 列名 列的类型 列的约束(not null);
    删除列: alter table 表名 drop chengji;
    改类型: alter table 表名 modify 列名 新的类型 新的约束(not null);
    改列名: alter table 表名 change 旧列名 新列名 varchar(2);
```

### （4）删除表

```sql :collapsed-lines=20
drop table 表名;
drop table  if exists 表名 ;
```



## 3. 操作数据

### （1）增删改数据

```sql :collapsed-lines=20
--1.插入数据
    insert into 表名(列名1,列名2,列名3) values(值1,值2,值3),(值1,值2,值3); //全插入时列名可以省略
    --中文乱码问题
        暂停mysql服务,在mysql安装路径中找到my.ini配置文件，将57行改成gbk，重启mysql.
--2.删除记录
    delete from 表名 where 条件;
    delete from demodb where sid = 5;
    --delete和truncate 删除数据有什么差别
        delete: DML一条一条删除表中的数据，适合数据少，高效
        truncate:DDL 先删除表再重建表，适合数据比较多
--查看表中的数据
    select * from allidea;
--3.更新表记录
    update 表名 set 列名1=列的值1，列名2=列的值2 where 条件;
    update student set sname='李四' where sid=5;
--4.增加外键 (一般不用)
	alter table product add foreign key(cno) references category(cid);
```

### （2）单表查询

```sql :collapsed-lines=20
--商品分类（栏目）
1.分类的id  
2.分类名称  
3.分类描述    

create table category(      
    cid int primary key auto_increment,      
    cname varchar(12),      
    cdesc varchar(31)
);    
insert into category values(null,'手机数码','中国制造');  
insert into category values(null,'皮鞋箱包','意大利');  
insert into category values(null,'服装内衣','中国制造');  
insert into category values(null,'烟酒食品','中国制造'); 

--所有商品（货品）
1.商品ID
2.商品名称
3.商品价格
4.生产日期
5.商品分类ID

--商品和商品分类：所属关系
create table product(
    pid int primary key auto_increment,
    pname varchar(10),
    price double,
    pdate timestamp,
    cno int
);

insert into product values(null,'小米手机',998,null,1);
insert into product values(null,'华为手机',2888,null,1);
insert into product values(null,'贵人鸟',399,null,2);
insert into product values(null,'杰克琼斯',500,null,3);
insert into product values(null,'海澜之家',500,null,3);
insert into product values(null,'茅台酒',388,null,4);
insert into product values(null,'西凤酒',128,null,4);
insert into product values(null,'饼干',5,null,4);

--运算符
		* > 、< 、<= 、>= 、= 、<>
		* BETWEEN...AND  
		* IN( 集合) 
		* LIKE：模糊查询
			* 占位符：
				* _:单个任意字符
				* %：多个任意字符
		* IS NULL  
		* and  或 &&
		* or  或 || 
		* not  或 !
		
--查询所有的商品
    select * from product;
    
--查询商品名称和商品价格
    select pname,price from product;
    
--别名查询. as的关键字，as 关键字是可以省略
    --表别名(主要是用在多表查询);
        select p.pname,p.price from product as p;
    --列别名;
        select pname 名称,price 价格 from product;
        
--去掉重复的值 distinct
    select distinct price from product;
    
--select运算查询(仅仅在查询结果上做了运算)
    select *,price*0.5 折后价格 from product;
    
--where关键字
    --关系运算符:> >= < <= != <>(标准sql语法)
    --判断某一列是否为空: is null,is not null
    --逻辑运算: and , or , not
    --between ... and ...在某一区间
    --like:模糊查询
        _ :代表的是一个字符
        % :代表的是多个字符
    --in 在某个范围中获得值     
    --查询商品价格>60的所有商品信息
        select * from product where price > 60;
    
    --查询商品价格在10到100之间
        select * from product where price > 10 and price < 100;
        between...add...
        select * from product where price between 10 and 100;
    --查询商品价格小于 100 或者商品价格大于 999
        select * from product where price < 100 or price > 999;
        
    --查询出名字中带有 米 的商品
        select * from product where pname like '%米%';
    
    --查询第二个名字是熊的所有商品
        select * from product where pname like '_便%';
    
    --查询商品分类ID在1,4,5里面所有的商品
        select * from product where cno in (1,4);
        
--排序查询: order by 关键字
    asc : ascend 升序(默认的排序方式)
    desc : descend 降序
    --1.查询所有商品,按照价格进行排序
        select * from product order by price;
    --2.查询所有商品,按照价格进行降序
        select * from product order by price desc;
    --3.查询名称有 小 的商品,按照价格降序排序
        select * from product where pname like '%面%' order by price desc;
        
--聚合函数: select 函数(列名) from 表名;
    sum() : 求和
    avg() : 求平均值
    count() : 统计数量
    max() : 最大值
    min() : 最小值
    --1.获得所有商品价格的总和
        select sum(price) from product;
        
    --2.获得所有商品的个数
        select count(*) from product;
        
    --注意:where条件后面不能接聚合函数
    --查出商品价格 大于 平均价格 的所有商品
        select * from product where price > (select avg(price) from product);
--分组: group by
    --having 分组之后条件过滤关键字,可以接聚合函数,出现在分组之后
    --1.根据cno字段分组,分组后统计商品的个数
        select cno,count(*)
        from product group by cno;
    --2.根据con分组,分组统计每组商品的平均价格,并且商品平均价格 > 60
        select cno,avg(price)
        from product group by cno
        having avg(price) > 60;
        
--编写顺序
    select .. from .. where .. group by .. having .. order by
    
--执行顺序
    from .. where .. group by .. having .. select .. order by
```


### （3）多表查询

```sql :collapsed-lines=20
-- 笛卡尔积,查出来的是两张表的乘积
select * from product,category;

-- 过滤出有意义的数据
select * from product,category where cno = cid;
select * from product p,category c where p.cno = c.cid;

-- 内连接查询
-- 隐式内连接: 在查询结果上做的where条件过滤
select * from product p,category c where p.cno = c.cid;
-- 显式内连接: 带着条件查结果,执行效率高
select * from product p inner join category c on p.cno = c.cid;

-- 左外连接:会将左表中的所有数据都查询出来,如果右表中没有对应的数据,用null代替
select * from product p left outer join category c on p.cno = c.cid;
-- 右外连接:
select * from product p right outer join category c on p.cno = c.cid;
```



### （4）分页查询

```sql :collapsed-lines=20
-- 起始索引: startIndex  = (index-1)*3
-- 第一个参数是索引,第二个参数显示的个数
select * from product limit 0,3;
select * from product limit 3,3;
```



### （5）子查询

```sql :collapsed-lines=20
-- 查询出(商品名称,商品分类名称)信息
    -- 左连接
    select * from product p left outer join category c on p.cno = c.cid;
-- 查询分类名称为手机数码的所有商品
    select * from product where cno = (select cid from category where cname ='手机数码');
```



### （6）约束

```sql :collapsed-lines=20
分类：
	1. 主键约束：primary key
	2. 非空约束：not null
	3. 唯一约束：unique
	4. 外键约束：foreign key
	
* 非空约束：not null，值不能为null
	1. 创建表时添加约束
		CREATE TABLE stu(
			id INT,
			NAME VARCHAR(20) NOT NULL -- name为非空
		);
	2. 创建表完后，添加非空约束
		ALTER TABLE stu MODIFY NAME VARCHAR(20) NOT NULL;

	3. 删除name的非空约束
		ALTER TABLE stu MODIFY NAME VARCHAR(20);
* 唯一约束：unique，值不能重复
	1. 创建表时，添加唯一约束
	CREATE TABLE stu(
    	id INT,
    	phone_number VARCHAR(20) UNIQUE -- 添加了唯一约束
	);
	注意mysql中，唯一约束限定的列的值可以有多个null

	2. 删除唯一约束

		ALTER TABLE stu DROP INDEX phone_number;
	
	3. 在创建表后，添加唯一约束
		ALTER TABLE stu MODIFY phone_number VARCHAR(20) UNIQUE;

* 主键约束：primary key。
	1. 注意：
		1. 含义：非空且唯一
		2. 一张表只能有一个字段为主键
		3. 主键就是表中记录的唯一标识

	2. 在创建表时，添加主键约束
		create table stu(
			id int primary key,-- 给id添加主键约束
			name varchar(20)
		);

	3. 删除主键
		-- 错误 alter table stu modify id int ;
		ALTER TABLE stu DROP PRIMARY KEY;

	4. 创建完表后，添加主键
		ALTER TABLE stu MODIFY id INT PRIMARY KEY;

	5. 自动增长：
		1.  概念：如果某一列是数值类型的，使用 auto_increment 可以来完成值得自动增长

		2. 在创建表时，添加主键约束，并且完成主键自增长
		create table stu(
			id int primary key auto_increment,-- 给id添加主键约束
			name varchar(20)
		);
		3. 删除自动增长
		ALTER TABLE stu MODIFY id INT;
		4. 添加自动增长
		ALTER TABLE stu MODIFY id INT AUTO_INCREMENT;

* 外键约束：foreign key,让表于表产生关系，从而保证数据的正确性。
	1. 在创建表时，可以添加外键
		* 语法：
			create table 表名(
				....
				外键列
				constraint 外键名称 foreign key (外键列名称) references 主表名称(主表列名称)
			);

	2. 删除外键
		ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;

	3. 创建表之后，添加外键
		ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名称) REFERENCES 主表名称(主表列名称);
```

## 4. 事务

```sql :collapsed-lines=20
1. 事务的四大特征：
	1. 原子性：是不可分割的最小操作单位，要么同时成功，要么同时失败。
	2. 持久性：当事务提交或回滚后，数据库会持久化的保存数据。
	3. 隔离性：多个事务之间。相互独立。
	4. 一致性：事务操作前后，数据总量不变
2. 事务的隔离级别（了解）
	* 概念：多个事务之间隔离的，相互独立的。但是如果多个事务操作同一批数据，则会引发一些问题，设置不同的隔离级别就可以解决这些问题。
	* 存在问题：
	1. 脏读：一个事务，读取到另一个事务中没有提交的数据
	2. 不可重复读(虚读)：在同一个事务中，两次读取到的数据不一样。
	3. 幻读：一个事务操作(DML)数据表中所有记录，另一个事务添加了一条数据，则第一个事务查询不到自己的修改。
	* 隔离级别：
		1. read uncommitted：读未提交
			* 产生的问题：脏读、不可重复读、幻读
		2. read committed：读已提交 （Oracle）
			* 产生的问题：不可重复读、幻读
		3. repeatable read：可重复读 （MySQL默认）
			* 产生的问题：幻读
		4. serializable：串行化
			* 可以解决所有的问题

		* 注意：隔离级别从小到大安全性越来越高，但是效率越来越低
		* 数据库查询隔离级别：
			* select @@tx_isolation;
		* 数据库设置隔离级别：
			* set global transaction isolation level  级别字符串;
```



