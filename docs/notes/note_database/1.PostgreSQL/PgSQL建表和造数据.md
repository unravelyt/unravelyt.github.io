---
title: PgSQL建表和造数据
createTime: 2024/12/27 11:25:32
permalink: /note_database/tuzwwskm/
---

## 1. 建表模板

### 1.1. 建表
```sql :collapsed-lines=20

drop table if exists book;
create table book
(
    id               bigserial not null primary key,
    title            varchar(100) default '':: varchar,
    name             varchar(100),
    author           varchar(100),
    price            numeric      default 0,
    book_code        varchar(100) default '':: varchar,
    publisher        varchar(100) default '':: varchar,
    publication_year date,
    create_time      timestamp,
    update_time      timestamp
);

comment on table book is 'book信息表';
comment on column book.author is '作者';
comment on column book.publisher is '出版社';

CREATE INDEX index_corp_id2 ON book USING btree (book_code);
CREATE INDEX index_record2 ON book USING btree (name, book_code);


drop table if exists library;
create table library
(
    id               bigserial not null primary key,
    title            varchar(100) default '':: varchar,
    name             varchar(100),
    author           varchar(100),
    price            numeric      default 0,
    book_code        varchar(100) default '':: varchar,
    publisher        varchar(100) default '':: varchar,
    publication_year date,
    create_time      timestamp,
    update_time      timestamp
);

```

### 1.2. 复制表和数据
```sql :collapsed-lines=20
DROP TABLE IF EXISTS "public"."customer_info_0";
CREATE TABLE "public"."customer_info_0"
(
    "id"               serial8 primary key,
    "corp_id"          varchar(50)  not null,
    "external_type"    int2,
    "union_id"         varchar(50),
    "add_way"          varchar(10)  not null,
    "add_time"         timestamp(0) not null,
    "is_loss"          bool         default false,
    "loss_time"        timestamp(0),
    "tag_list"         text,
    "create_time"      timestamp(0) default now(),
    "update_time"      timestamp(0) default now()
);
COMMENT ON COLUMN "public"."customer_info_0"."id" IS '主键';
COMMENT ON COLUMN "public"."customer_info_0"."corp_id" IS '企业CorpId';
COMMENT ON COLUMN "public"."customer_info_0"."name" IS '外部联系人的名称';
COMMENT ON COLUMN "public"."customer_info_0"."external_type" IS '外部联系人的类型，1表示该外部联系人是微信用户，2表示该外部联系人是企业微信用户';
COMMENT ON COLUMN "public"."customer_info_0"."union_id" IS '外部联系人在微信开放平台的唯一身份标识（微信UnionId）';
COMMENT ON COLUMN "public"."customer_info_0"."add_way" IS '客户来源：0-未知来源，1-扫描二维码，2-搜索手机号，3-名片分享，4-群聊，5-手机通讯录，6-微信联系人，8-安装第三方应用时自动添加的客服人员，9-搜索邮箱，10-视频号添加，11-通过日程参与人添加，12-通过会议参与人添加，13-添加微信好友对应的企业微信，14-通过智慧硬件专属客服添加，15-通过上门服务客服添加，201-内部成员共享，202-管理员/负责人分配。';
COMMENT ON COLUMN "public"."customer_info_0"."add_time" IS '该成员添加此外部联系人的时间';
COMMENT ON COLUMN "public"."customer_info_0"."is_loss" IS '客户流失状态：false-正常，true-客户删员工';
COMMENT ON COLUMN "public"."customer_info_0"."loss_time" IS '客户删员工时间';
COMMENT ON COLUMN "public"."customer_info_0"."tag_list" IS '客户标签列表';
COMMENT ON COLUMN "public"."customer_info_0"."create_time" IS '创建时间';
COMMENT ON COLUMN "public"."customer_info_0"."update_time" IS '更新时间';
COMMENT ON TABLE "public"."customer_info_0" IS '客户信息';

-- 索引
CREATE INDEX idx_customer_info_1 ON customer_info_0 (union_id);
CREATE INDEX idx_customer_info_2 ON customer_info_0 (corp_id, external_type);

-- 复制当前表并重新命名
create table customer_info_1 (like customer_info_0 INCLUDING INDEXES INCLUDING COMMENTS);
create table customer_info_2 (like customer_info_0 INCLUDING INDEXES INCLUDING COMMENTS);

```

### 1.3. 触发器
```sql :collapsed-lines=20

-- >>>>>>>>>>>>>>>>>>>> 创建update_time触发器，实现自动更新时间戳 <<<<<<<<<<<<<<<<<<<<<<<
create or replace function update_timestamp() returns trigger as
$$
begin
    new.update_time = current_timestamp;
    return new;
end
$$
    language plpgsql;


DROP TABLE IF EXISTS "public"."sys_department";
CREATE TABLE "public"."sys_department"
(
    "obj_id"            serial8 primary key,
    "id"                int4,
    "corp_id"           varchar(100),
    "open_corp_id"      varchar(100),
    "name"              varchar(50),
    "name_en"           varchar(50),
    "department_leader" varchar(50),
    "parent_id"         int4,
    "sort_order"        int4,
    "create_time"       timestamp(6) DEFAULT now(),
    "update_time"       timestamp(6)
)
;
COMMENT ON COLUMN "public"."sys_department"."obj_id" IS '主键';
COMMENT ON COLUMN "public"."sys_department"."sort_order" IS '在父部门中的次序值。order值大的排序靠前。值范围是[0, 2^32)';
COMMENT ON TABLE "public"."sys_department" IS '部门信息';
-- 创建索引
CREATE INDEX index_sys_department ON sys_department (corp_id);
-- 实现update_time自动更新时间戳
CREATE TRIGGER trigger_sys_department
    BEFORE UPDATE
    ON sys_department
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

```


## 2. 批量造数据

### 2.1. 建表
```sql :collapsed-lines=20
drop table if exists book;
create table book(
    id               bigserial    not null primary key,
    title            varchar(100),
    name             varchar(100),
    author           varchar(20),
    price            numeric default 0,
    book_code        varchar(100),
    publisher        varchar(100),
    remark           text,
    publication_year date,
    create_time      timestamp,
    update_time      timestamp
);

comment on table book is 'book信息表';
comment on column book.author is '作者';
comment on column book.publisher is '出版社';

CREATE INDEX index_corp_id ON book USING btree (book_code);
CREATE INDEX index_record ON book USING btree (name, book_code);
```

### 2.2. 函数生成随机汉字
```sql :collapsed-lines=20
create or replace function gen_hanzi(int) returns text as $$
declare
    res text;
begin
    if $1 >=1 then
        -- 汉字从从19968开始，一共20901个汉字，
        select string_agg(chr(19968+(random()*20901)::int), '') into res from generate_series(1,$1);
        return res;
    end if;
    return null;
end;
$$ language plpgsql strict;
```

### 2.3. 删除，执行函数
```sql
drop function gen_hanzi(int);

select gen_hanzi(10);

```

### 2.4. 插入数据
```sql :collapsed-lines=20
do $$
    declare num integer =1;
    begin
        while num <= 3000000 loop
            insert into book
            (title,name,author,price,book_code,publisher,publication_year,create_time,update_time)
            values
                (gen_hanzi(20),gen_hanzi(6),
                 (array['Shakespeare','Homer','Cervantes','Dante','Vergil','Plato','Helen-Keller','Mark-simon','Jack-Chen','Mark-Twain','Jack-London','Tagore','Hemingway','Voltaire','Charles-Dickens','Jane-Austen'])[floor(random()*16)::int+1],
                 substring(random()::varchar,3,2)::integer, -- 随机生成2位数字
                 substring(md5(random()::varchar),2,10), -- 随机生成10位字符串
                    -- 随机在数组里选择几项
                 (array['人民教育出版社','人民文学出版社','人民出版社','三联书店','中华书局','上海译文出版社','科学教育出版','中信出版社','科学出版'])[floor(random()*9)::int+1],
                    -- 随机生成日期 格式：yyyy-MM-dd
                 concat(current_date - floor((random() * 25))::int,' ',make_time(floor((random() * 12))::int, floor((random() * 60))::int, floor((random() * 60))::int))::date,
                    -- 随机生成日期 格式：yyyy-MM-dd HH:mm:ss
                 concat(current_date - floor((random() * 25))::int,' ',make_time(floor((random() * 12))::int, floor((random() * 60))::int, floor((random() * 60))::int))::timestamptz,
                 concat(current_date - floor((random() * 25))::int,' ',make_time(floor((random() * 12))::int, floor((random() * 60))::int, floor((random() * 60))::int))::timestamptz
                );
            num = num + 1;
        end loop;
    end
$$;

```

### 2.5. 常用函数

```sql :collapsed-lines=20
-- 随机生成8位数的数字
select substring(random()::varchar,3,8);

select md5(random()::text) from generate_series(1,10);

-- 随机生产9位长度的大写字符串
select upper(substring(md5(random()::varchar),2,12));

-- 数组随机取值
select (array['aaaaa','bbbbb','ccccc','ddddd','eeeee','fffff'])[floor(random()*4)::int+1];

-- 随机在62个字母里选20个
select array_to_string(array(select substring('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' FROM (ceil(random() * 62))::int FOR 1) FROM generate_series(1, 20)), ''),

-- 随机生成时间 生成日期::date
select concat(current_date - floor((random() * 25))::int,' ',make_time(floor((random() * 12))::int, floor((random() * 60))::int, floor((random() * 60))::int))::timestamptz;

-- 随机生产指定长度N的字符串
select upper(array_to_string(array(select substring('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' FROM (ceil(random() * 62))::int FOR 1) FROM generate_series(1, N)), ''));

-- 输出大写字母
select chr(int4(random()*26)+65);

-- 随机字母
select chr(int4(random()*26)+65);

-- 随机4位字母
select repeat( chr(int4(random()*26)+65),4);

-- 拼接截取字符串
select 'postgre'||substr('mySql',3,3);

-- 数组随机取值
select (array['张三','李四','王五','赵六'])[floor(random()*4)::int+1];

-- 随机数字 十位不超过6的3位数
select (random()*(6^3))::integer;

-- 随机输出10以内的整数
select floor(random()*10);

-- 三位数
select (random()*(10^3))::integer;

-- 8位字符串
select substring(md5(random()::varchar),2,8);

-- 8位数字
select substring(random()::varchar,3,8);

-- 随机生成N位字符串
select upper(array_to_string(array(select substring('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' FROM (ceil(random() * 62))::int FOR 1) FROM generate_series(1, N)), ''));

-- 随机生产日期 2022-09-08 03:27:36
SELECT concat(current_date - floor((random() * 25))::int,' ',make_time(floor((random() * 12))::int, floor((random() * 60))::int, floor((random() * 60))::int))

-- 随机生产日期 2022-09-19
SELECT current_date - floor((random() * 25))::int;

insert into t_test SELECT generate_series(1,10000) as key,repeat( chr(int4(random()*26)+65),4), (random()*(6^2))::integer,null,(random()*(10^4))::integer;


```
