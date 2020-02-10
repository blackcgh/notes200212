# MySQL

## 数据库概述

**数据库是用来存储数据的仓库，特点：**

- 数据持久化存储
- 可存储大量数据
- 方便管理、易于查询
- 安全、可共享

**存储特点：**

- 数据放在表中，表放在库中
- 一个数据库通常包含一个或多个表，每个表有一个名字标识
- 表包含带有数据的记录（行=对象）、字段（列=属性）。

**数据库模型分类：**

- 关系型数据库（SQL）：基于关系（表）存储、管理数据
- 非关系型数据库（NOSQL：Not Only SQL）：数据存储不需要固定的表结构

**区别：**

- 关系型数据库容易理解、易于使用
- 非关系型数据库读写能力强、易于扩展

**常见的数据库管理系统：**

- MySQL、Oracle、SqlServer、DB2
- MongoDB、Redis

**术语：**

- DB： database，数据库，用于存储数据

- DBMS： Database Management System，数据库管理系统，数据库软件，用于管理数据库

- RDBMS： 关系型数据库管理系统，是DBMS的一个分类

- SQL：Structured Query Language，结构化查询语言，**用于访问和处理数据库的标准的计算机语言**

**术语之间的关系：**程序员通过 SQL 命令 DBMS 去操作 DB 中的数据。

---

**MySQL**

MYSQL 是一个关系型数据库管理系统，由 MySQL AB公司开发，目前属于 Oracle，是最流行的关系型数据软件。

MySQL 所使用的 SQL 语言是用于访问数据库的最常用标准化语言。MySQL 软件采用了双授权政策，分为社区版和商业版，由于其体积小、速度快、总体拥有成本低，尤其是开发源码这一特点，一般中小型网站的开发都选择 MySQL 作为网站数据库。

---



## 安装

[官网安装](https://dev.mysql.com/downloads/mysql/)

**命令：**

```shell
# 启动/停止 mysql
net start <server>														# 启动 mysql。在服务里查看服务名
net stop <server>															# 关闭 mysql

# 登录/退出 mysql
mysql -h<ip> -P<port> -u<uname> -p<pwd>				# 登录
mysql -u<uname> -p[pwd]											  # 本机登录，-h默认localhost，-P默认3306
mysql -h<ip> -u<uname> -p<pwd>			 		 		  # 远程登录
exit																					# 退出
mysql --version<-V>														# 查看 mysql 版本

# 库操作
show databases;																# 显示所有的数据库
use <dbname>;																	# 使用指定的数据库
select database();														# 查看当前使用的数据库
show tables;																	# 查看当前数据库的所有表
create database <dbnamae>;										# 创建数据库
drop database <dbname>;												# 删除数据库


# 表操作（要先使用指定的数据库）
create table <tname>(													# 创建表，要指定字段、类型等
	<field> <type>,
	...
)
desc <tname>;																	# 查看表结构
drop table <tname>;														# 删除表
```

---



## SQL 语句分类

- DQL（Data Query Language）：数据查询语言，用于查询数据
- DML（Data Manipulation Language）：数据操纵语言，用于插入、修改、删除数据
- DDL（Data Definition Language）：数据定义语言，用于操作逻辑结构，包括库、表、视图等
- TCL（Transaction Control Language）：事务控制语言，用于操作事务
- DCL（Data Control Language）：数据控制语言，用于权限控制

---



## DQL 数据查询

SELECT 用于从数据库查询数据，查询结果被存在一个虚拟表格中。

### 基础查询

**语法**

```sql
SELECT 查询列表												-- 从指定表中查询，查询列表可以是字段、常量值、表达式、函数
FROM 表名;
```

**例子**

```sql
SELECT `name`,age FROM employees;		 -- 反引号用于标识字段，也可以使用双引号
SELECT 'str';												 -- 输出 str
SELECT 2*3;													 -- 输出 6
SELECT VERSION();										 -- 调用该方法，输出返回值
```

---



### 条件查询

**语法**

```sql
SELECT 查询列表												-- 从指定表中根据条件筛选出结果，筛选条件是关于字段的表达式
FROM 表名
WHERE 筛选条件;
```

**根据筛选条件分类：**

- 条件表达式

  ```sql
  >		<		=		<>(!=)		>=		<=
  ```

- 模糊查询

  ```sql
  like(not like)									-- 像...一样，用于字符型和数字型
  between and(not between and)		-- 在...之间，包括临界值
  in															-- 查找满足列表中的值的字段，值不能用通配符
  is null | is not null						-- 判断字段是否为null
  ```

  - 通配符

    ```sql
    %														-- %可匹配0到多个字符（模糊查询）
    _														-- 匹配一个字符（精确查询）
    ESCAPE											-- 用于指定某字符为转义字符
    ```

- 逻辑表达式（用于连接条件表达式）

  ```sql
  and(&&)		or(||)		not(!)
  ```

**例子**

```sql
SELECT * FROM employees WHERE NOT(salary>=12000 AND salary<=15000)
SELECT * FROM employees WHERE last_name LIKE '%a%';							-- 包含字符a
SELECT * FROM employees WHERE last_name LIKE '_$_%' ESCAPE '$';	-- 把$当做转义字符，查找_
SELECT * FROM employees WHERE employee_id BETWEEN 100 AND 200;
SELECT * FROM employees WHERE job_id IN('IT', 'AD_VD');					-- 不能'I%'
SELECT * FROM employees WHERE commission_pct IS NULL;
```

---



### 排序查询

**语法**

```sql
SELECT 查询列表										 -- 从指定表中根据条件筛选出结果，再根据排序列表对结果进行排序
FROM 表名
[WHERE 条件]
ORDER BY 排序列表 [ASC(默认) | DESC];
```

**例子**

```sql
SELECT * FROM employees ORDER BY salary DESC;								-- 降序

SELECT *, salary*12*(1+IFNULL(commission_pct,0)) 年薪
FROM employees
ORDER BY 年薪 DESC;

SELECT * FROM employees ORDER BY salary,employee_id DESC;		-- 工资升序，如果一样再编号降序
```

---



### 分组查询

**语法**

```sql
SELECT 查询列表							-- 从表中根据条件筛选结果，再由分组列表对结果分组，可以对各组排序、再筛选
FROM 表名
[WHERE 条件]
GROUP BY 分组列表
[HAVING 条件]
[ORDER BY 排序列表];
```

**例子**

```sql
SELECT MAX(salary), job_id													-- 常用于查询分组函数、分组列表
FROM employees
GROUP BY job_id;

SELECT COUNT(*) FROM employees GROUP BY job_id;			-- 查找每个工种的员工个数

SELECT AVG(salary),department_id										-- 邮箱带a，每个部门的平均工资,降序显示
FROM employees
WHERE email LIKE '%a%'
GROUP BY department_id
ORDER BY AVG(salary) DESC;
```

**按多字段分组**

```sql
SELECT AVG(salary),department_id,job_id
FROM employees
GROUP BY department_id, job_id;							-- 分组的所有字段相同为一组
```

**分组后再筛选**

```sql
SELECT COUNT(*),department_id								-- 查找每个部门的员工个数大于2部门
FROM employees
GROUP BY department_id
HAVING COUNT(*)>2;
```

**总结：**

- 分组前筛选---where（条件不能是分组函数）
- 分组后筛选---having（条件可以是分组函数）

---



### 连接查询(多表查询)

```sql
SELECT 查询列表															   -- 从指定的多个表中根据连接条件筛选出结果
FROM 表1 别名
[连接类型] JOIN 表2 别名
ON 连接条件
[WHERE 筛选条件];
```

**根据连接条件分类：**

- 内连接：根据表中的字段进行连接，连接类型是 inner（可省略）

  - 等值连接（一对一查询）

    ```sql
    SELECT last_name,employee.job_id			-- 如果多表中存在同一字段，可以使用表名限定
    FROM employees e											-- 如果给表起别名，就不能使用原来的表名
    INNER JOIN jobs j ON e.job_id=j.job_id
    INNER JOIN departments d ON e.department_id=d.department_id;	-- 三表查询
    ```

  - 非等值连接（一对多查询）

    ```sql
    SELECT salary, grade_level
    FROM employees e
    JOIN job_grade g
    ON salary BETWEEN g.lowest_salary AND g.hightest_salary;
    ```

  - 自连接（自己连接自己）

    ```sql
    SELECT e.employee_id,e.last_name,m.employee_id,m.last_name
    FROM employees e
    JOIN employees m
    ON e.manager_id=m.employee_id;
    ```

- 外连接

  - 左外连接
  - 右外连接
  - 全外连接（mysql不支持）

- 交叉连接

---



### 子查询







---



### 分页查询









---



### 联合查询





 

---



## DML 数据操纵

### 插入数据

**语法**

```sql
insert into 表名(字段1,字段2,...)							-- 插入值的类型要符合定义的类型、顺序没要求
values(值1,值2,...),
(值1,...),
...;
```

**例子**

```sql
insert into employees(employee_id,last_name,email)
values(7,'black','.com'),
(8,'white','.qq');
```

---



### 修改数据

**语法**

```sql
update 表名																	-- 如果没有筛选条件，将会修改所有记录
set 字段1=新值,字段2=新值,...
where 筛选条件;

update 表1																	 -- 多表修改
inner|left|right join 表2
on 连接条件
set 字段=新值,...
where 筛选条件;
```

**例子**

```sql
update employees
set last_name='black',email='777.com'
where employee_id=7;
```

---



### 删除数据

**语法**

```sql
delete from 表名 where 筛选条件;
```

**例子**

```sql
delete from employees where employee_id like '_a%';
```

---



## DDL 数据定义

| 库/表 | 关键字 |
| ----- | ------ |
| 创建  | create |
| 修改  | alter  |
| 删除  | drop   |

---



### 库

创建库

```sql
create database 库名;
create database if not exists 库名;						-- 如果不存在，就创建该库
```

修改库

```sql

```

删除库

```sql
drop database 库名;
drop database if exists 库名;									-- 如果该库存在，就删除
```

---



### 表

创建表

```sql
create table 表名(
	字段1 类型[(长度) 约束],
  字段2 类型[(长度) 约束],
  ...
)
```

修改表

```sql
alter table 表名 change column 字段名 新字段名 类型;			-- 修改字段名
alter table 表名 modify column 字段名 类型;						-- 修改字段的类型和约束
alter table 表名 add column 新字段名 类型;							-- 添加新字段
alter table 表名 drop column 字段名;										-- 删除字段
alter tabkle 表名 rename to 新表名;										-- 修改表名
```

删除表

```sql
drop table 表名;
```

复制表

```sql
create table 生成的表名 like 要复制的表名;								-- 仅复制表结构，不复制数据
create table 新表名 select * from 复制表;							 -- 可以复制部分、全部数据
```

---



### 数据类型

#### 整型

| 分类      | 所占字节 | 描述 |
| --------- | -------- | ---- |
| tinyint   | 1        |      |
| smallint  | 2        |      |
| mediumint | 3        |      |
| int       | 4        |      |
| bigint    | 8        |      |

---



#### 浮点型

| 分类   | 所占字节 | 描述 |
| ------ | -------- | ---- |
| float  | 4        |      |
| double | 8        |      |

---



#### 字符型

| 分类       | 描述                               |
| ---------- | ---------------------------------- |
| char(m)    | m是最多字符数（默认为1），长度固定 |
| varchar(m) | 长度可变，但效率低                 |
| text       |                                    |
| blob       |                                    |

---



#### 日期型

| 分类     | 所占字节 | 描述       |
| -------- | -------- | ---------- |
| date     | 4        | 日期       |
| time     | 3        | 时间       |
| timetime | 8        | 日期、时间 |
| year     | 1        | 年         |

---



### 约束

SQL 约束用于规定表中的数据规则，就是限制表中的数据，保证表中的数据的可靠性。如果存在违反约束的行为，该行为会被约束终止。

| 约束        | 描述                                                       |
| ----------- | ---------------------------------------------------------- |
| NOT NULL    | 字段非空。如姓名、学号                                     |
| DEFAULT     | 设置字段默认值                                             |
| CHECK       | 检查约束，用于保证字段值符合指定条件（mysql不支持）        |
| UNIQUE      | 字段值具有唯一值，可以为空                                 |
| PRIMARY KEY | 主键，用于保证字段值的唯一性，并且非空                     |
| FOREIGN KEY | 外键，用于指定字段值是来自另一张表的主键值，不能使用其他值 |

---

**添加约束的时机：**

- 创建表时规定

- 修改表时规定

**约束分类：**

- 列级约束：外键约束无效

- 表级约束：不能使用默认、非空

  ```sql
  create table 表名(
  	字段 类型 列级约束,
    表级约束
  )
  ```

**列级约束例子**

```sql
create table student(															-- 常用默认、非空、唯一、主键
	id int primary key,
  name varchar(20) not null,
  seat int unique,
  age int default 18,
  foreign key(majorid) references major(id),			-- major是另一张表的主键
)
```

****

| 主键与唯一的区别 | 唯一？ | 是否为空？      | 允许多个？ |
| ---------------- | ------ | --------------- | ---------- |
| primary key      | yes    | no              | 最多一个   |
| unique           | yes    | yes，只能有一个 | 可以有多个 |

---



### 标识列（自增）

`auto_increment` 会在新记录插入表中时自动生成一个唯一的数字，默认从1开始。

```sql
create table student(
	id int primary key auto_increment,
  name not null
);
```

添加数据

```sql
insert into student(name) values('black');
```

**注意：**

- 标识列通常与主键搭配使用
- 一个表中最多存在一个自增字段

---



## TCL 事务控制





---



## 视图





---



## 变量







---



## 存储过程





---



## 函数

- 单行函数

  - 字符函数

    - `length('str')`：获取当前字符集下 str 的字节个数（utf8：字母是一个字节，汉字是三个字节）
    - `concat('str', 'str2', ...)`：拼接字符串
    - `lower('str')`：小写
    - `upper('str')`：大写
    - `substr('str', start, total)`：截取字符串，start(索引)从1开始
    - `instr('str', 'sonstr')`：在 str 中查找子串的索引，找不到返回0
    - `trim('str')`：去除字符串两边的空格。`trim('a' from 'aaablackaaaaa') == black`
    - `replace('str', 'old', 'new')`：用字符串new替换str中的子串old
    - `lpad('str', total, 's')`：用指定的字符s左填充str，达到数目total
    - `rpad('str', total, 's')`：用s右填充str，超过total的字符会被截取掉

  - 数学函数

    - `round(n)`：四舍五入
    - `round(n, u)`：保留小数后u位
    - `truncate(n, u)`：截断小数后u位
    - `ceil(n)`：向上取整
    - `floor(n)`：向下取整
    - `mod(n, m)`：取余
    - `rand()`：返回0-1之间的随机小数

  - 日期函数

    - `now()`：返回当前日期+时间
    - `curdate()`：返回当前日期
    - `curtime()`：返回当前时间
    - `str_to_date('2020-2-7 12:00:00', '%Y-%m-%d %H %i %s')`
    - `date_format(now(),'%m月/%d日 %Y年')`
    - `datediff(date1,date2)`：返回两个日期相差的天数

  - 流程控制函数

    - `if(条件, v1, v2)`：条件表达式 ? 值1 : 值2

    - `case when表达式`

      ```sql
      case 字段 | 表达式 | 变量						-- switch 语句
      when 常量1 then 执行语句
      when 常量2 then 执行语句
      ...
      else 执行语句
      end
      
      select salary,
      case department_id
      when 30 then salary*1.3
      when 40 then salary*1.5
      else salary
      end
      from employees
      ```

      ```sql
      case															-- 多重 if 语句
      when 条件1 then 执行语句
      when 条件2 then 执行语句
      ...
      else 执行语句
      end
      
      case
      when salary>20000 then 'A'
      when salary>15000 then 'B'
      when salary>10000 then 'C'
      else 'D'
      end
      from employees
      ```

  - 其他函数

    - `version()`：查看版本号
    - `database()`：查看当前数据库
    - `user()`：查看当前用户
    - `password('str')`：返回字符的加密形式
    - `md5('str')`：返回字符的md5加密形式

- 分组函数（忽略null、可以结合 distinct 使用）

  - `sum(field)`：计算字段的总和。（数字）
  - `avg(field)`：平均值。（数字）
  - `max(field)0:`：最大值。（任何类型）
  - `min(field)`：最小值
  - `count(field)`：记录该字段非null的个数
    - `count(*)`：统计总行数，常用

---



 ## 其他

### SQL + (加号)

MySQL 中的 + 只有运算符的功能：

- `'3' + 7 = 10`、`'str' + 7 = 7`
- 只要有 null， 肯定为 null

---



### SQL 关键字

- AS - 别名

  ```sql
  SELECT last_name AS 姓 FROM employees AS e;			 -- AS 用于给表、查询的字段别名
  SELECT first_name 名 FROM employees e;						 -- 简写
  -- 除 FROM、WHERE外，其余关键字都能使用别名
  ```

- DISTINCT - 去重

  ```SQL
  SELECT DISTINCT department_id FROM employees;	   -- 对字段 department_id 去重
  ```

  

---



### SQL 语法规范

- 不区分大小写

- 关键字应大写，标识符小写

- 命令要以分号结尾

- 关键字独占一行

- 根据需要，使用缩进和换行

- 注释

  ```sql
  -- 注释
  ```

---



### Navicat 快捷键

```sql
ctrl+q 					-- 创建查询
ctrl+w 					-- 关闭查询
ctrl+/ 					-- 注释
ctrl+shift +/ 	-- 解除注释
ctrl+r 					-- 运行查询窗口的 sql 语句
ctrl+shift+r 		-- 只运行选中的 sql 语句
F6 							-- 打开一个 mysql 命令行窗口
ctrl+l 					-- 删除一行
```







创建表