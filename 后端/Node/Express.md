# Express

## 概述

- Express 是一个基于 Node 平台的 web 应用开发框架，==完全由路由、中间件构成==
- Express 不对 Node 已有的特性进行二次抽象，只是在它之上扩展了 Web 应用所需的基本功能
- ==Express 对核心模块 http 进行了封装，使用起来比 http 更简单，而且还能继续使用 http 模块的 API==
- Express 支持链式编程
- Express 中间件丰富
- Express 通过回调函数的方式实现异步

---



## 安装

```shell
npm i express --save
```

**使用**

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



## 路由

**路由：**指应用程序如何响应对特定请求方式、URL的客户端请求。添加路由的格式为

```js
app.method('path', fn(req,res)[,fn,...])
/* method：get、post、all
	 path：字符串、字符串模式('/ab?cd')、正则表达式(/a/) */
```

**路由器对象：**对路由进行模块化，可将所有路由定义在路由器对象上，再将路由器对象挂载到服务器对象上

```js
let router = express.Router()
router.get('/', (req, res) => {				// 添加路由
  res.send('get');
})
.post('/',(req, res) => {
  res.send('post');
})
app.use(router)												// 挂载到app
```

**router 对象方法**

```js
method('path',fn(req,res)[,fn,..])		// method 可以是get、post
route('path')													// 返回指定路径的router对象，可省略method方法的path参数
use(['path',]fn(req,res,next)[,fn,..])// 类似app.use()
```

**注意：**

- ==路由的匹配不包括 URL 的查询参数==
- ==存在多个回调函数时，函数参数除了req，res，还有 next，这三个参数都是可选的==

---



## app.use()

将一个或多个中间件函数安装在指定的路径上，当所请求路径以指定路径开头时，将执行中间件函数

```js
app.use(['path'，] callback([req, res, next]) [，callback ...])
/* path：匹配以该路径开头的路径，默认是'/'
	 callback：可以是函数、 router 对象。callback 有三个参数：next 函数用于匹配执行下一个中间件
```

**常用路由：**

```js
app.use()															// 万能匹配，只要以指定 path 开头的路径，都能执行函数
app.get()															// 精确匹配，是 get 请求、指定路径才能执行函数
app.post()														// 精确匹配，是 post 请求，指定路径才能执行函数
```

**注意：**

- use 的中间件参数 request 的属性 url 是不包含 path 部分的
- 这三个方法都可以指定多个中间件函数，也是需要通过 next 来执行下一个中间件
- ==同一请求、同一路径下的方法的 request、response 对象相同。==use 方法可看做任何一种请求

---



### 静态资源

对于需要对外公开访问的静态文件，可以使用 `express.static` 内置中间件来托管

```js
app.use(express.static('public'))// 设置当前目录下的 public 目录对外开放访问
```

---



### 中间件

Express是一个功能极简，完全是路由和中间件构成的一个web开发框架。从本质上来说，一个 Express 应用就是在调用各种中间件。==中间件只能在 Express 中使用。==

**中间件（Middleware）是一个函数，参数有 request、response、next。** next 用于匹配执行下一个中间件。

**中间件函数：**

```js
let middleware = function(req, res, next) {
  ...
  next();
}
```

---

**分类：**

- 内置中间件

  - **express.static('root')：**用于托管静态资源，root是指定提供静态资源的根目录，可设置多个目录

    ```js
    app.use(express.static(path.join(__dirname.'public'))// 将当前目录下的public对外开放
    app.use('/static', express.static('public'))	// 当请求路径以/static开头，就执行函数
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

  - **cookie-session：**session 数据存在客户端。会自动设置响应头中的 set-cookie

    ```js
    npm install cookie-session --save
    
    const cookieSession = require('cookie-session');
    app.use(cookieSession({
      name: 'sessionID',	// cookie 名称，常用sessionID
      keys: ['iisblack']	// 加密和解密cookie值的秘钥列表。keys[0]加密，其他用来解密
    }))										// 然后req有属性session
    /* cookieSession其他选项：
    		path：cookie的路径，默认'/'
        domain：cookie的域
    		maxAge：cookie的有效毫秒数
        httpOnly：默认true */
    ```

  - **express-session：**session数据存储在服务端，会自动设置响应头中的 set-cookie

    ```js
    npm i express-session -S
    
    const session = require('express-session')
    app.use(session({
      secret: 'keyboard cat',
      cookie: { maxAge: 24*60*60*1000 }
    }))
    req.session.username = username;					// 设置 session
  req.session.destroy(err => {...})					// 销毁 session
    ```

  - **morgan：**关于http请求的日志中间件
  
    ```js
    npm install morgan --save
    
    const logger = require('morgan')
  app.use(logger('dev'))															// 开发环境，combined是线上环境
    ```

  - **express-art-template：**在 express 中使用模板引擎
  
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



## 脚手架

通过应用生成器工具 `express-generator` 可以快速创建一个应用的骨架

```shell
npm install express-generator -g			# 全局安装
express 项目名称											  # 创建项目
npm install														# 安装项目依赖，进入项目目录下运行该命令
npm start															# 启动项目，访问 http://localhost:3000
```

目录结构

```shell
├── app.js													# 入口文件，用于分配所有的路由
├── bin															# 启动目录
│   └── www													# 创建server服务，npm start指向该文件，端口默认是3000
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views													# 存放后端模板文件
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

---



## API

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

