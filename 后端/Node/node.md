# Node.js

---



## 概述

- Node.js 是一个基于 chrome 的 V8 引擎构建的、运行在服务器端的、跨平台的 JavaScript 运行环境。使用事件驱动、非阻塞I/O模型等技术来提高性能
- Node.js 使 JavaScript 可以进行服务器开发，在 Node 中，由于没有 BOM 和 DOM，也就没有 window、document 等，不再是用 JS 操作 DOM、制作交互动画、表单验证…而是操作服务器端：HTTP 请求处理、操作数据库、cookie 和 session 等
- Nodejs有一个全球最大的开源库生态系统 npm

---

**特点：**

- 事件驱动
- 非阻塞异步 I/O
- 单线程
- 跨平台

**用途：**

- web服务器
- 命令行工具
- 网络爬虫
- 桌面应用程序开发

---



## 安装

[官网下载](https://nodejs.org/en/)

安装 Node 会附带安装 npm。查看安装的版本

```shell
>node -v
```

---



## REPL

REPL（Read Eval Print Loop:交互式解释器） 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应，可以很好的调试 Javascript 代码。

Node 自带了交互式解释器，在终端输入node，可以执行以下任务：

- **读取read** - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中
- **执行eval** - 执行输入的数据结构
- **打印print** - 输出结果
- **循环loop** - 循环操作以上步骤直到用户两次按下 `ctrl-c` 按钮退出

---



## Node 模块

Node 的组成：

- ECMAScript
- 核心模块
- 第三方模块
- 自定义模块

**注意：**

- Node 中不能使用 BOM、DOM，但能使用定时器

- 第三方模块需要下载（npm），它会自动创建并存在 node_modules目录下

---



### 核心模块

- Nodejs 中提供了很多核心模块，提供了浏览器所不具备的功能，只要导入就能使用

- Node 中所有回调函数的第一个参数都是 error 错误对象。如果没有错误，这个对象是 null

- ==Node 中所有的方法都是异步的，所以在方法内不能使用方法外声明的变量，在方法外不能操作方法内的数据==

**导入核心模块**

```js
const mname = require('module_name');			// 返回对象、函数或其他 JS 类型，取决于模块返回的内容
```

---



#### http

http 模块用于搭建 HTTP 服务端和客户端。**导入 http 模块：**

```js
const http = require('http');
```

**http 对象方法**

```js
createServer([fn(req,res)])				// 创建并返回服务器对象.参数：req(请求对象)、res(响应对象)
```

**server 对象方法**

```js
listen(port[, fn(err)])						// 启动 HTTP 服务器并监听连接

// 事件
request														// 接受到请求时触发
```

**request 对象属性/方法**

```js
url																// 获取请求路径，不包含主机名称、端口号、协议
method														// 获取请求方式

headers														// 获取包含所有请求头信息的对象
```

**response 对象属性/方法**

```js
statusCode												// 设置状态码，默认是200
statusMessage											// 设置状态码描述

write('data')											// 响应数据，可响应多次，最后要调用end方法完成响应
end(['data'])											// 响应数据并完成响应
writeHead(status[,message,headersObj])	// 设置状态码、描述、响应头，在write之前
setHeader('name', 'value')				// 设置响应头信息

// 事件
finish														// 响应发送后触发
```

---

**注意：**

- 为了支持所有的 HTTP 应用程序，Node 的 HTTP API 都非常底层。，当做什么操作时，需要手动来做

- ==Node 提供了获取 GET 请求传过来的数据的API；但没有提供获取 POST 请求的数据的 API。==如果需要，只能手动获取

  ```js
  const http = require('http');
  const queryString = require('querystring');
  let server = http.createServer();
  server.on('request', (req, res) => {
    let data_str = '';
    req.on('data', data => {		// 请求体数据是分段发送的，服务器每次接受到数据时都触发data事件
      data_str+=data;
    })
    req.on('end',() => {				// 数据传完后触发 end 事件
      let data_obj = queryString.parse(data_str);	// 传过来的数据是二进制的，需要转义
    })
  })
  server.listen(7777)
  ```

---

**例子**

```js
const http = require('http');
const url = require('url');
http.createServer((req, res) => {
  let urls = url.parse(req.url, true);							// 将请求 url 解析为对象
  let query = urls.query;														// 获取 get 请求传递过来的参数
  if(req.method == 'GET') {
    if(req.url == '/') {					 									// 路由
    	res.setHeader('content-type', 'text/plain;charset=UTF-8');// plain把数据解析为文本
  		res.write('11');
  		res.end('22');
  	} else {
    	fs.readFile('.'+req.url, (err,data) => {})		// 响应所有请求需要的静态资源
  	}
  } else if(req.method == 'POST') {...}
    else {console.log('暂时不支持'+req.method+'请求方式')}
}).listen(7777, err => {
  if(err) console.log('服务器启动失败！');
  else console.log('启动成功！');
})
```

---



#### fs

`file system`，fs 模块提供了与文件系统进行交互的 API。**导入 fs 模块：**

```js
const fs = require('fs');
```

**fs 对象**

```js
// 属性
stat('path',fn(err,stats))							// 统计信息
/* stats 属性/方法：
									size									// 文件大小
									birthtime							// 创建时间
									mtime									// 修改时间
									isFile()							// 是否是文件
									isDirectory()					// 是否是目录
*/

// 文件
appendFile()														// 通过写入来创建文件
writeFile()
copyFile('src','dest',fn(err))					// 拷贝文件
rename('oldpath','newpath',fn(err))			// 重命名、移动文件
readFile('path'[,'e'],fn(err,data))			// 读取文件。e值：'utf8'。默认null(返回Buffer)
writeFile('file','data'[,'e'],fn(err))	// 写入文件,会覆盖原文件内容。e默认utf8
appendFile('path','data',fn(err))				// 追加或创建文件

// 目录
mkdir('path',fn(err))										// 创建目录
rmdir('path',fn(err))										// 删除空目录
readdir('path'[,'e'],fn(err,files))			// 读取目录下的所有内容，files是数组

// stream
createReadStream('path')								// 
createWriteStream('path')								// 
```

**例子**

```js
const http = require('http')
const fs = require('fs');
const options = {
  flag = 'a';																			 // 追加写入，flag默认是'w'(覆盖原内容)
}
fs.writeFile('a.txt', appendContent, options,  err => {...})

const readStream = fs.createReadStream('a.txt');	 // 文件IO
const writeStream = fs.createWriteStream('b,txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
  console.log('copy done')
})

const server = http.createServer((req, res) => {	 // 文件IO、网络IO
  readStream.pipe(res)
})
```

---



#### url

`url` 模块用于处理与解析 URL 。**导入 url 模块：**

```js
const url = require('url');
```

**url 对象方法**

```js
parse('url'[, true])										 // 将整个 url 字符串解析为对象
/* 		对象属性：比如 http：//sub.host.com:8080/list?name=black
						href												 // http：//sub.host.com:8080/list?name=black
						protocol										 // http:
						host												 // sub.host.com:8080
						hostname										 // sub.host.com
						port												 // 8080
						path												 // /list?name=black
						pathname										 // /list
						query												 // {name: 'black'}  query为参数对象 */
```

---



#### querystring

`querystring` 模块提供用于解析和格式化 URL 查询字符串的 API。**导入 queryString 模块：**

```js
const queryString = require('queryString');
```

**queryString 对象方法**

```js
parse('querystr')													// 将 URL 的 query 字符串解析为对象

let obj = queryString.parse('f=a&g=b&g=c')// obj = {f:'a', g: ['b', 'c']}
```

---



#### path

`path` 模块提供用于处理文件和目录路径的 API。**导入 path 模块：**

```js
const path = require('path');
```

**path 对象方法**

```js
basename('path'[, 'ext]')								// 获取文件名，可去掉扩展名
dirname('path')													// 获取去除最后文件名的路径
extname('path')													// 返回文件的扩展名
isAbsolute('path')											// 判断路径是否是绝对路径
join('path1','path2',...)								// 使用本机的分隔符规范化生成路径，无视/、\\...
resolve('path1','path2',...)						// 从右到左，直到构造出一个绝对路径
parse(path)															// 将路径转为对象
/* root: 根目录
	 dir: 目录
	 base: 文件名+扩展名
	 ext: 扩展名
	 name: 文件名 */
```

**例子**

```js
const path = require('path');
path.basename('foo/a.html', '.html');		 // a
path.dirname('foo/bar/a.txt');					 // foo/bar
path.extname('a.html')									 // .html
path.join(__dirname, 'index.html')
path.resolve('/foo', '/baz')						 // '/baz'
path.resolve('foo', 'baz')						 // '/foo/baz',还未生成绝对路径，则再加上当前工作目录
let obj = path.parse('/home/user/file.txt')
// obj = {root: '/', dir: '/home/user', base: 'file.txt', name: 'file', ext: '.txt'}
```

---

 

### 第三方模块

非官方提供的模块叫做第三方模块，，如果需要使用第三方模块，必须使用npm下载并导入

- express：web 开发框架

- art-template：模板引擎

- moment：时间操作

- cross-dev：设置环境变量，快速切换环境

- mongoose：连接操作 MongoDB 数据库

- mysql：操作 mysql 数据库

- redis：操作 redis 数据库

  ```js
  npm i redis
  
  const redis = require('redis')
  let host = '127.0.0.1';
  let port = 6379;
  const client = redis.createClient(port, host);
  client.on("error", (error) => {...});
  client.set("key", "value", redis.print);
  client.get("key", redis.print);
  ```

- connect-redis：配合express-session使用，用于将session数据存储在redis中，此模块基于redis

  ```js
  npm install redis connect-redis express-session
  
  const redis = require('redis')
  const session = require('express-session')
  let RedisStore = require('connect-redis')(session)
  let redisClient = redis.createClient(6379, '127.0.0.1')
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      cookie: {},
      secret: 'keyboard cat',
    })
  )
  ```

- blueimp-md5：加密，常用于对密码加密，数据库存储的是加密后的密码

  ```js
  npm i blueimp-md5
  const md5 = require('blueimp-md5')
  password = md5(md5(password))	// 一般使用二次加密
  ```

- json-server：指定一个json文件作为 api 的数据源，运行在Express服务器，支持跨域、jsonp、路由等功能

  ```js
  npm i json-server -g
  
  json-server --watch --port 3000 db.json
  /* 请求方式：
  	 get			查询（可过滤、分页、排序、范围查询）
  	 post			新增
  	 put			修改
  	 delete		删除 */
  ```

- http-server：本地服务，可让指定目录下的所有文件同域

  ```js
  npm i http-server -g
  
  http-server										// 启动服务，该目录成为服务器目录，可发送Ajax请求
  http-server -p 3000						// 指定监听端口
  ```

- formidable：解析表单数据和文件上传

  ```js
  npm i -S formidable
  
  const formidable = require('formidable')						// 导入
  const form = new formidable.IncomingForm();					// 使用
  form.parse(req, (err, fields, files) => {
    fs.rename(files.image.path,'./'+files.image.name);// 移动上传的文件并重命名
  });
  /* fields对象用于存储传过来的文本数据。
  	 files对象用于存储传过来的文件数据，文件对象的名称就是表单设置的name属性。
  	 文件对象属性：
  				path					// 服务器自动存储传过来的文件的绝对路径
  				name					// 上传的文件名，如1.png
  				type					// mime类型，如image/png
  				size					// 文件大小
  ```
---



### 自定义模块

自己写的 JS 模块，需要require(' 相对路径 ')导入使用。如果放在 node_modules 目录下，就成了第三方模块。

---



## Node 全局对象

- 在浏览器中，全局对象为 window；Node 中的全局对象为 global

- 模块中的两个特殊的成员，是模块在终端不受执行 node 命令所属路径影响的
  - __dirname：动态获取当前文件的绝对路径
  - __filename：动态获取当前文件所属目录的绝对路径

- 定时器

  ```js
  setTimeout(fn, ms)					// 在指定时间后调用函数
  clearTimeout(timer)					// 清除定时器
  
  setInterval(fn, ms)					// 每隔指定时间后调用函数
  clearInterval(timer)				// 清除定时器
  ```

---



## Node 模块化

**模块化定义：**

- 文件作用域
- 通信规则
  - 导入
  - 导出

---

### CommonJS 概述

- JS 在浏览器的规范由 W3C 和 ECMAScript 制定，在服务器的规范是 CommonJS
- Node的模块化遵循了CommonJS规范，**该规范加载模块是同步的，只有加载完成，才能执行后面的代码**
- 文件就是模块，拥有单独的作用域（模块作用域/文件作用域），定义的变量、函数、对象都属于该模块内
- ==通过require来加载模块；通过modul.exports来导出模块中的内容==
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存
- 所有代码都运行在模块作用域，不会污染全局作用域

---



#### require 导入

语法：

```js
const mname = require('模块标识')
```

**作用：读入并执行一个 JS 文件，然后返回该模块的 exports 对象。如果没有发现指定模块，就会报错。**

==注意：导入的是被导出的值的拷贝。比如导出一个函数，函数内要操作的变量相当于在函数内部定义。==

---

模块标识就是文件名，可以省略文件的扩展名。如果是目录，默认指向目录下的index.js。

- 核心模块、第三方模块
  - 模块名
- 自定义模块
  + 文件(夹)路径

---



#### exports 导出

- Node 中是模块作用域，默认文件中所有的成员只在当前文件模块有效
- 要想其他模块可以访问到某些成员，需要将这些成员通过 exports 挂载到 module.exports 接口对象里面

---



#### module.exports/exports

- module：每个模块内部，module 对象代表当前模块，它有一个属性 exports，默认是空对象

- exports：每个模块还有一个 exports 变量，指向 module.exports
- exports 用于给导出对象添加属性和方法，但不能直接赋值；module.exports才能用于重新赋值

---



#### 加载规则

**require 的加载顺序：**

- 优先从缓存中加载
- 模块标识是模块名称
  - 核心模块
  - 第三方模块
    - 从当前目录下查找node_modules目录 --> 模块目录 --> package.json --> main字段，执行 main 指定的文件；如果没有 package.json 或出现错误导致没有指定文件，就执行默认文件 index 文件；如果也没有 index，就进入上一层目录继续查找node_modules，直到磁盘根目录
- 模块标识是路径
  - 自定义模块

**一个项目有且只有一个node_modules配置目录，子目录的安装包可以集中放在该目录下。**

---



## Node 数据库操作

### MongoDB

Node 官方提供了 MongoDB 包来操作（原生，繁琐）：[官网](https://github.com/mongodb/node-mongodb-native)

#### mongoose

第三方包 mongoose 基于官方的 MongoDB 包再一次做了封装，==而且mongoose的API支持promise==。[中文文档](https://mongoose.kkfor.com/models.html)

安装：

```shell
npm install mongoose --save
```

---



##### 模式（Schema）

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的结构

创建schema，使用`mongoose.Schema( { 字段 } )`

```js
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({		//定义集合结构有哪些字段
  author: String
  title: {
    type: String,														//SchemaType,字段类型
    required: true, 												//必填
    default: '主题'	  											 //默认值
  },
});
```

---



##### 模型（Model）

 Model是从 Schema编译来的构造函数。 Model的实例就代表着可以从数据库保存和读取的 document文档对象。 从数据库创建和读取 document 的所有操作都是通过 model 进行的 

 把 schema 转换为 model， 使用 `mongoose.model(集合名称, schema)` 函数 ，返回一个模型构造函数

```javascript
const Blog = mongoose.model('Blog', blogSchema);// 集合名称首字母大写，会将其转变为小写复数
const Blog = mongoose.model('Blog', blogSchema, 'blog');// 连接blog数据库
```

---



##### 文档（document）

 Mongoose document代表着 MongoDB 文档的一对一映射。 每个 document 都是 model的实例 

示例：

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const catSchema = new mongoose.Schema({					// 设计集合结构和设置字段
  name: {
    type: String,
    required: true
  }
})
const Cat = mongoose.model('Cat', catSchema);		// 创建模型，第一个参数的小写复数就是集合名称
const kitty = new Cat({ name: 'black' });				// 创建document实例
kitty.save(function(data) {											// 添加到数据库
  console.log(data)
});
```

---



##### 添加（save/create）

```js
document,save().then(data => console.log(data))	 // data 是文档对象
model.create(docObj)
model.insertMany([obj1, obj2, ...])							 // data 是数组
```

---



##### 查询（find）

```js
model.find([cons,pro,ops,callback])						 	// 查找满足条件的所有文档，data 是数组
model.findOne(...)														  // 查找满足条件的第一条文档,data是文档或null
model.findById(id,[pro,ops,callback])
/* cons：查询条件
	 pro：设置返回的字段
	 ops：控制文档的排序、返回数目等
	 callback：回调函数
*/
User.find()
User.find({_id: 7})
User.find({_id:7,pwd:'77'},{title:1,author:1})  // 返回title、author字段，_id字段默认返回
User.findById(7)																// 查找_id为7的文档
```

---



##### 更新（update）

```js
model.update(cons,doc,[ops])										 // 更新满足条件的文档，默认只更新一条文档
model.updateOne(...)
model.updateMany(...)
model.findByIdAndUpdate(id,doc,[ops])						 // 根据_id查找并更新文档
/* cons：查询条件
	 doc：需要修改的数据，不能修改主键（_id）
	 ops：控制选项，参数有
	 							 upsert (boolean)： 默认false。如果不存在则创建新记录
　　							multi (boolean)： 默认false。是否更新多个查询记录
　　							setDefaultsOnInsert： 如果upsert为true，在新建时插入文档定义的默认值
*/
User.update({title: "css"}, {author: "L"}, {multi: true})
model.findByIdAndUpdate(7,{author: "L"})
```

---



##### 删除（delete）

```js
model.deleteOne(cons)															// 删除满足条件的第一条文档
model.deleteMany(cons)														// 删除满足条件的所有文档
model.findByIdAndRemove(id,[ops])									// 根据_id删除文档
```

---



#### 模块化



---



#### 预定义模式修饰符

**作用：对插入的数据进行一些格式化。**

- trim：是否去除前后空格

- lowercase：转为小写

- uppercase：转为大写

  ```js
  const UserSchema = new mongoose.schema({
    name: {
      type: String,
      require: true,
      defaule: '默认',
      trim: trim,
      lowercase: true
    }
  })
  ```

**自定义模式修饰符**

- Setters

  ```js
  const UserSchema = new mongoose.schema({
    name: {
      type: String,
      set(param) {...}							// param是实际传过来的值，返回的数据才会存进数据库
  
    }
  })
  ```

- Getters

---



#### 索引

- unique：唯一索引

- index：普通索引

  ```js
  const UserSchema = new mongoose.schema({
    name: {
      type: String,
      index: true
    }
  })
  ```

---



#### 静态方法

```js
const UserSchema = new mongoose.schema({...})
UserSchema.static.newFn() {}			// model 可以使用 newFn 方法
```

---



#### 默认参数

- default：设置默认值

---



#### 数据校验

- required：是否必填

- max：用于Number类型数据的最大值

- min：用于number类型数据的最小值

- maxlength：用于String类型数据的最大值

- minlength：用于String类型数据的最小值

- match：增加的数据必须符合正则规则

- enum：枚举类型，要求数据必须满足枚举值

  ```js
  const UserSchema = new mongoose.schema({
    name: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 7,
      enum: ['s', 'f'],
      macth: /^s$/
    }
  })
  ```

---



#### 数据类型

- String

- Number

- Boolean

- Array

- Date

- Buffer

- ObjectId

  ```js
  new mongoose.schema({
    name: mongoose.Schema.Types.ObjectId
  })
  ```

---



#### 聚合管道

可以对文档进行变换和组合，同一操作符可使用多次。文档进入管道经过一个或多个stage，每个stage对数据进行操作（筛选，投射，分组，排序，限制或跳过）后输出最终结果。

==注意：ObjectID类型的值不能只有字符串操作，而find等方法可以使用字符串操作ObjectID类型。==

```js
order.aggregate([
  {
    $lookup: {								// 获取order_item集合符合条件的所有文档，以数组形式作为order字段
      from:"order_item",			// 关联 order_item集合
      localField:"order_id",	// order集合的order_id字段
      foreignField:"order_id",// order_item集合的order_id字段
      as:"item"								// order新生成的字段名称
    }
  },
  {
    $project: {price: 1}			// 只返回 price 字段
  },
  {
    $match: {
        "price": {$ge: 90},		// 过滤掉 price>90的文档
      	bid: mongoose.Types.ObjectId(bid)
    }
	},
  {
    $group:{_id:"$order_id"}	// 按 _id 进行分组
	},
  {
    $sort:{price:1}						// 按 price 进行排序（升序）
	},
  {
    $limit:1									// 只返回一条文档
	},
  {
    $skip:1										// 跳过一条文档
	}
])
/* order是一个集合，aggregate是聚合方法，参数是数组，每个数组元素都是一个stage，对数据进行处理，处理	 	  完流到下一个stage
```

| 管道操作符 | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| $project   | 投射操作符，重构每一个文档的字段，可以提取、重命名、增加、删除字段 |
| $match     | 匹配操作符，筛选文档                                         |
| $group     | 分组操作符，分组文档                                         |
| $unwind    | 拆分操作符，将集合中的每一个值拆分为单独的文档               |
| $sort      | 排序操作符，根据一个或多个字段对文档进行排序，1为升序，-1为降序 |
| $limit     | 限制操作符，限制返回文档的数量                               |
| $skip      | 跳过操作符，跳过指定数量的文档                               |
| $count     | 统计操作符，统计文档的数量                                   |
| $lookup    | 连接操作符，连接同一个数据库中另一个集合，并获取指定的文档，类似populate |

---



#### 备份恢复

导出数据库

```shell
mongodump -h <host> -d <dbname> -o <dbpath>
# 将主机host的数据库dbname导出为绝对路径dbpath文件夹
```

导入数据库

```shell
mongorestore -h <host> -d <dbname> <dbpath>
# 将主机host的绝对路径dbpath文件夹导入为数据库dbname
```

---



### MySQL

Node 提供了一个操作 MySQL 的第三方包 mysql。[官方]( https://www.npmjs.com/package/mysql )

**安装：**

```shell
npm i mysql -S
```

**使用：**

```js
const mysql = require('mysql')
let db = mysql.createConnection({				// 创建一条连接
  host: 'localhost',										// 主机
  port: 3306,														// 端口
  user: 'root',													// 用户名
  password: '',													// 密码
  database: '2019123'										// 数据库名
})
db.connect();														// 连接数据库
db.query('SELECT * FROM user_table', (err, data) => {		// 数据库操作成功时回调
  ...
})

let pool = mysql.createPool({						// createPool用于创建多条连接（连接池）
  connectionLimit: 10,									// 默认10条连接
  ...
})
db.end();																// 断开连接
```

对数据库的操作都是异步的，而mysql包不能使用async/await。要使用co-mysql包

co-mysql是对mysql进行了包装，使得mysql可以使用async/await进行简化异步操作

安装：

```shell
npm i co-mysql -S
```

使用：

```js
const mysql = require('mysql')
const co = require('co-mysql')
let conn = mysql.createPool({...});
let db = co(conn);
let data = db.query('...')	// data就是返回结果
```

---



### Redis

安装

```shell
npm i redis --save
```

使用

```js
const redis = require('redis')
const redisClient = redis.createClient(6379,'127.0.0.1')	// 创建客户端

client.on('connect', () => {
    console.log('Redis client connected');
}

redisClient.on('error', err => {
  console.log(err)
})

redisClient.set('name', 'black', redis.print);				// 设置键值对,print输出是否设置成功
redisClient.get('name', (err, val) => {								// 获取键值，
  if(err) {
    console.log(err);
    return;
  }
  console.log('val:', val)														// get是异步的，需要promise返回数据
})
```

**API**

```js
set(key, value, fn(err, data))												// 成功时 data 是 'OK'
get(key, fn(err, data))																// 成功时 data 是键的值，否则是 null
keys('*', fn(err, data))															// 成功时 data 是包含键的数组
del(key, fn(err, data))																// 成功 data 是1，否则是0
```

---



##  其他

### npm

npm（node package manager）是随同 Node 一起安装的包管理工具，能解决 Node 代码部署上的很多问题。Node的第三方模块都可以通过 npm 下载，npm 会自动创建 node_modules 目录来存放模块，也可以手动创建。[官方网站](http://www.npmjs.com)

---

**npm 的包安装分为本地安装、全局安装：**

```js
npm install express          // 本地安装，安装的包放在 node_modules 目录下
npm install express -g       // 全局安装，安装的包放在 node 的安装目录下
```

在终端执行的命令会优先指向全局安装的包，如果找不到，才会使用项目的局部安装包。但是 `npm run ...` 命令由于指向`package.json`文件中的脚本命令，会使用项目的局部安装包。

---

**常用命令：**

```js
npm init											// 初始化项目，生成 package.json 文件
npm init -y										// 快速生成 package.json
npm install										// npm 会根据 package.json 文件下载或更新所有需要依赖的包
npm install	name							// 下载运行依赖
npm install name --save				// 运行依赖
npm i name --save-dev					// 开发依赖
npm uninstall name				 	  // 卸载模块并删除依赖项
npm config list								// 查看 npm 配置
npm --version								 	// 查看 npm 版本
npm install --global npm			// 升级 npm
npm help											// 查看帮助
```

---

**package.json（npm的配置文件）**

每个项目的根目录下面，一般都有一个`package.json`文件，定义了项目依赖的模块和配置信息（名称、版本、许可证等元数据）。`npm install`命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。

**配置选项：**

```js
{
	"name": "World",									// 项目名称
	"version": "0.0.1",								// 版本
	"author": "black",								// 作者
	"description": "node程序",				 // 项目描述
	"keywords":["node.js"],						// 关键词
  "main": "index.js",								// 指定项目的入口文件，默认index.js
	"repository": {										// git仓库所在位置
		"type": "git",
		"url": "https://path/to/url"
	},
	"license":"MIT",									// 开源协议
	"scripts": {											// 通过npm命令指定运行的脚本命令，npm run start
		"start": "node index.js"
	},
	"dependencies": {									// 指定项目运行所依赖的模块，可通过~、^、latest限定版本
		"express": "latest"
	},
	"devDependencies": {							// 指定项目开发时所依赖的模块
    "browserify": "13.0.0",
		"bower": "~1.2.8"
	}
}
```

`package.json`文件可以手写，也可以使用命令自动生成

```shell
npm init
```

`npm install`命令会根据`package.json`文件下载所有需要依赖的包

```shell
npm install
```

---

**package-lock.json**

- package.json只能锁定大版本；package-lock.json是锁定包的具体版本号
- package.json是项目的描述文件，package-lock.json文件记录所有包的详细信息

- 下载包或npm install时都会自动生成package-lock.json

**总结：**

- 当没有package-lock.json时，npm install根据package.json下载最新版本的包
- 有package-lock.json时，npm install根据package.json下载的是package-lock.json所指定的版本

---



### Content-Type

Content-Type也叫做MIME类型，用来告诉服务端如何处理请求的数据，以及告诉客户端如何解析响应的数据，比如显示图片，解析并展示html等等

```js
// 常见类型
text/html： HTML格式
text/plain：纯文本格式   
text/xml： XML格式
image/gif：gif图片格式   
image/jpeg：jpg图片格式 
image/png：png图片格式
application/xml：XML数据格式  
application/json：JSON数据格式

// 示例
response.setHeader('Content-Type', 'text/plain')
response.setHeader('Content-Type', 'text/html; charset=UTF-8')
```

---



### 请求静态资源

**浏览器在收到HTML响应内容（字符串）之后，就会开始从上到下解析，当在解析的过程中发现：**

- link
- script
- img
- iframe
- audio
- video

**等具有src（link的是href）属性的时候，浏览器会自动向服务端发起相应的资源请求**

---



### 渲染方式

**服务端渲染：**

- 客户端请求一个地址 url

- 服务器接收到这个请求，从数据库或者其他地方获取相应的数据(html文件)

- 服务端通过模板引擎，将数据与模板（html文件）结合，直接生成html字符串，返回给客户端

- 客户端解析html文本

  ```js
  const template = require('art-template');					// 导入模板引擎
  template.defaults.root = './';										// 设置根目录为当前文件所在目录
  let data = {...}																	// 数据
  let htmlstr = template('index.html', data);				// 在当前目录下查找文件，并生成字符串
  response.end(htmlstr);														// 响应给浏览器
  ```

---

**客户端渲染：**

- 客户端请求一个页面地址 url

- 服务端接收到这个请求，直接把相应的 html 静态文件返回给客户端

- 客户端解析 js ，遇到ajax请求，就会再次向服务端发起请求（获取相应的数据）

- 然后由 js 将这些数据和html文件渲染成页面

  ```html
  <script src="lib/template-web.js"></script>							<!-- 引入模板引擎 -->
  <script type="text/html" id="templateid">...</script>		<!-- 创建模板 -->
  <script>
  	$.ajax({
      url: 'data.js'
      success: function(data) {			// 浏览器接收服务器数据，根据模板生成字符串，并渲染到页面
      	$("div").append(template("templateid", data))
    	}
    })
  </script>
  ```

---

**区别：**

- 服务端渲染只发送一次请求，客户端渲染至少发送两次请求（第一次请求html文件，然后请求数据）
- 服务端渲染有利于SEO优化（爬虫能抓取到数据），-->首页商品列表
- 客户端渲染有利于用户体验，但数据是抓取不到的，-->商品评论

---

**使用：**

- 一般同时使用服务端渲染和客户端渲染
- 需要SEO就使用服务端渲染，否则使用客户端渲染（快）

---





### 模板引擎

**在 Node 中使用 art-template：**

作用：解析给定的 HTML 模板，而且将数据渲染进模板，最后生成一个 HTML 字符串

**安装：**

```shell
npm install art-template --save
```

**使用：**

```js
const template = require('art-template');
template.defaults.root = './';									// 设置在当前目录下查找index.html
let htmlstr = template('index.html', data);			// data是对象
response.end(htmlstr);
// 响应给客户端，客户端直接渲染，不用发送模板数据请求
```

---



### nodemon

nodemon是一个基于node.js开发的第三方工具, 它的作用是监听代码文件的变动，当保存文件时，会自动重启。

**安装：**

```shell
npm i -g nodemon				# 全局安装，所有项目都能使用
```

**启动程序：**

```shell
nodemon app.js
```

---



### 文件操作的相对路径问题

在文件操作时，比如readFile、writeFile等，相对路径是指在终端执行node命令所在的目录，也就是说，在哪个目录下执行node命令，./就是该目录。而在不同的目录下执行node命令，./是不一样的，这样很容易出错。

Node中的成员_ _dirname和 _ _filename可以解决这个问题。

==对于所有的文件操作，都要使用__dirname + 文件来引用文件，再结合path模块的join方法把两者拼接起来，而不能再使用相对路径 ./==

```js
fs.readFile(path.join(__dirname, './a.js'), callback)		// 推荐

fs.readFile('./a.js', callback)		// 错误
```



==模块的路径标识和文件操作中的相对路径是不一样的模块中的路径标识就是相对于当前文件模块，不受执行node命令所处目录影响==

```js
require('./a.js')		// 这里的./就是当前文件所处目录
```

---



### 表单的默认提交行为

- form元素有默认的提交行为，默认是同步提交。提交后一致等待服务器响应，期间不做其他事情。

  ==表单的同步提交，无论服务端响应什么，都会直接将响应结果覆盖当前页面==

- form元素的属性method默认是get，action默认是当前页面地址

- button元素属性type默认是submit，可通过type = 'button'改变

- 文本框回车有默认提交行为，可设置keydown事件阻止默认行为

```html
<input type="text" onkeydown="event.preventDefault()">
```

- ==服务端重定向对异步请求无效==，因为重定向是重新加载页面，而ajax请求是局部刷新页面，不会重新加载页面

  ajax请求只能获取响应数据，不会做其他动作，所以就不会再根据重定向的url向服务端发送请求。

  可以使用客户端重定向

  ```js
  window.location.href = '/'
  ```

---



### Cookie/Session

#### Cookie

web程序是使用HTTP协议传输的，而HTTP协议是无状态的协议，对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快

---

**Cookie使用：**

先要看需求，因为浏览器可以禁用Cookie， 同时服务端也可以不Set-Cookie。 

客户端向服务器端发送一个请求时，服务端向客户端发送一个Cookie，然后浏览器将Cookie保存，Cookie有两种保存方式，一种是浏览器会将Cookie保存在内存中，还有一种是保存在客户端的硬盘中，之后每次HTTP请求浏览器都会将请求域的Cookie放在请求头中，再发送给服务器端（浏览器会管理每一个域名下的cookie，cookie不能跨域）。

**每次访问时浏览器都会将本次访问的域名的cookie加在请求头中。**

**举例：**

分登录之前和登录后，登录前服务端给浏览器一个Cookie，但是这个Cookie里面没有用户信息，但是登录成功之后，服务端给浏览器一个Cookie，这个时候的Cookie已经记录了用户的信息，在系统内任意访问，可以实现免登录。

---

**操作Cookie**

- 浏览器
  - 查看cookie：Network、Application、Console
  - 修改cookie：`document.cookie（获取cookie，或将设置的值追加给cookie，可通过httpOnly禁止）`
- 服务器（Node.js）
  - 获取cookie：`req.headers.cookie`，格式为`k1=v1;k2=v2;..`
  - 设置cookie：`res.setHeader('Set-Cookie', 'k1=v1;k2=v2;..')`

---

**Cookie组成：**

`Set－Cookie: Name=Value；Expires=DATE；Path=PATH；Domain=NAME;maxAge=1000；SECURE;httpOnly`

- Name=Value：这是每一个Cookie都必须有的部分。Name是该Cookie的名称，Value是该Cookie的值。**对于认证Cookie，Value值包括Web服务器所提供的访问令牌。**
- Expires=DATE：用于确定Cookie的有效日期。系统只识别特定的格式的DATE。该变量默认Cookie的属性值不会保存在用户的硬盘中，而是保存在内存当中。
- Domain=DOMAIN-NAME：用于指定哪些 Web 站点或域可以访问浏览器存取的Cookie，即只有来自这个域的页面才可以使用Cookie中的信息。该变量默认为该Web服务器的域名。
- Path=PATH：定义了Web服务器上哪些路径下的页面可获取服务器设置的Cookie。只要用户输入的URL中的路径部分以 Path 属性开头，浏览器就认为通过检查。如果Path属性的值为“/”，则Web服务器上所有的WWW资源均可读取该Cookie。该变量 Path 属性值为 Web 服务器传给浏览器的资源的路径名。
- Secure：表明只有当浏览器和Web Server之间的通信协议为加密认证协议时，浏览器才向服务器提交相应的Cookie。当前只有HTTPS协议
- httpOnly：用于禁止客户端 js 脚本读取 cookie 信息
- maxAge：cookie有效毫秒

==借助 Domain 和 Path，即可有效控制 Cookie 被访问的范围。==而Domain一般使用默认值，所以只需设置Path='/'

**例子：**

```
res.setHeader("Set-Cookie", "username=black;Path=/;Max-Age=seconds;HTTPOnly");
```

---

**Cookie生存周期：**

Cookie在生成时就会被指定一个Expire值，这就是Cookie的生存周期，在这个周期内Cookie有效，超出周期Cookie就会被浏览器清除。有些页面将Cookie的生存周期设置为“0”或负值，这样在关闭浏览器时，就马上清除Cookie，不会记录用户信息，更加安全。

---

**Cookie特点：**

- cookie是存储在浏览器的一段字符串
- 跨域不共享
- 格式：k1=v1;k2=v2；因此可以存储结构化数据

**Cookie弊端：**

- 数量受到限制 

- 存储信息不安全，而且客户端可以通过JS修改cookie

- 浏览器可以禁用Cookie，禁用Cookie后，就无法享有Cookie带来的方便 

---



#### Session

因为很多第三方可以获取到这个Cookie，服务器无法判断Cookie是不是真实用户发送的，所以Cookie可以伪造，伪造Cookie实现登录进行一些HTTP请求。如果从安全性上来讲，Session比Cookie安全性稍微高一些，我们先要知道一个概念--SessionID。客户端第一次请求服务器的时候，服务器会为客户端创建一个Session，并将通过特殊算法算出一个session的ID，下次请求资源时（Session未过期），浏览器会将sessionID(实质是Cookie)放置到请求头中，服务器接收到请求后就得到该请求的SessionID，服务器找到该id的session返还给请求者使用。

---

**Session生命周期**

一般来说是半小时。例如登录一个服务器，服务器返回给你一个sessionID，登录成功之后的半小时之内没有对该服务器进行任何HTTP请求，半小时后你进行一次HTTP请求，会提示你重新登录。

---

**Session缺点**

- Session是存储在服务器中的，如果SessionId过多，会对服务器产生压力，还会耗费内存
- 多线程之间无法共享数据
- Session是存储在内存中，一旦关闭服务器，Session将不复存在

==常用Redis（内存数据库）来存储session数据。==

---

**与Cookie区别：**

- cookie以文本格式存储在浏览器上，存储量有限；session存储在服务端，可以无限量存储多个
-  session比Cookie更具有安全性 
-  session占用服务器性能，session过多会增加服务器压力 

---

























 