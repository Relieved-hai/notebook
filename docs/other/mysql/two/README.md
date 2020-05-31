## SQL语言开发

初始 SQL

什么是SQL：一种描述性语言。

SQL语言的作用：对存储在 RDBMS 中的数据进行增删改查等操作。

常用的 SQL 语言的种类：DCL、DDL、DML、TCL

<br/>
<br/>
<br/>

访问控制

DCL ( Data Control Language )

- 建立数据库账号：create user

- 对用户授权：grant

- 收回用户权限：revoke



<br/>

建立程序使用的数据库账号

```shell script
CREATE USER [IF NOT EXISTS]
    user [auth_option] [, user [auth_option]] ...
    DEFAULT ROLE role [, role ] ...
    [REQUIRE {NONE | tls_option [[AND] tls_option] ...}]
    [WITH resource_option [resource_option] ...]
    [password_option | lock_option] ...
```

`user [auth_option]` 就是要建立的用户名，MySQL 的用户名是由两部分组成，`用户名@访问控制列表`（决定用户可以从哪些客户端访问）

<br/>

```shell script
$ CREATE USER mc_class@'192.168.1.%' IDENTIFIED WITH 'mysql_native_password' by '1234567';
```


- 用户名：`mc_class`

- 访问控制列表：`192.168.1.%`（ % 代表通配符 ）

- 指定 MySQL 认证加密方式：`IDENTIFIED WITH 'mysql_native_password'`

- 密码：`1234567`


<br/>

更多命令可以使用 help 查看。

```shell script
$ mysql -uroot -p

$ help

$ help create user

$ show plugins; // 查看插件
```

<br/>
<br/>
<br/>

### 1、创建用户

```shell script
$ CREATE USER mc_test@'192.168.1.%' IDENTIFIED BY '123456' WITH MAX_USER_CONNECTIONS 1;
```

- 指定用户最大只能有一个线程连接 `WITH MAX_USER_CONNECTIONS 1;`

<br/>
<br/>
<br/>

### 2、账号授权


```shell script
GRANT
    priv_type [(column_list)]
      [, priv_type [(column_list)]] ...
    ON [object_type] priv_level
    TO user_or_role [, user_or_role] ...
    [WITH GRANT OPTION]
```

`priv_type [(column_list)] [, priv_type [(column_list)]] ...`：权限列表 `show privileges;（ 查看当前版本所支持的权限列表 ）`

`ON [object_type] priv_level `：指定对数据库的什么对象授权，在哪个对象中授权，这个对象可以是一个数据库、表、存储过程、函数，都可以，如果要对表中的列进行授权的话，则需要在 权限列表（`show privileges;`）来指定一个列的列表，比如什么权限对应什么列是有效的。

`TO user_or_role [, user_or_role] ...`： 把对象权限授给指定用户或角色。

<br/>

- MySQL 的常用权限

| 权限名称 | 说明 |
| - | - |
| Insert | 向表中插入数据的权限 |
| Delete | 删除表中数据的权限 |
| update | 修改表中数据的权限 |
| Select | 查询表中数据的权限 |
| Execute | 执行存储过程的权限 |



```shell script
//

show privileges;
```


<br/>
<br/>

```shell script
// 给通过 `192.168.1.*` 网段访问的用户 mc_class 授予 mysql.user 表上的 user 和 host 列的查询权限
// 对表中某一列授予权限
$ GRANT select(user, host) on mysql.user to mc_class@'192.168.1.%';

// 给用户 mc_class 授予 mysql.user 表上所有列的查询权限
$ GRANT select on mysql.user TO mc_class@'192.168.1.%';

// 给用户 mc_class 授予 mysql 库中所有表的查询权限
$ GRANT select on mysql.* TO mc_class@'192.168.1.%';
```

<br/>
<br/>

GRANT 命令的注意事项：

- 使用 grant 授权的数据库账户必须存在

- 用户使用 grant 命令授权必须具有 grant option 的权限，也就是说，在给其他账户授权时，只能将自己拥有的权限进行授权。

- 获取命令帮助 `\h grant`



<br/>
<br/>
<br/>

### 3、收回授权

```shell script
REVOKE
    priv_type [(column_list)]
      [, priv_type [(column_list)]] ...
    ON [object_type] priv_level
    FROM user_or_role [, user_or_role] ...
```

要注意的是，这个权限是我们曾经使用 `GRANT 命令` 授予过的权限。同样不能收回这个用户并没有的权限的。

<br/>

🌰


```shell script
$ GRANT select, delete, insert, update ON mysql.* TO mc_class@'192.168.1.%';
```

`mysql 数据库` 是一个 MySQL 的系统库，是不允许普通用户进行修改的。


```shell script
// 收回用户 mc_class 在 mysql 库中所有表 delete, insert, update 操作
REVOKE delete, insert, update ON mysql.* FROM mc_class@'192.168.1.%';
```


<br/>
<br/>
<br/>

### 创建数据库对象

DDL ( Data Definition language )

- 建立/修改/删除数据库：create/alter/drop database

- 建立/修改/删除表：create/alter/drop table

- 建立/删除索引：create/drop index

- 清空表：truncate table

- 重命名表：rename table

- 建立/修改/删除视图：create/alter/drop view


<br/>
<br/>
<br/>

**1、建立数据库 imc_db**

```shell script
// 创建:  db_name(数据名称)
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
    [create_specification] ...

// 修改:  也只是字符集和排序规则
ALTER {DATABASE | SCHEMA} [db_name]
    alter_specification ...

// 删除: 删除后, 只能通过备份进行恢复
DROP {DATABASE | SCHEMA} [IF EXISTS] db_name

// 设置字符集和排序规则
create_specification:
    [DEFAULT] CHARACTER SET [=] charset_name
  | [DEFAULT] COLLATE [=] collation_name
```

<br/>

```shell script
$ CREATE DATABASE imc_db;
```


<br/>

**2、建立数据库 imc_db 中的表**

> 新增

```shell script
// 用了这个关键字 TEMPORARY , 则创建的是临时表, 也就是建立当前表的线程可以访问的表, 当前线程退出后, 表就被删除了
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
    (create_definition,...)
    [table_options]
    [partition_options]

// 表定义部分: 定义列名称, 数据类型, 表的主键和索引
create_definition:
    col_name column_definition
  | PRIMARY KEY [index_type] (index_col_name,...)
  | {INDEX|KEY} [index_name] [index_type] (index_col_name,...)
  | UNIQUE [INDEX|KEY] [index_name] [index_type] (index_col_name,...)

// 列的定义: 指定列的数据类型, 列的属性(列是否为空, 默认值, 是否自增, 是否是主键, 唯一索引, 备注信息)
column_definition:
    data_type [NOT NULL | NULL] [DERAULT default_value]
      [AUTO_INCREMENT] [UNIQUE [KEY]] [[PRIMARY] KEY]
      [COMMENT 'string']

// 表的选项: 表的备注, 存储引擎, 字符集, 排序规则
table_options:
   | COMMENT [=] 'string'
   | ENGINE [=] engine_name
   | [DEFAULT] CHARACTER SET [=] charset_name
   | [DEFAULT] COLLATE [=] collation_name
```

> 查看完整语法 '$ help create table'


<br/>

> 修改

```shell script
// 指定要修改的表是什么
ALTER TABLE tbl_name
    [alter_specification [, alter_specification] ...]
    [partition_options]

// 修改的内容
// ADD 关联自和所要新增的列的定义来在表中增加一列（列的名称、和数据类型），并且还可以是使用 FIRST | AFTER 关键字，来指定新列在表中的自定位置
// ALTER 修改列的默认值的设置
// CHANGE 修改列名的同时，来修改列的定义
// MODIFY 在不修改列名的情况下，来修改列的定义、位置
// DROP 关键字来删除表中不需要的列，
alter_specification:
    table_options
  | ADD [COLUMN] col_name column_definition [FIRST | AFTER col_name]
  | ALTER [COLUMN] col_name {SET DEFAULT {literal | (expr)} | DROP DEFAULT}
  | CHANGE [COLUMN] old_col_name new_col_name column_definition [FIRST|AFTER col_name]
  | MODIFY [COLUMN] col_name column_definition [FIRST | AFTER col_name]
  | DROP [COLUMN] col_name
  | RENAME COLUMN old_col_name TO new_col_name
```


> 查看完整语法 '$ help alter table'

<br/>

> 删除

```shell script
// 删除
DROP [TEMPORARY] TABLE [IF EXISTS] tal_name [, tbl_name] ...
```





<br/>

<br/>

<br/>



## 创建数据库对象



> 设置字符集

```mysql
SET character_set_client = utf8mb4 ;
```





> 课程表



```mysql
CREATE TABLE `imc_course` (
  `course_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `title` varchar(20) NOT NULL DEFAULT '' COMMENT '课程主标题',
  `title_desc` varchar(50) NOT NULL DEFAULT '' COMMENT '课程副标题',
  `type_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '课程方向ID',
  `class_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '课程分类ID',
  `level_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '课程难度ID',
  `online_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '课程上线时间',
  `study_cnt` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '学习人数',
  `course_time` time NOT NULL DEFAULT '00:00:00' COMMENT '课程时长',
  `intro` varchar(200) NOT NULL DEFAULT '' COMMENT '课程简介',
  `info` varchar(200) NOT NULL DEFAULT '' COMMENT '学习需知',
  `harvest` varchar(200) NOT NULL DEFAULT '' COMMENT '课程收获',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '讲师ID',
  `main_pic` varchar(200) NOT NULL DEFAULT '' COMMENT '课程主图片',
  `content_score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '内容评分',
  `level_score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '简单易懂',
  `logic_score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '逻辑清晰',
  `score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '综合评分',
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `udx_title` (`title`)
) COMMENT='课程主表';
```





`auto_increment`： 表示这一列是自增 id 列，MySQL 在插入数据的时候，会自动来生成自增 id 的序列，并且 MySQL 会限制当前表中只能存在一个有  `auto_increment`  的列，且在这个列必须是这个表的主键，或者说是唯一索引的一部分，因此在表最后使用  `PRIMARY KEY`  来定义  `auto_increment`  。



`NOT NULL`： 标识该列为非空的，这主要是为了优化表的查询性能所考虑的，因为在这个  `B-Tree`  索引中，并不能对空值进行索引，并且还使用  `DEFAULT`  关键字，给每一个具有非空属性的列定义了一个默认值。



`UNIQUE KEY`：我们在课程主标题列上定义一个唯一索引，这就保证了在课程主表中，课程的标题是不重复且唯一的，这么做的目的是将课程主标题来作为我们的业务主键来使用。



`COMMENT`：定义备注信息



<br/>

<br/>

<br/>



> 课程章节表



 ```mysql
CREATE TABLE `imc_chapter` (
  `chapter_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '章节ID',
  `course_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '课程ID',
  `chapter_name` varchar(50) NOT NULL DEFAULT '' COMMENT '章节名称',
  `chapter_info` varchar(200) NOT NULL DEFAULT '' COMMENT '章节说明',
  `chapter_no` tinyint(2) unsigned zerofill NOT NULL DEFAULT '00' COMMENT '章节编号',
  PRIMARY KEY (`chapter_id`),
  UNIQUE KEY `udx_couseid` (`course_id`,`chapter_name`)
) COMMENT='课程章节';
 ```



`UNIQUE KEY`： 定义了一个联合的唯一索引，也就是这两个列的组合是不能重复，而单独的出现重复是没有问题的。



<br/>

<br/>

<br/>



> 课程小节表



```mysql
CREATE TABLE `imc_subsection` (
  `sub_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '小节ID',
  `chapter_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '章节ID',
  `course_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '课程ID',
  `sub_name` varchar(50) NOT NULL DEFAULT '' COMMENT '小节名称',
  `sub_url` varchar(200) NOT NULL DEFAULT '' COMMENT '小节URL',
  `video_type` enum('avi','mp4','mpeg') NOT NULL DEFAULT 'mp4' COMMENT '视频格式',
  `sub_time` time NOT NULL DEFAULT '00:00:00' COMMENT '小节时长',
  `sub_no` tinyint(2) unsigned zerofill NOT NULL DEFAULT '00' COMMENT '章节编号',
  PRIMARY KEY (`sub_id`),
  UNIQUE KEY `udx_chapterid_courseid_subname` (`chapter_id`,`course_id`,`sub_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9834 DEFAULT CHARSET=utf8 COMMENT='课程小节表';
```



 <br/>

<br/>

<br/>



> 课程分类表



```mysql
CREATE TABLE `imc_class` (
  `class_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '课程分类ID',
  `class_name` varchar(10) NOT NULL DEFAULT '' COMMENT '分类名称',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '填加时间',
  PRIMARY KEY (`class_id`)
) COMMENT='课程分类';
```



 <br/>

<br/>

<br/>



> 课程方向表



```mysql
CREATE TABLE `imc_type` (
  `type_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '课程方向ID',
  `type_name` varchar(10) NOT NULL DEFAULT '' COMMENT '课程方向名称',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '填加时间',
  PRIMARY KEY (`type_id`)
) COMMENT='课程方向表';
```



 <br/>

<br/>

<br/>



> 课程难度表



```mysql
CREATE TABLE `imc_level` (
  `level_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '课程难度ID',
  `level_name` varchar(10) NOT NULL DEFAULT '' COMMENT '课程难度名称',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '填加时间',
  PRIMARY KEY (`level_id`)
) COMMENT='课程方向表';
```



 <br/>

<br/>

<br/>



> 用户表



```mysql
CREATE TABLE `imc_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_nick` varchar(20) NOT NULL DEFAULT '慕课网' COMMENT '用户昵称',
  `user_pwd` char(32) NOT NULL DEFAULT '' COMMENT '密码',
  `sex` char(2) NOT NULL DEFAULT '未知' COMMENT '性别',
  `province` varchar(20) NOT NULL DEFAULT '' COMMENT '省',
  `city` varchar(20) NOT NULL DEFAULT '' COMMENT '市',
  `Position` varchar(10) NOT NULL DEFAULT '未知' COMMENT '职位',
  `mem` varchar(100) NOT NULL DEFAULT '' COMMENT '说明',
  `exp_cnt` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '经验值',
  `score` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '积分',
  `follow_cnt` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '关注人数',
  `fans_cnt` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '粉丝人数',
  `is_teacher` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '讲师标识,0:普通用户,1:讲师用户',
  `reg_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `user_status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态 1:正常 0:冻结',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `udx_usernick` (`user_nick`)
) COMMENT='用户表';
```



 <br/>

<br/>

<br/>



> 问答评论表



```mysql
CREATE TABLE `imc_question` (
  `quest_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `course_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '课程ID',
  `chapter_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '章节ID',
  `sub_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '小节ID',
  `replyid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父评论ID',
  `quest_title` varchar(50) NOT NULL DEFAULT '' COMMENT '评论标题',
  `quest_content` text COMMENT '评论内容',
  `quest_type` enum('问答','评论') NOT NULL DEFAULT '评论' COMMENT '评论类型',
  `view_cnt` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '浏览量',
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  PRIMARY KEY (`quest_id`)
) COMMENT='问答评论表';
```





 <br/>

<br/>

<br/>



> 用户笔记表



```mysql
CREATE TABLE `imc_note` (
  `note_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '笔记ID',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `course_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '课程ID',
  `chapter_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '章节ID',
  `sub_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '小节ID',
  `note_title` varchar(50) NOT NULL DEFAULT '' COMMENT '笔记标题',
  `note_content` text COMMENT '评论内容',
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  PRIMARY KEY (`note_id`)
) COMMENT='笔记表';
```









 <br/>

<br/>

<br/>



> 课程评价表



```mysql
CREATE TABLE `imc_classvalue` (
  `value_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '评价ID',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `course_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '课程ID',
  `content_score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '内容评分',
  `level_score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '简单易懂',
  `logic_score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '逻辑清晰',
  `score` decimal(3,1) NOT NULL DEFAULT '0.0' COMMENT '综合评分',
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  PRIMARY KEY (`value_id`)
) COMMENT='课程评价表';
```







 <br/>

<br/>

<br/>



> 选课表



```mysql
CREATE TABLE `imc_selectcourse` (
  `select_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '选课ID',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `course_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '课程ID',
  `select_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '选课时间',
  `study_time` time NOT NULL DEFAULT '00:00:00' COMMENT '累积听课时间',
  PRIMARY KEY (`select_id`)
) COMMENT='用户选课表';
```



<br/>

<br/>

<br/>



## 维护表中的索引



在建好表后，就可以往表中写入数据，但是我们写入数据的最终目的，并不是为了存储，而是为了使用这些数据，而在使用过程中，为了提高数据的查询效率，不可避免需要在表中建立一些索引，在建立数据表结果的时候，根据业务对数据的要求，建立过一些索引，这些索引的主要目的是为了限制存储在表中的数据，包括每个表的主键索引和唯一索引，如果我们知道之后，如何使用这些数据，我们也可以在建立表的同时，建立一些其他的索引，因此可见，我们可以使用表的建立、或修改语句来创建索引，除此之外，还有另一种创建索引的方式，就是使用  `CREATE INDEX `  语句建立索引。由于我们需要根据具体业务的查询语句，来决定如何建立索引。



<br/>



> 创建

```mysql
CREATE [UNIQUE] INDEX index_name
  ON tbl_name (index_col_name,...)

index_col_name:
  col_name [(length)] [ASC | DESC]
```



`ON`：来指定在哪个表上，哪个列中建立索引，`index_name` 索引的名字，建立索引列的列表要包括在小括号中，并且可以指定是按升序，还是降序来进行排列，另外还可以使用  `UNIQUE`  来指定我们所建立的索引的列是否可以有重复数据，这里要注意，如果建立的联合的多类的索引，只要所有这些建立索引的列值组合起来是不重复的就可以了，而不是指每一列的值都不能重复。



<br/>



> 删除



```mysql
DROP INDEX index_name ON tbl_name
```



删除索引并不会对表中的数据照成影响，但是可能会影响之前 SQL 的执行计划。





<br/>



> 其他的 DDL 语句



- 清空表： `TRUNCATE TABLE imc_note;`

  `TRUNCATE` 所做的实际操作就是，先进行 `DROP` ，然后在 `CREATE`  一个相同结构的表，因此其删除全表的速度，要比使用 `DELETE` 全表数据要快很多，并且也不会生成大量的二进制日志，这是它的优点，缺点就是无法通过二进制日志的反解析，对它进行恢复。

- 重命名表：`RENAME TABLE imc_note TO bak_imc_note;`































































