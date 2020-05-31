## 操作表



>  数据操作语句：DML（  Data Manipulation language ）



<br/>



- 新增表中的数据：insert into
- 删除表中的数据：delete
- 修改表中的数据：update
- 查询表中的数据：select



<br/>



## INSERT



## 向表中写入数据


![](./images/insert_01.svg)

`tbl_name` ：要插入的表名

`{VALUES | VALUE}`：要插入的值



在这两个属性后还可以提供要插入的表的清单，以及对应的要插入的值的清单，另外默认清空下，我们会在项目具有主键或者唯一索引的表中，插入数据时，如果出现主键或唯一索引的冲突，插入的操作可能就会别回滚。那么避免这种情况发生，我们可以在  `INSERT`  语句中，利用 `ON DUPLICATE KEY UPDATE` 来解决这个问题，来决定当出现主键或者唯一索引冲突的时候的操作行为，如我们可以指定像表中写入数据时，出现唯一索引冲突的话，则更新表中的某几列的值，为新的插入数据的值。



<br/>



编写 INSERT 语句的思路



- 确认要把数据插入到那个表中 `imc_class`
- 确认表的数据库结构，那些列不能为 NULL，哪些列可以为 NULL，对于不能为 NULL 的列是否有默认值。`class_name`
  -  通过 `SHOW CREATE TABLE imc_class` 来查看表结构。

- 确认对于插入列的插入值的清单 `values('MySQL'),('Redis')`


![](./images/insert_02.svg)

<br/>

在这个表中  `class_name`   是业务主键，它是不能重复的，但在之前建立表的时候，并没有在这一列上建立唯一索引，这里要使用  `CRTATE INDEX`  语句来建立唯一索引。

![](./images/create_unique_01.svg)

<br/>



在一次执行上面的插入语句（ `增加课程分类表的数据` ），就会出现一个错误 `1062 - Duplicate entry 'MySQL' for key 'imc_class.uqx_classname', Time: 0.002000s`;  这是这条语句并没有成功，表中的值依然没有改变，这个时候，如果想把数据写入的时间改为最新写入的时间，那么这个时候就使用 `ON DUPLICATE KEY UPDATE` 语句了。



![](./images/insert_03.svg)

<br/>

当出现索引约束重复的情况下，可能是唯一索引冲突，也可能是主键冲突违反这个约束的情况下，就会触发 `ON DUPLICATE KEY UPDATE`  事件，这时候我们就会把表中 `add_time`  的值更新为当前的时间。


当执行这条语句时，会提示两行数据收到影响。因为它的实际操作就是先要删除原来的值，并且把这个值替换成当前时间的值。因此可能是做了两次操作。


<br/>
<br/>
<br/>


## SELECT

## 查询表中的数据



> 这是最为频繁也是最为复杂的语句，从一定程度上，是否能用好 SELECT 语句是衡量掌握 SQL 语言能力的一个关键。


![](./images/select_01.svg)


组成  `SELECT`  语句的从句、关键字一共有三个

- 一个是 `SELECT` 从句本身，甚至可以说 `SELECT` 从句就是  `SELECT`  语句中唯一必选的一个关键字，在  `SELECT`  语句之后，跟着的内容则是，我们希望在表中，所取的列，这个列表可以是表中所存在的列，也可以是几个列计算后所产生的一个列，或者干脆就是一个计算的表达式，如我们可以在   `SELECT`  语句中这样来执行。




![](./images/select_02.svg)


<br/>



- `FROM`  子句：用于指定哪个数据库哪个表中查询数据，可以列出所要从中获取数据的表名，这个表可以是一个物理表，也可以是一个视图，或者是由其他的 `SELECT` 语句所产生的一个衍生表。


![](./images/select_03.svg)

`SELECT *`：表中的所有列，但这不是一个很好的习惯，因为如果取出所有列，如果这些列中有些是我们不需要使用的，这个情况下，一方面会带来一些 IO 的消耗，另一方面，对于一些特殊的数据类型，如 text 这样的列，还会影响 `SELECT` 查询的性能，所以推荐只查询需要的列。



<br/>



- `WHERE` 子句



和表中的所有列一样，我们有时候也并不是需要表中的所有行，可以通过 `WHERE` 子句来过滤。



![](./images/where_01.svg)


一般会这样来写一个 SQL

1、首先会确认所需的数据来自哪个表中，`FROM imc_course ` 。

2、如果对这个表的结构不熟悉，就可以先查看一下，然后就知道所需的数据来自哪一列中，`SELECT title`

3、这时候在写查询过滤的条件，查询  `title` 字符串中  `LIKE ( 比较运算符 )` 包含 `MYSQL` 的字符串的 `title`，`%` 作为通配符来使用，相当于正则表达式中的 `*`，  `WHERE title LIKE '%MYSQL%'`





<br/>



## 编写查询语句的思路



- 首先确定我们要获取的数据存在什么表中。( 确定 `FROM` 子句 )
- 其次是确定我们要取出表中的什么列。( 确定 `SELECT` 子句 )
- 确定是否需要对表中的数据进行过滤。( 确定 `WHERE` 子句  )





MySQL 的比较运算符



| 比较运算符                    | 说明                                             |
| :---------------------------- | ------------------------------------------------ |
| =   >   <   >=   <=   <>   != | `<>` 和 `!=` 都表示不等于                        |
| BETWEEN min AND max           | 在两值之间，列的值大于等于最小值，小于等于最大值 |
|                               | 上面的运输符都是无法与空值、`null`  值比较的     |
| IS NULL、IS NOT NULL          | 判断列的值是否为 `NULL`                          |
| LIKE、NOT LIKE                | `%` 代表任何数量的字符，`_` 代表任何一个字符     |
| IN、NOT IN                    | 判断列的值是否在指定的范围内                     |



<br/>
<br/>
<br/>


![](./images/1.svg)

<other-mysql-three-1/>

<br/>

<br/>

<br/>



**如果合并 WHERE 子句中的多个过滤条件？**



> MySQL 逻辑运算符



| 逻辑运算符 | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| AND，&&    | `AND` 运算符两边的表达式都为真时，返回结果才为真。           |
| OR，\|\|   | `OR` 运算符两边的的表达式有一条为真，返回结果就是真。        |
| XOR        | `XOP` 运算符两边的表达式一真一假时返回真，两真两假时返回假。 |

<br/>
<br/>
<br/>

![](./images/2.svg)

<other-mysql-three-2/>


:::warning

任何运算符和 NULL 值运算结果都为 NULL。我们在进行逻辑运算的时候，一定要注意表达式的列是不是可能有 NULL 值，那么逻辑表达式的结果就可能是不正确的。这就是在定义表时，都不允许为空的原因之一。

:::



<br/>

<br/>

<br/>



操作表



**如何从对个表中获取数据？**



- 表与表之间要存在一定的关联关系。

​      简单来说，就是要同时查询的这两个表，A 和 B 中，B 表中要存储 A 表的主键，或业务主键。而 B 表中存储 A 表中的这些键，还要一个学名（ 外键 ）。



<br/>

<br/>

<br/>



## 使用 JOIN 关联多个表



**JOIN**：对于关系查询，`MySQL` 支持两种不同的关联

- `INNER JOIN`：内连接

![inner_join](./images/inner_join.png)

简单来说，以 A 、B 为例，两个表的内关联，就是找出这两个表中通过关联键关联之后，都存在的一些数据，从数学的角度讲就是求两个表的 **交集**。



- `OUTER JOIN`：外连接

  - `LEFT JOIN`：左外关联，左连接

    若 A、B 两个表进行左关联，那么结果集中将包含左表（ A表 ）的所有记录，即使这些记录在右表（ B表 ）中没有符合连接条件的查询，就意味着即使符合 `ON` 语句的数据在 B 表中的匹配是 0 行，那么连接操作，还是可以返回 A 表中的所有记录条数，只不过，这条记录中所有的信息都是来自 A 表中，而 B 表中的每一列值都为空，这意味着左外连接，会返回左表中的所有记录，和右表中匹配记录的组合，如果右表中没有匹配记录，那么来自右表中的所有列的值都为空。也就是求两个表A表和B表的 **交集外加左表剩下的数据**。



    从集合的观点上来看，**第一个左外关联**：取出来的是两个集合的并集，除此之外，外关联可以用于取出两个结果集的补集，也就是可以通过外关联获取出只属于集合 A，而不属于集合 B 的数据，那么这种查询一般用于查询不存在于某一个表中的数据，比如，当我们需要查询出所有没有章节信息的课程时，就可以使用这种外关联。



    **第二种左外关联**：查询出只存在于 A 表中，而不存在于 B 表中的数据，我们只需要在原有的左外关联基础上，在增加一个 `WHERE B.KEY IS NULL` 过滤条件，过滤出来所有 B 表中数据为空的数据就可以了。实际上就实现了 B 集合对于 A 集合的补集的查询，也就是实现了数据不存在于某一个表中的一种查询方式。

    ![left_join_01](./images/left_join_01.png) ![left_join_02](./images/left_join_02.png)



  - `RIGHT JOIN`：右关联

     右关联与左关联是类似的，只不过连接表的顺序刚好相反，如果 A 表右关联 B 表，那么右表 B 中的每一行的连接都至少出现一次，也就是所以右表的数据都会在结果中出现，如果 B 表的记录在左表 A 中被找到匹配的行，连接表中来源于 A 的列都会为空。

​       同样，右关联也可以查询出两个结果集的并集和补集，在查询并集的时候，使用关键字 `RIGHT JOIN` ,而在查询两个集合的补集时，则需要增加 `WHERE A.KEY IS NULL` 的过滤条件。

![right_join_01](./images/right_join_01.png) ![right_join_02](./images/right_join_02.png)



<br/>

<br/>


![](./images/3.svg)

<other-mysql-three-3/>

<br/>

<br/>

<br/>



## GROUP BY、HAVING

![](./images/gy_01.svg)

<br/>

`GROUP BY...HAVING` 子句的作用

​    把结果集按某些列分成不同的组，并对分组后的数据进行聚合操作。


   🌰


> 课程列表

| 难度 | 课程名称 |
| ---- | -------- |
| 入门 | ...      |
| 初级 | ...      |
| 高级 | ...      |
| 中级 | ...      |
| 入门 | ...      |
| 中级 | ...      |
| 入门 | ...      |
| 初级 | ...      |
| 初级 | ... |



> 看每种难度的课程有多少门

| 难度 | 课程数量 |
| ---- | -------- |
| 入门 | 3        |
| 初级 | 3        |
| 中级 | 2        |
| 高级 | 1        |



>SQL

```mysql
-- GROUP BY 后面出现的列名，称之为分组键
-- 意思就是说要按照 level_name 的值，来进行分组，每个 level_name 值，在结果表中只会有一行记录。
-- 如上表所示
-- 分组键除了在 GROUP BY 中出现之外，也会在 SELECT 语句中出现，除此之外，还可以有一个或多个聚合函数，这里的 count，就是一个聚合函数
-- 有一点要特别注意：就是所有出现在 SELECT 语句中的非聚合函数的列，都应该同时出现在 GROUP BY 子句之后，因为 MYSQL 在这种宽松的 sql_mode 下，是可以支持 SELECT 子句中非聚合函数列同 GROUP BY 子句中的分组键不同的情况，但是这种情况下，查询的结果，可能并不正确。
SELECT
	level_name,
	count(*)
FROM
	imc_course a
	JOIN imc_level b ON b.level_id = a.level_id
GROUP BY
	level_name;


-- 查看当前 sql_mode
SHOW VARIABLES LIKE 'sql_mode';
```





<br/>

<br/>



> 就是所有出现在 SELECT 语句中的非聚合函数的列，都应该同时出现在 GROUP BY 子句之后

```mysql
-- 统计每个分类下不同难度的课程的数量
-- FROM：课程主表 和 课程分类表 通过 class_id 进行关联，课程主表 和 难度分类表 通过 level_id 进行关联
-- SELECT：查询 难度名称，分类名称
-- GROUP BY：所有出现在 SELECT 语句中的非聚合函数的列，都应该同时出现在 GROUP BY 子句之后，不然在非宽松模式下的 sql_mode 它将会报 1055，在宽松模式下，查询的数据不准确，完整的将 SELECT 后的非聚合列写在 GROUP BY 之后，查询结果正确。
SELECT level_name, class_name
FROM
	imc_course a
	JOIN imc_class b ON b.class_id = a.class_id
	JOIN imc_level c ON c.level_id = a.level_id
	GROUP BY level_name,class_name;
```



<br/>

<br/>

<br/>



**HAVING 子句**



- 可以通过可选的 HAVING 子句对聚合后的数据进行过滤



HAVING 子句在 GROUP BY 子句中的作用：可对分组聚合后的数据进行过滤，就同分组前 WHERE 子句类似，我们在 WHERE 子句中是无法使用聚合函数的。但是在 HAVING 子句中是可以的。



```mysql
-- 统计每个分类下课程大于 3 门的课程难度有哪些
-- 首先需要关联的表，课程数量要用到课程表,同时，每个分类下，大于 3 门的难度课程有哪些，有哪些分类下的难度是大于 3 门课程的，所以需要包括分类信息（分类表） imc_course a JOIN imc_class b ON b.class_id = a.class_id，难度信息是在难度表中，通过 level_id 进行两个表的关联 JOIN imc_level c ON c.level_id = a.level_id。
-- 需要查询什么：class_name，level_name，数量
-- 通过 level_name,class_name 进行分组，
-- WHERE 中是不支持聚合函数的
-- HAVING：则支持，且课程数量大于 3 门的，用 HAVING	count(*) > 3 进行过滤
SELECT
	class_name,
	level_name,
	COUNT(*)
FROM
	imc_course a
	JOIN imc_class b ON b.class_id = a.class_id
	JOIN imc_level c ON c.level_id = a.level_id
GROUP BY
	class_name,
	level_name
HAVING
	count(*) > 3;
```





<br/>



**GROUP BY 通常和 HAVING 一起使用**



<br/>

<br/>

<br/>



## 常用的聚合函数



| 聚合函数              | 说明                                   |
| --------------------- | -------------------------------------- |
| COUNT(*) / COUNT(col) | 计算符合条件的数据行数                 |
| SUM(col_name)         | 计算表中符合条件的数值列的合计值       |
| AVG(col_name)         | 计算表中符合条件的数值列的平均值       |
| MAX(col_name)         | 计算表中符合条件的任意列中数据的最大值 |
| MIN(col_name)         | 计算表中符合条件的任意列中数据的最小值 |





<br/>



> COUNT

```mysql
-- 统计课程表的总课程数
-- COUNT( * ) 代表所有列的行数
SELECT
	COUNT(*)
FROM
	imc_course;-- 统计课程表中某一列的数量

-- COUNT( 列名 ) 代表指定列的行数
SELECT
	COUNT( course_id )
FROM
	imc_course;

-- 去重，统计出课程表中有多少个不同的讲师
-- DISTINCT 去重表达式，去重列（ 讲师列，也就是 user_id ）
SELECT
	COUNT( course_id ),
	COUNT( DISTINCT user_id )
FROM
	imc_course;
```



<br/>



> SUM



```mysql
-- 统计出所有课程总的学习人数
SELECT
	SUM( study_cnt )
FROM
	imc_course;


-- 统计出不同难度课程的学习人数
-- 结合 GROUP BY 进行使用
SELECT
	level_name,
	SUM( study_cnt )
FROM
	imc_course a
	JOIN imc_level b ON b.level_id = a.level_id
GROUP BY
	level_name;
```



<br/>



> AVG

```mysql
-- 统计出每门课程的平均学习人数
-- 第一种方式：用 SUM 统计所有学习人数 / 课程数
-- 第二种方式：直接用 SVG 求平均值
SELECT
	SUM( study_cnt )/ COUNT(*),
	AVG( study_cnt )
FROM
	imc_course;



-- 利用课程评价表中的评分，更新课程表中课程的评分
--
-- 课程评价表是每个用户对每门课程的学习评分，所以先要通过聚合函数和分组按课程ID进行分组，求出来每个用户对每一门课程的平均打分是多少，然后在更新到表中，（ 更新操作先不实现 ）
-- FROM：所有信息都来自于学习评价表 imc_classvalue
-- SELECT：课程id ( course_id )，通过聚合函数 AVG() 计算出 content_score 的平均值，并起了一个别名 avg_content
-- GROUP BY：SELECT 后所有的非聚合函数都必须跟在 GROUP BY 后，按课程ID ( course_id ) 分组
SELECT
	course_id,
	AVG( content_score ) AS avg_content,
	AVG( level_score ) AS avg_level,
	AVG( logic_score ) AS avg_logic,
	AVG( score ) AS avg_score
FROM
	imc_classvalue
GROUP BY
	course_id;
```



<br/>



> MAX



```mysql
-- 查询出学习人数最多的课程
-- FROM：从课程表中
-- SELECT：查 title
-- WHERE：过滤条件是 study_cnt = 一个子查询（ 子查询查询出的是学习人数最多的一门课程人数 ）
SELECT
	title
FROM
	imc_course
WHERE
	study_cnt = ( SELECT MAX( study_cnt ) FROM imc_course )
```



子查询可以看做一个查询后的结果集，一个临时表来使用，子查询可以使用在 `SELECT` 、`FROM`、`WHERE` 从句中。后面会说到比子查询更好的查询。





<br/>

<br/>

<br/>



## ORDER BY



在进行以上的查询，我们所生产的结果集，都是无序的，如果希望查询结果是按某一列的顺序进行排列的，那就要     `ORDER BY` 了。





**使用 Order by 子句对查询结果进行排序**

- 使用 `ORDER BY` 子句是对查询结果进行排序的最安全方法。
  - 存储引擎不同，默认的排序也不同
- 列名后增加 `ASC` 关键字指定按该列的升序进行排序，或指定 `DESC` 关键字指定按该列的降序排列
- `ORDER BY`  子句也可以使用 `SELECT` 子句中未出现的列或是函数
  - 与 `GROUP BY` 不同，`ORDER BY` 是允许这样做的



<br/><br/>



```mysql
-- 查询出每门课程的学习人数并按学习人数从高到底排列
SELECT
	title,
	study_cnt
FROM
	imc_course
ORDER BY
	study_cnt DESC;
```





<br/>

<br/>

<br/>



## Limit

使用 Limit 子句限制返回结果集的行数



- 常用于数据列表分页
- 一定要和 `order by` 子句配合使用
- limit 起始偏移量，结果集的行数



<br/>



```mysql
-- 分页返回课程ID和课程名称，每页返回10行记录
-- FROM：所有数据来源于课程表
-- SELECT：查询 课程ID、课程名
-- ORDER BY：可以使用非 SELECT 语句未出现的列，按学习人数进行排序
-- LIMIT：返回行的位置，以及返回条数，要第 0 页，每页 10 条数据，是从 0 开始的
SELECT
	course_id,
	title
FROM
	imc_course
ORDER BY
	study_cnt DESC
	LIMIT 0,
	10;
```



<br/>

<br/>

<br/>


## 视图



 DDL 语句中遗漏的问题：视图



**创建视图**



视图是一个逻辑的存储结构，也可以看做是一个虚拟的表，我们可以像查询表一样，来查询视图，但是在视图中，并不存储任何的数据，所有的数据都存储在生成视图所定义的查询的物理表中的。



<br/>



```mysql
-- 定义视图的基础语法
-- CREATE VIEW：创建视图，并定义一个名词 view_name
-- AS：后面跟的就是我们所熟悉的查询语句了。这个查询语句就是定义了视图的结构和数据
CREATE VIEW view_name
AS
  SELECT
    [ALL | DISTINCT | DISTINCTROW ]
    select_expr [, select_expr ...]
    [FROM table_references
    [WHERE where_condition]
```



<br/>

<br/>

<br/>



🌰🌰🌰：



```mysql
-- 定义一个包括课程ID，课程名称，课程分类，课程方向以及课程难度的视图
-- FROM：需要查询的数据分别在不同的表中，那么需要对它们都进行关联
-- SELECT：需要查询 课程表中的 course_id，title，b 中的方向名，c 中的难度名，d 中的分类名
-- CREATE VIEW：最后定义一个视图，起个名，在加个 AS 关键字，就完成了视图的定义
CREATE VIEW vm_course AS SELECT
a.course_id,
a.title,
b.class_name,
c.level_name,
d.type_name
FROM
	imc_course a
	JOIN imc_class b ON b.class_id = a.class_id
	JOIN imc_level c ON c.level_id = a.level_id
	JOIN imc_type d ON d.type_id = a.type_id;
```



<br/>



```mysql
-- 接下来通过查询视图，就可以达到查询这四个表关联的 SQL 语句的一个效果。
SELECT
	*
FROM
	vm_course
```



<br/>

<br/>

<br/>



## DELETE



在工作中，除了写入数据和查询数据之外，我们有时候也需要对一些数据进行删除操作，如一些对于业务来说，重复的数据我们就需要删除它。





```mysql
DELETE
    FROM table_name
      [WHERE where_condition]
      [ORDER BY ...]
      [LIMIT row_count]
```



在删除数据前，同样要查找到需要删除的数据，`DELETE` 同样支持 `FROM、WHERE、ORDER BY、LIMIT` 这样的子句，并且这些子句的作用也同 `SELECT` 语句中是相同的。



<br/>

<br/>



**编写 DELETE 语句的思路**



- 确定要删除的数据存储在那张表中 ( `FROM 子句` )
  - 如果要删除的数据是存储在多张表中，需要多表关联才能确认要什么数据的话，在这里同样可以是用在 `JOIN` 来关联多表。
- 确认删除数据的过滤条件 ( `WHERE 子句` )
  - 如果要删除整张表，可以不带 `WHERE` 子句，但是更推荐使用 `truncate table`
- 确认是否只删除有限条数据 ( `ORDER BY ... LIMIT 子句` )
  - 可以指定要按照什么顺序去删除数据，但是要注意的是，这里的 `LIMIT` 子句只有一个参数，就是要删除数据的最大行数





<br/>

<br/>



🌰🌰🌰：

```mysql
-- 删除课程表中没有章节信息的课程
--
-- 1、查询在课程表中，但是没有在章节表中的信息，就可以得知需要删除的课程列
SELECT
	a.course_id,
	a.title
FROM
	imc_course a
	LEFT JOIN imc_chapter b ON b.course_id = a.course_id
WHERE
	b.chapter_id IS NULL;

-- 2、只需要把 SELECT 替换成 DELETE，并告诉它需要删除 a 表中的数据
DELETE a
FROM
	imc_course a
	LEFT JOIN imc_chapter b ON b.course_id = a.course_id
WHERE
	b.chapter_id IS NULL;
```





<br/>

<br/>

<br/>



要在表上创建一个唯一索引，首先要保证这个表中的这一列的数据是不能重复的，如果有了重复的数据，先要删除它，在建立唯一索引。

```mysql
-- 删除课程方向表中重复的课程方向，
-- 保留方向ID最小的一条，并在方向名称上增加唯一索引
--
-- 1、要在表上创建一个唯一索引，首先要保证这个表中的这一列的数据是不能重复的，如果有了重复的数据，先要删除它，在建立唯一索引。
-- 2、检查是否存在重复数据，通过 GROUP BY 进行分组，HAVING 过滤条件为出现次数大于一的，查出它的分类名以及出现次数

SELECT
	type_name,
	COUNT(*)
FROM
	imc_type
GROUP BY
	type_name
HAVING
	COUNT(*) > 1;

-- 3、查询 ID 最小的，也就是要保存下来的
SELECT type_name, MIN(type_id) AS min_type_id, COUNT(*)
FROM imc_type
GROUP BY type_name HAVING COUNT(*) > 1;

-- 4、删除
-- FROM：首先需要 imc_type a 关联 JOIN 一个子查询语句，也就是上面要保留下来的数据，将这个结果集当做一个虚拟表来使用，且起一个别名 b，关联关系就是结果集中的 name = a 表中的 name，并且 a type_id 要大于查询出来最小的 min_type_id
-- DELETE：删除
-- 建立唯一索引：创建 唯一 索引 名称 条件就是 imc_type 表上的 type_name 建立唯一索引

DELETE a
FROM imc_type a
JOIN (
		SELECT type_name, MIN(type_id) AS min_type_id, count(*)
		FROM imc_type
		GROUP BY type_name HAVING COUNT(*) > 1
		) b
		ON b.type_name = a.type_name AND a.type_id > min_type_id;
CREATE UNIQUE INDEX uqx_typename ON imc_type(type_name);
```





<br/>

<br/>

<br/>



## UPDATE



```mysql
-- 基础语法
-- UPDATE table_name：需要存储的表名，同样可以使用 JOIN 关联多表
-- SET：表示需要更新的一个或多个的列名、列值
-- WHERE：这个子句在 UPDATE 中是非常非常重要的，一定不能写错
-- ORDER BY LIMIT：在 UPDATE 中并不是很常用，作用域 DELETE 一样，是可以按照顺序更新指定行的数据，通常只会用在分批更新大批量数据的情况下，如更新 100W 行数据，则需要循环分段更新
UPDATE table_name
SET col_name1={expr1|DEFAULT}
    [, col_name2={expr2|DEFAULT}] ...
[WHERE where_condition]
[ORDER BY ...]
[LIMIT row_count]
```



<br/>

<br/>



**编写 UPDATE 语句的思路**



> 为了安全起见，在编写 UPDATE 语句时，先使用 SELECT 查，确认无误后，在替换成 UPDATE 语句



- 确定要更新的数据存储在那张表中 ( `UPDATE 子句` )
- 确定要更新的列及值 ( `SET 子句` )
- 确认更新数据的条件 ( `WHERE 子句` )





<br/>

<br/>

<br/>



🌰🌰🌰：

![](./images/4.svg)

<other-mysql-three-one/>










































