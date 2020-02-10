# 跨域访问

## 概述

Netscape 提出一个著名的安全策略：同源策略，所有支持 JavaScript 的浏览器都会使用这个策略。

**同源策略：**指的是网页的协议，域名，端口必须相同，否则浏览器报跨域错误。出于安全原因，只允许本域名下的接口交互，不同源的客户端脚本，在没有明确授权的情况下，不能读写对方的资源。

Ajax 和 Fetch API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非响应报文包含了正确CORS响应头。

---



## JSONP

**同源策略只针对 JS，对 HTML 无效。类似`<script>`、`<img>`、`<iframe>`具有 `src` 属性的标签都不会受跨域的影响。**所以形成了一种非正式传输协议（ JSONP），目的就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

==JSONP(JSON with Padding) 是 jSON 的一种"使用模式"，可以实现对跨域数据的访问，但是只能是get请求。==

---



### 案例1（静态 JS 文件）

网站A要获取网站B的数据：

- 网站B要提供一个 JS 文件，文件中存有数据

  ```js
  // 网站B的foo.js
  foo({"name":"black","age":18});		// B网站是在假定请求者已经定义了该函数 foo 的情况下返回数据
  ```

- 网站A通过 `script` 标签获取 JS 文件；并定义一个函数，函数名由网站B指定

  ```html
  <!-- 网站A -->
  <script src="http://www.B.com/open.js"></script>
  <script>
  	function(data) {		// data就是网站A从网站B中获取过来的数据
      ...
    }
  </script>
  <!-- 则相当于B网站和请求数据者之间建立了一个协议（JSONP），要求请求者务必按照规则办事，如果请求者不			 能同时遵守上面两条规则就不能按预期获取数据。 -->
  ```

**但是由于函数名称是由提供数据的网站规定，获取数据的网站可能已经存在该名称，所以这种方式存在命名冲突问题。**

---



### 案例2（动态生成 JS 脚本）

比如客户想访问 : **https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction**。

假设客户期望返回数据：{"name": "black","age": 18}。

真正返回到客户端的数据显示为: callbackFunction({"name": "black","age": 18})。

**服务端文件 jsonp.php 代码**

```php
<?php

header('Content-type: application/json');

//获取请求者自定义的回调函数名
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);

//待返回的json数据
$json_data = '["customername1","customername2"]';

//输出jsonp格式的数据
echo $jsoncallback . "(" . $json_data . ")";
?>
```

**客户端实现自定义 callback 函数**

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script type="text/javascript">
    var callback = function(data){...};

    // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
    var url = "https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callback";

    // 创建script标签，设置其属性
    var script = document.createElement('script');
    script.setAttribute('src', url);

    // 把script标签加入head，此时调用开始
    document.getElementsByTagName('head')[0].appendChild(script);
    </script>
</head>
<body></body>
</html>
```

---



### jQuery JSONP

jQuery 中已经封装好了 JSONP。会动态地创建了一个 `script` 标签和回调函数，利用 `src` 属性发送跨域请求，读取数据。

但 ajax 和 jsonp 是不同的东西。ajax 的核心是通过 XmlHttpRequest 获取非本页内容，而 jsonp 的核心则是动态添加`<script>`标签来调用服务器提供的 js 脚本

- **同源**

  ```js
  $.ajax({
      url:"persons.json",
      success:function(data){
  　　　　console.log(data);
  　 }
  });
  ```

- **跨域**

  ```js
  $.ajax({
      url:"http://www.B.com/open.php",
      dataType:"jsonp",					// 设置jsonp，会将jsonp、jsonpCallback选项值拼接为url参数
    	jsonp: "callback",				// 指定url参数的键，默认是callback
    	jsonpCallback:"Handler",	// 自定义jsonp函数名，默认为jQuery随机生成
      success:function(data){		// 此时data就是jsonp数据
          console.log(data);
      }
}); 
  ```
  
  只有在跨域时，加上 `dataType: "jsonp"` 后，就不是 xhr 请求，而是 JS 请求

---



### JSON与JSONP的区别

- json是一种轻量级的数据交换格式。jsonp是一种跨域数据交互协议

- json 是理想的数据交换格式，但没办法跨域直接获取，于是就将 json 包裹(padding)在一个合法的 js 语句中作为js 文件传过去。这就是 json 和 jsonp 的区别。所以，json 是想要的东西，jsonp 是达到这个目的而普遍采用的一种方法，当然最终获得和处理的还是json。所以说 json 是目的，jsonp 只是手段

- json 总会用到，而jsonp只有在跨域获取数据才会用到

- 同源的时候直接获取就行，跨域的时候需要拐个弯来达到目的

---



## CORS

cross-origin resource sharing，即跨域资源共享。CORS 机制允许 Web 应用服务器进行跨域访问控制。目前，所有主流浏览器都支持该功能，IE10才支持。

浏览器一旦发现 Ajax 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，从而获知服务端是否允许该跨域请求。

CORS 需要浏览器和服务器同时支持。目前，所有主流浏览器都支持该功能，IE 浏览器不能低于 IE10。在浏览器端, 整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的Ajax 通信没有差别，代码完全一样。浏览器一旦发现 Ajax 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，用户对这些都不会有感觉。因此，==实现CORS通信的关键是服务器。==

**浏览器将跨域请求分为两大类: 简单请求和非简单请求。**

---



### 简单请求

同时满足以下两个条件的请求为简单请求：

- 请求方式为下列之一:
  - GET
  - POST
  - HEAD

- 请求头信息只能设置以下字段:
  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type：只限于pplication/x-www-form-urlencoded、multipart/form-data、text/plain

当请求跨域时，对于简单请求，浏览器会自动在请求头中加上`Origin`字段（包含协议、域名、端口），然后再发送请求，告诉服务器这个请求来自哪个源。

服务器收到请求后，会对比这个字段，如果字段值不在服务器的许可范围内，服务器会返回一个正常的 HTTP 响应，响应头中不会包含`Access-Control-Allow-Origin`字段，浏览器发现后，就会抛出错误，触发 Ajax 对象的 `onerror` 事件。注意，这种错误无法通过状态码识别。

如果这个源在服务器的许可范围内，也就是说服务器在响应头设置的`Access-Control-Allow-Origin`字段值包含请求头的 `Origin` 字段值，那么返回的响应头中至少含有 `Access-Control-Allow-Origin`字段

```js
// Access-Control-Allow-Origin 字段的值：
*																// 任意源
http://ip:port									// 指定源
```

==直接打开的文件的 Origin 是 null==

---



### 非简单请求

对于非简单请求，浏览器会先发起一个预检请求（OPTIONS请求），询问服务器是否允许当前源访问，只有允许才会发送实际请求。**预检请求可以避免跨域请求对服务器的用户数据产生未预期的影响。**

预检请求的请求头信息包含以下字段：

- Origin: 请求源
- Access-Control-Request-Method：实际请求的请求方式
- Access-Control-Request-Headers：实际请求将携带的自定义请求头字段
- Access-Control-Max-Age：可选，预检请求的有效时间(s)，不能超过浏览器的最大维护时间

服务器收到预检请求后，会检查前三个字段，确认是否允许跨域请求。如果服务器否定了预检请求，会返回一个正常的 HTTP 响应（没有任何与 CORS 相关的头信息），浏览器就会抛出错误。

如果服务器通过了预检请求，以后每次浏览器正常的 CORS 请求，就跟简单请求一样，请求头都会有一个 `Origin` 字段，响应头都会有一个 `Access-Control-Allow-Origin`字段

---



### 总结

**所有请求：**

- img 请求（img标签）
- CSS 请求（link标签）
- JS 请求（script标签，JSONP就是这种请求）
- XHR 请求（遵守同源策略）
  - 同源请求
  - 跨域请求
    - 简单请求
    - 非简单请求

- 其他请求

---

**CORS 与 JSONP 的区别:**

- JSONP 只支持 GET 请求，CORS 支持所有的 HTTP 请求
- JSONP 支持所有浏览器，IE 10才持 CORS