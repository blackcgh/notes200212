# Ajax

## 概述

Ajax：Asynchronous JavaScript and XML（异步的 JavaScript 和 XML），是一种用于创建快速动态网页的技术。

Ajax 不是新的编程语言，而是一种使用现有标准的新方法。

Ajax 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

---

 

## Ajax 请求

默认情况下，由浏览器负责设置和发送请求报文。如果想要手动设置请求报文，就要使用 Ajax。

- **创建异步对象**

  ```js
  const xhr = new XMLHttpRequest();
  ```

- **设置请求报文**

  ```js
  xhr.open('get','xxx.php');				// 设置请求行，get方式在URL后面添加要发送的数据
  xhr.setRequestHeader();						// 设置请求头，可选
  ```

- **发送请求**

  ```js
  xhr.send(null)										// post方式在请求体添加要发送的数据
  ```

---



## Ajax 响应

**通过回调函数来执行响应后的操作**

- onreadyStateChange

  ```js
  xhr.onreadystatechange = function() {										// 注意大小写
    if(xhr.readystate === 4 && xhr.status === 200) {			// 4不能确定接收的是不是对的数据
      console.log(this.responseText);
    }
  })
  ```

- onload

  ```js
  xhr.onload = function() {
    console.log(this.responseText);
  }
  ```

---



## Ajax 例子

```js
let xhr = null;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");  //IE6、7、8
}
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
		console.log(xhr.responseText);
  }
}
xhr.open("post","/example.php");
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send('name=black&password=123');
```

---



## Ajax 异步对象

### 属性

```js
readyState							// 表示 XMLHttpRequest 对象的状态，是数字
												/* 0：已创建
													 1：调用 open 方法
													 2：调用 send 方法而且接收到响应头
													 3：正在接收响应体
													 4：响应体接收完成 */
status									/* 获取 HTTP 响应的状态码
													 200-请求成功
													 302-重定向
													 304-缓存
													 403-无权限
													 404-未找到页面 */
statusText							// 状态码描述
responseXML							// 获取HTML或XML的 DOM 对象，可通过querySelector解析，用于XML数据
responseText						// 获取的纯文本的值，可用于字符串和JSON数据
responseURL							// 获取响应的URL。http://example.com/test
timeout									// 设置请求超时(ms)。若超出该时间，则请求会自动结束
onreadystatechange			// 只要 readyState 属性发生变化，就会调用相应的处理函数
```

---

### 方法

```js
open('method','url'[, asyc]) 	// 设置请求报文的请求方式、地址，asyc默认是true
send('content')					 // 发送请求，参数用于post方式，数据名=数据值，数据之间用&分隔
abort()									 // 强制中断请求，属性readyState为0
setRequestHeader(header, value)		// 设置请求头，要在open后面，并且不能有中文
overrideMimeType('mime') // 重写由服务器返回的 MIME 类型,必须在send之前设置。默认为 "text/xml"
getResponseHeader('name')// 获取name对应的响应头信息，不区分大小写
getAllResponseHeaders()	 // 获取所有的响应头信息
```

---

### 事件

```js
onload									 // 请求成功完成时（响应后）触发。兼容性有一点点差
onerror									 // 请求错误时触发
onabort									 // 请求终止时触发，比如调用abort方法
ontimeout								 // 请求超时后触发
```

---



## HTTP 请求方式

在 HTTP 协议中，所有的请求都可以给服务器端传递数据，也都可以从服务器端获取内容，并没有什么差别

**请求类型和语义：**

- GET：获取数据（查找）

- POST：提交数据（修改）

- DELETE：删除数据（删除）

- PUT：存储数据（新增）

- HEAD：只获取响应头信息，不要响应体内容

- OPTIONS：发送探测性请求。比如查看服务器性能

---

**GET 与 POST 在浏览器中的区别**

- GET 是基于 URL “问号传参”的方式传递数据；POST 是基于“请求体”的方式传递数据
- GET 后退按钮/刷新无害；POST 数据会被重新提交（浏览器应该告知用户数据会被重新提交）
- GET 书签可收藏；POST 书签不可收藏
- GET 能被缓存；POST 不能缓存 
- GET 编码类型是 application/x-www-form-url；POST 编码类型有 encodedapplication/x-www-form-urlencoded 、 multipart/form-data 两种，为二进制数据使用多重编码
- GET 历史参数保留在浏览器历史中；POST 参数不会保存
- GET 对数据长度有限制，最大长度是 2048 个字符；POST无限制
- GET 只允许 ASCII 字符；POST没有限制，也允许二进制数据
- 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET ！POST 比 GET 相对安全，因为参数不会被保存在浏览器历史或 web 服务器日志中
- GET 的数据在 URL 中对所有人都是可见的。POST的数据不会显示在 URL 中

---

**本质区别**

其实，GET 和 POST 本质上没有任何区别，它们都是 HTTP 协议中的请求方法。HTTP 的底层是 TCP/IP，也就是说，GET/POST 都是 TCP 链接。GET 和 POST 能做的事情是一样的，GET 加上 request body，给 POST 带上url参数，技术上是完全行的通的。上述的区别只是浏览器厂家根据语义约定，做的限制而已。

另外，GET 产生一个 TCP 数据包；POST 产生两个 TCP 数据包。
对于 GET 请求，浏览器会把 http header 和 data 一并发送出去，服务器响应200（返回数据）；
而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应200 ok（返回数据）。

---

**注意：**

- Ajax 如果要像 HTML 表单那样 POST 数据，必须设置请求头，在 send 方法中规定要发送的数据

  ```js
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send("name=black&password=123");
  ```

---



## AJAX 同步/异步

- 浏览器是多线程的，每一个页面都是一个线程，js是单线程的（浏览器给js提供一个线程）

- 当执行完send方法，就开启了AJAX任务，如果之前的open方法的async参数是true，则AJAX任务是异步的。异步任务会被放在任务队列里，主线程继续执行下面的代码

- 如果是AJAX同步任务，该任务仍在主线程里，执行send后等待，只有任务完成（readyState为4），主线程才会执行下面的代码，期间任务会占据主线程，哪怕触发readystatechange事件，也不会执行函数。
- ==AJAX同步任务只会成功调用readyState=4（这时任务已结束）的事件==

```js
xhr.open(‘GET’,‘路径’,true); 					//异步任务
xhr.onreadystatechange = () => {
	if(xhr.readyState === 2) {
		console.log(1);
	}
	if(chr.readyState === 4) {
		console.log(2);
  }
}
xhr.send(); 												//异步任务开始
console.log(3);											// 输出3,1,2.  当async为false时，输出2,3
```

---

 **客户端获取服务器端时间**

从服务器端获取时间会存在一个问题，由于服务器端返回数据需要时间，所以客户端拿到返回的服务器时间，是有误差的，这个误差要越小越好

- 请求方式设置为HEAD，只获取响应头信息即可，在AJAX实例状态为2时就从响应头中获取时间信息（服务器时间存在响应头中），而不是等到更靠后的状态4

- 注意不要频繁的向服务器请求，例如倒计时不要每隔一秒就向服务器发送请求，请求一次然后自动计算时间

---



## AJAX/Promise

- 所有的异步任务（鼠标事件、定时器、网络请求、文件操作等）都要放入promise实例中

- ==AJAX任务通常是异步的，所以要结合promise使用==

---

**Promise状态**

Promise有三种状态：等待、成功、失败

- 直到resolve或reject之前都是等待状态
- 执行resolve之后就转为成功状态，执行reject就转为失败状态，将then或catch中的函数放入任务队列，再回头执行resolve或reject之后的代码

**在执行then或catch时：**

- 如果返回promise实例，则在promise实例中必须指明resolve还是reject，才能继续执行下一个then或catch

- 如果没有返回promise实例，只要代码没错，就会立刻执行下一个then，有错就会执行catch

---



## jQuery Ajax

```js
$.ajax(options)
$.get(url[, data, callback])
$.post(url[, data, callback])
```

**配置项options**

```js
url								// URL字符串，如"http://www.hzhuti.com"
type							// 请求方式，值：get(默认) | post
method						// 同type
data							// Object，要发送的数据，将自动转换为请求字符串格式
dataType					// string，服务器返回的数据类型，值：JOSN/XML/TEXT/SCRIPT/HTML...
async							// Boolean，设置异步和同步，默认true（异步）
contentType				// 发送的数据的内容编码类型。默认: application/x-www-form-urlencoded
cache							// Boolean，设置GET请求下是否建立缓存，默认true
timeout						// 设置请求超时时间(ms)
success						// callback，请求成功后调用函数，参数：result, status, xhr, 可选
error							// callback，请求失败时调用此函数，参数：xhr, textstatus, error，可选
complete					// callback，无论成功失败都会调用的函数，参数：xhr，type(请求类型)，可选
beforeSend		 	  // callback，请求前的处理 ，参数：xhr 
```

​	url：string，发送请求的地址（服务端的API接口地址）

​	method：string，请求方式，默认GET

​	data：Object，要发送的数据，将自动转换为请求字符串格式

​	dataType：string，服务器返回的数据类型，可设置JOSN/HTML/TEXT/SCRIPT/XML。。

​	async：Boolean，设置异步和同步，默认true（异步）

​	cache：Boolean，设置GET请求下是否建立缓存，默认true

​	timeout：设置请求超时时间，毫秒

​	success( result, status, xhr )：callback，请求成功后调用函数，参数可选

​	error( xhr, textstatus, error )：callback，请求失败时调用此函数，参数可选

​	complete()：callback，无论成功失败都会调用的函数

})

**参数说明：**

- data
  - 如果是GET请求，是基于问号传参传递给服务器的
  - 如果是POST请求，是基于请求体传递给服务器的
  - data的值如果是对象，JQ会转换为多个xx:xx

- dataType
  - 服务器返回客户端的响应体内容类型
  - 如果指定为json类型，则会把获取到的数据作为 JavaScript 对象来解析，把构建好的对象作为结果返回

- cache
  - 设置为true时，在第一次请求完成之后，地址和参数不变化，第二次去请求，会默认获取缓存中的数据，不去读取服务器端的最新数据
  - 设置为false时，JQ会在请求的URL末尾追加随机数（时间戳）属性，使得每次的URL都会不一样，所以每次读取的是最新的数据

- success函数参数
  - result：由服务器返回，并根据dataType进行处理后的数据

  - status：描述状态的字符串

  - xhr：XMLHttpRequest对象

- error函数参数
  - xhr：XMLHttpRequest 对象

  - status：错误信息,值为null、timeout、error。。

  - errorobj：捕获的异常对象

---



## axios

### 概述

axios 是一个基于 promise 管理的ajax类库，可同时在浏览器和 node.js 中使用。

**功能：**

- 在浏览器中发送 XMLHttpRequests 请求

- 在 node.js 中发送 http请求

- 支持 Promise API

- 拦截请求和响应

- 转换请求和响应数据

- 自动转换 JSON 数据

- 客户端支持保护安全免受 XSRF 攻击

---



### 安装

- **npm安装**

  ```shell
  $ npm install axios
  ```

- **CDN引入**

  ```html
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  ```

当引入axios文件或将npm下载的axios模块导入对象axios时，就存在一个 axios 函数对象，可以直接使用axios来发送网络请求。

---



### 请求方式

- axios.request(config)

- axios.get(url [,config])

- axios.delete(url [,config])

- axios.head(url [,config])

- axios.post(url [, data [,config]])

- axios.put(url [, data [,config]])

- axios.patch(url [,data [,config]])

**每一个方法都会返回一个promise实例，请求成功相当于执行resolve，请求失败相当于执行reject，所以可以继续调用then和catch方法**

---

**常用的请求方式：**

- **axios(config)**

  ```js
  axios({
  	url: 'http://json/users',
   	methods: 'post',
   	data: {
   		name: 'qiurx'
  	}
  })
  .then(function (response) {...})
  .catch(function (error) {...})
  ```

- **axios.get(url[, config])**

  ```js
axios.get('/user?ID=12345')			// 调用get方法，then()是成功回调，catch()是失败回调
  .then(function (response) {
  console.log(response);
   })
.catch(function (error) {...});
  
  ```

// 可选地，也可以这样做
  axios.get('/user', {
  params: {
     	ID: 12345
	}
  }).then(function (response) {...}).catch(function (error) {...});
```

- **axios.post(url[, data[, config]])**

  ```js
axios.post('/user', {
  	firstName: 'Fred',
	lastName: 'Flintstone'
  })
.then(function (response) {...})
  .catch(function (error) {...});
```

---



### 响应结构

then中的参数 response 就是响应的数据，是一个对象，其结构：

```js
{
	config   				// 对象，请求配置项
	data   					// 对象，响应体内容，主要
	headers 			  // 对象，响应头信息
	request  				// 对象，创建的 Ajax 实例
	status 				  // 数字，状态码
	statusText 			// 字符串，状态码描述
}
```

---



### 并发请求

axios.all(arr)，传入一个数组作为实参，数组元素即为 axios 请求

```js
axios.all([
	axios.get(‘url’),
	...
]).then(result => {
	console.log(result);       // result是一个数组，存放每一个请求获取的response对象
	let [res1, ...] = result;  // 数组解构
})
```

---



 ### 请求配置

创建 axios 请求时可以用的配置选项。**url必填，method默认是get。**

```js
{
	url  									// 字符串，请求地址，必填
	method								// 字符串，请求方式。默认get
	baseURL								// 字符串，将自动加在url前面，除非url是一个绝对URL。可用来区分不同服务器
	params								// 对象，参数会加在URL参数上(get方式有效)
  data									// 对象，数据存在请求体中(post方式有效)
	timeout								// 数字，设置超时时间(ms)
	headers								// 对象，自定义请求头
  responseType				  // 字符串，返回的数据类型，默认是json，值：document | text | stream
  withCredentials				// 布尔值，是否携带cookie信息，默认false
	transformRequest			// 函数，请求前的数据处理，最后要返回相应数据。参数：data，headers
	transformResponse			// 函数，对响应数据处理，最后要返回相应数据。参数：data
	validateStatus			  // 函数，定义响应状态码是resolve或reject promise。参数：status
	...
}
```

---



### 默认配置

每一个 axios 实例都可以设置默认配置，这样使用 axios 创建的请求都会使用默认配置。有三种设置配置的方式：

```js
let instance = axios.create({		// 创建实例时设置配置，优先级最低
  baseURL: 'https://api.example.com'
});

// 设置默认配置，优先级中等
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance({											// 设置实例配置，优先级最高		
  
})
```

---

**配置优先级**

配置将会以优先级进行合并。`request config` > `instance.defaults` > `系统默认`，优先级高的覆盖优先级低的。

---



### 创建实例

引入axios模块就会存在一个 axios 函数对象，但是也可以创建实例。**常用自定义的 axios 实例来发送请求。**

```js
axios.create([config])

const instance1 = axios.create({
 baseURL: 'https://some-domain.com/api/',
 timeout: 1000,
 headers: {'X-Custom-Header': 'foobar'}
});
instance1({
	url: ‘home/teat.json’,
})
```

如果项目文件分布在多个服务器，那么就不能设置默认配置了（每个服务器的IP不同，就不能设置baseURL为固定值了）。此时可以使用create创建多个拥有通用配置的axios实例，配置相同的请求就用同一个实例来发送请求。

---



### interceptors 拦截器

可以在 `then` 和 `catch` 之前拦截请求和响应。

**请求拦截器**

```js
axios.interceptors.request.use(
	config => {return config},									// 请求方式成功前的操作
	error => {return Promise.reject(error);}		// 请求失败时的操作
)

/* 1. 请求配置中的一些信息不符合服务器的要求，可在拦截器修改
	 2. 在发送网络请求时，可在界面上显示一个等待图标
	 3. 某些请求，必须携带特殊的信息。比如登录需要令牌（token）
```

---

**响应拦截器**

```js
axios.interceptors.response.use( 							// 响应成功，先执行该函数，再执行then
	response => {
		return response.data;				  						// 通常将响应体内容data返回给then的参数
	},
		error => {return Promise.reject(error);}  // 响应错误
)
```

---

**移除拦截器**

```js
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

---



### 模块封装

==封装axios==

- 使用axios发送网络请求时不要将axios直接写在组件内部，不然以后万一不再使用axios时每个组件都要重新修改
- 而是创建一个新的实例文件，里面存放不同的axios实例函数，每一个函数都创建并返回axios实例。以后想要发请求调用函数就行了

==封装实例文件==

- 还可以再封装axios实例文件，因为很多数据文件的存放路径如果发生变化，就会导致url也要跟着改，如果有很多请求，那么每一个请求都要改
- 创建一个新的url文件，从实例文件导入实例函数，url文件里面存放各种url不同的axios实例函数，每一个函数都返回一个含有具体url的axios实例。

==组件导入==

- 组件导入url文件里面的函数，直接使用

***总的来说，组件导入url文件，url文件导入实例文件，实例文件导入axios模块***

---

**实例文件：导出多个axios实例函数**

```js
import axios from ‘axios’

export function getaxios1(config) {
	const axios1 = axios.create({
    baseURL: ‘http://192.168.23.07:8080’,
		...
	})
	return axios1(config)
}

export function getaxios2(config) {
  const axios2 = axios.create({
    ...
  })
  return axios2(config)}

...
```

---

**url文件：导出多个具有url的axios实例函数**

```js
import {getaxios1, getaxios2, ...} from ‘实例文件路径’

export function getrequest1() {
	return getaxios1({
    url: ‘/路径1’ 
	})
}

export function getrequest2() {
  return getaxios2({
    url: ‘/路径2’
  })
}

...
```

---

**组件：使用url文件导出的函数**

```js
import {getrequset1, getrequset2, ...} from 'url文件路径'

getrequest1().then(response => {...})
```

---



## 其他

### 全局刷新/局部刷新

**全局刷新：**整个页面的刷新，常见于a链接、表单提交。优点是数据都是在服务器端加载的。

**局部刷新：**整个页面只有一部分页面需要更新，常见于AJAX。优点是不用跳转到新页面。

网站首屏的数据先在服务器端加载好（服务端渲染），其他的数据再用ajax请求（客户端渲染），这样做的好处就是页面加载时不用再去请求数据（也有利于SEO），而是根据已有的数据直接渲染。

---



### 静态网页/动态网页

**静态网页：**

- 由全局刷新实现
- 每个网页都是一个独立的文件，内容相对稳定
- 内容不会随着用户的点击或时间的改变而改变
- 不需要后台程序干预处理，直接由服务器返回。一般不需要维护，因为数据不需要更新

**动态网页：**

- 由局部刷新实现
- 没有以文件的形式存储到 web 服务器上
- 内容是可以随着时间、环境或者数据库操作的结果而发生改变的
- 网页由 HTML 标签、程序代码组成，服务器端根据客户的不同请求动态的生成网页内容

**两者区别：**

- 静态网页的交互性较差
- 动态网页更容易更新与维护
- 静态网页的响应速度更快，也有利于SEO
- 静态网页都有一个固定的URL
- 常见的静态页面扩展名有：.htm、.html、.xml，动态页面扩展名有：.asp、.php、 .jsp 

---



### HTTP 报文

**HTTP 报文：**是网络中交换和传输的数据单元，即站点一次性要发送的数据块。报文包含了将要发送的完整的数据信息。HTTP 报文是由一行一行简单的字符串组成的。HTTP 报文都是纯文本，不是二进制代码，所以人们可以很方便地对其进行读写。**如果说HTTP是因特网的信使，那么HTTP报文就是它用来传送的包裹了。**

**HTTP 报文分类：**

- 请求报文：客户端向Web服务器请求一个动作
- 响应报文：服务器将请求的结果返回给客户端

---



#### 请求报文

- 请求行
  - 请求方式
  - 请求地址
  - 协议版本
- 请求头
  - 浏览器信息
  - 可接受的响应内容类型（Content-Types）
  - 请求体的MIME类型 （用于POST和PUT请求中）
  - 主机地址
- 请求体
  - 发送给服务器的数据

---



**请求方式**

- GET：获取数据

- POST：发送数据

- DELETE：

- PUT：

- HEAD：

- OPTIONS：

---

**请求地址**

当前页面的URL，请求的资源。格式：`protocol://host[:port]/path/[?query]#fragment`

---

**协议版本**

HTTP 报文的版本，有1.0和1.1两个版本

HTTP1.0定义了三种请求方法： GET、POST 和 HEAD

HTTP1.1新增了五种请求方法：OPTIONS、PUT、DELETE、TRACE 和 CONNECT 

---



#### 响应报文

- 状态行
  - 状态码
    - 200---请求成功（OK）
    - 304---缓存（）
    - 404---页面不存在（Not Found）

- 响应头
  - 响应内容类型
  - 服务器信息
  - 响应日期
- 响应体
  - 响应数据

---

 **状态码**

由三位数字组成，描述了请求过程中所发生的情况

1xx（信息提示）：收到请求，继续处理

2xx（成功）：请求已成功接收，理解和接受，200

3xx（重定向）：需要采取进一步措施才能完成请求，302

4xx（客户端错误）：请求包含错误的语法或无法满足，403、404

5xx（服务器错误）：服务器无法满足明显有效的请求

---

**响应内容类型**

Content-Type（MediaType），即是Internet Media Type，互联网媒体类型，也叫做MIME类型。在互联网中有成百上千中不同的数据类型，HTTP在传输数据对象时会为他们打上称为MIME的数据格式标签，用于区分数据类型

在HTTP协议消息头中，使用Content-Type来表示请求和响应中的媒体类型信息。它用来告诉服务端如何处理请求的数据，以及告诉客户端如何解析响应的数据，比如显示图片，解析并展示html等等。

**Content-Type格式：**

Content-Type：type/subtype ;param

type：主类型，任意的字符串，如text，*代表所有；

subtype：子类型，任意的字符串，如html，*代表所有，用“/”与主类型隔开；

param：可选参数，如charset，boundary等。图片不要指定编码

例如：

Content-Type: text/html;

Content-Type: application/json;charset:utf-8;

**常见的媒体格式类型如下：**

text/html ： HTML格式

text/plain ：纯文本格式   

text/xml ： XML格式

image/gif ：gif图片格式   

image/jpeg ：jpg图片格式 

image/png：png图片格式

application/xml：XML数据格式  

application/json：JSON数据格式

**对照表：https://tool.oschina.net/commons**

---



### Ajax 数据传输格式

---

#### XML

```xml
<!-- data.xml -->
<?xml version="1.0" encoding="ISO-8859-1"?>
<note>
	<name>black</name>
  <age>18</age>
</note>
```

---



#### JSON

```json
// data.json
{
  "name": "black",
  "age": 18
}
```

---



### 模板引擎

模板引擎是为了使界面与数据分离而产生的，它可以生成一个标准的 HTML 文档字符串。

**art-template 介绍：** 

art-template 支持 NodeJS 和浏览器。而且便于维护代码，以前渲染数据是以模板字符串的形式在js文件中写入的html内容，如果html内容需要修改，我们需要在js中修改。而用了模板引擎以后，我们只需要html文件中修改html内容。还有使用了模板引擎以后 DOM 操作的效率也会更高。

**特点：**

- 拥有接近 JavaScript 渲染极限的的性能

- 调试友好：语法、运行时错误日志精确到模板所在行；支持在模板文件上打断点(Webpack Loader)

- 支持 Express、Koa、Webpack

- 支持模板继承与子模板

- 浏览器版本仅 6KB

---

**安装：**

```js
npm install art-template --save				// npm安装，也可以引入art-template文件
```

**前端使用：**

- 引入 art-template 文件

  ```html
  <script src="art-template.js"></script>
  ```

- 创建 HTML 模板

  ```html
  <script id="myTemplate" type="text/html">
  	<div>
      <p>{{title}}</p>
    </div>
  </script>
  ```

- 使用 template 方法生成 HTML 字符串

  ```js
  let template = template('myTemplate', data);		// template就是生成的HTML字符串
  ```

- 页面添加该 HTML 字符串

  ```js
  document.body.innerHTML = template;
  ```

---

**语法**

```html
<!-- 输出 -->
{{value}}												<!-- 双大括号之内就相当于 JS 环境，可执行简单的 JS 代码 -->
{{a ? b : c}}、{{a || b}}、{{a + b}}
{{@value}}											<!-- 原文输出，可以解析其中的标签 -->

<!-- 条件 -->
{{if value}} ... {{/if}}				<!-- 只有 value为 true 时，才会显示其中的内容 -->
{{if v1}} ... {{else if v2}} ... {{/if}}

<!-- 循环 -->
{{each target}}									<!-- target是传进来的对象数据的属性，可以是对象或数组 -->
    {{$index}} {{$value}}				<!-- index是索引或属性名，value是值 -->
{{/each}}
```

---



### Fetch

- Fetch是JS中内置的API，是一个基于原生JS的函数，位于顶级对象window中
- Fetch不是AJAX，它诞生的目的是为了代替AJAX
- Fetch是ES6新增的API，兼容性不是特别好，现在还是使用AJAX

**用法**

```js
// 第一个参数：请求url地址
/** 第二个参数：配置对象，可选
				method：String，请求方法，默认get
				body：String，post请求的参数，get请求不能设置
				headers：Object，请求头，默认{}
				...
**/
// 返回值：promise对象
fetch(url[, options])
```

示例：

```js
fetch(url)
.then(response => {
  console.log(response.text())
})
.catch(err => console.log(err))

// 推荐
async function() {
  // response是响应对象，有headers、status等属性，还有text()、json()等原型方法
  // text()：返回一个被解析为USVString(文本)格式的 Promise 对象
  // json()：返回一个被解析为JSON格式的 Promise 对象
  // blob()：返回一个被解析为Blob(二进制)格式的 Promise 对象，可以读取图片
  let response = await fetch('a.txt');	// 请求
  let str = await response.text();	// 解析
  
  let res = await fetch('a.json');
  let json = await res.json();
}
```

---

**fetch和ajax 的主要区别**

- fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500
- 在默认情况下 fetch不会接受或者发送cookies， 需要手动的指定 credentials:'include' 

---

**fetch的问题**

- 所有的IE浏览器都不会支持 fetch()方法
- 不管服务器端返回的状态码是什么（400、500），执行的都是then。如果要执行catch，需要手动跑抛出异常



---



### 前端开发性能优化

**方向：**

- 减少HTTP请求次数和请求大小

- 代码优化
  - 有利于SEO优化
  - 有利于扩展维护
  - 有利于减少性能消耗

**具体思路：**

- 在js中尽量减少闭包的使用（闭包会产生不释放的栈内存），要手动释放不被占用的内存

- 尽量合并css和js文件（减少HTTP请求次数）
- 代码压缩（减少HTTP请求资源的大小），可以使用webpack打包工具

- 尽量使用字体图标
- 尽量使用SVG图标来代替PNG图标（矢量图比位图小，渲染快，放大不变形）

- 减少对DOM的操作（页面结构改变会导致浏览器重新计算DOM，重新渲染页面）

- 使用图片的懒加载（减少 ‘ 第一次加载 ‘ 过程中的HTTP请求次数）

- 利用缓存技术（304缓存），使读取速度加快

- 使用事件委托（事件代理）代替事件绑定的操作（减少对DOM元素的操作）
-  在js中避免嵌套循环和死循环 

- 尽量减少css表达式的使用

- css选择器的解析规则是从右向左，尽量减少标签选择器的使用

- 使用css精灵图技术（css sprite）

- 尽量减少css的导入式的使用，使用外链式引入 （link是异步的 ，而@import是同步的）

- CDN加速
- ......