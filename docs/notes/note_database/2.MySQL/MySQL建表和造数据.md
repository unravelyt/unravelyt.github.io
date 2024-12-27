---
title: MySQL建表和造数据
createTime: 2024/12/27 11:25:32
permalink: /note_database/tuzwwskn/
---


## 1. 建表模板

### 1.1. 建表

```sql :collapsed-lines=20

CREATE database if NOT EXISTS dev default character set utf8mb4 collate utf8mb4_unicode_ci;


drop table if exists book;
create table book
(
    id               bigint auto_increment primary key not null,
    title            varchar(100) comment '标题',
    name             varchar(100),
    author           varchar(100),
    price            decimal(14,2) default 0,
    book_code        varchar(100),
    publisher        varchar(100),
    publication_year date,
    create_time      datetime,
    update_time      datetime
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '书';

create index 索引名 on book (author, book_code);


-- 方式一
drop table if exists sys_post;
create table sys_post
(
    post_id     bigint(20)  not null comment '岗位ID',
    post_code   varchar(64) not null comment '岗位编码',
    post_name   varchar(50) not null comment '岗位名称',
    post_sort   int(4)      not null comment '显示顺序',
    status      char(1)     not null comment '状态（0正常 1停用）',
    create_by   varchar(64)  default '' comment '创建者',
    create_time datetime comment '创建时间',
    update_by   varchar(64)  default '' comment '更新者',
    update_time datetime comment '更新时间',
    remark      varchar(500) default null comment '备注',
    primary key (post_id)
) engine = innodb comment = '岗位信息表';

-- 方式二
CREATE TABLE `xxl_job_log_report`
(
    `id`            int(11) NOT NULL auto_increment,
    `trigger_day`   datetime         DEFAULT NULL COMMENT '调度-时间',
    `running_count` int(11) NOT NULL DEFAULT '0' COMMENT '运行中-日志数量',
    `suc_count`     int(11) NOT NULL DEFAULT '0' COMMENT '执行成功-日志数量',
    `fail_count`    int(11) NOT NULL DEFAULT '0' COMMENT '执行失败-日志数量',
    `update_time`   datetime         DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `i_trigger_day` (`trigger_day`) USING BTREE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'xxx';

-- 方式三
drop table if exists bestseller_order_0;
create table bestseller_order_0
(
    id                 bigint auto_increment         not null,
    tenant_id          varchar(100) comment '租户id' not null,
    order_no           varchar(100) comment '订单号',
    order_status       varchar(100) comment '订单状态 都是完结',
    order_document     integer comment '订单单据类型，1-正向单据；2-逆向单据',
    order_platform     integer comment '订单平台 天猫：1, 抖音：2, 京东：3, 拼多多：4, 小程序：5, h5：6, 线下：7',
    order_ouid         varchar(100) comment '客户在下单平台的对应id: 小程序，h5，线下：会员id; 天猫订单：ouid; 抖音订单：doudian_open_id; 拼多多订单：duoduo_id; 京东：JD_pin',
    order_time         datetime comment '下单时间，时间戳，精度：秒',
    pay_time           datetime comment '付款时间，时间戳，精度：秒，当为正向单据时必填',
    pay_amount         decimal(18,2) comment '付款金额',
    refund_amount      decimal(18,2) comment '退款金额',
    refund_time        datetime comment '退款时间，时间戳，精度：秒，当为逆向单据时必填',
    brand              varchar(100) comment '品牌枚举值',
    order_total_amount decimal(18,2) comment '订单总金额',
    order_belong       varchar(100) comment '订单归属员工（小程序才有，三方电商平台没有该字段）',
    goods_list         text comment '商品 json字符串{"goodsName":"xx","goodsPrice":"cc","goodsNumber":"vv"}',
    create_time        datetime,
    update_time        datetime,
    PRIMARY KEY (id),
    index bestseller_order_no_index (order_no),
    index bestseller_order_platform_id_index (order_platform, order_ouid)
) engine = innodb DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci comment = '订单信息表';


-- 建相同的表 方式一
create table bestseller_order_1 like bestseller_order_0;
create table bestseller_order_2 like bestseller_order_0;

```

## 2. 造数据

### 2.1. 建表

```sql :collapsed-lines=20

CREATE database if NOT EXISTS dev default character set utf8mb4 collate utf8mb4_unicode_ci;

use dev;

drop table if exists book;
create table book
(
    id               bigint auto_increment not null,
    title            varchar(100) comment '标题',
    name             varchar(100),
    author           varchar(100),
    price            numeric default 0,
    book_code        varchar(100),
    publisher        varchar(100),
    publication_year date,
    create_time      datetime,
    update_time      datetime,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COMMENT ='书';

show variables like 'log_bin_trust_function_creators';
set global log_bin_trust_function_creators = 1; -- 创建函数一定要写这个

drop procedure if exists insert_book;
drop function if exists random_num;
drop function if exists random_string;

```

### 2.2. 创建函数
```sql :collapsed-lines=20

-- 创建 随机字符串 函数
DELIMITER $$ -- 写函数之前必须要写，该标志
CREATE FUNCTION random_string(n INT) RETURNS VARCHAR(255)
BEGIN
    DECLARE chars_str VARCHAR(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
    DECLARE return_str VARCHAR(255) DEFAULT '';
    DECLARE i INT DEFAULT 0;
    WHILE i < n
        DO
            SET return_str = CONCAT(return_str, SUBSTRING(chars_str, FLOOR(1 + RAND() * 52), 1));
            SET i = i + 1;
        END WHILE;
    RETURN return_str;
END $$

-- 创建 随机数字 函数
DELIMITER $$
CREATE FUNCTION random_num()
    RETURNS INT(5)
BEGIN
    DECLARE i INT DEFAULT 0;
    SET i = FLOOR(100 + RAND() * 10);
    RETURN i;
END $$

```

### 2.3. 执行存储过程
```sql :collapsed-lines=20

-- 执行存储过程，往表添加随机数据
DELIMITER $$
CREATE PROCEDURE insert_book(IN START INT(10), IN max_num INT(10))
BEGIN
    DECLARE i INT DEFAULT 0;
    SET autocommit = 0;
    REPEAT
        SET i = i + 1;
#         INSERT INTO sys_user (user_id, username, password, salt, email, mobile, status)
#         VALUES (START + i, random_string(10), random_string(6), random_string(10), random_string(20), random_string(16),
#                 random_string(12));
         insert into book values ((START + i),
                                 random_string(10), -- title
                                 concat('name', (START + i)), -- name
                                 random_string(4), -- author
                                 random_num(), -- price
                                 random_string(8), -- book_code
                                 random_string(12), -- publisher
                                 curdate(),now(),now());
    UNTIL i = max_num
        END REPEAT;
    COMMIT;
END $$


-- 执行存储过程，往表添加5000万条数据
-- 如果想要修改的少一些，几十万数据量的话那就可以修改括号里面的数据，比如(100000,500000)这个就是10万-50万的数据量
DELIMITER ;
CALL insert_book(1, 1000);

```