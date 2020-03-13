# MongoDB

## 概述

MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。**MongoDB 文档类似于 JSON 对象。**字段值可以包含其他文档，数组及文档数组。

---



## 安装

[官网](https://www.mongodb.com/download-center/community)

配置环境变量：`path=E:\Program Files\MongoDB\Server\4.2\bin`

测试：

```shell
mongod --version
mongo
```

创建数据目录：mongodb 默认将执行启动命令所处盘符下的/data/db作为数据存储目录，所以在启动数据库之前要先创建一个/data/db目录。如果想要修改默认的数据存储目录，可以使用命令：

```shell
mongo --dbpath=数据目录路径
```

---



## 操作

### 基本命令

```shell
mongod													# 启动服务器，前提是data/db目录已经存在
mongod --dbpath c:\data\db			# 在指定目录下启动 MongoDB
ctrl+c													# 关闭数据库

mongo														# 该命令默认连接本机的 MongoDB 服务（客户端连接服务器）
mongo host:port								  # 连接远程主机的 MongoDB 数据库，MongoDB 默认端口是27017
exit														# 断开连接

show dbs												# 显示所有数据库
db															# 查看当前操作的数据库，db表示当前数据库
use dbname										 	# 切换到指定数据库
show collections								# 显示当前数据库的所有集合
db.collectionname.insert(obj)		# 集合插入文档，会自动创建数据库、集合
db.collectionname.find()				# 查找指定集合的所有数据
```

---



### 数据库

#### 创建

```shell
use dbname											# 创建并切换到该数据库
```

**注意:** 集合只有在内容插入后才会创建! 就是创建集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。

---



#### 删除

```shell
db.dropDatabase()								# 删除正在使用的数据库
```

---



### 集合

#### 创建

```shell
db.createCollection("name"[,options])			# 创建以name为名的集合
```

**向集合插入文档时，如果该集合不存在，会自动创建集合。**

---



#### 删除

```shell
db.collectionname.drop()									# 删除指定集合。如果数据库中没有集合，数据库也不会存在
```

---



### 文档

#### 查询

```shell
db.colname.find()													# 查询集合所有文档
db.colname.findOne(obj)										# 查询一条文档
db.colname.find(obj)											# 查询符合条件的文档

# 高级查询：比较、范围运算符，格式化、限制、跳过
# obj 内容：
# 		{key:value}						等于
# 		{key:{$ne:value}}			不等于
# 		{key:{$lt:value}}			小于
# 		{key:{$gt:value}}			大于
# 		{key:{$in:[v1,v2]}}		key在v1和v2之间	
# 		{key:{$nin:[v1,v2]}}	不在v1和v2之间
# 		{$or:[v1,v2..]}				满足v1或v2..

db.colname.find().pretty()								# 对查询结果格式化
db.colname.find().count()									# 统计文档数量
db.colname.find().limit(n)								# 查询n条文档
db.colname.find().skip(n)									# 跳过n条文档
db.colname.find().sort({字段:1/-1})			 	 # 结果按指定字段排序，1是升序，-1是降序
db.colname.distinct('去重字段')							# 对文档的某字段去重
```

---



#### 插入

```shell
db.colname.insert(obj)										# 插入一条文档，字段值：数字、数组等。默认分配随机_id
db.colname.insert([obj1,obj2,...])				# 插入多条文档
```

---



#### 修改

```shell
db.colname.updateOne(obj1,obj2)						# 向指定集合修改单个文档，obj1是筛选条件
db.colname.updateMany(obj1,{$set:{字段}})	# 向指定集合修改多个文档
# obj2对象选项：
#			$set				修改字段值，如果obj2字段不存在，则是添加字段
#			$unset			删除字段	
#			$rename			重命名字段
```

---



#### 删除

```shell
db.colname.deleteOne(obj)										# 删除集合中符合条件obj的一个文档
db.colname.deleteMany(obj)									# 删除集合中符合条件obj的多个文档
```

---



### 数据类型

| 数据类型  | 描述                                  |
| --------- | ------------------------------------- |
| Object ID | 文档ID，，每条文档都会自动创建属性_id |
| String    | 字符串，常用                          |
| Boolean   | 布尔值                                |
| Integer   | 整数                                  |
| Double    | 浮点数                                |
| Arrays    | 数组                                  |
| Object    | 文档对象                              |
| Null      | null 值                               |
| Date      | 当前日期                              |







---



## 其他

### DBMS 

**分类：**

- RDBMS
- NoSQL

**RDBMS：**

- 高度组织化结构化数据
- 结构化查询语言（SQL）
- 数据和关系都存储在单独的表中
- ACID
- 基础事务

**NoSQL：**

- 代表不仅仅是SQL
- 没有声明性查询语言
- 没有预定义的模式
- 键值对存储、列存储、文档存储、图形数据库
- 最终一致性，而非ACID属性
- 非结构化和不可预知的数据
- BASE
- 高性能，高可用性和可伸缩性

**NoSQL的优点/缺点**

优点:

- 易扩展
  - 数据之间没有关系，所以非常容易扩展（数据放进去就行）
- 高性能
  - 由于结构简单（像数组），读写性能高（不用联合查询）
- 灵活的数据模型
  - 容易增删字段
- 没有复杂的关系

缺点:

- 没有标准化
- 有限的查询功能
- 占用空间大

---

**两者结构：**

- SQL
  - 数据库 --> 表(table) --> 记录
- NoSQL
  - 数据库 --> 集合(collection) --> 文档(document)

























