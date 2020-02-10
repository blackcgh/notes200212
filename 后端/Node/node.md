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
appendFile('path','data',fn(err))				// 追加文件或创建文件

// 目录
mkdir('path',fn(err))										// 创建目录
rmdir('path',fn(err))										// 删除空目录
readdir('path'[,'e'],fn(err,files))			// 读取目录下的所有内容，files是数组
```

**例子**

```js
const fs = require('fs');
fs.readFile('a.txt', (err, data) => {
  if(!err) {
    fs.writeFile('a.txt', data.toString()+'追加内容', err => {...})		// 追加写入
  }
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
path.join(__dirname, 'index.html')			 // 常用来拼接文件的绝对路径
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

- mongoose：连接操作 MongoDB 数据库（对官方 mongodb 模块进行了封装）

- mysql：操作 mysql 数据库

- moment：时间操作

- formidable：解析表单数据和文件上传

  ```js
  npm i -S formidable																	// 安装
  
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



## Node 框架

### Express 概述

- Express 是一个基于 Node 平台的 web 应用开发框架，==完全由路由、中间件构成==
- Express 不对 Node 已有的特性进行二次抽象，只是在它之上扩展了 Web 应用所需的基本功能
- ==Express 对核心模块 http 进行了封装，使用起来比 http 更简单，而且还能继续使用 http 模块的 API==
- Express 支持链式编程

---



### 安装

```js
npm i express --save
```

**导入 express 模块：**

```js
const express = require('express')		// express 是模块导出的顶级函数、对象

let app = express();
app.get('/', (req, res) => {					// 链式编程
  res.send('get');
})
.post('/',(req, res) => {
  res.send('post');
})
.listen(7777, err => {
	const.log('running')
})
```

**express 函数/对象**

```js
express()															// 创建并返回 express 对象
express.Router([options])							// 创建路由器，用于模块化管理路由
express.static('root'[,options])			// 用于提供托管静态资源的服务
```

**app 对象方法**

```js
// 方法
method('path',fn(req,res)[,fn,..])		// method 可以是get、post、all
listen(port,[,host,fn])								// 启动服务器
use(['path'],fn(req,res,next)[,fn,..])// 将中间件函数安装在指定路径上，请求路径匹配时执行中间件
engine('ext', fn)											// 
route('path')													// 返回指定路径的router对象，可省略method方法的path参数
```

---



### 路由

**路由：**指应用程序如何响应对特定请求方式、URL的客户端请求。添加路由的格式为

```js
app.method('path', fn(req,res)[,fn,...])
/* method：get、post、all
	 path：字符串、字符串模式('/ab?cd')、正则表达式(/a/)
*/
```

---

**路由器对象：**对路由进行模块化。可将所有路由定义在路由器对象上，再将路由器对象挂载到服务器对象上

```js
let router = express.Router()
router.get('/', (req, res) => {
  res.send('get');
})
.post('/',(req, res) => {
  res.send('post');
})
app.use(router)
```

**router 对象方法**

```js
method('path',fn(req,res)[,fn,..])		// method 可以是get、post
route('path')													// 返回指定路径的router对象，可省略method方法的path参数
use(['path',]fn(req,res,next)[,fn,..])// 类似app.use()
```

**注意：**

- ==路由的匹配不包括 URL 的查询参数==
- ==存在多个回调函数时，函数参数除了req，res，还有 next==

---



### app.use()

将一个或多个中间件函数安装在指定的路径上，当所请求路径以 path 开头时，将执行中间件函数

```js
app.use(['path'，] callback([req, res, next]) [，callback ...])
/* path：匹配以该路径开头的路径，默认是'/'
	 callback：可以是函数、 router 对象。callback 有三个参数：next 函数用于匹配执行下一个中间件
```

**常用路由：**

```js
app.use()				// 万能匹配，只要以指定 path 开头的路径，都能执行函数
app.get()				// 需要是 get 请求、指定路径才能执行函数
app.post()			// 需要是 post 请求，指定路径才能执行函数
```

**注意：**

- use 的中间件参数 request 的属性 url 是不包含 path 部分的
- 这三个方法都可以指定多个中间件函数，也是需要通过 next 来执行下一个中间件
- ==同一请求、同一路径下的方法的 request、response 对象相同。==use 方法可看做任何一种请求

---



#### 静态资源

对于需要对外公开访问的静态文件，可以使用 `express.static` 内置中间件来托管。

```js
app.use(express.static('public'))// 设置当前目录下的 public 目录对外开放访问
```

---



#### 中间件

Express是一个功能极简，完全是路由和中间件构成的一个web开发框架。从本质上来说，一个 Express 应用就是在调用各种中间件。==中间件只能在 Express 中使用。==

**中间件（Middleware）是一个函数，参数有 request、response、next。** next 用于匹配执行下一个中间件。

**中间件函数：**

```js
let middleware = function(req, res, next) {
  ...
  next();
}
```

**分类：**

- 内置中间件

  - express.static('root')：用于托管静态资源，root是指定提供静态资源的根目录，可设置多个目录

    ```js
    app.use(express.static(path.join(__dirname.'public'))// 将当前目录下的public对外开放
    app.use('/static', express.static('public'))	// 当请求路径以'static'开头，就执行函数
    ```

- 第三方中间件

  - **body-parser：**用于解析 post 请求体

    ```js
    npm install body-parser --save								// 安装
    
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())										// 然后 request 对象就有一个属性 body
    ```

  - **cookie-parser：**解析客户端传过来的 cookie
  
    ```js
    npm install cookie-parser --save
    
    let cookieParser = require('cookie-parser');
    app.use(cookieParser());											// 然后 request 就有一个属性 cookies
    ```
    
  - **cookie-session：**建立基于 cookie 的 session。该中间件会自动设置响应头中的 set-cookie
  
    ```js
    npm install cookie-session --save
    
    const cookieSession = require('cookie-session');
    app.use(cookieSession({
      name: 'sessionID',	// cookie 名称，常用sessionID
      keys: ['iisblack']	// 加密和解密cookie值的秘钥列表。keys[0]加密，其他的keys用来解密
    }))
    
    // 然后 request 就有一个属性 session，可以添加/获取 session 数据
    req.session.info = true				// 添加 session 数据，用于记录客户端状态
    req.session.info							// 获取 session 数据
    // 注意：默认 session 数据是内存存储的，服务器重启就会丢失，实际开发会将Session进行持久化存储
    ```
  
  - **Express-art-template：**在 express 中使用模板引擎
  
    ```js
    npm install --save art-template
    npm install --save express-art-template							// 整合了express/art-template
    
    app.engine('html', require('express-art-template'));// 规定模板引擎渲染 html 文件
    
    res.render('index.html', {								// 在views目录找模板文件并渲染，再发送响应
      name: 'black',
    });
    ```
  
    修改视图目录（默认是 views ）
  
    ```js
    app.set('views', 'newdir')
    ```

---



### express-generator

通过应用生成器工具 `express-generator` 可以快速创建一个应用的骨架。安装：

```shell
>npm install express-generator -g
```

然后可以在命令行使用命令 express

```shell
>express -h									# 使用手册
```

创建 Express 应用

```shell
>express --view=pug myapp		# 在当前目录下创建 myapp 目录，使用 pug 模板引擎
```

进入项目目录，启动应用；然后可以访问http://localhost:3000/

```shell
>npm install
>set DEBUG=myapp:* & npm start
```

目录结构

```js
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

---



### API

**express**

```js
express()															// 创建并返回 express 对象
express.Router()											// 创建路由器中间件，用于挂载在 express 实例上
express.static('root')								// 用于托管静态资源，是 Express 唯一内置的中间件
```

**app 对象方法**

```js
method('path', fn)									 // method 可以是get、post、all
all('path', fn)											 // 适用于所有 HTTP 请求，用于加载中间件功能
listen(port, fn)				 						 // 启动服务器
engine('ext', fn)									 	 // 根据文件扩展名的不同，使用不同的模板引擎(fn)
set('name','value')									 // 设置属性，可修改视图目录（默认是views）
route('path')												 // 返回指定路径的router对象，可省略method方法的path参数
use(['path'], fn)									 	 // 将中间件或router安装在指定路径，请求路径匹配时执行中间件
```

**request 对象**

```js
// 属性
protocol															// 获取请求的协议
hostname															// 获取请求的主机名
ip																		// 获取请求的ip
path																	// 获取请求路径
method																// 获取请求的方式
params																// 获取路由的参数
route																	// 获取当前匹配的路由
query																	// 获取请求URL的查询参数

body																	// body-parse添加的属性对象，存储post数据的键值对格式
cookies																// cookies-parse添加的属性对象，存储请求发来的cookie
session																// 使用中间件添加的属性对象

// 方法
get('type')														// 获取指定的请求头
```

**response 对象方法**

```js
set('name','value')										// 设置响应头，对象形式可以设置多个
status(n)															// 设置响应的状态码
send(body)														// 发送响应，自动设置content-type。值:str|buffer|obj
json(body)														// 发送JSON格式的响应，会将body转为JSON字符串
jsonp(body)														// 发送支持JSONP的JSON格式响应，等于callback(body)
cookie('name','value'[,options])			// 设置cookie
clearCookie()													// 清除cookie
download('path')											// 传输文件
sendFile('path')											// 传送文件,自动根据文件扩展名设置Content-Type
redirect([status,]'path')							// 设置状态码并重定向到指定的 URL
render('path',obj)	// 从视图目录读取模板文件，根据扩展名使用模板引擎结合obj解析，发送响应、结束响应
```

**router 对象方法**

```js
method('path',fn)	  									// method 可以是get、post
route('path')													// 返回指定路径的router对象，可省略method方法的path参数
use(['path',]fn)											// 类似app.use()
```

---



## Node 数据库操作

### MongoDB

### 关系型数据库

- 表就是关系，或者表与表之间存在关系

- 所有的关系型数据库都需要通过sql结构化查询语言来操作。Sql Server、MySQL、Oracle。。。
- 所有的关系型数据库在操作之前都需要设计表结构
- 数据表还支持约束（保证数据完整性）
  - 唯一的
  - 主键
  - 默认值
  - 非空

---



### 非关系型数据库

- 非关系型数据库非常的灵活
- 有些非关系型数据库（MongoDb）的数据结构直接就是键值对（key-value）

- 但是MongoDB也是最像关系型数据库的非关系型数据库

  | 关系型数据库 | MongoDB      |
  | ------------ | ------------ |
  | 数据库       | 数据库       |
  | 数据表       | 集合（数组） |
  | 表记录       | 文档对象     |

- MongoDB不需要设计表结构。也就是说创建数据库就可以直接往里面存数据

---

### 下载安装

下载：https://www.mongodb.com/download-center/community 

安装：

-  将默认安装地址如:(C:\Program Files\MongoDB\Server\4.2)，改为:
  (E:\Program Files\MongoDB\Server\4.2）
- 安装过程中勾选install MongoDB compass

配置环境变量：path=E:\Program Files\MongoDB\Server\4.2\bin

测试

```shell
mongod --version
```

---



### 启动和关闭数据库

启动：

```shell
# mongodb默认使用执行该命令所处盘符根目录下的/data/db作为数据存储目录
# 所以在第一次执行该命令之前手动新建一个/data/db
mongod
```

如果想要修改默认的数据存储目录，可以：

```shell
mongo --dbpath=数据存储目录路径
```

关闭：

```shell
ctrl+c
或者直接关闭命令行界面
```

---



### 连接和退出数据库

连接：

```shell
# 该命令默认连接本机的MongoDB服务
mongo
```

退出：

```shell
 exit
```

---



### 基本命令

```shell
# 显示所有数据库
>show dbs

#查看当前操作的数据库
>db

# 切换到指定的数据库，没有会自动新建
>use 数据库名称

# 显示当前操作的数据库的所有集合（表）
>show collections

# 查找当前数据库的某个集合的数据
>db.集合名称.find()
```

---



### 在Node中操作MongoDB数据

#### 官方的MongoDB包

Node提供了MongoDB包来操作（原生的，较为繁琐）

官方： https://github.com/mongodb/node-mongodb-native 



#### mongoose

第三方包mongoose基于官方的MongoDB包再一次做了封装（操作简单）

网址： https://mongoosejs.com/docs/guide.html

中文文档：   https://mongoose.kkfor.com/models.html 

安装：

```shell
npm install mongoose --save
```

==mongoose的API支持promise==



##### 模式（Schema）

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的结构

创建schema，使用`mongoose.Schema( { 字段 } )`

```js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;		//schema定义集合结构，集合有哪些字段
  const blogSchema = new Schema({		//创建一个schema
    title: {
      type: String,			//SchemaType,字段类型
      required: true, 	//必填
      default: '主题'	   //默认值
    },
    author: String
  });
```



##### 模型（Model）

 Model是从 Schema编译来的构造函数。 Model的实例就代表着可以从数据库保存和读取的 document文档对象。 从数据库创建和读取 document 的所有操作都是通过 model 进行的 

 把 schema 转换为 model， 使用 `mongoose.model(集合名称, schema)` 函数 ，返回一个模型构造函数

```javascript
// 集合名称首字母大写，mongoose会将其转变为 小写复数
const Blog = mongoose.model('Blog', blogSchema);
```



##### 文档（document）

 Mongoose document代表着 MongoDB 文档的一对一映射。 每个 document 都是 model的实例 



示例：

```js
const mongoose = require('mongoose');

// 1.连接MongoDB数据库，不管存不存在该数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 2.设计文档结构，属性就是集合的字段
const catSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

// 3.将文档结构schema发布为模型构造函数model，mongoose,model的第一个参数的小写复数就是集合名称
const Cat = mongoose.model('Cat', catSchema);

// 4.创建document，使用模型构造函数创建实例
const kitty = new Cat({ name: 'black' });

// 将document添加到数据库
kitty.save(function(err) {
  if(err) console.log('保存失败')
});
```



##### 添加（save）

```js
document.save(function(err) {...})
document,save().then(data => console.log(data))	// data是该文档对象
```



##### 查询（find）

```js
model.find(function(err,res) {
  console.log(res)	// res是存储文档对象的数组
})
model.find().then(data => {})	// data是文档或空数组


model.findOne({...},function(err,res) {})
model.findOne({条件}).then(data => {})	// data是文档或null
```



##### 更新（update）

```js
model.updateOne({...}, {...}, function(err, res) {})
model.updateOne({...}, {...}).then(data => {})

model.updateMany({...}, {...}).then(data => {})
```



##### 删除（delete）

```js
model.deleteOne({...}, function(err) {})
model.deleteOne({条件}).then(data => {})

model.deleteMany({...}, function(err) {})
model.deleteMany({条件}).then(data => {})
```

---

==save()、find()、updateOne()、deleteOne()等API都会返回promise==

---



### MySQL

Node 提供了一个操作 MySQL 的第三方包 mysql。[官方]( https://www.npmjs.com/package/mysql )

MySQL 可视化工具：Navicat、phpmyadmin（wamp web 工具）。

**安装：**

```shell
npm i mysql -S
```

**使用：**

```js
const mysql = require('mysql')
let db = mysql.createConnection({				// 创建一条连接
  host: 'localhost',										// 主机 ip 地址
  port: 3306,														// 端口，默认3306
  user: 'root',													// 用户名
  password: '',													// 密码
  database: '2019123'										// 数据库名
})
db.connect();														// 连接数据库
db.query('SELECT * FROM user_table WHERE id>2', (err, data) => {	// 数据库操作成功时回调
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



### 加密中间件blueimp-md5

对于密码之类的隐秘数据，为了防止开发人员看见，所以要通过加密工具加密后再存进数据库

安装：

```shell
npm i blueimp-md5
```

使用：

```js
const md5 = require('blueimp-md5')
password = md5(md5(password))	// 一般使用二次加密
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



### session和cookie

 **为什么要使用Cookie？**

web程序是使用HTTP协议传输的，而HTTP协议是无状态的协议，对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快



**Cookie的使用**

先要看需求，因为浏览器可以禁用Cookie， 同时服务端也可以不Set-Cookie。 

客户端向服务器端发送一个请求的时，服务端向客户端发送一个Cookie 然后浏览器将Cookie保存，Cookie有两种保存方式，一种是浏览器会将CCookie保存在内存中，还有一种是保存在客户端的硬盘中，之后每次HTTP请求浏览器都会将Cookie放在请求头中，再发送给服务器端。

举例：

分登录之前和登录后，登录前服务端给浏览器一个Cookie，但是这个Cookie里面没有用户信息，但是登录成功之后，服务端给浏览器一个Cookie，这个时候的Cookie已经记录了用户的信息，在系统内任意访问，可以实现免登录。



**Cookie的生存周期？**

Cookie在生成时就会被指定一个Expire值，这就是Cookie的生存周期，在这个周期内Cookie有效，超出周期Cookie就会被清除。有些页面将Cookie的生存周期设置为“0”或负值，这样在关闭浏览器时，就马上清除Cookie，不会记录用户信息，更加安全。



**Cookie的缺点**

1.  数量受到限制 
2. 不安全
3.  浏览器可以禁用Cookie，禁用Cookie后，也就无法享有Cookie带来的方便 



**为什么要使用Session？**

因为很多第三方可以获取到这个Cookie，服务器无法判断Cookie是不是真实用户发送的，所以Cookie可以伪造，伪造Cookie实现登录进行一些HTTP请求。如果从安全性上来讲，Session比Cookie安全性稍微高一些，我们先要知道一个概念--SessionID。SessionID是什么？客户端第一次请求服务器的时候，服务器会为客户端创建一个Session，并将通过特殊算法算出一个session的ID，下次请求资源时（Session未过期），浏览器会将sessionID(实质是Cookie)放置到请求头中，服务器接收到请求后就得到该请求的SessionID，服务器找到该id的session返还给请求者使用。



**Session的生命周期？**

根据需求设定，一般来说，半小时。举个例子，你登录一个服务器，服务器返回给你一个sessionID，登录成功之后的半小时之内没有对该服务器进行任何HTTP请求，半小时后你进行一次HTTP请求，会提示你重新登录。



**Session缺点**

Session是存储在服务器当中的，所以Session过多，会对服务器产生压力。

cookie与session的区别：

- cookie以文本格式存储在浏览器上，存储量有限；会话存储在服务端，可以无限量存储多个变量
-  Session比Cookie更具有安全性 
-  Session占用服务器性能，Session过多，增加服务器压力 























 