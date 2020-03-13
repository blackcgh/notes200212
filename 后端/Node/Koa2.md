# Koa2

## 概述

- Koa 是一个基于 Node 平台的下一代 web 开发框架。由 Express 原班人马打造
- koa2 完全使用 Promise 并配合 Node 的新特性 async/await 来实现异步
- Node.js 版本高于 V7.6，才能使用 koa2
- koa 比 express 更精简，不绑定任何中间件，更容易实现定制化，扩展性好；而 express 就是一个庞大的框架，路由、静态服务都已内置。

**在koa中，一切的流程都是中间件，数据流向遵循洋葱模型，先入后出，是按照类似堆栈的方式组织和执行的**

---



## 安装

```shell
npm install koa --save
```

**使用**

```js
const Koa = require('koa')				// koa 是一个类，所以首字母大写
const app = new Koa();
app.use(async (ctx, next) => {		// ctx 封装了 request 和 response，是一个请求的上下文
  await next();										// next 是一个用于执行下游中间件的函数
  ctx.body = '<h1>hello koa2</h1>'
})
app.listen(7777, err => {
  console.log('is running');
})
```

---



## API





---



## 中间件 middleware

### koa-router

koa-router 用于处理 URL 映射，可以处理 get 和 post 请求

```js
npm install koa-router					// 默认是生产依赖

const router = require('koa-router')()
router.get('/a', async (ctx, next) => {...})
app.use(router.routes())
```

---



### koa-bodyparser

koa-bodyparser 用于解析请求体，支持x-www-form-urlencoded、application/json 格式的请求体，form-data 格式需要借助 formidable 库

```js
npm install koa-bodyparser

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())							// 使用 ctx.request.body
```

---



### koa-static

koa-static 用于处理静态资源

```js
npm install koa-static

const static = require('koa-static')
```

---



### koa-views

koa-views 用于视图模板渲染

```js
npm install koa-views

const views = require('koa-views')
```

---



### koa-session

koa-session 用于处理session

```js
npm install koa-session

const session = require('koa-session')
```

---



### koa-generic-session/koa-redis

koa-generic-session 用于 koa 的通用会话中间件，可与 redis 或 mongo 等一起使用

```js
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
var Koa = require('koa')
var app = new Koa();
app.keys = ['keykeys'];
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24*60*60*1000
  }
  store: redisStore()
}));
```

---



### koa-jwt



---



### koa-helmet



---



### koa-morgan









---



## 脚手架

```shell
npm install koa-generator -g			# 全局安装
koa2 项目名称											  # 创建项目
npm install												# 安装项目依赖
npm start													# 启动项目，访问 http://localhost:3000
```

---



## 其他

### express/koa/koa2

- koa2 实现异步是通过 async/await；koa 实现异步是通过 generator/yield
- express 实现异步是通过回调函数
- koa2 与 express 提供的 API 大致相同，express 是大而全，内置了大多数的中间件，更让人省心，koa2 不绑定任何的框架，干净简洁，小而精，更容易实现定制化，扩展性好
- express 是没有提供 ctx 来提供上下流服务，需要更多的手动处理，express 本身是不支持洋葱模型的数据流入流出能力的，需要引入其他的插件

---



### async/await

async/await 让异步代码看上去更像同步代码

```js
function fn() {
  return new Promise((resolve, reject) => {
    console.log(2);
    fs.readFile('a.txt', (err, res) => {
      if(err) {
        reject(err);										// 如果执行 reject，await 后面的代码不会再执行
        return;
      }
      resolve(rel);
    })
    console.log(3);
  })
}
async function readFileData() {
  console.log(1);
  const data = await fn();							// data = rel
	console.log(5);

}
try {
  readFileData();
  console.log(4);
} catch(e) {
  console.log(e)
}
```

**总结：**

- await 后面可以是
  - promise 对象，await 表达式返回 resolve 的值
  - 其他值，返回该值
- await 必须包裹在 async 函数里面
- async 函数返回的也是 promise 对象（resolved 状态），如果
  - 如果 async 函数中有 return，返回的值作为该对象 resolve 值
  - 否则该对象 resolve 值是 undefined
- try-catch可以捕获 promise 中 reject 的值